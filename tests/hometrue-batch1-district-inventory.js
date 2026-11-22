// Audit evidence inventory for each buyer-selectable tax district in the original 30 markets.
// Tax-year metadata and buyer-option presence are NOT certification of a levy or parcel match.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'platform.html'),'utf8');
const start=html.indexOf('const COUNTIES = {'),end=html.indexOf('\n};',start)+3;
assert.ok(start>=0&&end>start,'County source block must exist');
const COUNTIES=new Function(html.slice(start,end)+'\nreturn COUNTIES;')();
const markets=Object.entries(COUNTIES).filter(([key,c])=>['fl','ga','al','sc'].includes(c.state)&&key!=='dorchester-sc');
assert.equal(markets.length,30,'The included Batch 1 market count must be 30');
const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const header=['market_id','state','district_id','district_label','tax_year','tax_period','legacy_only','effective_purchase_price_rate','year_metadata_present','official_primary_source_independently_verified','parcel_boundary_and_eligibility_verified'];
const rows=[];
for(const [key,c] of markets){
  assert.ok(Number.isFinite(c.tr),'County planning factor missing '+key);
  const options=(c.districts||[]).filter(d=>!d.legacyOnly);
  for(const d of options){
    assert.ok(Number.isFinite(d.tr)&&d.tr>=0,'Invalid district planning factor '+key+'/'+d.id);
    rows.push([key,c.state,d.id,d.label,d.taxYear||'',d.taxPeriod||'',String(!!d.legacyOnly),d.tr,String(!!(d.taxYear||d.taxPeriod)),'NOT independently evaluated by this inventory','NOT independently evaluated by this inventory']);
  }
  if(!options.length)rows.push([key,c.state,'','NO BUYER-SELECTABLE RATE','','',false,c.tr,false,'NOT verified','NOT verified']);
}
fs.mkdirSync(path.join(root,'audit-results'),{recursive:true});
const dest=path.join(root,'audit-results','batch1-district-inventory.csv');
fs.writeFileSync(dest,[header,...rows].map(x=>x.map(esc).join(',')).join('\n')+'\n');
console.log(JSON.stringify({includedMarkets:markets.length,selectableOptions:rows.filter(r=>r[2]).length,marketsWithoutOptions:rows.filter(r=>!r[2]).map(r=>r[0]),optionsWithoutTaxYearMetadata:rows.filter(r=>r[2]&&!r[4]&&!r[5]).length,output:'audit-results/batch1-district-inventory.csv',certification:'NOT PERFORMED'},null,2));
