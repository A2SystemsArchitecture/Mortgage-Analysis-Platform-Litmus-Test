// End-to-end PDF output reconciliation against TWO actual 2026 Gwinnett issued tax notices.
// SOURCE: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf
// SOURCE: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R6174%20203.pdf
// NOT proof that the seller's exemptions, value offset, or special fees transfer to a buyer.
'use strict';
// Market activation (spec 2026-11-27): this test checks an ACTIVE market's math; activation itself is covered by hometrue-market-activation.js.
globalThis.marketActiveGuard=()=>true;globalThis.isMarketActive=()=>true;globalThis.showMarketComingSoon=()=>'';globalThis.hideMarketComingSoon=()=>{};
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {jsPDF}=require('jspdf');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const x=html.indexOf('const COUNTIES = {'),y=html.indexOf('\n};',x)+3;
const p=html.indexOf('function buildPDF('),q=html.indexOf('function showTierPicker(',p);
assert.ok(x>=0&&y>x&&p>=0&&q>p,'Cannot isolate report code');
const COUNTIES=new Function(html.slice(x,y)+'\nreturn COUNTIES;')();
const outdir=path.resolve(__dirname,'../audit-results/pdf-real-bill');
fs.mkdirSync(outdir,{recursive:true});
let saved=[];
function AuditedPDF(options){
 const doc=new jsPDF(options);
 const prior=doc.text.bind(doc);
 const drawn=[];
 doc.text=function(val,...args) {
  if(typeof val==='string')drawn.push(val);
  else if(Array.isArray(val))drawn.push(...val.map(String));
  return prior(val,...args);
 };
 doc.save=function(filename){
  const bytes=Buffer.from(doc.output('arraybuffer'));
  assert.ok(bytes.subarray(0,5).equals(Buffer.from('%PDF-')));
  assert.equal(doc.internal.getNumberOfPages(),3);
  assert.ok(bytes.length>4000);
  fs.writeFileSync(path.join(outdir,filename),bytes);
  saved.push({filename,bytes:bytes.length,drawn});
 };
 return doc;
}
const render=new Function('COUNTIES','jsPDF',`
const window={jspdf:{jsPDF}};
const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
const fmtR=n=>n.toFixed(2)+'%';
const fmtAnnualPropertyTax=(n,monthly)=>(n??monthly*12).toLocaleString('en-US',{style:'currency',currency:'USD'});
let ACTIVE_COUNTY='gwinnett';
const MKT={fm:7.28};
`+html.slice(p,q)+`
return (scenario)=>{
  const annual=scenario.total,monthly=annual/12;
  const i={
    countyKey:'gwinnett', districtId:'gwin-uninc',
    tier:1, address:scenario.address, price:scenario.marketValue,
    dpct:20,damt:scenario.marketValue*.2,loan:scenario.marketValue*.8,
    br:6.25,wr:7.25, bpi:2000,wpi:2300,
    annualTax1:annual, annualTax2:annual,
    buyerAnnualTax:annual,ty1:monthly,ty2:monthly,
    hoa:0,bi:250,wi:330,il:'ESTIMATED',ix:false,bp:0,wp:0,
    fb:55,fw:75,ep:0,fld:'x',
    bt:2000+monthly+250+55,wt:2300+monthly+330+75,
    pn:Math.round((2000+monthly+250+55+2300+monthly+330+75)/2/50)*50
  };
  buildPDF(i);
};
`)(COUNTIES,AuditedPDF);
const cases=[
 {address:'Historical 2026 Gwinnett S1R original',marketValue:493200,levy:5085.27,fees:448.22,total:5533.49},
 {address:'Historical 2026 Gwinnett appealed temporary',marketValue:243400,levy:3393.96,fees:387.82,total:3781.78}
];
for(const x of cases){
 assert.equal(Math.round((x.levy+x.fees)*100)/100,x.total,'Official separate non-ad valorem fees must reconcile');
 render(x);
}
assert.equal(saved.length,2);
for(let n=0;n<cases.length;n++){
 const c=cases[n],doc=saved[n];
 assert.ok(doc.drawn.some(t=>t.includes('Buyer-entered projection')),'PDF buyer-entered annual source label');
 assert.ok(doc.drawn.some(t=>t.includes('tax year 2026')),'PDF preserves rate source year');
 assert.ok(doc.drawn.some(t=>t.includes('Year 2+')),'PDF shows two-year planning semantics');
 assert.ok(doc.drawn.some(t=>t.includes('$'+Math.round(c.total/12).toLocaleString('en-US'))),'PDF renders actual billed tax monthly component');
 assert.ok(doc.drawn.some(t=>t.includes(c.total.toLocaleString('en-US',{style:'currency',currency:'USD'}))),'PDF prints unrounded billed annual tax');
 assert.ok(doc.drawn.some(t=>t.includes('Attorney review pending')),'PDF must not suggest legal certification');
}
console.log(JSON.stringify({realSourceBills:2,financiallyReconciledPdfReports:2,pages:6,files:saved.map(x=>({filename:x.filename,bytes:x.bytes})),disclaimer:'Historical bills; no prospective buyer exemption eligibility established.'}));
