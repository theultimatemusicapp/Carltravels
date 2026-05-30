# Old Page Structure Audit

Date: 2026-05-30

## Scope

Scanned all 128 HTML pages in the repository for older page patterns and AdSense risk signals:

- missing nav or footer
- missing canonical URL
- missing structured data on public pages
- indexable pages under 900 words
- YouTube-heavy pages with light text
- noindexed pages still appearing in sitemap
- broken internal links
- missing local assets
- duplicate/legacy pages competing with newer guides

## Old-Structure Findings Fixed

- `affiliate-disclosure.html` had no site navigation or footer. Added a basic Carl Travels nav and legal footer.
- `your-guide-to-moving-to-da-nang-2026.html` had no site navigation or footer. Added a basic site nav and legal footer.
- `soundmarket.html` had no footer. Added legal/trust footer.
- `scoot-plus-review.html` had no footer. Added legal/trust footer.
- `blog/horse-riding-near-hanoi-countryside-experience.html` had no footer. Added legal/trust footer.
- `blog/where-to-train-karate-in-okinawa.html` had no footer. Added legal/trust footer.
- `blog.html`, `gear.html`, and `destinations.html` were public collection pages without structured data. Added `CollectionPage` schema.
- Directory-based guides had double-slash schema URLs after the first cleanup pass. Fixed affected schema/canonical URL patterns.
- `guide-to-sarande.html` was an older Albania guide that is no longer linked from the destination hub and overlaps the newer `/sarande-ksamil-butrint-travel-guide/`. Marked it `noindex,follow` and removed it from the sitemap.

## Noindexed Legacy / Low-Value Groups

The following page groups are intentionally left available but removed from indexable sitemap coverage:

- thin `/videos/` watch pages
- film/portfolio pages that are media-led rather than full articles
- weak affiliate/product review pages under 900 words
- duplicate/legacy destination pages such as `guide-to-sarande.html`
- utility pages such as `donate.html`, `thankyou.html`, and verification pages

## Validation Results

- Total HTML pages scanned: 128
- Weak indexable pages under 900 words: 0
- Public pages missing nav/footer/canonical/schema under audit rules: 0
- Broken internal links: 0
- Missing local assets: 0
- Noindexed URLs in `sitemap.xml`: 0
- Local HTTP smoke test passed for homepage, disclosure, Da Nang, SoundMarket, Scoot Plus, horse riding post, Sarandë guide, `sitemap.xml`, and `sitemap-video.xml`.

## Remaining Note

Some indexable pages still use different visual templates and inline CSS. That is not ideal from a design-system standpoint, but the high-risk AdSense issues are now controlled: public pages have trust navigation/footer access, canonical URLs, schema coverage, adequate text depth, and sitemap hygiene.
