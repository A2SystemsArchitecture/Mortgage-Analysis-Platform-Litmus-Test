const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf('const STATE_TAX_SCENARIOS');
const end = html.indexOf('function buildHomesteadGuide', start);
assert.ok(start >= 0 && end > start);
// https://berkeleycountysc.gov/dept/auditor/millage/
// https://berkeleycountysc.gov/dept/auditor/computation/
new Function(html.slice(start, end) + "const fields={marketValue:{valueAsNumber:100000},mills0:{valueAsNumber:146.9},mills1:{valueAsNumber:99.6},status:{value:'yes'},berkeleySalesTaxCredit:{checked:true},berkeleyDistrict:{value:'12'},credits:{value:''},fees:{value:'226.88',valueAsNumber:226.88}};\nconst output={};\nconst form={elements:{namedItem:name=>fields[name]},querySelector:()=>output};\nconst expected=[201.70,126.30,266,144.30,307.40,147.20,252.30,79.30,79.30,79.30,136.60,79.30,79.30];\nexpected.forEach((credit,index)=>{if(calculateBerkeley2026SalesTaxCredit(100000,String(index))!==credit)throw Error('factor '+index);});\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('Berkeley sales-tax credits $79.30')||!output.textContent.includes('$545.98'))throw Error(output.textContent);\nfields.mills1.valueAsNumber=100;\nshowStateTaxScenario(form,'sc');\nif(!output.textContent.includes('published millage'))throw Error(output.textContent);\nif(calculateCharleston2026SalesTaxCredit(200000,'0')!==346)throw Error('Charleston regression');\n")();
console.log('Passed all 13 Berkeley factors, the sample bill, mismatch validation and Charleston regression.');
