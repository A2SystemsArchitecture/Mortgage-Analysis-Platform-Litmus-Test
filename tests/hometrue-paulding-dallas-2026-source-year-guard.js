// Paulding County 2026 adopted component and Dallas municipal year guard.
// Primary county: https://meetings.municode.com/adaHtmlDocument/index?cc=PAULDINGGA&ip=false&me=c83f3a2f035a4feda43980d8f6d2b7e5
// Paulding School Board June 11, 2026 adopted M&O 17.800, bond zero:
// https://resources.finalsite.net/images/v1781808146/pauldingk12gaus/rruti1zwcbwejt37lza5/June112026.pdf
// Dallas city's 2026-titled page still expressly publishes the JULY 2025
// adopted 6.5 mill CITY rate, not a final 2026 Dallas tax year rate:
// https://www.dallasga.gov/1280/2026-Property-Taxes
// These checks do not establish a parcel's eligibility, exemptions or final bill.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i,'County block missing');
const c=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')().paulding;
assert.equal(c.state,'ga');
const uninc=c.districts.find(d=>d.id==='paul-uninc'),dallas=c.districts.find(d=>d.id==='paul-dallas');
assert.equal(uninc.taxYear,'2026');
assert.ok(Math.abs(uninc.tr-0.4*(4.3+2.1+0.8+17.8)/1000)<1e-12);
assert.equal(dallas.tr,0.0088,'Legacy Dallas planning factor must not silently change without primary-source proof');
assert.ok(!dallas.taxYear&&!dallas.taxPeriod,'Dallas 2025 source cannot establish a final 2026 levy');
assert.ok(c.notes.includes('adopted July 7, 2025 for tax year 2025'),'Dallas source year warning required');
assert.ok(c.notes.includes('unsupported historical planning figure'),'Dallas planning rate must be unverified');
for(const assessedValue of [80000,160000,240000]){
 const officialPreExemption=(assessedValue*25/1000);
 const codedFromMarket=(assessedValue/.4)*uninc.tr;
 assert.ok(Math.abs(officialPreExemption-codedFromMarket)<1e-8);
}
console.log('PASS: Paulding 2026 unincorporated 25.000 mills 3/3 examples, Dallas planning rate remains unverified and no 2025-to-2026 promotion.');
