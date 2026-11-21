# HomeTrue Batch 1: certification gate, 2026-11-21

**Decision: NOT CERTIFIED; NOT READY TO MERGE.** Scope remains the existing 31 markets in FL (7), GA (14), AL (4), and SC (6), on review branch `tax-corrections-audit-nov-2026`. This is a gate audit, not a waiver or change to architecture/branding/pricing or approval to deploy.

## Controlling reconciliation
- 124-market inventory retained; Batch 1 contains **31 unique markets**. Controlling detail: [Batch 1 verification ledger](HomeTrue-Batch-1-Verification-Ledger.md).
- **30 / 31** markets have **some** documented local tax calculation, including older-year or incomplete cases.
- **28 / 31** have a documented current-year (2026, or Berkeley 2026–27 period) district calculation.
- **23 / 31** have documented main buyer district pre-exemption rate corrections in audit branch.
- **0 / 31** full market certifications; **0 / 4** state certifications. These milestones measure different requirements and cannot be consolidated into a percent complete.
- The 124-market launch gate register is a separate five-gate release matrix, not a substitute for evidence ledger. Some `official_component_records=0` in existing markets still reflect stale provenance indexing. Never infer absence of research from this field.
- [Dawson/Lumpkin source follow-up](HomeTrue-Dawson-Lumpkin-2026-Source-Followup.md) and the primary issued [Lumpkin tax-year 2026 courthouse parcel bill](https://lumpkincountyga.governmentwindow.com/pay_bill.html?bill_no=10410&tax_year=2026) added a documented Lumpkin 2026 Dahlonega district case. Parcel is exempt and does not prove actual household bill.
- No new Dawson 2026 **issued non-exempt itemized bill** was retrieved. It remains the sole market without documented locally reconciled district case. Official 2026 county notice 5.463 mills and school announced 10.800 mills; their arithmetic sum 16.263 is a plausible restricted component example, **not sufficient as adopted full 2026 district tax bill**. Tax estimator has an explicit planning disclaimer. Source: https://www.dawsoncountyga.gov/436/Tax-Estimator and https://www.dawsoncountyga.gov/DocumentCenter/View/2156/2026--5-Year-History-of-Levy and https://www.dawsoncountyschools.org/departments/finance/budget__finance .
- **Date trap:** Georgia DOR's latest listed PDF is headed **2025**, although published in March 2026. Do not treat that list, the county **FY2026** guide's **2025 levy**, or school tentative 2026 notices as an independent final 2026 adoption. https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates .

## Required remaining certification gates

1. **Tax-year, district and parcel coverage:** Match every modeled rate/exemption to the correct county, school, municipality and special district with adopted source year, including Dawson signed county and school actions or issued non-exempt bill; current final 2026 Forsyth composite and Dorchester current 2026 schedule; all other markets' incomplete city/special district choices.
2. **Homeowner eligibility and assessed values:** Confirm school-versus-county exemption allocation (FL), GA county/city/school local homesteads, Alabama Class III/H-1 and conditional exemptions, SC legal-residence 4%/school operating relief versus 6% ordinary and credits. Dawson HB 824 grandfathering and Lumpkin age/income/levy-based exemption branches remain unverified in main buyer output.
3. **Government and transaction charges:** Independently verify applicable deed, mortgage, intangible, recording, title and fee rules, payer allocation and exceptions, parcel-based non-ad-valorem/solid-waste/service charges; no assumed price multiplier substitutes for detailed computation.
4. **End-to-end code execution:** Re-execute all applicable committed Node test scripts on the current audit branch with recorded results and failing cases; independently calculate fictional buyer scenarios; test actual main buyer calculator, affordability, shared report, PDF and browser UI. Prior documents recorded scenario arithmetic and saved test files but explicitly note many complete Node suites/DOM/PDF were not executed.
5. **Evidence and controlled release:** Put exact official citation, rate/eligibility effective date, code path, test fixture, result and review decision beside each market. Keep `full_launch_certified=false` until all applicable gates pass. Any proposed release requires explicit authorization, branch reconciliation with main, and legal/financial sign-off.

## Specific known numerical discrepancy requiring correction, not automatic deployment

- Lumpkin issued 2026 county-owned Dahlonega parcel bill lists county M&O **8.877**, school **12.929**, Dahlonega city **2.964** and city public safety **0.500** mills; sum **25.270 mills** for that district.
- Existing legacy main buyer `lump-dahlonega` multiplier is **0.0072** and `lump-uninc` is **0.0065**, not certified 2026 rates. Under hypothetical ordinary GA 40% assessed value, this particular Dahlonega 25.270-mill levy would imply a **0.010108** pre-exemption purchase-price factor. On fictional $575,000 value, that is **$5,812.10** versus legacy **$4,140.00**, a difference of **$1,672.10**; it does **not** determine a tax-exempt government parcel's actual due amount (which is $0) or a homeowner's actual 2026 liability. A valid change needs residential district applicability and exemption/fee tests first.
- Dawson legacy `daw-uninc` rate **0.0060** and `daw-dawsonville` **0.0065** remain planning multipliers, not certified 2026 district totals.

## Do-not-close decision
A claimed "100% Batch 1 financial accuracy certification" would contradict the verified ledger and actual code/test coverage. **Batch 1 is not final**. No production or `main` changes, merger, pricing, visual changes, or unsupported certification are authorized by this record.

## Same-day bounded correction and validation
- Audit branch `platform.html` added `lump-dahlonega-2026` as a **separate** 2026 pre-exemption buyer district selection using county 8.877, school 12.929, city 2.964, city public safety 0.500 from official issued 2026 bill 2026-10410, with the government tax-exempt parcel source caveat. Existing legacy `lump-dahlonega` and `lump-uninc` IDs retained with their original planning rates. No change to main or production.
- Re-fetched committed `platform.html`: **10/10 direct source and arithmetic checks pass**, comprising unique option ID, component presence, both legacy rates preserved, explicit source/qualification note, and five independent property-value formulas. No full browser, PDF, external Node runtime, fee, exemption eligibility, actual residential liability, or 2027 tax certification follows from these tests.
- Ledger and 124-market verification gate have been reconciled to **30/31 local documented; 28/31 current-year; 23/31 main buyer-rate correction; 0/31 full certified**. Dawson remains missing a 2026 non-exempt full district tax statement; Forsyth full 2026 county/fire/bond and Dorchester full 2026 district rates remain incomplete. Other 31-market fee, exemptions, shared report, UI and final approval are also still open.
