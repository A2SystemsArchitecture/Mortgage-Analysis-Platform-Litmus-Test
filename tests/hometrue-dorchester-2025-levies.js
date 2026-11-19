const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Dorchester County Auditor official 2025 chart, including vocational-school operating millage.
new Function('assert', html.slice(start, end) + "const fields={mills0:{},mills1:{}};\nconst form={elements:{namedItem:name=>fields[name]},querySelector:()=>({})};\nconst expected = [[1987.2,6494.4],[1987.2,6494.4],[1987.2,6494.4],[2524.8,7300.8],[2830.8,7759.8],[1987.2,6494.4],[1987.2,6494.4],[2524.8,7300.8],[2524.8,7300.8],[1819.2,6699.6],[3115.2,8643.6],[2704.8,8028],[2499.6,7720.2],[1819.2,6699.6]];\nassert.equal(DORCHESTER_2025_TAX_LEVIES.length,expected.length);\nfor (const [index, amounts] of expected.entries()) {\n applyDorchester2025Levy(form,String(index));\n assert.equal(Number(fields.mills0.value), index<9?195.2:220.6);\n for (const [j,approved] of [true,false].entries()){\n  const result=calculateStateTaxScenario('sc',300000,[Number(fields.mills0.value),Number(fields.mills1.value)],approved);\n  assert.ok(Math.abs(result.annualTax-amounts[j])<1e-8);\n }\n}\nassert.ok(buildStateTaxScenario('sc','dorchester-sc').includes('2025 levy (historical)'));\nassert.ok(!buildStateTaxScenario('sc','berkeley-sc').includes('2025 levy (historical)'));\n")(assert);
console.log('Passed 28 Dorchester calculations and scope checks.');
