# HomeTrue Batch 1: executed 30-market test results (Dorchester deferred)
**As of November 22, 2026.** Review branch: `tax-corrections-audit-nov-2026`. This is an execution record, not a full financial accuracy sign-off, authorization to merge, or production deployment.

## Verified execution
GitHub Actions run: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45027296747
Branch head at final expanded test: `76f90b5ba3dd14d8b1da4f12e65061e4b068b79f`

| Gate actually exercised | Verified result | Limit |
|---|---|---|
| Existing and expanded financial Node regressions | **31/31 scripts passed, 0 failures** | Scripts cover selected source-backed rates, examples, fees, shared input handling and guards, not every parcel-specific law or address |
| Actual `buildPDF()` with jsPDF, fictional data for FL 7 / GA 14 / AL 4 / SC 5 | **30/30 three-page PDF files produced**, PDF file header and page count validated | Synthetic county-level planning figures; no visual review, PDF content/legal eligibility validation or real parcel tax liability certified |
| Actual headless Chromium platform page, county switching | **30/30 county selectors exercised** | Only the included market IDs; no address-to-district geocoding |
| Real DOM district selection | **30/30 first district explicitly clicked; no automatic first-district assignment** | Explicit manual selection does NOT confirm the entered property's actual district |
| Actual browser shared analysis reconstruction | **30/30 market-specific shared reports verified** against selected district planning rates; Gwinnett known district **$4,183.20/year** and unsupported district county-only **$2,850/year** also pass | Verifies displayed calculation paths and district IDs; does not confirm an address belongs to the selected district or that exemptions and fees are complete |
| Buyer-facing district status | Initial website-level integration failed: tax notice targeted a nonexistent `vs-tax` element. Corrected to actual `avs` strip with `planning-tax-rate` and `planning-district-status`; browser test now passes. | The county-only planning amount remains an estimate and is not an actual bill |
| Screenshots | Two Chromium screenshots archived with the browser run | Not separately visually certified by a human reviewer |

Run artifacts:
- 31-script regressions: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45027296747
- Thirty sample PDF files: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45027296747
- Browser screenshots: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45027296747

### Corrected issues
1. The previously failing South Carolina scenario test assumed an obsolete invocation; the current county-aware call was verified and the test was updated. Subsequent suite passed.
2. The GitHub release-gate reporting shell error was corrected; the certification gate remains **blocked by design**.
3. The Alabama zero-down closing fixture truncated cents when parsing the displayed government subtotal. The buyer-side amount is **$710.50** under the encoded mortgage/deed/estimated recording assumptions, not $710 or rounded $711. Official reference: https://www.revenue.alabama.gov/tax-types/recordation-tax/
4. A shared-link test syntax error was corrected and the complete expanded suite passed.
5. The platform no longer automatically selects the first county district, and the real screen displays a visible unconfirmed-district status and chosen pre-exemption rate. The dedicated DOM test and Chromium run passed.

## Certification status
The controlling 124-market register still shows for the **30 included markets**:
- 30/30 some current-year local calculations documented
- 30/30 some main buyer district pre-exemption corrections documented
- **0/30** complete 2027 market composite rates verified
- **0/30** complete homeowner exemption/eligibility verified
- **0/30** complete district geography verified
- **0/30** complete market-wide buyer scenario certification verified
- **0/30** fully certified

These counters do not mean prior official sources or partial tax tests are absent. They mean complete certification has not occurred.

### Remaining nonwaivable tasks
- Independently verify correct-year (2026 or applicable 2027), parcel-specific district/school/special rates for all modeled choices, including historic placeholders that remain visible.
- Apply and verify applicable assessed-value bases and homeowner relief in actual buyer tax totals, not only in guidance and standalone examples.
- Reconcile every relevant non-ad-valorem fee, levy credit, local service charge, recordation and title exception, payer allocation and actual buyer total; maintain explicit assumptions for unknowns.
- Verify all buyer-screen and shared-report *eligibility branches*, credits, fees and parcel-matched rate cases; the 30 successful shared-link cases cover one pre-exemption selected district per market only. Review 30 generated PDFs visually and check disclosure of nonconfirmed costs.
- Record primary evidence, test fixtures, effective dates and independent reviewer decisions market-by-market. Only then consider changing a market's `full_launch_certified` flag.

