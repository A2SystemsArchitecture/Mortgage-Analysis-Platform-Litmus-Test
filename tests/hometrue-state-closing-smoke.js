// HomeTrue closing-cost arithmetic regression. Run: node tests/hometrue-state-closing-smoke.js
// Independent amounts use official state rules for 2026; local unpriced items remain expressly excluded.
// AR https://www.dfa.arkansas.gov ; TN https://www.tn.gov/revenue/taxes/local-taxes/recordation-taxes/due-date-tax-rate.html
// KS https://www.kslegislature.gov/li_2016/b2015_16/statute/079_000_0000_chapter/079_031_0000_article/079_031_0002_section/079_031_0002_k/
// NV https://tax.nv.gov/tax-types/real-property-transfer-tax/
// MD https://mgaleg.maryland.gov/mgawebsite/laws/StatuteText?article=grp&section=14-104
// FL https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts(inp)'),d=html.indexOf('\nfunction buildHomesteadGuide(',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Could not extract closing-cost code');
const source=html.slice(a,b)+'\n'+html.slice(c,d);
const body="\nconst fmt=n=>'$'+Math.round(n).toLocaleString();\nlet ACTIVE_COUNTY='miami-dade',count=0,results={};\nfor(const [key,county] of Object.entries(COUNTIES)){\n for(const price of [400000,1250000]){\n  ACTIVE_COUNTY=key;\n  const html=buildClosingCosts({price,loan:price*.80,tier:1,bi:0,br:6.86,ty1:350,wt:3500,damt:price*.20,dpct:20});\n  const match=html.match(/Government Subtotal<\\/span><span class=\"cc-total-val\">\\$([\\d,]+)/);\n  if(!match)throw Error(key+': no government subtotal');\n  const government=Number(match[1].replaceAll(',',''));\n  if(!Number.isFinite(government)||government<0)throw Error(key+': invalid amount');\n  results[key+':'+price]=government;count++;\n }\n}\nconst independent={\n 'pulaski-ar:400000':735,\n 'shelby-tn:400000':1956,\n 'johnson-ks:400000':30,\n 'clark:400000':2085,'washoe:400000':1685,\n 'miami-dade:400000':1945,\n 'montgomery-md:400000':4900,\n 'prince-georges:400000':7260,\n 'anne-arundel:400000':4520,\n 'allegheny:400000':4120\n};\nfor(const [k,v]of Object.entries(independent)){\n if(results[k]!==v)throw Error(k+': expected '+v+', received '+results[k]);\n}\nreturn {cases:count,marketCount:Object.keys(COUNTIES).length,stateCount:new Set(Object.values(COUNTIES).map(x=>x.state)).size,independent: Object.keys(independent).length};";
const r=new Function(source+'\n'+body)();
assert.equal(r.cases,248);assert.equal(r.stateCount,26);assert.equal(r.marketCount,124);assert.equal(r.independent,10);
console.log('PASS: '+r.cases+' fictional closing scenarios across '+r.stateCount+' states and '+r.independent+' independent reference values.');
