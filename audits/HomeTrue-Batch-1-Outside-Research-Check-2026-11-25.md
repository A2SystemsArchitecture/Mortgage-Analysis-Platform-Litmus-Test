# HomeTrue Batch 1: Check of Outside Research Results

Date: 2026-11-25
Method: opened each cited official URL and compared the printed values to platform.html
Product code changed: none
Register flags changed: none

## Rates that match the official source and the app

| Market | Official value | App value | Source |
|---|---|---|---|
| Miami-Dade, City of Miami | 19.9544 total, 2026 ADOPTED chart | 0.0199544 | miamidade.gov 2026-adopted-millage-chart.pdf |
| Miami-Dade, Unincorporated | 16.8983 total | 0.0168983 | same |
| Cherokee, Unincorporated | 5.712 + 16.450 + 1.500 + 0.264 + 3.023 = 26.949, tax year 2026 | 0.4 x 26.949 = 0.0107796 | cherokeecountytax.com (Tax Commissioner) |
| Richmond 001 / 002 / 003 / 004 | 28.284 / 26.28 / 24.939 / 26.839, tax year 2026 | 0.4 x each, exact | arctax.com (Richmond County Tax Commissioner) |
| Broward 0012 / 0013 / 0311 / 0312 / 9312 / 0512 / 0513 / 3312 / 3313 | 19.0149 / 17.8563 / 18.5338 / 18.4026 / 19.3865 / 21.9985 / 20.8399 / 17.5663 / 16.4077, 2026 column (page does not say adopted) | all 9 exact | bcpa.net/millage.asp (checked 2026-11-26) |
| Fulton County Schools | 17.95 approved Oct. 23, 2026 | 17.950 | FCS board bulletin |

## Open issues found

1. RESOLVED 2026-11-26 (A2 read of chart): 19.9878 and 16.9317 sit in the Total Millage 2025 column. The 2026 column matches the app. Original note: Miami-Dade chart conflict: the district rows total 19.9544 (Miami) and 16.8983 (UMSA), but the chart's district code list prints 19.9878 and 16.9317. Both differ by 0.0334. The app uses the row totals. Resolve before certifying.
2. Berkeley SC year label: the official Auditor page is titled "Millage for 2025/2026" and marked "Revised 9-18-2023." The app labels Berkeley rates 2026/27, and its 6% rates match this page (246.5 standard, 306.5 Goose Creek). The outside research also labeled them 2026/2027. The 2026/27 label is unproven.
3. Fulton FCS year label: the bulletin says "2027 Millage Rate" without saying fiscal or tax year. The value matches the app; the year still needs the rate resolution.
4. Atlanta 11.37: the cited document is the city's FY 2026 revenue manual and references 2025 rates. Not accepted as the 2026 tax-year rate.
5. Brevard: the official 2026 PDF does not pair codes to totals in readable form. Not verified.
6. Charleston: the official PDF blocks automated access. On 2026-11-26 A2 relayed a read of the card titled "2026 MILLAGE LEVY": City TD 34/35/36/52/63/71/72/99 = 300.8 (82.0 city + 218.8 countywide), Mt Pleasant TD 21 = 263.1 (44.3 + 218.8), school operating 145.2 inside the 218.8. All three match the app. The card does not say adopted or approved. Status: matched by relayed read, not fetched directly by this audit. The 218.8 sub-levy breakdown sits in the Auditor's separate 2026-millage-breakdown.pdf, which nobody has checked.

## Florida homestead change with launch impact

Florida DOR bulletin PTO 26-21 (Nov. 5, 2026) reports voter approval of Amendment 3 on Nov. 3, 2026:
- non-school homestead exemption up to $150,000 on the 2027 roll and $250,000 on the 2028 roll
- school levies unchanged

Separately, the DOR CPI table confirms the 2026 additional exemption maximum of $26,411.

Every Florida homestead estimate in the app needs review against this change before launch. This needs a spec discussion. No build.

## GIS fields confirmed

- Cherokee: TAXDISTRIC plus Property_Address. Moved to status A.
- Greenville: DIST (Tax District) plus site address parts. Moved to status A.
- Forsyth layer 0: SITEADDRESS exists, no tax district field. The outside research wrongly reported no site address field.

