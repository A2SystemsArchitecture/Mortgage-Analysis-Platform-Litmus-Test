const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const begin = html.indexOf("  'hall': {"), end = html.indexOf("  'dawson': {", begin);
assert.ok(begin >= 0 && end > begin, 'Hall market exists');
const county = new Function('return ({' + html.slice(begin, end) + '})')().hall;
for (const [id, mills] of [['hal-uninc', 24.192], ['hal-gainesville', 14.221]]) {
  const district = county.districts.find(d => d.id === id);
  assert.ok(district, 'Missing district ' + id);
  assert.ok(Math.abs(district.tr - 0.4 * mills / 1000) < 1e-12, 'Rate mismatch ' + id);
  for (const price of [200000, 400001, 575000]) {
    assert.ok(Math.abs(price * district.tr - price * 0.4 * mills / 1000) < 1e-8, 'Price mismatch ' + id + ' ' + price);
  }
}
console.log('Hall GA 2026 two official district rates and six price scenarios passed.');
// Official Hall County Tax Commissioner 2026 revised millage chart p. 1:
// https://hallcountytax.org/wp-content/uploads/2026/09/2026-Revised-Millage-Chart-Website.pdf
// District 001 (County) 24.192 mills; Gainesville 004 total 14.221 mills.
// Pre-homestead tax at Georgia's ordinary 40% assessment ratio only.
// Parcel district, grants, non-ad valorem charges, browser and PDF not tested.
