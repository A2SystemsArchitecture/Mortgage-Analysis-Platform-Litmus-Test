# Batch 1 buyer annual tax input: verified additional-charge limitation

Reviewed November 23, 2026. No production changes, release, or certification promotion.

**Issue:** A district's gross ad valorem tax estimate cannot infer parcel-specific mandatory non-ad-valorem charges. Simply matching the county millage may understate the total property-tax bill. The buyer-supplied annual-tax field previously said fees needed verification but did **not directly instruct** buyers to include applicable annual tax-bill assessments without double-counting a cost already included elsewhere.

**Authoritative counterexample:** Gwinnett County Tax Commissioner's [2026 S1R residential issued bill R3001A188](https://www.gwinnetttaxcommissioner.com/PropTaxBill/R3001A188.pdf) has $5,085.27 ad valorem tax **and $448.22 in additional assessments**, total **$5,533.49**. The difference is not a change in the district tax rate; it is a set of individual property services/assessments. Other properties have different fees and exemption histories.

**Actual audit-branch user-facing correction:** The input note for `f-annual-buyer-tax` now explains that a buyer's authoritative annual projection should incorporate applicable solid waste, stormwater, streetlight and other property-bill assessments *unless already counted in another HomeTrue cost line*. It specifically warns against copying a seller's exemptions, credits or assessed-value offsets. Ordinary rate-based district projections **do not automatically include** those charges.

**Regression:** `tests/hometrue-batch1-buyer-parcel-fees-input-disclosure.js` verifies the actual buyer-field language, numerical separation, and exact-cent input acceptance. CI workflow runs this test alongside market arithmetic, PDF and browser regressions.

**Important limit:** This corrects dangerous omission in explanatory guidance, but is **not** automatic individualized non-ad-valorem fee calculation. Real cost inclusion still depends on property bill/assessment data and verified buyer eligibility. No certification flags can be advanced from this wording correction. Dorchester deferred.
