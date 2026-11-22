# Batch 1 rate-year certification: authorization recorded
**Scope:** FL 7, GA 14, AL 4, SC 5 = 30 markets. Dorchester deferred.

The existing release register requires `complete_composite_2027_rate_verified=true` for every market. At this November 22, 2026 checkpoint, an official complete **tax-year 2027** local composite has **not** been verified for any of the thirty markets. Fiscal-year **2026–27** documents and adopted **tax-year 2026** rates must not automatically be relabeled as tax-year 2027.

## Approved rate-year policy (user authorized November 22, 2026)

The project owner expressly authorized using **the latest officially adopted applicable property-tax rates**, with the actual **tax year clearly identified**, until corresponding 2027 rates are officially adopted and verified. This authorization applies to Batch 1's 30 markets, excludes deferred Dorchester, and permits updating to newer adopted rates when verified. It is a permission to use real, older-year rates transparently, not permission to treat pending rates as adopted.

**Required presentation:** cite the adopted tax year and jurisdiction of each component; identify any relevant district and unresolved geographical mapping; disclose missing levies, credits, exemptions, special assessments or fees; do not describe a rate as applicable to a specific buyer without source-backed eligibility and location data. Never present 2026 rates as 2027.

**Certification implementation:** retain `complete_composite_2027_rate_verified` as a historical literal-year field (no retroactive alteration). Add a separate `batch1_latest_adopted_composite_verified` field, initially **false** across all 124 markets. For the authorized 30-market gate, replace the obsolete requirement to certify a 2027-only composite with verified **latest-adopted-period composite** for the actual district, including effective date and evidence. All other previously established market and buyer financial gates remain mandatory. No market is auto-certified by this decision.

## Other financial baseline reconciled in this pass
Official Freddie Mac PMMS November 19, 2026 national 30-year fixed benchmark **7.28%** (https://www.freddiemac.com/pmms), independently matched to current production code. Audit branch prior 7.11% was stale; changed to 7.28% and the associated approved internal planning range 7.03%–7.67%. This is a mortgage-rate **benchmark**, not a published borrower quote or a local property tax rate.

## Test evidence
Run https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45028414287 verified **32/32 Node scripts** including **90 synthetic buyer input cases** in 30 markets, **30/30 real three-page PDF-generation cases**, and **30/30 real browser shared-report cases**. Buyer input tests do not prove local exemptions, credits and parcel tax rules.

Status: 0/30 complete market financial certifications. No production deployment or merge.
