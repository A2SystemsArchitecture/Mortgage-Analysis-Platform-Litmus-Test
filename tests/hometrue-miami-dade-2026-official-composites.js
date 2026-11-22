// Miami-Dade 2026 official adopted composite millage verification for the six selectable HomeTrue districts.
// Primary source: https://www.miamidade.gov/resources-pa/library/reports/millage/2026-adopted-millage-chart.pdf
// Covers PRE-EXEMPTION 2026 adopted base tax codes only. Buyer parcel applicability,
// additional overlays, exemptions, non-ad valorem charges and 2027 rates NOT certified.
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start);
assert.ok(start>=0&&end>start,'County registry not found');
const COUNTIES=new Function(html.slice(start,end+3)+'\nreturn COUNTIES;')();
const m=COUNTIES['miami-dade'];
assert.equal(m.state,'fl');
const adopted2026=[
  {id:'mia-uninc',code:'3000',mills:16.8983},
  {id:'mia-miami',code:'0100',mills:19.9544},
  {id:'mia-beach',code:'0200',mills:18.6681},
  {id:'mia-hialeah',code:'0400',mills:18.6134},
  {id:'mia-coralgables',code:'0300',mills:18.1518},
  {id:'mia-homestead',code:'1000',mills:20.9001},
];
assert.equal(m.districts.filter(d=>!d.legacyOnly).length,adopted2026.length,'Unexpected additional selectable district needs official review');
const checked=new Set();
for(const {id,code,mills} of adopted2026){
 const d=m.districts.find(x=>x.id===id);
 assert.ok(d,'Missing official district '+id);
 assert.equal(d.taxYear,'2026','Tax year must not be represented as 2027 for '+id);
 assert.ok(Math.abs(d.tr*1000-mills)<1e-10,'Adopted chart mismatch '+code);
 checked.add(id);
 for(const assessed of [75000,250000,500000]){
  const expected=Math.round((assessed*mills/1000)*100)/100;
  const actual=Math.round((assessed*d.tr)*100)/100;
  assert.equal(actual,expected,'Pre-exemption levy mismatch '+code+'/'+assessed);
 }
}
assert.deepEqual([...m.districts.filter(d=>!d.legacyOnly).map(d=>d.id)].sort(),[...checked].sort());
console.log('PASS: 6/6 Miami-Dade selectable base codes match official 2026 adopted chart; 18/18 pre-exemption levy scenarios pass. Parcel/exemption/fee certification NOT performed.');
