// Node 18+: node --test tests/tax-audit.test.js
// Static regression tests for the HomeTrue market registry and high-risk corrections.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = source.indexOf('const COUNTIES = {');
const end = source.indexOf('\n};', start);
assert.ok(start >= 0 && end > start, 'COUNTIES object must exist');
const counties = vm.runInNewContext(source.slice(start, end + 2).replace(/^const COUNTIES = /, ''), {}, { timeout: 5000 });
const rows = Object.entries(counties);
const stateCodes = new Set(['al','ar','az','de','fl','ga','id','in','ks','ky','la','md','me','mo','ms','nc','nm','nv','oh','pa','sc','tn','tx','ut','va','wv']);

test('all 124 configured markets and 26 states remain present', () => {
  assert.equal(rows.length, 124);
  assert.deepEqual(new Set(rows.map(([,c]) => c.state)), stateCodes);
});
test('every market has a rate, state and dedicated closing model', () => {
  for (const [key,c] of rows) {
    assert.ok(c.name, key+' has no name');
    assert.ok(c.state && stateCodes.has(c.state), key+' has invalid state');
    assert.ok(Number.isFinite(c.tr) && c.tr > 0 && c.tr < .1, key+' has invalid rate');
    assert.ok(c.paUrl && /^https:\/\//.test(c.paUrl), key+' has no source URL');
    assert.ok(c.closingModel || c.state === 'fl', key+' has no closing model');
    for (const district of c.districts || []) assert.ok(district.id && Number.isFinite(district.tr) && district.tr > 0, key+' has invalid district');
  }
});
test('Arkansas up-to-$675 homestead credits are not treated as assessment deductions', () => {
  for (const [,c] of rows.filter(([,c]) => c.state === 'ar')) {
    assert.equal(c.he,675);
    assert.equal(c.heType,'credit');
  }
});
test('Mississippi regular exemption is modeled as a capped credit, not $75k value deduction', () => {
  for (const [,c] of rows.filter(([,c]) => c.state === 'ms')) {
    assert.equal(c.he,300);
    assert.equal(c.heType,'credit');
  }
});
test('affordability estimator does not hardcode Florida property-tax rates', () => {
  assert.ok(source.includes('const tax = Math.max(0, price * MKT.tr / 12)'));
  assert.ok(!source.includes('const tax = (price - 50000) * 0.013 / 12;'));
});
test('monthly tax estimates are floored at zero after credits or deductions', () => {
  assert.ok(source.includes('ty2=Math.max(0,'));
  assert.ok(source.includes('inp.ty2 = Math.max(0,'));
});
test('no blanket market certification or unsupported tier accuracy percentages', () => {
  assert.ok(!source.includes('COUNTY DATA — all verified May 2026'));
  assert.ok(!source.includes('- Tier 1 Pre-Offer: 85–90% accuracy'));
});
