const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const start=html.indexOf("  'jefferson-al': {");
const end=html.indexOf("  'madison-al': {",start);
assert.ok(start>=0&&end>start);
const market=new Function('return ({'+html.slice(start,end)+'})')()['jefferson-al'];
const cases=[['jef-birmingham',72.5],['jef-hoover',72.6],['jef-vestavia',92.6],['jef-homewood',75.0],['jef-uninc',50.1]];
for(const [id,mill] of cases){
 const district=market.districts.find(d=>d.id===id);
 assert.ok(district,'Existing district ID '+id);
 assert.ok(Math.abs(district.tr-(mill/1000)*.1)<1e-12,id+' stored rate');
 for(const price of [200000,400001,575000]){
  const independent=(price*.1*mill)/1000;
  assert.ok(Math.abs(price*district.tr-independent)<1e-8,id+' '+price);
 }
}
console.log('Jefferson 2026 standard district rate and buyer price arithmetic: 20 assertions passed.');
// Official 2026 live municipal millage table: https://eringcapture.jccal.org/caportal/Custom/CA_MilageRate.aspx
// Hoover city 72.6-mill crosscheck: https://www.hooveralabama.gov/981/Taxes-and-Incentives
// District limitations: Birmingham subdist 10 = 50.3 mills; Hoover Bham subdist 10
// = 62.6 mills; Vestavia subdist 3 = 72.05 mills; Homewood subdist 10 = 58.5 mills.
// Existing buyer locations are standard districts only. Never infer a parcel's subdistrict.
// Exemptions and parcel special assessments not included. No browser or report verification.
