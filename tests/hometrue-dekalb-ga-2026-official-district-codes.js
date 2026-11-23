// Official DeKalb County Tax Commissioner tax-year 2026 millage sheet, revised July 15.
// https://dekalbtaxga.gov/wp-content/uploads/dekalb-county-millage-rates.pdf
// p1: Unincorporated 04=44.090; Dunwoody 50=40.199; Tucker 90=45.791;
// Decatur 92=44.695. Pre-exemption district code gross tax only.
// Not parcel mapping, tax credit, EHOST eligibility, CID/special district or closing fee.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a);
assert.ok(a>=0&&b>a,'County registry missing');
const county=new Function(html.slice(a,b+3)+'\nreturn COUNTIES;')().dekalb;
assert.equal(county.state,'ga');
const official=[
 ['dek-uninc-04-2026','04',44.090],
 ['dek-dunwoody-50-2026','50',40.199],
 ['dek-tucker-90-2026','90',45.791],
 ['dek-decatur-92-2026','92',44.695]
];
assert.equal(county.districts.filter(d=>d.taxYear==='2026').length,4,'Additional dated rate needs explicit official verification');
let count=0;
for(const [id,code,mills] of official){
 const d=county.districts.find(v=>v.id===id);
 assert.ok(d,'Missing district '+code);
 assert.equal(d.taxYear,'2026','Incorrect source year '+code);
 assert.ok(Math.abs(d.tr-.4*mills/1000)<1e-12,'Official source mismatch '+code);
 for(const price of [100000,300000,500000]){
  const expected=price*.4*mills/1000;
  assert.ok(Math.abs(d.tr*price-expected)<1e-7,'Gross tax mismatch '+code+' '+price);
  count++;
 }
}
for(const [id,tr] of [['dek-uninc',.0093],['dek-decatur',.0105],['dek-dunwoody',.0085]]){
 const d=county.districts.find(v=>v.id===id);
 assert.ok(d);
 assert.equal(d.tr,tr,'Legacy sharing rate changed '+id);
 assert.ok(!d.taxYear&&!d.taxPeriod,'Legacy planning choice must not pass official-year buyer gate');
}
assert.ok(county.notes.includes('CID'),'CID applicability omission must be disclosed');
assert.ok(county.notes.includes('EHOST'),'EHOST conditional relief must be disclosed');
console.log('PASS DeKalb 4/4 tax-year 2026 official district totals and '+count+'/'+count+' illustrative pre-exemption bills; 3 legacy rates preserved and unverified.');
