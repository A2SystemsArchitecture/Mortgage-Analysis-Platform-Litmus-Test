// HomeTrue financial certification gate: ALL 31 Batch 1 markets, including Dorchester County SC.
// Run: node tests/hometrue-batch1-thirty-one-market-gate.js
// Intentionally fails until all 31 markets pass the applicable financial gates.
// The earlier 30-market script (excluding-dorchester-gate.js) is retained unchanged as history.
// This does not validate payments, security, legal signoff or production deployment.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const csv = fs.readFileSync(path.resolve(__dirname, '../audits/HomeTrue-2027-launch-verification-gates.csv'), 'utf8');
function parseCSVLine(line) {
  const fields = []; let i = 0;
  while (i < line.length) {
    if (line[i++] !== '"') throw new Error('Invalid unquoted CSV field');
    let value = '', closed = false;
    while (i < line.length) {
      if (line[i] === '"' && line[i+1] === '"') { value += '"'; i += 2; }
      else if (line[i] === '"') { i++; closed = true; break; }
      else value += line[i++];
    }
    if (!closed) throw new Error('Unclosed CSV quote');
    fields.push(value);
    if (line[i] === ',') i++;
    else if (i !== line.length) throw new Error('Unexpected CSV delimiter');
  }
  return fields;
}
const lines = csv.trim().split(/\r?\n/);
const headers = parseCSVLine(lines.shift());
const all = lines.map(line => {
  const fields = parseCSVLine(line);
  if (fields.length !== headers.length) throw new Error('CSV column mismatch');
  return Object.fromEntries(headers.map((h, i) => [h, fields[i]]));
});
if (all.length !== 124) throw new Error('Inventory changed: expected 124');
const states = { FL:7, GA:14, AL:4, SC:6 };
const selected = all.filter(row => Object.hasOwn(states, row.state));
if (selected.length !== 31 || new Set(selected.map(r=>r.market_id)).size !== 31) throw new Error('Expected 31 unique Batch 1 markets');
for (const [state,count] of Object.entries(states)) if(selected.filter(r=>r.state===state).length !== count) throw new Error('Wrong state count: '+state);
const dorchester = selected.filter(row=>row.market_id==='dorchester-sc');
if(dorchester.length!==1 || dorchester[0].state!=='SC') throw new Error('Dorchester must appear exactly once in the 31-market scope');
const checks = [
 'batch1_local_case_documented',
 'batch1_current_year_district_case_documented',
 'batch1_main_buyer_district_correction_documented',
 // Authorized November 22: require current officially adopted composite with actual year,
 // not an unavailable 2027-only rate. Retain the historical 2027 field in the CSV.
 'batch1_latest_adopted_composite_verified',
 'exemption_rules_and_eligibility_verified',
 'district_geography_verified',
 'calculator_scenario_tests_passed',
 'full_launch_certified'
];
const totals = Object.fromEntries(checks.map(k=>[k,selected.filter(r=>r[k]==='true').length]));
const open = selected.map(r=>({market:r.market_id, missing:checks.filter(k=>r[k]!=='true')})).filter(r=>r.missing.length);
console.log(JSON.stringify({scope:'Batch 1, all 31 markets including Dorchester: financial gates only',markets:31,includes:'dorchester-sc',totals,open},null,2));
if (open.length) { console.error('BLOCKED: 31-market financial certification is incomplete. No merge/deployment.'); process.exitCode=1; }
else console.log('Financial register gates passed for all 31 markets; independent tests and approvals still required.');
