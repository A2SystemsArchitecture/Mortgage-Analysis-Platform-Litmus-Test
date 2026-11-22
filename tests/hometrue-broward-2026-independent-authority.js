// Independent 2026 adopted Broward district rate comparison.
// Primary authority: https://bcpa.net/millage.asp (BCPA official 2026 municipal millage-code table)
// This proves these 11 code->rate mappings only. Parcel matching, exemption and separate assessments remain open.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start)+3;
assert.ok(start>=0&&end>start,'COUNTIES present');
const counties=new Function(html.slice(start,end)+'\nreturn COUNTIES;')();
const districts=counties.broward.districts;
const expected={
 'bro-uninc-0012':["0012",19.0149], 'bro-uninc-0013':["0013",17.8563],
 'bro-ftlaud-0311':["0311",18.5338], 'bro-ftlaud-0312':["0312",18.4026],
 'bro-ftlaud-9312':["9312",19.3865],
 'bro-hollywood-0512':["0512",21.9985], 'bro-hollywood-0513':["0513",20.8399],
 'bro-pembroke':["2613",18.8228], 'bro-miramar':["2713",20.0203],
 'bro-weston-3312':["3312",17.5663], 'bro-weston-3313':["3313",16.4077]
};
for(const [id,[code,mills]] of Object.entries(expected)){
 const rows=districts.filter(d=>d.id===id);
 assert.equal(rows.length,1,'Exactly one rate for '+id);
 const d=rows[0];
 assert.ok(d.label.includes(code),'Broward code mismatch: '+id);
 assert.equal(d.taxYear,'2026','Wrong source year '+id);
 assert.ok(Math.abs(d.tr-mills/1000)<1e-12,'BCPA source mismatch '+id);
 const price=400000;
 assert.ok(Math.abs(price*d.tr-(price*mills/1000))<1e-8,'Fictional 400K PRE-exemption calculation '+id);
}
const unknown=districts.filter(d=>d.label.includes('code unknown'));
assert.equal(unknown.length,4,'Preserve distinct unverified planning options; they are not certified 2026 rows');
for(const d of unknown)assert.ok(!d.taxYear,'Unknown-code rate must not be misrepresented as source-year verified');
console.log(JSON.stringify({officialSource:'https://bcpa.net/millage.asp',taxYear:'2026',codeRatesChecked:11,unknownCodeOptions:4,parcelAndNetTaxCertified:false,passed:true}));
