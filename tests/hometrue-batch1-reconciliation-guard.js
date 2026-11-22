// HomeTrue Batch 1 live reconciliation control. Distinguishes partial official work from certification.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'audits','HomeTrue-2027-launch-verification-gates.csv'),'utf8');
function parseCSV(line){
  const fields=[];let i=0;
  while(i<line.length){
    assert.equal(line[i++],'"','Expected quoted CSV field');
    let value='',closed=false;
    while(i<line.length){
      if(line[i]==='"'&&line[i+1]==='"'){value+='"';i+=2;}
      else if(line[i]==='"'){i++;closed=true;break;}
      else value+=line[i++];
    }
    assert.ok(closed,'Unclosed CSV field');
    fields.push(value);
    if(i<line.length)assert.equal(line[i++],',','Unexpected CSV delimiter');
  }
  return fields;
}
const lines=source.trim().split(/\r?\n/),headers=parseCSV(lines.shift());
const rows=lines.map(line=>{const cells=parseCSV(line);assert.equal(cells.length,headers.length);return Object.fromEntries(headers.map((key,i)=>[key,cells[i]]));});
assert.equal(rows.length,124,'124-market inventory must be reconciled before changing scope');
assert.equal(new Set(rows.map(r=>r.market_id)).size,124,'Duplicate market IDs');
const states={FL:7,GA:14,AL:4,SC:6};
const batch=rows.filter(r=>Object.hasOwn(states,r.state));
assert.equal(batch.length,31,'Original Batch 1 inventory must remain 31');
for(const [state,count] of Object.entries(states))assert.equal(batch.filter(r=>r.state===state).length,count,state);
assert.equal(batch.filter(r=>r.market_id==='dorchester-sc').length,1,'Dorchester must be tracked exactly once');
const included=batch.filter(r=>r.market_id!=='dorchester-sc');
assert.equal(included.length,30,'Dorchester deferred, not deleted');
const boolFields=['batch1_local_case_documented','batch1_current_year_district_case_documented','batch1_main_buyer_district_correction_documented','batch1_latest_adopted_composite_verified','exemption_rules_and_eligibility_verified','district_geography_verified','calculator_scenario_tests_passed','full_launch_certified'];
for(const row of included){
 for(const key of boolFields)assert.ok(['true','false'].includes(row[key]),'Unknown gate value '+row.market_id+': '+key);
 assert.equal(row.batch1_local_case_documented,'true','Local evidence missing: '+row.market_id);
 assert.equal(row.batch1_current_year_district_case_documented,'true','Current-year case missing: '+row.market_id);
 assert.equal(row.batch1_main_buyer_district_correction_documented,'true','Buyer district correction missing: '+row.market_id);
 if(row.full_launch_certified==='true'){
   for(const gate of boolFields.filter(x=>x!=='full_launch_certified'))assert.equal(row[gate],'true','Certified without prerequisite '+gate+' in '+row.market_id);
 }
}
const ledger=fs.readFileSync(path.join(root,'audits','HomeTrue-Batch-1-Verification-Ledger.md'),'utf8');
const summary=[
 ['Market with an evidenced local property-tax calculation exercised',31,31],
 ['Market with an evidenced current-year district property-tax calculation exercised',30,31],
 ['Market with an evidenced district correction in main buyer flow',30,31],
 ['Market with full financial sign-off',0,31]
];
for(const [label,n,denom] of summary){
 const line=ledger.split(/\r?\n/).find(x=>x.startsWith('| '+label+' |'));
 assert.ok(line,'Ledger milestone missing: '+label);
 assert.ok(line.includes(n+' / '+denom),'Ledger milestone differs from source registry: '+label);
}
const expected=['batch1_local_case_documented','batch1_current_year_district_case_documented','batch1_main_buyer_district_correction_documented'];
for(const field of expected)assert.equal(included.filter(r=>r[field]==='true').length,30,field);
const certified=included.filter(r=>r.full_launch_certified==='true').length;
assert.equal(certified,0,'Any newly certified market requires independent ledger and audit update before this guard can pass');
console.log(JSON.stringify({scope:'30 included markets, Dorchester deferred',partialEvidence:30,fullyCertified:certified,registryAndLedgerReconciled:true}));
