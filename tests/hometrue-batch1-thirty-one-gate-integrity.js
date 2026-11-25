// Integrity check for the 31-market (Dorchester-inclusive) certification gate.
// The gate must cover exactly 31 markets, include Dorchester, and fail closed while any flag is false.
'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const gatePath=path.join(__dirname,'hometrue-batch1-thirty-one-market-gate.js');
const source=fs.readFileSync(gatePath,'utf8');
assert.ok(source.includes('SC:6')&&!source.includes("row.market_id !== 'dorchester-sc'"),'Gate must not filter Dorchester out');
const run=spawnSync(process.execPath,[gatePath],{encoding:'utf8'});
const json=JSON.parse(run.stdout.slice(run.stdout.indexOf('{'),run.stdout.lastIndexOf('}')+1));
assert.equal(json.markets,31);
assert.equal(json.includes,'dorchester-sc');
const dor=json.open.find(r=>r.market==='dorchester-sc');
assert.ok(dor,'Dorchester must be evaluated and open');
for(const k of ['batch1_current_year_district_case_documented','batch1_main_buyer_district_correction_documented','batch1_latest_adopted_composite_verified','exemption_rules_and_eligibility_verified','district_geography_verified','calculator_scenario_tests_passed','full_launch_certified'])
  assert.ok(dor.missing.includes(k),'Dorchester must report open: '+k);
assert.equal(Object.keys(json.totals).length,8,'Eight gate flags');
// Fail closed: while any flag is open the gate must exit nonzero.
assert.ok(json.open.length>0?run.status!==0:run.status===0,'Gate exit code must match open items');
console.log('PASS: 31-market gate covers Dorchester and fails closed; open markets: '+json.open.length);
