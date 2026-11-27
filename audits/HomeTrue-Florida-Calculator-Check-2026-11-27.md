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
