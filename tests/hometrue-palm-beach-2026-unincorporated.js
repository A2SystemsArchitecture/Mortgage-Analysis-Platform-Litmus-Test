const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
function between(a,b){const start=html.indexOf(a),end=html.indexOf(b,start+a.length);assert.ok(start>=0&&end>start);return html.slice(start,end)}
const county=new Function('return ({'+between("  'palm-beach': {","  'martin': {")+'})')()['palm-beach'];
const d=county.districts.find(x=>x.id==='pb-uninc');
assert.ok(d);
const components=[4.5,.021,3.4581,.5491,.0948,.1026,.0327,.027,3.039,3.248,.4908,.6561];
const total=components.reduce((a,b)=>a+b,0);
assert.ok(Math.abs(total-16.2192)<1e-10);
assert.ok(Math.abs(d.tr-total/1000)<1e-12);
for(const [price,expected] of [[100000,1621.92],[300000,4865.76],[400001,6487.70],[575000,9326.04],[800000,12975.36]])assert.equal(Number((price*d.tr).toFixed(2)),expected);
assert.match(d.label,/2026 standard base, verify parcel/);
console.log('Palm Beach 2026 standard unincorporated rate: 7 checks passed.');
// Official Palm Beach Property Appraiser FINAL 2026 adopted component rates:
// https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf
// Published standard unincorporated district rate 16.2192 mills also corroborated in
// taxing district totals; individual parcel exceptions and non-ad valorem charges excluded.
// This is a rate and arithmetic regression, not a browser or complete tax-bill verification.
