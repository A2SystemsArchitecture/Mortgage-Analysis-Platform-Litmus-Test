const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
function market(id,next){const a=html.indexOf("  '"+id+"': {");const b=html.indexOf(next,a);assert.ok(a>=0&&b>a,id+' block');return new Function('return ({'+html.slice(a,b)+'})')()[id]}
const cases=[
 [market('madison-al',"  'shelby-al': {"),[['mad-huntsville',58],['mad-madison',69.5],['mad-uninc',36.5]]],
 [market('limestone',"  // ── VIRGINIA"),[['lim-athens',40],['lim-uninc',30]]]
];
for(const [county,rows] of cases){for(const [id,mills] of rows){
 const district=county.districts.find(d=>d.id===id);
 assert.ok(district,id);
 assert.ok(Math.abs(district.tr-mills*.1/1000)<1e-12,id+' rate');
 for(const price of [200000,400001,575000])assert.ok(Math.abs(price*district.tr-price*.1*mills/1000)<1e-8,id+' '+price);
}}
console.log('15 direct Madison and Limestone 2026 property price checks passed.');
// AL DOR October 2026 county millage schedules, pp. 44 and 47 (PDF zero-based 43,46):
// https://www.revenue.alabama.gov/wp-content/uploads/2026/11/MILLS26-Formatted-11-19-2026.pdf
// Rates are for stated STANDARD districts and Alabama Class III, before exemptions and fees.
// Unincorporated Madison includes improvements-only fire tax; land-only differs.
// Huntsville and Madison cross county boundary, requiring specific parcel matching.
// This is not browser, share-link, or full buyer-report verification.