The source map now shows 12 A, 9 B and 10 C, out of 31.

## Not provided

The outside researcher declined Task 4 (real tax bills). Alternative: run each county's official tax estimator with set test values. No real household data is needed.

## Update 2026-11-26

- Charleston: A2 confirmed on the 2026 card, page 1: 300.8 and 263.1, sample calculation 0.3008. Status: matched against official card.
- Berkeley: phone confirmation of the 2026 year label still open.

## Spec decisions by A2, 2026-11-26 (recorded, NOT BUILT)

1. Florida homestead: show 2026, 2027 and 2028 tax rolls side by side, and make the buyer's Florida residency status explicit. Do not pick one year from the closing date. Residents as of Dec. 31, 2026: up to $150,000 (2027) and $250,000 (2028) non-school. Newcomers: $25,000 school and up to $50,000 non-school, with the increase from the fifth exemption year (DOR PTO 26-21).
2. No address: show no tax amount until the buyer enters an address or selects a district.
3. Unclear district match: show no rate or calculation. List the possible districts for the buyer to confirm.

Any build needs a full spec read-back and explicit confirmation first. Gate and disclaimer text for these displays needs attorney review.

## Update 2026-11-26 (afternoon)

- Palm Beach: VERIFIED against pbcpao.gov "2026 Final vs Proposed Millage Rates." All 9 dated app options rebuild exactly from the 2026 final authority rates. Unincorporated = 16.2192. Each city option = countywide levies plus city operating and debt (WPB 20.3456, WPB DDA 21.3156, Boca 06154 16.9090, Boca 06625 15.8759, Boynton 19.4172, Delray 18.5910, Delray DDA 19.5910, Wellington 18.6892). Which authorities apply to each code is inferred from the exact totals, not printed per code.
- Martin: partial. The DR-422 certification confirms BCC operating 6.5614, fire/rescue 2.6376, stormwater 0.5722, parks 0.1474, districts 1 to 5, CSC 0.3618, and SFWMD. School lines are unlabeled in the extracted text. Stuart, Jupiter Island and Indiantown fall past the first fetch window. Code totals are not yet rebuilt.
- Indian River: VERIFIED against ircpa.org "Indian River County Final 2026 Millage Rates and Fees." All 11 dated app options match the printed FINAL 2026 totals exactly (1/1D/1E/3C 14.1803, 2 16.3615, 3A 13.2071, 3F 13.9192, 4 18.0817, 5 11.9168, 6 11.7650, 7 group 14.0285, 7E 13.7674, 8 15.8595, 9 13.6297). The three legacy planning options (uninc, Vero, Sebastian) carry no tax code and stay unverified. The chart also lists fees, which the app does not model.
- Brevard: NOT VERIFIED. The bcpao.us 2026 millage PDF prints a TOTALS line whose first 15 values match the app's first 15 code values in the same order. The extracted text does not pair codes with totals, so code alignment is unproven. Needs a screenshot or the millage-code lookup.
- Clayton: NOT VERIFIED. Resolution 2026-213 PDF is a scan with no readable text. Needs a screenshot.
- Hall: NOT VERIFIED. Agenda item 4843 (item 559/2026, Aug. 27, 2026) approves the 2026 tax levy resolution but prints no rates. The rates sit in the attachment "2026 Tax Levy Resolutions - Hall County Districts." Needs that attachment.
- Columbia: NOT VERIFIED. The official page now links "Download the 2026 Tax Calculation Workbook (XLSX)" (DocumentCenter/View/10735). The file arrives as binary and the workspace network blocks a direct download. Needs the file attached.
- Richland: NOT VERIFIED. The Auditor page links "2026 Millage Rates" (files/assets/county/v/1/auditor/documents/2026-millage-schedule.pdf). The PDF has no machine-readable text. Needs a screenshot.
- Greenville: PARTIAL. The official "Greenville County 2026 Millage Sheet" (Auditor) lists county 59.9 and school 188.7 (operating 141.2, debt 47.5). City of Greenville codes 500-517 total 330.3 with city 81.4, so the non-city base is 248.9, matching the app's 248.9 gross and its 107.7 (248.9 - 141.2) for the 4% class. The sheet lists no district 000; its lowest code is 005. The app's "District 000" label has no match on the sheet, and the 0.3 gap between 59.9 + 188.7 = 248.6 and 248.9 is unexplained. Fix the label and identify the 0.3 before certifying.
- York: MATCHED (A2-supplied text of "York County, South Carolina 2026 Millage Levies"; not fetched directly by this audit). Rock Hill (RH): city 94.7 + school 263.1 + county 67.2 = 425.0 total; 4% owner-occupied 209.9. Both match the app. Internal check: 425.0 - 209.9 = 215.1 = Rock Hill special school 185.1 + countywide school 30.0, which the sheet says is the exempt school operating levy. The three legacy York options carry no year and stay unverified. A source URL still needs recording.
- St. Lucie: VERIFIED (A2 screenshot of "2026 Final Millage Rates," file Final26 PDF). All 7 dated app options match the TOTALS row exactly: 0001 18.8075, 0002 18.9427, 0050 19.4627, 0009 19.1893, 0011 group 22.0043, 0022 group 24.0293, 0041 21.8691. The 4 legacy options carry no code and stay unverified. A source URL still needs recording.
- Pickens: VERIFIED for county and school (A2 screenshots of the Oct. 5, 2026 called-meeting minutes, approved Oct. 19, 2026): county 6.606 and school 10.60, combined 17.206 adopted. These match pick-uninc-2026. The Jasper city 7.636 in pick-jasper-2026 is not in these minutes, so it stays unverified.
- Paulding: PARTIAL (A2 screenshot of the "Current 2026 Tax Digest and 5-Year History of Levy" notice). It shows 2026 county net M&O of 4.300 (gross 7.07 less 2.77 LOST rollback), matching the app's 4.300. This is a pre-adoption notice for the Aug. 11, 2026 meeting, and the sheet's footnote marks some figures "Estimated." It does not show the app's 2.100, 0.800 or 17.800 components. Adoption proof and the other components remain open.
- Brevard: VERIFIED. A2-supplied text of the bcpao.us "2026 Millage" (Tax Collector Lisa Cullen) TOTALS row lists 38 values. All 38 match the app's 38 dated codes exactly, including 2700 = 10.2964 (checked by script). Column 12 is printed as 2200 above and 2800 below, both mapping to 12.2275. Legacy options without codes stay unverified.
- Clayton: PARTIAL (A2 screenshot of the Resolution 2026-213 attachment "Distribution of Clayton County Proposed Mill Rates, F.Y.E. 6-30-27"). County M&O gross 18.5200 less 3.4680 LOST gives net 15.0520, and unincorporated fire is 4.5000. Both match the app. The page says PROPOSED, so adoption needs the resolution's operative page. School 20.000 and Jonesboro 9.000 do not appear on this page.
- Hall: still NOT VERIFIED. The agenda item link repeats; the attachment "2026 Tax Levy Resolutions - Hall County Districts" is still needed.
- Columbia: VERIFIED (A2-supplied official workbook "2026 Tax Calculation Workbook (Final)," Columbia County Tax Commissioner, read by script). Mill rate table, districts 21-24 (unincorporated with county fire): gross county 7.297, less sales tax credit 3.235, giving net 4.062; fire 2.788; county bond 0.429; school 14.997; school bond 0. Total 22.276, matching col-2026-uninc-fire exactly. District 25 (Grovetown): no fire; city gross 13.261 less 6.313 credit, giving net 6.948. Total 26.436, matching col-2026-grovetown-full exactly. District 26 (Harlem): city net 9.350 and total 28.838; the app has no Harlem option. col-2026-grovetown (19.488, city omitted) is a correct subtotal but understates a Grovetown bill. District 24 carries a street light charge. The workbook's exemption table (S1 10,000 county/fire/school; L3/L5 40,000 on county, fire, bond and school; S5/SS 126,526) is input for the exemption gate and has not been checked against the app.
