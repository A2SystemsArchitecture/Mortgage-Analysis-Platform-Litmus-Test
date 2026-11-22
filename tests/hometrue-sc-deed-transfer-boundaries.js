// SCDOR official deed recording fee rule: https://www.dor.sc.gov/tax-index/deed-recording-fee
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts('),d=html.indexOf('function buildHomesteadGuide(',c);
assert.ok(a>=0&&b>a&&c>=0&&d>c);
const fixtures=[[99.99,0],[100,1.85],[500,1.85],[500.01,3.70],[1001,5.55]];
const body="\nlet ACTIVE_COUNTY='charleston';\nconst fmt=n=>'$'+Math.round(n).toLocaleString();\nconst input=p=>({price:p,loan:0,damt:p,dpct:100,tier:1,bi:250,br:6.8,ty1:350,wt:2800});\nconst calculated=[];\nfor(const [price,expected] of fixtures) {\n  const markup=buildClosingCosts(input(price));\n  const match=markup.match(/buyer generally secondarily liable \\(\\$([\\d,]+(?:\\.\\d{2})?)\\)/);\n  if(!match) throw Error('Could not read seller assumed deed recording fee for '+price);\n  const actual=Number(match[1].replace(/,/g,''));\n  if(Math.abs(actual-expected)>0.001)throw Error('At '+price+', expected '+expected+', got '+actual);\n  if(!markup.includes('A 4% legal-residence assessment requires approval'))\n    throw Error('Missing SC 4% legal-residence eligibility warning');\n  calculated.push({price,actual});\n}\nreturn calculated;\n";
const run=new Function('fixtures',html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body);
const actual=run(fixtures);
assert.equal(actual.length,5);
console.log(JSON.stringify({state:'SC',governmentRule:'$1.85 for $100-$500, then per $500 increment',scenarios:actual,passed:true}));
