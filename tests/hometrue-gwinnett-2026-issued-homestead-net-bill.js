// Independent reconciliation of the *actual* 2026 Gwinnett homestead bill,
// not an assumption that every buyer gets the current owner's relief.
// Primary tax notice: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=src.indexOf('const COUNTIES = {'),j=src.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const district=new Function(src.slice(i,j+3)+'\nreturn COUNTIES;')().gwinnett.districts.find(d=>d.id==='gwin-uninc');
assert.ok(district&&district.taxYear==='2026');
const marketValue=493200,assessed=197280;
assert.equal(marketValue*.4,assessed);
const lines=[
  {type:'county general',mills:6.95,voe:69240,exemption:10000,grant:18000,taxable:100040,net:695.28},
  {type:'development/code',mills:.36,voe:69240,exemption:10000,grant:0,taxable:118040,net:42.49},
  {type:'economic development',mills:.30,voe:69240,exemption:10000,grant:0,taxable:118040,net:35.41},
  {type:'fire',mills:3.20,voe:69240,exemption:10000,grant:0,taxable:118040,net:377.73},
  {type:'police',mills:2.90,voe:69240,exemption:10000,grant:0,taxable:118040,net:342.32},
  {type:'recreation',mills:1.00,voe:69240,exemption:7000,grant:18000,taxable:103040,net:103.04},
  {type:'school',mills:18.70,voe:0,exemption:8000,grant:18000,taxable:171280,net:3202.94},
  {type:'school bond',mills:1.45,voe:0,exemption:0,grant:0,taxable:197280,net:286.06}
];
const cents=n=>Math.round((n+Number.EPSILON)*100);
let totalCents=0,countyCents=0,schoolCents=0;
for(let n=0;n<lines.length;n++){
 const x=lines[n];
 assert.equal(assessed-x.voe-x.exemption-x.grant,x.taxable,x.type+' taxable base');
 assert.equal(cents(x.taxable*x.mills/1000),cents(x.net),x.type+' net bill amount');
 totalCents+=cents(x.net);
 if(n<6)countyCents+=cents(x.net);else schoolCents+=cents(x.net);
}
assert.equal(countyCents,159627);
assert.equal(schoolCents,348900);
assert.equal(totalCents,508527);
const totalMills=lines.reduce((s,x)=>s+x.mills,0);
assert.ok(Math.abs(totalMills-34.86)<1e-10);
assert.ok(Math.abs(district.tr-.4*totalMills/1000)<1e-10);
assert.equal(cents(25.01*12),30012);
assert.equal(cents(2.46*40),9840);
assert.equal(cents(.70*71),4970);
assert.equal(30012+9840+4970,44822);
assert.equal(totalCents+44822,553349);
assert.equal(cents(293.70+479.70+1018.53),179193);
assert.equal(lines[7].voe+lines[7].exemption+lines[7].grant,0,'school bond must not inherit school homestead deduction');
assert.ok(src.includes('NOT VERIFIED FOR THIS BUYER.'),'Existing owner exemptions must not transfer without verification');
assert.ok(src.includes('ZERO homestead or homeowner-credit deduction for school bond'),'Buyer notes must preserve different school operating and bond deductions');
assert.ok(src.includes('do NOT presume these owner-specific figures will transfer to a buyer or repeat in 2027'),'Existing homeowner relief cannot be assumed for buyer');
console.log('PASS: 2026 Gwinnett issued S1R residential homestead bill: 8/8 tax-base and levy calculations, $1,596.27 county + $3,489 school, $448.22 assessments, $5,533.49 billed; credits and eligibility not generalized.');
