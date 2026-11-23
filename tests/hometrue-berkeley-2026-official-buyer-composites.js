// Berkeley SC published FY2026/27 Auditor exact source composites and illustrated net bill.
// Source 1: https://berkeleycountysc.gov/dept/auditor/millage/
// Source 2: https://berkeleycountysc.gov/dept/auditor/computation/
// SOURCE RATE ONLY: no exact parcel, residency approval, credits, closing fee, or net buyer certification.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start);
assert.ok(start>=0&&end>start,'Registry missing');
const c=new Function(html.slice(start,end+3)+'\nreturn COUNTIES;')()['berkeley-sc'];
assert.equal(c.state,'sc');
const cases={
 'ber-standard-2026-legal4':{gross:246.5,school:146.9,ratio:.04,excludeSchool:true},
 'ber-standard-2026-other6':{gross:246.5,school:146.9,ratio:.06,excludeSchool:false},
 'ber-goosecreek-18-2026-legal4':{gross:306.5,school:146.9,ratio:.04,excludeSchool:true},
 'ber-goosecreek-18-2026-other6':{gross:306.5,school:146.9,ratio:.06,excludeSchool:false}
};
const coded=c.districts.filter(d=>d.taxYear||d.taxPeriod);
assert.equal(coded.length,4,'Review all current-period buyer choices');
assert.equal(c.districts.length,7,'Legacy selections must be reviewed separately if changed');
let examples=0;
for(const [id,x] of Object.entries(cases)){
 const d=coded.find(d=>d.id===id);assert.ok(d,id);
 assert.equal(d.taxPeriod,'FY 2026/27');
 const expected=x.ratio*(x.gross-(x.excludeSchool?x.school:0))/1000;
 assert.ok(Math.abs(d.tr-expected)<1e-12,id+' rate source');
 for(const price of [100000,200000,350000,575000,850000]){
  const components=price*x.ratio*x.gross/1000-(x.excludeSchool?price*x.ratio*x.school/1000:0);
  assert.ok(Math.abs(price*d.tr-components)<1e-7,id+'/'+price);
  examples++;
 }
}
assert.equal(examples,20);
// Berkeley County Auditor's official $100,000 legal residence bill example:
// ad valorem 986 minus school 587.60 minus county local-option sales tax 79.30
// plus fire 79.88, solid waste 99, stormwater 48 = $545.98.
const d=coded.find(d=>d.id==='ber-standard-2026-legal4');
const subtotal=100000*d.tr-100000*.000793;
const actual=subtotal+79.88+99+48;
assert.ok(Math.abs(subtotal-319.10)<1e-8);
assert.ok(Math.abs(actual-545.98)<1e-8);
// Goose Creek separate city fee and sales tax factor must not silently appear as zero.
assert.ok(c.notes.includes('0.001730')&&c.notes.includes('$195'));
assert.ok(c.notes.includes('legacy planning inputs'));
console.log('PASS Berkeley 2026/27 Auditor: 4/4 current buyer classifications, 20 component-split fictional prices, exact official $545.98 sample. Only source-rate gate, not parcel/full financial certification.');
