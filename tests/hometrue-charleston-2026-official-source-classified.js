// Official Charleston County Auditor tax year 2026 original PDF 2 pages visually inspected.
// https://www.charlestoncounty.gov/departments/auditor/files/archived/2026-millage-card.pdf?v=4
// Scope source-only: precisely four 2026 buyer district/classification choices, not
// parcel-specific approval or fully reconciled homeowner bill.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const county=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')()['charleston-sc'];
assert.equal(county.state,'sc');
const documented=county.districts.filter(x=>x.taxYear==='2026');
assert.equal(documented.length,4,'Any new current-year Charleston option must undergo separate source validation');
assert.equal(county.districts.length,9,'Existing legacy choices preserved and unverified');
const source={
 'cha-city-2026-legal4':{gross:300.8,school:145.2,rate:.04,components:[218.8,82.0]},
 'cha-city-2026-other6':{gross:300.8,school:0,rate:.06,components:[218.8,82.0]},
 'cha-mtpleasant-21-2026-legal4':{gross:263.1,school:145.2,rate:.04,components:[218.8,44.3]},
 'cha-mtpleasant-21-2026-other6':{gross:263.1,school:0,rate:.06,components:[218.8,44.3]}
};
let buyerSamples=0;
for(const [id,x] of Object.entries(source)){
 const option=documented.find(x=>x.id===id);assert.ok(option,id);
 assert.ok(Math.abs(x.components.reduce((a,b)=>a+b,0)-x.gross)<1e-10);
 assert.ok(Math.abs(option.tr-x.rate*(x.gross-x.school)/1000)<1e-12);
 for(const price of [125000,200000,350000,575000,850000]){
  const calculated=price*x.rate*x.components.reduce((a,b)=>a+b,0)/1000 - price*x.rate*x.school/1000;
  assert.ok(Math.abs(option.tr*price-calculated)<1e-7,id+'/'+price);
  buyerSamples++;
 }
}
assert.equal(buyerSamples,20);
// Official City Charleston 2026 $200,000 4%-approved published example:
// gross 2406.40 minus county 180 minus municipality 166 minus school relief 1161.60
// plus solid waste fee 154 = 1052.80.
const city=source['cha-city-2026-legal4'];
const gross=200000*.04*city.gross/1000;
const countyCredit=200000*.00090,cityCredit=200000*.00083;
const schoolRelief=200000*.04*145.2/1000;
const net=gross-countyCredit-cityCredit-schoolRelief;
assert.ok(Math.abs(gross-2406.4)<1e-8);
assert.ok(Math.abs(net-898.8)<1e-8);
assert.ok(Math.abs(net+154-1052.8)<1e-8);
assert.ok(county.notes.includes('NOT INCLUDED IN THE SIMPLE BUYER PERCENTAGE CHOICES'));
console.log('PASS Charleston Auditor 2026: 4 classified buyer source composites, 20 price cases, $1,052.80 full official example. Market-wide property tax and buyer output still NOT certified.');
