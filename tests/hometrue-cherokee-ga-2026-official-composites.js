// Cherokee GA 2026 official standard tax-rate decomposition for exactly 3 buyer options.
// County 2026 Tax Commissioner's adopted schedule: https://www.cherokeecountytax.com/property.html
// Canton city posted adopted 5.250 rate: https://www.cantonga.gov/Home/Components/News/News/1681/
// Woodstock council August 24 2026 5.130 M&O plus 0.520 voter parks bond;
// https://woodstockga.granicus.com/player/clip/692?view_id=1
// Rate-source checks only. Actual parcel matching, homeowner exemptions, fees, 2027 rates and net buyer quotes excluded.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start);
assert.ok(start>=0&&end>start);
const c=new Function(html.slice(start,end+3)+'\nreturn COUNTIES;')().cherokee;
assert.equal(c.state,'ga');assert.equal(c.districts.length,3);
const cases={
 'cher-uninc':{mills:26.949,components:[5.712,16.450,1.500,3.023,0.264]},
 'cher-canton':{mills:29.176,components:[5.712,16.450,1.500,0.264,5.250]},
 'cher-woodstock':{mills:29.576,components:[5.712,16.450,1.500,0.264,5.130,0.520]}
};
let comparisons=0;
for(const [id,x] of Object.entries(cases)){
 const d=c.districts.find(z=>z.id===id);
 assert.ok(d,id);assert.equal(d.taxYear,'2026',id);
 assert.ok(Math.abs(x.components.reduce((a,b)=>a+b,0)-x.mills)<1e-9,id+' official composite');
 assert.ok(Math.abs(d.tr-.4*x.mills/1000)<1e-12,id+' code factor');
 for(const price of [125000,275000,400000,575000,850000]){
  const tax=x.components.reduce((sum,m)=>sum+price*.4*m/1000,0);
  assert.ok(Math.abs(d.tr*price-tax)<1e-7,id+'/'+price);comparisons++;
 }
}
assert.equal(comparisons,15);
console.log('PASS 2026 Cherokee three standard choices and 15 independently split fictional pre-exemption calculations. No parcel-specific/full market certification.');
