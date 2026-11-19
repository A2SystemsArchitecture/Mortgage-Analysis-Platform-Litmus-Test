# HomeTrue Batch 6 official state financial evidence and recovery checkpoint
2026-11-18. States Arizona Nevada Idaho Utah New Mexico.
State status: All five UNRESOLVED. Review branch only. Production unchanged.
Platform source SHA e117e6b1c2a89c1d59a40d652f6b804fd02a46c9.

## State-law corrections made
Arizona: Arizona DOR publishes 10% Class 3 primary residence assessed ratio against Limited Property Value (LPV), and for unchanged parcels LPV typically rises no more than 5% year over year. Exceptions for new property, splits and use/classification changes; 5% is not property-tax bill cap. Corrected closing narrative.
Official https://azdor.gov/business/property-tax/property-tax-faqs
Official https://azdor.gov/business/property-tax/property-tax-publications/assessment-procedures-library-alphabetical

Nevada: State Tax Department 2026 Real Property Transfer Tax state $1.95/$500; Clark adds $0.60 for total $2.55/$500; Washoe adds $0.10 for total $2.05/$500. Code math was correct but displayed dollar rate used integer rounding and falsely displayed $3 or $2. Fixed two dollar-rate displays using exact two decimal formatting. Actual example for $400k: Clark $2,040, Washoe $1,640. 3% tax-bill abatement available conditional on qualified owner-occupied parcel and correct county classification; corrected guide from universal assumption. Homestead declaration protects creditor equity up to $605k under NRS 115, does not lower property tax.
Official https://tax.nv.gov/tax-types/real-property-transfer-tax/
Official https://www.clarkcountynv.gov/government/elected_officials/county_recorder/land-documents
Official https://washoecounty.gov/recorder/real_property_transfer_tax.php
Official https://www.leg.state.nv.us/nrs/nrs-115.html
Official https://tax.nv.gov/faqs/locally-assessed-property-tax-faqs/

Idaho: Tax Commission 2026 HB 843 guidance exempts 50% eligible value with maximum $125k, approved homeowner claim can be filed through final business day of tax year in 2026; NOT generic April 15 of prior years. Existing review branch prior corrections reflect this. Separate Property Tax Reduction program still has annual Jan 1-Apr 15 deadline; avoid confusing two programs.
Official https://tax.idaho.gov/taxes/property/homeowners/online-guide/
Official https://tax.idaho.gov/taxes/property/policy/ (2026 HB843 Guidance Note)

Utah: Utah Tax Commission 45% exemption lowers qualifying primary residential fair market taxable value to 55%. From Jan 1 2027, changed ownership, prior-year ineligibility or county challenge requires Form TC-473A with county Board of Equalization, filing September 15 HARD DEADLINE; applications cannot be accepted late. Corrected existing guide and closing note to describe exact deadline and assessed market value, not necessarily purchase price.
Official https://tax.utah.gov/propertytax/tax-relief/primary-residential-exemption/

New Mexico: NMSA 7-38-38 property tax installments due Nov 10 and Apr 10, not payment delinquent dates. Existing code already corrected and retains Head of Family $2k assessed-value exemption conditioned on formal approval; no automatic deduction.
Official https://www.tax.newmexico.gov/individuals/personal-income-tax-information-overview/property-tax/
Official https://www.tax.newmexico.gov/businesses/wp-content/uploads/sites/4/2021/02/Property-Tax-Code-Rev.-05-20.pdf

## Independent tests
File tests/hometrue-batch6-tax-tests.js: six hypothetical $400k purchase, $320k mortgage cases with 12 assertions against actual code; PASSED. Prior batch tests: 10+7+9+9+13 government cost assertions, 124 buyer guides, 372 arithmetic checks all PASSED. No test certifies precise tax levies, property-specific qualification, or official assessment value.

## Unresolved preventing full state approval
Unverified 2026 and 2027 rates for individual taxing districts, cities, municipalities and school levies. Utah and Nevada effective rates in code need official parcel/district mapping; no tax profile or statutory exemption status inferred. Idaho differentiated end-year exemption and annually filed reduction; New Mexico county levy, Head of Family eligibility, rate and filing confirmation. County recording fees and title insurance are planning inputs rather than official state amounts. Neither buyer case nor all applicable financial rules have completed independent reconciliation. All five remain UNRESOLVED; state signoff cannot be granted without further locality-level evidence.

## Recovery
All six batch checkpoints are stored as audits/HomeTrue-Batch-[1..6]-Official-State-Evidence-Nov-2026.md. Continue reviewing unresolved items across ALL states from current review branch. Do not reset, restart or promote production. No state has been signed off as 100% verified.
