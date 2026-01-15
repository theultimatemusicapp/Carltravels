# Affiliate CTA A/B test plan

## What was changed
- Added a reusable affiliate CTA block component with three variants (value-first, creator-support, comparison).
- Implemented intent classification (Story/Rant, Destination/Guide, Gear/Workflow, Utility/How-to) with manual override support.
- Added deterministic A/B assignment via localStorage (`ctaVariant` set to 1/2/3).
- Implemented lightweight event tracking for affiliate clicks, scroll depth, and time-on-page buckets.
- Added disclosures near the first affiliate links on key pages and included micro-disclosure in each CTA block.
- Applied CTA placements and resource sections to the homepage and the selected top pages.

## How variants work
- **Variant 1 (Value-first):** Title “Quick recommendation”, 1-sentence benefit + audience fit, CTA “Check price”.
- **Variant 2 (Creator-support):** Title “Support the channel”, copy “If you’re buying anyway…”, CTA “Grab it on Amazon”.
- **Variant 3 (Comparison):** Title “My pick (and why)”, two bullet reasons + one alternative, CTA “See options”.

Variant assignment is deterministic per browser:
- `localStorage.ctaVariant` is set once and reused.
- Split is 33/33/33 based on a single random draw.

## Where placements are added
Placement rules align with intent:
- **A Story/Rant:** 1 CTA block near end + 1 simple text link near the intro.
- **B Destination/Guide:** 1 CTA block after intro + “Resources for this trip” near end.
- **C Gear/Workflow:** CTA block near first mention + “Full kit list” at end.
- **D Utility/How-to:** CTA block after the step that matters + end-of-article recap CTA.

## Success metrics
Primary:
- **Affiliate click rate per 100 pageviews** (event: `affiliate_click`).
- **Affiliate clicks by intent type** (segment by `intent_type`).

Secondary:
- **Scroll depth completion** (25/50/75/90) to ensure engagement isn’t harmed.
- **Time-on-page bucket** (30s, 60s, 120s) for early bounce or deeper reads.

## Notes
- CTA variant and placement are passed in event params so variant-level performance can be compared in GA4.
- All tracking respects Do Not Track and fails safely if GA4 is unavailable.
