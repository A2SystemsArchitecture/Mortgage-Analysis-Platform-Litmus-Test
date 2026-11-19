const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Charleston's 2026 millage card uses $154 in its sample.
// The county's Environmental Management page lists different charges by residential category.
new Function(html.slice(start, end) + "const fields={marketValue:{valueAsNumber:200000},mills0:{valueAsNumber:145.2},mills1:{valueAsNumber:155.6},status:{value:'yes'},credits:{value:'346',valueAsNumber:346},fees:{value:''}};\nconst output={};\nconst form={elements:{namedItem:name=>fields[name]},querySelector:()=>output};\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('$898.80')||!output.textContent.includes('Monthly tax before bill fees $74.90')||output.textContent.includes('Estimated annual bill'))throw Error(output.textContent);\nfor(const [value, amount] of [[0,'$898.80'],[154,'$1,052.80']]){\n  fields.fees={value:String(value),valueAsNumber:value};\n  showStateTaxScenario(form,'sc');\n  if(!output.textContent.includes('Estimated annual bill including entered fees '+amount))throw Error(output.textContent);\n}\n")();
console.log('Passed unknown, verified zero and published sample fee checks.');
