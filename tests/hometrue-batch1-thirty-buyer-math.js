// Execute actual buyer input calculator for all 31 Batch 1 markets, including Dorchester (extended 2026-11-25; earlier runs covered 30).
// Fictional scenarios: unconfirmed baseline, explicit tax amount and zero amount.
// Checks arithmetic only; not actual parcel tax eligibility or levies.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const dataStart=html.indexOf('const COUNTIES = {'),dataEnd=html.indexOf('\n};',dataStart)+3;
const parseStart=html.indexOf('function parseBuyerAnnualTax('),parseEnd=html.indexOf('function collectInp(',parseStart);
const calcStart=parseEnd,calcEnd=html.indexOf('function cPI(',calcStart);
const mathStart=calcEnd,mathEnd=html.indexOf('function bG3(',mathStart);
assert.ok(dataStart>=0&&dataEnd>dataStart&&parseStart>=0&&mathStart>calcStart&&mathEnd>mathStart,'Source blocks missing');
const COUNTIES=new Function(html.slice(dataStart,dataEnd)+'\nreturn COUNTIES;')();
const marketCSV=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const roster=[...marketCSV.matchAll(/^"([^"]+)","(FL|GA|AL|SC)"/gm)].map(x=>x[1]);
assert.equal(roster.length,31);
assert.ok(roster.includes('dorchester-sc'),'Dorchester must be included');
const harness=new Function('COUNTIES',`
const S={tier:1,inp:{}}, S2=null, MKT={tr:0,br:7.03,wr:7.67,fxb:42,fxw:85,fab:150,faw:400};
let ACTIVE_COUNTY='', ACTIVE_DISTRICT=null;
const fields={};
const document={getElementById:id=>({value:''+ (fields[id]??'')})};
`+html.slice(parseStart,parseEnd)+html.slice(calcStart,calcEnd)+html.slice(mathStart,mathEnd)+`
return (key,price,overridden,monthlyHoa=0,down=20)=>{
  ACTIVE_COUNTY=key; MKT.tr=COUNTIES[key].tr;
  // A named district must be explicitly selected; we use county-only factor here.
  ACTIVE_DISTRICT=null;
  Object.assign(fields,{fp:price,fd:down,fil:10000,fih:13000,fb2:2020,fry:2020,
    fcon:'cbs',frt:'asphalt',fsh:'no',fh:monthlyHoa,ffl:'x',fpr:'no',fcr:'excellent',fa:'Fictional '+key,
    'f-annual-buyer-tax':overridden===null?'':String(overridden)});
  collectInp();
  return {...S.inp};
};`)(COUNTIES);
let runs=0;
for(const key of roster){
 for(const down of [3,3.5,5,10,20]) for(const [price,override] of [[300000,null],[575000,1052.80],[400000,0]]){
   const got=harness(key,price,override,0,down);
   const loan=price*(1-down/100);
   const payment=(rate)=>Math.round(loan*(rate/1200)/(1-Math.pow(1+rate/1200,-360)));
   assert.equal(got.dpct,down,key+' down percentage');
   assert.ok(Math.abs(got.loan-loan)<0.001,key+' loan');
   assert.equal(got.bpi,payment(7.03),key+' best P&I');
   assert.equal(got.wpi,payment(7.67),key+' worst P&I');
   assert.equal(got.bp,down<20?Math.round(loan*.003/12):0,key+' best PMI estimate');
   assert.equal(got.wp,down<20?Math.round(loan*.005/12):0,key+' worst PMI estimate');
   const expected=override===null?price*COUNTIES[key].tr:override;
   assert.ok(Math.abs(got.annualTax1-expected)<0.001,key+' annual');
   assert.ok(Math.abs(got.annualTax2-expected)<0.001,key+' annual yr2');
   assert.ok(Math.abs(got.ty1*12-expected)<0.001,key+' monthly');
   assert.ok(Math.abs(got.ty2*12-expected)<0.001,key+' monthly yr2');
   assert.equal(got.districtId,'',key+' district was not explicitly selected');
   assert.equal(got.buyerAnnualTax,override,key+' entered projection');
   assert.ok(Math.abs(got.bt-(got.bpi+got.ty1+got.hoa+got.bi+got.bp+got.fb))<0.0001,key+' best');
   assert.ok(Math.abs(got.wt-(got.wpi+got.ty1+got.hoa+got.wi+got.wp+got.fw+got.ep))<0.0001,key+' worst');
   assert.equal(got.br,7.03,key+' benchmark best');
   assert.equal(got.wr,7.67,key+' benchmark worst');
   runs++;
 }
}
// Regression: negative or invalid homeowner-association charges must not create
// an artificial credit that understates monthly affordability.
for (const [input,expected] of [[-500,0],['not-a-number',0],[175.25,175.25]]) {
  const got=harness('miami-dade',400000,null,input);
  assert.equal(got.hoa,expected,'HOA input sanitation: '+input);
  assert.ok(Math.abs(got.bt-(got.bpi+got.ty1+got.hoa+got.bi+got.bp+got.fb))<0.0001);
  assert.ok(Math.abs(got.wt-(got.wpi+got.ty1+got.hoa+got.wi+got.wp+got.fw+got.ep))<0.0001);
}
assert.ok(html.includes('November 19, 2026 · 7.28% · Freddie Mac PMMS'));
assert.ok(html.includes('fm:7.28,br:7.03,wr:7.67'));
assert.ok(!html.includes('November 12, 2026 · 7.11%'));
assert.equal(runs,465);
console.log(JSON.stringify({markets:roster.length,buyerCalculationScenarios:runs,benchmark:'2026-11-19:7.28',pass:true}));
