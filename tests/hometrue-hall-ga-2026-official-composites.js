// Official Hall GA 2026 Tax Commissioner revised millage chart, first PDF page.
// https://hallcountytax.org/wp-content/uploads/2026/09/2026-Revised-Millage-Chart-Website.pdf
// Source-rate gate only for two exact buyer-selectable districts; no other district,
// exemption, parcel match or full buyer liability certification.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const hall=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')().hall;
assert.equal(hall.state,'ga');
assert.equal(hall.districts.length,2,'Any extra selectable Hall district requires its own 2026 source evidence');
const source={
 'hal-uninc':{district:'001',mills:24.192,components:[3.565,15.490,1.000,2.005,0.535,1.160,0.437]},
 'hal-gainesville':{district:'004',mills:14.221,components:[3.565,0.535,0.722,6.092,0.896,0.712,1.299,0.400]}
};
let runs=0;
for(const [id,x] of Object.entries(source)){
 const live=hall.districts.find(d=>d.id===id);
 assert.ok(live,id+' missing');
 assert.equal(live.taxYear,'2026');
 assert.ok(live.label.includes(x.district),id+' district label mismatch');
 assert.ok(Math.abs(x.components.reduce((sum,n)=>sum+n,0)-x.mills)<1e-9,'official component sum '+id);
 assert.ok(Math.abs(live.tr-.4*x.mills/1000)<1e-12,'programmed factor '+id);
 for(const price of [125000,300000,475000,575000,850000]){
  const expected=x.components.reduce((sum,m)=>sum+price*.4*m/1000,0);
  assert.ok(Math.abs(live.tr*price-expected)<1e-7,id+'/'+price);
  runs++;
 }
}
assert.equal(runs,10);
console.log('PASS Hall County 2026 official revised schedule: district 001 and Gainesville 004, all source components and 10/10 fictional pre-exemption values; full market signoff remains open.');
