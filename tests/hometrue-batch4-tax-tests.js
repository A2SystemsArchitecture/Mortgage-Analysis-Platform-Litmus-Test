// Batch 4 Indiana Ohio Pennsylvania West Virginia government cost regression.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Could not extract source');
const body="let ACTIVE_COUNTY=\"marion-in\",fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");let n=0;for(const row of [{key:\"marion-in\",terms:[\"No Real Estate Transfer Tax\",\"$25\"]},{key:\"franklin-oh\",terms:[\"$400 statewide portion\",\"Seller\"]},{key:\"allegheny\",terms:[\"$4,000\",\"Local Realty Transfer Tax\"]},{key:\"kanawha-wv\",terms:[\"Property Transfer Excise Tax\"]}]){ACTIVE_COUNTY=row.key;const h=buildClosingCosts({price:400000,loan:320000,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:20,damt:80000});for(const t of row.terms){if(!h.includes(t))throw Error(row.key+\" missing \"+t);n++;}}return {checks:n};";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result.checks,7);
console.log('PASS: '+result.checks+' Batch 4 statutory cost checks.');
