# HomeTrue Batch 1: official state evidence and resumable checkpoint
Date: 2026-11-18
Scope: Florida, Georgia, Alabama, South Carolina. Review branch only. Production unchanged.
Approval status: UNRESOLVED for all four states. This document does not certify state-wide financial accuracy.

## Independently checked rules and corrections already saved
Florida:
- Florida DOR 2026 Bulletin PTO 26-21: voter-approved Amendment 3 effective 2027; non-school homestead exemption up to $150,000 in 2027 and $250,000 in 2028; new-resident rule and fifth-year waiting period for enhanced benefit. Existing HomeTrue guide states this and does not subtract unverified district savings.
  https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf
- Documentary stamp on deeds is $0.70/$100 statewide except $0.60/$100 on Miami-Dade transfers, with additional $0.45/$100 surtax in Miami-Dade for covered non-single-family conveyances. On mortgages $0.35/$100 or fraction; nonrecurring intangible tax 0.002 of debt. Source:
  https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx
  https://floridarevenue.com/taxes/taxesfees/Pages/nonrecurring_intangible_tax.aspx

Georgia:
- Standard homestead exemption is $2,000 from 40% assessed value, but some local tax components or exemptions differ. House relief for 2026 is ONE TIME: eligible qualifying homesteads receive $18,000 assessed-value reduction; no separate application. Added 2026-only description, not automatic 2027 benefit.
  https://dor.georgia.gov/property-tax-homestead-exemptions
  https://dor.georgia.gov/press-releases/2026-11-03/gov-kemp-dor-announce-distribution-homeowner-tax-relief-grants
- Real estate transfer tax is $1 per first $1,000 then $0.10 per subsequent $100 or fraction; intangible recording tax $1.50 per $500 or fraction of note.
  https://dor.georgia.gov/real-estate-transfer-tax
  https://dor.georgia.gov/intangible-recording-tax

Alabama:
- Principal residence class generally assessed at 10%; H-1 exemption deducts assessed $4,000 for state and $2,000 for county, with differing rules for senior/disability relief. Corrected statewide descriptions to avoid implying same blanket benefit for every buyer.
  https://www.revenue.alabama.gov/property-tax/homestead-exemptions/
  https://www.revenue.alabama.gov/property-tax/property-tax-assessment/
- Mortgage recording tax $0.15/$100 or fraction; deed $0.50/$500 or fraction of consideration exceeding the amount of concurrently taxable mortgage, with a $0.50 minimum. Corrected actual 0%-down calculator branch to retain the minimum and display $0.50, not rounded to $1.
  https://www.revenue.alabama.gov/tax-types/recordation-tax/
  https://alison.legislature.state.al.us/code-of-alabama?section=40-22-1
  https://www.madisoncountyal.gov/departments/probate-judge/fees/all-other-fees
- Taxes due October 1, delinquent after December 31.
  https://www.revenue.alabama.gov/faqs/when-are-my-property-taxes-due/

South Carolina:
- Legal-residence 4% assessment classification requires county assessor application; ordinary residential classification can be 6%. Separate $50,000 fair-market-value Homestead Exemption is limited to eligible senior/disability/blind households. Corrected county descriptions stating 4% as automatic, and clarified application distinctions.
  https://www.dor.sc.gov/property/property-tax-exemptions
  https://edgefieldcounty.sc.gov/legal-residence-form/
- Deed recording fee $1.85 per $500 or fraction of taxable realty value. Treated separately from assumed buyer subtotal; actual allocation and local document-recording charges require confirmation.
  https://www.dor.sc.gov/tax-index/deed-recording-fee

## Code and independent arithmetic regression
- Actual file: platform.html, branch tax-corrections-audit-nov-2026.
- Test code: tests/hometrue-batch1-tax-tests.js
- Executed 6 fictional closing cases containing 13 assertions for AL deed/mortgage, FL deed/mortgage/intangible, GA intangible/transfer and SC deed recording fee: all 13 passed against the source code.
- Existing tests/hometrue-26-state-smoke.js: 372 arithmetic smoke tests passed; tests/hometrue-state-guide-smoke.js: 124 guide renders passed. These tests are NOT financial accuracy certification.

## Items that remain UNRESOLVED before any state can be approved
- Each modeled local effective property-tax percentage and tax district needs independent authoritative rate/assessment confirmation, including levy-specific school/non-school treatment. Applying countywide blended percentages is not a substitute.
- Buyer classification, principal-residence history, exemption approvals, timing, assessed values, local government fees and jurisdiction-specific school/municipal rules are not represented sufficiently to compute guaranteed parcel-level tax.
- Some closing fees and insurance/title values are assumptions requiring clear distinction from government-set charges, including the precise application of Miami-Dade surtax by property type.
- For 2027 FL Amendment 3 implementation, DOR announced future guidance and forms, which must be reviewed when issued.
- All state guides, local variations and projected amounts still require the comprehensive line-by-line evidence reconciliation under the user-approved 100% standard.
- No state is approved. Save and continue in existing review branch; do not promote to production. 

## Second verified state-law reconciliation, 2026-11-18
- GEORGIA: Signed May 11, 2026 SB 33/Act 461 makes the previously optional statewide base-year homestead exemption mandatory; Georgia DOR reports the statewide FLOAT is applicable starting January 1, 2027. The live HomeTrue calculator has no valid per-property base-year value and therefore does not claim a guaranteed reduction. Updated Georgia guide rather than inventing an amount.
  https://gov.georgia.gov/document/2026-signed-legislation/sb-33/download
  https://www.legis.ga.gov/legislation/69550
  https://dor.georgia.gov/document/document-document/caveat-2026-opening-session/download
- ALABAMA: DOR 7% cap for Class II/Class III taxable assessed-value growth, effective collections October 1, 2025, with exceptions. Not a cap on total tax bills; updated guide to state that.
  https://www.revenue.alabama.gov/property-tax/7-cap-information-hb73-act-2024-344/
- FLORIDA: DOR PTO 26-21 says non-homestead assessment-growth cap reduces from 10% to 5% for 2027; updated guide to distinguish this from initial purchased-home assessment.
  https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf
- Government tax regression on same current code: 13 independently calculated checks passed for 6 fictional scenarios; prior 372 arithmetic smoke and 124 guide renders pass. These remain partial statutory checks, not state approval.
- 2026-11-18 review code source last checked: platform.html sha fb3f9b4dfe4924e6a44793a75235846349000d19.
