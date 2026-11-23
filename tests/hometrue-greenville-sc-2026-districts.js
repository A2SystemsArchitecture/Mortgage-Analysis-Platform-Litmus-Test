// Greenville County Auditor 2026 Millage Sheet, 2026 tax district rows 000 and 500:
// https://www.greenvillecounty.org/Auditor/Forms/millage_2026.pdf
// 2026 schedule verified from county-linked official PDF using a live browser.
// A second independent web PDF renderer was unable to open the document.
// This checks arithmetic and the standalone tax scenario, NOT an address-specific bill.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const STATE_TAX_SCENARIOS');
const b=html.indexOf('function buildHomesteadGuide',a);
assert.ok(a>=0&&b>a);
new Function(html.slice(a,b)+`
  const rows=GREENVILLE_2026_TAX_LEVIES;
  if(rows.length!==2)throw Error('Unexpected district coverage');
  const expected=[
    ['000',248.9,141.2,107.7],
    ['500',330.3,141.2,189.1]
  ];
  for(let i=0;i<2;i++){
    const [code,gross,schoolOperating,remaining]=expected[i];
    const [label,actualGross,legal]=rows[i];
    if(!label.startsWith(code)||actualGross!==gross||legal!==remaining||Math.abs(gross-schoolOperating-remaining)>1e-8)throw Error('District '+code);
    for(const value of [200000,300000,575000]){
      const approved=calculateStateTaxScenario('sc',value,[schoolOperating,remaining],true);
      const other=calculateStateTaxScenario('sc',value,[schoolOperating,remaining],false);
      if(Math.abs(approved.annualTax-value*.04*remaining/1000)>1e-8
       ||Math.abs(other.annualTax-value*.06*gross/1000)>1e-8)throw Error('Tax math '+code+' '+value);
    }
  }
  if(!buildStateTaxScenario('sc','greenville-sc').includes('applyGreenville2026Levy'))throw Error('Missing UI preset');
`)();
const aMarket=html.indexOf("  'greenville-sc': {"),bMarket=html.indexOf("  'york-sc': {",aMarket);
assert.ok(aMarket>=0&&bMarket>aMarket);
const market=new Function('return ({'+html.slice(aMarket,bMarket)+'})')()['greenville-sc'];
assert.equal(market.districts.find(x=>x.id==='grv-greenville').tr,.0078,'Keep main buyer planning percentage unchanged');
assert.equal(market.districts.find(x=>x.id==='grv-uninc').tr,.0068,'Keep main buyer planning percentage unchanged');
const sourced=market.districts.filter(x=>x.taxYear==='2026');
assert.equal(sourced.length,2,'Only exact district 000 options have verified 2026 source');
for(const [id,ratio,mills] of [
 ['grv-district-000-2026-legal4',.04,107.7],
 ['grv-district-000-2026-other6',.06,248.9]
]){
 const d=sourced.find(x=>x.id===id);assert.ok(d,id);
 assert.ok(Math.abs(d.tr-ratio*mills/1000)<1e-12);
 for(const price of [125000,200000,300000,575000,850000]){
  assert.ok(Math.abs(price*d.tr-price*ratio*mills/1000)<1e-7,id+'/'+price);
 }
}
assert.ok(market.notes.includes('Legacy city, Simpsonville and unincorporated choices remain planning-only.'));

console.log('Greenville 2026 district 000/500: school/other rates, 12 tax examples and standalone selection passed.');
