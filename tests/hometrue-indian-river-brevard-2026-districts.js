const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
function between(start,end) {
 const first=html.indexOf(start), last=html.indexOf(end,first+start.length);
 assert.ok(first>=0 && last>first);
 return html.slice(first,last);
}
// https://www.ircpa.org/media/14226/2026-final-millages-chart.pdf
// https://www.bcpao.us/Docs/Taxroll/2026/Millage_2026.pdf
const source='const COUNTIES={'+between("  'indian-river': {","  'fulton': {") +
 '}; let ACTIVE_DISTRICT; const MKT={}; const document={querySelectorAll:()=>[],getElementById:()=>null};\n' +
 between('function selectDistrict(', 'function selectFloodZone(');
new Function('assert', source + "for(const [county,id,cents] of [[\"indian-river\",\"ir-code-1\",425409],[\"indian-river\",\"ir-code-2\",490845],[\"indian-river\",\"ir-code-3a\",396213],[\"indian-river\",\"ir-code-3f\",417576],[\"indian-river\",\"ir-code-4\",542451],[\"indian-river\",\"ir-code-5\",357504],[\"indian-river\",\"ir-code-6\",352950],[\"indian-river\",\"ir-code-7\",420855],[\"indian-river\",\"ir-code-7e\",413022],[\"indian-river\",\"ir-code-8\",475785],[\"indian-river\",\"ir-code-9\",408891],[\"brevard\",\"bre-code-1000\",378678],[\"brevard\",\"bre-code-1300\",385422],[\"brevard\",\"bre-code-13d0\",526875],[\"brevard\",\"bre-code-13e0\",476610],[\"brevard\",\"bre-code-12d0\",541143],[\"brevard\",\"bre-code-16d0\",525507],[\"brevard\",\"bre-code-1400\",375411],[\"brevard\",\"bre-code-14a0\",508785],[\"brevard\",\"bre-code-14d0\",523608],[\"brevard\",\"bre-code-15d0\",511239],[\"brevard\",\"bre-code-1900\",386889],[\"brevard\",\"bre-code-2200\",366825],[\"brevard\",\"bre-code-2300\",369333],[\"brevard\",\"bre-code-2600\",353697],[\"brevard\",\"bre-code-26g0\",402837],[\"brevard\",\"bre-code-26h0\",483933],[\"brevard\",\"bre-code-2700\",308892],[\"brevard\",\"bre-code-2900\",367683],[\"brevard\",\"bre-code-3400\",368334],[\"brevard\",\"bre-code-53k0\",535029],[\"brevard\",\"bre-code-34l0\",400521],[\"brevard\",\"bre-code-54u0\",544155],[\"brevard\",\"bre-code-52v0\",390420],[\"brevard\",\"bre-code-34x0\",455955],[\"brevard\",\"bre-code-34z0\",469689],[\"brevard\",\"bre-code-4100\",363618],[\"brevard\",\"bre-code-41m0\",547401],[\"brevard\",\"bre-code-51p0\",478632],[\"brevard\",\"bre-code-4200\",369309],[\"brevard\",\"bre-code-52p0\",483186],[\"brevard\",\"bre-code-4300\",370959],[\"brevard\",\"bre-code-43j0\",362760],[\"brevard\",\"bre-code-4700\",355323],[\"brevard\",\"bre-code-4800\",362580],[\"brevard\",\"bre-code-51k0\",530475],[\"brevard\",\"bre-code-51r0\",541899],[\"brevard\",\"bre-code-5300\",371358],[\"brevard\",\"bre-code-54s0\",503832]]) {\n const district=COUNTIES[county].districts.find(row=>row.id===id);\n selectDistrict(county,district,null,true);\n assert.equal(Math.round(MKT.tr*300000*100),cents,id);\n}\nassert.equal(COUNTIES['indian-river'].districts.find(row=>row.id==='ir-uninc').tr,0.0085);\nassert.equal(COUNTIES.brevard.districts.find(row=>row.id==='bre-uninc').tr,0.0095);\n")(assert);
console.log('Passed 49 official rate choices and two planning fallbacks.');
