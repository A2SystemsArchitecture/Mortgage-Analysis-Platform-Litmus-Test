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
