// Primary-source 2026 Gwinnett issued unincorporated tax bill cross-check.
// Official 2026 notice: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R6174%20203.pdf
// Parcel R6174 203 is a TEMPORARY bill while value is under appeal.
// This verifies exactly one billed parcel, not an arbitrary buyer's final tax liability.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {');
const j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const counties=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')();
const district=counties.gwinnett.districts.find(d=>d.id==='gwin-uninc');
assert.ok(district);
assert.equal(district.taxYear,'2026');
const assessed=97360;
const value=243400;
assert.equal(value*.4,assessed);
const components=[
 ['county general',6.950,676.65],
 ['development/code enforcement',.360,35.05],
 ['economic development',.300,29.21],
 ['fire EMS',3.200,311.55],
 ['police',2.900,282.34],
 ['recreation',1.000,97.36],
 ['school',18.700,1820.63],
 ['school bond',1.450,141.17]
];
function cents(v){return Math.round((v+Number.EPSILON)*100);}
const millSum=components.reduce((sum,c)=>sum+c[1],0);
assert.ok(Math.abs(millSum-34.860)<1e-9);
assert.ok(Math.abs(district.tr-(34.86/1000*.4))<1e-12);
for(const [name,mills,tax] of components){
 assert.ok(Math.abs(cents(assessed*mills/1000)/100-tax)<=.011,'incorrect source line '+name);
}
const billedTax=cents(components.reduce((s,c)=>s+c[2],0))/100;
assert.equal(billedTax,3393.96);
assert.equal(cents(value*district.tr)/100,3393.97,
 'Single composite rounding is one cent above summed line-item rounding on this bill');
assert.equal(cents(300.12+38.50+49.20)/100,387.82);
assert.equal(cents(billedTax+387.82)/100,3781.78);
assert.equal(cents((25.01*12))/100,300.12);
assert.equal(cents(.55*70)/100,38.50);
assert.equal(cents((2.46/100)*2000)/100,49.20);
assert.ok(counties.gwinnett.notes.includes('$387.82') && counties.gwinnett.notes.includes('ONE-PARCEL billed example') && counties.gwinnett.notes.includes('not automatically included in the planning tax estimate'), 'Buyer notes must explicitly disclose county parcel fees as unmodeled and not a universal flat fee');
assert.ok(!counties.gwinnett.notes.includes('All parcel fees are included'),
 'HomeTrue must not claim all parcel fees included');
console.log('PASS original 2026 TEMPORARY Gwinnett bill R6174 203: 34.86 mills, $3393.96 line-item taxes, $387.82 parcel fees, $3781.78 total; composite one-cent rounding difference. No general certification.');
