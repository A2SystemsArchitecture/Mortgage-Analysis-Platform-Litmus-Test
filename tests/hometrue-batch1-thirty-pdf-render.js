// Generate real PDF smoke fixtures for all 31 Batch 1 markets (including Dorchester since 2026-11-25) at five down payments.
// Run after: npm install --no-save --ignore-scripts jspdf@2.5.1
// These are fictional planning outputs, not verified property-specific bills.
'use strict';
// Market activation (spec 2026-11-27): this test checks an ACTIVE market's math; activation itself is covered by hometrue-market-activation.js.
globalThis.marketActiveGuard=()=>true;globalThis.isMarketActive=()=>true;globalThis.showMarketComingSoon=()=>'';globalThis.hideMarketComingSoon=()=>{};
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {jsPDF}=require('jspdf');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const x=html.indexOf('const COUNTIES = {'),y=html.indexOf('\n};',x)+3;
const p=html.indexOf('function buildPDF('),q=html.indexOf('function showTierPicker(',p);
assert.ok(x>=0&&y>x&&p>=0&&q>p,'Cannot isolate buyer report generator');
// Live exemption-label helpers (spec 2026-11-26) so the PDF renders the approved label.
const eh=html.indexOf('// Exemption display (spec 2026-11-26'),ee=html.indexOf('function fmtR(',eh);
assert.ok(eh>=0&&ee>eh,'Cannot isolate exemption label helpers');
const COUNTIES=new Function(html.slice(x,y)+'\nreturn COUNTIES;')();
const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const markets=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)","([^"]+)"/gm)]
 .map(m=>({key:m[1],state:m[2],name:m[3]}));
assert.equal(markets.length,31,'Unexpected 31-market roster');
assert.ok(markets.some(m=>m.key==='dorchester-sc'),'Dorchester must be included');
const outdir=path.resolve(__dirname,'../audit-results/pdf-thirty');
fs.mkdirSync(outdir,{recursive:true});
const saved=[];
let currentKey='',labelled=0,scLabelled=0;
const filenames=new Set();
// jsPDF defines save on the document instance rather than on its prototype.
function TrackingJsPDF(options) {
 const doc=new jsPDF(options);
 doc.save=function(filename) {
  const bytes=Buffer.from(doc.output('arraybuffer'));
  const text=bytes.toString('latin1');
  assert.ok(text.includes('Estimated property tax before homestead and other exemptions.'),'Exemption label missing '+filename);
  const sc=text.includes('Some South Carolina counties apply a local option sales tax credit');
  assert.equal(sc,/-sc-|richland|greenville-sc|york-sc|berkeley-sc|dorchester-sc|charleston-sc/i.test(currentKey),'SC note scope '+filename);
  labelled++; if(sc) scLabelled++;
  assert.ok(bytes.subarray(0,5).equals(Buffer.from('%PDF-')),'Bad PDF header');
  assert.equal(doc.internal.getNumberOfPages(),3,'Expected three report pages');
  assert.ok(bytes.length>4000,'PDF too small');
  assert.ok(!filenames.has(filename),'Duplicate PDF filename '+filename);
  filenames.add(filename);
  const outfile=path.join(outdir,filename);
  fs.writeFileSync(outfile,bytes);
  saved.push({filename,bytes:bytes.length});
 };
 return doc;
}
{
 const fixture=new Function('COUNTIES','jsPDF',`
  const window={jspdf:{jsPDF}};
  const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
  const fmtR=r=>r.toFixed(2)+'%';
  const fmtAnnualPropertyTax=(n,monthly)=>(n??monthly*12).toLocaleString('en-US',{style:'currency',currency:'USD'});
  let ACTIVE_COUNTY='',MKT={fm:7.28,rv:'Fictional mortgage-rate benchmark; no parcel tax verification'};
  `+html.slice(eh,ee)+`
  `+html.slice(p,q)+`
  return (key,name,down) => {
    ACTIVE_COUNTY=key;
    const county=COUNTIES[key];
    if(!county)throw Error('Unknown county '+key);
    const price=400000,damt=price*down/100,loan=price-damt,taxRate=county.tr,annualTax=price*taxRate;
    const pi=r=>Math.round(loan*(r/1200)/(1-Math.pow(1+r/1200,-360)));
    const bpi=pi(6.25),wpi=pi(7.25),bp=down<20?Math.round(loan*.003/12):0,wp=down<20?Math.round(loan*.005/12):0,ep=down<20?Math.round(loan*.002/12):0;
    const tax=annualTax/12;
    const bt=bpi+tax+55+bp,wt=wpi+tax+75+wp+ep;
    const input={
      tier:1,address:'DP'+down+' '+key+' Fictional',price,dpct:down,damt,loan,countyKey:key,
      br:6.25,wr:7.25,bpi,wpi,
      annualTax1:annualTax,annualTax2:annualTax,buyerAnnualTax:null,ty1:tax,ty2:tax,
      hoa:0,bi:0,wi:0,il:'EXCLUDED',ix:true,bp,wp,fb:55,fw:75,ep,
      fld:'x',bt,wt,pn:Math.round((bt+wt)/2/50)*50
    };
    buildPDF(input);
  };`)(COUNTIES,TrackingJsPDF);
 for(const market of markets)for(const down of [3,3.5,5,10,20]){currentKey=market.key;fixture(market.key,market.name,down);}
}
assert.equal(saved.length,155,'Missing PDF reports');
assert.equal(labelled,155,'Exemption label on every PDF');
assert.equal(scLabelled,30,'SC note on 6 SC markets x 5 down payments');
console.log(JSON.stringify({scope:'155 fictional PDF smoke samples; 31 markets including Dorchester',success:saved.length,exemptionLabelled:labelled,scNoteLabelled:scLabelled,totalBytes:saved.reduce((n,x)=>n+x.bytes,0)},null,2));
