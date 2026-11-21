# HomeTrue Batch 1: full prior-work reconciliation
Date: 2026-11-20. Scope: all 31 markets in FL (7), GA (14), AL (4), SC (6). Existing audit branch only. **This is a cross-document/status audit, not a new 31-market government-source certification or execution of all tests.**

## Controlling evidence and mismatch
- The authoritative progress narrative for prior work is `audits/HomeTrue-Batch-1-Verification-Ledger.md`, read against `platform.html`, existing regression files, four-state law/closing/homestead checkpoints, and municipal sample files.
- The separate `audits/HomeTrue-2027-launch-verification-gates.csv` remains **0/31 fully signed off**, but its local-component flags and counts are **stale for Batch 1**, showing many researched markets as no official component located. **Do not treat 'false/0' in that register as evidence that research never happened.**
- `audits/HomeTrue-2026-27-official-jurisdiction-evidence.csv` currently contains 62 source/evidence rows across 26 states, including 19 Alabama rows added November 20. This is NOT 62 approved markets; Florida is not comprehensively represented despite numerous verified Florida district cases in the Batch 1 ledger.
- The branch is divergent from production `main`. At this reconciliation `main` pointed to 43d1232, and the draft review branch to 27c6e97; comparison reported 311 commits ahead and 1 behind. No automatic merge is safe. PR #2 open/draft/not merged.
- The milestones below are independently distinct **prior recorded work**, not a single completion percentage: 23/31 market with evidenced local property-tax case (some historical), 21/31 with documented current-year district case, 18/31 with rate correction in main buyer flow, 0/31 fully signed off. These counts have been reconciled against the 31 named rows in the ledger, not re-executed in this session.

## All 31 market checkpoints (ONE row per market; no fresh research)
Status key: **MAIN** = a prior district rate correction is documented in actual main buyer planning code (not certified); **STANDALONE** = current-year district calculation documented in separate scenario/guide but not integrated into main buyer totals; **PARTIAL/HISTORICAL** = only older-year or incomplete district work; **NO CASE** = no locally reconciled property-tax calculation documented in the controlling ledger. All statuses carry **FULL SIGN-OFF OPEN**.

