// Columbia County GA official FINAL 2026 Tax Calculation Workbook:
// https://www.columbiacountyga.gov/DocumentCenter/View/10735/2026-Tax-Calculation-Workbook--Final
// Source workbook worksheets: "All Other Districts", "G'Town", and "Harlem".
// Official 2026 school PT-32.1:
// https://4.files.edl.io/ed1f/07/23/26/133022-8623d27f-2122-4430-85fa-294b2aa00a4d.pdf
// This tests illustrative buyer district multipliers BEFORE exemptions/fees,
// not a certified entire buyer report or every tax district.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf("  'columbia': {"),b=html.indexOf('  // ── TEXAS ──',a);assert.ok(a>=0&&b>a);
const county=new Function('return ({'+html.slice(a,b)+'})')().columbia;
assert.match(county.notes,/county operating 4\.062 mills and county bond 0\.429 mills/);
assert.match(county.notes,/before exemptions/);
const uninc=4.062+0.429+2.788+14.997;
const grovetown=4.062+0.429+14.997;
assert.ok(Math.abs(uninc-22.276)<1e-10);assert.ok(Math.abs(grovetown-19.488)<1e-10);
// County workbook Grovetown 19.488 mills excludes city levy; city confirms
// county Tax Commissioner collects Grovetown city property tax.
// https://www.cityofgrovetown.com/200/Property-Taxes-and-Fees
// Therefore the county+school subtotal must NOT authorize new full-city analysis.
const grovetownOption=county.districts.find(d=>d.id==='col-2026-grovetown');
assert.ok(grovetownOption.label.includes('city tax omitted, unverified'));
assert.ok(!grovetownOption.taxYear&&!grovetownOption.taxPeriod,'Incomplete city tax cannot be stamped adopted full 2026 district');
assert.equal(county.districts.find(d=>d.id==='col-2026-uninc-fire').taxYear,'2026');
assert.match(county.notes,/ZERO city levy/);
assert.match(county.notes,/must not be presented as a complete city parcel composite/);
for(const [id,mills] of [['col-2026-uninc-fire',uninc],['col-2026-grovetown',grovetown]]){
 const d=county.districts.find(x=>x.id===id);assert.ok(d);
 assert.ok(Math.abs(d.tr-0.4*mills/1000)<1e-12,id);
 for(const value of [192000,300000,475000,650000]){
  assert.ok(Math.abs(d.tr*value-0.4*mills*value/1000)<1e-8,id+' '+value);
 }
}
for(const [id,rate] of [['col-evans',.0082],['col-grovetown',.0085],['col-uninc',.008]]){
 assert.equal(county.districts.find(x=>x.id===id).tr,rate,'Legacy link '+id);
}
assert.equal(new Set(county.districts.map(d=>d.id)).size,county.districts.length);
const csv=fs.readFileSync(path.join(__dirname,'..','audits','HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const line=csv.split(/\r?\n/).find(x=>x.startsWith('"columbia","GA"'));
assert.ok(line);assert.match(line,/"MAIN_2026"/);
console.log('Columbia GA 2026: official workbook values and 8 price scenarios; Grovetown city omitted and blocked as dated full district; old selections preserved, no full certification.');
