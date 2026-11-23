# Gwinnett County, Georgia: 2026 issued real-property tax notice reconciliation

Reviewed 2026-11-23. Financial case evidence, **not county-wide financial certification**. Official issuer: Gwinnett County Tax Commissioner.

Primary issued bill: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R6174%20203.pdf . Tax year **2026**, parcel reference **R6174 203**, district **County Unincorporated**. The issuer explicitly marks this a **temporary bill because the property's value is under appeal**. Do not use this as proof of a final assessment or of a different parcel's rate, assessed base, exemption, district or fees. No homestead exemption/credit is shown on this example.

| Reconciled billed field | Source amount |
|---|---:|
| Total appraised value | $243,400.00 |
| Assessed value, 40% | $97,360.00 |
| County levies, 14.710 mills | $1,432.16 |
| School levies, 20.150 mills | $1,961.80 |
| **Ad valorem, 34.860 mills** | **$3,393.96** |
| Solid waste, $25.01 × 12 months | $300.12 |
| Residential lights, $0.55 × 70 feet | $38.50 |
| Stormwater, $2.46 per 100 square feet × 2,000 square feet | $49.20 |
| **Non-ad-valorem assessments** | **$387.82** |
| **Total billed** | **$3,781.78** |

### Important rounding and financial accuracy implication

Applying the 34.860-mill *combined* rate directly to $97,360 yields $3,393.9696, or **$3,393.97** when rounded only at the end. The issued bill instead sums individually rounded taxing-authority tax amounts and shows **$3,393.96**. This is a one-cent line-item rounding difference, **not** evidence of a wrong composite rate. The test intentionally protects both the correct 34.860-mill source factor and the actual issued $3,393.96 tax amount.

The $387.82 extra assessments depend on this parcel's waste account, light frontage and impervious surface. They must **not** be multiplied by its property value or applied as a flat charge to every Gwinnett buyer. An estimate that silently excludes them can materially understate the total bill, even if the millage computation is arithmetically correct.

### Code, test and remaining limits

CI test: `tests/hometrue-gwinnett-2026-issued-bill-fee-reconciliation.js`. It independently checks eight authority line items, the county and school subtotals, assessments, final amount and one-cent rounding difference against the already coded `gwin-uninc` rate.

This advances **one real 2026 unincorporated no-exemption temporary tax-bill and fees scenario**, not: a complete municipal district map, all property categories, actual new-buyer homestead eligibility, school/city taxable base differences, age-based relief, pending appeals, prospective 2027 levies, all closing fees or final shared-report/PDF financial accuracy. Gwinnett full certification and all other outstanding 30-market gates remain **false**. Dorchester remains excluded; do not deploy.
