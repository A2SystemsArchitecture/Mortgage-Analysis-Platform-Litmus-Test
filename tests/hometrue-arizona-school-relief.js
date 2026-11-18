// Source: Arizona Revised Statutes 15-972(B),(D), school primary-tax relief.
// https://www.azleg.gov/ars/15/00972.htm
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildHomesteadGuide(inp)'),d=html.indexOf('function refreshHomesteadGuide()',c);
assert(a>=0&&b>a&&c>0&&d>c);
const body="let ACTIVE_COUNTY='maricopa',MKT={tr:.01,he:0},S={tier:3},document={getElementById:()=>null},fmt=n=>'$'+Math.round(n).toLocaleString(),fmtR=n=>n.toFixed(2)+'%';let passed=0;for(const key of ['maricopa','pima','pinal']){ACTIVE_COUNTY=key;const h=buildHomesteadGuide({price:350000,ty1:200,ty2:200,br:7,wr:8,dpct:3,loan:339500,bp:100});if(!h.includes('50% of the applicable primary school rate')||!h.includes('$600 per parcel'))throw Error('Incorrect school tax aid: '+key);if(h.includes('up to 40% or $600'))throw Error('Outdated AZ credit: '+key);passed++}return passed;";
assert.equal(new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)(),3);
console.log('PASS: Arizona 50% school tax aid and $600 statutory cap in all 3 covered areas.');
