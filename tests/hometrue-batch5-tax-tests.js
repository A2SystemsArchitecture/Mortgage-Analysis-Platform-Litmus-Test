// Batch 5 statutory examples; not approval of effective rates.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Source extraction failed');
const body="let ACTIVE_COUNTY=\"jackson-mo\",fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");let n=0;for(const row of [{key:\"jackson-mo\",terms:[\"State Transfer Stamp Tax\",\"$0\"]},{key:\"johnson-ks\",terms:[\"Mortgage Registration Tax\",\"$0\"]},{key:\"montgomery-md\",terms:[\"$1,000\",\"$2,000\"]},{key:\"new-castle-de\",terms:[\"$8,000\",\"Realty Transfer\"]},{key:\"cumberland-me\",terms:[\"$880\",\"Real Estate Transfer\"]}]){ACTIVE_COUNTY=row.key;const h=buildClosingCosts({price:400000,loan:320000,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:20,damt:80000});for(const t of row.terms){if(!h.includes(t))throw Error(row.key+\" missing \"+t);n++}}return {checks:n};";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result.checks,10);console.log('PASS: '+result.checks+' Batch 5 checks');
