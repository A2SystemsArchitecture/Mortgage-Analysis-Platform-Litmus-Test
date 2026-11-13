# HomeTrue full launch readiness register

Status: DEVELOPMENT AUTHORIZED; PUBLIC RELEASE ON HOLD PENDING FINAL ATTORNEY APPROVAL AND TEST SIGN-OFF.
Baseline: 2026-11-13. Current production source: main @ 3fc1d90ed17144e1210925cdce875a1c64d980d2.
Release scope: ALL 26 U.S. states and ALL 124 geographic market keys in platform.html, simultaneously. No staged geography.
Brand: HomeTrue Refined Baseline approved November 13, 2026. Do not change logos, aesthetic, palette, layout, or public prices.
Do not deploy this branch into public production merely because Vercel reports READY.

## Verified technical facts

- Vercel project and myhometrue.com verified. Main production deployment READY, source commit 3fc1d90...
- Release branch stages root redirect to /platform.html and removal of expired November 1 notices.
- Main platform.html has an in-page access-code prompt embedded in browser-delivered code. This is not secure authentication.
- Current query parameter tester=true grants Complete-tier access and bypasses the demo count. Must be replaced with authenticated, server-verified reviewer/test access before the public release.
- Current demo counter is stored in browser localStorage, not tied to an account; not an enforceable subscription limit.
- Current showUpgradeFlow() is an alert placeholder, not a Stripe checkout.
- Current PLAN.tier is determined in client-side JavaScript, not by a paid entitlement verified with a server. Paid features cannot be securely granted until this is corrected.
- captureEmail() does not send an email to an actual list; it only changes client UI.
- No STRIPE-prefixed Vercel environment variables were visible in production environment-variable metadata as of 2026-11-13. Do not store Stripe secrets in front-end code.
- Mortgage-rate information last reported as Freddie Mac November 12, 2026 7.11%; verify current official data separately before release.
- Current Gate 1 disclosures promise Friday 7:00 AM ET refresh whereas the configured automation runs Friday at 9:00 AM ET. Counsel-approved wording must be reconciled with reality.
- Some PDF output still contains 'Test Phase — Attorney Review Pending'; any changes to legal language require final counsel approval.
- Current code contains 124 market identifiers with 26 state codes. This is a code census, NOT proof of independent regulatory approval or market data accuracy.
- Marketing claims in rate, PMI, credit and homestead sections require evidence review.
- Current gate acceptance is rendered in client HTML. Retention and audit logging must be independently verified.

## Release gates (all REQUIRED)

[ ] Stripe account connected and business verification confirmed by owner; secrets kept server-side.
[ ] $19/month Essentials and $29/month Complete live Stripe recurring prices reconciled with existing approved pricing; any institutional product handled only if included in authorized launch scope.
[ ] Stripe hosted checkout works in test mode and real-customer checkout in a controlled launch verification.
[ ] Identity/account registration and secure session persistence implemented.
[ ] Server verifies subscription status and tier for every paid entitlement; no premium access through editable URL or local JavaScript.
[ ] Billing customer portal and cancellation/downgrade/renewal/failed-payment processing tested.
[ ] Webhook signature checks and event replay/idempotence verified.
[ ] Secure reviewer access replaces public tester bypass; remove exposed client-side access code.
[ ] Free access limits enforced as approved, without depending only on browser storage.
[ ] Public waitlist and email capture either connected to an actual service or updated to avoid false confirmation.
[ ] Three genuine HomeTrue-produced example reports generated for tiers 1, 2, 3 and verified against independent calculations.
[ ] All 124 markets audited for taxes, insurance, homestead, closing-cost geography and current source evidence.
[ ] Customer experience tested on desktop and mobile; PDF reports, comparisons, errors, rate data and market selector exercised.
[ ] Final attorney review covers live terms, privacy, billing, data claims, subscription wording, and all 26 intended launch states.
[ ] Final attorney-approved exact disclosures match deployed code; signed written approval obtained for final release version.
[ ] Backup and rollback candidate identified; production validation after deployment; release requires deliberate owner approval.

## Change policy

- Work only on isolated launch-readiness branch until technical, commercial and final legal gates close.
- Never change approved visual design, prices, branding, or product scope without owner approval.
- Re-run technical and legal checks after any source changes.
- Neither build READY nor mergeable PR status implies launch authorization.
