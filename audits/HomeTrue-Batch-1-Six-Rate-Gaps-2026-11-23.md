# HomeTrue Batch 1: six open adopted-composite gates (November 23, 2026)

Branch: `tax-corrections-audit-nov-2026`. Scope: FL, GA, AL, SC, 30 markets, Dorchester excluded. No release or production changes. This is source triage, NOT adoption certification.

Controlling register: `audits/HomeTrue-2027-launch-verification-gates.csv`. The six records below are **false** for `batch1_latest_adopted_composite_verified`; do not set them true merely from a partial authority rate, fictional calculation, budget proposal, or nonresidential tax bill.

| Market | Verified partial evidence | Exact missing evidence for market-wide rate gate |
|---|---|---|
| Palm Beach FL | PBC Property Appraiser final/proposed tax-roll rate charts exist; audit branch already documents standard unincorporated 2026 rate 16.2192 mills | Reconcile every buyer-selectable city/parcel taxing district against final adopted 2026 tax-code composites, not only the standard unincorporated example; preserve year-unknown selectors as unsupported. Official index: https://pbcpao.gov/tax-roll.htm |
| Fulton GA | 2026 county and selected North Fulton city/school elements plus four city compositions partially reconciled | Full rate compositions for Atlanta and historic generic options, with correct independent school authority and parcel-specific overlays. Fulton Nov 2026 supplemental school resolution: https://fulton.legistar.com/LegislationDetail.aspx?GUID=9B3C735E-0EB5-4951-A5DC-B16F55C0E077&ID=8305262&Options=&Search= |
| Gwinnett GA | County Tax Commissioner confirms 2026 county/school composite options separately from city-billed rates; Lawrenceville city component previously reconciled | Obtain final adopted **2026** municipal enactments/bills for Suwanee and Duluth, check distinct county and city taxable bases/credits, then re-run named district scenarios. Official county chart: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates ; city tax explanation: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes |
| Forsyth GA | Official issued 2026 tax bill supplies 24.458 mills for non-exempt **commercial** district 001 | Residential applicability, other buyer-selectable municipal/local districts, all required city and school/service elements. A commercial bill is not a county-wide homeowner composite. Existing bill reference in verification ledger. |
| Dawson GA | Official issued 2026 **commercial** district 001 bill identifies 16.263 mills net county+school | Residential-specific sources, other district/city options, and full district coverage; commercial bill alone is not market-wide certification. Existing bill reference in verification ledger. |
| Lumpkin GA | Official issued 2026 Dahlonega **county-owned** property bill documents one district | Verify standard taxable residential parcel levy, Dahlonega vs unincorporated differences and all buyer-selectable district options; exempt/public property bill not enough. Existing bill reference in verification ledger. |

## Critical source-year classification

- Suwanee city Sept 2, 2026 budget news **explicitly called 4.93 mills proposed**, with council adoption expected Sept 22. It is **not an adopted-rate ordinance**: https://www.suwanee.com/Home/Components/News/News/1230/159 . Current city property-tax page says 4.93 mills but does not itself establish the final 2026 ordinance or adopted meeting vote: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes . Do not automatically mark the 2026 source-year verified from a budget assumption.
- Gwinnett county chart identifies separately billed county/school rates. Never add or omit municipal levies because two districts happen to yield the same combined numeric rate: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates .
- A third-party report describes Duluth Ordinance O2026-37 as adopting **6.551 mills** on Aug 24, 2026, but primary adopted ordinance/minutes were not independently retrieved in this pass. Treat as **lead only** pending primary evidence: https://citizenportal.ai/articles/11051498/georgia/gwinnett-county/duluth-city/city-of-duluth-adopts-2026-millage-rate-at-6551-mills .
- Fulton County November supplemental school-rate action corroborates that 2026 final school-rate evidence requires the right adoption source. A proposal or temporary bill using 2025 rates cannot satisfy the 2026 gate.

## Enforcement

Maintain all six flags false until verified. No claims of 30/30 certified. Thirty-market full financial certification remains **0/30** in the reviewed register: exemptions/eligibility, parcel geography, buyer scenario certification, and final signoff are each 0/30. Following an authoritative code correction, rerun all applicable Node, PDF, and browser regressions and save run artifacts. The financial release gate must remain blocking throughout.

## November 23 official Palm Beach final-vs-proposed authority reconciliation

Direct Palm Beach Property Appraiser **official 2026 FINAL** authority schedule, not the earlier proposed rate column: https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf . Confirmed municipality **authority components only** (not all-in parcel tax-code composites):

| Municipality | 2026 FINAL municipal mills | 2026 PROPOSED municipal mills | Certification consequence |
|---|---:|---:|---|
| West Palm Beach | 8.0803 | 8.1308 | Source final differs from proposal; city planning option still has unknown parcel code |
| Boca Raton | 3.6476 | 3.6476 | City component confirmed only |
| Boynton Beach | 7.2052 | 7.7500 | Source final differs from proposal |
| Delray Beach | 6.3501 | 6.4371 | Separate debt-service levy 0.0289; parcel applicability unknown |
| Wellington | 2.4700 | 2.4700 | City component confirmed only |

The same official chart supports 12 existing standard-unincorporated components totaling **16.2192 mills**. GitHub review rechecked the actual branch `platform.html` arithmetic and confirmed all five other named Palm Beach city options explicitly say tax code unverified/planning only and do **not** claim a verified 2026 tax year. Added `tests/hometrue-palm-beach-2026-final-vs-proposed-guard.js` to the Batch 1 CI suite so later edits cannot silently promote these city options. This is an official partial-source advance, **not** a complete 2026 parcel district-composite verification or final tax liability determination. Palm Beach's composite and all full financial gates remain false.

## November 23 Duluth and Suwanee adoption corroboration, primary proof still open

Public reports on Duluth August 24, 2026 meeting independently describe a five-to-zero council adoption of Ordinance O2026-37 at **6.551 city mills** (not the whole-property 2026 composite): https://citizenportal.ai/articles/11051498/georgia/gwinnett-county/duluth-city/city-of-duluth-adopts-2026-millage-rate-at-6551-mills and https://citizenportal.ai/articles/9591226/georgia/gwinnett-county/duluth-city/duluth-adopts-2026-tax-millage-at-6551-mills . The existing buyer code uses **6.551** but intentionally does not stamp it as officially verified for 2026. Retrieve the city-certified ordinance, adopted minutes, or official tax bill before changing this source-year status. Even after municipal adoption is verified, school/county boundaries, exemptions and separately assessed fees remain unverified.

Suwanee's **official September 2, 2026 announcement** explicitly calls **4.93 mills proposed** pending September 22 council action: https://www.suwanee.com/Home/Components/News/News/1230/159 . Its current property taxes page states 4.93 mills without providing an adoption-date document: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes . No signed September 22 adoption retrieved in this pass; do not stamp 2026 merely because the municipal site has a live rate.

**No production or market certification change justified from these leads.**
