const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
function between(start, end) {
 const first=html.indexOf(start), last=html.indexOf(end,first+start.length);
 assert.ok(first>=0 && last>first);
 return html.slice(first,last);
}
// https://www.paslc.gov/DocumentCenter/View/686/2026-Final-Tax-Rates-PDF
const source='const COUNTIES={'+between("  'st-lucie': {","  'indian-river': {") +
 '}; let ACTIVE_DISTRICT; const MKT={}; const document={querySelectorAll:()=>[],getElementById:()=>null};\n' +
 between('function selectDistrict(', 'function selectFloodZone(');
new Function('assert', source + "for (const [id, expected] of [['stl-0001',5642.25],['stl-0002',5682.81],['stl-0050',5838.81],['stl-0009',5756.79],['stl-0011',6601.29],['stl-0022',7208.79],['stl-0041',6560.73],['stl-tradition',4350]]) {\n const district=COUNTIES['st-lucie'].districts.find(d=>d.id===id);\n selectDistrict('st-lucie',district,null,true);\n assert.ok(Math.abs(MKT.tr*300000-expected)<1e-8,id);\n}\n")(assert);
console.log('Passed seven St. Lucie groups and fallback.');
