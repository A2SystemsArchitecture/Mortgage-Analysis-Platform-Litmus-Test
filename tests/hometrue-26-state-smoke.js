// HomeTrue state calculation smoke test. Run: node tests/hometrue-26-state-smoke.js
// This checks programmed arithmetic only, not official rates or legal eligibility.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function effectiveMarketValueDeduction('),d=html.indexOf('function bG3()',c);
assert(a>=0&&b>a&&c>0&&d>c,'Could not extract current calculator');
const source=html.slice(a,b)+'\n'+html.slice(c,d);
const body="\nlet ACTIVE_COUNTY='miami-dade';\nlet MKT={tr:COUNTIES[ACTIVE_COUNTY].tr,he:COUNTIES[ACTIVE_COUNTY].he,br:6.86,wr:7.5,fxb:0,fxw:0,fab:0,faw:0};\nconst S={tier:1,ins:'b'},S2={};\nlet form={};\nconst document={getElementById:(key)=>({value:form[key]??''})};\nlet checked=0,states=new Set();\nfor(const [key,c] of Object.entries(COUNTIES)){\n states.add(c.state);\n for(const dp of [0,3,20]){\n  ACTIVE_COUNTY=key;Object.assign(MKT,{tr:c.tr,he:c.he,fxb:c.fxb,fxw:c.fxw,fab:c.fab,faw:c.faw});\n  form={fp:'400000',fd:String(dp),fil:'10000',fih:'13000',fb2:'2000',fry:'2016',fcon:'cbs',frt:'asphalt',fsh:'no',fh:'0',ffl:'x',fpr:'yes',fcr:'excellent',fa:'Fictional test address'};\n  collectInp();\n  const i=S.inp;\n  if(i.dpct!==dp)throw Error(key+': down percentage');\n  if(i.damt!==400000*dp/100)throw Error(key+': down dollars');\n  if(i.loan!==400000-i.damt)throw Error(key+': loan amount');\n  if(![i.bt,i.wt,i.ty1,i.ty2].every(Number.isFinite))throw Error(key+': nonfinite');\n  if(i.ty1<0||i.ty2<0)throw Error(key+': negative tax');\n  if(['fl','ga','tx','la'].includes(c.state)&&i.ty1!==i.ty2)throw Error(key+': invalid mixed levy discount');\n  checked++;\n }\n}\nreturn {checked,markets:Object.keys(COUNTIES).length,states:states.size};";
const r=new Function(source+'\n'+body)();
assert.equal(r.markets,124);assert.equal(r.states,26);assert.equal(r.checked,372);
console.log('PASS: '+r.checked+' arithmetic tests across '+r.states+' states and '+r.markets+' markets.');
