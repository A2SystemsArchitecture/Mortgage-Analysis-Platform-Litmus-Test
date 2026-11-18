# HomeTrue Property Tax Remediation Register
**Review date:** November 17, 2026  
**Branch:** tax-corrections-audit-nov-2026  
**Deployment:** No production release authorized.

### Critical future-year update: Florida Amendment 3 approved November 3, 2026
- **Official Florida Department of Revenue Bulletin PTO 26-21, dated November 5, 2026** confirms Amendment 3 was approved by Florida voters.
- Effective January 1, 2027, first applies to **2027 tax roll**. No retroactive application to 2026 bills.
- For qualified eligible homeowners, **non-school assessed-value homestead exemption up to $150,000 in 2027; up to $250,000 in 2028**; later years inflation adjusted. These amounts are not blanket exemptions from school taxes.
- People who were **not Florida residents as of December 31, 2026** have a different schedule: $25,000 school-assessed-value exemption and up to $50,000 non-school exemption upon qualifying; eligibility for larger exemption begins with fifth year of exemption. Exact application to an individual requires qualification and additional implementing guidance.
- Non-homestead assessment-increase cap falls from 10% to 5%, with statutory and school-levy nuances to confirm before calculating effects.
- **2027 launch blocker**: HomeTrue's fixed `he:50000`, single effective `tr`, and unconditional Year 2+ assumptions cannot reflect this change. Need date of residency, year, property status, assessed value, and school/non-school levy allocation; do not simply replace `he` with 150000.
- [Official Florida DOR 2026-11-05 bulletin](https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf); [Florida Senate passed resolution](https://www.flsenate.gov/Session/Bill/2026F/1F/BillText/er/PDF).

### South Carolina additional verified rule
- South Carolina DOR confirms qualifying legal primary residences receive **4% assessment ratio** and generally an exemption from **school operating taxes** (not necessarily school debt taxes). Applying a single market-value effective rate without assessing property eligibility and school debt versus operations cannot accurately represent a parcel.
- [South Carolina DOR Property Tax Exemptions](https://www.dor.sc.gov/property/property-tax-exemptions); [South Carolina Property Tax Manual](https://dor.sc.gov/sites/dor/files/Documents/Policy%20Manuals/SCTIED-2025%20Edition-Complete.pdf).
- Exact 2026 rates for all six SC market records remain **unverified**.

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

## Verified 2026-27 jurisdiction-level rates (added November 17, 2026)

These are **published rates for specific levy scopes**, NOT certified 2027 marketwide effective purchase-price tax rates. Full details and source URLs are recorded in [official jurisdiction evidence](audits/HomeTrue-2026-27-official-jurisdiction-evidence.csv).

- **Durham County, NC:** 2026-27 county-only levy $0.5792 per $100 assessed value; City of Durham county+city $1.0163; Durham portion of Chapel Hill $1.0792; Fire/Rescue District 950 $0.6621. Each rate applies only to the named jurisdiction. [Durham County official rates](https://dconc.gov/Tax-Administration/Payment-Options-and-Collections/Tax-Rates1).
- **Guilford County, NC:** 2026-27 county-only $0.7895 per $100; applicable city/special levies add to the county rate. [Guilford County official schedule](https://www.guilfordcountync.gov/index.php/government/departments-and-agencies/tax-department/2026-2027-tax-property-rates).
- **Clark County, NV:** 2026-27 *District 100* levy $2.5017 per $100 **assessed value**, not market value. Nevada uses 35% of *taxable value* to derive assessed value, and additional tax caps may affect the bill. [Clark County Treasurer, district 100](https://treasurer.co.clark.nv.us/TaxRate-District/tcaDetails.aspx?fy=20262027&tca=100+++++++), [Nevada NRS 361.225](https://www.leg.state.nv.us/NRS/NRS-361.html).
- **Washoe County, NV:** 2026-27 Reno area 1000 combined levy $3.6600 per $100 assessed value; Truckee Meadows FPD area 4000 combined $3.2402. [Washoe County district schedule](https://washoecounty.gov/treas/files/2026-27%20Combined%20Rates%20FINAL.pdf).
- **Fulton County, GA:** 2026 adopted *county general-fund* operating levy 8.87 mills. Not the combined property rate. [Fulton County announcement](https://www.fultoncountyga.gov/News/2026/10/08/Fulton-County-Keeps-Millage-Rate-Flat-For-5th-Year).
- **Miami-Dade County, FL:** FY 2026-27 adopted *countywide operating* rate 4.574 mills. Not a composite school+municipal+special levy. [Miami-Dade ordinance](https://www.miamidade.gov/govaction/legistarfiles/Matters/Y2026/261531.pdf).

**Audit implication:** We now possess selected current, official jurisdiction-level levy rates, but none of these proves that HomeTrue's single blended rate for any of its 124 markets is an appropriate 2027 parcel-specific number. Do not overwrite HomeTrue's effective rates with raw millage without first matching the taxable/assessed base, exact district, exemptions, and billing year.

## Launch verification campaign | 62-market threshold

**User's current threshold:** 62 out of 124 markets must clear all release checks. As of the November 17, 2026 research pass: **0/124 fully launch certified**, **15/124 have at least one documented official tax-rate component**, **33 official 2026/27 jurisdiction-rate evidence rows** (some are multiple entries for one market). State-level exemptions and a published rate alone do NOT pass a market.

[Full 124-market gate-by-gate audit](audits/HomeTrue-2027-launch-verification-gates.csv) | [Official jurisdiction-rate evidence](audits/HomeTrue-2026-27-official-jurisdiction-evidence.csv)

**Five mandatory gates for each market:**
1. Official rate applicable to the relevant 2027 planning period, or clearly dated last-adopted rate (with conditional 2027 status).
2. Correct geographic district, municipality, school/special levies and assessment base matched to the property scenario.
3. Exemption law, buyer eligibility and effective tax/filing year modeled, including rental/primary-residence distinctions.
4. Calculations reconciled against official county tax examples or representative actual parcel tax statements, with documented tests and expected values.
5. Correct customer-facing preview and PDF disclosure of uncertain inputs, closing-year adjustments and caveats.

A state county rate or effective-rate estimate alone does not pass these gates.

### Newly verified official jurisdiction information
- **Wake County, NC:** 2026 county rate $0.5371/$100 of assessed value; Raleigh municipal $0.3720; Cary $0.3675; Apex $0.3735; Holly Springs $0.3435. **These municipal rates are additions to the county rate** and the source warns fire/RTP district levies may apply. [Wake County PDF](https://s3.us-west-1.amazonaws.com/wakegov.com.if-us-west-1/s3fs-public/documents/2026-06/Tax%20Rates_Current%20to%202017.pdf). Rate year 2026, FY period 2026-27; no claim that the 2027-28 levy has been adopted.
- **Durham County, NC:** FY 2026-27 county $0.5792; Durham City combined $1.0163; Chapel Hill (Durham side) combined $1.0792; specific fire-service districts have other rates. [County detailed tax table](https://dconc.gov/Tax-Administration/Payment-Options-and-Collections/Tax-Rates1).
- **Guilford County, NC:** FY 2026-27 county tax $0.7895; High Point jurisdiction code 02 combined $1.5244 per $100; other rate codes vary. [Guilford published rate-code schedule](https://www.guilfordcountync.gov/index.php/government/departments-and-agencies/tax-department/2026-2027-tax-property-rates).
- **Virginia:** 2026-27 official base rates per $100 assessed: Henrico $0.83 (some special districts add), Chesterfield $0.89, Hanover $0.81, Virginia Beach $0.97 (SSD rates differ), Chesapeake $1.01 (including mosquito control), Norfolk $1.23, Suffolk $1.06 citywide (Downtown $1.165; Route 17 $1.30). Details and direct primary links are in evidence CSV. HomeTrue's preexisting rates differ materially in some of these places.
- **Utah 2027 PRIMARY RESIDENTIAL EXEMPTION:** 45% of qualifying fair market value is exempt and new owners beginning January 1, 2027 must file Form TC-473A to claim/continue the exemption, due September 15. The saved HomeTrue "he:0" fields in all four Utah markets cannot represent this reliably. [Utah Tax Commission](https://tax.utah.gov/propertytax/tax-relief/primary-residential-exemption/).
- **Nevada Clark District 200:** officially listed FY 2026-27 **3.2782 per $100 assessed**. Corrected an initial unconfirmed transcription in evidence register to this official value; never use it as 3.2782% of the purchase price. [Treasurer's tax district details](https://treasurer.co.clark.nv.us/TaxRate-District/tcaDetails.aspx?fy=20262027&tca=200+++++++).

**Do not merge:** Rates cannot be blindly copied from official tax tables into `tr` until their assessment base and applicability are modeled. No market certification achieved on this pass.

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
