# HomeTrue Batch 1 verification ledger

Scope: Florida, Georgia, Alabama and South Carolina. Inventory reconciled to all 31 entries in the existing launch register. This ledger captures the saved work and open items from the current draft. It does not assert that every applicable law or levy has been identified.

## Measured progress

| Checkpoint | Passed / scope | What the count measures |
|---|---:|---|
| State with tested standalone property-tax rules | 4 / 4 | At least one rule for each state. No implication about remaining rules. |
| Market with an evidenced local property-tax calculation exercised | 9 / 31 (29.0%) | Miami-Dade, Gwinnett, Cobb, Forsyth, Shelby, Charleston, Berkeley, York and Dorchester. Historical cases count and are identified below. |
| Market with an evidenced current-year district property-tax calculation exercised | 5 / 31 (16.1%) | Miami-Dade, Gwinnett, Charleston, Berkeley and York. This includes standalone cases. |
| Market with an evidenced district correction in main buyer flow | 2 / 31 (6.5%) | Six Miami-Dade and four Gwinnett pre-exemption base districts. |
| Market with full financial sign-off | 0 / 31 | Full rule, market and buyer-output reconciliation. |
| State with full financial sign-off | 0 / 4 | Full statewide and local financial reconciliation. |

These percentages describe distinct milestones. They are not an overall audit completion percentage.

## State rule checklist

| State | Tested or evidenced in draft | Still open |
|---|---|---|
| FL | 2026 and 2027 standalone homestead by levy group; selected deed and mortgage stamps, intangible tax and original title-premium cases | Confirm final applicable district levies, assessed bases and exemptions; closing exceptions, allocations and recording charges; bring verified eligibility and amounts into main totals |
| GA | 40% and standard homestead scenario; Cobb standalone deduction; four Gwinnett main baselines; transfer and intangible tax cases | Local and year-specific floating relief, grant and levy applicability; complete district schedules; buyer recording charges and main totals |
| AL | 10% Class III and H-1 scenario; historic Shelby benchmark; selected deed and mortgage recordation cases | Current local millage, remaining exemption categories, eligibility, recording fees and main totals |
| SC | 4% and 6% and school operating relief scenarios; selected local credits and fees; deed fee threshold and increments | Parcel matching, levy credits and fees, age/disability and other applicable relief, closing allocations and recording fees, main totals |

[Closing charge evidence](HomeTrue-Batch-1-Closing-Charges-Checkpoint.md) · [State homestead evidence](HomeTrue-Batch-1-State-Homestead-Checkpoint.md)

## Market checkpoints

| State | Market | Evidence and open work |
|---|---|---|
| FL | Miami-Dade County | Six adopted 2026 base district rates feed the main pre-exemption estimate. The unincorporated standard homestead calculation passed separately. Parcel overlays, exemptions, fees and 2027 levies remain open. [Tests](../tests/hometrue-miami-dade-2026-districts.js) |
| FL | Broward County | Closing charges benchmarked. District and buyer property tax open. |
| FL | Palm Beach County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| FL | Martin County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| FL | St. Lucie County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| FL | Indian River County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| FL | Brevard County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Fulton County | County operating levy evidence and closing cases saved. Complete school, municipal and special levies open. |
| GA | DeKalb County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Gwinnett County | Four named 2026 base districts feed main pre-exemption estimate. Exemptions, overlays and bill totals open. [Tests](../tests/hometrue-batch1-state-tax-scenarios.js) |
| GA | Cobb County | 2025 ordinary unincorporated benchmark and standalone basic homestead deduction tested. Final 2026 rates open. [Checkpoint](HomeTrue-Cobb-Local-Reconciliation.md) |
| GA | Cherokee County | Earlier register records official components. Complete levies, eligibility and buyer totals open. |
| GA | Forsyth County | 2025 benchmark and official local exemption guidance checked. Final 2026 rates and local exemption calculation open. [Checkpoint](HomeTrue-Forsyth-Cumming-Local-Reconciliation.md) |
| GA | Clayton County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Hall County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Dawson County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Paulding County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Pickens County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Lumpkin County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Richmond County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| GA | Columbia County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| SC | Charleston County | 23 official 2026 levy groups, optional published sales-tax credits and official $1,052.80 sample matched in standalone flow. Parcel fees and main report integration open. [Tests](../tests/hometrue-charleston-2026-sales-tax-credit.js) |
| SC | Richland County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| SC | Greenville County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| SC | York County | 35 official 2026 levy groups exercised in standalone flow. Parcel matching, remaining credits and fees, and main report integration open. [Tests](../tests/hometrue-york-2026-levies.js) |
| SC | Berkeley County | 13 official 2026–27 levy groups, optional sales-tax credits and $545.98 sample matched in standalone flow. Parcel fees and main report integration open. [Tests](../tests/hometrue-berkeley-2026-sales-tax-credit.js) |
| SC | Dorchester County | 14 historical 2025 district rows exercised in standalone flow. Current rates and main report integration open. [Tests](../tests/hometrue-dorchester-2025-levies.js) |
| AL | Jefferson County | Closing charges benchmarked. Local property-tax rates and buyer totals open. |
| AL | Madison County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |
| AL | Shelby County | Historical Montevallo H-1 example matched. Current rates and eligibility scenarios open. [Checkpoint](HomeTrue-Gwinnett-Shelby-Local-Reconciliation.md) |
| AL | Limestone County | No locally reconciled property-tax case documented in this ledger. Verify district rates, qualifications, fees and buyer totals. |

## Main buyer totals

- `collectInp` and `checkShareURL` use the selected market/district planning multiplier and round the monthly property-tax estimate to a whole dollar. The affordability path likewise uses the selected planning multiplier. The standalone tax-guide output does not feed these paths.
- The four Gwinnett district baselines use verified 2026 rate components but remain pre-exemption estimates. Existing report labels and annualization should be checked in the same buyer case when bringing verified inputs into the main flow.
- To close a market, match the parcel/district and tax year, verify assessments and applicable relief, reconcile closing fees and credits, then compare expected main report, affordability and shared outputs with independently calculated totals.
- Record a verified result, source and test for each rule or district as the inventory is refined. Keep final sign-off distinct from ordinary progress.

Draft branch only.
