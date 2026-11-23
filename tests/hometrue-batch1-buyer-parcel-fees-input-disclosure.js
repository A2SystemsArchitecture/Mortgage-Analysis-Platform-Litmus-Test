// Confirm buyer annual tax input explains mandatory non-ad-valorem assessments.
// A source-backed sample is 2026 Gwinnett Tax Commissioner R3001A188:
// $5,085.27 ad valorem + $448.22 extra assessments = $5,533.49 total.
// https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const field=html.match(/<label for="f-annual-buyer-tax">[^<]*<\/label><input[^>]*><div class="fn">([^<]*)<\/div>/)?.[1];
assert.ok(field,'Actual buyer annual-tax input or explanatory copy missing');
for(const part of ['solid waste','stormwater','streetlights','non-ad-valorem charges','already included in another HomeTrue cost line','Do not copy a seller’s exemptions','District-rate planning estimates do not automatically include those charges']){
 assert.ok(field.includes(part),'Missing mandatory property tax/fee distinction: '+part);
}
const expected=Math.round((5085.27+448.22)*100)/100;
assert.equal(expected,5533.49);
const parseStart=html.indexOf('function parseBuyerAnnualTax('),parseEnd=html.indexOf('function batch1NeedsVerifiedTaxBasis(',parseStart);
assert.ok(parseStart>=0&&parseEnd>parseStart);
const parse=new Function(html.slice(parseStart,parseEnd)+'\nreturn parseBuyerAnnualTax;')();
assert.equal(parse('5533.49'),5533.49);
assert.equal(parse('5085.27'),5085.27);
assert.equal(parse('-1'),null);
assert.equal(parse('5533.490'),null);
console.log('PASS buyer tax projection: must disclose non-ad-valorem additions and no double count; $5085.27 + $448.22 = $5533.49; input preserves cents.');
