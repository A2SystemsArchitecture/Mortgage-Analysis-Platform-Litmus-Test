# HomeTrue Property Tax Remediation Register
**Review date:** November 17, 2026  
**Branch:** tax-corrections-audit-nov-2026  
**Deployment:** No production release authorized.

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
