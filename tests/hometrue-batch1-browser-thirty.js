// Headless browser test against the real audit-branch platform.html.
// Fictional inputs only. No network services, checkout, or production deployment.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const html=fs.readFileSync(path.join(__dirname,'../platform.html'),'utf8');
const code=html.match(/if\s*\(\s*pwd\s*!==\s*"([^"]+)"\s*\)/)?.[1];
assert.ok(code,'Cannot locate existing site access-dialog test value');
const csv=fs.readFileSync(path.join(__dirname,'../audits/HomeTrue-2027-launch-verification-gates.csv'),'utf8');
const keys=[...csv.matchAll(/^"([^"]+)","(FL|GA|AL|SC)"/gm)].map(m=>m[1]).filter(key=>key!=='dorchester-sc');
assert.equal(keys.length,30);
const folder=path.resolve(__dirname,'../audit-results/browser-thirty');
fs.mkdirSync(folder,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  page.on('dialog',async d=>{await d.accept(code)});
  const url=pathToFileURL(path.resolve(__dirname,'../platform.html')).href;
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  const check=await page.evaluate(()=>({
   loaded:typeof selectCounty==='function'&&typeof renderDistrictPills==='function',
   counties:typeof COUNTIES!=='undefined'?Object.keys(COUNTIES).length:0
  }));
  assert.ok(check.loaded&&check.counties===124,'Full platform did not initialize');
  let multiple=0,manual=0;
  for(const key of keys){
   const before=await page.evaluate(key=>{
     selectCounty(key);
     const c=COUNTIES[key],choices=(c.districts||[]).filter(d=>!d.legacyOnly);
     return {name:c.name,tr:c.tr,market:MKT.tr,choices:choices.length,selected:ACTIVE_DISTRICT?.id||'',taxDisplay:document.getElementById('planning-district-status')?.textContent||''};
   },key);
   assert.equal(before.selected,'','Automatic district selection: '+key);
   assert.ok(Math.abs(before.tr-before.market)<1e-12,'County fallback mismatch '+key);
   if(before.choices>1){
    multiple++;
    assert.ok(before.taxDisplay.includes('Unconfirmed'),'Missing unconfirmed rate label '+key);
    const chosen=await page.evaluate(()=>{
      const b=document.querySelector('#district-pills .district-pill');
      if(!b)throw Error('Missing selectable district');
      const value=b.textContent;
      b.click();
      return {id:ACTIVE_DISTRICT?.id||'',rate:MKT.tr,name:value};
    });
    assert.ok(chosen.id,'Manual selection failed for '+key);
    manual++;
   }
  }
  await page.evaluate(()=>selectCounty('gwinnett'));
  await page.screenshot({path:path.join(folder,'district-planning-example.png'),fullPage:true});
  await page.goto(url+'?addr=Fictional+Example&price=300000&county=gwinnett&district=gwin-uninc',{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>checkShareURL());
  const known=await page.evaluate(()=>({annual:S.inp.annualTax1,district:S.inp.districtId,selected:ACTIVE_DISTRICT?.id}));
  assert.equal(known.district,'gwin-uninc');assert.equal(known.selected,'gwin-uninc');
  assert.ok(Math.abs(known.annual-4183.20)<0.01,'Shared report changed annual tax');
  await page.screenshot({path:path.join(folder,'shared-report-example.png'),fullPage:true});
  await page.goto(url+'?addr=Fictional+Example&price=300000&county=gwinnett&district=invalid',{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>checkShareURL());
  const unknown=await page.evaluate(()=>({annual:S.inp.annualTax1,district:S.inp.districtId,selected:ACTIVE_DISTRICT?.id}));
  assert.equal(unknown.district,'');assert.ok(!unknown.selected);
  assert.ok(Math.abs(unknown.annual-2850)<0.01,'Unverified district did not revert to county planning basis');
  console.log(JSON.stringify({countiesChecked:keys.length,multichoiceMarkets:multiple,manualSelectionChecks:manual,sharedKnownDistrict:known,sharedUnknownDistrict:unknown,screenshots:2},null,2));
 }finally{await browser.close();}
})().catch(err=>{console.error(err.stack||err);process.exitCode=1});
