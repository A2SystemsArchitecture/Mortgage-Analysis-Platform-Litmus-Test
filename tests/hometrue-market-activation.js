// Per-market activation and "coming soon" (spec 2026-11-27, attorney-approved wording).
// Runs the live activation helpers from platform.html:
// - with the list empty, none of the 124 markets is live for the public
// - testers reach every market
// - an approved list turns on only the listed markets
// - the coming-soon text matches the attorney-approved wording exactly
// - inactive markets produce no affordability numbers and no PDF (live code, stubbed DOM)
// - every output entry point is guarded
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');

const cStart=src.indexOf('const COUNTIES = {'),cEnd=src.indexOf('\n};',cStart)+3;
const aStart=src.indexOf('// Market activation (spec 2026-11-27).');
const aEnd=src.indexOf('function getDemoCount(',aStart);
assert.ok(cStart>=0&&aStart>=0&&aEnd>aStart,'activation helpers found');
const helpers=src.slice(aStart,aEnd);
assert.match(helpers,/const ACTIVE_MARKETS = \[\];/,'list ships empty');

function load({tester=false,active=[] ,county='miami-dade'}={}){
  const alerts=[];const el={textContent:'',style:{display:'none'}};
  const h=new Function('alert','document',src.slice(cStart,cEnd)+
    `\nconst IS_TESTER=${tester};\nlet ACTIVE_COUNTY=${JSON.stringify(county)};\n`+
    helpers.replace('const ACTIVE_MARKETS = [];','const ACTIVE_MARKETS = '+JSON.stringify(active)+';')+
    '\nreturn {COUNTIES,isMarketActive,marketComingSoonText,marketActiveGuard};')(
    t=>alerts.push(t),{getElementById:id=>id==='market-coming-soon'?el:null,querySelectorAll:()=>[]});
  return {h,alerts,el};
}

const keys=Object.keys(load().h.COUNTIES);
assert.equal(keys.length,124,'124 markets');

// Empty list: nothing live for the public.
{const {h}=load(); assert.equal(keys.filter(k=>h.isMarketActive(k)).length,0,'no public market live');}
// Testers reach every market.
{const {h}=load({tester:true}); assert.equal(keys.filter(k=>h.isMarketActive(k)).length,124,'tester sees all');}
// Approved list turns on exactly those markets.
{const list=['brevard','martin','st-lucie']; const {h}=load({active:list});
 assert.deepEqual(keys.filter(k=>h.isMarketActive(k)).sort(),list.slice().sort(),'only approved markets live');}

// Attorney-approved wording, every market.
for(const k of keys){
  const {h}=load({county:k}); const name=h.COUNTIES[k].name;
  assert.equal(h.marketComingSoonText(k),'Coming soon. HomeTrue is still verifying property tax and cost data for '+name+'. Analysis for this market opens once verification is complete.','wording '+k);
}
// Guard blocks, shows inline message, alerts.
{const {h,alerts,el}=load(); assert.equal(h.marketActiveGuard('broward'),false); assert.equal(el.style.display,'block');
 assert.ok(el.textContent.startsWith('Coming soon.')); assert.equal(alerts.length,1);}

// Live affordability code: inactive market sets no price, payment or button state.
{
  const s=src.indexOf('function calcAffordability()'),e=src.indexOf('\n// ══════════════════════════════════════\n// PRIORITY 1',s);
  const nodes={};const document={getElementById(id){if(!nodes[id])nodes[id]={value:'',textContent:'',innerHTML:'',disabled:false,style:{},scrollIntoView(){}};return nodes[id];},querySelectorAll:()=>[]};
  new Function('document','alert',src.slice(cStart,cEnd)+"\nconst IS_TESTER=false;\nlet ACTIVE_COUNTY='broward',ACTIVE_DISTRICT=null;const S={};\n"+helpers+src.slice(s,e)+'\ncalcAffordability();')(document,()=>{});
  assert.equal((nodes['aff-price-low']||{}).textContent||'','','no affordability price for inactive market');
  assert.equal((nodes['aff-mo-low']||{}).textContent||'','','no payment for inactive market');
  assert.ok(nodes['market-coming-soon'].textContent.startsWith('Coming soon.'),'coming-soon shown');
}
// Live PDF code: inactive market saves no PDF.
{
  const s=src.indexOf('function buildPDF('),e=src.indexOf('function showTierPicker(',s);
  let saved=0;
  new Function('alert','document',src.slice(cStart,cEnd)+"\nconst IS_TESTER=false;\nlet ACTIVE_COUNTY='broward';\nconst window={jspdf:{jsPDF:function(){return {save(){saved++;}}}}};\n"+helpers+src.slice(s,e)+"\nbuildPDF({countyKey:'broward',address:'x'});")(()=>{},{getElementById:()=>null,querySelectorAll:()=>[]});
  assert.equal(saved,0,'no PDF for inactive market');
}

// Every entry point guarded; selector refuses inactive markets; pills marked on load.
const guarded=[
 ['function genAnalysis(){\n  if (!marketActiveGuard()) return;','analysis'],
 ['function proc3(){\n  if (!marketActiveGuard()) return;','tier 3'],
 ['function calcAffordability() {\n  if (!marketActiveGuard()) return;','affordability'],
 ['function affToAnalysis() {\n  if (!marketActiveGuard()) return;','affordability to analysis'],
 ['function downloadPDF() {\n  if (!marketActiveGuard(S.inp && S.inp.countyKey)) return;','PDF download'],
 ['function buildPDF(inp) {\n  if (!marketActiveGuard(inp && inp.countyKey)) return;','PDF build'],
 ['function shareAnalysis() {\n  if (!marketActiveGuard(S.inp && S.inp.countyKey)) return;','share'],
 ["if (!marketActiveGuard(Object.hasOwn(COUNTIES, countyKey) ? countyKey : ACTIVE_COUNTY)) return;",'shared link'],
 ['function selectCounty(key, btn) {\n  if (!isMarketActive(key)) { showMarketComingSoon(key); return; }','county selector'],
 ['window.addEventListener("load",()=>{markComingSoonPills();','pills marked on load'],
];
for(const [needle,label] of guarded) assert.ok(src.includes(needle),'guard missing: '+label);

console.log(JSON.stringify({markets:keys.length,publicLiveWhenEmpty:0,testerLive:124,guards:guarded.length,pass:true,scope:'live helper and guard source; stubbed DOM; not a browser render'}));
