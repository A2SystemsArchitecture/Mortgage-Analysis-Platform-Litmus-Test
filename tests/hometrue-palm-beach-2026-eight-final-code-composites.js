// Palm Beach County 2026 eight FINAL tax-DISTRICT composites, not city-only mills.
// Source A: Town of Lantana municipal government-hosted proposed county-wide
// tax-code chart, page 16, attributed to Palm Beach County Property Appraiser:
// https://d3n9y02raazwpg.cloudfront.net/lantanafl/a71dedfd-9a77-11f1-bb61-005056a89546-f2ab0976-5ca0-4868-8c25-a05a0fd264aa-1788439915.pdf
// Source B: PBC PAO independently published 2026 FINAL vs proposed authority:
// https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf
// Assumption: the listed source code sets remain authoritative; taxes and fees
// still vary by taxable base/exemptions, parcel code and non-ad valorem amounts.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=src.indexOf('const COUNTIES = {'),b=src.indexOf('\n};',a);
assert.ok(a>=0&&b>a);
const county=new Function(src.slice(a,b+3)+'\nreturn COUNTIES;')()['palm-beach'];
const cases=[
 ['pb-wpb-74402-2026',20.3961,-.0505,20.3456,'74402-74407'],
 ['pb-wpb-dda-84407-2026',22.3961,-.0505-1.0300,21.3156,'84407'],
 ['pb-boca-06154-2026',16.9090,0,16.9090,'06154-06155'],
 ['pb-boca-06625-2026',15.8759,0,15.8759,'06625'],
 ['pb-boynton-08983-2026',19.9620,-.5448,19.4172,'08983-08987'],
 ['pb-delray-12983-2026',18.6780,-.0870,18.5910,'12983-12987'],
 ['pb-delray-dda-88984-2026',19.6780,-.0870,19.5910,'88984-88987'],
 ['pb-wellington-73482-2026',18.6892,0,18.6892,'73482-73486']
];
let taxComputations=0;
for(const [id,proposed,adjustment,finalMills,codes] of cases){
 const d=county.districts.find(v=>v.id===id);
 assert.ok(d,'Missing exact 2026 tax district '+id);
 assert.equal(d.taxYear,'2026',id);
 assert.ok(d.label.includes(codes),'District-code provenance must remain visible '+id);
 assert.ok(Math.abs(proposed+adjustment-finalMills)<1e-8,'Independent final adjustment '+id);
 assert.ok(Math.abs(d.tr-finalMills/1000)<1e-12,'Buyer code must equal official final composite '+id);
 for(const taxableValue of [100000,300000,575000]){
  const sourceValue=taxableValue*finalMills/1000;
  const reported=taxableValue*d.tr;
  assert.ok(Math.abs(sourceValue-reported)<1e-6,'2026 gross ad valorem calculation '+id);
  taxComputations++;
 }
}
for(const id of ['pb-wpb','pb-boca','pb-boynton','pb-delray','pb-wellington']){
 const legacy=county.districts.find(d=>d.id===id);
 assert.ok(legacy&&!legacy.taxYear,'Historic code-unknown choices MUST remain unverified: '+id);
}
assert.ok(county.notes.includes('The buyer must match the exact five-digit tax district'),'No city-name auto attribution');
assert.ok(county.notes.includes('NOT parcel geolocation, homestead relief or non-ad valorem assessments'),'No buyer-net certification');
assert.equal(cases.length,8);assert.equal(taxComputations,24);
console.log('PASS Palm Beach 2026 eight PBC PAO source-reconciled final tax-code composites and 24 illustrative gross tax scenarios; parcel mapping and exemption/fee certification NOT achieved.');