**Decision:** Financial tests are passing but the thirty-market complete tax/fee/exemption and 2027 launch sign-off remains blocked. Dorchester remains deferred only, not waived. Do not merge or deploy.


## November 22 additional financial-code correction: published PMMS benchmark

Freddie Mac official November 19, 2026 PMMS 30-year fixed benchmark: **7.28%**, up from 7.11% on November 12. Primary official reference: https://www.freddiemac.com/pmms ; archive https://www.freddiemac.com/pmms/pmms_archives .

Reconciled against GitHub `main`, which already contained 7.28% / 7.03% buyer-best / 7.67% buyer-worst. The audit branch had lagged at 7.11% / 6.86% / 7.50%. Updated audit branch's benchmark date, rate, buyer planning rates and optional-interest rate label to 7.28% / 7.03% / 7.67%, preserving the property-tax verification warning. No production change.

New test `tests/hometrue-batch1-thirty-buyer-math.js` executes the actual buyer `collectInp()` source for **90 fictional scenarios** across all **30 included markets**: each market has one county-only rate baseline, one manually entered $1,052.80 annual tax case and one zero-tax input case. Checks monthly and annual tax consistency, buyer choice handling, best/worst monthly total composition and interest-rate values. It is a calculation-path test, **not** evidence that zero property tax is legally due or any local levy, exemption or credit is correct.

**GitHub Actions verified execution**: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45028414287 : **32/32 regression scripts pass; 90/90 buyer math scenarios pass; 30/30 synthetic three-page PDFs generate; 30/30 browser share reports pass.** All of these are technical scenario validations only. Date and address/district source-year verification, property eligibility, credits, non-ad valorem charges and full legal/financial approval remain open. 30-market full certification stays **0/30**.

The separate affordability tool's `RATE_RANGES` credit tiers are planning assumptions, not verified Freddie Mac individual-credit-tier quotes; do not reinterpret their values as PMMS or represent them as lender offers.


## November 22 share-link financial consistency defect corrected

An actual source-code mismatch existed in the buyer's shared report. The original calculator computed `wpi=cPI(loan,wr)` from the selected worst-case interest rate, but link sharing wrote only `br`, and reopening rebuilt `wr` from `br` while calculating the worst-case payment using the **current market default** instead. Reopened links also calculated the worst insurance premium using an invented **1.35× multiplier** rather than the original calculated scenario. Tier 3 PMI/flood/escrow components could also silently diverge.

**Change:** The share generator now preserves the original scenario's `br,wr,bi,wi,bp,wp,fb,fw,ep`. The shared-report parser reconstructs `wpi` using the serialized `wr` and preserves the original buyer payment components, with nonnegative finite amount parsing and compatibility fallbacks for older links without these fields. Annual buyer-entered property taxes and explicitly chosen districts remain preserved. These changes do **not** verify whether a source rate, fee or exemption was correct.

**Executed audit evidence:** https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45029604180 completed successfully: **33/33 financial regression scripts**, **30/30 synthetic PDFs**, **30/30 existing browser shared-report cases**, and **30/30 NEW browser round trips** comparing original and reopened best/worst monthly totals, P&I, taxes, insurance, PMI, flood and escrow components in all thirty markets. The 30 new round trips use deliberately different best and worst rates and amounts, ensuring the previous silent discrepancy would be detected.

Scope preserved: 30 Batch 1 markets, Dorchester deferred, no merge, no production deployment. **Full financial certification remains 0/30**, pending real local levy/exemption/fee/geography evidence and sign-off.


## November 22 buyer Tier 3 accuracy: unverified inputs must never be labeled confirmed

The real buyer interface and confirmation flow asserted **"All Inputs Confirmed"** for Tier 3 while `collectInp()` still estimated tax from the market planning factor and could default to $285 insurance despite no entered insurance quote. For an omitted Tier 3 locked interest rate, it silently retained the market-planning benchmark. This is a financial-data provenance error, independent of the underlying rate and arithmetic.

**Corrected on the audit branch**: Tier 3 labels now read "Verify Remaining Inputs"; the confirmation checklist discloses whether annual property tax is an unverified market planning amount or a buyer-supplied projection, the selected district remains unverified for the parcel, and the rate and PMI inputs are disclosed when not confirmed. A missing Tier 3 insurance quote now remains **estimated** rather than being designated confirmed. No automatically calculated homestead or district eligibility is claimed.

