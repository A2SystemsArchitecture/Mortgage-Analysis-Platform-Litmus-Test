// Forsyth public assessor's current eligibility and filing timing statement.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf("  'forsyth': {"),end=html.indexOf("  'clayton': {",start);
assert.ok(start>=0&&end>start);
const s=html.slice(start,end);
assert.match(s,/County M&O and Fire assessed bases by \$8,000/);
assert.match(s,/school\/state assessed bases by \$2,000/);
assert.match(s,/floating county value-offset relief depends on a prior approved homestead\/base year/);
assert.match(s,/45-day assessment-notice appeal window/);
assert.doesNotMatch(s,/Standard filing deadline April 1\./);
assert.match(s,/never automatically claim relief/);
console.log('PASS Forsyth official homestead $8k county and fire / $2k school-state levy distinction, eligibility qualification and current 45-day appeal deadline disclosure.');
