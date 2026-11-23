// Fail closed on unsupported adoption-year claims for six open rate-composite markets.
// This is a provenance regression, not certification or geocoding.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const src = fs.readFileSync(path.resolve(__dirname,'../platform.html'),'utf8');
const marketIds=['palm-beach','fulton','gwinnett','forsyth','dawson','lumpkin'];
const configs={};
for(const id of marketIds){
 const token="  '"+id+"': {";
 const start=src.indexOf(token);
 assert.ok(start>=0,'Missing market '+id);
 const next=src.indexOf('\n  \x27',start+token.length);
 configs[id]=src.slice(start,next<0?undefined:next);
}
for(const [id,options] of Object.entries({
 'palm-beach':['pb-wpb','pb-boca','pb-boynton','pb-delray','pb-wellington'],
 'gwinnett':['gwin-suwanee','gwin-duluth']
})){
 for(const option of options){
  const row=configs[id].split('\n').find(s=>s.includes("id:'"+option+"'"));
  assert.ok(row,'Missing rate selection '+option);
  assert.doesNotMatch(row,/\btaxYear\s*:/,'Unsupported rate year added to '+option);
 }
}
// Gwinnett's 2026 Duluth city and county levies are distinct, and city
// stormwater fees must not be presented as included in value-based tax.
const duluth=configs.gwinnett.split('\n').find(line=>line.includes("id:'gwin-duluth'"));
assert.match(duluth,/31\.6\s*\+\s*6\.551/,'Preserve separately billed county/city millages');
assert.match(configs.gwinnett,/O2026-36/,'Disclose the separate Duluth stormwater fee ordinance');
const gross=(31.6+6.551)/1000*0.40*400000;
assert.equal(Math.round(gross*100)/100,6104.16,'Duluth $400k fictional pre-exemption arithmetic');
// Lumpkin's issued government-owned sample bill is not proof that its
// 2026 county millage matches the later revised adoption resolution.
assert.match(configs.lumpkin,/Resolution 2026-57/,'Missing revised 2026 Lumpkin millage warning');
assert.match(configs.lumpkin,/12\.929 school M&O mills/,'Lumpkin pre-adoption 2026 school rate provenance absent');
assert.match(configs.lumpkin,/adoption vote has not been independently verified/,'Lumpkin school adoption is incorrectly assumed');
assert.match(configs.lumpkin,/government-owned/,'Lumpkin source parcel must be identified as exempt government property');
assert.match(configs.lumpkin,/2026 tax-information brochure/,'Lumpkin 2026 official exemption source missing');
assert.match(configs.lumpkin,/\$30,000 assessed-value relief against school taxes/,'Lumpkin eligible 62+ school relief not disclosed');
assert.match(configs.lumpkin,/\$60,000/,'Lumpkin 65+ county\/city assessed relief not disclosed');
assert.match(configs.lumpkin,/NOT automatically applied/,'Lumpkin exemptions must not silently be granted');
for (const id of ['lump-dahlonega','lump-uninc']) {
 const row=configs.lumpkin.split('\n').find(line=>line.includes("id:'"+id+"'"));
 assert.ok(row && !/taxYear\s*:/.test(row),'Legacy Lumpkin rate falsely stamped current-year: '+id);
}
// Rate certification status is intentionally NOT frozen at false here.
// After verified primary evidence and accompanying buyer regressions are saved,
// the controlling release gate may legitimately advance one of these markets.
// Reject duplicated or malformed register entries, not future progress.
const csv=fs.readFileSync(path.resolve(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
function quotedCells(line){
 return [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map(m=>m[1].replace(/""/g,'"'));
}
const lines=csv.trim().split(/\r?\n/), headers=quotedCells(lines.shift());
const idIndex=headers.indexOf('market_id');
const flagIndex=headers.indexOf('batch1_latest_adopted_composite_verified');
const reasonIndex=headers.indexOf('reason');
assert.ok(idIndex>=0 && flagIndex>=0 && reasonIndex>=0);
const entries=lines.map(quotedCells);
for(const id of marketIds){
 const matches=entries.filter(row=>row[idIndex]===id);
 assert.equal(matches.length,1,'Missing or duplicate rate record '+id);
 const row=matches[0];
 assert.ok(['true','false'].includes(row[flagIndex]),'Malformed adopted-rate status '+id);
 assert.ok(row[reasonIndex].trim().length>10,'Missing explanation of rate status '+id);
}
console.log('PASS: six-market register entries well formed; seven currently unsourced city choices have no misleading tax year.');
