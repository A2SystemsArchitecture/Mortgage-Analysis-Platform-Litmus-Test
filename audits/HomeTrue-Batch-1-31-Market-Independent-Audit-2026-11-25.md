# HomeTrue Batch 1: 31-market independent audit and Dorchester inclusion (2026-11-25)

**Status: NOT CERTIFIED; NOT READY TO MERGE OR DEPLOY.** Scope: all 31 Batch 1 markets, including Dorchester County SC. Audit branch only. Production and `main` unchanged. PR #2 remains an open draft.

## Changes committed with this record (audit head before change: `8fc2cdef02d9900f71c7988a3ebcaa04caa33207`)

1. `platform.html`: the buyer tax-basis guard (`batch1NeedsVerifiedTaxBasis`) no longer exempts Dorchester. A new Dorchester analysis now needs either a tax-year-labeled district (none exists yet) or a buyer-entered annual property-tax projection. Affordability for a market with no tax-year-labeled district now says so plainly instead of asking for a district that does not exist. No tax rate was added or changed.
2. 31-market test scope (previous runs covered 30): `thirty-buyer-math` 450 to 465 scenarios; `share-math` 450 to 465 scenarios and 5,400 to 5,580 checks; `thirty-pdf-render` 150 to 155 PDFs; `market-config-parse` and `district-inventory` now count 31 markets and 258 district options (63 without tax-year metadata). The historical 450 / 900 / 12,615 figures belong to the earlier 30-market runs and are not comparable to these.
3. New `tests/hometrue-batch1-thirty-one-market-gate.js` (31 rows, SC 6, fails closed) and `thirty-one-gate-integrity.js`. The old 30-market gate script is retained unchanged as history. `hometrue-batch1-release-gate.js` now calls the 31-market gate. CI runs both gates, and the final `financial-release-gate` step enforces the 31-market gate.
4. New `tests/hometrue-batch1-no-price-fits.js`: executes the live affordability code at all five selector down payments (3, 3.5, 5, 10, 20) with both-fit, one-fits, and neither-fits cases. Asserts "No price fits", `N/A` payments, a disabled "Analyze at This Price Range" button, cleared stale results, and a no-op handoff when neither fits. 20 cases pass. It uses a stubbed DOM, not a browser.
5. `tests/hometrue-batch1-browser-thirty.js`: the assertion that Dorchester is not guarded was reversed (now requires it to be guarded, allowed with a supplied annual tax, and blocked in affordability). **Not executed:** Chromium could not be downloaded in the audit environment. CI must run it.

## Results at the resulting commit (scratch copy, Node v22.23.5)

85 of 85 Node scripts in the CI loop pass (84 previous plus no-price-fits; the new gate-integrity script is the 86th and also passes). 155 of 155 PDFs render. The 31-market gate exits blocked: local 31/31, current-year district 30/31, buyer correction 30/31, latest-adopted 25/31, exemptions 0/31, geography 0/31, calculator-test flag 0/31, full certification 0/31. The register CSV was not edited, so no flag changed.

## Dorchester research this session

No 2026 Dorchester millage schedule or issued 2026 bill was found. The only sources that surfaced are secondary and tax-year 2025, and none was entered into code:
- A local realty page reports the county Auditor's official 2025 chart lists districts 207, 271 and 273 inside Summerville at 405.6 mills, with DD2 operating 186.2 plus 9.0 vocational. It also reports the Town of Summerville's 66.0 mills ratified June 11, 2026 for FY2026-27: https://valorvinerealty.com/blog/one-town-three-tax-bills-why-the-county-line-matters-more-than-the-summerville-address
- Post and Courier coverage of the school sales-tax referendum quotes the county Auditor on DD2 operating 186.2 and DD4 211.6: https://www.postandcourier.com/journal-scene/education/dorchester-superintendents-make-case-for-education-sales-tax-referendum/article_90449050-7114-48d0-943e-bd6271602ae4.html
- The county's June 15, 2026 budget release says no property-tax increase (fiscal budget, not a millage schedule): https://www.dorchestercountysc.gov/Home/Components/News/News/4217/1255

I could not open the county's 2025 chart PDF (the fetch needed an approval that went unanswered). Until the primary chart is read, no Dorchester district rate can be labeled or entered. The 2025 figures above are leads. Whether a labeled 2025 rate would satisfy the rate-year authorization depends on confirming no adopted 2026 schedule exists, and the repo's recorded authorization text excludes Dorchester; the owner must confirm it covers this market.

## Still open for Dorchester and all markets

Same as the independent audit below: exemptions 0/31, geography 0/31, parcel fees, browser and PDF visual inspection, GitHub Actions confirmation, and the five Georgia rate markets plus Dorchester at the rate gate.

---

## Independent audit text (read-only audit at head 8fc2cde, before the changes above)


## 1. Materials reviewed and unavailable

