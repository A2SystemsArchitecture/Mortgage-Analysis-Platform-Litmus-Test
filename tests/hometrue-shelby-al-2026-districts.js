const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const start=html.indexOf("  'shelby-al': {");
const end=html.indexOf("  'limestone': {",start);
assert.ok(start>=0&&end>start,'Shelby market is present');
const market=new Function('return ({'+html.slice(start,end)+'})')()['shelby-al'];
const standard=[['sha-pelham',58],['sha-alabaster',54],['sha-helena',49],['sha-uninc',44]];
for(const [id,mill] of standard){
 const d=market.districts.find(item=>item.id===id);
 assert.ok(d,'Expected distinct district '+id);
 assert.ok(Math.abs(d.tr-.1*mill/1000)<1e-12,'Rate '+id);
 for(const price of [200000,400001,575000]){
  assert.ok(Math.abs(d.tr*price-price*.1*mill/1000)<1e-8,'Price '+price+' '+id);
 }
}
assert.equal(new Set(market.districts.map(d=>d.id)).size,market.districts.length,'No duplicate district IDs');
console.log('Shelby 2026 standard district tax: 12 arithmetic comparisons passed.');
// Alabama DOR October 2026 page 60 (PDF zero-index 59)
// https://www.revenue.alabama.gov/wp-content/uploads/2026/11/MILLS26-Formatted-11-19-2026.pdf
// Class III 10% assessed value. No homestead applied.
// Values are standard tax districts, NOT universal cross-county or parcel-specific rates.
// This test does not check browser DOM, shared reports, or PDF output.
