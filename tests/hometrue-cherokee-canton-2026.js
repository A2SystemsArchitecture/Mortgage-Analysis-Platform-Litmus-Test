const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf("  'cherokee': {");
const end = html.indexOf("  'forsyth': {", start);
assert.ok(start >= 0 && end > start, 'Cherokee market configuration exists');
const fragment = html.slice(start, end);
const county = new Function('return ({' + fragment + '})')().cherokee;
const canton = county.districts.find(d => d.id === 'cher-canton');
const unincorporated = county.districts.find(d => d.id === 'cher-uninc');
assert.ok(canton && unincorporated, 'District IDs remain compatible with saved buyer links');

const officialCantonMills = 23.926 + 5.250;
assert.ok(Math.abs(canton.tr - .4 * officialCantonMills / 1000) < 1e-12);
assert.ok(Math.abs(unincorporated.tr - .4 * 26.949 / 1000) < 1e-12);

const cases = [[350000, 4084.64], [400001, 4668.17], [575000, 6710.48], [800000, 9336.32]];
for (const [price, expectedTax] of cases) {
  assert.equal(Number((price * canton.tr).toFixed(2)), expectedTax);
}
console.log('Passed four Canton pre-exemption calculations, adopted-rate composition and legacy district ID checks.');

// Source: https://www.cherokeecountytax.com/property.html (2026 incorporated base 23.926 mills)
// Source: https://www.cantonga.gov/Home/Components/News/News/1681/ (2026 Canton city 5.250 mills)
// Limits: excludes exemptions, special parcels and fees; not a browser or customer-report test.
