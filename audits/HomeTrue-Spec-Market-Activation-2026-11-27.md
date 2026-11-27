# Spec: Per-Market Activation and "Coming Soon" (January 4, 2027 launch)

Date: 2026-11-27
Status: CONFIRMED by A2 2026-11-27; attorney approved the coming-soon wording as drafted. BUILT on audit branch (no merge, no deploy).

## Decision (A2, 2026-11-27)
On January 4, 2027, every market that has passed its gates goes live. Markets still in verification show "coming soon" and turn on individually once they pass. One failing county does not hold its state.

## 1. On/off switch per market
- One list in platform.html, ACTIVE_MARKETS, holds the market keys that are live.
- A market enters the list only when (a) its row in audits/HomeTrue-2027-launch-verification-gates.csv shows every required gate true, and (b) A2 approves it in writing. Nothing turns on automatically.
- Starting state: the list is empty. No market goes live until A2 approves the first list.

## 2. What buyers see
- Live markets work exactly as today.
- Markets not in the list stay visible on the county selector, marked "Coming soon," and cannot be selected.
- Selecting or linking to an inactive market shows the coming-soon message instead of any tax, payment or affordability number.
- Every way into a market is covered: county pills, the affordability calculator, shared report links, and any saved or prefilled market.

## 3. "Coming soon" message (ATTORNEY REVIEW REQUIRED)
Draft text:
"Coming soon. HomeTrue is still verifying property tax and cost data for [County]. Analysis for this market opens once verification is complete."

## 4. Testing access
- The existing tester bypass keeps access to every market so verification work continues.
- Production must not expose the tester bypass to the public (completion tracker item 09).

## 5. Tests
- Inactive markets: no tax, payment, affordability, PDF or shared-report output for any of the 124 markets when the list is empty.
- Active markets: identical output to today for a sample list.
- The coming-soon text matches the attorney-approved wording exactly.
- Tester bypass still reaches all markets.
- Full existing suite stays green.

## 6. Build steps after confirmation and attorney sign-off
1. Back up platform.html as platform.pre-market-activation.html.
2. Add the list, the selector states and the coming-soon message.
3. Add the tests above and run the full suite and CI.
4. No merge, no deploy.

## 7. Out of scope
- Deciding which markets go live (A2 approves each list).
- Rate, district or exemption changes.
- Payments and Stripe.
- Production deployment.