**Executed results:** https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45041582157 : **34/34 regression scripts passed**, including 3 new actual Tier 3 buyer scenario tests, **30/30 PDF fixture generations**, and **30/30 buyer share-link payment round trips** in the real browser. Changes remain confined to the audit branch. This corrects misleading completeness language and input status, **not** the outstanding governmental tax levy, local exemption and fee verification.

**Source recheck for Florida exemption path:** Florida DOR's November 2026 Amendment 3 bulletin https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf confirms the approved 2027 $150,000 non-school homestead cap subject to eligibility and residency transition; the existing standalone 2027 calculation uses separate school and non-school bases. That does not validate any of the seven Florida market's actual parcel composite rates or justify automatic reduction of the main buyer payment.

30-market full financial certification remains **0/30**; deferred Dorchester and production unchanged.


## November 22 latest-adopted tax-year provenance and South Carolina threshold correction

**Rate-year authorization implemented in the buyer display and PDF.** The buyer-facing district strip now contains an explicit *Tax year* field. The seven Florida Batch 1 markets have rate-year 2026 attached **only to code/district rates previously documented in the existing 2026 audit evidence**, while unknown-code planning rates and Palm Beach's unverified city planning factors are left year-unverified. On selecting a documented 2026 district, users see *Tax year 2026 (not a 2027 rate)*. On county-only fallback or an unknown-year option, they see *Not verified*. The generated PDF footer separately identifies the national mortgage-rate benchmark and the selected tax source year or its unverified status.

