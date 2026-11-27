# HomeTrue Florida Calculator Check (Batch 1, 7 markets)

Date: 2026-11-27
Product code changed: none

## 1. Arithmetic: PASS
The app computes annual tax as purchase price x selected district rate (collectInp: annualTax1 = price * MKT.tr). All 123 Florida options labeled tax year 2026 carry the verified millage/1000. Rates for all 7 counties matched official 2026 sources on 2026-11-26 (see the outside research check).

## 2. Method vs official Property Appraiser estimators: TWO GAPS

### Gap A: assessed value basis (app likely overstates)
- The app taxes 100% of purchase price.
- Florida law (s. 193.011(1), F.S.) sets just value as what a willing buyer pays "exclusive of reasonable fees and costs of purchase."
- Pinellas PA's estimator (not a Batch 1 county, cited for method) assumes just value at 85% of purchase price.
- Polk PA's estimator deliberately uses 100% to show the maximum.
- Not yet confirmed: which basis each of the 7 Batch 1 PA estimators uses. They are interactive forms that cannot be read by fetch.
- Size: if a county values at 85%, the app's ad valorem estimate runs about 17.6% high (1/0.85).

### Gap B: non-ad valorem assessments (app understates)
- The app excludes non-ad valorem charges (solid waste, stormwater, fire, drainage). The county notes say so.
- Real bills include them. Broward PA's FAQ names fire/rescue, waste and drainage fees. Brevard's estimator shows a separate non-ad valorem line. Martin's estimator excludes them and warns they are added to the bill.
- Size: varies by parcel and city. Not measured yet.

The gaps run in opposite directions. They do not cancel reliably.

## 3. Status
- calculator_scenario_tests_passed stays FALSE for all 7 Florida markets.
- Needed: (1) A2 decision on the value basis (100% conservative vs. the county's own method) and on non-ad valorem handling (exclude and label, or add county/city fee amounts); (2) a run of each county's official estimator at fixed test prices in a browser, recorded with screenshots.

## Update 2026-11-27 (05:00): value basis per county, from official estimator pages

| County | Official estimator value basis | Non-ad valorem in estimator |
|---|---|---|
| Broward | Purchase price as entered ("based upon the tax rates currently available and the purchase price you have entered") | Excluded: "Fire, Garbage, Light, Drainage, Improvement or Safe Neighborhood Assessment" |
| Palm Beach | Purchase price as entered (FAQ: "Enter your purchase price") | Not stated |
| Martin | Market value from qualified sales; may be "higher or lower than what you paid" | Excluded; "must be added" for full taxes |
| St. Lucie | Assumes assessed value equals market value; resets to full market value on sale. The page cites 2024 millage (stale) | Not stated |
| Miami-Dade | Parcel-specific, from 2026 roll values; no purchase-price rule stated | Appears included, with a caveat for new parcels |
| Brevard | Not stated on the page | Shown as a separate line |
| Indian River | Estimator page not readable | Tax Collector: bill combines ad valorem and non-ad valorem (e.g. solid waste) |

Finding: no Batch 1 Florida source states a percentage discount (Pinellas 85% and Lake 90% are other counties). Broward and Palm Beach tax the purchase price as entered. Applying an unsourced discount would be an estimate, so the app's 100%-of-price basis STAYS. Gap A closes for value basis; the label already says actual values vary.

Gap B (non-ad valorem fees) stays OPEN. Next: collect official 2026 non-ad valorem schedules by district/city for the 7 counties.

## Update 2026-11-27 (05:15): non-ad valorem (fee) research, first pass

Sample official findings (not yet entered anywhere):
- Miami-Dade: residential solid waste collection fee $702 per household in the county Waste Collection Service Area; the FY 2026-27 budget keeps it at $702 (DSWM). Applies to unincorporated areas and participating cities only.
- Port St. Lucie: stormwater $195 residential (FY 26/27 proposed budget-in-brief); the FY 25/26 solid waste fee was $467.33, and council approved a FY 26/27 increase (final amount not yet confirmed from an official source).
- Indian River: 2026 solid waste landfill $125.06 per waste generation unit (PA notice of non-ad valorem assessments); the universal waste collection rate is not yet captured.
- Broward: fees are city-specific (the Tax Collector lists fire, solid waste and stormwater by city, e.g. Davie: fire, solid waste and stormwater).
- Brevard: county solid waste disposal, stormwater by commission district, and city fees (e.g. Palm Bay fire).

Structural finding: fees vary by city, service area and often by parcel (stormwater by impervious area, fire by square footage, special districts). A per-city table cannot be exact for every home. The only exact source is the parcel's own non-ad valorem line on the current tax roll, which needs the address lookup.

Existing app capability: the optional "Projected annual property tax for this buyer" input already tells buyers to include solid waste, stormwater, streetlight and other non-ad valorem charges.

Decision needed from A2 (see the report to A2 dated 2026-11-27).
