// Government sources:
// https://arctax.com/property/millage-rates/
// https://dor.georgia.gov/property-tax-valuation
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf("  'richmond': {"), b=html.indexOf("  'columbia': {",a);assert.ok(a>=0&&b>a);
const county=new Function('return ({'+html.slice(a,b)+'})')().richmond;
const rates=[['rich-2026-001',28.284],['rich-2026-002',26.28],['rich-2026-003',24.939],['rich-2026-004',26.839]];
for(const [id,mills] of rates){
 const d=county.districts.find(x=>x.id===id);assert.ok(d);assert.ok(Math.abs(d.tr-0.4*mills/1000)<1e-12);
 for(const p of [200000,400001,575000,800000])assert.ok(Math.abs(p*d.tr-p*0.4*mills/1000)<1e-8);
}
assert.equal(county.districts.find(x=>x.id==='rich-augusta').tr,.0084);
assert.equal(county.districts.find(x=>x.id==='rich-hephzibah').tr,.0078);
assert.equal(new Set(county.districts.map(x=>x.id)).size,county.districts.length);
console.log('Richmond 2026 districts 001-004: 16 price comparisons and legacy preservation checked.');
// Parcel validation, homestead/credit eligibility, extra fees, browser/share/PDF not covered.
