// Gwinnett 2026 independently sourced county levy and separate city tax cross-checks.
// County's adopted 2026 schedule:
// https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates
// Lawrenceville's official 2026 city levy:
// https://www.lawrencevillega.org/181/Property-Taxes
// Suwanee's current city tax statement:
// https://www.suwanee.com/government/city-hall/business-services-department/property-taxes
// Suwanee FY27 budget calls 4.93 a proposal, NOT proof of 2026 levy adoption:
// https://www.suwanee.com/Home/Components/News/News/1230/159
// No full Gwinnett rate-source certification: Suwanee final adoption and Duluth
// official adoption, parcel geography, special districts, exemptions, fees pending.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i,'Missing county registry');
const c=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')().gwinnett;
assert.equal(c.state,'ga');
const options=Object.fromEntries(c.districts.map(d=>[d.id,d]));
assert.equal(c.districts.length,4,'All Gwinnett buyer choices need source re-review when modified');
// City of Suwanee official property-tax guidance: Gwinnett homestead exemptions
// are not applied to the separate Suwanee municipal property tax bill.
// https://www.suwanee.com/government/city-hall/business-services-department/property-taxes
assert.ok(c.notes.includes("Gwinnett County homestead exemptions do not apply to the separately billed Suwanee city property tax"),'Suwanee city homestead warning missing');
assert.ok(c.notes.includes('Neither homestead nor city fee is automatically applied'),'No unsupported automatic city exemption/fee');
const cases=[
 {id:'gwin-uninc',county:34.86,city:0,year:'2026',scope:'2026 official full listed unincorporated code'},
 {id:'gwin-lawrenceville',county:31.6,city:3.26,year:'2026',scope:'2026 official county and separate-city sources'},
 {id:'gwin-suwanee',county:31.6,city:4.93,year:null,scope:'county official 2026, city current 4.93 but final adopted 2026 action unverified'},
 {id:'gwin-duluth',county:31.6,city:6.551,year:null,scope:'county official 2026, 2026 city ordinance not independently acquired'}
];
for(const x of cases){
 const d=options[x.id];
 assert.ok(d,x.id);
 const expected=0.4*(x.county+x.city)/1000;
 assert.ok(Math.abs(d.tr-expected)<1e-12,x.id+' total coded factor mismatch');
 if(x.year)assert.equal(d.taxYear,x.year,x.id+' verified source year');
 else assert.ok(!d.taxYear&&!d.taxPeriod,x.id+' cannot claim final adopted 2026 city year yet');
 for(const value of [200000,400000,600000]){
  const assessed=value*.4;
  const taxFromSeparateAuthorities=(assessed*x.county/1000)+(assessed*x.city/1000);
  assert.ok(Math.abs(value*d.tr-taxFromSeparateAuthorities)<1e-7,x.id+'/'+value);
 }
}
console.log('PASS Gwinnett 4/4 source-component arithmetic, 12/12 fictional gross tax splits, correctly withheld two incomplete 2026 municipal source years, and preserved no-Suwanee-city-homestead disclosure. Full market source gate and actual buyer net liability NOT certified.');
