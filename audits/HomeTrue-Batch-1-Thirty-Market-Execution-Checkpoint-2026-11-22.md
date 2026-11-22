# HomeTrue Batch 1: thirty-market execution checkpoint, November 22, 2026

Scope: original Batch 1 FL 7, GA 14, AL 4, SC 5 = **30 markets**, with **Dorchester County SC expressly deferred**. Do not merge or deploy from this checkpoint.

## Direct reconciliation performed
- Source file: `audits/HomeTrue-2027-launch-verification-gates.csv`, reviewed against branch `tax-corrections-audit-nov-2026`.
- Inventory contains 124 records, 31 original Batch 1 records, and 30 included records after excluding the single `dorchester-sc` record.
- 30/30 have `batch1_local_case_documented=true`.
- 30/30 have `batch1_current_year_district_case_documented=true`.
- 30/30 have `batch1_main_buyer_district_correction_documented=true`.
- 0/30 have `complete_composite_2027_rate_verified=true`.
- 0/30 have `exemption_rules_and_eligibility_verified=true`.
- 0/30 have `district_geography_verified=true`.
- 0/30 have `calculator_scenario_tests_passed=true`.
- 0/30 have `full_launch_certified=true`.

**Interpretation:** Existing 2026 rate work is substantive but does not establish complete district coverage, 2027 property-specific rates, or legally applicable net homeowner taxes.

## Buyer-code finding
On the reviewed branch `platform.html`:
- `renderDistrictPills` chooses `selectableDistricts[0]` automatically whenever more than one non-legacy district exists and no explicit `preferredDistrictId` is supplied.
- `selectDistrict` writes that selected district rate directly into `MKT.tr`.
- `collectInp` then calculates `annualTax1 = buyerAnnualTax ?? price * MKT.tr`.
- Therefore a county with multiple options can calculate a planning tax against an arbitrary first district choice without parcel-to-district verification. Separately, `setCounty` seeds `MKT.tr = c.tr`, including when no specific district is selected.
- **Action still required:** establish an explicit, user-verifiable district confirmation or prominently labeled county-only non-parcel scenario; verify shared-link restoration and all tax outputs. Do not merely remove auto-selection without updating downstream calculator and report behavior.

## Regression execution infrastructure committed
- `tests/hometrue-batch1-excluding-dorchester-gate.js`: 30-market gate; intentionally exits nonzero while any required certification flag is absent. It has not been misrepresented as a pass.
- `.github/workflows/batch1-thirty-financial-audit.yml`: non-deployment workflow to run 24 previously documented Node regression scripts excluding Dorchester and archive per-script logs; separately report the expected blocked certification gate.
- GitHub commits: `21b576b1ea968b171523a99405de771b073b9e0b` and `9dc45f4967cbfb12c0d1b53b3fc918b072a8d7fd`.
- **Execution verification:** GitHub connector's commit-workflow lookup returned no pull-request-triggered run for the workflow commit. That endpoint is limited to PR-triggered runs, so the result does not establish whether a push-triggered run exists. Consequently no regression PASS/FAIL tally or browser/PDF outcome is asserted here.

## Conditions for actual thirty-market signoff
1. Retrieve recorded GitHub regression logs and repair failures.
2. Correct or constrain arbitrary district selection, prove parcel mapping and buyer/sharable report calculations.
3. Confirm applicable assessed-value rules, exemptions, net taxes, closing and district fees, effective years (especially 2027 projections versus final 2026 rates).
4. Execute fictional buyer scenario checks, browser UI and PDF/shared-report tests for every included market.
5. Record market-by-market primary source, applicable jurisdiction, expected versus actual result, and independent review decision in the gate register. Set a market's certification true only after all its checks pass.

**Decision at checkpoint:** 30/30 documented rate work, 0/30 full financial certifications. Dorchester deferred, not waived. Production unchanged.