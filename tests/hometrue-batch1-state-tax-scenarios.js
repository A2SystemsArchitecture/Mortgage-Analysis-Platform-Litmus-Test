// Official rule references: https://dor.georgia.gov/property-tax-homestead-exemptions
// https://www.revenue.alabama.gov/property-tax/homestead-exemptions/
// https://dor.sc.gov/sites/dor/files/Documents/Policy%20Manuals/SCTIED-2025-Chapter%205.pdf
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS =');
const end = html.indexOf('function buildHomesteadGuide(', start);
assert.ok(start >= 0 && end > start);
for (const state of ['ga', 'al', 'sc']) assert.ok(html.includes("buildStateTaxScenario('" + state + "')"));
new Function(html.slice(start, end) + "\nconst examples = [\n ['ga', 300000, [20, 5], true, 120000, [118000, 120000], 2960],\n ['ga', 300000, [20, 5], false, 120000, [120000, 120000], 3000],\n ['al', 300000, [6.5, 20, 5], true, 30000, [26000, 28000, 30000], 879],\n ['al', 30000, [6.5, 20, 5], true, 3000, [0, 1000, 3000], 35],\n ['sc', 300000, [100, 150], true, 12000, [0, 12000], 1800],\n ['sc', 300000, [100, 150], false, 18000, [18000, 18000], 4500]\n];\nfor (const [state, value, rates, approved, assessedValue, taxableValues, annualTax] of examples) {\n const result = calculateStateTaxScenario(state, value, rates, approved);\n if (JSON.stringify(result) !== JSON.stringify({assessedValue, taxableValues, annualTax})) throw Error(state + JSON.stringify(result));\n}\nif (calculateStateTaxScenario('al', 300000, [6.5, 20], true) || calculateStateTaxScenario('ga', 300000, [-1, 5], true)) throw Error('Invalid inputs accepted');\nconst output = {};\nconst fields = {marketValue:{valueAsNumber:300000}, mills0:{valueAsNumber:100}, mills1:{valueAsNumber:150}, status:{value:'yes'}};\nshowStateTaxScenario({elements:{namedItem:name=>fields[name]},querySelector:()=>output}, 'sc');\nif (!output.textContent.includes('$1,800.00') || !output.textContent.includes('$150.00')) throw Error(output.textContent);\nfor (const state of ['ga', 'al', 'sc']) {\n if (!buildStateTaxScenario(state).includes(\"showStateTaxScenario(this, '\"+state+\"')\")) throw Error(state);\n}\n")();
console.log('Six calculations, two invalid inputs, three generated forms and one output check passed.');
