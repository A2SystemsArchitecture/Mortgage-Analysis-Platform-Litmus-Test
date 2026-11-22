// HomeTrue Batch 1: explicit FINANCIAL release gate. Manual invocation:
// node tests/hometrue-batch1-release-gate.js
// This intentionally fails while any of the 31 market certifications is incomplete.
// It cannot certify payments, security, legal approval or deployment readiness.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const csv = fs.readFileSync(path.resolve(__dirname, '../audits/HomeTrue-2027-launch-verification-gates.csv'), 'utf8');

function parseCSVLine(line) {
  const fields = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] !== '"') throw new Error('Unexpected nonquoted CSV field');
    i++;
    let value = '';
    while (i < line.length) {
      if (line[i] === '"' && line[i + 1] === '"') { value += '"'; i += 2; continue; }
      if (line[i] === '"') { i++; break; }
      value += line[i++];
    }
    fields.push(value);
    if (line[i] === ',') i++;
    else if (i !== line.length) throw new Error('Unexpected CSV delimiter');
  }
  return fields;
}
const lines = csv.trim().split(/\r?\n/);
const headers = parseCSVLine(lines.shift());
const records = lines.map(line => {
  const values = parseCSVLine(line);
  if (values.length !== headers.length) throw new Error('Misaligned CSV release-gate record');
  return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
});
if (records.length !== 124) throw new Error('Expected 124 unchanged market records; got ' + records.length);
const desired = {FL:7, GA:14, AL:4, SC:6};
const batch = records.filter(row => Object.hasOwn(desired, row.state));
if (batch.length !== 31) throw new Error('Batch 1 market inventory not 31');
for (const [st,n] of Object.entries(desired)) {
  if (batch.filter(r => r.state === st).length !== n) throw new Error('Wrong Batch 1 ' + st + ' count');
}
if (new Set(batch.map(r => r.market_id)).size !== 31) throw new Error('Duplicate Batch 1 market ID');

const required = [
  'batch1_local_case_documented',
  'batch1_current_year_district_case_documented',
  'batch1_main_buyer_district_correction_documented',
  'complete_composite_2027_rate_verified',
  'exemption_rules_and_eligibility_verified',
  'district_geography_verified',
  'calculator_scenario_tests_passed',
  'full_launch_certified'
];
const open = batch.map(row => ({
  id:row.market_id,
  state:row.state,
  missing:required.filter(key => row[key] !== 'true')
})).filter(row => row.missing.length);
const totals = Object.fromEntries(required.map(k=>[k,batch.filter(r=>r[k]==='true').length]));
console.log(JSON.stringify({scope:'Batch 1 financial evidence only',markets:31,passed:31-open.length,totals,open},null,2));
if (open.length) {console.error('BLOCKED: Batch 1 financial launch certification not complete. Do not merge/deploy based on rate coverage.');process.exitCode=1;}
else console.log('Financial ledger gates pass. Separate payments/security/legal/operations approval still required.');
