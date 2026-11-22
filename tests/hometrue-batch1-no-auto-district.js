// Financial safety regression: never auto-assign arbitrary first tax district.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('function renderDistrictPills(');
const end=html.indexOf('// ── FLOOD ZONE SELECTOR',start);
assert.ok(start>=0&&end>start,'district functions present');
assert.ok(html.includes('Unconfirmed; county-only planning rate'),'county planning caveat');
assert.ok(html.includes('not a verified property tax bill'),'user-facing tax uncertainty');
const run=new Function(`
const COUNTIES={
 example:{tr:0.009,districts:[{id:'a',tr:0.014,label:'First district'},{id:'b',tr:0.021,label:'Other district'}]},
 single:{tr:0.012,districts:[{id:'only',tr:0.011,label:'Only district'}]}
};
let ACTIVE_DISTRICT={id:'stale'},MKT={tr:0.999};
const row={classList:{add(){},remove(){}}};
const container={innerHTML:'',items:[],appendChild(btn){btn.classList={add(){},remove(){}};this.items.push(btn)}};
const rate={textContent:''},status={textContent:''},annual={value:'1052.80'};
const document={
 createElement(){return {className:'',textContent:'',onclick:null}},
 getElementById(id){return ({'district-row':row,'district-pills':container,'planning-tax-rate':rate,'planning-district-status':status,'f-annual-buyer-tax':annual})[id]||null},
 querySelectorAll(){return container.items}
};
function clearBuyerAnnualTax(){annual.value=''}
`+html.slice(start,end)+`
renderDistrictPills('example');
if(ACTIVE_DISTRICT!==null)throw Error('first district auto-selected');
if(MKT.tr!==0.009||!status.textContent.includes('Unconfirmed'))throw Error('county planning fallback');
if(container.items.some(b=>b.className.includes('active')))throw Error('first pill active');
renderDistrictPills('example','b');
if(ACTIVE_DISTRICT.id!=='b'||MKT.tr!==0.021)throw Error('known saved district');
renderDistrictPills('example','no-such-district');
if(ACTIVE_DISTRICT!==null||MKT.tr!==0.009)throw Error('unknown shared district');
annual.value='1052.80';
const b=container.items.find(b=>b.textContent==='Other district');
b.onclick();
if(ACTIVE_DISTRICT.id!=='b'||MKT.tr!==0.021||annual.value!=='')throw Error('explicit district selection');
renderDistrictPills('single');
if(ACTIVE_DISTRICT!==null||MKT.tr!==0.012)throw Error('single district was assumed without confirmation');
if(!row.classList||container.items.length!==1||container.items[0].textContent!=='Only district')throw Error('sole documented district is not offered');
container.items[0].onclick();
if(ACTIVE_DISTRICT?.id!=='only'||MKT.tr!==0.011)throw Error('sole district cannot be chosen explicitly');
return true;
`);
assert.equal(run(),true);
console.log('Passed: default, known, unknown, manual, single-district and tax reset safeguards.');
