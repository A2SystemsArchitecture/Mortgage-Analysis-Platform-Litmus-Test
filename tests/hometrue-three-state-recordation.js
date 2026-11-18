// Independently derived statutory examples for Alabama, Virginia and Tennessee.
// Alabama: https://www.revenue.alabama.gov/tax-types/recordation-tax/
// Virginia: https://law.lis.virginia.gov/vacode/title58.1/section58.1-801/
// Virginia mortgage: https://law.lis.virginia.gov/vacode/title58.1/subtitleI/chapter8/section58.1-803/
// Tennessee: https://revenue.support.tn.gov/hc/en-us/articles/360057241552-REC-1-Recordation-Tax-Overview
// Run: node tests/hometrue-three-state-recordation.js
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>0&&d>c);
const body="let ACTIVE_COUNTY='jefferson-al',MKT={tr:.01,br:6.86,wr:7.5};const fmt=n=>Number(n).toFixed(2);const cases=[['jefferson-al',400000,400000,'Deed Recordation Tax',0],['jefferson-al',400000,320000,'Deed Recordation Tax',80],['henrico',400001,320000.8,'Deed Recordation Tax (State + Local)',1333.67],['henrico',400001,320000.8,'Deed of Trust Tax (State + Local)',1067],['davidson',400000,320000,\"Realty Transfer Tax — Buyer's Share\",1480],['davidson',400000,320000,'Mortgage Recordation Tax',365.7]];let passed=0;for(const [key,price,loan,label,expected] of cases){ACTIVE_COUNTY=key;const inp={price,loan,damt:price-loan,br:6.86,wr:7.5,wt:3500,ty1:400,ty2:400,bi:275,pri:true,tier:3};const h=buildClosingCosts(inp);const at=h.indexOf(label);if(at<0)throw Error(label+' absent');const row=h.slice(at,at+750).match(/<div class=\"cc-val\">([\\d,]+\\.\\d{2})<\\/div>/);const actual=Number(row?.[1]?.replaceAll(',',''));if(actual!==expected)throw Error(label+' '+actual+' expected '+expected);passed++;}return passed;";
const passed=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(passed,6);
console.log('PASS: 6 independent Alabama Virginia Tennessee fee calculations.');
