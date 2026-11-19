# HomeTrue Batch 1 financial verification checkpoint

November 18, 2026. Florida, Georgia, Alabama and South Carolina only. Status: all four states unresolved. Authorized for review branch only. No public deployment.

## Verified corrections and bounds

- Florida documentary stamp estimates use statutory increments and display cents. The Miami-Dade estimate assumes conveyance of one single-family dwelling and discloses the excluded $0.45 per $100 surtax for other covered transfers. The nonrecurring intangible tax preserves cents at 0.2% and discloses lender liability and possible pass-through to the borrower. The estimate assumes the entire loan is subject to tax. Collateral-value limits, mixed collateral, exemptions and payer allocations remain transaction-specific. [Florida DOR documentary stamp](https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx) · [Florida DOR intangible tax](https://floridarevenue.com/taxes/taxesfees/Pages/nonrecurring_intangible_tax.aspx)
- Florida title insurance budgets the original single-conveyance owner risk premium using the tiered rate schedule, rounding partial $100 of coverage up. The financed estimate uses the $25 simultaneous-issue minimum where the loan amount does not exceed the assumed owner coverage; otherwise it budgets a standalone original mortgage premium. This model assumes purchase price is owner coverage, both policies are issued where applicable, and the buyer budgets both premiums. Eligibility, actual coverage, reissue and new-home discounts, endorsements, simultaneous excess coverage and payer agreements remain quote-dependent. [Florida rule 69O-186.003](https://flrules.org/gateway/RuleNo.asp?ID=69O-186.003) · [Florida DFS consumer guide](https://myfloridacfo.com/division/consumers/understanding-insurance/title-insurance-overview)
- Georgia closing output preserves cents and discloses the transfer tax's first-$1,000 and additional-$100 increments, the seller's liability and possible contractual reallocation. It distinguishes the holder of the qualifying long-term note from the assumed buyer budget for intangible tax and discloses the per-note cap. The calculator assumes a qualifying long-term purchase loan; unusual note terms and exemptions are not established by the available inputs. [Georgia DOR transfer tax](https://dor.georgia.gov/real-estate-transfer-tax) · [Georgia DOR intangible tax](https://dor.georgia.gov/intangible-recording-tax) · [Georgia administrative rules](https://rules.sos.ga.gov/GAC/560-11-8)
- Alabama displays cents for both recordation taxes and the buyer government subtotal. The ordinary purchase model uses the existing assumption of a simultaneously recorded mortgage on which tax is paid. [Alabama DOR](https://www.revenue.alabama.gov/tax-types/recordation-tax/) · [Alabama Code § 40-22-1](https://alison.legislature.state.al.us/code-of-alabama?section=40-22-1)
- South Carolina applies the fee exemption at taxable realty value of $100 or less and retains $1.85 per $500 or fraction above the threshold. The output identifies state and county portions collectively, seller primary and buyer secondary liability in the ordinary case, and excludes the fee from assumed buyer costs. Purchase price is used as a proxy for taxable value; remaining liens and other statutory distinctions can change it. [South Carolina Code Chapter 24](https://www.scstatehouse.gov/code/t12c024)

## Fictional buyer checks against platform.html

| Case | Independently calculated amounts checked |
|---|---|
| Miami-Dade, $400,001 price and $320,123 loan | 4,001 × $0.60 = $2,400.60 deed stamp; 3,202 × $0.35 = $1,120.70 mortgage stamp; $640.25 intangible; $1,945.95 buyer government subtotal including $185 estimated recording; $2,075.50 owner premium and $25 lender premium; $12,823.45 closing subtotal under the existing nonstatutory cost assumptions |
| Broward, same price and loan | $2,800.70 deed stamp; same mortgage stamp, intangible and buyer government subtotal |
| Fulton, $400,001 price and $320,001 loan | $400.10 deed transfer; 641 × $1.50 = $961.50 intangible; $1,081.50 buyer government subtotal including $120 estimated recording |
| Fulton, $9 million loan | $25,000 statutory intangible cap |
| Jefferson, $400,001 price and $320,001 loan | $80.00 deed tax; 3,201 × $0.15 = $480.15 mortgage tax; $670.15 government subtotal including $110 estimated recording |
| Charleston, $400,001 taxable value | 801 × $1.85 = $1,481.85 deed fee |
| Charleston, artificial $100 and $101 thresholds | $0 and $1.85 respectively |
| Miami-Dade, $100,000 cash | $575 original owner risk premium; $1,420 estimated title subtotal with no lender premium |

Exact-charge regression: 25 output assertions across nine scenarios passed. Prior Batch 1: 13 across six passed. Shared closing smoke: 248 scenarios and 10 reference values passed. All five inline scripts compiled. The older tax audit had six passes and one failure. Its assertion expects the literal source string `ty2=Math.max(0,`, which was already absent from the baseline. This is an unresolved test compatibility issue and is not evidence of a new property-tax regression.

## Unresolved property-tax and fee work

All 31 Batch 1 markets use stored purchase-price effective rates in the planning calculation. No listed rate below has been certified as an applicable complete parcel rate in this checkpoint.

| State | Programmed market rate inputs | Outstanding reconciliation |
|---|---|---|
| Florida | miami-dade 1.30%, broward 1.10%, palm-beach 1.10%, martin 0.91%, st-lucie 1.39%, indian-river 0.85%, brevard 0.95% | Reconcile 2026 and 2027 school and non-school levies and tax years, assessed value, residency and homestead history. The Miami-Dade Property Appraiser estimator is based on adopted 2026 values and rates. It does not establish a 2027 composite. [County estimator](https://apps.miamidadepa.gov/paonlinetools/taxes/taxestimator.aspx) · [Amendment 3 bulletin](https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf) |
| Georgia | fulton 0.88%, dekalb 0.93%, gwinnett 0.95%, cobb 0.68%, cherokee 0.69%, forsyth 0.73%, clayton 0.97%, hall 0.73%, dawson 0.60%, paulding 0.80%, pickens 0.60%, lumpkin 0.65%, richmond 0.84%, columbia 0.82% | Reconcile local levy coverage, approved/timed homestead relief and base-year values. Fulton general-fund 8.87 mills is one component. The 2026 one-time grant and 2027 statewide floating exemption require different effective-date treatment. [Fulton](https://www.fultoncountyga.gov/News/2026/10/08/Fulton-County-Keeps-Millage-Rate-Flat-For-5th-Year) · [Georgia DOR 2026 legislative update](https://dor.georgia.gov/document/document-document/caveat-2026-opening-session/download) |
| Alabama | jefferson-al 0.71%, madison-al 0.56%, shelby-al 0.47%, limestone 0.35% | Reconcile classification, assessed value, H-1 and other eligibility, applicable caps and all district levies. [Alabama DOR assessment](https://www.revenue.alabama.gov/property-tax/property-tax-assessment/) |
| South Carolina | charleston-sc 0.51%, richland 0.59%, greenville-sc 0.70%, york-sc 0.46%, berkeley-sc 0.42%, dorchester-sc 0.49% | Reconcile 4% legal residence versus usual 6% treatment, school operating relief versus debt levies, and county homestead qualifications and billed-year relief. [SCDOR exemptions](https://dor.sc.gov/property/property-tax-exemptions) |

Additional open items include document-level and locality-level recording schedules, buyer and seller allocation, actual title and lender charges, complete rule-to-code coverage and end-to-end property-tax case reconciliation. Market certification and state sign-off remain pending. The current checkpoint is Batch 1. Preserve all prior draft work and do not advance to Batch 2 without authorization.