**New state-law arithmetic correction:** South Carolina Department of Revenue [Deed Recording Fee](https://www.dor.sc.gov/tax-index/deed-recording-fee) expressly charges **$1.85** for taxable realty transfers valued **$100–$500**, with $1.85 for subsequent $500 increments. The old application and a legacy test omitted the fee at **exactly $100** (`p>100` instead of `p>=100`). Corrected the computation, the buyer disclosure, and the existing exact-charge regression. Clarified that SC's 4% legal residence classification requires county approval, rather than arising automatically from owner-occupancy. This deed fee remains explicitly outside the **assumed buyer-paid closing subtotal**; it is generally treated as the seller's assumed share, subject to actual transaction liability.

**Execution verified** in https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45043055003 : **35/35 regression scripts passed**, **5/5 new SC $99.99 / $100 / $500 / $500.01 / $1,001 fee calculations passed**, **7/7 Florida tax-year browser checks passed**, unknown-year Palm Beach city option correctly showed *Not verified*, **30/30 actual PDF generation fixtures passed**, and **30/30 shared-report payment round trips passed**. Tests use fictional inputs; they are not independent confirmation of every district's full legal composite or buyer homestead eligibility.

**Certification state unchanged:** 0/30 fully financially signed off; local composite completeness, exemptions and credits, address-to-district proof, non-ad valorem assessments and actual buyer/seller closing allocations remain unverified as whole-market packages. Dorchester remains deferred, main/production unchanged.


## November 22 latest financial-risk controls and governmental-bill reconciliation (not launch certification)

**Source-backed material error prevented:** In Gwinnett GA an unidentified district's `0.95%` county-only planning factor would quote **$3,800** annual tax on a fictional $400,000 property. The 2026 published unincorporated levy is 34.86 mills on 40% assessed value: **$5,577.60/year** pre-exemption. Unconfirmed county fallback therefore understates this particular illustrated district by **$1,777.60/year**. See `audits/HomeTrue-Gwinnett-2026-County-City-Actual-Rate-Exemption-Reconciliation.md` and official County Tax Commissioner schedule: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates . This does not mean the 34.86-mill rate applies to every Gwinnett address.

**Correction on audit branch:** New buyer analyses across the thirty active Batch 1 markets now require a selected sourced district or buyer-entered annual tax projection; generic county-only rate is not sufficient. `calcAffordability()` also refuses to produce an affordability price range from an unknown county-only rate. The reported reason is tax-district information missing, rather than an invented high-confidence affordability number. Exact source-year labels are now shown for 30 markets' explicitly documented 2026 district examples (Berkeley fiscal-year 2026/27 distinguished from 2027 calendar tax year). Existing shared links can still display their historical planning analysis labeled unverified; they are not certified parcel bills. Dorchester is deferred.

**Verified execution of safeguards:** https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45044470627 : 36/36 numeric regressions, 30/30 buyer tax-basis browser guard cases, 30/30 affordability tax-district guard cases, 30/30 market-specific source-year cases, 30/30 PDF generation cases, 30/30 shared payment roundtrips. Successful regression status does NOT change a market certification flag.

**Official published Charleston County SC 2026 example independently reproduced:** https://www.charlestoncounty.gov/departments/auditor/files/archived/2026-millage-card.pdf (tax district City of Charleston TD34/35/36/52/63/71/72/99, approved 4% legal residence, $200,000 appraised value). $8,000 assessed × 300.8/1000 = $2,406.40 gross; school operating relief $8,000 × 145.2/1000 = $1,161.60; county LOST credit $200,000 × .00090 = $180; city credit $200,000 × .00083 = $166; solid waste charge $154; result $2,406.40 - $1,161.60 - $180 - $166 + $154 = **$1,052.80/year**. HomeTrue pre-credit/pre-fee district estimate would be **$1,244.80** and therefore differs from the example's final bill by **$192.00**. The new real-buyer-path `tests/hometrue-charleston-official-bill-buyer-reconciliation.js` verifies that entering an *official buyer-specific annual tax projection* of $1,052.80 results in the correct annual/monthly tax component; it does not automatically infer eligibility or credits. The official example is not a guaranteed bill for another parcel.

**Still blocking 30/30 market certifications:** complete district/parcel applicability, approved assessed values and exemptions, all county/city school authority bills, sale tax credits, non-ad valorem/local special charges, exact buyer cost allocation and independent legal/financial reconciliations are not yet proven market-wide. No release, no production merge, no claim of 100% local certified financial accuracy.


## November 22 audit-control and buyer-input corrections (additional commits)

- Reconciliation CI previously omitted a stale guard that expected the November 20 partial counts (29/31, 27/31, 22/31) despite the newer 31/31 local, 30/31 current-year, 30/31 main-buyer ledger. The guard now checks the actual 124-row register, the thirty included markets, exactly one deferred Dorchester entry, current partial milestones, and explicitly blocks any unsupported market certification. It is now part of the automated regression workflow. Commits `86ffc1a` and `63e15e5`.
- Affordability savings previously used a hardcoded 3% down payment even when the home price calculation used the buyer's selected 5% or 20%. Changed savings required to selected down-payment percentage + assumed 3.5% closing costs + three months' modeled housing expense, and changed the copy so assumed rather than proven sufficiency is disclosed. Added an actual affordability-code regression for 3%, 5%, and 20%. Commits `846448b`, `39dccd7`, `cbff6bd`. GitHub Actions success for the combined test and workflow commit: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45048376244 .
- Tier 2 buyer flow falsely designated default $285 homeowners insurance as CONFIRMED if the quote field was blank. Only positive, finite entered quotes now carry CONFIRMED status; missing, zero, negative, or malformed quote remains ESTIMATED. Added buyer-code regression and workflow inclusion. Commits `d4bfc31`, `383ea4c`, `51d4cb5`. CI status of final commit must be checked before claiming the final combined suite passed.

These corrections do not supply parcel-to-district evidence, exemption qualification, non-ad-valorem charges, closing-fee completeness, or financial signoff. **Full Batch 1 financial certification remains 0/30; Dorchester is deferred; no merge or production release.**


## November 22 direct full-option census and stricter financial-input validation

**Source of record:** GitHub Actions https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45065885731 on review branch `tax-corrections-audit-nov-2026`. Completed successfully. **44/44 Batch 1 scoped Node test files passed** (previously omitted scope-specific Florida homestead, district-rate source and closing smoke tests are now included), actual PDF/browser workflow steps completed. The certification gate continues to report incomplete evidence separately.

The generated `audit-results/batch1-district-inventory.csv`, preserved as the `batch1-thirty-regression-evidence` workflow artifact, enumerates **30 markets, 202 buyer-selectable district options, zero markets with no options, and 60 options lacking an independently attributed source year in code metadata**. The other **142 options having a year label are NOT independently certified merely by having a label**. Historic planning options remain unverified and must not be presented as adopted parcel-specific rates. The inventory deliberately marks primary-source and geographic applicability verification as NOT PERFORMED; it is an audit census, not a proof of actual tax liability.

**Financial-code fix:** On Tier 3, the HTML locked-rate control specified 2%-15%, but `collectInp()` accepted any truthy number including negatives or >15%. Negative PMI inputs also previously reduced the payment. The buyer calculation now accepts only finite 2%-15% entered locked rates and nonnegative explicitly entered PMI; invalid values do not replace the planning rates or estimated PMI. PMI 0 is preserved only when explicitly supplied (for example, from a lender's Loan Estimate), rather than invented. Expanded `tests/hometrue-batch1-tier3-input-truth.js` checks negative and above-maximum rate, negative PMI, and 2%/zero boundaries. Verified end-to-end regression/browser/PDF run: https://github.com/A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test/actions/runs/45065779047 (success). A 0% PMI entry remains buyer-supplied and is NOT independent proof of loan-product eligibility.

**Primary-state evidence reconfirmed in this execution:** Florida Department of Revenue bulletin PTO 26-21 (Nov. 5, 2026) https://floridarevenue.com/property/Documents/PTO_BUL_26-21.pdf establishes tax-year 2027 non-school homestead cap $150,000, delayed enhanced eligibility for persons not resident by Dec. 31, 2026, and school/non-school separation. Alabama Department of Revenue https://www.revenue.alabama.gov/property-tax/homestead-exemptions/ describes eligibility-sensitive H-1/H-2/H-3/H-4 relief. South Carolina Department of Revenue https://www.dor.sc.gov/property/property-tax-exemptions states 2026 temporary additional homestead relief requires county auditor determination; approved 4% legal-residence classification is not automatically conferred by purchase. None authorizes HomeTrue to silently credit buyers lacking eligibility confirmation.

**Full market sign-off remains zero of thirty.** The missing evidence includes source-date validation and applicability for each supported rate, parcel matching, homeowner classification, levy credits, non-ad valorem charges and locally allocated closing fees, independently checked through real buyer outputs. Preserve deferred Dorchester. No merge and no public release are authorized by this checkpoint.


## November 22 independent official 2026 composite comparisons: Miami-Dade and Brevard

**Constrained source-rate gates only, not financial launch certification.** The official Miami-Dade Property Appraiser 2026 adopted millage chart (https://www.miamidade.gov/resources-pa/library/reports/millage/2026-adopted-millage-chart.pdf) provides full 2026 pre-exemption ad valorem totals for the six *currently selectable* HomeTrue base districts: code 3000 unincorporated 16.8983, 0100 Miami 19.9544, 0200 Miami Beach 18.6681, 0400 Hialeah 18.6134, 0300 Coral Gables 18.1518, 1000 Homestead 20.9001 mills. All six matched audit-branch code, with 18 direct illustrative taxable-value calculations. This does NOT include alternative overlays or establish a parcel's code.

The official Brevard Tax Collector 2026 final millage matrix (https://www.bcpao.us/Docs/Taxroll/2026/Millage_2026.pdf) provides 38 final named code totals. All 38 matched the 38 corresponding 2026 coded HomeTrue district choices, with 114 direct illustrative taxable-value calculations. Five additional historic, uncoded planning choices remain unverified, without tax-year metadata; they cannot be treated as an adopted district rate. Alternate upper-column code aliases and geographic matching require independent parcel validation.

Committed source-backed test fixtures: `tests/hometrue-miami-dade-2026-official-composites.js` and `tests/hometrue-brevard-2026-official-composites.js`, both included in the non-deploying GitHub Actions Batch 1 workflow. Direct re-fetch and isolated code-rate comparison gave **6/6 Miami-Dade and 38/38 Brevard matching rates**, both test files passed JavaScript syntax compilation. **The newly committed Node test files have NOT yet been verified as executed successfully in GitHub Actions**; earlier 44/44 workflow success must not be attributed to these new files.

Updated the 124-market register's *latest-adopted rate composite source-only gate* from 5/30 to **7/30**. The other 23 are not certified for that gate. All 30 still have unverified buyer exemption/eligibility, parcel district geography, complete net buyer calculations and independent approval: **0/30 fully certified**. Preserve Dorchester exclusion, no main merge, no production release.
