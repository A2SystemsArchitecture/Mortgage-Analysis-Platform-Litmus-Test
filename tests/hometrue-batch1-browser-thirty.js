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
  // Market activation (spec 2026-11-27): the public build ships with no live market.
  // Check that first, then run the math checks through the tester route.
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForFunction(()=>document.querySelectorAll('.county-pill.coming-soon').length>0,null,{timeout:15000});
  const publicView=await page.evaluate(()=>{
    const before=ACTIVE_COUNTY; selectCounty('broward');
    const msg=document.getElementById('market-coming-soon');
    return {before,after:ACTIVE_COUNTY,shown:msg&&msg.style.display==='block',text:msg?msg.textContent:'',
      marked:document.querySelectorAll('.county-pill.coming-soon').length,pills:document.querySelectorAll('.county-pill').length};
  });
  assert.equal(publicView.after,publicView.before,'Public visitor selected an inactive market');
  assert.ok(publicView.shown&&publicView.text.startsWith('Coming soon. HomeTrue is still verifying property tax and cost data for Broward County.'),'Coming-soon message not shown');
  assert.equal(publicView.marked,publicView.pills,'Every market pill must show coming soon while no market is live');
  await page.goto(url+'?tester=true',{waitUntil:'domcontentloaded',timeout:45000});
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
  // Rate-year decision: show the real documented tax year, never claim a 2027 rate.
  // Source-backed 2026 Florida code choices were reconciled in the tax district
  // ledger. Undocumented city planning choices must remain year-unverified.
  let floridaYearChecks=0;
  for(const key of ['miami-dade','broward','palm-beach','martin','st-lucie','indian-river','brevard']){
    const recorded=await page.evaluate(key=>{
      selectCounty(key);
      const first=(COUNTIES[key].districts||[]).find(x=>x.taxYear==='2026');
      if(!first)throw Error('Missing a 2026 evidenced district in '+key);
      selectDistrict(key,first,null,false);
      return {year:document.getElementById('planning-tax-year')?.textContent,
              id:ACTIVE_DISTRICT?.id,raw:first.taxYear};
    },key);
    assert.equal(recorded.year,'Tax year 2026 (not a 2027 rate)','Wrong selected tax year '+key);
    assert.equal(recorded.raw,'2026');
    floridaYearChecks++;
    const unselected=await page.evaluate(key=>{
      selectCounty(key);
      return document.getElementById('planning-tax-year')?.textContent;
    },key);
    assert.equal(unselected,'Not verified','Wrong default county tax-year status '+key);
  }
  const pbUnknown=await page.evaluate(()=>{
    selectCounty('palm-beach');
    const x=COUNTIES['palm-beach'].districts.find(d=>d.id==='pb-boca');
    if(!x)throw Error('Missing Palm Beach Boca planning option');
    selectDistrict('palm-beach',x,null,false);
    return {year:document.getElementById('planning-tax-year')?.textContent,known:!!x.taxYear};
  });
  assert.equal(pbUnknown.year,'Not verified');
  assert.equal(pbUnknown.known,false);
  // Verify supported latest-adopted-year disclosure in each of 30 active Batch 1 markets.
  // Only a documented district example is checked, not actual parcel mapping.
  let thirtyMarketYearChecks=0;
  for(const key of keys){
    const status=await page.evaluate(key=>{
      selectCounty(key);
      const d=(COUNTIES[key].districts||[]).find(d=>d.taxYear==='2026'||d.taxPeriod==='FY 2026/27');
      if(!d)throw Error('No evidence-backed 2026 district rate for '+key);
      selectDistrict(key,d,null,false);
      return {year:document.getElementById('planning-tax-year')?.textContent,
        district:ACTIVE_DISTRICT?.id,sourceYear:d.taxYear||d.taxPeriod};
    },key);
    assert.ok(status.year&&status.year!=='Not verified',key+' missing adopted rate-year label');
    if(status.sourceYear==='2026')assert.equal(status.year,'Tax year 2026 (not a 2027 rate)');
    else assert.equal(status.year,'FY 2026/27 (not verified as tax year 2027)');
    thirtyMarketYearChecks++;
  }
  // Reject silent generic county fallback in all 30 markets for NEW buyer reports.
  // A documented tax-district choice or buyer-supplied annual tax allows progress.
  let verifiedBasisGuards=0;
  for(const key of keys){
    const guard=await page.evaluate(key=>{
      document.getElementById('f-annual-buyer-tax').value='';
      selectCounty(key);
      const unknownBlocked=!buyerTaxBasisReady();
      const district=COUNTIES[key].districts.find(d=>d.taxYear==='2026'||d.taxPeriod==='FY 2026/27');
      selectDistrict(key,district,null,false);
      const officialDistrictAllowed=buyerTaxBasisReady();
      selectCounty(key);
      const tax=document.getElementById('f-annual-buyer-tax');
      tax.value='4800.25';
      const suppliedProjectionAllowed=buyerTaxBasisReady();
      tax.value='';
      return {unknownBlocked,officialDistrictAllowed,suppliedProjectionAllowed};
    },key);
    assert.deepEqual(guard,{unknownBlocked:true,officialDistrictAllowed:true,suppliedProjectionAllowed:true},'Buyer tax basis guard: '+key);
    verifiedBasisGuards++;
  }
  // Dorchester is inside the Batch 1 guard (31-market scope, 2026-11-25). It has no tax-year-labeled
  // district yet, so it must be blocked until the buyer supplies an annual tax projection.
  const dorchesterGuard=await page.evaluate(()=>{
    const tax=document.getElementById('f-annual-buyer-tax');
    tax.value='';
    selectCounty('dorchester-sc');
    const blockedWithoutTax=!buyerTaxBasisReady();
    tax.value='4800.25';
    const allowedWithSuppliedTax=buyerTaxBasisReady();
    tax.value='';
    calcAffordability();
    const affordabilityBlocked=document.getElementById('aff-price-low')?.textContent==='Tax district needed'&&document.getElementById('aff-to-analysis')?.disabled===true;
    return {blockedWithoutTax,allowedWithSuppliedTax,affordabilityBlocked};
  });
  assert.deepEqual(dorchesterGuard,{blockedWithoutTax:true,allowedWithSuppliedTax:true,affordabilityBlocked:true},'Dorchester must be inside the Batch 1 tax-basis guard');
  // The affordability calculator also must refuse fictional price ceilings
  // based only on an unverified generic county rate.
  let affordabilityTaxGuards=0;
  for(const key of keys){
    const out=await page.evaluate(key=>{
      selectCounty(key);
      const d=COUNTIES[key].districts.find(d=>d.taxYear==='2026'||d.taxPeriod==='FY 2026/27');
      calcAffordability();
      const blocked={
        message:document.getElementById('aff-price-low')?.textContent,
        disabled:document.getElementById('aff-to-analysis')?.disabled,
        result:S.affResult
      };
      selectDistrict(key,d,null,false);
      calcAffordability();
      const ready={
        message:document.getElementById('aff-price-low')?.textContent,
        disabled:document.getElementById('aff-to-analysis')?.disabled,
        result:!!S.affResult
      };
      return {blocked,ready};
    },key);
    assert.equal(out.blocked.message,'Tax district needed','Affordability source gate skipped '+key);
    assert.equal(out.blocked.disabled,true);
    assert.equal(out.blocked.result,null);
    assert.ok(out.ready.result && out.ready.message!=='Tax district needed'&&!out.ready.disabled,'Valid selected district failed '+key);
    affordabilityTaxGuards++;
  }
  // Exercise all 30 actual browser share-link reconstructions against the
  // source-backed district planning factor, without representing it as a bill.
  let sharedReports=0;
  for(const key of keys) for(const down of [3,3.5,5,10,20]) {
    const d=await page.evaluate(key=>{
      const c=COUNTIES[key],choice=(c.districts||[]).find(x=>!x.legacyOnly);
      return {id:choice?.id||'',factor:choice?.tr??c.tr};
    },key);
    const shareUrl=url+'?tester=true&addr=Fictional+Market&price=300000&dp='+down+'&county='+encodeURIComponent(key)+'&district='+encodeURIComponent(d.id);
    await page.goto(shareUrl,{waitUntil:'domcontentloaded',timeout:45000});
    await page.evaluate(()=>checkShareURL());
    const result=await page.evaluate(()=>({
      annual:S.inp.annualTax1,
      annual2:S.inp.annualTax2,
      monthly:S.inp.ty1,
      down:S.inp.dpct,loan:S.inp.loan,br:S.inp.br,wr:S.inp.wr,bpi:S.inp.bpi,wpi:S.inp.wpi,bp:S.inp.bp,wp:S.inp.wp,
      actualDistrict:S.inp.districtId,
      visible:document.getElementById('sa')?.classList.contains('active')||false
    }));
    const expected=300000*d.factor;
    const loan=300000*(1-down/100);
    const payment=r=>Math.round(loan*(r/1200)/(1-Math.pow(1+r/1200,-360)));
    assert.equal(result.down,down,key+' share down payment');
    assert.ok(Math.abs(result.loan-loan)<0.001,key+' shared loan');
    assert.equal(result.bpi,payment(result.br),key+' shared best P&I');
    assert.equal(result.wpi,payment(result.wr),key+' shared worst P&I');
    assert.equal(result.bp,down<20?Math.round(loan*.003/12):0,key+' shared best PMI');
    assert.equal(result.wp,down<20?Math.round(loan*.005/12):0,key+' shared worst PMI');
    assert.ok(Math.abs(result.annual-expected)<0.01,'Shared annual tax mismatch '+key);
    assert.ok(Math.abs(result.annual2-expected)<0.01&&Math.abs(result.monthly*12-expected)<0.01,'Shared monthly/year mismatch '+key);
    assert.equal(result.actualDistrict,d.id,'Shared district mismatch '+key);
    assert.ok(result.visible,'Shared report not visible '+key);
    sharedReports++;
  }
  assert.equal(sharedReports,150,'Missing market/down-payment shared-report combinations');
  // A shared report must preserve the exact original best/worst buyer payment
  // instead of silently recalculating with today's default mortgage/insurance/PMI rates.
  let roundTrips=0;
  for(const key of keys){
    const initial=url+'?tester=true&addr=Fictional+Market&price=300000&county='+encodeURIComponent(key);
    await page.goto(initial,{waitUntil:'domcontentloaded',timeout:45000});
    const original=await page.evaluate(()=>{
      checkShareURL();
      PLAN.tier='complete';
      const i=S.inp;
      // Distinct best and worst interest rates and insurance/PMI/flood amounts.
      Object.assign(i,{br:6.54,wr:8.25,bi:275,wi:420,bp:130,wp:220,fb:64,fw:310,ep:42});
      i.bpi=cPI(i.loan,i.br);i.wpi=cPI(i.loan,i.wr);
      i.bt=i.bpi+i.ty1+i.hoa+i.bi+i.bp+i.fb;
      i.wt=i.wpi+i.ty1+i.hoa+i.wi+i.wp+i.fw+i.ep;
      Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async u=>{window.__sharedAuditUrl=u;}}});
      shareAnalysis();
      return {url:window.__sharedAuditUrl,br:i.br,wr:i.wr,bpi:i.bpi,wpi:i.wpi,bi:i.bi,wi:i.wi,bp:i.bp,wp:i.wp,fb:i.fb,fw:i.fw,ep:i.ep,bt:i.bt,wt:i.wt,annualTax:i.annualTax1};
    });
    assert.ok(original.url?.includes('wr=8.25')&&original.url.includes('wi=420'),'Link did not preserve financial inputs: '+key);
    await page.goto(original.url,{waitUntil:'domcontentloaded',timeout:45000});
    await page.evaluate(()=>checkShareURL());
    const rebuilt=await page.evaluate(()=>{
      const i=S.inp;
      return {br:i.br,wr:i.wr,bpi:i.bpi,wpi:i.wpi,bi:i.bi,wi:i.wi,bp:i.bp,wp:i.wp,fb:i.fb,fw:i.fw,ep:i.ep,bt:i.bt,wt:i.wt,annualTax:i.annualTax1};
    });
    for(const [field,value] of Object.entries(rebuilt))
      assert.ok(Math.abs(value-original[field])<0.001, 'Shared '+field+' changed: '+key+' '+value+' vs '+original[field]);
    roundTrips++;
  }
  await page.evaluate(()=>selectCounty('gwinnett'));
  await page.screenshot({path:path.join(folder,'district-planning-example.png'),fullPage:true});
  await page.goto(url+'?tester=true&addr=Fictional+Example&price=300000&county=gwinnett&district=gwin-uninc',{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>checkShareURL());
  const known=await page.evaluate(()=>({annual:S.inp.annualTax1,district:S.inp.districtId,selected:ACTIVE_DISTRICT?.id}));
  assert.equal(known.district,'gwin-uninc');assert.equal(known.selected,'gwin-uninc');
  assert.ok(Math.abs(known.annual-4183.20)<0.01,'Shared report changed annual tax');
  await page.screenshot({path:path.join(folder,'shared-report-example.png'),fullPage:true});
  await page.goto(url+'?tester=true&addr=Fictional+Example&price=300000&county=gwinnett&district=invalid',{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>checkShareURL());
  const unknown=await page.evaluate(()=>({annual:S.inp.annualTax1,district:S.inp.districtId,selected:ACTIVE_DISTRICT?.id}));
  assert.equal(unknown.district,'');assert.ok(!unknown.selected);
  assert.ok(Math.abs(unknown.annual-2850)<0.01,'Unverified district did not revert to county planning basis');
  // Replay TWO official 2026 Gwinnett issued bills through the actual browser
  // share/report reconstruction. These are existing-owner historical bill facts,
  // not automatically verified future buyer tax entitlements.
  // 2026 Tax Commissioner originals:
  // https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf
  // https://www.gwinnetttaxcommissioner.com/PropTaxBill/R6174%20203.pdf
  let realBillShareChecks=0;
  for (const scenario of [
    {price:493200,billed:5533.49,label:'2026 S1R actual homeowner bill, includes 448.22 in assessments'},
    {price:243400,billed:3781.78,label:'2026 temporary appealed bill, includes 387.82 in assessments'}
  ]) {
    const u=url+'?tester=true&addr=Historical+2026+Tax+Bill&price='+scenario.price+
      '&county=gwinnett&district=gwin-uninc&buyerTax='+scenario.billed;
    await page.goto(u,{waitUntil:'domcontentloaded',timeout:45000});
    await page.evaluate(()=>checkShareURL());
    const got=await page.evaluate(()=>({
      annual:S.inp.annualTax1,annual2:S.inp.annualTax2,
      monthly:S.inp.ty1,buyerTax:S.inp.buyerAnnualTax,
      district:S.inp.districtId,bestTaxInMonthly:S.inp.bt-S.inp.bpi-S.inp.hoa-S.inp.bi-S.inp.bp-S.inp.fb
    }));
    assert.equal(got.annual,scenario.billed,scenario.label+' annual');
    assert.equal(got.annual2,scenario.billed,scenario.label+' future-year placeholder');
    assert.equal(got.buyerTax,scenario.billed,scenario.label+' entered bill override');
    assert.equal(got.district,'gwin-uninc',scenario.label+' district');
    assert.ok(Math.abs(got.monthly-scenario.billed/12)<0.000001,scenario.label+' monthly');
    assert.ok(Math.abs(got.bestTaxInMonthly-scenario.billed/12)<0.000001,scenario.label+' best-case reconciliation');
    realBillShareChecks++;
  }
  console.log(JSON.stringify({realBillShareChecks, countiesChecked:keys.length,multichoiceMarkets:multiple,manualSelectionChecks:manual,affordabilityTaxGuards:affordabilityTaxGuards,buyerTaxBasisGuards:verifiedBasisGuards,dorchesterDeferredUnaffected:dorchesterGuard,thirtyMarketSourceYearChecks:thirtyMarketYearChecks,floridaTaxYearChecks:floridaYearChecks,palmBeachUnknownTaxYear:pbUnknown.year,sharedReportsChecked:sharedReports,sharePaymentRoundTrips:roundTrips,sharedKnownDistrict:known,sharedUnknownDistrict:unknown,screenshots:2},null,2));
 }finally{await browser.close();}
})().catch(err=>{console.error(err.stack||err);process.exitCode=1});
