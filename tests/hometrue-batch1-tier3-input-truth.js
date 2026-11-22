// Financial disclosure truthfulness in Tier 3. Tests actual buyer input and confirmation code.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const countiesStart=html.indexOf('const COUNTIES = {'),countiesEnd=html.indexOf('\n};',countiesStart)+3;
const parseStart=html.indexOf('function parseBuyerAnnualTax('),collectStart=html.indexOf('function collectInp(');
const helpersEnd=html.indexOf('function bG3()',collectStart),summaryEnd=html.indexOf('function updG3()',helpersEnd);
assert.ok(countiesStart>=0&&countiesEnd>countiesStart&&parseStart>=0&&summaryEnd>helpersEnd);
const COUNTIES=new Function(html.slice(countiesStart,countiesEnd)+'\nreturn COUNTIES;')();
const test=new Function('COUNTIES',`
const S={tier:3,inp:{},ins:null}, S2=null, MKT={tr:0.015,br:7.03,wr:7.67,fxb:42,fxw:85,fab:150,faw:400,rv:'Verified national benchmark',ov:'Local planning only'};
let ACTIVE_COUNTY='miami-dade',ACTIVE_DISTRICT=null;
const fields={}, output={innerHTML:''};
const document={getElementById:id=>id==='g3c'?output:({value:String(fields[id]??'')})};
`+html.slice(parseStart,helpersEnd)+html.slice(helpersEnd,summaryEnd)+`
return (quote,rate,buyerTax,down=5)=>{
  S.tier=3;S.ins=null;ACTIVE_DISTRICT=null;
  Object.assign(fields,{fp:350000,fd:down,fil:10000,fih:12000,fb2:2020,fry:2020,fcon:'cbs',frt:'asphalt',
    fsh:'no',fh:100,ffl:'x',fpr:'no',fcr:'good',fa:'Fictional Property',
    fit3:quote,flr:rate,fcp:'', 'f-annual-buyer-tax':buyerTax});
  collectInp(); bG3();
  return {inp:{...S.inp},disclosure:output.innerHTML};
};`)(COUNTIES);
const missing=test('', '', '');
assert.equal(missing.inp.ic,false,'Default 285 should not be confirmed');
assert.equal(missing.inp.il,'ESTIMATED');
assert.equal(missing.inp.bi,285);
assert.equal(missing.inp.lockedRateConfirmed,false);
assert.match(missing.disclosure,/Property Tax: Unverified planning estimate/);
assert.match(missing.disclosure,/Property Tax District: Not verified/);
assert.match(missing.disclosure,/Mortgage Rate: Planning benchmark/);
assert.match(missing.disclosure,/Homeowners Insurance: Estimated/);
assert.match(missing.disclosure,/PMI: Estimated range/);
assert.doesNotMatch(missing.disclosure,/All inputs confirmed/i);
const quoted=test('312.50','6.35','',20);
assert.equal(quoted.inp.ic,true);
assert.equal(quoted.inp.bi,312.50);
assert.equal(quoted.inp.lockedRateConfirmed,true);
assert.ok(!quoted.disclosure.includes('Mortgage Rate: Planning benchmark'));
assert.match(quoted.disclosure,/Property Tax: Unverified planning estimate/);
assert.doesNotMatch(quoted.disclosure,/All inputs confirmed/i);
const entered=test('290','6.35','4800',5);
assert.match(entered.disclosure,/Buyer-entered projection; official parcel assessment/);
assert.equal(entered.inp.buyerAnnualTax,4800);
assert.doesNotMatch(entered.disclosure,/All inputs confirmed/i);
assert.ok(html.includes('Verify Remaining Inputs'));
console.log('PASS: Tier 3 never claims unverified tax or missing quote/locked rate to be confirmed; three real buyer scenarios.');
