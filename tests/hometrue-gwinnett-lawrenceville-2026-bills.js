// Lawrenceville tax-year 2026: independently reconcile two officially billed property-tax levies.
// Official county: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates
// Official city: https://www.lawrencevillega.org/181/Property-Taxes
// Does not certify parcel market value, exemptions, stormwater fees or every Gwinnett location.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
assert.ok(a>=0&&b>a);
const COUNTIES=new Function(html.slice(a,b)+'\nreturn COUNTIES;')();
const c=COUNTIES.gwinnett;
const law=c.districts.find(d=>d.id==='gwin-lawrenceville'),uninc=c.districts.find(d=>d.id==='gwin-uninc');
assert.equal(law.taxYear,'2026');
assert.equal(uninc.taxYear,'2026');
assert.ok(c.notes.includes('separately issued city bill'));
assert.ok(c.notes.includes('stormwater'));
assert.ok(c.notes.includes('$20,000 city-assessed-value'));
const markets=[{v:400000,county:5056,city:521.6,total:5577.6},{v:250000,county:3160,city:326,total:3486},{v:575000,county:7268,city:749.8,total:8017.8}];
for(const x of markets){
 const assessed=x.v*0.40;
 const county=assessed*31.6/1000,city=assessed*3.26/1000,combined=x.v*law.tr;
 assert.ok(Math.abs(county-x.county)<0.00001);
 assert.ok(Math.abs(city-x.city)<0.00001);
 assert.ok(Math.abs(combined-(county+city))<0.00001);
 assert.ok(Math.abs(combined-x.total)<0.00001);
}
assert.ok(Math.abs(uninc.tr-34.86*0.4/1000)<0.000000001);
console.log(JSON.stringify({caseCount:markets.length,countyMills:31.6,separateCityMills:3.26,assessmentRatio:0.4,sourceTaxYear:law.taxYear,officialCitations:2,pass:true}));
