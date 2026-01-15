# How to read affiliate CTA results in GA4

## Events to look for
- **affiliate_click**
  - Params: `page_path`, `intent_type`, `placement`, `cta_variant`, `link_domain`, `link_label`
- **scroll_depth**
  - Params: `page_path`, `depth` (25/50/75/90)
- **time_on_page**
  - Params: `page_path`, `bucket` (30s/60s/120s)

## Where to find events
1. **Reports → Engagement → Events**
   - Search for `affiliate_click`, `scroll_depth`, `time_on_page`.
2. **Reports → Engagement → Pages and screens**
   - Add a comparison or secondary dimension for `event name`.

## Recommended explorations
1. **CTA Variant Performance**
   - Exploration type: Free form.
   - Rows: `event name` (filter to `affiliate_click`).
   - Columns: `cta_variant`.
   - Values: `Event count`.
   - Add filter for `intent_type` to compare A/B results by content intent.

2. **Placement Effectiveness**
   - Rows: `placement`.
   - Columns: `intent_type`.
   - Values: `Event count`.

3. **Engagement Check**
   - Rows: `page_path`.
   - Columns: `depth` (from `scroll_depth` event).
   - Values: `Event count`.

## If GA4 is not connected yet
A lightweight fallback stores events in `localStorage` and logs to the console on localhost.
- Look for `affiliateEventLog` in localStorage for recent events.
- When GA4 is added, events will start flowing automatically without changing the code.

## Next steps
- Track clicks per 100 pageviews and compare by intent/variant.
- Pause or replace any CTA variant that underperforms by intent type.
