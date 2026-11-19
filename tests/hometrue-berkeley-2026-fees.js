const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Official schedule: https://berkeleycountysc.gov/dept/auditor/millage/
new Function(html.slice(start, end) + "const fields={mills0:{},mills1:{},fees:{value:'42'}};\nconst note={};\nconst form={elements:{namedItem:name=>fields[name]},querySelector:selector=>selector==='.berkeley-fee-reference'?note:{}};\nfor(const [index,fee] of [['5','$175.00'],['6','$195.00'],['10','$176.25']]){\n applyBerkeley2026Levy(form,index);\n if(!note.textContent.includes(fee)||fields.fees.value!=='42')throw Error('fee reference '+index);\n}\napplyBerkeley2026Levy(form,'12');\nif(note.textContent!==''||fields.fees.value!=='42')throw Error('stale fee');\nif(!buildStateTaxScenario('sc','berkeley-sc').includes('berkeley-fee-reference')||\n   buildStateTaxScenario('sc','charleston-sc').includes('berkeley-fee-reference'))throw Error('scope');\n")();
console.log('Passed Berkeley municipal fee, reset and county scope checks.');
