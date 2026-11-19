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
// https://www.pamartinfl.gov/millage-codes-tax-rates/458-2026-millage-codes-tax-rates
const source = 'const COUNTIES={' + between("  'martin': {", "  'st-lucie': {") +
  '}; let ACTIVE_DISTRICT; const MKT={}; const document={querySelectorAll:()=>[],getElementById:()=>null};\n' +
  between('function selectDistrict(', 'function selectFloodZone(');
new Function('assert', source + "const expected = [['mar-stuart',5139.69],['mar-1400',4657.26],['mar-2200',4598.19],['mar-4300',4809.15],['mar-8018',4955.97],['mar-6006',4643.46],['mar-6106',4697.43],['mar-7017',4624.35],['mar-3003',4635.69],['mar-9009',4637.85],['mar-5005',4643.4],['mar-uninc',2730]];\nfor (const [id, annual] of expected) {\n const district=COUNTIES.martin.districts.find(row=>row.id===id);\n selectDistrict('martin',district,null,true);\n assert.ok(Math.abs(MKT.tr*300000-annual)<1e-8,id);\n}\n")(assert);
console.log('Passed 11 Martin levy codes and fallback.');
