// Richmond County (Augusta, GA) official tax-year 2026 net millage schedule.
// https://arctax.com/property/millage-rates/
// Exact official: 001 Urban 28.284; 002 County with fire 26.280;
// 003 Hephzibah 24.939; 004 Blythe with fire 26.839.
// These are pre-homestead 2026 district composites. Buyer parcel district,
// assessed-value exemptions/credits, separate fees and payable 2027 rules not certified.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a);
assert.ok(a>=0&&b>a,'County registry unavailable');
const county=new Function(html.slice(a,b+3)+'\nreturn COUNTIES;')().richmond;
assert.equal(county.state,'ga');
const sources=[
 ['rich-2026-001',28.284,'Urban'],
 ['rich-2026-002',26.280,'County w/fire'],
 ['rich-2026-003',24.939,'Hephzibah'],
 ['rich-2026-004',26.839,'Blythe w/fire']
];
assert.equal(county.districts.filter(d=>d.taxYear==='2026').length,4,'New dated district needs source validation');
for(const [id,mills] of sources){
 const district=county.districts.find(d=>d.id===id);
 assert.ok(district,id+' missing');
 assert.equal(district.taxYear,'2026',id+' tax year mismatch');
 assert.ok(Math.abs(district.tr-(.4*mills/1000))<1e-12,id+' adopted levy mismatch');
 for(const market of [100000,200000,400000,600000]){
  const assessed=market*.4;
  assert.ok(Math.abs((assessed*mills/1000)-(market*district.tr))<1e-8,id+' gross buyer scenario');
 }
}
for(const id of ['rich-augusta','rich-hephzibah']){
 const d=county.districts.find(x=>x.id===id);
 assert.ok(d,id+' missing');
 assert.ok(!d.taxYear&&!d.taxPeriod,'Historical unspecified rate cannot claim 2026');
}
console.log('PASS Richmond GA official 2026: 4/4 district net millages, 16/16 pre-exemption gross tax examples. Two historical planning options and all buyer-level exemptions/fees/geography unverified.');
