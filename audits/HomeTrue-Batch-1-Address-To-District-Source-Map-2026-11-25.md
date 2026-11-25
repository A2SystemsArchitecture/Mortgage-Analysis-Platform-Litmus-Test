# HomeTrue Batch 1: Address-to-District Source Map

Date: 2026-11-25
Denominator: 31 markets
Data file: HomeTrue-Batch-1-Address-To-District-Source-Map-2026-11-25.csv
Product code changed: none

## Result

| Status | Markets | Count |
|---|---|---|
| A: official source returns a tax district field | 7 Florida counties, Fulton, DeKalb, Charleston | 10 / 31 |
| B: official service found, tax district field not seen | Forsyth, Cherokee, Hall, Richmond, Richland, Greenville, York, Berkeley, Dorchester, Jefferson, Limestone | 11 / 31 |
| C: no public queryable service found | Cobb, Gwinnett, Clayton, Paulding, Columbia, Dawson, Pickens, Lumpkin, Madison, Shelby | 10 / 31 |
| Source codes matched to app district IDs | none | 0 / 31 |
| Missing-address rule written | none | 0 / 31 |
| Ambiguous-match rule written | none | 0 / 31 |

District geography stays unverified for all 31 markets.

## What each status means

- A: the official county or state source carries a tax district code. Florida's source is the DOR NAL tax roll, Field 74 TAX_AUTH_CD. It is an annual bulk file, not a live address lookup. Charleston publishes boundary polygons, so an address needs geocoding first.
- B: the county runs a parcel or GIS service, but this audit did not see a tax district field in it. Richmond's layer is labeled 2023 and "Internal use only." Dorchester sells its tax district layer and has no public service.
- C: the only public tool is a map viewer or qPublic search page. HomeTrue cannot query those reliably.

## Gaps that block address mapping

1. The app has 258 district options across 31 markets. Counties have many more real tax districts. Example: Gwinnett has 4 app options, Clayton 2, Limestone 2. An address in a district the app lacks has no rate to show.
2. Nobody has built a crosswalk from any source code (TAX_AUTH_CD, TaxDist, CVTTXCD, DISTCODE) to app IDs such as bro-code-0211 or dek-uninc-04-2026.
3. The app has no address input. Buyers pick a district from a list.
4. Florida PointMatch covers communications and insurance taxes, not property tax districts. It does not apply.

## Decisions needed before any build

- Missing address: proposed rule is to show no tax amount and ask the buyer to pick a district, with the current disclaimer. Not built. Needs approval.
- Ambiguous match (parcel on a boundary, address matches 2+ parcels, district not in app): proposed rule is to fail closed and show no rate. Not built. Needs approval.
- For C markets: obtain a data feed from the county, or keep manual district selection.

## Next verification steps

1. Open the field list of each B service and confirm or reject a tax district field.
2. Build the Florida crosswalk from the 2026 NAL files to the app's FL district IDs.
3. Build the Fulton, DeKalb and Charleston crosswalks.
4. Contact C counties for a parcel-to-district export.
