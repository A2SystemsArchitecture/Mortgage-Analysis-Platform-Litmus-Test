const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
const {applyYork2026Levy, calculateStateTaxScenario, buildStateTaxScenario} = new Function(
  html.slice(start, end) + '\nreturn {applyYork2026Levy, calculateStateTaxScenario, buildStateTaxScenario};'
)();
const fields = {mills0: {}, mills1: {}};
const output = {};
const form = {elements: {namedItem: name => fields[name]}, querySelector: () => output};
// York County Auditor 2026 schedule. $300,000 taxable market value before assessment.
const expected = [[2518.8, 7650], [2588.4, 7754.4], [2838, 10504.8], [2065.2, 7810.2],
  [1501.2, 7479], [1525.2, 6159.6], [1936.8, 9153],
  [2125.2,7900.2], [2112,7880.4], [2137.2,7918.2], [2150.4,7938], [2090.4,7848], [2125.2,7900.2], [2125.2,7900.2], [1561.2,7569], [1636.8,7682.4], [1576.8,7592.4], [1636.8,7682.4], [1561.2,7569], [1572,6229.8], [1597.2,6267.6], [1609.2,6285.6], [1610.4,6287.4], [1610.4,6287.4], [1584,6247.8], [1585.2,6249.6], [1585.2,6249.6], [1645.2,6339.6], [2056.8,9333], [2056.8,9333], [3092.4,9865.8], [2418,8339.4], [2503.2,8467.2], [2826,10486.8], [3250.8,9588.6]];
expected.forEach((amounts, index) => {
  applyYork2026Levy(form, String(index));
  [true, false].forEach((approved, statusIndex) => {
    const result = calculateStateTaxScenario('sc', 300000,
      [Number(fields.mills0.value), Number(fields.mills1.value)], approved);
    assert.ok(Math.abs(result.annualTax - amounts[statusIndex]) < 1e-8);
  });
});
assert.ok(buildStateTaxScenario('sc', 'york-sc').includes('Rock Hill (RL)'));
assert.ok(!buildStateTaxScenario('sc', 'charleston-sc').includes('Rock Hill (RL)'));
console.log('Passed 70 York calculation cases and York-only form checks.');
