// Prevent accidental omission of mandatory Batch 1 certification fields.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const source = fs.readFileSync(path.join(__dirname, 'hometrue-batch1-excluding-dorchester-gate.js'), 'utf8');
const checksSection = source.split('const checks = [')[1]?.split('];')[0];
assert.ok(checksSection, 'Certification checks array missing');
const active = [...checksSection.matchAll(/^\s*'([^']+)'\s*,?\s*$/gm)].map(x => x[1]);
const required = [
  'batch1_local_case_documented',
  'batch1_current_year_district_case_documented',
  'batch1_main_buyer_district_correction_documented',
  'batch1_latest_adopted_composite_verified',
  'exemption_rules_and_eligibility_verified',
  'district_geography_verified',
  'calculator_scenario_tests_passed',
  'full_launch_certified'
];
assert.deepEqual(active, required, 'One or more mandatory financial gates were omitted or commented out');
const gate = spawnSync(process.execPath, [path.join(__dirname, 'hometrue-batch1-excluding-dorchester-gate.js')], {encoding:'utf8'});
assert.ok([0,1].includes(gate.status), 'Unexpected gate runtime error');
const result = JSON.parse(gate.stdout);
assert.equal(result.markets, 30);
assert.equal(result.excluded, 'dorchester-sc');
for (const key of required) assert.ok(Object.hasOwn(result.totals,key), 'Missing reported gate: '+key);
assert.equal(gate.status, result.open.length ? 1 : 0, 'Exit status must enforce actual unresolved gates');
console.log('PASS: all eight financial certification gates enforced; scope 30, Dorchester excluded.');
