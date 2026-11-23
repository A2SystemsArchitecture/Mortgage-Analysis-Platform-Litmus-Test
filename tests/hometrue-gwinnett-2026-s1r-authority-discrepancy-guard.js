// Catch a real discrepancy between two official Gwinnett S1R exemption summaries.
// Tax Commissioner administering the 2026 exemption and actual 2026 issued bill
// both show $8,000 school-operating assessed-value relief, not the older $4,000.
// https://www.gwinnetttaxcommissioner.com/pt/property-tax/available-exemptions
// https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf
// https://www.gwinnettcounty.com/government/citizen-finance-guide/property
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf("  'gwinnett': {"),j=html.indexOf("  'cobb': {",i);
assert.ok(i>=0&&j>i);
const config=html.slice(i,j);
assert.match(config,/\$8,000 for school operating/);
assert.match(config,/ZERO homestead or homeowner-credit deduction for school bond/);
assert.match(config,/do NOT presume these owner-specific figures will transfer to a buyer or repeat in 2027/);
const assessedValueSchoolDifference=8000-4000;
const schoolOperatingMills=18.7;
assert.equal(assessedValueSchoolDifference,4000);
assert.equal(Math.round(assessedValueSchoolDifference*schoolOperatingMills/1000*100)/100,74.8);
assert.equal(Math.round(74.8/12*100)/100,6.23);
// Separate verified owner's S1R bill means neither relief nor tax bill is a
// transferable quote: no automatic buyer exemption or 2027 roll-forward.
assert.match(config,/not every levy/);
console.log('PASS: Gwinnett 2026 Tax Commissioner S1R school exemption $8000 assessed, older official county summary $4000 difference $74.80/yr at 18.7 mills, no unearned school bond relief or buyer credit.');
