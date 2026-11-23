// Official York County SC Auditor 2026 one-page published district millages, image inspected.
// https://www.yorkcountysc.gov/DocumentCenter/View/10267/2026-Millage-Rates
// Separate Rock Hill RH versus RL special assessment, and approved 4% legal residence
// school-operations relief versus nonapproved 6% assessment. Source-rate only.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const county=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')()['york-sc'];
assert.equal(county.state,'sc');
const current=county.districts.filter(d=>d.taxYear==='2026');
assert.equal(current.length,2,'All York 2026 source-labeled choices must be checked');
const official={county:67.2,rockHillCity:94.7,schoolGross:263.1,schoolOperation:215.1,specialRL:5.8};
const rh=official.county+official.rockHillCity+official.schoolGross;
assert.ok(Math.abs(rh-425)<1e-10);
const rhLegal=rh-official.schoolOperation;
assert.ok(Math.abs(rhLegal-209.9)<1e-10);
assert.ok(Math.abs(rh+official.specialRL-430.8)<1e-10,'RL has separate fee/mill and cannot use RH');
for(const [id,ratio,mills] of [
 ['yor-rockhill-rh-2026-legal4',.04,rhLegal],
 ['yor-rockhill-rh-2026-other6',.06,rh]
]){
 const d=current.find(x=>x.id===id);assert.ok(d,id);
 assert.ok(Math.abs(d.tr-ratio*mills/1000)<1e-12,id);
 for(const price of [125000,295100,400000,575000,850000]){
  assert.ok(Math.abs(d.tr*price-price*ratio*mills/1000)<1e-7,id+'/'+price);
 }
}
assert.ok(county.notes.includes('RL')&&county.notes.includes('special'));
assert.equal(county.districts.length,5,'Original legacy options preserved');
console.log('PASS York 2026 Rock Hill RH official source: 2/2 classifications and ten fictional price cases, RL exclusion and school credit. Full owner eligibility/parcel tax not certified.');
