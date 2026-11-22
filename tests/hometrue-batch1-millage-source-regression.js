// HomeTrue Batch 1 source-bounded pre-exemption rate regression.
// Run manually: node tests/hometrue-batch1-millage-source-regression.js
// These tests protect named 2026 district options; they are NOT full buyer reports,
// proof of homeownership eligibility, municipal coverage, fee/tax credits, or 2027 rates.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.resolve(__dirname, '../platform.html'), 'utf8');

function rateFor(id) {
  const lines = html.split(/\r?\n/).filter(line => line.includes("{id:'" + id + "'"));
  assert.equal(lines.length, 1, 'Missing or duplicate district ID: ' + id);
  // District objects now carry taxYear metadata after tr; stop at the next comma.
  const match = lines[0].match(/\{id:'[^']+',label:'[^']*',tr:([^,}]+)/);
  assert.ok(match, 'District rate expression unavailable: ' + id);
  const expr = match[1].trim();
  assert.match(expr, /^[0-9.\s()+*/-]+$/, 'Non-arithmetic expression: ' + id);
  const value = vm.runInNewContext(expr, Object.create(null), {timeout:100});
  assert.ok(Number.isFinite(value) && value >= 0, 'Invalid rate: ' + id);
  return value;
}

let count = 0;
function check(id, expected, source) {
  const actual = rateFor(id);
  assert.ok(Math.abs(actual - expected) < 1e-10,
    id + ': expected ' + expected + ' actual ' + actual + ' source ' + source);
  count++;
}

// Bills are officially issued 2026, except where explicitly marked county estimator/schedule.
check('daw-district-001-2026', 0.4 * 16.263 / 1000, 'Dawson issued 2026 bill 2026-3380 district 001, commercial');
check('for-district-001-2026', 0.4 * 24.458 / 1000, 'Forsyth issued 2026 commercial bill PAN 2026115263');
check('lump-dahlonega-2026', 0.4 * 25.270 / 1000, 'Lumpkin issued 2026 EXEMPT government-owned bill 2026-10410');
check('col-2026-uninc-fire', 0.4 * 22.276 / 1000, 'Columbia GA government 2026 tax workbook');
check('col-2026-grovetown', 0.4 * 19.488 / 1000, 'Columbia GA government 2026 Grovetown tax workbook');
check('rich-2026-001', 0.4 * 28.284 / 1000, 'Richmond GA tax commissioner 2026 district 001');
check('grv-district-000-2026-legal4', 0.04 * 107.7 / 1000, 'Greenville SC 2026 Auditor district 000 eligible approved 4%');
check('grv-district-000-2026-other6', 0.06 * 248.9 / 1000, 'Greenville SC 2026 Auditor district 000 nonapproved 6%');
check('ric-district-1er-2026-legal4', 0.04 * 212.6 / 1000, 'Richland SC official 2026 district 1ER tax estimator approved 4%');
check('ric-district-1er-2026-other6', 0.06 * 466.9 / 1000, 'Richland SC official 2026 district 1ER tax estimator 6%');
check('cha-city-2026-legal4', 0.04 * (300.8 - 145.2) / 1000, 'Charleston 2026 Auditor millage card city approved 4%');
check('cha-city-2026-other6', 0.06 * 300.8 / 1000, 'Charleston 2026 Auditor millage card city nonapproved 6%');

// Reconcile actual issued nonexempt commercial bills using their taxable assessed value,
// without falsely assuming the sale-price residential assessed fraction was applicable.
assert.equal(Number((19039200 * 16.263 / 1000).toFixed(2)), 309634.51, 'Dawson issued bill reconciliation');
assert.equal(Number((8462335 * 24.458 / 1000).toFixed(2)), 206971.79, 'Forsyth issued bill reconciliation');
count += 2;

// Preserve legacy IDs to avoid silently breaking previously generated links.
for (const id of ['daw-uninc', 'daw-dawsonville', 'for-cumming', 'for-uninc',
 'lump-dahlonega', 'lump-uninc', 'grv-greenville', 'ric-columbia',
 'cha-charleston']) {
  assert.ok(html.includes("{id:'" + id + "'"), 'Legacy link selection missing: ' + id);
  count++;
}

// An unsupported Dorchester 2026 millage must never be manufactured here.
assert.ok(!html.includes("id:'dor-district-2026-"), 'Unverified Dorchester current-year option exists');
count++;
console.log('PASS ' + count + ' source-bounded checks; NOT full Batch 1 certification');
