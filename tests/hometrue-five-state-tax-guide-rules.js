// Source-checked HomeTrue guide assertions:
// https://ksrevenue.gov/perstaxtypeshs.html
// https://tax.idaho.gov/taxes/property/homeowners/exemption/
// https://dor.mo.gov/faq/taxation/individual/property-tax-credit-claim.html
// https://finance.delaware.gov/senior-relief/
// https://dor.sc.gov/property/homestead-exemption
// Run: node tests/hometrue-five-state-tax-guide-rules.js
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildHomesteadGuide(inp)'),d=html.indexOf('function refreshHomesteadGuide()',c);
assert(a>=0&&b>a&&c>0&&d>c);
const body="let ACTIVE_COUNTY='johnson-ks',MKT={tr:.01,he:0},S={tier:3},document={getElementById:()=>null},fmt=n=>'$'+Math.round(n).toLocaleString(),fmtR=n=>n.toFixed(2)+'%';const cases=[['johnson-ks',['up to $700','more than $350,000','K-40SVR'],['The refund is applied against your state income tax']],['ada-id',['capped at $125,000','not a certified calculation','last business day'],['saving you approximately $675']],['jackson-mo',['MO-PTS','MO-PTC','$30,000','$34,000'],['File Form MO-PTC with your Missouri state income tax return']],['new-castle-de',['up to $500','April 30','Sussex County'],['$15,000 single or $19,000 married']],['richland',['school operating','4% assessment ratio','county assessor'],['Form PT-1000']]];let pass=0;for(const [key,required,forbidden] of cases){ACTIVE_COUNTY=key;if(!COUNTIES[key])throw Error('Missing '+key);const out=buildHomesteadGuide({price:400000,ty1:200,ty2:200,br:7,wr:8,dpct:3,loan:388000,bp:100});for(let x of required)if(!out.includes(x))throw Error(key+' missing official term '+x);for(let x of forbidden)if(out.includes(x))throw Error(key+' unsupported old claim '+x);pass++;}return pass;";
const passed=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(passed,5);
console.log('PASS: 5 state tax guide rules match primary government evidence and exclude contradicted claims.');
