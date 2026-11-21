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
console.log('Richland 1ER 2026 standalone scenario: 6 tax results and 1 rate difference check passed; main buyer legacy rates unchanged.');
