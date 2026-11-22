// Tier 2 buyer-facing insurance status must reflect actual quote evidence.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=src.indexOf('function parseBuyerAnnualTax('),end=src.indexOf('function bG3()',start);
assert.ok(start>=0&&end>start,'Expected buyer financial calculation');
const verify=new Function('quote',`
 const fields={fp:'350000',fd:'20',fil:'10000',fih:'13000',fb2:'2021',fry:'2021',fcon:'cbs',frt:'asphalt',fsh:'no',fh:'0',ffl:'x',fpr:'no',fcr:'good',fa:'Fictional home','f-annual-buyer-tax':'4200',fic:quote};
 const document={getElementById:id=>({value:String(fields[id]??'')})};
 const MKT={tr:0.012,br:7.03,wr:7.67,fxb:30,fxw:60,fab:80,faw:160};
 const S={tier:2,ins:'a',inp:{}},S2=null;
 const ACTIVE_COUNTY='miami-dade',ACTIVE_DISTRICT=null;
 ${src.slice(start,end)}
 collectInp();return {insurance:S.inp.bi,status:S.inp.il,confirmed:S.inp.ic};
`);
for(const bad of ['', '0', '-20', 'bad']){
 const result=verify(bad);
 assert.deepEqual(result,{insurance:285,status:'ESTIMATED',confirmed:false},'Unverified quote: '+bad);
}
assert.deepEqual(verify('312.50'),{insurance:312.5,status:'CONFIRMED',confirmed:true});
console.log('PASS: missing, zero, negative or malformed Tier 2 insurance is estimated, positive quote confirmed.');
