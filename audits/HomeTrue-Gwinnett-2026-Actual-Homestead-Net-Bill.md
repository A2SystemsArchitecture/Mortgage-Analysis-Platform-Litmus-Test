# Gwinnett 2026 issued homeowner homestead bill: actual net-liability reconciliation

**Evidence checked November 23, 2026. Official issuing source:** Gwinnett County Tax Commissioner, actual 2026 parcel R3001A188 [official tax notice](https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf). Residential, unincorporated, owner classified under **S1R** on issued bill. This property is a **specific existing owner's bill** and must not be treated as a new buyer's entitlement, assessment or actual projected tax.

The bill presents assessed value **$197,280**, corresponding to 40% of $493,200. The county and school use distinct taxable bases after eligibility-based reductions:

| Authority | Mills | Value offset | Homestead deduction | Grant base reduction | Remaining taxable assessment | 2026 billed net tax |
|---|---:|---:|---:|---:|---:|---:|
| County general | 6.950 | $69,240 | $10,000 | $18,000 | $100,040 | $695.28 |
| Development and code | 0.360 | $69,240 | $10,000 | $0 | $118,040 | $42.49 |
| Economic development | 0.300 | $69,240 | $10,000 | $0 | $118,040 | $35.41 |
| Fire and EMS | 3.200 | $69,240 | $10,000 | $0 | $118,040 | $377.73 |
| Police | 2.900 | $69,240 | $10,000 | $0 | $118,040 | $342.32 |
| Recreation | 1.000 | $69,240 | $7,000 | $18,000 | $103,040 | $103.04 |
| School operating | 18.700 | $0 | $8,000 | $18,000 | $171,280 | $3,202.94 |
| School bond | 1.450 | $0 | $0 | $0 | $197,280 | $286.06 |
| **County subtotal** | **14.710** | | | | | **$1,596.27** |
| **School subtotal** | **20.150** | | | | | **$3,489.00** |
| **Total ad valorem** | **34.860** | | | | | **$5,085.27** |

Other non-ad valorem assessments from this specific 2026 bill: **$300.12** solid waste ($25.01/month), **$98.40** stormwater (4,000 square feet at $2.46/100 square feet) and **$49.70** underground lighting ($0.70 per 71 feet). **Total $448.22**, producing an issued **$5,533.49 bill**.

The bill explicitly classifies savings **$293.70 homestead + $479.70 homeowner grant + $1,018.53 value offset = $1,791.93**. This is the realized existing-owner credit, not the generic hypothetical buyer discount. An important correctness constraint is that **school bond levies receive none of those sampled deductions** while school operating levies receive the sample's $8,000 homestead and $18,000 grant bases. Applying one generic deduction to every levy would miscalculate this bill.

The independent source test `tests/hometrue-gwinnett-2026-issued-homestead-net-bill.js` reproduces all eight taxable bases and billed tax line items, the county and school subtotals, special assessments and final bill. It is included in the 30-market regression workflow.

## What this establishes, and what remains open

**Established:** at least two different official 2026 unincorporated Gwinnett billed examples now exist in this audit: an appealed temporary no-exemption bill, and this owner-occupied credit-bearing bill. Their separate county/school levies, fee schedules and rounded net totals are reproducible from the original issuer's records.

**Unresolved:** an arbitrary buyer's eligibility, transfer of exemption/value-offset base, 2027 HTRG treatment, all county/city tax jurisdictions, stormwater/lighting frontage and service account, 2027 adopted levies, legal closing charge allocation, and actual UI/report/PDF net-tax modeling for each unique parcel. None of the final financial certification flags may be advanced from these two limited examples. Dorchester excluded; audit branch only; production unchanged.
