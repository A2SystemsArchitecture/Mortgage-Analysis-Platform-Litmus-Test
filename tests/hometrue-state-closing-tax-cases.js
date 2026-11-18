// Independent numeric closing tax tests grounded in official state tax-agency sources.
// Test run: node tests/hometrue-state-closing-tax-cases.js
// These tests do not certify county-specific or buyer-specific exceptions.
// GA https://dor.georgia.gov/intangible-recording-tax
// AL https://www.revenue.alabama.gov/tax-types/recordation-tax/
// FL https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx
// SC https://www.dor.sc.gov/tax-index/deed-recording-fee
// TN https://www.tn.gov/revenue/taxes/local-taxes/recordation-taxes/due-date-tax-rate.html
// ME https://www.maine.gov/revenue/taxes/property-tax/transfer-tax
// DE https://revenue.delaware.gov/first-time-home-buyer-tax-credit/
// AR https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/miscellaneous-tax/miscellaneous-tax-descriptions/
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','platform.html'),'utf8');
const a=html.indexOf('const COUNTIES = {'),b=html.indexOf('\n};',a)+3;
const c=html.indexOf('function buildClosingCosts('),d=html.indexOf('function buildHomesteadGuide(',c);
assert(a>=0&&b>a&&c>=0&&d>c,'Cannot isolate official-tax validation source');
const body="\nlet ACTIVE_COUNTY='miami-dade';\nconst fmt=n=>'$'+Math.round(n).toLocaleString();\nconst keyFor=state=>Object.keys(COUNTIES).find(k=>COUNTIES[k].state===state);\nconst input=(p,loan)=>({price:p,loan,damt:p-loan,dpct:100*(p-loan)/p,tier:1,bi:250,br:6.8,ty1:350,wt:2800});\nconst subtotal=(html)=>{\n const m=html.match(/Government Subtotal<\\/span><span class=\"cc-total-val\">\\$([\\d,]+)/);\n if(!m)throw Error('Missing government subtotal');\n return +m[1].replace(/,/g,'');\n};\nconst outcome=[];\nfunction check(state,p,loan,expected,label){\n ACTIVE_COUNTY=keyFor(state);\n const got=subtotal(buildClosingCosts(input(p,loan)));\n if(got!==expected)throw Error(state+' '+label+': expected '+expected+', received '+got);\n outcome.push({state,label,expected});\n}\nfor(const [key,c] of Object.entries(COUNTIES)){\n ACTIVE_COUNTY=key;\n const html=buildClosingCosts(input(400000,360000));\n if(/NaN|undefined/.test(html))throw Error('Invalid closing output for '+key);\n}\ncheck('ga',400000,360000,1200,'GA 360k loan: intangible $1080 plus $120 recording');\ncheck('ga',9000000,8500000,25120,'GA 8.5m loan: tax capped at 25k plus $120 recording');\ncheck('al',400000,360000,690,'AL $40k non-mortgaged equity at $0.50/$500 plus mortgage tax + recording');\ncheck('al',400000,400000,711,'AL zero-down: minimum $0.50 deed stamp plus $600 mortgage + $110 recording');\ncheck('fl',400000,360000,2165,'FL $0.35/$100 note and 0.2% intangible plus recording');\ncheck('sc',400000,360000,125,'SC buyer recording charge only; $1.85/$500 seller deed fee excluded');\ncheck('tn',400000,360000,2002,'TN buyer transfer 0.37% plus indebtedness 0.115% above $2k plus recording');\ncheck('me',400000,360000,930,'ME buyer half of $2.20/$500 plus recording');\ncheck('me',1200000,1000000,3450,'ME buyer half with extra $3.80/$500 on amount over $1m');\ncheck('de',400000,360000,8075,'DE assumed 2% buyer transfer before credit plus recording');\ncheck('ar',400000,360000,735,'AR half $3.30/$1000 plus recording');\nreturn {marketSmoke:Object.keys(COUNTIES).length,feeChecks:outcome};\n";
const out=new Function(html.slice(a,b)+'\n'+html.slice(c,d)+'\n'+body)();
assert.equal(out.marketSmoke,124);assert.equal(out.feeChecks.length,11);
console.log('PASS: '+out.marketSmoke+' closing cost renders and '+out.feeChecks.length+' independently calculated state tax fixtures');
