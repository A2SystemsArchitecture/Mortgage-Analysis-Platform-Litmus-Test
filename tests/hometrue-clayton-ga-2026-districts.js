const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const start=html.indexOf("  'clayton': {"),end=html.indexOf("  'hall': {",start);
assert.ok(start>=0&&end>start);
const market=new Function('return ({'+html.slice(start,end)+'})')().clayton;
for(const [id,mills] of [['cla-uninc',39.552],['cla-jonesboro',48.552]]){
 const district=market.districts.find(d=>d.id===id);
 assert.ok(district,id);
 assert.ok(Math.abs(district.tr-.4*mills/1000)<1e-12,id+' correct rate');
 for(const price of [200000,400001,575000])assert.ok(Math.abs(price*district.tr-price*.4*mills/1000)<1e-8,id+' '+price);
}
console.log('Clayton 2026 two standard districts: 6 fictional price cases passed.');
// Clayton County Resolution 2026-213 adopted Sep 24 2026 sets 18.520 gross,
// sales-tax rollback credit 3.468 and net county 15.052 mills; county fire 4.500.
// https://www.claytoncountyga.gov/wp-content/uploads/2026/09/Resolution-No.-2026-213.pdf
// Official Clayton County Development Authority combined schedule confirms
// school 20.000; Jonesboro 9.000; county 15.052, and fire 4.500 for Jonesboro.
// https://www.investclayton.com/incentives-taxes.php
// Only ordinary 40% assessment, pre-exemption, no parcel charges.
// City fire service, parcel qualifications, approved exemptions, browser and PDF not tested.
