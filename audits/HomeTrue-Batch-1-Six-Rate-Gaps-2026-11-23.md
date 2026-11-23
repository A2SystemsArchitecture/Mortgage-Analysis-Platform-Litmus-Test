# HomeTrue Batch 1: six open adopted-composite gates (November 23, 2026)

Branch: `tax-corrections-audit-nov-2026`. Scope: FL, GA, AL, SC, 30 markets, Dorchester excluded. No release or production changes. This is source triage, NOT adoption certification.

Controlling register: `audits/HomeTrue-2027-launch-verification-gates.csv`. The six records below are **false** for `batch1_latest_adopted_composite_verified`; do not set them true merely from a partial authority rate, fictional calculation, budget proposal, or nonresidential tax bill.

| Market | Verified partial evidence | Exact missing evidence for market-wide rate gate |
|---|---|---|
| Palm Beach FL | PBC Property Appraiser final/proposed tax-roll rate charts exist; audit branch already documents standard unincorporated 2026 rate 16.2192 mills | Reconcile every buyer-selectable city/parcel taxing district against final adopted 2026 tax-code composites, not only the standard unincorporated example; preserve year-unknown selectors as unsupported. Official index: https://pbcpao.gov/tax-roll.htm |
| Fulton GA | 2026 county and selected North Fulton city/school elements plus four city compositions partially reconciled | Full rate compositions for Atlanta and historic generic options, with correct independent school authority and parcel-specific overlays. Fulton Nov 2026 supplemental school resolution: https://fulton.legistar.com/LegislationDetail.aspx?GUID=9B3C735E-0EB5-4951-A5DC-B16F55C0E077&ID=8305262&Options=&Search= |
| Gwinnett GA | County Tax Commissioner confirms 2026 county/school composite options separately from city-billed rates; Lawrenceville city component previously reconciled | Obtain final adopted **2026** municipal enactments/bills for Suwanee and Duluth, check distinct county and city taxable bases/credits, then re-run named district scenarios. Official county chart: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates ; city tax explanation: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes |
| Forsyth GA | Official issued 2026 tax bill supplies 24.458 mills for non-exempt **commercial** district 001 | Residential applicability, other buyer-selectable municipal/local districts, all required city and school/service elements. A commercial bill is not a county-wide homeowner composite. Existing bill reference in verification ledger. |
| Dawson GA | Official issued 2026 **commercial** district 001 bill identifies 16.263 mills net county+school | Residential-specific sources, other district/city options, and full district coverage; commercial bill alone is not market-wide certification. Existing bill reference in verification ledger. |
| Lumpkin GA | Official issued 2026 Dahlonega **county-owned** property bill documents one district | Verify standard taxable residential parcel levy, Dahlonega vs unincorporated differences and all buyer-selectable district options; exempt/public property bill not enough. Existing bill reference in verification ledger. |

## Critical source-year classification

- Suwanee city Sept 2, 2026 budget news **explicitly called 4.93 mills proposed**, with council adoption expected Sept 22. It is **not an adopted-rate ordinance**: https://www.suwanee.com/Home/Components/News/News/1230/159 . Current city property-tax page says 4.93 mills but does not itself establish the final 2026 ordinance or adopted meeting vote: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes . Do not automatically mark the 2026 source-year verified from a budget assumption.
- Gwinnett county chart identifies separately billed county/school rates. Never add or omit municipal levies because two districts happen to yield the same combined numeric rate: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates .
- A third-party report describes Duluth Ordinance O2026-37 as adopting **6.551 mills** on Aug 24, 2026, but primary adopted ordinance/minutes were not independently retrieved in this pass. Treat as **lead only** pending primary evidence: https://citizenportal.ai/articles/11051498/georgia/gwinnett-county/duluth-city/city-of-duluth-adopts-2026-millage-rate-at-6551-mills .
- Fulton County November supplemental school-rate action corroborates that 2026 final school-rate evidence requires the right adoption source. A proposal or temporary bill using 2025 rates cannot satisfy the 2026 gate.

## Enforcement

