// Guards the HomeTrue Batch 1 handoff from double counting or erasing prior research.
// Run: node tests/hometrue-batch1-reconciliation-guard.js
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const csv=fs.readFileSync(path.join(root,'audits','HomeTrue-2027-launch-verification-gates.csv'),'utf8').trim().split(/\r?\n/);
function parse(line){const items=[];const rx=/"((?:[^"]|"")*)"(?:,|$)/g;let m;while((m=rx.exec(line))!==null)items.push(m[1].replace(/""/g,'"'));return items;}
const headers=parse(csv[0]),rows=csv.slice(1).map(parse);assert.equal(rows.length,124);
for(const row of rows)assert.equal(row.length,headers.length);
const lookup=new Map(rows.map(r=>[r[0],Object.fromEntries(headers.map((k,i)=>[k,r[i]]))]));
assert.equal(lookup.size,124,'Duplicate market identifiers');
const states=new Set(['FL','GA','AL','SC']);
const batch=rows.filter(r=>states.has(r[1]));
assert.equal(batch.length,31);
const counts={FL:7,GA:14,AL:4,SC:6};
for(const [state,n]of Object.entries(counts))assert.equal(batch.filter(r=>r[1]===state).length,n);
const statuses={MAIN_2026:21,STANDALONE_2026:5,PARTIAL_OR_HISTORICAL:2,NO_DOCUMENTED_LOCAL_CASE:3};
for(const [s,n]of Object.entries(statuses))assert.equal(batch.filter(r=>lookup.get(r[0]).batch1_existing_work_status===s).length,n,s);
const workStatus=new Set(Object.keys(statuses));
for(const row of batch){
 const m=lookup.get(row[0]),s=m.batch1_existing_work_status;
 assert.ok(workStatus.has(s),'Missing prior-work classification '+row[0]);
 const current=s==='MAIN_2026'||s==='STANDALONE_2026';
 assert.equal(m.batch1_local_case_documented,String(current||s==='PARTIAL_OR_HISTORICAL'));
 assert.equal(m.batch1_current_year_district_case_documented,String(current));
 assert.equal(m.batch1_main_buyer_district_correction_documented,String(s==='MAIN_2026'));
 assert.equal(m.full_launch_certified,'false','Never infer certification from research '+row[0]);
}
for(const row of rows)assert.equal(lookup.get(row[0]).full_launch_certified,'false');
const ledger=fs.readFileSync(path.join(root,'audits','HomeTrue-Batch-1-Verification-Ledger.md'),'utf8');
const reconciliation=fs.readFileSync(path.join(root,'audits','HomeTrue-Batch-1-Full-Reconciliation-2026-11-20.md'),'utf8');
for(const id of batch.map(r=>r[0]))assert.ok(reconciliation.includes('| '+lookup.get(id).state+' | '+lookup.get(id).market_name.replace(/ County$/,'').replace(/^St\. /,'St. ') )||reconciliation.includes(lookup.get(id).market_name.split(' County')[0]),'Reconciliation name must appear '+id);
assert.ok(ledger.includes('28 / 31')&&ledger.includes('26 / 31')&&ledger.includes('21 / 31')&&ledger.includes('0 / 31'));
// Cross-check that a newly counted current-year market is named in the
// human-readable summary, preventing omissions in the listed counties.
const currentYearSummary=ledger.split('\n').find(line=>line.startsWith('| Market with an evidenced current-year district property-tax calculation exercised |'));
assert.ok(currentYearSummary,'Missing current-year milestone summary');
assert.match(currentYearSummary,/Richland \(SC district 1ER\)/,'Current-year summary must name Richland district 1ER');
assert.match(currentYearSummary,/Greenville \(SC\)/,'Current-year summary must name Greenville');
assert.match(currentYearSummary,/Richmond \(GA districts 001-004\)/,'Current-year summary must name Richmond districts');

console.log('Batch 1: 124 unique market IDs, 31 classified; 21 MAIN + 5 STANDALONE + 2 PARTIAL + 3 NO CASE; 0 certified.');
