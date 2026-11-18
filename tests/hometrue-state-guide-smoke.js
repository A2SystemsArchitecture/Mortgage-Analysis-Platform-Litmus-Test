// Test HomeTrue's 124 state-specific homeowner guides. Run: node tests/hometrue-state-guide-smoke.js
// Does not certify the underlying local tax-rate data.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildHomesteadGuide(inp)'),d=html.indexOf('function refreshHomesteadGuide()',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Could not extract guide code');
const source=html.slice(a,b)+'\n'+html.slice(c,d);
const body="let ACTIVE_COUNTY='miami-dade',MKT={tr:0.013,he:50000};\nconst S={tier:1},document={getElementById:()=>null};\nconst fmt=(n)=>'$'+Math.round(n).toLocaleString();\nconst fmtR=(n)=>n.toFixed(2)+'%';\nlet tests=0;\nfor(const [key,c] of Object.entries(COUNTIES)){\n ACTIVE_COUNTY=key;MKT.tr=c.tr;MKT.he=c.he;\n const h=buildHomesteadGuide({price:400000,ty1:400,ty2:400,br:6.86,wr:7.5,dpct:3,loan:388000,bp:100});\n if(typeof h!=='string'||!h.includes(c.name))throw Error(key+': guide missing selected area');\n if(c.state!=='fl'&&h.includes('The Florida Homestead Exemption'))throw Error(key+': Florida guide leaked to another state');\n tests++;\n}\nreturn {tests,markets:Object.keys(COUNTIES).length};";
const r=new Function(source+'\n'+body)();
assert.equal(r.markets,124);assert.equal(r.tests,124);
console.log('PASS: '+r.tests+' buyer guide renderings across '+r.markets+' markets.');