Maintain all six flags false until verified. No claims of 30/30 certified. Thirty-market full financial certification remains **0/30** in the reviewed register: exemptions/eligibility, parcel geography, buyer scenario certification, and final signoff are each 0/30. Following an authoritative code correction, rerun all applicable Node, PDF, and browser regressions and save run artifacts. The financial release gate must remain blocking throughout.

## November 23 official Palm Beach final-vs-proposed authority reconciliation

Direct Palm Beach Property Appraiser **official 2026 FINAL** authority schedule, not the earlier proposed rate column: https://pbcpao.gov/pdf/taxroll/2026%20Final%20vs%20Proposed%20Millage%20Rates.pdf . Confirmed municipality **authority components only** (not all-in parcel tax-code composites):

| Municipality | 2026 FINAL municipal mills | 2026 PROPOSED municipal mills | Certification consequence |
|---|---:|---:|---|
| West Palm Beach | 8.0803 | 8.1308 | Source final differs from proposal; city planning option still has unknown parcel code |
| Boca Raton | 3.6476 | 3.6476 | City component confirmed only |
| Boynton Beach | 7.2052 | 7.7500 | Source final differs from proposal |
| Delray Beach | 6.3501 | 6.4371 | Separate debt-service levy 0.0289; parcel applicability unknown |
| Wellington | 2.4700 | 2.4700 | City component confirmed only |

The same official chart supports 12 existing standard-unincorporated components totaling **16.2192 mills**. GitHub review rechecked the actual branch `platform.html` arithmetic and confirmed all five other named Palm Beach city options explicitly say tax code unverified/planning only and do **not** claim a verified 2026 tax year. Added `tests/hometrue-palm-beach-2026-final-vs-proposed-guard.js` to the Batch 1 CI suite so later edits cannot silently promote these city options. This is an official partial-source advance, **not** a complete 2026 parcel district-composite verification or final tax liability determination. Palm Beach's composite and all full financial gates remain false.

## November 23 Duluth and Suwanee adoption corroboration, primary proof still open

Public reports on Duluth August 24, 2026 meeting independently describe a five-to-zero council adoption of Ordinance O2026-37 at **6.551 city mills** (not the whole-property 2026 composite): https://citizenportal.ai/articles/11051498/georgia/gwinnett-county/duluth-city/city-of-duluth-adopts-2026-millage-rate-at-6551-mills and https://citizenportal.ai/articles/9591226/georgia/gwinnett-county/duluth-city/duluth-adopts-2026-tax-millage-at-6551-mills . The existing buyer code uses **6.551** but intentionally does not stamp it as officially verified for 2026. Retrieve the city-certified ordinance, adopted minutes, or official tax bill before changing this source-year status. Even after municipal adoption is verified, school/county boundaries, exemptions and separately assessed fees remain unverified.

Suwanee's **official September 2, 2026 announcement** explicitly calls **4.93 mills proposed** pending September 22 council action: https://www.suwanee.com/Home/Components/News/News/1230/159 . Its current property taxes page states 4.93 mills without providing an adoption-date document: https://www.suwanee.com/government/city-hall/business-services-department/property-taxes . No signed September 22 adoption retrieved in this pass; do not stamp 2026 merely because the municipal site has a live rate.

**No production or market certification change justified from these leads.**

## Gwinnett locality-specific fee discovery and independent rate math

The City of Duluth public ordinance list records **Ordinance O2026-36, adopted August 10, 2026**, establishing *annual increases in stormwater fees*, and an additional May 11 ordinance amending stormwater user fee billing/collection. Official municipal legislation index: https://library.municode.com/GA/Duluth/Code_of_Ordinances . The precise 2026 fee owed by a particular parcel is **not determined** by its home purchase price or the 6.551 municipal millage; it requires a bill/property classification and any rate-specific exemption or tier. Do not silently include zero stormwater cost in a certified all-in buyer total.

The modeled Gwinnett 2026 standard **county-side** 31.600 mills for incorporated Duluth is sourced separately from city tax, versus 34.860 mills for a standard unincorporated county district: https://www.gwinnetttaxcommissioner.com/pt/property-tax/billing-information/millage-rates . The Duluth reported adopted city rate of 6.551 would make **38.151 mills** of pre-exemption ordinary assessed value on the represented combined district. In Georgia's 40%-assessment illustration, a $400,000 purchase-value assumption produces 160,000 assessed and **$6,104.16** gross before exemptions, credits and extra charges: $5,056.00 county side + $1,048.16 city. This is a **fictional gross calculation**, not a 2026 official homeowner bill, and is not sufficient to promote the whole Gwinnett market gate. The City ordinance O2026-37 original record is still needed to prove city adoption, as are parcel-to-district and fee eligibility records.

