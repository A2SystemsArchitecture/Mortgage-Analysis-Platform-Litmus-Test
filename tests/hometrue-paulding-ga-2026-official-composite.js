// Paulding GA official August 11 2026 levy resolutions, separate June 11 school board adoption.
// County resolutions 2026-28 to -31: https://meetings.municode.com/adaHtmlDocument/index?cc=PAULDINGGA&ip=false&me=c83f3a2f035a4feda43980d8f6d2b7e5
// School district June 11 official board digest p2: https://resources.finalsite.net/images/v1781808146/pauldingk12gaus/rruti1zwcbwejt37lza5/June112026.pdf
// Code checks apply only to STANDARD unincorporated county-fire buyer option.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a);
assert.ok(a>=0&&b>a);
const county=new Function(html.slice(a,b+3)+'\nreturn COUNTIES;')().paulding;
assert.equal(county.state,'ga');
assert.equal(county.districts.length,2,'Additional Paulding choices require separate source validation');
const official={county:4.3,fire:2.1,bond:.8,school:17.8,schoolBond:0};
const total=Object.values(official).reduce((sum,mills)=>sum+mills,0);
assert.ok(Math.abs(total-25)<1e-12);
const d=county.districts.find(x=>x.id==='paul-uninc');
assert.ok(d);
assert.equal(d.taxYear,'2026');
assert.ok(Math.abs(d.tr-.4*total/1000)<1e-12);
for(const p of [125000,200000,350000,575000,850000]){
 const sourceSplit=Object.values(official).reduce((sum,mills)=>sum+p*.4*mills/1000,0);
 assert.ok(Math.abs(p*d.tr-sourceSplit)<1e-7,String(p));
}
const legacy=county.districts.find(x=>x.id==='paul-dallas');
assert.ok(legacy,'Preserve Dallas prior links');
assert.ok(!legacy.taxYear&&!legacy.taxPeriod,'Unverified Dallas city rate cannot claim 2026 official adoption');
assert.ok(county.notes.includes('Dallas is a separate municipal taxing authority'));
console.log('PASS Paulding 2026 official standard 25.000-mill composite, all five fictional value splits, Dallas remains unverified, no school bond double count.');
