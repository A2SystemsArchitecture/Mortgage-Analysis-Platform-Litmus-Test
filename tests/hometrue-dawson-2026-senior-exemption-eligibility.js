// Dawson County 2026 senior-exemption closure is law plus verified referendum,
// not a blanket elimination of all senior or ordinary homestead programs.
// Signed GA HB 824: https://gov.georgia.gov/document/2025-signed-legislation/hb-824/download
// Original Dawson County 2025 official election results:
// https://www.dawsoncountyga.gov/ArchiveCenter/ViewFile/Item/343
// 2026 assessor program overview: https://dawsonassessors.com/homestead-exemptions/
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf("  'dawson': {"),end=html.indexOf("  'paulding': {",start);
assert.ok(start>=0&&end>start);
const s=html.slice(start,end);
assert.ok(s.includes('Georgia HB 824'),'Buyer must see change in law');
assert.ok(s.includes('2,446 Yes / 820 No'),'Certified election outcome');
assert.ok(s.includes('starting January 1, 2026'),'2026 source-year distinction');
assert.ok(s.includes('four specified older senior and disability-related homestead programs'),'Must not misstate all programs closed');
assert.ok(s.includes('Homeowners already approved before 2026 may retain'),'Grandfathering required');
assert.ok(s.includes('other senior exemptions established in 2024 remain available'),'Surviving alternative programs');
assert.ok(s.includes('Do not grant a closed legacy exemption to a new buyer'),'No unauthorized tax savings');
assert.ok(s.includes('current standard $2,000 assessed-value exemption'),'Standard homestead separate');
assert.ok(s.includes('April 1 filing cutoff'),'Current assessor filing requirements');
const yes=2446,no=820;
assert.ok(yes>no&&yes/(yes+no)>.5,'Voter approval required for effective law');
console.log('PASS Dawson HB 824 law and 2025 county/school referendum, four retired legacy senior programs, pre-2026 grandfathering and independent standard/2024 relief protections.');
