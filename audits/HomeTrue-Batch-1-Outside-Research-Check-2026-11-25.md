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
| Fulton County Schools | 17.95 approved Oct. 23, 2026 | 17.950 | FCS board bulletin |

## Open issues found

1. Miami-Dade chart conflict: the district rows total 19.9544 (Miami) and 16.8983 (UMSA), but the chart's district code list prints 19.9878 and 16.9317. Both differ by 0.0334. The app uses the row totals. Resolve before certifying.
2. Berkeley SC year label: the official Auditor page is titled "Millage for 2025/2026" and marked "Revised 9-18-2023." The app labels Berkeley rates 2026/27, and its 6% rates match this page (246.5 standard, 306.5 Goose Creek). The outside research also labeled them 2026/2027. The 2026/27 label is unproven.
3. Fulton FCS year label: the bulletin says "2027 Millage Rate" without saying fiscal or tax year. The value matches the app; the year still needs the rate resolution.
4. Atlanta 11.37: the cited document is the city's FY 2026 revenue manual and references 2025 rates. Not accepted as the 2026 tax-year rate.
5. Brevard: the official 2026 PDF does not pair codes to totals in readable form. Not verified.
6. Charleston and Broward: the official pages did not load in this check. Not verified.

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