| State | Market | Reconciled existing work | Remaining gap / reason not certified |
|---|---|---|---|
| FL | Miami-Dade | MAIN: six adopted 2026 district baselines; standalone homestead | 2027 FL law, school/non-school exemptions, overlays, fees, browser/PDF |
| FL | Broward | MAIN: eleven 2026 codes | Exemptions, non-ad-valorem charges, parcel match, browser/PDF |
| FL | Palm Beach | MAIN: 2026 unincorporated 16.2192-mill baseline | Other cities/districts, exemptions, fees, browser/PDF |
| FL | Martin | MAIN: eleven 2026 levy codes | Drainage/fees, exemptions, parcel and buyer-flow checks |
| FL | St. Lucie | MAIN: seven 2026 rate groups | Tradition unresolved code, exemptions, fees, buyer-flow |
| FL | Indian River | MAIN: eleven 2026 rate groups | Parcel codes, exemptions, separate charges, reports |
| FL | Brevard | MAIN: 38 final 2026 millage codes | Parcel match, exemptions, non-ad-valorem, reports |
| GA | Fulton | MAIN: Roswell, Sandy Springs, Alpharetta, Johns Creek cases | Atlanta city/APS adopted levy conflict, exemptions, parcel, browser/PDF |
| GA | DeKalb | MAIN: 2026 official unincorporated district 04 separate 44.090-mill option added Nov 20; legacy district remains planning | Other city and district rates, homestead/EHOST/HTRG, fees, 2027, browser/PDF and buyer reports |
| GA | Gwinnett | MAIN: four named 2026 districts | School/city boundaries, exemptions and reports |
| GA | Cobb | MAIN: ordinary unincorporated 2026 composite; Marietta, Smyrna, Kennesaw follow-ups | Special districts, Smyrna adoption record, parcel, full buyer and reports |
| GA | Cherokee | MAIN: unincorporated 2026 and additional municipality follow-ups | Boundary, individual local components, homestead, end-to-end |
| GA | Forsyth | PARTIAL: verified 2026 school M&O and 2026 relief, no certified combined levy | Complete adopted 2026 county+fire+bond+school levy and calculator result |
| GA | Clayton | MAIN: unincorporated county-fire and Jonesboro standard 2026 cases | Other district qualifiers, special levies, exemptions, reports |
| GA | Hall | MAIN: unincorporated and Gainesville 2026 district cases | Other municipalities, exemptions and buyer outputs |
| GA | Dawson | NO CASE in ledger | Official current district composite, eligibility, code comparison, tests |
| GA | Paulding | MAIN: 2026 standard unincorporated 25.000 mills | Dallas separately billed city 2026 levy, exemptions, reports |
| GA | Pickens | NO CASE in ledger | Official current district composite, eligibility, code comparison, tests |
| GA | Lumpkin | NO CASE in ledger | Official current district composite, eligibility, code comparison, tests |
| GA | Richmond | NO CASE in ledger | Official current district composite, eligibility, code comparison, tests |
| GA | Columbia | NO CASE in ledger | Official current district composite, eligibility, code comparison, tests |
| AL | Jefferson | MAIN: five standard 2026 districts | Missing Hoover subdistrict alternatives and parcel mapping; exemptions and reports |
| AL | Madison | MAIN: three standard 2026 districts | No-improvement fire variation, other boundary choices, exemptions, reports |
| AL | Shelby | MAIN: four standard 2026 districts | Hoover Shelby and other cross-county city choices, exemptions, reports |
| AL | Limestone | MAIN: Athens and unincorporated 2026 | Huntsville and Madison Limestone-side choices, exemptions, reports |
| SC | Charleston | STANDALONE: 23 official 2026 presets, $1,052.80 worked example reproduced | Main buyer report does not consume district school/credit/fee calculation |
| SC | Richland | NO CASE in ledger | Official current district composite and legal-residence sample, code comparison |
| SC | Greenville | NO CASE in ledger | Official current district composite and legal-residence sample, code comparison |
| SC | York | STANDALONE: 35 official 2026 district groups | Main buyer/report integration, credit/fees, parcel |
| SC | Berkeley | STANDALONE: 13 2026/27 district groups, $545.98 example reproduced | Main buyer/report integration, credits/fees, parcel |
| SC | Dorchester | PARTIAL/HISTORICAL: 14 2025 district rows tested in standalone | Verify current 2026 rates, main flow, eligibility and charges |

## Exact reconciled counts
- FL: **7 MAIN; 0 STANDALONE; 0 PARTIAL; 0 NO CASE**
- GA: **8 MAIN; 0 STANDALONE; 1 PARTIAL; 5 NO CASE**
- AL: **4 MAIN; 0 STANDALONE; 0 PARTIAL; 0 NO CASE**
- SC: **0 MAIN; 3 STANDALONE; 1 PARTIAL; 2 NO CASE**
- Total: **19 MAIN + 3 STANDALONE + 2 PARTIAL/HISTORICAL + 7 NO CASE = 31**.
- Thus **22/31 current-year district case** (19 MAIN + 3 STANDALONE), **24/31 local case of any evidenced year/depth** (+2 PARTIAL), **0/31 fully signed off**.

## Duplication identified
1. Charleston was already researched **and** its official $1,052.80 sample and 23 official district presets had been checked before the November 20 repeated Charleston research. Do not re-present this as new.
2. Standard Jefferson/Madison/Shelby/Limestone 2026 district comparisons were already coded and recorded in the controlling ledger before the November 20 source-evidence additions. The latest Alabama additions substantiate or refine missing district combinations, rather than creating the first verification of those four markets.
3. The 124-market launch-gate register is an incomplete research index. The market-level `false` official-component flags do not agree with the actual Batch 1 ledger and must be reconciled without altering the truth of **0 fully certified**.
4. `TAX_RECONCILIATION_2026.md` is a broader 26-state review register and does not replace the detailed Batch 1 ledger.