Potential 2027 relevance: separate annual stormwater fee increases cannot be predicted solely from 2026 ad valorem millage. Independently verify current-year stormwater bill and applicable city rate schedule before full certification.

## November 23 Lumpkin 2026 source chronology: revised levy is a critical gate

A public-record archive of Lumpkin Board of Commissioners September 15, 2026 special meeting minutes reports unanimous approval of county Resolution **2026-54**, establishing the 2026 ad valorem millage. A later October 15, 2026 special called meeting record reports approval of Resolution **2026-57**, **revising** the same 2026 millage. The October resolution supersedes any inconsistent September figure, so do not certify a 2026 Lumpkin county component from the September adoption or one sampled county-owned tax bill without comparing the actual revised resolution, school authority adoption and final issued residential district bill.

Public-record transcriptions: https://gridwatchtheusa.com/docket/georgia/dahlonega/on-the-agenda-dahlonega-lumpkin-county-board-of-commissioners-work-session-data-center-oct-6/ and https://gridwatchtheusa.com/docket/georgia/dahlonega/in-the-minutes-dahlonega-lumpkin-county-board-of-commissioners-work-session-data-center-nov-3/ . The dated minutes establish the sequence, **not the revised rate amount**. Original county Resolution 2026-57 and school board October 21 action remain required before any `taxYear: '2026'` year stamp is attributed to a market-wide residential composite.

Official Lumpkin school board public notice announces a scheduled **October 21, 2026** 7:30 AM millage meeting. A notice of a future adoption is not the adopted school levy; verify the board vote and approved figure from its primary minutes. School notice: https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/926/Lumpkin_County_Schools/76a47118-e2f3-4eda-8c37-8c107a28ab8b/FY27-Digest-Levy-5-year-History---Google-Sheets.pdf?disposition=inline .

**Decision**: preserve Lumpkin `batch1_latest_adopted_composite_verified=false` and retain older tax-bill examples as limited historical evidence. No replacement numeric composite or source-year assertion authorized without the revised adopted rate.

## November 23 official archive retrieval (TinyFish government-record follow-through)

**Lumpkin original government archive located and read:** the county's own CivicClerk combined November 17 board packet includes October 15, 2026 *Special Called Meeting Minutes*, pages 11–12 of that packet. Those minutes identify Resolution **2026-57** explicitly as a revision to 2026 ad valorem millage and record its approval by the board, rather than merely a proposal. Primary county-hosted evidence: https://lumpkincoga.api.civicclerk.com/v1/Meetings/GetMeetingFileStream(fileId=4469,plainText=false) ; official October 15 meeting record: https://lumpkincoga.portal.civicclerk.com/event/1122/files . **The meeting minutes do not state the revised numeric millage.** The exact resolution document and its adopted figures must still be obtained before replacing the 8.877-county-mill sample-bill component or confirming it is unchanged. No number has been invented or promoted.

**Duluth primary government minutes located through TinyFish search index:** original city-hosted PDF titled `8-24-26 Spec Call WS draft min.pdf` reports the motion to approve Ordinance **O2026-37**, setting 2026 city millage at **6.551**. Primary city file: https://cms4files.revize.com/duluth/8-24-26%20Spec%20Call%20WS%20draft%20min.pdf . The city PDF was discoverable in its search index but its origin file was **not independently retrievable for full-document inspection** in this execution; the filename also explicitly says **draft minutes**. Therefore this is stronger source attribution than commercial reports, but still not a verified signed final ordinance or approved-minutes record. The programmed 6.551 municipal component remains a reasonable *reported adopted* calculation assumption, not enough to mark Gwinnett's county-wide composite certification as passed.

**Source classification:** original government packet read (Lumpkin), original city PDF indexed but full content inaccessible (Duluth), secondary reported adoption (Duluth). Both markets remain unverified for the complete adopted-rate composite and full financial certification.
