// Palm Beach County 2026 final taxing-authority component audit.
// Source: Palm Beach County Property Appraiser, 2026 Final vs Proposed Millage Rates:
// https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf
// Confirms ONLY the twelve named standard unincorporated components in the buyer code;
// no claim about parcel district boundaries, municipal/special overlays, homeowner exemptions,
// non-ad valorem charges or the legally payable 2027 buyer tax.
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i,'COUNTIES block missing');
const c=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')()['palm-beach'];
assert.equal(c.state,'fl');
const d=c.districts.find(x=>x.id==='pb-uninc');
assert.ok(d,'Standard unincorporated Palm Beach entry missing');
assert.equal(d.taxYear,'2026');
const components={
 county:4.5000,countyDebt:0.0210,fire:3.4581,library:0.5491,
 sfwmd:0.0948,okeechobeeBasin:0.1026,everglades:0.0327,
 find:0.0270,schoolState:3.0390,schoolLocal:3.2480,
 childrensServices:0.4908,healthCare:0.6561
};
assert.equal(Object.keys(components).length,12);
const sourceFormula='tr:(4.5000 + 0.0210 + 3.4581 + 0.5491 + 0.0948 + 0.1026 + 0.0327 + 0.0270 + 3.0390 + 3.2480 + 0.4908 + 0.6561) / 1000';
const countyBlock=html.slice(html.indexOf("'palm-beach': {"),html.indexOf("'martin': {"));
assert.ok(countyBlock.includes(sourceFormula),'Palm Beach exact 2026 source component sequence changed');
const expected=Object.values(components).reduce((a,b)=>a+b,0)/1000;
assert.ok(Math.abs(d.tr-expected)<1e-12,'2026 12-component base rate differs from official values');
for(const taxableValue of [75000,250000,500000]){
 const due=Math.round((taxableValue*expected)*100)/100;
 assert.equal(Math.round(taxableValue*d.tr*100)/100,due);
}
const unknown=d=>!d.taxYear&&!d.taxPeriod;
assert.equal(c.districts.filter(x=>x.id!=='pb-uninc'&&unknown(x)).length,5,'Additional city planning choices require tax-year verification');
console.log('PASS: Palm Beach 2026 unincorporated base 12/12 official components and 3/3 pre-exemption taxable-value examples; 5 city planning choices remain unverified. NOT parcel/exemption/fee certification.');
