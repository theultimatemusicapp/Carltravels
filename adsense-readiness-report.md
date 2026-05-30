# CarlTravels AdSense Readiness Report

Date: 2026-05-30

## Summary

CarlTravels has been moved away from a thin video/embed footprint toward an indexable travel publication structure. The main public sitemap now contains only indexable pages, thin watch/portfolio pages are noindexed, the missing affiliate disclosure page exists, weak priority articles were expanded, and the local validation pass shows no broken internal links, no missing local assets, and no indexable article under 900 words.

## Pages Strengthened

- `index.html` - added a clear travel-publication section above the filmography with who the site helps, best travel guides, latest articles, and Carl's YouTube channels.
- `grand-world-hanoi-guide.html` - expanded with best time to go, costs, transport detail, mistakes to avoid, who it is for, internal links, author bio, and Article/Breadcrumb schema.
- `phuquoctravelguide.html` - expanded to 1,200+ words with realistic budget, transport reality, who it is for, mistakes to avoid, internal Vietnam links, author bio, and Article/Breadcrumb schema.
- `your-guide-to-moving-to-da-nang-2026.html` - expanded to 1,300+ words with realistic monthly budget, routine/location advice, apartment checks, common mistakes, and internal Vietnam links.
- `sony-fx30-setup-guide.html` - expanded with field setup and travel filming workflow guidance.
- `how-to-get-to-sarande-from-athens-by-bus.html` - now passes the article-depth check after author/schema additions.
- `cheap-accommodation-while-traveling.html` - renamed from the broken spaced/misspelled URL and updated in links/sitemap.

## Site-Wide Fixes

- Added `affiliate-disclosure.html`.
- Added affiliate disclosure links into footer/legal patterns.
- Added Contact links into footer/legal patterns where available.
- Replaced placeholder affiliate URLs such as `amzn.to/3-example`, `amzn.to/3XYZabc`, `amzn.to/m4max-link`, `amzn.to/sigma-link`, and `amzn.to/sony15-link`.
- Added visible Carl Tomich author bio blocks to article pages.
- Added Article and Breadcrumb JSON-LD to indexable article pages missing schema.
- Added or normalized canonical URLs.
- Added lazy loading to images/iframes.
- Fixed missing local image references in `sony-fx30-setup-guide.html`, `living-in-bangkok.html`, and `dating-in-vietnam.html`.
- Regenerated `sitemap.xml`.
- Regenerated `sitemap-video.xml` so noindexed thin watch pages are excluded.
- Updated `robots.txt`.

## Pages Noindexed

These remain accessible for users but are removed from the indexable sitemap because they are thin, duplicate, portfolio-led, or not useful AdSense content:

- `aiarty-image-enhancer-review.html`
- `aiarty-vs-topaz-video-ai.html`
- `avangate-verification.html`
- `donate.html`
- `electro-voice-everse-8-review.html`
- `films/a-sail-untold.html`
- `films/busk-life.html`
- `films/busking-for-berlin.html`
- `films/martial-arts-documentary.html`
- `nusalembongan.html`
- `portdouglas.html`
- `portfolio.html`
- `saily-e-simguide.html`
- `sony-a7iii-review-2025.html`
- `thankyou.html`
- `work.html`
- all thin `/videos/*.html` watch pages

## Validation Results

- Local HTTP smoke test: passed for homepage, affiliate disclosure, renamed accommodation guide, priority articles, `sitemap.xml`, `sitemap-video.xml`, and `robots.txt`.
- Internal link check: 0 missing internal links.
- Local asset check: 0 missing local assets.
- Weak indexable article check: 0 indexable article pages under 900 words.
- Sitemap consistency: no noindexed URLs appear in `sitemap.xml`.
- Placeholder affiliate URL scan: no known dummy affiliate URLs remain.

## Remaining Risks

- SSL/canonical hosting still needs to be fixed in GitHub Pages/DNS. The live site previously failed certificate validation for the custom domain. This cannot be fully fixed from HTML files alone.
- Some older article copy may still be uneven in tone or design because the site uses many different hand-built templates.
- The noindexed video pages are still reachable if linked directly. That is acceptable for users, but they should not be promoted as primary AdSense content.
- External affiliate/product links were not all manually verified for commercial accuracy.

## Readiness Recommendation

Do not request AdSense review until the SSL certificate/custom domain issue is fixed and the changes are deployed. After deployment, re-crawl the live site, confirm the sitemap is reachable at the canonical HTTPS host, submit the updated sitemap in Search Console, and wait for Google to process the noindex/sitemap changes.

After SSL is fixed and the deployed crawl matches this report, the site is much closer to being ready for AdSense review.
