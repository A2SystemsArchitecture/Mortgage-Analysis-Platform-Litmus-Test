// 2026 Brevard County final tax-roll millage code-to-rate comparison.
// Primary official Tax Collector table: https://www.bcpao.us/Docs/Taxroll/2026/Millage_2026.pdf
// This verifies encoded CODED 2026 gross ad-valorem rates, not parcel boundaries,
// exemptions, credits, non-ad-valorem charges, uncoded planning factors or 2027 rates.
// Use fixture values producing unambiguous exact-cent gross taxes; half-cent rounding
// requires separate comparison with authoritative real property tax bills.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const i=html.indexOf('const COUNTIES = {'),j=html.indexOf('\n};',i);
assert.ok(i>=0&&j>i);
const counties=new Function(html.slice(i,j+3)+'\nreturn COUNTIES;')();
const county=counties.brevard;assert.equal(county.state,'fl');
const published2026={
  '1000':12.6226,
  '1300':12.8474,
  '13D0':17.5625,
  '13E0':15.8870,
  '12D0':18.0381,
  '16D0':17.5169,
  '1400':12.5137,
  '14A0':16.9595,
  '14D0':17.4536,
  '15D0':17.0413,
  '1900':12.8963,
  '2200':12.2275,
  '2300':12.3111,
  '2600':11.7899,
  '26G0':13.4279,
  '26H0':16.1311,
  '2700':10.2964,
  '2900':12.2561,
  '3400':12.2778,
  '53K0':17.8343,
  '34L0':13.3507,
  '54U0':18.1385,
  '52V0':13.0140,
  '34X0':15.1985,
  '34Z0':15.6563,
  '4100':12.1206,
  '41M0':18.2467,
  '51P0':15.9544,
  '4200':12.3103,
  '52P0':16.1062,
  '4300':12.3653,
  '43J0':12.0920,
  '4700':11.8441,
  '4800':12.0860,
  '51K0':17.6825,
  '51R0':18.0633,
  '5300':12.3786,
  '54S0':16.7944
};
let verified=0,planning=0;
for(const d of county.districts.filter(v=>!v.legacyOnly)){
 const code=d.id.match(/^bre-code-(.+)$/)?.[1]?.toUpperCase();
 if(!code){assert.ok(!d.taxYear,'Uncoded planning choice cannot claim adopted 2026 source: '+d.id);planning++;continue;}
 assert.ok(Object.hasOwn(published2026,code),'New coded rate requires official check: '+code);
 assert.equal(d.taxYear,'2026','Incorrect tax year: '+code);
 const mills=published2026[code];
 assert.ok(Math.abs(d.tr*1000-mills)<1e-9,'Official 2026 gross millage mismatch: '+code);
 for(const assessed of [100000,300000,500000]){
  const expected=Math.round(assessed*mills/10)/100;
  const actual=Math.round(assessed*d.tr*100)/100;
  assert.equal(actual,expected,'Gross pre-exemption tax mismatch: '+code);
 }
 verified++;
}
assert.equal(Object.keys(published2026).length,38);
assert.equal(verified,38,'Not all official codes are offered / checked');
assert.equal(planning,5,'Changed uncoded planning choices require a new review');
console.log('PASS Brevard 38/38 official 2026 coded gross composite millages, 114/114 fictional pre-exemption taxable-value examples. Five uncoded planning options remain unverified; no exemptions, parcel matching or fees certified.');
