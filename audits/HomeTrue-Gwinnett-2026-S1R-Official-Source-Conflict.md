# Gwinnett 2026 S1R source conflict and authoritative resolution

Checked November 23, 2026. **Source discrepancy with potentially material buyer-tax effect.** No certification flags advanced.

## Conflicting official public descriptions

1. **Gwinnett County Tax Commissioner**, source updated July 17, 2026, directly administers exemptions and bills: https://www.gwinnetttaxcommissioner.com/pt/property-tax/available-exemptions . S1R regular exemption: **$10,000** assessed value on county, **$8,000** on school, **$7,000** on recreation, for qualified owners occupying January 1; county exemption does not automatically mean school-bond relief. Tax Commissioner explicitly states the current-year filing deadline is the **assessment notice appeal deadline**, not always April 1.
2. **Gwinnett County Government citizen-finance guide**, a less specific explanatory page: https://www.gwinnettcounty.com/government/citizen-finance-guide/property . Its S1R paragraph still says **$4,000** off the school assessed value, while agreeing on $10,000 county and $7,000 recreation. The governmental pages are inconsistent as retrieved November 23.
3. **Actual original issued 2026 S1R property-tax bill** R3001A188: https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf . The school-operating column explicitly deducts **$8,000** assessed value, consistent with the Tax Commissioner's current exemptions page, not the stale county summary. Source also shows an additional $18,000 homeowner grant for its specific owner and *no school-bond homestead reduction* for that S1R bill.

## Independent reconciliation and impact

- At **18.700 school operating mills**, the contradictory difference of **$4,000** in taxable assessed school value is **$74.80 per year**, or approximately **$6.23 per month**, *assuming* the same applicable levy and that the taxpayer actually qualifies. This is not a promised saving.
- Use the issuing Tax Commissioner's current **$8,000** S1R school-operating deduction as controlling evidence for a validated eligible **2026** scenario and preserve the exact source year.
- **Do not** use the older $4,000 generic county-guide figure or automatically apply either figure without verified parcel tax district, owner qualification and school authority. No buyer eligibility assumption is justified merely from the county or a seller's tax bill.
- Existing audit-branch county notes already use the correct $8,000 school assessed reduction. The source-level discrepancy is preserved here as an explicit regression risk, not concealed.

## Executable protection

`tests/hometrue-gwinnett-2026-s1r-authority-discrepancy-guard.js` verifies the 2026 school deduction and its annual/$4000 discrepancy arithmetic, 2026 S1R source labels and exclusion of school-bond automatic relief in actual HomeTrue buyer guidance. The previous actual S1R tax-bill case already reconciles every official line, including this $8,000 school deduction.

**Remaining**: local levy and parcel eligibility across all cities/special districts, alternative exemption types, owner-specific VOE, future relief, buyer inputs and shared/PDF net-liability certification. Gwinnett full market certification remains false. No production change or release authorization.
