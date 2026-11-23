// Fulton GA 2026 selected North Fulton component-source regression.
// Fulton 2026 county M&O adopted 8.870: https://fultoncountyga.gov/News/2026/10/08/Fulton-County-Keeps-Millage-Rate-Flat-For-5th-Year
// Fulton Schools Oct 23 2026 board bulletin adopted 17.950:
// https://news.fultonschools.org/details/~board/board-bulletin/post/board-bulletin-for-10232026
// Roswell adopted 5.232: https://www.roswellgov.com/government/departments-division/finance/taxes/property-taxes/
// Sandy Springs 4.731: https://www.sandyspringsga.gov/understanding-local-taxes/
// Alpharetta June 15 2026 council: https://alpharettaga.new.swagit.com/videos/391062
// Johns Creek Oct 26 approved 3.434 plus 0.247:
// https://johnscreekga.granicus.com/DocumentViewer.php?file=johnscreekga_33e040ee178bfd2f16882888215826a1.pdf&view=1
// Fulton adopted 2026 general obligation bond levy 0.169 mills:\n// https://fulton.legistar.com/LegislationDetail.aspx?GUID=E8B46EDA-1D4F-4381-B28A-BC0CAE1F517F&ID=8260230&Options=&Search=\n// Exact all-authority parcel district applicability and additional city/school\n// levies still require independent tax-commissioner parcel-bill reconciliation. Not a full
// 2026 market certification; no exemption/net buyer or 2027 year assertion.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a);
assert.ok(a>=0&&b>a,'County source missing');
const county=new Function(html.slice(a,b+3)+'\nreturn COUNTIES;')().fulton;
assert.equal(county.state,'ga');
const countyOperating=8.870,countyBondAdopted=0.169,schools=17.950;
const cityOptions=[
 ['ful-sandysprings',4.731],
 ['ful-alpharetta-2026',5.050+0.700],
 ['ful-johnscreek',3.434+0.247],
 ['ful-roswell',5.232]
];
for(const [id,city] of cityOptions){
 const d=county.districts.find(x=>x.id===id);
 assert.ok(d,'Missing city '+id);
 assert.equal(d.taxYear,'2026',id+' date mismatch');
 const expected=.4*(countyOperating+countyBondAdopted+schools+city)/1000;
 assert.ok(Math.abs(d.tr-expected)<1e-12,id+' encoded component mismatch');
 for(const price of [100000,300000,500000]){
  const independentlyComposed=(price*.4)*(countyOperating+countyBondAdopted+schools+city)/1000;
  assert.ok(Math.abs(price*d.tr-independentlyComposed)<1e-7,id+' gross illustration mismatch');
 }
}
for(const id of ['ful-atlanta','ful-alpharetta']){
 const d=county.districts.find(x=>x.id===id);
 assert.ok(d);
 assert.ok(!d.taxYear&&!d.taxPeriod,'Unverified legacy option cannot claim 2026 full rate');
}
console.log('PASS Fulton four North Fulton coded city compositions and 12 gross fictional examples; county bond adoption now corroborated; parcel/all-authority verification remains open. Fulton market source gate NOT certified.');
