// Actual application shared-report reconstruction regression. No browser or parcel certification claimed.
'use strict';
// Market activation (spec 2026-11-27): this test checks an ACTIVE market's math; activation itself is covered by hometrue-market-activation.js.
globalThis.marketActiveGuard=()=>true;globalThis.isMarketActive=()=>true;globalThis.showMarketComingSoon=()=>'';globalThis.hideMarketComingSoon=()=>{};
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const slice=(a,b)=>{const start=html.indexOf(a),end=html.indexOf(b,start);assert.ok(start>=0&&end>start,a);return html.slice(start,end)};
const data=slice('const COUNTIES = {','\n};')+'\n};';
const keys=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)"/gm)].map(m=>m[1]);
assert.equal(keys.length,31);
assert.ok(keys.includes('dorchester-sc'),'Dorchester must be included');
const run=new Function('URLSearchParams',data+`
let ACTIVE_COUNTY='',ACTIVE_DISTRICT=null;
const MKT={br:7.03,wr:7.67,fxb:42,fxw:85,fab:150,faw:400},S={};
const window={location:{search:''}};
function setCounty(k){ACTIVE_COUNTY=k;ACTIVE_DISTRICT=null;MKT.tr=COUNTIES[k].tr;}
function renderDistrictPills(k,id){ACTIVE_DISTRICT=COUNTIES[k].districts.find(d=>d.id===id)||null;if(ACTIVE_DISTRICT)MKT.tr=ACTIVE_DISTRICT.tr;}
function bAnalysis(){}function show(){}function setTimeout(){}function updateUpgradeBtn(){}
`+slice('function parseBuyerAnnualTax(','function collectInp(')+slice('function cPI(','function bG3(')+slice('function parseShareAmount(','// ══════════════════════════════════════\n// PRIORITY 5')+`
return (key,down,tax)=>{const district=COUNTIES[key].districts.find(d=>d.taxYear==='2026'||d.taxPeriod==='FY 2026/27')||COUNTIES[key].districts[0]; /* Dorchester has no tax-year-labeled district; its first legacy planning option exercises the share arithmetic only */window.location.search='?addr=Fictional&price=300000&county='+key+'&district='+district.id+'&dp='+down+(tax===null?'':'&buyerTax='+tax);checkShareURL();return {i:S.inp,factor:district.tr,id:district.id};};
`)(URLSearchParams);
let count=0,checks=0;
function ok(a,b,label){checks++;if(typeof b==='number')assert.ok(Number.isFinite(a)&&Math.abs(a-b)<0.00001,label);else assert.equal(a,b,label)}
for(const k of keys)for(const d of [3,3.5,5,10,20])for(const t of [null,0,4800.25]){
const {i,factor,id}=run(k,d,t);
const loan=300000*(1-d/100),tax=t??300000*factor,pi=r=>Math.round(loan*r/1200/(1-(1+r/1200)**-360));
ok(i.districtId,id,k);ok(i.dpct,d,k);ok(i.loan,loan,k);ok(i.annualTax1,tax,k);ok(i.annualTax2,tax,k);ok(i.ty1,tax/12,k);ok(i.bpi,pi(7.03),k);ok(i.wpi,pi(7.67),k);ok(i.bp,d<20?Math.round(loan*.003/12):0,k);ok(i.wp,d<20?Math.round(loan*.005/12):0,k);ok(i.bt,pi(7.03)+tax/12+i.bp+42,k);ok(i.wt,pi(7.67)+tax/12+i.wp+85+(d<20?Math.round(loan*.002/12):0),k);count++;
}
assert.equal(count,465);assert.equal(checks,5580);
console.log(JSON.stringify({count,checks,pass:true,scope:'shared reconstruction function with simulated UI dependencies; not browser or financial certification'}));
