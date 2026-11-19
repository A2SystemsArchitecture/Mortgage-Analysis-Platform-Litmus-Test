// Batch 3 Texas Louisiana Arkansas Mississippi government cost regression.
// Confirms described statutory examples, not every local property's tax assessment.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Source extraction failed');
const body="let ACTIVE_COUNTY=\"harris\",fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");let checks=0;for(const row of [{key:\"harris\",parts:[\"No Documentary Stamp Tax\",\"$103\",\"No Intangible Tax\"]},{key:\"ebr\",parts:[\"No State Transfer Tax\",\"Notary Fee\"]},{key:\"pulaski-ar\",parts:[\"$660\",\"$735\"]},{key:\"hinds-ms\",parts:[\"No State Transfer Tax\",\"$75\"]}]){ACTIVE_COUNTY=row.key;const h=buildClosingCosts({price:400000,loan:320000,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:20,damt:80000});for(const p of row.parts){if(!h.includes(p))throw Error(row.key+\" missing \"+p);checks++;}}return {checks,scenarios:4};";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result.scenarios,4);assert.equal(result.checks,9);
console.log('PASS: '+result.checks+' Batch 3 cost assertions across 4 scenarios.');
