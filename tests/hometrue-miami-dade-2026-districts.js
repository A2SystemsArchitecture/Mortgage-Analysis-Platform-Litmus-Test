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
// Official adopted chart: https://www.miamidadepa.gov/resources-pa/library/reports/millage/2026-adopted-millage-chart.pdf
const county = between("  'miami-dade': {", "  'broward': {");
const source = 'const COUNTIES={' + county + '}; let ACTIVE_DISTRICT; const MKT={};' +
  'const document={querySelectorAll:()=>[],getElementById:()=>null};\n' +
  between('function selectDistrict(', 'function selectFloodZone(') +
  between('function calculateFlorida2026AdValorem(', 'function calculateFlorida2027AdValorem(');
new Function('assert', source + "const expected = [['mia-uninc',5069.49],['mia-miami',5986.32],['mia-beach',5600.43],['mia-hialeah',5584.02],['mia-coralgables',5445.54],['mia-homestead',6270.03]];\nfor(const [id,annual] of expected){\n const district=COUNTIES['miami-dade'].districts.find(d=>d.id===id);\n selectDistrict('miami-dade',district,null,true);\n assert.ok(Math.abs(300000*MKT.tr-annual)<1e-8);\n}\nconst homestead = calculateFlorida2026AdValorem(100000, 6.623, 10.2753, true);\nassert.ok(homestead.annualTax.toFixed(2)==='995.99');\n")(assert);
console.log('Passed six Miami-Dade districts and the approved homestead comparison.');