## Financial architecture / validation gap documented, no change authorized
- Buyer-affordability and detailed buyer reports mostly use a selected market/district **purchase-price planning multiplier**. Standalone state tax scenarios model assessed-value ratios, school/other levies, credits, and fees, but do **not** automatically feed main buyer reports. A passing standalone Charleston/Berkeley/York scenario is therefore not a passing buyer quote.
- Tax year 2026 and planning for 2027 must remain distinct; no copied 2026 rate may be represented as adopted 2027 without source.
- FL 2027 homestead eligibility and school/non-school split; GA 2026 one-time relief and 2027 floating exemption; AL H-1/status/cap and tax district; SC 4% legal residence and school operating relief must be traced to actual output for each buyer scenario.
- Closing charges have **documented partial testing** across four states, including exact statutory increments, but full buyer/seller fee allocation, exceptions and real title/recording charges remain unsigned. `HomeTrue-Batch-1-Closing-Charges-Checkpoint.md` records 25 exact-charge assertions across 9 scenarios, 248 closing smoke scenarios and a historic tax audit test-string compatibility issue.
- The published test files are concrete Node regression scripts. This reconciliation inspected examples and their relation to platform source, but **did not run all Node suites or browser/PDF tests in this session**. Historical pass reports are prior recorded claims, not newly revalidated pass results.

## Stop duplicate work. Resume in priority order
1. **No municipality-wide research restart** on the 23 already documented markets. Check the existing local section, test, exact district and official source FIRST. Only investigate a specific missing rule, year, district, or failed test.
2. For the **seven remaining NO CASE** markets: Dawson, Pickens, Lumpkin, Richmond, Columbia (GA), Richland and Greenville (SC), collect current official district/source and compare against actual existing district choices.
3. Complete **two PARTIAL**: Forsyth complete adopted 2026 levy and Dorchester 2026 schedule.
4. Resolve known remaining *specific gaps* in the 21 other markets, beginning with SC standalone-versus-buyer integration and FL/GA exemptions, without unauthorized architecture change.
5. Re-run the committed source/regression tests and end-to-end buyer, affordability, share, PDF and parcel example reconciliation before promotion. Update the 124-market gates only after verifying relevant fields, preserving all **full_launch_certified=false** until each of the five gates passes.
6. No production merge, pricing/branding/appearance change, or public financial accuracy assertion is authorized by this report.

**Bottom line:** Batch 1 is substantially researched but **not financially certified**. Work remaining is predominantly specific verification, integration and end-to-end tests, plus seven remaining undocumented local cases. All progress measures must explicitly name what was checked.


