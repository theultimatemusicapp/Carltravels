# CarlTravels Route Finder Backend

This is an undeployed Cloudflare Worker skeleton for live providers that require secret credentials.

Cloudflare Workers currently has a no-upfront-cost Free plan with 100,000 requests per day, 10 ms CPU per invocation and 50 subrequests per invocation. Do not deploy this without explicit approval.

## Secrets

Set these as Worker secrets, never in browser JavaScript:

- `AMADEUS_CLIENT_ID`
- `AMADEUS_CLIENT_SECRET`
- `TRAVELPAYOUTS_TOKEN`
- `NAVITIA_TOKEN`
- `DUFFEL_ACCESS_TOKEN`

## Public Configuration

Public affiliate IDs and domains belong in:

`/labs/route-finder/route-finder.config.js`

- `travelpayouts.partnerMarker`
- `travelpayouts.whiteLabelDomain`
- `travelpayouts.subId`
- `twelveGo.affiliateMarker`

## Endpoint

`POST /api/route-finder/search`

The Worker should return provider-neutral route results. Until real credentials are configured, it returns explicit provider errors instead of invented fares or schedules.
