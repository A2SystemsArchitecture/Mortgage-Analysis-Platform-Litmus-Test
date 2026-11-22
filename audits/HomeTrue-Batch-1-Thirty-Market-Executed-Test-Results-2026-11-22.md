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
