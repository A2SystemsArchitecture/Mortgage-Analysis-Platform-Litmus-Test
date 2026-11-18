# HomeTrue Batch 4 state evidence and recovery checkpoint
Date 2026-11-18. States Indiana Ohio Pennsylvania West Virginia. Review code only; no production change.
Status: ALL FOUR UNRESOLVED; no state approved. Platform blob f5e8bf614ea927f6157dd2f07c85e73b68fdfde2.

## Verified rules and corrections
Indiana:
- Official DLGF: assessment-year standard homestead deduction 2026 $40k and 2027 $30k, with 2026 supplemental 46% of assessed value after standard deduction; 2026-assessment taxes payable 2027; filing deadline Jan 15 2027. Earlier corrections recorded 5 Indiana county source amounts and guide. Additional current correction removes promise that buyer automatically gets a reduction in first full year: exact timing and applicability depend on qualification and formal assessment.
  https://www.in.gov/dlgf/files/2026-presentations/260519-Lucas-Culy-Presentation-Deductions-and-Credits.pdf
  https://www.hamiltoncounty.in.gov/376/Standard-Homestead-Credit
Ohio:
- Ohio Department of Taxation: tax-year 2026 income-qualified regular homestead market-value relief $29,700 for qualifying senior, disabled and certain surviving spouse categories; county optional benefits possible.
  https://tax.ohio.gov/help-center/faqs/real-property-tax-homestead-means-testing
- HB 186 owner-occupancy credit on eligible levies increases from 2.5% to 5.70% in tax year 2026, 8.92% in 2027, 12.15% in 2028, 15.38% in 2029. Distinct from income-tested senior homestead benefit. Existing guide had HB186; adjusted closing and guide descriptions to avoid saying all normal buyers have no tax relief or that survivor categories don't exist.
  https://tax.ohio.gov/government/real-state/real-property-tax-legislation
  https://franklincountyauditor.net/owner-occupancy-credit/
Pennsylvania:
- PA revenue: state deed realty transfer tax 1% of taxable consideration/value, both grantor and grantee jointly and severally liable, with actual contract splitting ultimate responsibility. HomeTrue currently budgets full 1% state amount as a conservative assumed buyer expense and excludes address-dependent additional local levy from subtotal. This assumption and lack of exact local levy prevent certification.
  https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/realty-transfer-tax
- School homestead exclusions require county application by prior March 1, school-district amounts vary. No state fixed universal exemption.
  https://www.pa.gov/agencies/education/programs-and-services/schools/grants-and-funding/property-tax-relief
West Virginia:
- WV Code §11-6B-3 $20,000 assessed value deduction for qualifying homeowners 65+ or permanently totally disabled, with two-year WV residence requirement and exceptions. Corrected language claiming displayed 'full tax rate'; system has only provisional rate.
  https://code.wvlegislature.gov/email/11-6B-3/
- WV State Bar Advisory Opinion 2010-002: real estate title examination and closing legal services; non-lawyers can perform under licensed lawyer supervision or restricted employer exceptions. Clarified customer-facing attorney-closed description.
  https://wvbar.org/wp-content/uploads/2012/04/Advisory-Opinion-2010-002-updated-6-3-15.pdf

## Independent checks
tests/hometrue-batch4-tax-tests.js: 7 programmed government cost assertions pass across 4 fictional cases. Previous Batch3 9, Batch2 9, Batch1 13, 372 statewide arithmetic smoke, 124 guide renders, plus WV county class-II levy sanity check passed.
Not a verification of each market's official 2026 or 2027 levy or buyer exemptions.

## Outstanding
Precise local levies/taxable-value inputs and effective dates; eligibility, exclusions and timing; bill-specific property tax rates; local recording costs; contract actual buyer share; complete statewide item-by-item financial rule reconciliation. All 4 states UNRESOLVED; resume next batch then return to complete evidence. No production update.
