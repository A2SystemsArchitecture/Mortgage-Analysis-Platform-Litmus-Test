// Batch 2 statutory government transfer and recording calculation regression.
// Not a property-tax or whole-state financial accuracy certification.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Could not extract code');
const body="\nlet ACTIVE_COUNTY=\"mecklenburg\";const fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");\nconst cases=[\n{key:\"mecklenburg\",parts:[\"($800 on this purchase)\",\"No Intangible Tax\"]},\n{key:\"shelby-tn\",parts:[\"$1,480\",\"$366\"]},\n{key:\"boone-ky\",parts:[\"$0.50 per $500 or fraction of value\",\"Seller\"]},\n{key:\"henrico\",parts:[\"$1,333\",\"$1,067\",\"($400)\"]}\n];\nlet checks=0;\nfor(const test of cases){\n ACTIVE_COUNTY=test.key;\n const h=buildClosingCosts({price:400000,loan:320000,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:20,damt:80000});\n for(const part of test.parts){if(!h.includes(part))throw Error(test.key+\" should include \"+part);checks++;}\n}\nreturn {checks,cases:cases.length};";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result.cases,4);assert.equal(result.checks,9);
console.log('PASS: '+result.checks+' government-charge checks across '+result.cases+' Batch 2 scenarios.');
