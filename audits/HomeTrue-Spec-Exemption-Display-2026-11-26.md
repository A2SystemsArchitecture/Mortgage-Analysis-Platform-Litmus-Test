# Spec: Property Tax Exemption Display (Launch)

Date: 2026-11-26
Status: CONFIRMED by A2 2026-11-27; attorney approved both notes exactly as drafted. BUILT on audit branch (no merge, no deploy).
Decision by A2, 2026-11-26: launch with the before-exemption tax, clearly labeled; add exemption estimates later.

## 1. Calculation (no change)
- The tax estimate stays before homestead and other exemptions in all 31 markets.
- Keep the assessment rules already in the app: Georgia 40%, South Carolina 4% legal residence or 6% other, Alabama 10% class, Florida full assessed value.
- No exemption amounts get subtracted anywhere.

## 2. Label on every tax line (new text, ATTORNEY REVIEW REQUIRED)
Placement: under the property tax figure in the analysis, affordability and PDF outputs.
Draft text:
"Estimated property tax before homestead and other exemptions. If you qualify and apply, your bill may be lower, usually starting the tax year after you own and live in the home. Check eligibility with the [County] [Property Appraiser / Tax Assessor]."
- [County] and the office title come from the active market. The link uses the market's existing paUrl.

## 3. South Carolina credit note (new text, ATTORNEY REVIEW REQUIRED)
Shown only in SC markets, under the label:
"Some South Carolina counties apply a local option sales tax credit to owner-occupied homes. This estimate does not include it."

## 4. Florida 2027-2028 side-by-side
Approved earlier (2026-11-26). Built under its own spec. Not part of this change.

## 5. Existing planning note
The current "2027 Property Tax Planning Estimate" note stays word for word unless the attorney revises it alongside items 2 and 3.

## 6. Out of scope
- Exemption calculations in any market.
- The address lookup.
- District relabels or additions (Greenville, Jonesboro, missing cities).
- Rate changes.
- Merge or deploy.

## 7. Build steps after confirmation and attorney sign-off
1. Back up platform.html as platform.pre-exemption-label.html.
2. Add the label and SC note using the attorney-approved text only.
3. Add tests: the label appears in all 31 markets in the analysis, affordability and PDF outputs; the SC note appears only in the 6 SC markets; the county link matches paUrl.
4. Run the full test suite and CI. No merge, no deploy.

## 8. Launch status (unchanged by this spec)
This spec covers the exemption gate's display question only. The launch gates stay as follows:
- latest adopted rate: 25/31 (rate checks in progress; open items listed in the outside research check)
- exemption rules: closes for launch only after this display ships with attorney-approved text
- district geography: 0/31
- calculator scenario tests: 0/31
- full certification: 0/31
