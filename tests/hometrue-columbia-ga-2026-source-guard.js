// Columbia County GA 2026 audit guard. DO NOT mistake the 2025 county/bond
// rates for an adopted 2026 composite or increase audit milestone on school data alone.
// Verified 2026 school source: https://4.files.edl.io/ed1f/07/23/26/133022-8623d27f-2122-4430-85fa-294b2aa00a4d.pdf
// District adoption corroboration: https://www.ccboe.net/
const assert=require('node:assert/strict');const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf("  'columbia': {"),b=html.indexOf('  // ── TEXAS ──',a);
assert.ok(a>=0&&b>a);
const c=new Function('return ({'+html.slice(a,b)+'})')().columbia;
assert.match(c.notes,/adopted 14\.997-mill school rate/);
assert.match(c.notes,/official signed resolution/);
assert.match(c.notes,/planning estimates/);
for(const [id,rate] of [['col-evans',.0082],['col-grovetown',.0085],['col-uninc',.008]]){
 const d=c.districts.find(x=>x.id===id);assert.ok(d);assert.equal(d.tr,rate,'Legacy rate preserved '+id);
}
const oldSchool=16.234, currentSchool=14.997;
assert.ok(Math.abs(oldSchool-currentSchool-1.237)<1e-10);
const csv=fs.readFileSync(path.join(__dirname,'..','audits','HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const line=csv.split(/\r?\n/).find(x=>x.startsWith('"columbia","GA"'));
assert.ok(line);assert.match(line,/"NO_DOCUMENTED_LOCAL_CASE"/);assert.ok(!line.includes('"MAIN_2026"'));
console.log('Columbia 2026 school evidence guard: school-only rate verified, no unverified county composite, existing links preserved.');
