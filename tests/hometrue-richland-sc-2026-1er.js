// Official Richland County SC tax year 2026 county estimator, district 1ER:
// https://www7.richlandcountysc.gov/AssessorApps/TaxEstimator/?tms=R14205-10-02
// Reference district only. Do not infer 1CC/1RC/6TI or other tax district rates.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const STATE_TAX_SCENARIOS'),b=html.indexOf('function buildHomesteadGuide(',a);
assert.ok(a>=0&&b>a);
new Function(html.slice(a,b)+`
const [label,gross,legal]=RICHLAND_2026_TAX_LEVIES[0];
if(!label.startsWith('1ER')||gross!==466.9||legal!==212.6||Math.abs(gross-legal-254.3)>1e-8)throw Error('County rate mismatch');
for(const price of [200000,300000,575000]){
 const expectedLegal=price*.04*legal/1000,expectedOrdinary=price*.06*gross/1000;
 const actualLegal=calculateStateTaxScenario('sc',price,[gross-legal,legal],true);
 const actualOrdinary=calculateStateTaxScenario('sc',price,[gross-legal,legal],false);
 if(Math.abs(actualLegal.annualTax-expectedLegal)>1e-8||Math.abs(actualOrdinary.annualTax-expectedOrdinary)>1e-8)throw Error('2026 1ER mismatch '+price);
}
if(!buildStateTaxScenario('sc','richland').includes('applyRichland2026Levy'))throw Error('Missing district UI');
`)();
const x=html.indexOf("  'richland': {"),y=html.indexOf("  'greenville-sc': {",x);
const market=new Function('return ({'+html.slice(x,y)+'})')().richland;
assert.equal(market.districts.find(d=>d.id==='ric-columbia').tr,.0065);
assert.equal(market.districts.find(d=>d.id==='ric-irmo').tr,.0058);
assert.equal(market.districts.find(d=>d.id==='ric-uninc').tr,.0055);

const sourceOptions=market.districts.filter(d=>d.taxYear==='2026');
assert.equal(sourceOptions.length,2,'Every additional current-year Richland option requires a district-specific primary source');
for(const [id,ratio,mills] of [
 ['ric-district-1er-2026-legal4',.04,212.6],
 ['ric-district-1er-2026-other6',.06,466.9]
]){
 const d=sourceOptions.find(x=>x.id===id);
 assert.ok(d,id);assert.equal(d.taxYear,'2026');
 assert.ok(Math.abs(d.tr-ratio*mills/1000)<1e-12,id);
 for(const value of [125000,200000,350000,575000,1140500]){
  assert.ok(Math.abs(d.tr*value-value*ratio*mills/1000)<1e-7,id+'/'+value);
 }
}
// Primary county estimator actually displays tax $31,949.97 and a separately
// applied $1,990.17 sales-tax credit yielding $29,959.80 for its 6% scenario.
const estimatorGross=1140500*.06*.4669;
assert.ok(Math.abs(estimatorGross-31949.97)<.005,'Official estimated gross');
assert.ok(Math.abs(Math.round(estimatorGross*100)/100-1990.17-29959.80)<.005,'Official net after displayed credit');
assert.match(market.notes,/property-specific credits/);

console.log('Richland 1ER 2026 standalone scenario: 6 tax results and 1 rate difference check passed; main buyer legacy rates unchanged.');