**Repository (verified):** A2SystemsArchitecture/Mortgage-Analysis-Platform-Litmus-Test, branch `tax-corrections-audit-nov-2026`. Head commit `8fc2cdef02d9900f71c7988a3ebcaa04caa33207` (2026-11-24 11:38 -0500, "Require expanded shared-report arithmetic in audit CI without weakening release gate"). It matches the commit in your handoff. I fetched 924 commits of history (earliest 2026-04-26).

**Reviewed directly:**
- `platform.html` (all 124 market configs; Batch 1 markets parsed from `COUNTIES`).
- All 107 files in `tests/`, and `.github/workflows/batch1-thirty-financial-audit.yml`.
- `audits/HomeTrue-2027-launch-verification-gates.csv` (124 rows), the Batch 1 ledger, certification-gate, rate-year, execution-checkpoint, executed-test-results, six-rate-gap, and market-specific reconciliation docs.
- Project docs searched (Dorchester, Batch 1, 26-state directive): older `index.html`/`platform.html`, Master Instructions.
- Independent source spot checks: DeKalb Tax Commissioner 2026 millage sheet, Freddie Mac PMMS, Dorchester Auditor page, web search for a Dorchester 2026 chart.

**Executed by me (scratch copy, Node v22.23.5):** all 84 Node scripts the CI loop runs, the 18 test files not in CI, the 30-market gate, the district inventory, the 150-PDF render, and the two-bill Gwinnett PDF test (with jspdf@2.5.1).

**Not available (do not treat as reviewed):**
- The ChatGPT conversation and every earlier conversation.
- The original directive titled "HOMETRUE: 26-STATE FINANCIAL ACCURACY VERIFICATION AND CORRECTION". I searched the repo and the project docs and found no document with that title. Item 1 of your handoff is supplied context only.
- The original user authorization for latest-adopted rates. The only record is the repo document `audits/HomeTrue-Batch-1-Rate-Year-Decision-Required-2026-11-22.md`, which says the owner authorized it on 2026-11-22. That is a secondary record.
- Any written origin for the Dorchester deferral (see section 7).
- GitHub Actions run logs and artifacts. The API returned 403 and the web fetch was rate-limited, so the run URLs cited in the repo docs are unverified by me.
- PR #2 (draft), and any live browser run. Playwright's Chromium download failed here, so `hometrue-batch1-browser-thirty.js` was not executed by me.
- Dorchester County primary documents: the estimator page fetch failed, and the BillTrax bill portal needs JavaScript.

## 2. Verified Batch 1 market list and scope conflicts

The 124-row register contains 31 FL/GA/AL/SC rows: FL 7, GA 14, AL 4, SC 6. `COUNTIES` in `platform.html` has the same 31 keys. This matches your handoff: Miami-Dade, Broward, Palm Beach, Martin, St. Lucie, Indian River, Brevard; Fulton, DeKalb, Gwinnett, Cobb, Cherokee, Forsyth, Clayton, Hall, Dawson, Paulding, Pickens, Lumpkin, Richmond, Columbia; Jefferson, Madison, Shelby, Limestone (AL); Charleston, Richland, Greenville, York, Berkeley, Dorchester (SC).

**Conflict:** every executable gate and every count test in the repo is hard-coded to 30 markets with Dorchester removed (SC = 5). Evidence:
- `tests/hometrue-batch1-excluding-dorchester-gate.js` line 13 (`SC:5`) and the filter on `dorchester-sc`.
- The same filter in `thirty-buyer-math.js`, `share-math.js`, and `thirty-pdf-render.js`.
- The browser test asserts `dorchesterStillDeferred===true` (lines 119-124).
- `batch1-market-config-parse.js` line 33 ("Dorchester deferred").

No repo artifact runs a 31-market gate. The 31-market scope is therefore not tested anywhere.

## 3. Release gates

Written criteria, as recorded in the repo: gate script `excluding-dorchester-gate.js` (8 flags per market), the Certification Gate doc (5 remaining gates), and the Rate-Year doc (authorization). I cite the repo's wording, not an original directive.

Rate-year policy (Rate-Year doc, lines 6-12): latest officially adopted rates with the actual tax year labeled satisfy the rate gate "until corresponding 2027 rates are officially adopted." The register keeps `complete_composite_2027_rate_verified` as a historical field (0/31 true) and adds `batch1_latest_adopted_composite_verified`. I applied that policy. A missing 2027 rate is **not** a blocker under it. The gate script already uses the latest-adopted flag.

