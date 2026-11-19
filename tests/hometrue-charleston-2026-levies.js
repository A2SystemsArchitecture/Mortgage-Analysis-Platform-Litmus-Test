const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Charleston County Auditor 2026 millage breakdown and sample bill.
new Function('assert', html.slice(start, end) + "const fields = {mills0: {}, mills1: {}};\nconst form = {elements: {namedItem: name => fields[name]}, querySelector: () => ({})};\nconst expected = [[1244.8,3609.6],[943.2,3157.2],[1320.8,3723.6],[1116.8,3417.6],[715.2,2815.2]];\nfor (const [index, amounts] of expected.entries()) {\n  applyCharleston2026Levy(form, String(index));\n  for (const [j, approved] of [true,false].entries()) {\n    const result = calculateStateTaxScenario('sc',200000,[Number(fields.mills0.value),Number(fields.mills1.value)],approved);\n    assert.ok(Math.abs(result.annualTax-amounts[j]) < 1e-8);\n    if (index === 0 && approved) assert.ok(Math.abs(applyTaxBillAdjustments(result.annualTax,346,154).amountDue-1052.80) < 1e-8);\n  }\n}\nassert.ok(buildStateTaxScenario('sc','charleston-sc').includes('Mount Pleasant (TD 21)'));\nassert.ok(!buildStateTaxScenario('sc','york-sc').includes('Mount Pleasant (TD 21)'));\n")(assert);
console.log('Passed 10 levy checks, the sample bill and county scope checks.');
