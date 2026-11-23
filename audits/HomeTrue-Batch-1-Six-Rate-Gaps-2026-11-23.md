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