| # | Criterion | Source | Evidence | Status | Unresolved |
|---|---|---|---|---|---|
| G1 | Local calculation case documented | gate script | CSV: 31/31 true (30/30 excluding Dorchester) | Verified (register); I did not re-source each case | Registered evidence only |
| G2 | Current-year district case | gate script | CSV: 30/31. Dorchester false | Partially verified (30), Not verified (Dorchester) | Dorchester 2026 district case |
| G3 | Main buyer district correction in code | gate script | CSV: 30/31. Dorchester false; code has only two legacy rates | Partially verified | Dorchester |
| G4 | Latest-adopted composite verified, tax year labeled | Rate-Year doc; gate script | CSV: 25/31 true. False: Fulton, Gwinnett, Forsyth, Dawson, Lumpkin, Dorchester | Partially verified | Section 5 below |
| G5 | Exemption rules and eligibility verified | gate script; Cert. Gate #2 | CSV 0/31 | Not verified (31/31) | All markets |
| G6 | District geography verified | gate script; Cert. Gate #1 | CSV 0/31; no address-to-district validation (DeKalb doc says so) | Not verified (31/31) | All markets |
| G7 | Calculator scenario tests passed | gate script; Cert. Gate #4 | CSV 0/31. Executed tests exist for 30 markets, none for Dorchester | Partially verified (30), Not verified (Dorchester) | Flag is false even where tests pass; it also needs G5/G6 |
| G8 | Government/transaction charges, parcel fees | Cert. Gate #3 | SC/AL/GA/FL closing models tested generically; parcel fees only disclosed, not computed | Partially verified | Parcel-specific fees, all markets |
| G9 | Full launch certified, explicit sign-off | gate script; Cert. Gate #5 | CSV 0/31 | Not verified | Legal/financial sign-off, branch reconciliation |
| G10 | "Production must not change until gates pass" | your handoff item 6 | Draft PR #2 per repo docs; I could not view PR | Not verified | PR/production state |

My run of the gate (copy of head) exits blocked with totals: local 30, current-year 30, buyer-correction 30, latest-adopted 25, exemptions 0, geography 0, calculator tests 0, full certification 0 (30 markets). The CI `financial-release-gate` job runs the same script and is designed to fail. I did not declare launch readiness, and the evidence does not support it.

## 4. Market-by-market evidence table

Columns: **Districts** = selectable district options in code / options carrying a tax-year or fiscal-period stamp. **Rate gate** = register flag `batch1_latest_adopted_composite_verified`. **Rate evidence** = the register's recorded reason (truncated; full text and URLs are in the CSV `reason` column). **Tests** = market-named test files / how many run in CI (more tests cover all markets generically; see section 6).

Uniform findings for every row, because the evidence is the same for all 31:
- **Exemptions: Not verified** (register 0/31). Partial source work exists for Dawson (HB 824 closure of legacy senior exemptions; `dawson-2026-senior-exemption-eligibility.js`), Forsyth (2026 HTRG $409.32/$273.74), Fulton (late-filing and temporary-bill year guard), Gwinnett (actual homestead net bill), Florida (selected-vs-fallback homestead guide), and SC (state temporary $75,000 exemption, SCDOR IL 26-23). None is a verified buyer-level exemption result.
- **Districts/geography: Not verified** (register 0/31). The calculator now requires a selected district or a buyer-entered annual tax for the 30 non-Dorchester markets (`batch1NeedsVerifiedTaxBasis`, platform.html line 4049). It does not validate that an address belongs to the selected district.
- **Buyer costs: Partially verified.** State closing models (GA, AL, FL, SC) pass `state-closing-tax-cases.js` and `sc-*` tests. Parcel-specific non-ad-valorem charges are disclosed but not computed (`Buyer-Tax-Additional-Fees-Limitation.md`). Gwinnett has two real-bill fee reconciliations.
- **Application (calculator / shared report / PDF): Partially verified for the 30 markets**: 15 buyer scenarios (5 down payments x 3 prices) and 15 shared-report reconstructions per market in Node, 5 rendered PDFs per market, and 5 browser shared-report cases per market (browser claimed in repo docs only, not re-run by me). **Not verified for Dorchester** (zero scenarios).

