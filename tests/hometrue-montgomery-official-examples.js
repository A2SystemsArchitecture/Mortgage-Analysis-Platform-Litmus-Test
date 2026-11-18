// Verified against official Montgomery County, Maryland recordation tax deed examples.
// https://www.montgomerycountymd.gov/Finance/Resources/Files/Recordation_Tax_New_Tier_Examples.pdf
// Buyer portion assumes HomeTrue's 50/50 default allocation.
// Run: node tests/hometrue-montgomery-official-examples.js
const fs=require('node:fs'), assert=require('node:assert/strict'), path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('function buildHomesteadGuide(inp)',c);
assert(a>=0&&b>a&&c>0&&d>c);
const body="let ACTIVE_COUNTY='montgomery-md',MKT={tr:.008,br:6.86,wr:7.5};const fmt=n=>'$'+Number(n).toLocaleString('en-US',{maximumFractionDigits:2});const tests=[[400000,true,2670],[400000,false,3560],[575000,true,4572.5],[575000,false,5462.5],[675000,true,6440],[675000,false,7330],[775000,true,8509],[775000,false,9399],[1075000,true,15062.5],[1075000,false,15952.5]];let pass=0;for(const [price,principal,officialTotal] of tests){const inp={price,loan:price*.8,damt:price*.2,br:6.86,wr:7.5,wt:4000,ty1:300,ty2:300,bi:275,pri:principal,tier:3};const output=buildClosingCosts(inp);const row=output.match(/County Recordation Tax — Assumed Buyer Half[^]*?<div class=\"cc-val\">\\$([\\d,]+(?:\\.\\d+)?)<\\/div>/);const got=Number(row?.[1]?.replaceAll(',',''));const expected=Math.round(officialTotal/2);if(got!==expected)throw Error('Mismatch '+price+' principal='+principal+': '+got+' vs '+expected);pass++;}return pass;";
const result=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(result,10);
console.log('PASS: 10 Montgomery County cases match official recordation tax examples.');
