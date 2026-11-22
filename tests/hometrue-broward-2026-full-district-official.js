// All 41 tax-year 2026 Broward codes reconciled to the primary government millage table.
// https://bcpa.net/millage.asp, captured in audits/HomeTrue-Broward-2026-Official-Millage-Codes.csv
// Do not infer parcel eligibility or exemptions from the tax code's correct rate.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const table=fs.readFileSync(path.join(root,'audits/HomeTrue-Broward-2026-Official-Millage-Codes.csv'),'utf8').trim().split(/\r?\n/);
assert.equal(table.length,42);
const rows=table.slice(1).map(line=>{const m=line.match(/^2026,(\d{4}),"([^"]+)",(\d+\.\d{4}),https:\/\/bcpa\.net\/millage\.asp$/);assert.ok(m,'official fixture row format '+line);return {code:m[1],city:m[2],mills:Number(m[3])};});
assert.equal(new Set(rows.map(r=>r.code)).size,41);
const html=fs.readFileSync(path.join(root,'platform.html'),'utf8'),start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start)+3;
const counties=new Function(html.slice(start,end)+'\nreturn COUNTIES;')();
const options=counties.broward.districts;
const coded=options.filter(d=>d.taxYear==='2026'&&/\(\d{4}\)/.test(d.label));
assert.equal(coded.length,41,'Every official 2026 rate code must be independently selectable');
for(const {code,mills} of rows){
 const hits=coded.filter(d=>d.label.includes('('+code+')'));
 assert.equal(hits.length,1,'Missing or duplicated 2026 official tax code '+code);
 assert.ok(Math.abs(hits[0].tr-mills/1000)<1e-12,code+' official millage mismatch');
 for(const price of [250000,400000,575000])assert.ok(Math.abs(price*hits[0].tr-price*mills/1000)<1e-8,code+' source-rate arithmetic');
}
const unknown=options.filter(d=>d.label.includes('code unknown'));
assert.equal(unknown.length,4,'Preserve previously issued legacy unknown-code options but not as verified levies');
assert.ok(unknown.every(d=>!d.taxYear));
console.log(JSON.stringify({state:'FL',market:'Broward',sourceYear:2026,officialCodedOptions:41,unknownHistoricPlanningOptions:4,priceScenarios:123,parcelHomesteadFeesCertified:false,passed:true}));
