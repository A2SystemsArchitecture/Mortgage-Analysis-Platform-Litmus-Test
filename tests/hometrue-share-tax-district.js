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
new Function("\nconst COUNTIES = {gwinnett:{tr:0.0095,districts:[{id:'gwin-lawrenceville',tr:0.01},{id:'gwin-uninc',tr:34.86/1000*0.4}]}};\nconst MKT = {tr:0.013,br:6,wr:7};\nlet ACTIVE_COUNTY='miami-dade', ACTIVE_DISTRICT=null, copied='';\nconst S={inp:{address:'Example',price:300000,dpct:20,tier:1,countyKey:'gwinnett',districtId:'gwin-uninc'}};\nconst window={location:{origin:'https://example.com',pathname:'/platform.html',search:''}};\nconst navigator={clipboard:{writeText(value){copied=value;return {then(){}};}}};\nconst document={querySelectorAll:()=>[],getElementById:()=>null};\nfunction canAccess(){return true;}\nfunction setCounty(key){ACTIVE_COUNTY=key; MKT.tr=COUNTIES[key].tr;}\nfunction cPI(){return 0;} function cPMI(){return [0,0];}\nfunction bAnalysis(){} function show(){} function updateUpgradeBtn(){} function setTimeout(){}\n" + between('function shareAnalysis(', '// PRIORITY 5') +
  between('function renderDistrictPills(', 'function selectFloodZone(') + "\nshareAnalysis();\nwindow.location.search=new URL(copied).search;\ncheckShareURL();\nif(S.inp.ty1!==349||S.inp.ty2!==349||Math.abs(S.inp.annualTax1-4183.20)>1e-8||Math.abs(S.inp.annualTax2-4183.20)>1e-8||S.inp.countyKey!=='gwinnett'||S.inp.districtId!=='gwin-uninc')throw Error('Roundtrip '+JSON.stringify(S.inp));\nwindow.location.search='?addr=Example&price=300000&county=gwinnett&district=unknown';\ncheckShareURL();\nif(S.inp.ty1!==238||S.inp.annualTax1!==2850||S.inp.districtId)throw Error('Unknown district');\nwindow.location.search='?addr=Legacy&price=300000';\ncheckShareURL();\nif(S.inp.ty1!==238||S.inp.annualTax1!==2850)throw Error('Legacy fallback');\n")();
console.log('Shared link, unknown district and legacy link checks passed.');
