// Batch 1 independently sourced statutory rate checks. Run with Node after each review-branch edit.
// Statutory figures were cross-checked with FL DOR, GA DOR, AL DOR/code and SC DOR.
// This test does NOT validate combined effective local property tax rates or all exemptions.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>0&&d>c,'Source extraction failed');
const code=html.slice(a,b)+'\n'+html.slice(c,d);
const test="\nlet ACTIVE_COUNTY=\"miami-dade\";\nconst fmt=n=>\"$\"+Math.round(n).toLocaleString(\"en-US\");\nlet checked=0;\nconst cases=[\n{key:\"miami-dade\",loan:320000,parts:[\"$2,400\",\"$1,120\",\"$640\"]},\n{key:\"broward\",loan:320000,parts:[\"$2,800\",\"$1,120\",\"$640\"]},\n{key:\"fulton\",loan:320000,parts:[\"$960\",\"($400 on this purchase)\"]},\n{key:\"jefferson-al\",loan:320000,parts:[\"$80.00\",\"$480\"]},\n{key:\"jefferson-al\",loan:400000,parts:[\"$0.50\",\"$600\"]},\n{key:\"charleston-sc\",loan:320000,parts:[\"($1,480)\"]}\n];\nfor(const row of cases){\n ACTIVE_COUNTY=row.key;\n const h=buildClosingCosts({price:400000,loan:row.loan,tier:2,bi:300,br:7,ty1:300,wt:3500,dpct:(400000-row.loan)/4000,damt:400000-row.loan});\n for(const expected of row.parts)if(!h.includes(expected))throw Error(row.key+\" expected \"+expected);\n checked+=row.parts.length;\n}\nreturn {cases:cases.length,assertions:checked};";
const result=new Function(code+'\n'+test)();
assert.equal(result.cases,6);assert.equal(result.assertions,12);
console.log('PASS: '+result.assertions+' statutory calculations checked across '+result.cases+' buyer scenarios');
