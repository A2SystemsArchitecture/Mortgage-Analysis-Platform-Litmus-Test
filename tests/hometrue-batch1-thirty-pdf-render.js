// Generate real PDF smoke fixtures for all 30 Batch 1 markets except Dorchester.
// Run after: npm install --no-save --ignore-scripts jspdf@2.5.1
// These are fictional planning outputs, not verified property-specific bills.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {jsPDF}=require('jspdf');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const x=html.indexOf('const COUNTIES = {'),y=html.indexOf('\n};',x)+3;
const p=html.indexOf('function buildPDF('),q=html.indexOf('function showTierPicker(',p);
assert.ok(x>=0&&y>x&&p>=0&&q>p,'Cannot isolate buyer report generator');
const COUNTIES=new Function(html.slice(x,y)+'\nreturn COUNTIES;')();
const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const markets=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)","([^"]+)"/gm)]
 .filter(m=>m[1]!=='dorchester-sc')
 .map(m=>({key:m[1],state:m[2],name:m[3]}));
assert.equal(markets.length,30,'Unexpected 30-market roster');
const outdir=path.resolve(__dirname,'../audit-results/pdf-thirty');
fs.mkdirSync(outdir,{recursive:true});
const saved=[];
const originalSave=jsPDF.prototype.save;
jsPDF.prototype.save=function(filename) {
 const bytes=Buffer.from(this.output('arraybuffer'));
 assert.ok(bytes.subarray(0,5).equals(Buffer.from('%PDF-')),'Bad PDF header');
 assert.equal(this.internal.getNumberOfPages(),3,'Expected three report pages');
 assert.ok(bytes.length>4000,'PDF too small');
 const outfile=path.join(outdir,filename);
 fs.writeFileSync(outfile,bytes);
 saved.push({filename,bytes:bytes.length});
};
try{
 const fixture=new Function('COUNTIES','jsPDF',`
  const window={jspdf:{jsPDF}};
  const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
  const fmtR=r=>r.toFixed(2)+'%';
  const fmtAnnualPropertyTax=(n,monthly)=>(n??monthly*12).toLocaleString('en-US',{style:'currency',currency:'USD'});
  let ACTIVE_COUNTY='',MKT={rv:'Fictional mortgage-rate benchmark; no parcel tax verification'};
  `+html.slice(p,q)+`
  return (key,name) => {
    ACTIVE_COUNTY=key;
    const county=COUNTIES[key];
    if(!county)throw Error('Unknown county '+key);
    const price=400000,loan=320000,taxRate=county.tr,annualTax=price*taxRate;
    const tax=annualTax/12;
    const input={
      tier:1,address:'Fictional '+name+' Example',price,dpct:20,damt:80000,loan,
      br:6.25,wr:7.25,bpi:1970.69,wpi:2183.04,
      annualTax1:annualTax,annualTax2:annualTax,buyerAnnualTax:null,ty1:tax,ty2:tax,
      hoa:0,bi:250,wi:330,il:'ESTIMATED',ix:false,bp:0,wp:0,fb:55,fw:75,ep:0,
      fld:'x',bt:1970.69+tax+250+55,wt:2183.04+tax+330+75,pn:2550
    };
    buildPDF(input);
  };`)(COUNTIES,jsPDF);
 for(const market of markets)fixture(market.key,market.name);
}finally{jsPDF.prototype.save=originalSave;}
assert.equal(saved.length,30,'Missing PDF reports');
console.log(JSON.stringify({scope:'30 fictional PDF smoke samples; excludes Dorchester',success:saved.length,totalBytes:saved.reduce((n,x)=>n+x.bytes,0)},null,2));
