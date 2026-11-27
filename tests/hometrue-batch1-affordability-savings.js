// Executes the actual affordability UI calculation for three down-payment choices.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=src.indexOf('function calcAffordability()');
const end=src.indexOf('\nfunction affToAnalysis()',start);
assert.ok(start>=0&&end>start,'Live affordability calculation found');
const fn=src.slice(start,end);
const run=new Function('dpPct','savings',`
 const input={'aff-il':'10000','aff-ih':'13000','aff-sv':String(savings),'aff-db':'0','aff-cr':'excellent','aff-dp':String(dpPct)};
 const nodes={};
 const document={getElementById(id){if(!nodes[id])nodes[id]={value:input[id]||'',textContent:'',innerHTML:'',disabled:false,style:{},scrollIntoView(){}};return nodes[id];}};
 const MKT={tr:0.014,fm:7.28},RATE_RANGES={excellent:{min:7,max:7.5}};
 const S={affResult:null,affPrefill:null};
 const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
 const batch1NeedsVerifiedTaxBasis=()=>false;
 const exemptionNoteHtml=()=>''; // exemption label covered by hometrue-batch1-exemption-label.js
 ${fn}
 calcAffordability();
 return {price:S.affResult?.priceMid,down:S.affResult?.dpPct,text:nodes['aff-savings-wrap'].innerHTML};
`);
for(const dp of [3,5,20]){
 const low=run(dp,1000),high=run(dp,200000);
 assert.ok(low.price>0&&high.price>0);
 assert.equal(low.price,high.price);
 assert.equal(high.down,dp);
 assert.ok(low.text.includes(dp+'% down'),'Savings explanation must honor '+dp+'% down');
 assert.match(low.text,/Your savings fall below these planning assumptions/);
 assert.match(high.text,/Your savings meet these planning assumptions/);
 const reserveText='selected down payment + assumed 3.5% closing costs + 3-month reserve';
 assert.ok(high.text.includes(reserveText));
}
// The previous bug understated the capital required for buyers choosing 20% down.
const for20=run(20,40000);
assert.match(for20.text,/Your savings fall below these planning assumptions/);
console.log('PASS: affordability savings use selected 3%, 5%, 20% down payment and disclose assumptions');
