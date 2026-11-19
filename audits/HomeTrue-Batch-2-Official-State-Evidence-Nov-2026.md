# HomeTrue Batch 2: financial accuracy evidence and recovery checkpoint
Date: 2026-11-18
States: North Carolina, Tennessee, Kentucky, Virginia.
Status: UNRESOLVED in all four states. No approval. Production unchanged.
Code branch: tax-corrections-audit-nov-2026.
Most recent code blob: 416aea841bb443af42343f5b6c859818eea64123.

## Officially verified and corrected in HomeTrue code
NC
- Under N.C.G.S. 105-360 real estate property taxes become due September 1; taxpayers usually can pay without interest through January 5 of the next year. Two county records incorrectly said taxes were due January 5. Updated all four county records to distinguish legal due date from penalty-free date.
  https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_105/GS_105-360.html
  https://news.mecknc.gov/mail-2026-mecklenburg-county-property-tax-bills
- 2027 elderly/disabled income limit $39,900 confirmed against state 2027 Form AV-9; current HomeTrue data uses this and states eligibility restriction.
  https://www.ncdor.gov/2027-av-9-securedpdf/open

TN
- 2026 income limit of $38,470 based on 2025 income applies to the state Tax Relief program for elderly/disabled applicants; program provides reimbursement/credits against taxes due, not automatic homestead exemption. Local-option Tax Freeze is separate and uses locality-specific income limits. Corrected actual customer guide and three county notes to distinguish programs.
  https://www.nashville.gov/departments/trustee/2026-tax-relief-and-freeze-checklist
  https://comptroller.tn.gov/office-functions/pa/property-taxes/property-tax-programs/tax-relief.html
  https://comptroller.tn.gov/content/dam/cot/pa/documents/tax-freeze/TaxFreezeIncomeLimitsList2026.pdf
- Transfer tax $0.37/$100 of consideration and recording tax $0.115/$100 on principal over $2,000, subject to exemptions. Current calculation for fictional $400k purchase/$320k mortgage returned $1,480 transfer tax and $365.70 recording tax before display rounding.
  https://revenue.support.tn.gov/hc/en-us/articles/360057241552-REC-1-Recordation-Tax-Overview

KY
- KRS 142.050 imposes $0.50/$500 or fraction seller deed transfer tax. All five county records had incorrectly claimed 'No deed transfer tax' despite the closing model acknowledging seller's charge. Fixed all five records.
  https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=43160
- State Supreme Court in Countrywide Home Loans Inc v. Kentucky Bar Association: a layperson may conduct ministerial real-estate closing tasks but cannot provide legal advice. Five county notes and shared closing description inaccurately called Kentucky categorically attorney-closed. Corrected.
  https://law.justia.com/cases/kentucky/supreme-court/2003/2000-sc-000209-kb.html
  https://www.kybar.org/Portals/0/OBC/UPLOpinions/KBA%20U58.pdf
- Homestead exemption $49,100 assessed value for 2025 and 2026, available for 65+ or totally disabled; HomeTrue already describes correctly and does not assume it for every buyer.
  https://revenue.ky.gov/Property/Residential-Farm-Commercial-Property/pages/homestead-exemption.aspx

VA
- State deed and deed-of-trust recordation generally 25 cents per $100 or fraction, with local rate up to one-third of state amount, subject to situs and exemptions. VA grantor tax 50 cents per $500 of consideration or fraction. Existing code's basic planning calculation matches at example pricing but LOCAL assumption not certified for each market.
  https://law.lis.virginia.gov/vacode/title58.1/section58.1-801/
  https://law.lis.virginia.gov/vacode/title58.1/chapter8/section58.1-803/
  https://law.lis.virginia.gov/vacode/title58.1/chapter8/section58.1-802/
  https://law.lis.virginia.gov/vacode/title58.1/chapter38/section58.1-3800/

## Reproducible tests
File tests/hometrue-batch2-tax-tests.js: four fictional $400,000 purchase/$320,000 mortgage scenarios, nine assertions covering NC, TN, KY, VA statutory government charge displays. Passed against the actual review-branch platform.html.
Previously existing tests/hometrue-batch1-tax-tests.js: 13 statutory assertions passed.
tests/hometrue-26-state-smoke.js: 372 arithmetic smoke tests passed.
tests/hometrue-state-guide-smoke.js: 124 buyer guide renders passed.
A test success verifies that programmed examples match the selected reference calculations, not that entire state has been audited.

## Unresolved required to approve states
- All four states: independent official local taxing-district levies, actual appraised/assessed treatment, property-specific exclusions/credits, eligibility, fee schedules and exemptions for each selected market; replace or support blended effective rate data. All customer text/rules need complete item-by-item reconciliation.
- VA: locally adopted one-third additional recordation tax and where applicable 2026 changes require city/county verification.
- TN: actual program-year tax relief values, local freeze rules and tax collection date vary by collecting municipality; 2026 figures must not be applied to later years automatically.
- KY: proper classification of closing costs for a non-attorney closing, amount of attorney services if needed, county recording fees and variable school/fire tax districts; 2027 homestead amount not yet published.
- NC: county/city tax rates and local tax rules; elderly income thresholds subject to year; local fees.
No four states approved. Resume from branch; preserve all committed work. No live website change.
