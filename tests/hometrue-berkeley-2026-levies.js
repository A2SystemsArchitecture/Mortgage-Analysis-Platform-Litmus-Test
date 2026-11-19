const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Berkeley County Auditor schedule: https://berkeleycountysc.gov/dept/auditor/millage/
new Function('assert', html.slice(start, end) + "const fields = {mills0:{}, mills1:{}};\nconst form = {elements:{namedItem:name=>fields[name]},querySelector:()=>({})};\nconst expected = [[714.4,1953],[726.4,1971],[542.4,1695],[485.6,1609.8],[794.4,2073],[693.6,1921.8],[638.4,1839],[764.4,2028],[440.4,1542],[592.4,1770],[662.4,1875],[440.4,1542],[398.4,1479]];\nassert.ok(BERKELEY_2026_TAX_LEVIES.length === expected.length);\nfor (const [index, amounts] of expected.entries()) {\n  applyBerkeley2026Levy(form,String(index));\n  const mills = [Number(fields.mills0.value),Number(fields.mills1.value)];\n  assert.ok(mills[0] === 146.9);\n  for (const [j,approved] of [true,false].entries()) {\n    const result = calculateStateTaxScenario('sc',100000,mills,approved);\n    assert.ok(Math.abs(result.annualTax-amounts[j])<1e-8);\n    if(index===12 && approved) assert.ok(Math.abs(applyTaxBillAdjustments(result.annualTax,79.30,226.88).amountDue-545.98)<1e-8);\n  }\n}\nassert.ok(buildStateTaxScenario('sc','berkeley-sc').includes('Hanahan (09)'));\nassert.ok(!buildStateTaxScenario('sc','charleston-sc').includes('Hanahan (09)'));\n")(assert);
console.log('Passed 26 levy cases, the county sample bill and scope checks.');
