// Indian River County official FINAL 2026 code groups, property appraiser primary evidence.
// https://www.ircpa.org/media/14226/2026-final-millages-chart.pdf
// Exact code/levy comparison only, not net property tax or parcel eligibility verification.
'use strict';const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=new Function(html.slice(a,b)+'\nreturn COUNTIES;')()['indian-river'];
const official={
 'ir-code-1':14.18030,'ir-code-2':16.36150,'ir-code-3a':13.20710,'ir-code-3f':13.91920,
 'ir-code-4':18.08170,'ir-code-5':11.91680,'ir-code-6':11.76500,'ir-code-7':14.02850,
 'ir-code-7e':13.76740,'ir-code-8':15.85950,'ir-code-9':13.62970
};
const yearChoices=c.districts.filter(x=>x.taxYear==='2026');
assert.equal(yearChoices.length,11,'11 official rate groups expected');
for(const [id,mills] of Object.entries(official)){
 const d=yearChoices.filter(x=>x.id===id);
 assert.equal(d.length,1,id+' missing/duplicated');
 assert.ok(Math.abs(d[0].tr-mills/1000)<1e-12,id+' wrong final 2026 rate');
 for(const value of [250000,400000,575000])assert.ok(Math.abs(d[0].tr*value-value*mills/1000)<1e-7);
}
for(const code of ['1D','1E','3C'])assert.ok(yearChoices.find(d=>d.id==='ir-code-1').label.includes(code));
for(const code of ['7','7A','7B','7G','7I','7J','7K','7L','7M','7N','7O','7Q','7R','7S','7T','7U','7V','7W'])assert.ok(yearChoices.find(d=>d.id==='ir-code-7').label.includes(code));
assert.equal(c.districts.filter(d=>!d.taxYear).length,3,'three legacy code-unknown planning options preserved without certification');
console.log(JSON.stringify({market:'indian-river',taxYear:2026,officialLevyGroups:11,fictionalBuyerPriceCases:33,parcelExemptionsAndSeparateFeesCertified:false,passed:true}));