| # | Market | Districts | Rate gate | Rate evidence (register) | Tests |
|---|---|---|---|---|---|
| 1 | Miami-Dade County (FL) | 6/6 | flag true | SOURCE-RATE GATE ONLY: 6/6 buyer-selectable 2026 adopted base district composite rates 0100/0200/0300/0400/1000/3000 independently matched to Miami-Dade Property Appraiser official 2026 adopted millag… | 2 (2 in CI) |
| 2 | Broward County (FL) | 45/41 | flag true | SOURCE-RATE GATE ONLY: complete official Broward Property Appraiser 2026 41-code final millage schedule independently matched to 41 buyer selectable source-year rates (123 pre-exemption calculation ca… | 3 (3 in CI) |
| 3 | Palm Beach County (FL) | 14/9 | flag true | SOURCE-RATE GATE ONLY: 2026 official Palm Beach Property Appraiser final-authority schedule independently reconciled to the Palm Beach proposed tax-district-code composite list reproduced by Town of L… | 5 (5 in CI) |
| 4 | Martin County (FL) | 12/11 | flag true | SOURCE-RATE GATE ONLY: all eleven 2026 FINAL residential and real-property levy codes independently matched to official Martin County Property Appraiser 2026 schedule, 33 fictional base tax arithmetic… | 2 (2 in CI) |
| 5 | St. Lucie County (FL) | 11/7 | flag true | SOURCE-RATE GATE ONLY: all seven named final 2026 St Lucie County official taxing district composite rates independently reconciled to Property Appraiser source, including exact multi-code group mappi… | 2 (2 in CI) |
| 6 | Indian River County (FL) | 14/11 | flag true | SOURCE-RATE GATE ONLY: all eleven named official 2026 final Indian River property tax code millage groups independently matched to the Property Appraiser's final 2026 chart, with explicit multi-code g… | 2 (2 in CI) |
| 7 | Brevard County (FL) | 43/38 | flag true | SOURCE-RATE GATE ONLY: all 38 code-identified buyer-selectable 2026 gross ad valorem rates matched to the Brevard official 2026 final tax-roll millage table. Five uncoded planning choices still lack v… | 2 (2 in CI) |
| 8 | Fulton County (GA) | 7/4 | flag FALSE | PARTIAL OFFICIAL 2026 SOURCE CHECK: Fulton County adopted county M&O 8.870; Fulton County School Board voted October 22 to adopt 17.950 mills; City Roswell adopted 5.232; Alpharetta City June 2026 mun… | 2 (2 in CI) |
| 9 | DeKalb County (GA) | 7/4 | flag true | SOURCE-RATE GATE ONLY: official DeKalb County Tax Commissioner 2026 county, school and municipal district schedule revised July 15, 2026 visually verified for 04 Unincorporated 44.090; 50 Dunwoody 40.… | 2 (2 in CI) |
| 10 | Gwinnett County (GA) | 4/2 | flag FALSE | PARTIAL OFFICIAL 2026 SOURCE RECONCILIATION: Gwinnett County Tax Commissioner 2026 mills confirm unincorporated 34.86, Lawrenceville/Suwanee/Duluth county-side 31.6. Lawrenceville official 2026 city 3… | 6 (6 in CI) |
| 11 | Cobb County (GA) | 15/15 | flag true | RATE-COMPOSITE GATE ONLY: all 15 2026 Tax Commissioner county-and-city bill districts now explicitly modeled and independently verified against official 2026 millage PDF, including corrected Kennesaw … | 1 (1 in CI) |
| 12 | Cherokee County (GA) | 3/3 | flag true | SOURCE-RATE GATE ONLY: Exact 3/3 HomeTrue 2026 standard Cherokee GA district choices reconciled to official 2026 Cherokee County Tax Commissioner published rates (unincorporated 26.949 mills, incorpor… | 3 (3 in CI) |
| 13 | Forsyth County (GA) | 3/1 | flag FALSE | 2026 county Tax Commissioner issued non-exempt commercial district 001 bill PAN 2026115263 lists 24.458 mills (county operating 4.727, county bond 0.300, school operating 15.208, school bond 1.418, fi… | 1 (1 in CI) |
| 14 | Clayton County (GA) | 2/2 | flag true | SOURCE-RATE GATE ONLY: both buyer-selectable 2026 Clayton GA standard districts independently reconciled: county Resolution 2026-213 sets 18.520 gross M&O, 3.468 rollback => 15.052 net and 4.500 count… | 2 (2 in CI) |
| 15 | Hall County (GA) | 2/2 | flag true | SOURCE-RATE GATE ONLY: BOTH 2026 buyer-selectable Hall County GA district composites independently confirmed in Hall County Tax Commissioner 2026 revised official chart: district 001 standard unincorp… | 2 (2 in CI) |
| 16 | Dawson County (GA) | 3/1 | flag FALSE | Tax Commissioner 2026 issued non-exempt commercial bill #2026-3380 for District 001 lists county net 5.463 and school 10.800 mills, 16.263 total; taxable assessed 19039200, net bill 309634.51 reconcil… | 1 (1 in CI) |
| 17 | Paulding County (GA) | 2/1 | flag true | SOURCE-RATE GATE ONLY: Paulding County GA 2026 BOC Resolutions 2026-28,29,30,31 itemized in official August 11, 2026 agenda: county M&O 4.300, county fire 2.100 (when applicable), county bond 0.800, s… | 3 (3 in CI) |
| 18 | Pickens County (GA) | 4/2 | flag true | SOURCE-RATE GATE ONLY: Pickens County Board of Commissioners signed Oct 5 2026 minutes adopt 6.606 mills county and 10.600 mills school, total standard unincorporated 17.206 mills. City of Jasper sign… | 1 (1 in CI) |
| 19 | Lumpkin County (GA) | 3/1 | flag FALSE | Official issued 2026 courthouse parcel tax bill lists 8.877 county, 12.929 school, 2.964 city, and 0.500 public safety mills for its Dahlonega district (25.270 total); government-owned exempt parcel, … | 0 (0 in CI) |
| 20 | Richmond County (GA) | 6/4 | flag true | SOURCE-RATE GATE ONLY: Richmond County Tax Commissioner publishes final tax-year 2026 NET millage for ALL FOUR explicitly coded buyer districts: 001 Urban 28.284, 002 County with fire 26.280, 003 Heph… | 2 (2 in CI) |
| 21 | Columbia County (GA) | 6/2 | flag true | SOURCE-RATE GATE ONLY: Two supported source-backed 2026 Columbia GA full base buyer districts independently reconciled: official Columbia County FINAL 2026 workbook county M&O 4.062 + county bond 0.42… | 1 (1 in CI) |
| 22 | Charleston County (SC) | 9/4 | flag true | SOURCE-RATE GATE ONLY: original Charleston County Auditor official tax-year 2026 millage levy PDF both pages visually inspected. Source-backed CURRENT 4/4 buyer-specific district/classification option… | 4 (3 in CI) |
| 23 | Richland County (SC) | 5/2 | flag true | SOURCE-RATE GATE ONLY: Richland County SC Assessor official November 8 2026 parcel-specific estimator for tax district 1ER explicitly provides 2026 gross millage 466.9 for 6% ordinary assessment and 2… | 1 (1 in CI) |
| 24 | Greenville County (SC) | 5/2 | flag true | SOURCE-RATE GATE ONLY: Greenville County Auditor official 2026 millage sheet was previously retrieved and reviewed via live browser, with 2026 district 000 gross 248.9 mills including school operation… | 1 (1 in CI) |
| 25 | York County (SC) | 5/2 | flag true | SOURCE-RATE GATE ONLY: official York County Auditor 2026 Millage Levies (one page visually inspected) lists Rock Hill RH district gross 425.0 mills (county 67.2 + school 263.1 + city 94.7), approved 4… | 2 (2 in CI) |
| 26 | Berkeley County (SC) | 7/4 | flag true | SOURCE-RATE GATE ONLY: 4/4 tax-year FY2026/27 source-backed buyer classifications independently reconciled against Berkeley County Auditor 2026/27 final revised September 18 2026 chart: standard distr… | 5 (3 in CI) |
| 27 | Dorchester County (SC) | 2/0 | flag FALSE | Partial or prior-year district evidence exists; current complete tax-rate and main buyer certification still open.… | 1 (`dorchester-2025-levies`, not in CI); the only CI file naming it is the gate that excludes it |
| 28 | Jefferson County (AL) | 5/5 | flag true | SOURCE-RATE GATE ONLY: official Jefferson County Tax Assessor 2026 standard total rates independently matched 5/5 selectable codes for Birmingham 7.25%, Hoover 7.26%, Vestavia Hills 9.26%, Homewood 7.… | 2 (2 in CI) |
| 29 | Madison County (AL) | 3/3 | flag true | SOURCE-RATE GATE ONLY: 3/3 Madison County standard 2026 districts (Huntsville, Madison, unincorporated improved/fire) independently reconciled to Alabama Department of Revenue October 2026 statewide 7… | 1 (1 in CI) |
| 30 | Shelby County (AL) | 4/4 | flag true | SOURCE-RATE GATE ONLY: 4/4 Shelby County standard 2026 districts (Pelham, Alabaster, Helena, unincorporated) independently reconciled to Alabama Department of Revenue October 2026 statewide 71-page pu… | 1 (1 in CI) |
| 31 | Limestone County (AL) | 2/2 | flag true | SOURCE-RATE GATE ONLY: 2/2 Limestone County standard 2026 districts (Athens, unincorporated) independently reconciled to Alabama Department of Revenue October 2026 statewide 71-page published millage … | 1 (1 in CI) |
Row 27 (Dorchester) in the table above shows the register's own words: partial or prior-year evidence only. Its status per area is in section 7.

## 5. Independent recalculation of reported counts

All runs: head `8fc2cde`, scratch copy, Node v22.23.5, 2026-11-25.

| Reported / recorded figure | What I recomputed | How | Scope | Result |
|---|---|---|---|---|
| 124-market inventory, 31 Batch 1, 30 excluding Dorchester | 124 / 31 (FL 7, GA 14, AL 4, SC 6) / 30 | Parsed `audits/HomeTrue-2027-launch-verification-gates.csv`; parsed `COUNTIES` in `platform.html` | Register and code agree | Supported |
| 450 buyer-calculation scenarios | 450 = 30 markets x 5 down payments (3, 3.5, 5, 10, 20%) x 3 price cases | `node tests/hometrue-batch1-thirty-buyer-math.js` prints `buyerCalculationScenarios:450, pass:true` | 30 markets; Dorchester filtered out (line 14) | Supported |
| 450 shared-report scenarios | 450, 5,400 checks, pass | `tests/hometrue-batch1-share-math.js`; its own scope string says "shared reconstruction function with simulated UI dependencies; not browser or financial certification" | 30 markets | Supported, narrower than "shared report" suggests |
| 900 total scenarios | 450 + 450 | Same 30 x 5 x 3 grid pushed through two code paths (inference from the loops) | 30 markets | Arithmetic correct. It is 450 distinct input cases, not 900 |
| 12,615 individual assertions | 7,215 + 5,400 = 12,615 | I wrapped `node:assert` calls: buyer-math 7,215 calls; share-math reports `checks:5400` (5,407 assert calls including 7 setup asserts) | Same | Reproduced exactly. Counts only these two scripts |
| 30/30 market coverage, 5/5 down payments | 30 markets, 5 down-payment values | Loops in both scripts | Excludes Dorchester; 0% down not in grid | Supported for 30, not 31 |
| Adopted composite rates verified for 25/30 | 25 of 30 non-Dorchester rows have `batch1_latest_adopted_composite_verified=true`; 25 of 31 overall | Parsed CSV | Counts market-level register flags, not individual rates; each flag rests on a source-comparison test that compares code to figures typed into the test | Supported as a flag count; not an independent re-verification of 25 rates |
| 150 PDFs | 150 rendered (30 markets x 5 down payments), 4.38 MB | `hometrue-batch1-thirty-pdf-render.js`, rc=0 | 30 markets | Supported (render and arithmetic; no visual inspection by me) |
| 150 browser shared-report cases | Loop requires 150 (line 187) | I could not run it (Chromium download blocked) | 30 markets | Unverifiable by me; the repo's CI run logs were also inaccessible |
| Latest CI-style Node pass | 84/84 scripts in the CI loop pass; the workflow names 89 test paths (84 loop + gate + inventory + PDF + two-bill PDF + browser) | I ran the 84 loop scripts, gate, inventory and both PDF scripts | 30 markets | Supported at head |
| 107 test files in `tests/` | 89 in CI, 18 not in CI | `ls` and workflow parse | Repo-wide | 12 of the 18 pass; 6 fail (details below) |
| 256 selectable district options | 256 across 30 markets; 61 lack tax-year metadata | `batch1-district-inventory.js` | Excludes Dorchester (2 more options in code) | Supported; inventory itself states certification "NOT PERFORMED" |

**Non-CI tests that fail at head (my runs):**
- `26-state-smoke.js`: `ReferenceError: ACTIVE_DISTRICT is not defined` inside the extracted `collectInp`; the test harness is stale.
- `five-state-tax-guide-rules.js`: `buildStateTaxScenario is not defined`; stale extraction slice.
- `state-guide-smoke.js`: "miami-dade: guide missing selected area"; not diagnosed.
- `three-state-recordation.js`: expects Alabama deed tax 0 on a no-excess sale, code and the CI test `state-closing-tax-cases.js` use a $0.50 minimum; the two tests contradict each other and the CI test matches the code.
- `tax-audit.test.js`: 2 of 7 subtests fail on source-string checks that are no longer present.
- `batch1-release-gate.js`: fails by design (it calls the blocked gate).

The Batch 1 and 2 state-evidence docs say 26-state-smoke passed 372 tests and state-guide-smoke passed 124 renders. Those statements do not hold at head: both tests fail now. I could not tell whether they passed at an earlier commit.

## 6. Reconciliation of historical reports

| Report | Verdict | Evidence and dates |
|---|---|---|
| 450 + 450 = 900 scenarios, 12,615 assertions, 30/30, 5/5, 25/30 | Supported, with scope limits | Section 5. The repo contains no document with the string "12,615"; I reproduced it by instrumentation, so the original report is not independently located. The counts cover 30 markets and Node harnesses only |
| 30 markets passed expanded technical tests but not full certification | Supported | Node pass 84/84; gate 0 of 30 for exemptions, geography, calculator gate, full |
| 29 of 31 markets had documented local calculations; Dawson and Lumpkin lacking | Supported as a dated snapshot, superseded | `Full-Reconciliation-2026-11-20.md` line 111 (29/31, 2026-11-20). Current CSV: 31/31 local. Different date and definition |
| Eight markets officially ready | Partly supported, mislabeled | `Executed-Test-Results-2026-11-22.md` line 156 lists eight (Miami-Dade, Broward, Martin, St. Lucie, Indian River, Brevard, Cobb, Jefferson AL) for the source-rate-only gate, with 0 fully certified. "Ready" overstates it. That count has since grown to 25 |
| Incomplete-rate summary: Palm Beach, Fulton, Gwinnett, Forsyth, Dawson, Lumpkin | Supported historically, superseded | `Six-Rate-Gaps-2026-11-23.md`, now labeled historical. Palm Beach advanced in commits `a4b9eb1` / `42bac44` |
| Five remaining Georgia composite-rate issues | Supported by register at head | CSV false for Fulton, Gwinnett, Forsyth, Dawson, Lumpkin. I did not just inherit it: see Georgia note below |
| Register has 30 active rows, 25 verified | Partly supported | The register has 31 Batch 1 rows. "30" is the gate script's filter. 25 true is correct |
| Dorchester deferred / excluded from a 30-market target | Supported as a repo fact, origin unverified | Section 7 |
| 372 smoke tests and 124 guide renders passed | Contradicted at head | Section 5 |
| Run-count history (32/32, 33/33, 34/34, 35/35, 36/36, 44/...) | Unverifiable by me | These cite GitHub Actions runs (e.g. run 45028414287) that I could not open. The growth is consistent with scripts being added over time, not with a conflict |
| Vercel build "failure" on commit `9c52864` | Unverifiable | Described in the executed-results doc as a rate limit, not a test result |

**Georgia, independent determination.** The register leaves five GA markets false. My own reading of the evidence agrees those five lack sufficient adopted-composite evidence, for these reasons:
- Fulton: only four North Fulton city compositions plus county/school figures are recomposed; Atlanta and two legacy options are unverified; 4 of 7 options carry a tax year.
- Gwinnett: Suwanee and Duluth 2026 final adoption not established; 2 of 4 options carry a tax year.
- Forsyth, Dawson, Lumpkin: each rests on one issued 2026 bill for a commercial or government-exempt parcel in one district. The arithmetic reconciles to the bill, but it is not a residential composite and covers 1 of 3 options each.
- The nine GA markets flagged true (DeKalb, Cobb, Cherokee, Clayton, Hall, Paulding, Pickens, Richmond, Columbia) rest on register entries plus tests that compare code with transcribed numbers. I spot-checked only DeKalb: the county's "2026 ... Millage Rates, Revised 07/15/2026" sheet shows 04 Unincorporated 44.090, 50 Dunwoody 40.199, 90 Tucker 45.791, 92 Decatur 44.695, matching the repo. The other eight I did not re-source. Status for those: partially verified.

Benchmark rate: Freddie Mac PMMS shows 7.28% for November 19, 2026 (previous week 7.11%), matching the repo's benchmark. That is a mortgage-rate benchmark, not a tax rate.

## 7. Dorchester County, SC: specific finding

Assessed on the same six areas and the same status rules as every other market.

**Deferral history.**
- Dorchester work was in scope on 2026-11-18 (commits `ac01a88`, `ef02c06`: dated 2025 levy presets) and 2026-11-21 (about eight commits, e.g. `c9cd842`, `a1933c6`, `408eb14`).
- The Certification Gate doc (2026-11-21) says "existing 31 markets" and treats Dorchester as the last missing 2026 case.
- The first repo text that excludes it is commit `21b576b` (2026-11-22 08:10): "Add explicit thirty-market financial certification gate excluding Dorchester". The Execution Checkpoint of the same day says "Dorchester County SC expressly deferred."
- No directive, user message, or decision record explaining who deferred it, or why, exists in the repo or project docs. The reason I can see in the repo is the 2026 rate-source gap, but that is my inference, not a recorded reason.
- Your current instruction (all 31) therefore conflicts with the 30-market target in the repo's gates, tests, CI, and docs. I did not change the scope. I audited all 31.
- One more scope conflict: `Rate-Year-Decision-Required-2026-11-22.md` says the latest-adopted-rate authorization "applies to Batch 1's 30 markets, excludes deferred Dorchester." Whether it covers Dorchester is for you to confirm; I cannot verify the original wording.

| Area | Status | Evidence |
|---|---|---|
| 1. Property-tax rates | **Not verified** | `platform.html` lines 2436-2455: county `tr:0.0049`, `dor-summerville 0.0054`, `dor-uninc 0.0046`, no tax-year stamp; the notes say they are "NOT certified 2026 district rates". The only dated source in the repo is the Auditor's 2025 chart (tax year 2025), implemented as a manual-entry preset form (`DORCHESTER_2025_TAX_LEVIES`), not as buyer districts. County FY2026-27 budget (adopted 2026-06-15, "no increase in property taxes", 6.1-mill capital levy component) is a fiscal-year budget, not a parcel millage schedule |
| 2. Exemptions | **Not verified** (register false) | Code note cites a temporary $75,000 SC homestead exemption for eligible 65+/disabled/blind owners (SCDOR IL 26-23, FY2026-27). I did not open that letter. The repo is internally inconsistent about the proviso number: the Treasurer-based passage says 117.217, the SCDOR passage says 117.220 and assigns 117.217 to "SLASH" bill itemization. The 4%/6% rule is described in notes, not computed |
| 3. Districts / geography | **Not verified** | 2 options in code. Repo notes say the county estimator shows district IDs 200/400, 403 (Harleyville), 405 (St. George), 406 (Ridgeville), 415 (Reevesville), plus DD2 vs DD4 school districts; none extracted, none implemented |
| 4. Buyer costs | **Partially verified** (generic only) | Uses the shared SC closing model; Dorchester-specific parcel fees and any SLASH itemization not modeled. The 2026 Nov 3 school sales-tax referendum (effective April 1, 2027) is disclosed and correctly not applied as a credit |
| 5. Application (calculator, shared report, PDF) | **Not verified** (guard carve-out) | `platform.html` line 4049: `batch1NeedsVerifiedTaxBasis()` returns false for `dorchester-sc`, so Dorchester is the only Batch 1 market that can still produce a buyer tax figure from the unverified county-wide 0.0049 multiplier without a selected district or buyer-entered tax. The browser test asserts this carve-out (`dorchesterStillDeferred===true`) |
| 6. Testing | **Not verified** | 0 of the 450 calculator, 450 shared-report, 150 PDF, and 150 browser scenarios include Dorchester. Its only market-specific test, `dorchester-2025-levies.js` (28 checks, passes in my run), is outside CI and tests the 2025 preset form. No "No price fits" test names it |

**Source search I did.** The Auditor page as fetched on 2026-11-25 listed only forms, no millage chart. Web search returned no 2026 Dorchester millage chart; it did return SC state millage-cap tables (caps, not rates), SCAC's 2025 rates report, and June 2026 coverage that quotes county officials saying neither school district needed a tax increase. None of that is an adopted tax-year-2026 schedule. The county estimator did not load. I did not open the 2025 chart PDF itself, so even the 2025 numbers in the repo are not independently checked by me.

**What is missing to resolve it:** (a) the Auditor's tax-year-2026 millage chart, or an issued 2026 real-estate bill showing district code, DD2/DD4 operating and debt, county, fire, and municipal mills; or (b) written confirmation that the latest adopted chart is the 2025 chart (then the authorized policy would allow a labeled 2025 rate, but only after confirming no 2026 schedule exists); (c) your confirmation that the rate-year authorization covers Dorchester; (d) a Dorchester-inclusive buyer, report, PDF, and browser test run.

## 8. "No price fits" and the five down-payment scenarios

- **Requirement source:** your handoff and ledger text only. I found no written directive. Status of "applicable requirement": **Not verified**.
- **Implementation:** `platform.html` lines 5080-5100. Each price shows "No price fits" when the payment budget cannot support a $5,000 increment; the button `aff-to-analysis` is set `disabled` when neither budget fits (`priceMid` falsy), and the result and handoff state reset. Introduced in commit `418c493` (2026-11-19). **Verified in code.**
- **Tests:** the ledger (line 235) says simulated tests covered all five down payments and one-or-both-unavailable cases. No committed test in `tests/` asserts the string "No price fits" or the disabled state for the no-fit case. The browser test checks a different message ("Tax district needed"). The affordability grid itself displays only 3%, 5%, and 20%. **Not verified** as tested.
- **Five supported down payments (3, 3.5, 5, 10, 20):** verified for the buyer-calculator and shared-report Node tests and the 150 PDF run, for 30 markets, not Dorchester.

## 9. Unresolved items (market, requirement, record)

1. Dorchester, rates: 2026 Auditor chart or issued bill (inaccessible to me).
2. Dorchester, scope: why and by whom it was deferred; whether the rate-year authorization covers it.
3. Dorchester, code: the tax-basis guard carve-out and the test that locks it in.
4. Dorchester, exemptions: reconcile the 117.217 vs 117.220 references.
5. Fulton, Gwinnett, Forsyth, Dawson, Lumpkin, rates: residential 2026 composites for the remaining districts (Atlanta, Suwanee, Duluth, other districts).
6. All 31, exemptions (register 0/31) and geography (0/31).
7. All 31, calculator gate flag: false everywhere; it has not been set even where Node tests pass.
8. All 31, parcel-specific non-ad-valorem charges.
9. 30 markets, browser and PDF visual results: not re-run or viewed by me; GitHub Actions logs inaccessible.
10. 61 of 256 district options lack tax-year metadata (cannot pass the buyer guard).
11. Original directive, original rate-year authorization, original deferral decision: inaccessible.
12. Six non-CI tests fail at head; the "372 / 124 passed" claims in the Batch 1/2 evidence docs do not hold at head.
13. "No price fits": no committed regression test.
14. A 31-market gate script does not exist; the current gate cannot report on Dorchester.

## 10. Conclusion

**Established by the evidence I inspected:**
- Head is `8fc2cde` on the named branch. The Batch 1 list is 31 markets (FL 7, GA 14, AL 4, SC 6), matching the register and the code.
- At head, 84 of 84 CI-loop Node scripts pass in my run. The 450/450/900/12,615/30/5 counts reproduce exactly, but all cover 30 markets and exclude Dorchester.
- The register records 25 of 31 markets with a latest-adopted composite flag (25 of 30 excluding Dorchester); the six open are Fulton, Gwinnett, Forsyth, Dawson, Lumpkin, and Dorchester. Of the flagged-true markets, I checked one against a primary source (DeKalb) and it matched.
- Zero of 31 markets are certified for exemptions, geography, the calculator gate, or full launch. The gate exits blocked, as designed.
- Under the recorded rate-year policy a missing 2027 rate is not itself a blocker.
- Dorchester has no 2026 district or rate evidence in any record I could reach, is excluded from every test run, and is the only Batch 1 market exempt from the buyer tax-basis guard.

**Not established:** launch readiness; any market's exemption, geography, or parcel-fee correctness; browser or PDF visual results; the GitHub Actions history; the original directives and authorization; the reason for deferral; Dorchester's 2026 rates or any outcome for Dorchester.

Sources (primary web checks): https://dekalbtaxga.gov/wp-content/uploads/dekalb-county-millage-rates.pdf ; https://www.freddiemac.com/pmms ; https://www.dorchestercountysc.gov/government/property-tax-services/auditor ; https://www.dorchestercountysc.gov/Home/Components/News/News/4217/1255
