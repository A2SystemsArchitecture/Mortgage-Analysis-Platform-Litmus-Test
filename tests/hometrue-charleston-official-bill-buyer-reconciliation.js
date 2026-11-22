// Official 2026 Charleston Auditor published real-property illustration, buyer-flow reconciliation.
// Authority: https://www.charlestoncounty.gov/departments/auditor/files/archived/2026-millage-card.pdf
// City Charleston TD 34/35/36/52/63/71/72/99, approved 4% legal residence only.
// Example is not a valid estimate for another address or unapproved buyer.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function parseBuyerAnnualTax('),d=html.indexOf('function cPI(',c);
const e=d,f=html.indexOf('function bG3()',e);
assert.ok(a>=0&&b>a&&c>=0&&d>c&&f>e);
const COUNTIES=new Function(html.slice(a,b)+'\nreturn COUNTIES;')();
const city=COUNTIES['charleston-sc'].districts.find(x=>x.id==='cha-city-2026-legal4');
assert.ok(city&&city.taxYear==='2026');
// These are the exact values printed by the Charleston County Auditor.
const value=200000, assessed=value*0.04;
const gross=assessed*300.8/1000;
const schoolOperatingRelief=assessed*145.2/1000;
const countyCredit=value*0.00090;
const cityCredit=value*0.00083;
const solidWaste=154;
const trueBill=gross-schoolOperatingRelief-countyCredit-cityCredit+solidWaste;
assert.ok(Math.abs(gross-2406.40)<0.00001);
assert.ok(Math.abs(schoolOperatingRelief-1161.60)<0.00001);
assert.ok(Math.abs(countyCredit-180)<0.00001);
assert.ok(Math.abs(cityCredit-166)<0.00001);
assert.ok(Math.abs(trueBill-1052.80)<0.00001);
assert.ok(Math.abs(city.tr*value-1244.80)<0.00001);
const buyerSource=`
let ACTIVE_COUNTY='charleston-sc', ACTIVE_DISTRICT=COUNTIES['charleston-sc'].districts.find(d=>d.id==='cha-city-2026-legal4');
const MKT={tr:ACTIVE_DISTRICT.tr,br:7.03,wr:7.67,fxb:25,fxw:45,fab:55,faw:130};
const S={tier:1,inp:{}},S2=null;
const fields={fp:200000,fd:20,fa:'Auditor official hypothetical (not a real buyer)',fb2:2020,fry:2020,fil:10000,fih:13000,fh:0,ffl:'x',fpr:'no',fcr:'excellent',fcon:'cbs',frt:'asphalt',fsh:'no','f-annual-buyer-tax':'1052.80'};
const document={getElementById:id=>({value:String(fields[id]??'')})};
`+html.slice(c,f)+`
collectInp();
return S.inp;`;
const inp=new Function('COUNTIES',buyerSource)(COUNTIES);
assert.equal(inp.buyerAnnualTax,1052.80);
assert.ok(Math.abs(inp.annualTax1-trueBill)<0.00001);
assert.ok(Math.abs(inp.annualTax2-trueBill)<0.00001);
assert.ok(Math.abs(inp.ty1-trueBill/12)<0.00001);
assert.ok(Math.abs(inp.bt-(inp.bpi+inp.ty1+inp.hoa+inp.bi+inp.bp+inp.fb))<0.001);
assert.ok(Math.abs(inp.wt-(inp.wpi+inp.ty1+inp.hoa+inp.wi+inp.wp+inp.fw+inp.ep))<0.001);
console.log(JSON.stringify({officialAnnualBill:trueBill,preCreditPlanning:city.tr*value,discrepancy:(city.tr*value)-trueBill,monthlyTax:inp.ty1,buyerPath:'official projection manually entered',scope:'2026 Charleston approved 4% TD city example only',passed:true}));
