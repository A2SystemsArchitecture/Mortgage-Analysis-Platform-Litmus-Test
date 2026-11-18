# HomeTrue Batch 5 financial evidence and recovery checkpoint
Date 2026-11-18. States Missouri Kansas Maryland Delaware Maine.
Approval: UNRESOLVED for all five states. Review branch only. No public production changes.

## Official state-rule corrections confirmed in review code
MISSOURI: Under RSMo 135.030 effective Aug 28, 2025, for property-tax credit claim year 2026, single full-year owners have income limit $42,200, married combined full-year owners $48,000; single renter/part-year $38,200 and married renter/part-year $41,000. Annual limits adjust from 2027. Max owner credit $1,550 for 2026. Corrected old customer guide presenting only $30k/$34k 2025 figures. Credit not automatically subtracted.
Official statutory source https://www.revisor.mo.gov/main/OneSection.aspx?section=135.030

KANSAS: Kansas DOR 2025 claimant criteria for K-40H $43,389 max household income and $700 maximum refund, K-40PT (SAFESR) 65+ and max $25,380 income, refund 75% of property tax, K-40SVR qualifying seniors, disabled veterans and surviving spouses maximum $58,041 household income. Only one program per household. Corrected Kansas guide and Johnson county note, distinguishing three programs instead of one. Refund is not automatic homestead exemption. Later annual thresholds must be confirmed.
Official https://www.ksrevenue.gov/homesteadbook25.html

MARYLAND: Homestead taxable assessment increase limited to state 10% or lower local cap for qualified approved owners; does NOT mean entire tax bill rises max 10%. Existing guide largely correct; cannot verify every transfer/recordation levy and first-time buyer status from county alone. Government transfer example at $400k: standard 0.5% state transfer taxed 50/50 buyer assumed $1k, Montgomery 1% county transfer buyer share $2k, local recordation separately calculated. No further blanket changes made.
Official https://dat.maryland.gov/realproperty/Pages/Maryland-Homestead-Tax-Credit.aspx

DELAWARE: Official state first-time homebuyer reduction one-half percentage point from buyer side of state realty transfer tax, capped at $2k for $400k of purchase value; buyer identity and tax district affect applicability. Existing modeled 2% buyer transfer cost precredit was retained because cannot infer first-time buyer qualification, but customer copy declaring this a correct actual tax bill was softened to preliminary estimate.
Official https://revenue.delaware.gov/first-time-home-buyer-tax-credit/

MAINE: No credible universal statute discovered requiring an attorney personally to conduct EVERY residential closing; Maine law 9-A MRS 3-311 addresses rights to choose title search lawyer IF lender requires lawyer title search. Removed unsupported 'attorney-closed state' universal label in customer closing guide. Existing 2027 property-specific 12-month ownership homestead rule preserved.
Official https://legislature.maine.gov/statutes/9-a/title9-Asec3-311.html
Official https://www.mainelegislature.org/legis/statutes/36/title36sec683-A.html

## Calculation tests
tests/hometrue-batch5-tax-tests.js: five fictional $400k home with $320k loan; 10 assertions checked MO no transfer tax, KS no mortgage registration tax, MD 0.5% and county 1% half share assumptions, DE 2% precredit buyer planning, ME $2.20/$500 tax split: passed. Previous 4 batches and 372 case arithmetic/124 guide tests previously passed. These DO NOT certify full financial accuracy.

## Unresolved before state approval
All five require audited official school/municipality/district tax rates, assessed value, exemptions, county fee schedules, buyer qualification; Maryland/deed tax local variability and first-time buyer exemption; Delaware county realty-transfer rate and first-time buyer relief; Maine municipality assessment ratio and recording fees; Missouri annual inflation adjustments and local senior tax relief; Kansas 2026 tax-year threshold after 2025 claims. Not yet approved. Resume in Batch 6 using saved branch, then return to unresolved audit items. No production promotion.
