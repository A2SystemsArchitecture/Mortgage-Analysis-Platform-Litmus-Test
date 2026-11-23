// Source-year provenance must survive into buyer PDFs for fiscal-year districts.
// Four Berkeley FY 2026/27 choices use taxPeriod rather than taxYear.
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const src=fs.readFileSync(path.resolve(__dirname,'../platform.html'),'utf8');
const start=src.indexOf("  'berkeley-sc': {");
const end=src.indexOf("\n  'dorchester-sc': {",start);
assert.ok(start>0 && end>start,'Berkeley district configuration missing');
const block=src.slice(start,end);
const ids=[
 'ber-standard-2026-legal4',
 'ber-standard-2026-other6',
 'ber-goosecreek-18-2026-legal4',
 'ber-goosecreek-18-2026-other6'
];
for(const id of ids){
 const line=block.split('\n').find(x=>x.includes("id:'"+id+"'"));
 assert.ok(line,'Missing district: '+id);
 assert.ok(line.includes("taxPeriod:'FY 2026/27'"),'Incorrect fiscal period: '+id);
 assert.ok(!line.includes('taxYear:'),'Fiscal period falsely reported as calendar tax year: '+id);
}
const pdfStart=src.indexOf('function buildPDF(');
const pdfEnd=src.indexOf('function showTierPicker(',pdfStart);
assert.ok(pdfStart>=0 && pdfEnd>pdfStart,'PDF source boundaries missing');
const pdf=src.slice(pdfStart,pdfEnd);
assert.match(pdf,/taxDistrict\?\.taxYear\s*\?\s*'tax year '\s*\+\s*taxDistrict\.taxYear\s*:\s*taxDistrict\?\.taxPeriod\s*\?\s*taxDistrict\.taxPeriod/, 'PDF must accept actual source tax period');
assert.match(pdf,/Property tax source period:/,'PDF tax source field omitted');
assert.doesNotMatch(pdf,/Property tax source year: \$\{sourceTaxYear\}/,'Obsolete calendar-only footer reintroduced');
const cases=[
 [{taxYear:'2026'},'tax year 2026'],
 [{taxPeriod:'FY 2026/27'},'FY 2026/27'],
 [{},'not verified']
];
for(const [district,expected] of cases){
 // Evaluate the exact PDF ternary in isolation with synthetic district options.
 const expression=pdf.match(/const sourceTaxPeriod = ([^\n]+);/);
 assert.ok(expression,'PDF tax provenance expression missing');
 const actual=Function('taxDistrict','return '+expression[1])(district);
 assert.equal(actual,expected);
}
console.log('PASS: Berkeley four fiscal-year rates remain fiscal; PDF source period preserves calendar, fiscal and unknown provenance.');
