const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf("  if (model === 'sc') {");
assert.ok(start >= 0, 'South Carolina buyer guide is present');
const segment = html.slice(start, start + 2400);
for (const exact of [
  'state budget proviso 117.220',
  'from $50,000 to $75,000 of fair market value',
  'an additional $25,000',
  'Section 12-37-250',
  'Your county auditor must confirm eligibility',
  'Do not assume this temporary increase applies to later tax years',
  'School debt millage can still apply'
]) assert.ok(segment.includes(exact), 'Missing approved qualification: '+exact);
assert.ok(!segment.includes('Its amount and eligibility must be confirmed'), 'Old inaccurate disclosure remains');
console.log('South Carolina 2026 temporary homestead guidance: 8 checks passed.');
// Authority: SC Department of Revenue Information Letter #26-23 (October 2026),
// Act 259, H.5126, Part IB, Proviso 117.220 (2026-27).
// https://dor.sc.gov/administrative-legislative-regulations-tax-legislation-update-2026
// This test checks displayed guidance text only, NOT parcel tax math, eligibility,
// buyer reports, browser rendering or the printed PDF.
