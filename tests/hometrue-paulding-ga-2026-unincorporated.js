const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const start=html.indexOf("  'paulding': {"),end=html.indexOf("  'pickens': {",start);
assert.ok(start>=0&&end>start);
const market=new Function('return ({'+html.slice(start,end)+'})')().paulding;
const uninc=market.districts.find(d=>d.id==='paul-uninc');
const dallas=market.districts.find(d=>d.id==='paul-dallas');
assert.ok(uninc&&dallas);
const mills=4.300+2.100+0.800+17.800;
assert.ok(Math.abs(mills-25)<1e-10);
assert.ok(Math.abs(uninc.tr-.4*mills/1000)<1e-12);
assert.equal(dallas.tr,.0088,'Dallas must remain planning pending separate 2026 city levy');
for(const price of [200000,400001,575000,800000])assert.ok(Math.abs(price*uninc.tr-price*.4*mills/1000)<1e-8, 'price '+price);
console.log('Paulding 2026 standard unincorporated: four purchase price scenarios passed.');
// Paulding County BOC Aug 11 2026 official agenda resolutions 2026-28 through -31:
// https://meetings.municode.com/adaHtmlDocument/index?cc=PAULDINGGA&ip=false&me=c83f3a2f035a4feda43980d8f6d2b7e5
// County's own Aug 11 board meeting recap confirms adoption of 4.3 + 2.1 + .8 + 17.8:
// https://www.linkedin.com/posts/paulding-county-government_missed-the-paulding-county-board-of-commissioners-activity-7495815782103363584-eENC
// 40% GA assessment, before exemptions. Applicable only where county fire levied.
// City Dallas bills separately; 2026 city component not verified. No browser/PDF.
