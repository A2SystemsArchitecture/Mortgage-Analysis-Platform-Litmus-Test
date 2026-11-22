// Jefferson County, Alabama 2026 Tax Assessor published standard municipality rates.
// https://eringcapture.jccal.org/caportal/Custom/CA_MilageRate.aspx
// Published TOTAL RATE is percentage of assessed value (7.25 means 72.5 mills).
// This verifies only FIVE standard buyer-selectable rates. Numerous special
// subdistrict variants, actual parcel/class, homestead and fees remain unverified.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const h=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=h.indexOf('const COUNTIES = {'),j=h.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const c=new Function(h.slice(i,j+3)+'\nreturn COUNTIES;')()['jefferson-al'];
assert.equal(c.state,'al');
const official={
 'jef-birmingham':{percentAssessed:7.25,mills:72.5},
 'jef-hoover':{percentAssessed:7.26,mills:72.6},
 'jef-vestavia':{percentAssessed:9.26,mills:92.6},
 'jef-homewood':{percentAssessed:7.50,mills:75.0},
 'jef-uninc':{percentAssessed:5.01,mills:50.1}
};
assert.equal(c.districts.filter(x=>!x.legacyOnly).length,5);
let cases=0;
for(const [id,rate] of Object.entries(official)){
 const d=c.districts.find(x=>x.id===id);
 assert.ok(d,id+' missing');
 assert.equal(d.taxYear,'2026',id+' incorrect year');
 assert.ok(Math.abs(rate.percentAssessed*10-rate.mills)<1e-10,id+' unit error');
 assert.ok(Math.abs(d.tr-(.10*rate.mills/1000))<1e-12,id+' published rate mismatch');
 for(const marketValue of [100000,250000,500000]){
  const assessed=marketValue*.10;
  const expected=Math.round(assessed*(rate.percentAssessed/100)*100)/100;
  const actual=Math.round(marketValue*d.tr*100)/100;
  assert.equal(actual,expected,id+' taxable class-III standard example');
  cases++;
 }
}
console.log('PASS Jefferson AL 5/5 2026 standard codes and '+cases+'/15 illustrative 10%-assessed-value gross tax calculations; special subdistrict variants and exemptions are NOT certified.');
