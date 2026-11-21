// Official Pickens County Oct. 5, 2026 signed BOC minutes:
// https://www.pickenscountyga.gov/AgendaCenter/ViewFile/Minutes/_10052026-196
// Official Jasper city Oct. 15, 2026 signed council minutes:
// https://www.jasper-ga.us/pdf/10.15.2026-Public-Hearing3-Tax-Millage-Special-Called-Minutes.pdf
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf("  'pickens': {"),b=html.indexOf("  'lumpkin': {",a);assert.ok(a>=0&&b>a);
const market=new Function('return ({'+html.slice(a,b)+'})')().pickens;
const byId=id=>market.districts.find(d=>d.id===id);
assert.ok(byId('pick-uninc-2026'),'Adopted 2026 option exists');
assert.equal(byId('pick-uninc').tr,.006,'Legacy unincorporated links preserved');
assert.equal(byId('pick-jasper').tr,.0065,'Legacy Jasper links preserved');
const county=6.606,school=10.600,jasper=7.636;
assert.ok(Math.abs(county+school-17.206)<1e-10);
assert.ok(Math.abs(county+school+jasper-24.842)<1e-10,'Jasper combined arithmetic only, not certified parcel rate');
const r=.4*(county+school)/1000;
assert.ok(Math.abs(byId('pick-uninc-2026').tr-r)<1e-12);
for(const price of [200000,400001,575000,800000])assert.ok(Math.abs(price*byId('pick-uninc-2026').tr-price*r)<1e-7);
assert.match(byId('pick-uninc-2026').label,/2026 adopted county \+ schools, before exemptions/);
assert.match(market.notes,/Jasper adopted an additional municipal 7.636 mills/);
assert.equal(new Set(market.districts.map(x=>x.id)).size,market.districts.length);
console.log('Pickens 2026 adopted county-school rate: 4 arithmetic scenarios; legacy identifiers preserved.');
// Does not verify annual tax after exemptions, city parcel overlays, buyer flow/DOM/shared/PDF or 2027.
