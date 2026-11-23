// Regression: the Florida homestead guide must not invent a verified buyer
// rate by displaying the unrelated legacy county.tr planning fallback.
// The actual selected district can differ, and 2027 school and non-school
// millage and parcel exemptions require independent verification.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('// Florida homestead guide (default)');
const end=html.indexOf('function calculateFlorida2026AdValorem(',start);
assert.ok(start>=0&&end>start,'Florida homestead guide unavailable');
const guide=html.slice(start,end);
assert.ok(guide.includes('A generic county planning factor is not an adopted parcel tax rate'),'Unverified generic fallback is labeled');
assert.ok(guide.includes('may not be the rate selected for the buyer calculation'),'District selection and guide cannot be conflated');
assert.ok(guide.includes('Confirm the parcel tax district and the actual school and non-school millage for the chosen tax year'),'Source, district and year requirements');
assert.ok(guide.includes('does not automatically calculate homestead savings or parcel-specific special assessments'),'No tax or fee certification claim');
assert.ok(!guide.includes('planning rate applied to purchase price:'),'Stale generic rate must never be presented as selected');
assert.ok(!guide.includes('(COUNTIES[ACTIVE_COUNTY].tr*100).toFixed(2)'),'No county default percentage in homestead guide');
assert.ok(guide.includes('Florida Constitutional Amendment 3 takes effect January 1, 2027.'),'Keep 2027 legal status');
assert.ok(guide.includes('up to $150,000 of assessed value'),'Keep 2027 non-school exemption limit');
assert.ok(guide.includes('up to $50,000 for non-school taxes until the fifth year'),'Keep residency qualification');
console.log('PASS: Florida homestead guide no longer misidentifies generic county percentage as the selected buyer tax rate; 2027 status and exemptions remain disclosed.');
