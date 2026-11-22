# Palm Beach County, Florida: independently checked final 2026 municipal levy components

**Batch 1 review only, November 22, 2026. This is NOT certification of municipal composites or buyer tax bills.**

Primary source: Palm Beach County Property Appraiser, [2026 Final vs Proposed Millage Rates](https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf), published through the official [Tax Roll Information](https://pbcpao.gov/tax-roll.htm) page. The final column is explicitly **2026 Final Millage Rate**, not the proposed column or a 2027 calendar rate. Millage applies per $1,000 of the corresponding taxable assessed value, not automatically to the purchase price.

| Existing HomeTrue planning option | 2026 final city operating mills | 2026 city debt-service mills | Other location-dependent authority | Financial treatment |
|---|---:|---:|---|---|
| `pb-wpb` West Palm Beach | 8.0803 | 0.0533 | WPB Downtown Development Authority 0.9700 mills only in applicable DDA district | Existing `tr:0.0128` is an unverified blended planning rate; do not relabel 2026 |
| `pb-boca` Boca Raton | 3.6476 | 0.0163 | Boca Beach & Park authority 1.0331 mills where applicable | Existing `tr:0.0115` is unverified; require tax-code/parcel mapping |
| `pb-boynton` Boynton Beach | 7.2052 | Not separately listed on final chart | Fire, library, drainage and other taxing authorities depend on the parcel | Existing `tr:0.0120` unverified |
| `pb-delray` Delray Beach | 6.3501 | 0.0289 | Delray Beach DDA 1.0000 mills only in the applicable district | Existing `tr:0.0118` unverified |
| `pb-wellington` Wellington | 2.4700 | Not separately listed on final chart | Other services, school and special tax districts depend on the parcel | Existing `tr:0.0105` unverified |

Also evidenced on official 2026 chart: Palm Beach County 4.5000 county operating mills; 0.0210 county debt; school-state 3.0390; school-local 3.2480; other countywide and geographic authorities listed. The already documented 16.2192-mill **standard unincorporated** composite is a distinct jurisdiction example, not a base that can blindly be applied to each city: incorporated parcels may have different county Fire/Rescue, library, water-management and other levies. Use the property appraiser's **Total Certified Millage Rate** for the exact parcel or a complete code-to-authority mapping before calculating a final municipal composite.

**Follow-through:** Do not promote the five legacy municipal `tr` planning factors to tax-year 2026. They remain blocked as an independently confirmed tax basis for new Batch 1 calculations unless a buyer enters an authoritative annual tax projection. Future source reconciliation must separately establish each complete parcel-code composite, school/non-school levy allocation for 2027 homestead rules, and non-ad-valorem charges. Buyer exemption eligibility is not established here. Full Palm Beach market certification stays false.
