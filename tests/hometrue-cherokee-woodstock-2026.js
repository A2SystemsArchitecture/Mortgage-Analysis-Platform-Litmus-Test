const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const start = html.indexOf("  'cherokee': {");
const end = html.indexOf("  'forsyth': {", start);
assert.ok(start >= 0 && end > start);
const county = new Function('return ({' + html.slice(start, end) + '})')().cherokee;
const district = county.districts.find(d => d.id === 'cher-woodstock');
assert.ok(district);
assert.match(district.label, /2026 standard base levy/);
assert.ok(Math.abs(district.tr - 0.4 * (23.926 + 5.130 + 0.520) / 1000) < 1e-12);
for(const [price, expected] of [[350000,4140.64],[400001,4732.17],[575000,6802.48],[800000,9464.32]]){
  assert.equal(Number((price * district.tr).toFixed(2)), expected);
}
console.log('Woodstock 2026 levy component and price arithmetic checks passed.');
// 2026 county incorporated rate: https://www.cherokeecountytax.com/property.html
// City official Aug 24 council meeting: https://woodstockga.granicus.com/player/clip/692?view_id=1
// City adoption independently reported: https://mytownview.com/georgia/cherokee/woodstock/meetings/15783-city-council-2026-08-24
// Does not test exemptions, parcel matching, browser, buyer-report or shared-link behavior.
