// Complete official 2026 real-property final millage code validation for Martin County Florida.
// https://www.pamartinfl.gov/millage-codes-tax-rates/458-2026-millage-codes-tax-rates
// 4301 Jupiter Island is specifically TPP ONLY and excluded from residential real property.
'use strict';const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const counties=new Function(html.slice(a,b)+'\nreturn COUNTIES;')();
const choices=counties.martin.districts.filter(d=>d.taxYear==='2026');
const source={
 '3100':17.1323,'1400':15.5242,'2200':15.3273,'4300':16.0305,'8018':16.5199,
 '6006':15.4782,'6106':15.6581,'7017':15.4145,'3003':15.4523,'9009':15.4595,'5005':15.4780
};
assert.equal(choices.length,Object.keys(source).length,'All official 2026 Martin residential millage codes present');
for(const [code,mills] of Object.entries(source)){
 const opt=choices.filter(d=>d.label.includes('('+code+')'));
 assert.equal(opt.length,1,'Missing/duplicate official Martin code '+code);
 assert.ok(Math.abs(opt[0].tr-mills/1000)<1e-12,'Mismatch source year 2026 Martin code '+code);
 for(const price of [250000,400000,575000])assert.ok(Math.abs(opt[0].tr*price-price*mills/1000)<1e-7);
}
assert.ok(!choices.some(d=>d.label.includes('(4301)')),'TPP-only rate cannot be applied to residential real property');
assert.ok(counties.martin.districts.some(d=>!d.taxYear&&d.label.includes('code unknown')));
console.log(JSON.stringify({market:'martin',year:2026,verifiedOfficialRealPropertyCodes:11,fictionalPriceCases:33,excludedTPPOnlyCode:'4301',actualParcelDrainageFeeAndHomesteadCertified:false,passed:true}));
