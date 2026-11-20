// Reconciles one current-year DeKalb unincorporated tax DISTRICT, not all DeKalb parcels.
// Official county-issued 2026 tax statement, tax district 04:
// https://publicaccess.dekalbtaxga.gov/Documents/2026_Website/1/1940761.pdf
// County method: https://dekalbtaxga.gov/news/dekalb-county-tax-commissioners-office-prepares-to-calculate-annual-tax-bills/
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf("  'dekalb': {");
const b=html.indexOf("  'gwinnett': {",a);
assert.ok(a>=0&&b>a);
const market=new Function('return ({'+html.slice(a,b)+'})')().dekalb;
const selected=market.districts.find(d=>d.id==='dek-uninc-04-2026');
const legacy=market.districts.find(d=>d.id==='dek-uninc');
assert.ok(selected&&legacy,'Verified new district and existing legacy links must remain');
assert.equal(legacy.tr,.0093,'No silent change to ambiguous old links');
const mills=[10.684,.702,0,2.627,6.596,.335,.366,22.780].reduce((a,b)=>a+b,0);
assert.ok(Math.abs(mills-44.090)<1e-10);
assert.ok(Math.abs(selected.tr-0.4*mills/1000)<1e-12);
for(const [price,expected] of [[192000,3386.112],[300000,5290.8],[400000,7054.4],[575000,10140.7]]){
 assert.ok(Math.abs(selected.tr*price-expected)<1e-7,'Pre-exemption tax '+price);
}
assert.match(selected.label,/2026 bill, before credits/);
assert.match(market.notes,/separately billed sanitation, streetlight and stormwater/);
assert.equal(new Set(market.districts.map(d=>d.id)).size,market.districts.length);
console.log('DeKalb 2026 district 04: 2026 official rate and four pre-exemption cases match; legacy choice retained.');
// Government bill has 2026 separate non-ad-valorem charges: $362.30 sanitation,
// $24 streetlight, $132 stormwater. These depend on the parcel and must NOT be
// treated as guaranteed countywide fixed fees. Credits and homestead eligibility
// are not supplied by the new planning multiplier. Main buyer/browser/PDF open.
