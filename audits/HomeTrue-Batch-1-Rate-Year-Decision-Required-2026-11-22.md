# Batch 1 rate-year certification: policy decision required, not a waiver
**Scope:** FL 7, GA 14, AL 4, SC 5 = 30 markets. Dorchester deferred.

The existing release register requires `complete_composite_2027_rate_verified=true` for every market. At this November 22, 2026 checkpoint, an official complete **tax-year 2027** local composite has **not** been verified for any of the thirty markets. Fiscal-year **2026–27** documents and adopted **tax-year 2026** rates must not automatically be relabeled as tax-year 2027.

## Proposed decision for explicit project-owner authorization, not applied
May the launch present the **latest officially adopted applicable tax-year rate** (normally 2026 in a January 2027 launch), with the **source tax year, specific district, known exclusions, homeowner eligibility and separate fees** prominently labeled, and switch to subsequently adopted 2027 rates when verified?

Until the owner affirmatively authorizes a revised *rate-year criterion*, the present `complete_composite_2027_rate_verified` certification flag remains **false**, and no source-backed 2026 tax rate is represented as a verified tax-year 2027 rate. Even if the rate-year policy is approved, it does **not** waive actual district/parcel mapping, exemption rules, fee accuracy, end-to-end calculations, independent review or market-by-market sign-off.

## Other financial baseline reconciled in this pass
Official Freddie Mac PMMS November 19, 2026 national 30-year fixed benchmark **7.28%** (https://www.freddiemac.com/pmms), independently matched to current production code. Audit branch prior 7.11% was stale; changed to 7.28% and the associated approved internal planning range 7.03%–7.67%. This is a mortgage-rate **benchmark**, not a published borrower quote or a local property tax rate.

## Test evidence
Run https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45028414287 verified **32/32 Node scripts** including **90 synthetic buyer input cases** in 30 markets, **30/30 real three-page PDF-generation cases**, and **30/30 real browser shared-report cases**. Buyer input tests do not prove local exemptions, credits and parcel tax rules.

Status: 0/30 complete market financial certifications. No production deployment or merge.
