// City of Delray Beach 2026 enacted (NOT merely proposed) city tax millage.
// Primary council adoption, Sept 22 2026, Resolution 157-26:
// https://delraybeach.legistar.com/LegislationDetail.aspx?GUID=D832113C-03CE-4CA9-8471-B35FDFB89FBF&ID=8213856&Options=&Search=
// FY 2026/27 6.3501 city operations + .0289 city debt = 6.3790 CITY mills;
// additional authorities and actual tax district must be verified separately.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf("  'palm-beach': {"),j=html.indexOf("  'martin': {",i);
assert.ok(i>=0&&j>i);
const block=html.slice(i,j);
assert.ok(block.includes('Resolution 157-26'));
assert.ok(block.includes('September 22, 2026'));
assert.ok(block.includes('6.3501 mills plus CITY DEBT 0.0289 mills'));
assert.ok(block.includes('totaling 6.3790 CITY mills'));
assert.ok(block.includes('NOT the full property tax district levy'));
const cityOperating=6.3501,cityDebt=.0289;
assert.ok(Math.abs(cityOperating+cityDebt-6.3790)<1e-10);
const delray=block.split('\n').find(x=>x.includes("id:'pb-delray'"));
assert.ok(delray&&delray.includes('tax code unverified; planning only'));
assert.ok(!/taxYear:/.test(delray),'Adopted city components are not a certified full composite');
console.log('PASS official Delray Resolution 157-26: 6.3501 city operating + 0.0289 city debt = 6.3790 city mills, 2026; parcel composite unverified.');
