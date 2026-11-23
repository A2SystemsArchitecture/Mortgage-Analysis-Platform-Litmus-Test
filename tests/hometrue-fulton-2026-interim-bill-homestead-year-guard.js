// Primary Fulton county statements distinguish 2026 temporary bills from final levies
// and the 2026 appeal-period extension from automatic new-buyer homestead relief.
// https://www.fultoncountyga.gov/News/2026/06/19/Fulton-County-2026-Assessments-Now-Available-Online
// https://www.fultoncountyga.gov/News/2026/08/14/Fulton-County-Issues-Property-Tax-Bills
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf("  'fulton': {"),end=html.indexOf("  'dekalb': {",start);
assert.ok(start>=0&&end>start);
const block=html.slice(start,end);
assert.ok(block.includes('January 1, 2026'),'Homestead ownership qualification missing');
assert.ok(block.includes('missed the April 1 regular homestead deadline may apply during the 2026 assessment appeal period'),'Official 2026 appeal filing exception missing');
assert.ok(block.includes('not an automatic benefit for a later buyer'),'Never grant owner-specific credit automatically');
assert.ok(block.includes('TEMPORARY bills using 2025 rates by court order'),'Temporary bill source year must be disclosed');
assert.ok(block.includes('cannot by themselves certify the final adopted 2026 composite'),'2025-basis interim bills cannot certify final 2026 tax');
assert.ok(block.includes('Confirm the current notice-specific appeal deadline'),'Appeal deadline cannot be guessed');
console.log('PASS Fulton 2026 late homestead filing and interim 2025-rate tax bill source-year guard.');
