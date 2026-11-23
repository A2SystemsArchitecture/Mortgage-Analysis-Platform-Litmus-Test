# Dawson County, Georgia: 2026 senior homestead eligibility correction

Date reviewed: November 23, 2026. Market: Dawson County GA, Batch 1. **Law verified and buyer guidance corrected; full market certification remains blocked.**

## Controlling official evidence

- Signed Georgia HB 824, 2025: https://gov.georgia.gov/document/2025-signed-legislation/hb-824/download . Sections 1 and 3 establish a **conditional January 1, 2026 cutoff** for new applications to four enumerated older senior/age-and-disability homestead programs, upon voter approval. It **grandfathers previously approved senior recipients** and expressly **does not remove eligibility for the separate April 22, 2024 county and school senior programs**.
- Dawson County official November 4, 2025 Election Summary: https://www.dawsoncountyga.gov/ArchiveCenter/ViewFile/Item/343 . The ballot question **Homestead Exemption From County And Educational Ad Valorem Taxes** reports **2,446 Yes, 820 No**, validating the voter-approval condition. The different **County Ad Valorem Taxes** question shows **2,788 Yes, 779 No**, and must not be used as the HB 824 vote count.
- Dawson County Board of Tax Assessors official program guidance: https://dawsonassessors.com/homestead-exemptions/ . Standard qualifying owner-occupied homestead is **$2,000 of assessed value**. Standard filings received by **April 1** can apply for the corresponding tax year; other programs have additional eligibility and timelines. Its 2026 checklist describes current residency and age-dependent alternatives.

## Actual correction

The audited Dawson market guidance in `platform.html` now warns that a new homebuyer **cannot claim a legacy senior exemption closed to new applications in 2026**, distinguishes grandfathered pre-2026 recipients, preserves surviving 2024 programs, and explains that ordinary homestead relief is a distinct conditional category. The pre-existing 2026 commercial district tax-rate sample and planning-only city choices were deliberately preserved, because an exemption rule cannot verify a tax district or buyer.

Protection: `tests/hometrue-dawson-2026-senior-exemption-eligibility.js` executed in the thirty-market GitHub financial CI.

## Not certified

The new source establishes a **specific class-eligibility rule**, not that a future purchaser meets any particular program. Additional owner proof, actual bill, 2026 residential district, city/school special levies, 2027 rates, credits, fees and 30-market buyer/PDF financial certification are still required. No exemptions or dollar savings were automatically applied. `exemption_rules_and_eligibility_verified=false` and `full_launch_certified=false` remain correct for Dawson and all other pending markets. Production unchanged; Dorchester excluded.
