# HomeTrue Batch 3 financial evidence and recovery checkpoint
2026-11-18. Review branch only. Production untouched.
State approval: UNRESOLVED for Texas, Louisiana, Arkansas, Mississippi.
Current platform.html blob df227bdd33ef7289465b61d0ff7fc5808139dfc4.

## Verified state financial rules and programmed fixes
Texas: State school-district residence homestead $140,000, as approved Nov 2025. This is SCHOOL-only, never subtract from combined county tax. Texas Comptroller explicitly allows mid-year buyers who qualify for the general exemption to receive proportional benefit if prior owner did not have same exemption for year. Corrected buyer guide falsely requiring Jan 1 ownership in all cases.
 https://comptroller.texas.gov/taxes/property-tax/exemptions/
 https://comptroller.texas.gov/forms/50-114.pdf
Texas TDI title insurance R-5 simultaneous loan+owner policy $100 lender premium under eligibility assumptions, plus $3 guaranty charge from Oct 1 2026: current calculator states $103 only for combined scenario. Real owner policy premium is an additional regulated charge customarily seller paid, not zero transaction cost.
 https://www.tdi.texas.gov/title/titlem3b.html
 https://tdi.texas.gov/title/titlemm6.html

Louisiana: Article VII Section 20 homestead up to $7,500 of ASSESSED value on applicable levies, residential generally 10% valuation, with specific parish/municipal exceptions. Revised guide to avoid implying universal full-levy savings and to direct buyer to actual parish filing deadline; parish-specific deadlines can differ.
 https://www.legis.la.gov/legis/law.aspx?d=206550
 https://www.legis.la.gov/legis/law.aspx?d=101333
 https://www.lasalleassessor.com/assessments/homestead-exemption/
Louisiana licensed notaries are NOT necessarily attorneys (La. SOS state examination route). Fixed two separate customer-facing claims saying every notary is a lawyer.
 https://www.sos.la.gov/notary/application-process
 https://www.sos.la.gov/notary/frequently-asked-questions

Arkansas: 2026 Act 174 raises homestead tax credit to $675 for 2026 assessment (not an assessed-value deduction, and approval required); the existing credit amount was already $675. Corrected guide to avoid promising automatic first-full-bill credit. Arkansas Amendment 79 5% cap applies to growth in taxable assessed value after county reappraisal, with exclusions; corrected misleading blanket description of capped property taxes.
 https://arkleg.state.ar.us/Home/FTPDocument?path=%2Fassembly%2F2025%2F2026F%2FDocuments%2F2026+Fiscal+Session+Summary+Book.pdf
 https://www.dfa.arkansas.gov/wp-content/uploads/AACD_AnnualReport_2025.pdf
 https://pulaskicountyassessor.net/faq/
Arkansas realty transfer charge $3.30 per $1k and default split equally buyer/seller unless agreed otherwise. Current 400k example correctly produces buyer $660 and overall government subtotal $735 including modeled recording allowance.
 https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/miscellaneous-tax/miscellaneous-tax-descriptions/
 https://law.justia.com/codes/arkansas/title-26/subtitle-5/chapter-60/section-26-60-106/

Mississippi: DOR regular homestead credit max $300, based on assessed value up to $7,500 per statutory table, not flat $7,500 market-value deduction; applies to qualifying owner after January 1 status and Jan 1-Apr 1 application. Strengthened guide and closing narrative so buyers aren't promised an automatic first-year saving.
 https://www.dor.ms.gov/county-services/homestead-exemption
 https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions
Mississippi has legal services restricted to attorneys but attorney personally conducting every nonlegal aspect of closing is not established as universal; removed overbroad claim about mandatory attorney-run closing.
 https://msbar.org/professional-regulation/unauthorized-practice-of-law/
 https://ltams.org/resources/recording-fees-and-requirements/

## Executed tests
tests/hometrue-batch3-tax-tests.js: 4 hypothetical purchase-and-mortgage cases, 9 cost assertions passed.
Batch2: 9 government tax assertions passed, Batch1: 13 passed, guide render: 124 passed, arithmetic smoke: 372 passed. All checked using platform.html code as actually saved. Tax rates at local taxing-district level NOT independently certified.

## Unresolved before state signoff
All state/county rate schedules, local taxing unit composition and property-specific 2026/2027 assessments, eligibility and taxable-value basis, closing fee assumptions (recording, premium, attorney/notary, insurance) and parcel exemptions; Texas seller owner title premium and 2026 Texas regulator fee details depending transaction; Louisiana Orleans and other city distinctions; Arkansas per-assessment-year credit timing; Mississippi exact table and special exemptions. All remain UNRESOLVED; none approved. Continue next batch from permanent branch and return for outstanding full evidence reconciliation before final approval.
