// St Lucie County Property Appraiser final 2026 district total millage chart.
// https://www.paslc.gov/DocumentCenter/View/686/2026-Final-Tax-Rates-PDF
// All 7 code groups, pre-homestead and separate non-ad-valorem charges.
'use strict';const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=new Function(html.slice(a,b)+'\nreturn COUNTIES;')()['st-lucie'];
const expected={
 'stl-0001':18.8075,'stl-0002':18.9427,'stl-0050':19.4627,
 'stl-0009':19.1893,'stl-0011':22.0043,'stl-0022':24.0293,'stl-0041':21.8691
};
assert.equal(c.districts.filter(d=>d.taxYear==='2026').length,7);
for(const [id,mills] of Object.entries(expected)){
 const opts=c.districts.filter(d=>d.id===id);assert.equal(opts.length,1,id);
 assert.equal(opts[0].taxYear,'2026');
 assert.ok(Math.abs(opts[0].tr-mills/1000)<1e-12,'2026 adopted official millage mismatch '+id);
 for(const price of [250000,400000,575000])assert.ok(Math.abs(opts[0].tr*price-price*mills/1000)<1e-7);
}
assert.ok(c.districts.find(d=>d.id==='stl-0011').label.includes('9341'));
assert.ok(c.districts.find(d=>d.id==='stl-0022').label.includes('9322'));
assert.equal(c.districts.filter(d=>!d.taxYear).length,4,'Unverified historic planning options must stay unverified');
console.log(JSON.stringify({market:'st-lucie',officialRateCodes:7,priceChecks:21,sourceYear:2026,finalParcelExemptionsAndFeesCertified:false,passed:true}));
