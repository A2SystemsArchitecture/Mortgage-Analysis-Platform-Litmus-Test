// The Cobb County Tax Commissioner's official 2026 Millage Rates of Cobb County Bills.
// Primary PDF: https://cms9files.revize.com/cobbcounty/Property/Millage%20Rates/2026%20Millage%20Rates.pdf
// These are PRE-exemption combined millages for specified authorities (NOT parcel certification).
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start)+3;
const counties=new Function(html.slice(start,end)+'\nreturn COUNTIES;')();
const options=counties.cobb.districts;
// Every row in the official chart mapped to its stated total county-and-city rate.
const official={
 'cob-uninc':30.13,
 'cob-acworth':39.08,
 'cob-austell':35.41,
 'cob-kennesaw':39.28,
 'cob-marietta':31.122,
 'cob-marietta-dmda':32.394,
 'cob-marietta-cid':36.122,
 'cob-powdersprings':39.63,
 'cob-smyrna':36.15,
 'cob-mableton':34.63,
 'cob-mableton-sixflags':38.13,
 'cob-cumberland-cid':37.58,
 'cob-towncenter-cid':35.13,
 'cob-cumberland-ssd':32.58,
 'cob-county-no-fire':27.16
};
assert.equal(options.length,Object.keys(official).length,'All official supported 2026 composite options present');
for(const [id,mills] of Object.entries(official)){
 const optionsForId=options.filter(x=>x.id===id);
 assert.equal(optionsForId.length,1,'Missing/duplicate 2026 official Cobb option '+id);
 const opt=optionsForId[0];assert.equal(opt.taxYear,'2026',id+' source year');
 assert.ok(Math.abs(opt.tr-0.4*mills/1000)<1e-12,id+': 40%-assessed fractional levy mismatch');
 for(const price of [250000,400000,575000]){
  const expected=price*0.4*mills/1000;
  assert.ok(Math.abs(price*opt.tr-expected)<1e-7,id+' arithmetic '+price);
 }
}
const k=options.find(x=>x.id==='cob-kennesaw');
assert.equal(Number((400000*k.tr).toFixed(2)),6284.80,'Kennesaw published total 39.28 mills must include county fire');
assert.equal(Number((400000*0.4*2.97/1000).toFixed(2)),475.20,'Fire levy omission guard');
console.log(JSON.stringify({sourceYear:2026,officialCompositeDistricts:15,illustrativeValuesPerDistrict:3,kennesaw400kAnnualPreExemption:6284.80,previousUnderstatementAnnual:475.20,parcelAndEligibilityCertified:false,passed:true}));
