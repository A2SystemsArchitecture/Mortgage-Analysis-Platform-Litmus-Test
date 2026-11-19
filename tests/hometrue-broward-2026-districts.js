const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
function between(start, end) {
  const first = html.indexOf(start);
  const last = html.indexOf(end, first + start.length);
  assert.ok(first >= 0 && last > first);
  return html.slice(first, last);
}
// Broward County Property Appraiser: https://bcpa.net/millage.asp
const county = between("  'broward': {", "  'palm-beach': {");
const source = 'const COUNTIES={' + county + '}; let ACTIVE_DISTRICT; const MKT={};' +
  'const document={querySelectorAll:()=>[],getElementById:()=>null};\n' +
  between('function selectDistrict(', 'function selectFloodZone(');
new Function('assert', source + "for (const [id, annual] of [[\"bro-uninc-0012\",5704.47],[\"bro-uninc-0013\",5356.89],[\"bro-ftlaud-0311\",5560.14],[\"bro-ftlaud-0312\",5520.78],[\"bro-ftlaud-9312\",5815.95],[\"bro-hollywood-0512\",6599.55],[\"bro-hollywood-0513\",6251.97],[\"bro-pembroke\",5646.84],[\"bro-miramar\",6006.09],[\"bro-weston-3312\",5269.89],[\"bro-weston-3313\",4922.31],[\"bro-uninc\",3300]]) {\n const district = COUNTIES.broward.districts.find(row => row.id === id);\n selectDistrict('broward', district, null, true);\n assert.ok(Math.abs(MKT.tr * 300000 - annual) < 1e-8, id);\n}")(assert);
console.log('Passed 11 Broward millage codes and the legacy fallback.');
