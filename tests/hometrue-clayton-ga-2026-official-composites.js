// Clayton GA two selected 2026 standard tax districts, primary source corroboration.
// County adopted Resolution 2026-213 net M&O 15.052 after 3.468 rollback and fire 4.500
// https://www.claytoncountyga.gov/wp-content/uploads/2026/09/Resolution-No.-2026-213.pdf
// School board final 2026 (FY2027) levy vote October 5, 2026 and its 20.000 proposal:
// https://resources.finalsite.net/images/v1791302958/claytonk12gaus/c3yjwjgnas6xfk4kb4b8/SummaryCalledBoardMeetingOctober52026-GoogleDocs.pdf
// Jonesboro municipality FY26 approved budget 9.0 mills:
// https://www.jonesboroga.gov/Assets/Files/Approved%202026%20Budget.pdf
// County development authority city and school components:
// https://www.investclayton.com/incentives-taxes.php
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const c=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')().clayton;
assert.equal(c.state,'ga');
assert.equal(c.districts.length,2,'Every additional Clayton buyer district needs 2026 official composite source');
const official={
 'cla-uninc':{m:39.552,parts:[18.520,-3.468,20.000,4.500]},
 'cla-jonesboro':{m:48.552,parts:[18.520,-3.468,20.000,4.500,9.000]}
};
let cases=0;
for(const [id,record] of Object.entries(official)){
 const d=c.districts.find(x=>x.id===id);
 assert.ok(d);
 assert.equal(d.taxYear,'2026');
 assert.ok(Math.abs(record.parts.reduce((a,b)=>a+b,0)-record.m)<1e-10);
 assert.ok(Math.abs(d.tr-.4*record.m/1000)<1e-12,'Pre-exemption factor '+id);
 for(const price of [125000,275000,400000,575000,850000]){
  const expected=record.parts.reduce((sum,mill)=>sum+price*.4*mill/1000,0);
  assert.ok(Math.abs(d.tr*price-expected)<1e-7,id+'/'+price);
  cases++;
 }
}
assert.equal(cases,10);
console.log('PASS Clayton 2026 official-standard source components, 2/2 buyer districts, 10/10 fictional pre-exemption values. Exemptions, eligibility, full parcel and buyer certification OPEN.');
