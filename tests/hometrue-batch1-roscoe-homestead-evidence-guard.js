// Prevent Roscoe from presenting placeholder per-county homestead values as established buyer entitlements.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
assert.ok(html.includes('- Homestead exemption: NOT VERIFIED FOR THIS BUYER.'),'Roscoe must disclose unverified eligibility');
assert.ok(html.includes('Exemption types, owner eligibility, school/county/city levy applicability and tax year require confirmation'),'Roscoe must preserve levy/year-specific qualification');
assert.ok(!html.includes("- Homestead exemption: ${county.he ?"),'Never display generic county.he as guaranteed exemption');
const begin=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',begin);
assert.ok(begin>=0 && end>begin);
const counties=new Function(html.slice(begin,end+3)+'\nreturn COUNTIES;')();
for(const id of ['forsyth','gwinnett','fulton','palm-beach']){
 assert.ok(counties[id],id+' exists');
 assert.ok(Object.hasOwn(counties[id],'he'),id+' contains legacy planner value');
}
assert.ok(html.includes('NO DISTRICT SELECTED; the county default is not verified for a buyer parcel'),'No county average can stand in for parcel geography');
assert.ok(html.includes('gross illustrative pre-exemption rate; tax source year '),'Selected district needs source-year classification');
assert.ok(html.includes('UNVERIFIED planning fallback, not an adopted parcel-specific rate'),'Generic county factor must not be authenticated');
assert.ok(!html.includes("- Tax rate: ${county.tr ?"),'Roscoe must not present generic county.tr as tax fact');
console.log('PASS Roscoe distinguishes legacy planner homestead placeholders from buyer-specific, levy-specific and tax-year-specific verified entitlements.');
