# HomeTrue Property Tax Remediation Register
**Review date:** November 17, 2026  
**Branch:** tax-corrections-audit-nov-2026  
**Deployment:** No production release authorized.

## Supplemental official-source verification, November 17, 2026

The items below are **officially supported rules or jurisdictional components**, not certification of a countywide effective tax rate or parcel tax bill. They are NOT automatically substituted into public calculations without a complete jurisdiction-aware method.

| Jurisdiction | Verified 2026 evidence | Platform consequence | Primary source |
|---|---|---|---|
| Florida, statewide | For the 2026 roll, the first $25,000 homestead exemption applies to school and non-school taxes. The additional CPI-adjusted exemption is **up to $26,411** on assessed value above $50,000 and does NOT apply to school taxes. | The stored `he:50000` and one effective `tr` cannot compute accurate school/non-school savings; do not merely replace 50000 with 51411. | [2026 Florida DOR exemption codes](https://floridarevenue.com/property/Documents/2026NALexempt.pdf), [2026 inflation calculation](https://floridarevenue.com/property/Documents/cpi_homestead_exemption.pdf) |
| Texas, statewide | General residence homestead exemption of **$140,000 is for school-district tax**, with potentially separate local-option exemptions in other taxing units. | The stored `he:140000` must NOT be subtracted from the combined county effective-tax rate. Need jurisdiction-specific tax rates and eligibility. | [Texas Comptroller, residence homestead](https://comptroller.texas.gov/taxes/property-tax/exemptions/) |
| Indiana, statewide | Supplemental deduction for taxes payable **2026: 40%**, payable **2027: 46%**; fixed 35% in county notes is outdated. A 2026 assessment date corresponds to the reported $40,000 standard deduction schedule; payable tax year must be tracked carefully. | Need a dated multi-stage deduction and credits/circuit-breaker calculation; current fixed $45,000 effective-value reduction and 10% credit alone are incomplete. | [Indiana DLGF 2026 report](https://www.in.gov/dlgf/files/2026-Exemptions-and-Deductions-Report.pdf), [DLGF presentation](https://www.in.gov/dA/7017e24e26/Department-of-Local-Government-Finance-2025.pdf?language_id=1) |
| Georgia, statewide | General $2,000 homestead exemption is from **40% assessed value**, for qualifying county and school levies, subject to restrictions and local rules. The 2026 one-time Property Tax Relief Grant reduces eligible homesteads' assessed value **$18,000**, enacted May 12, 2026. | A simple `(price-2000)*tr` misrepresents the base; the one-time relief must not be projected permanently. Need separate applicable levies. | [Georgia DOR exemptions](https://dor.georgia.gov/property-tax-homestead-exemptions), [Georgia DOR 2026 relief](https://dor.georgia.gov/2026-property-tax-relief-grant) |
| Miami-Dade, FL | Official countywide *operating* millage adopted for fiscal year Oct 2026-Sept 2027: **4.574 mills**. UMSA operating millage: **1.909 mills** within relevant unincorporated areas. These are **components, NOT the complete property tax rate**. | Do not replace the HomeTrue 1.30% county estimate with 0.4574%; school, debt, municipal and special levies must also be included. A county tax estimator exists using 2026 adopted rates. | [Countywide adopted ordinance](https://www.miamidade.gov/govaction/matter.asp?file=true&matter=261531&yearFolder=Y2026), [UMSA ordinance](https://www.miamidade.gov/govaction/matter.asp?file=true&matter=261534), [2026 Property Appraiser Tax Estimator](https://www.miamidade.gov/PAPortal/Taxes/TaxEstimator.aspx) |
| Harris County, TX | Appraisal district lists **individual 2026 taxing-unit rates and exemptions** for properties, which differ by parcel and district. | A county average 2.03% is insufficient for a parcel-specific annual tax or a correct $140,000 school-only exemption; district-based calculation required. | [HCAD jurisdiction listing](https://public.hcad.org/resources/jurlist.asp) |
| Fulton County, GA | County adopted a **2026 General Fund rate of 8.87 mills**. This is only one component of a property's total levy. | Need school, city and applicable district millages separately; do not confuse a 8.87 mill county operating rate with an all-in effective rate. | [Fulton County October 8 announcement](https://fultoncountyga.gov/News/2026/10/08/Fulton-County-Keeps-Millage-Rate-Flat-For-5th-Year) |
| Arkansas | Act 174 (2026 Fiscal Session) establishes **$675 homestead tax credit for assessment years beginning Jan. 1, 2026**. | Current review branch records updated; ensure assessment versus payment year and qualification are disclosed. | [Arkansas Act 174](https://arkleg.state.ar.us/Home/FTPDocument?path=%2FACTS%2F2026F%2FPublic%2FACT174.pdf) |
| Mississippi | Regular homestead tier for eligible owners under 65 provides a **credit up to $300**; the first $75,000 true-value exemption applies in different eligible 65+/disability categories. | Review branch handles regular tier; must add age/disability eligibility rather than applying $75,000 reduction universally. | [Mississippi DOR homestead](https://www.dor.ms.gov/county-services/homestead-exemption), [Mississippi DOR property FAQ](https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions) |

### Verification discipline
- An adopted county operating millage or an average effective rate is **not** a complete property tax rate for a particular address.
- An exemption amount is not automatically a dollar reduction in market value; identify **assessed-value vs. market-value vs. school-specific vs. bill credit**.
- Every rate needs tax year, adoption date, applicable geographic unit, school district, source URL, and exemption eligibility.
- Do not assert that any of the 124 county or 319 district rate fields are independently validated yet.
- Before release, reconcile outputs against current official property-tax calculators or bills for representative properties in each jurisdiction.

## Verified source-code inventory
- 124 records / 26 states / 319 district choices.
- One effective-rate placeholder per market, sometimes with district selections; not parcel-level official tax bills.
- All market records provide at least one property-appraiser or tax-office URL. URL presence does **not** establish that the underlying rate is current.
- The affordability estimator previously used Florida's 1.3% and $50,000 assumptions regardless of selected market.
- Negative year-two taxes could be produced by the former homestead formula on low-price properties.
- Former data heading incorrectly certified all county data as "verified May 2026".
- Tier accuracy percentages were asserted without empirical validation.
- Flood estimates are zero for all four baseline fields in 31 markets. A zero value is **not** evidence that a property requires no flood insurance.

## Implemented on this branch, pending integration testing
1. Affordability tax estimates now use MKT.tr for the county/district instead of a fixed Florida tax assumption. These are still **illustrative effective-rate estimates**, not actual tax bills.
2. Minimum year-two tax is now zero, preventing negative tax outputs.
3. Arkansas four county records use a homestead credit **up to $675** (assessment year 2026), not $500. Source: https://www.arkleg.state.ar.us/Home/FTPDocument?path=%2FAssembly%2FMeeting+Attachments%2F000%2F27925%2FExhibit+H.08.b+-+DFA+-+ACD+-+2026+Annual+Report.pdf
4. Mississippi four county records use a regular homestead credit **up to $300** rather than treating a $75,000 market-value reduction as universal. Source: https://www.dor.ms.gov/county-services/homestead-exemption
5. Non-Florida counties can no longer silently fall back to a Florida closing model if their explicit model is absent. Separate fall-through handling still requires testing.
6. Removed unsubstantiated whole-registry certification and Roscoe numeric accuracy claims.
7. Added static regression tests at tests/tax-audit.test.js.

## Known unresolved tax-model defects
**Must resolve before public release**
- Florida: two homestead exemption portions have different school/non-school applicability. A single effective tax rate cannot accurately compute both components. See https://floridarevenue.com/faq/Pages/FAQDetails.aspx?FAQID=1663
- Texas: the $140,000 residence exemption specifically applies to school-district taxes; model currently subtracts it from an all-in effective rate. Requires school versus other district breakdown. See https://comptroller.texas.gov/taxes/property-tax/exemptions/
- Indiana: fixed $45,000 and 35% deductions are superseded by assessment-year schedules, including 2026 standard deduction $40,000 and payable-2027 supplemental percentage 46%. Requires assessment/payable-year and credit/circuit-breaker handling. See https://www.in.gov/dlgf/files/2026-presentations/260519-Lucas-Culy-Presentation-Deductions-and-Credits.pdf
- Georgia: $2,000 may represent assessed-value rather than market-value deductions; school/county/local exemption tiers differ.
- Louisiana: homestead exclusion affects assessed value, not a uniform market-value subtraction; assess at parish/school district level.
- Maine/New Mexico/Pennsylvania: value exemptions and eligibility differ by locality; $0 or simplistic rates cannot imply universal eligibility.
- Most other states: absence of a HomeTrue exemption amount (he=0) must not be described as definitive ineligibility.
- Rate freshness: independent verification of annual 2026 county, city, school, and special-district levies remains open for **all 124** market records.
- Tax bases: effective homeowner tax rates, assessed values, reassessment changes, credits, transfer taxes, and exemptions need separate definitions and proper precision.
- 31 zero-flood-data markets must clearly disclose that data is unavailable, not $0 property-specific coverage.
- Insurance and PMI calculations remain generic estimates without validated carrier/loan-specific information.
- Standard closing-cost defaults and county custom fields require a jurisdiction-specific buyer/seller allocation audit.
- Tier one "excluded" cost categories must remain visibly excluded in totals and recommendations.

## State-by-state market inventory (not independently tax-rate certified)
| State | Markets | Status |
|---|---:|---|
| AL | 4 | Rate and district check pending |
| AR | 4 | Homestead source corrected; rates pending |
| AZ | 3 | Rate and district check pending |
| DE | 2 | Rate and transfer model check pending |
| FL | 7 | School/non-school exemption split and rates pending |
| GA | 14 | Homestead assessed-value logic and rates pending |
| ID | 3 | Exemptions and rates pending |
| IN | 5 | Annual schedule and circuit breaker pending |
| KS | 1 | Rates and district check pending |
| KY | 5 | Rates and exemptions pending |
| LA | 5 | Assessed-value treatment pending |
| MD | 3 | Rates and transfer taxes pending |
| ME | 2 | Municipal rates and exemption pending |
| MO | 9 | Rates and districts pending |
| MS | 4 | Regular homestead source corrected; rates pending |
| NC | 4 | Rates and districts pending |
| NM | 3 | Assessment-ratio/exemption verification pending |
| NV | 2 | Rates and assessment caps pending |
| OH | 8 | Rates and districts pending |
| PA | 5 | Assessment bases/exemptions pending |
| SC | 6 | Assessment ratio and school millage pending |
| TN | 4 | Rates and districts pending |
| TX | 6 | School/other tax exemption allocation pending |
| UT | 4 | Rates and primary residence exclusion pending |
| VA | 7 | Rates and districts pending |
| WV | 4 | Rates and exemptions pending |

## Acceptance criteria before merge
- No unsupported tax savings automatically represented as verified.
- Reconcile each market's 2026 adopted tax rates with dated primary sources, including all relevant districts.
- Confirm all buyer/seller closing tax allocations and current statutes.
- Sample parcel-level official tax statements in each state, with buyer reassessment scenarios.
- Run all regression and scenario tests locally and through staging browser.
- Confirm every user-facing statement and PDF is consistent with revised calculations.
- Obtain final attorney review before public sales launch.

**Conclusion:** This branch implements bounded corrections but is NOT a 26-state/124-market tax certification or a release-ready replacement.
