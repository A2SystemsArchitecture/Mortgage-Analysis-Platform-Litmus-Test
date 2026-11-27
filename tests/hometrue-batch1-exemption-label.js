// Exemption display (spec 2026-11-26, attorney-approved wording).
// Checks the live helper code against all 31 Batch 1 markets:
// - the label text matches the attorney-approved wording exactly
// - the label appears for every Batch 1 market and links to that market's paUrl
// - the South Carolina credit note appears in the 6 SC markets only
// - the label is wired into the three analysis tables, the affordability result and both PDF scenario pages
// - the label is suppressed when the buyer enters their own tax projection
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');

const cStart=src.indexOf('const COUNTIES = {');
const cEnd=src.indexOf('\n};',cStart)+3;
assert.ok(cStart>=0&&cEnd>cStart,'COUNTIES found');
const hStart=src.indexOf('// Exemption display (spec 2026-11-26');
const hEnd=src.indexOf('function fmtR(',hStart);
assert.ok(hStart>=0&&hEnd>hStart,'Exemption helpers found');

const load=active=>new Function(src.slice(cStart,cEnd)+'\nlet ACTIVE_COUNTY='+JSON.stringify(active)+';\n'+src.slice(hStart,hEnd)+
 '\nreturn {COUNTIES,exemptionLabelApplies,exemptionLabelText,exemptionNoteHtml,SC_CREDIT_NOTE_TEXT};')();

const APPROVED_PREFIX='Estimated property tax before homestead and other exemptions. If you qualify and apply, your bill may be lower, usually starting the tax year after you own and live in the home. Check eligibility with the ';
const APPROVED_SC='Some South Carolina counties apply a local option sales tax credit to owner-occupied homes. This estimate does not include it.';

const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const ids=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)"/gm)].map(x=>x[1]);
assert.equal(ids.length,31,'31 Batch 1 markets');

let labels=0,scNotes=0;
for(const id of ids){
  const h=load(id);
  const c=h.COUNTIES[id];
  assert.ok(c,'market config '+id);
  assert.equal(h.exemptionLabelApplies(),true,'label applies '+id);
  const office=c.name+' '+(c.state==='fl'?'Property Appraiser':'Tax Assessor');
  assert.equal(h.exemptionLabelText(),APPROVED_PREFIX+office+'.','approved label text '+id);
  assert.ok(c.paUrl&&/^https:\/\//.test(c.paUrl),'county exemption link exists '+id);
  const html=h.exemptionNoteHtml();
  assert.ok(html.includes(APPROVED_PREFIX),'label html text '+id);
  assert.ok(html.includes(`<a href="${c.paUrl}" target="_blank" rel="noopener">${office}</a>`),'county link '+id);
  labels++;
  const hasSc=html.includes(APPROVED_SC);
  assert.equal(hasSc,c.state==='sc','SC note only in SC markets '+id);
  if(hasSc) scNotes++;
}
assert.equal(h0SC(),APPROVED_SC,'SC text matches approved wording');
function h0SC(){return load(ids[0]).SC_CREDIT_NOTE_TEXT;}
assert.equal(labels,31,'label in all 31 markets');
assert.equal(scNotes,6,'SC note in exactly 6 markets');

// Out-of-scope state stays unlabeled (spec limits the label to the 31 Batch 1 markets).
const nonBatch=Object.entries(load(ids[0]).COUNTIES).find(([,c])=>!['fl','ga','sc','al'].includes(c.state));
if(nonBatch){ const h=load(nonBatch[0]); assert.equal(h.exemptionNoteHtml(),'','no label outside Batch 1 states: '+nonBatch[0]); }

// Wiring: three analysis tables, affordability, two PDF pages; suppressed for buyer-entered tax.
assert.equal((src.match(/\$\{i\.buyerAnnualTax == null \? exemptionNoteHtml\(i\.countyKey\) : ''\}/g)||[]).length,3,'analysis tables wired (3)');
assert.ok(src.includes('<div id="aff-exemption-note"></div>'),'affordability container');
assert.ok(src.includes("affExemptionNote.innerHTML = priceMid ? exemptionNoteHtml() : '';"),'affordability wired');
assert.equal((src.match(/y = addExemptionLabelPdf\(doc, inp, y/g)||[]).length,2,'PDF pages wired (2)');
assert.ok(src.includes('if (inp.buyerAnnualTax != null || !exemptionLabelApplies(key)) return y;'),'PDF label suppressed for buyer-entered tax');

console.log(JSON.stringify({markets:labels,scNotes,analysisTables:3,pdfPages:2,affordability:true,pass:true,scope:'live helper source + wiring; not a browser render'}));