## Nov 20 post-reconciliation update: DeKalb, Georgia 2026 tax district 04
An additional source-backed district case was completed on this review branch following the baseline 31-market reconciliation. DeKalb moves from **NO CASE** to **MAIN** only for its separately labeled District 04 illustration. [Official county-issued 2026 tax statement](https://publicaccess.dekalbtaxga.gov/Documents/2026_Website/1/1940761.pdf) shows **44.090 mills**, with 40% Georgia assessment before homestead and credits; sanitary, streetlight and stormwater costs are separately listed, not included in this rate. New code option `dek-uninc-04-2026` uses `0.4 * 44.090 / 1000`. The old generic `dek-uninc` rate is retained for backward compatibility. The main ledger, launch gates, government-source register and committed test were all updated. Arithmetic from saved actual district expression was evaluated for two fictional prices; the dedicated Node regression file and browser/PDF remain to be run. Revised milestone totals **24 local, 22 current-year, 19 in main buyer, 0 certified** out of 31. Seven markets remain without a documented local current-year or historical calculation.

## November 20 subsequent correction: Pickens County GA signed 2026 rates
This section supersedes Pickens' prior NO CASE row **for the current checkpoint only**. Signed [Pickens Board of Commissioners Oct. 5, 2026 minutes](https://www.pickenscountyga.gov/AgendaCenter/ViewFile/Minutes/_10052026-196), approved Oct. 19: county 6.606 + school 10.600 = **17.206 mills** adopted 2026. Signed [Jasper City Oct. 15, 2026 council minutes](https://www.jasper-ga.us/pdf/10.15.2026-Public-Hearing3-Tax-Millage-Special-Called-Minutes.pdf): city **7.636 mills** adopted as Ordinance 2026-10, 4–1. Source references and full qualification saved in official evidence CSV.
- `platform.html` now provides distinct unincorporated 2026 county+school rate choice `pick-uninc-2026` = `0.4*(6.606+10.600)/1000`, preserving both old `pick-uninc` and `pick-jasper` planning identifiers for existing links.
- Jasper's 7.636 municipal amount is officially confirmed, but no universal full city buyer composite is certified; special districts, credits, tax bill timing and relief remain unverified. The 2026 source cannot be represented as adopted 2027.
- Four price-point regression cases saved in `tests/hometrue-pickens-ga-2026-adopted.js`. Standalone Node execution, browser, affordability, share and PDF tests remain open.
- **Current milestones superseding historic tables above:** **25/31** local calculations, **23/31** current-year district calculations, **20/31** main buyer pre-exemption choices, **0/31** financial certifications. **Six** remaining NO CASE: Dawson, Lumpkin, Richmond, Columbia (GA), Richland and Greenville (SC). Two partial: Forsyth (GA) and Dorchester (SC). Do not reopen previous 2026 research without an exact gap.

## November 20 subsequent correction: Greenville County SC 2026 district presets
The originally reconciled Greenville NO CASE row is superseded for the **current checkpoint**. [Greenville County Auditor 2026 millage sheet](https://www.greenvillecounty.org/Auditor/Forms/millage_2026.pdf), obtained and read through a live browser from the [Auditor millage portal](https://www.greenvillecounty.org/Auditor/MillageSheets.aspx), lists district **000 gross 248.9**, school operating **141.2**, other mills **107.7**; City Greenville district **500 gross 330.3**, school operating **141.2**, other mills **189.1**. District 000 is not universal for fire-covered unincorporated parcels.
- `platform.html` now offers these district codes as **separate South Carolina scenario 2026 presets only**, calculating approved legal residence 4% assessment without the 141.2 school operating mills, and non-approved ordinary 6% gross tax, before exemptions, additional credits and charges. Main buyer `tr` planning rates **not changed**.
- Fetched actual committed source and executed **14 numeric decomposition/scenario checks** across both codes and 3 fictional values/classifications, all passing. A dedicated Node regression file is committed but not run as a Node file. Browser/PDF end-to-end testing remains open.
- **Updated milestones:** **26/31** local calculation examples; **24/31** current-year district examples; **20/31** main buyer pre-exemption rate corrections; **0/31** financial certifications. Remaining five no-case markets: Dawson, Lumpkin, Richmond, Columbia (GA) and Richland (SC). Original first-page counts are historical, not the current checkpoint.

## November 21 subsequent correction: Richmond County GA four 2026 adopted district totals
This entry supersedes the historical Richmond NO CASE row. [Richmond County Tax Commissioner 2026 published district millages](https://arctax.com/property/millage-rates/): **001 Urban 28.284**, **002 County with fire 26.280**, **003 Hephzibah 24.939**, **004 Blythe with fire 26.839** mills. Georgia DOR ordinary residential 40% assessment applied before exemptions and fees.
- New source-backed main buyer district choices `rich-2026-001` through `rich-2026-004` use `0.4 * respective2026Mills / 1000`. Both legacy Richmond district IDs and rates were preserved for saved links, and guidance no longer presents legacy percentages as adopted 2026 rates.
- Executed actual committed buyer district-rate expressions for four fictional prices each, **16/16 passed**. Dedicated Node regression file saved, not executed as a Node file. No homestead/credit/fees, actual parcel bill, end-to-end browser, shared report or PDF verification yet.
- **Current checkpoints:** **27/31 local**, **25/31 current-year district**, **21/31 main buyer district correction**, **0/31 fully certified**. Remaining four NO CASE: Dawson, Lumpkin, Columbia (GA), Richland (SC). Separate partial/historical: Forsyth (GA), Dorchester (SC). Do not treat the original baseline table counts above as current.
