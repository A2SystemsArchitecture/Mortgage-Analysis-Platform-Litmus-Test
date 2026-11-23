// Parse the ACTUAL HomeTrue county configuration; do not accept prose edits
// that introduce unescaped apostrophes and prevent all buyer calculations.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=src.indexOf('const COUNTIES = {');
const end=src.indexOf('\n};',start)+3;
assert.ok(start>=0&&end>start,'Market configuration missing');
let counties;
assert.doesNotThrow(()=>{counties=new Function(src.slice(start,end)+'\nreturn COUNTIES;')();},
 'HomeTrue county JavaScript configuration must compile');
const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const ids=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)"/gm)].map(x=>x[1]).filter(x=>x!=='dorchester-sc');
assert.equal(ids.length,30);
for(const id of ids){
 const c=counties[id];
 assert.ok(c&&c.districts&&c.districts.length>0,'Missing district model '+id);
 for(const d of c.districts){
  assert.ok(Number.isFinite(d.tr) && d.tr>=0 && d.tr<0.25,'Invalid effective source rate '+id+'/'+d.id);
 }
}
assert.ok(counties['dorchester-sc'],'Deferred Dorchester must not be silently deleted');
console.log('PASS: actual market config parses; 30 Batch 1 markets have valid district model and Dorchester remains deferred.');
