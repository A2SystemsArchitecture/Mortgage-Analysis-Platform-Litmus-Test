// Official-source arithmetic fixtures. These are NOT end-to-end HomeTrue tests.
// node --test tests/property-tax-official-fixtures.test.js
const {test}=require('node:test');
const assert=require('node:assert/strict');
test('Berkeley SC official 2026-27 4% residence invoice matches all credits and conditional fees',()=>{
 const appraised=100000, assessed=appraised*.04;
 const tax=assessed*.2465,schoolCredit=assessed*.1469,localOptionCredit=appraised*.000793;
 assert.equal(tax,986);
 assert.equal(schoolCredit,587.60);
 assert.equal(localOptionCredit,79.30);
 const reduced=+(tax-schoolCredit-localOptionCredit).toFixed(2);
 const total=+(reduced+79.88+99+48).toFixed(2);
 assert.equal(reduced,319.10);
 assert.equal(total,545.98);
 // Source: https://berkeleycountysc.gov/dept/auditor/computation/
});
test('Gwinnett GA 2026 unincorporated millage components total to 34.86 mills',()=>{
 const sum=[6.95,18.7,1.45,1,3.2,2.9,.36,.3].reduce((a,b)=>a+b,0);
 assert.equal(+sum.toFixed(2),34.86);
 // Source: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates
});
test('Durham City NC 2026-27 county plus city composite is 1.0163 per 100',()=>{
 const combined=.5792+.4371;
 assert.equal(+combined.toFixed(4),1.0163);
 // Source: https://dconc.gov/Tax-Administration/Payment-Options-and-Collections/Tax-Rates1
});
test('Wake County NC 2026-27 Raleigh standard combined is .9091 per 100 absent special levies',()=>{
 const combined=.5371+.3720;
 assert.equal(+combined.toFixed(4),.9091);
 // Source: Wake County official 2026 rates PDF
});
