// Batch 6 AZ NV ID UT NM government charge regression.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Source extraction failed');
const body="let ACTIVE_COUNTY=\"maricopa\",fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");let n=0;for(const row of [{key:\"maricopa\",terms:[\"No Real Property Transfer Tax\",\"$0\"]},{key:\"clark\",terms:[\"$2.55 per $500\",\"$2,040\"]},{key:\"washoe\",terms:[\"$2.05 per $500\",\"$1,640\"]},{key:\"ada-id\",terms:[\"No State Transfer Tax\",\"$75\"]},{key:\"davis-ut\",terms:[\"No State Transfer Tax\",\"$50\"]},{key:\"bernalillo-nm\",terms:[\"No Buyer Deed Transfer Tax\",\"$0\"]}]){ACTIVE_COUNTY=row.key;const h=buildClosingCosts({price:400000,loan:320000,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:20,damt:80000});for(const t of row.terms){if(!h.includes(t))throw Error(row.key+\" missing \"+t);n++}}return {checks:n};";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result.checks,12);console.log('PASS: '+result.checks+' Batch 6 cost assertions');
