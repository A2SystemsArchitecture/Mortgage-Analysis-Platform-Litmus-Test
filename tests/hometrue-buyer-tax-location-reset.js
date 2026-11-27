// Market activation (spec 2026-11-27): this test checks an ACTIVE market's math; activation itself is covered by hometrue-market-activation.js.
globalThis.marketActiveGuard=()=>true;globalThis.isMarketActive=()=>true;globalThis.showMarketComingSoon=()=>'';globalThis.hideMarketComingSoon=()=>{};
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
function between(start, end) {
  const first = html.indexOf(start);
  const last = html.indexOf(end, first + start.length);
  assert.ok(first >= 0 && last > first);
  return html.slice(first, last);
}
const county = html.slice(html.indexOf('function selectCounty(')).match(/^function selectCounty\([\s\S]*?\n\}/);
assert.ok(county);
assert.ok(html.includes('id="fa" oninput="clearBuyerAnnualTax()"'));
new Function(between('function clearBuyerAnnualTax(', 'function parseBuyerAnnualTax(') +
  between('function selectDistrict(', 'function selectFloodZone(') + county[0] + "\nconst projection={value:'1052.80'};\nconst document={querySelectorAll:()=>[],getElementById:id=>id==='f-annual-buyer-tax'?projection:null};\nconst COUNTIES={gwinnett:{name:'Gwinnett',short:'Gwinnett',notes:''}};\nlet ACTIVE_DISTRICT={id:'one'}, ACTIVE_COUNTY='gwinnett';\nconst MKT={};\nfunction setCounty(key){ACTIVE_COUNTY=key;}\nfunction renderDistrictPills(){}\nfunction selectFloodZone(){}\nselectDistrict('gwinnett',{id:'one',tr:0.01},null);\nif(projection.value!=='1052.80')throw Error('same district');\nselectDistrict('gwinnett',{id:'two',tr:0.01},null,true);\nif(projection.value!=='1052.80')throw Error('silent restore');\nselectDistrict('gwinnett',{id:'one',tr:0.01},null);\nif(projection.value!=='')throw Error('changed district');\nprojection.value='0';\nselectCounty('gwinnett',null);\nif(projection.value!=='')throw Error('county selection');\nprojection.value='1052.80';\nclearBuyerAnnualTax();\nif(projection.value!=='')throw Error('address edit');\n")();
console.log('Passed address, county and district reset checks.');
