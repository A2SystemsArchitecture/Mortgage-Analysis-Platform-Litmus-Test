const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// Source: https://www.charlestoncounty.gov/departments/auditor/files/archived/2026-millage-card.pdf?v=4
new Function(html.slice(start, end) + "const fields={marketValue:{valueAsNumber:200000},mills0:{valueAsNumber:145.2},mills1:{valueAsNumber:155.6},status:{value:'yes'},charlestonSalesTaxCredit:{checked:true},charlestonDistrict:{value:'0'},credits:{value:''},fees:{value:'154',valueAsNumber:154}};\nconst output={};\nconst form={elements:{namedItem:name=>fields[name]},querySelector:()=>output};\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('$346.00')||!output.textContent.includes('$1,052.80'))throw Error(output.textContent);\nif(calculateCharleston2026SalesTaxCredit(200000,'4')!==180||calculateCharleston2026SalesTaxCredit(200000,'16')!==516||calculateCharleston2026SalesTaxCredit(200000,'')!==null)throw Error('factor');\nfields.mills1.valueAsNumber=156;\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('published millage'))throw Error(output.textContent);\nfields.charlestonSalesTaxCredit.checked=false;\nfields.mills1.valueAsNumber=155.6;\nfields.credits={value:'346',valueAsNumber:346};\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('$1,052.80'))throw Error(output.textContent);\n")();
console.log('Charleston sample, credit factors, manual entry and millage mismatch passed.');
