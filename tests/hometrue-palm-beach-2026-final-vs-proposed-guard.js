// Official Palm Beach 2026 final vs proposed municipal authority guard.
// https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf
// A municipal rate is a COMPONENT, never an address-specific combined district rate.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const src = fs.readFileSync(path.resolve(__dirname,'../platform.html'),'utf8');
const start = src.indexOf("  'palm-beach': {");
const end = src.indexOf("  'martin': {",start);
assert.ok(start >= 0 && end > start,'Palm Beach market config not found');
const block = src.slice(start,end);
// Original official source components, not proposed/rollback rates. Distinct
// tax-district overlays, special authorities and parcel attribution remain open.
const officialFinalMunicipalMills = Object.freeze({
  'West Palm Beach':8.0803, // proposed 8.1308
  'Boca Raton':3.6476,
  'Boynton Beach':7.2052, // proposed 7.7500
  'Delray Beach':6.3501, // proposed 6.4371
  'Wellington':2.4700
});
const ids = ['pb-wpb','pb-boca','pb-boynton','pb-delray','pb-wellington'];
for (const id of ids) {
  const line = block.split('\n').find(x=>x.includes("id:'"+id+"'"));
  assert.ok(line,'Missing municipality: '+id);
  assert.match(line,/tax code unverified; planning only/,'Unknown district falsely presented as adopted: '+id);
  assert.doesNotMatch(line,/taxYear\s*:/,'Do not assign a 2026 tax year to unidentified municipality tax code: '+id);
}
assert.equal(Object.keys(officialFinalMunicipalMills).length,ids.length);
assert.match(block,/paUrl:'https:\/\/pbcpao\.gov\/homestead-exemption\.htm'/,'Palm Beach buyer guide must use current official property appraiser homestead page');
// Independently read source-published unincorporated component list in source:
const base = block.split('\n').find(x=>x.includes("id:'pb-uninc'"));
assert.ok(base && base.includes("taxYear:'2026'"),'Missing sourced unincorporated option');
const mills = [...base.matchAll(/(?:\(|\+)\s*(\d+\.\d+)/g)].map(m=>Number(m[1]));
const sum = mills.reduce((a,b)=>a+b,0);
assert.ok(Math.abs(sum-16.2192)<0.000001,'Unexpected final 2026 standard Palm Beach source component sum: '+sum);
console.log('PASS: Palm Beach standard adopted 2026 component sum '+sum.toFixed(4)+' mills; five city-code planning choices still unverified.');
