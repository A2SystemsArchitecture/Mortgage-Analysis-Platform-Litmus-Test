// Source-only rate-composite verification: AL Department of Revenue 2026 millage schedule,
// published November 19 2026, PDF pages 44 (Limestone), 47 (Madison), 60 (Shelby).
// https://www.revenue.alabama.gov/wp-content/uploads/2026/11/MILLS26-Formatted-11-19-2026.pdf
// No buyer homestead eligibility, district address matching, fees or full financial signoff.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start);
assert.ok(start>=0&&end>start,'County registry required');
const data=new Function(html.slice(start,end+3)+'\nreturn COUNTIES;')();
const cases={
  'madison-al':{
    'mad-huntsville':{m:58,components:[6.5,11,5.5,35]},
    'mad-madison':{m:69.5,components:[6.5,11,5.5,46.5]},
    'mad-uninc':{m:36.5,components:[6.5,14,16]}
  },
  'shelby-al':{
    'sha-pelham':{m:58,components:[6.5,7.5,30,14]},
    'sha-alabaster':{m:54,components:[6.5,7.5,30,10]},
    'sha-helena':{m:49,components:[6.5,7.5,30,5]},
    'sha-uninc':{m:44,components:[6.5,7.5,30]}
  },
  'limestone':{
    'lim-athens':{m:40,components:[6.5,13.5,10,10]},
    'lim-uninc':{m:30,components:[6.5,13.5,10]}
  }
};
let districtCases=0,priceCases=0;
for(const [county,expected] of Object.entries(cases)){
 const live=data[county];assert.ok(live,county+' county missing');
 assert.equal(live.state,'al');
 assert.equal(live.districts.length,Object.keys(expected).length,'Every current selectable district must be compared to the official source');
 for(const [id,record] of Object.entries(expected)){
  const d=live.districts.find(x=>x.id===id);assert.ok(d,id+' missing');
  assert.equal(d.taxYear,'2026',id+' official source-year label');
  assert.equal(record.components.reduce((a,b)=>a+b,0),record.m,id+' source components');
  const factor=0.10*record.m/1000;
  assert.ok(Math.abs(d.tr-factor)<1e-12,id+' code composite');
  for(const value of [125000,400000,575000,850000]){
   const assessed=value*0.10;
   const expectedTax=record.components.reduce((total,m)=>total+assessed*m/1000,0);
   assert.ok(Math.abs(value*d.tr-expectedTax)<1e-7,id+'/'+value+' official component recomposition');
   priceCases++;
  }
  districtCases++;
 }
}
assert.equal(districtCases,9);
assert.equal(priceCases,36);
console.log('PASS: AL 2026 official source only, Madison 3/3, Shelby 4/4, Limestone 2/2 selectable standard districts and 36 component-split fictional values. Parcel boundaries, relief, fees and full certification untested.');
