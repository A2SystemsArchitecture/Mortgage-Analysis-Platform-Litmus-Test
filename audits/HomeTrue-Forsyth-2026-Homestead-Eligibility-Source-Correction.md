# Forsyth County, Georgia: official homestead classification and filing-window correction

Checked 2026-11-23. Primary source: Forsyth County Board of Assessors' current published Homestead & Other Exemptions guidance, https://www.forsythco.com/departments-offices/board-of-assessors/homestead-exemption .

## Verified official rule distinctions

1. Ordinary owner-occupied homestead: qualified owners holding/residing in the county property as their principal residence on January 1 may qualify. The **regular** local exemption reduces eligible **county maintenance and operations and fire** assessed taxable value by **$8,000**; the assessor says applicable **school and state** portions receive a **$2,000** assessed-value reduction. The amounts are **levy-specific**, not a single dollar discount against a buyer's whole tax bill.
2. County floating homestead/value-offset relief is a separate assessment-base benefit based on the qualified owner's base year and subsequent value increases, not a guaranteed fixed dollar reduction for a new buyer.
3. Age 65 school relief, income-sensitive age 62 relief, veterans, disability and HB 717 school exemption are separate categories with eligibility and levy treatment. A buyer without verified status must not be automatically assigned any category.
4. **Material correction:** the assessor now accepts non-income-based homestead applications through the end of the property's **45-day notice-of-assessment appeal window** for the current tax year, beyond the historic April 1 cutoff. Income-based filings have separate defined time/document requirements. Therefore the HomeTrue prior blanket copy 'Standard filing deadline April 1' was materially incomplete/outdated.

## Actual application correction

The audit-branch county guidance now distinguishes the above values and deadline. The prior generic `county.he=2000` remains a legacy configuration value and must **not** be presented to Roscoe users as a universally available exemption. A separate Roscoe correction removes automatic presentation of the generic `county.he` as verified buyer-specific entitlement.

Protection: `tests/hometrue-forsyth-homestead-source-and-deadline.js` and `tests/hometrue-batch1-roscoe-homestead-evidence-guard.js`, included in no-deployment audit CI.

## Financial gates not passed

These official general rules do not certify that any given property/owner receives the relief, define how **all** 2026 school HB 717 or other category relief interacts, resolve every 2026 district rate, establish any buyer's assessment base or fully reconcile non-ad-valorem fees. Forsyth composite, exemptions/eligibility, district geography, all buyer scenario certification and full market certification remain false in the controlling register. Dorchester deferred. Production unchanged.
