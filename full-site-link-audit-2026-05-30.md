# Full Site Link Audit

Date: 2026-05-30

## Scope

- Audited every local HTML page in the repository.
- Checked every internal `href`, `src`, `srcset`, form action, stylesheet, script, iframe, canonical/social URL, and sitemap URL.
- Checked unique external HTTP/HTTPS URLs with a HEAD request first and a lightweight GET fallback.
- Exported machine-readable CSV/JSON files for the full link inventory.

## Summary

- HTML pages audited: 128
- Indexable pages: 91
- Noindexed pages: 37
- Sitemap URLs: 91
- Internal references checked: 4127
- Internal references missing after fixes: 0
- Unique external URLs checked: 352
- External URLs returning OK/redirect/partial content: 327
- External URLs blocked, timed out, or suspicious: 25

## Files Produced

- `public-url-inventory.csv` - every public HTML page, index state, title, public URL, sitemap membership.
- `internal-link-audit.csv` - every internal link/asset reference and resolved local file.
- `external-link-audit.csv` - every unique external URL with status, final URL, sources, and error where relevant.
- `link-audit-data.json` - raw parsed internal/external/source data.
- `external-link-check.json` - raw external status results.

## Fixes Applied During Audit

- Fixed 65 stale internal metadata references so internal references now resolve 100%.
- Corrected old `/images/...` social image URLs to existing root-level image files.
- Corrected renamed canonical/social URLs, including the old cheap accommodation URL and old Wise/Far North Queensland/pop-up tent URLs.
- Corrected malformed AdSense script URLs from `/pagead/js?client=...` to `/pagead/js/adsbygoogle.js?client=...`.
- Replaced stale Dehancer `/subscribe` links with the current pricing page.
- Replaced old YouTube `/c/CarlTomich` channel link with `https://www.youtube.com/@thecarltomich`.
- Replaced `www.ispeakvietlingo.com` with `https://ispeakvietlingo.com` to avoid the certificate mismatch.
- Replaced dead `pensatore.hr` restaurant link with the current Tripadvisor listing.
- Replaced the missing YouTube `maxresdefault.jpg` thumbnail for Busking for Berlin with `hqdefault.jpg`.

## Internal Link Result

All internal links and local asset references now resolve.

| Metric | Count |
|---|---:|
| Internal refs OK | 4127 |
| Internal refs missing | 0 |
| Sitemap URLs missing | 0 |
| Noindexed URLs in sitemap | 0 |

## External Link Result

| Status | Count |
|---|---:|
| 200 | 313 |
| 202 | 4 |
| 206 | 9 |
| 302 | 1 |
| 400 | 2 |
| 403 | 4 |
| 405 | 2 |
| 503 | 6 |
| error | 11 |

### External Links Needing Manual Review

These are not internal site breakages, but they should be checked in a normal browser because automated link checkers can be blocked by large platforms and affiliate networks.

| URL | Status | Source pages | Notes |
|---|---:|---|---|
| https://www.facebook.com/thecarlostomich | 400 | portdouglas.html, thankyou.html, work.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://www.facebook.com/thecarlostomich/ | 400 | ninhbinhtravelguide.html, nusa-lembongan-travel-guide/index.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://saily.com | 403 | donate.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://www.parispass.com | 403 | mytop10travelhacks.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://www.saily.com/?referral=CARLRI5370 | 403 | mytop10travelhacks.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://www.tripadvisor.com/Restaurant_Review-g303810-d12423964-Reviews-Pensatore_Kitchen_Wine-Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html | 403 | korcula.html | Likely bot protection, regional blocking, or temporary platform response; verify in browser. |
| https://formspree.io/f/mnnnoogg | 405 | DJI-Flip-review.html, balitravelguide.html, becomingadigitalnomad.html, bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html, budvatravelguide.html | Expected for a form endpoint: GET/HEAD returns 405, POST should still work. |
| https://www.amazon.com/Rode-Wireless-PRO-Microphone-System/dp/B0C2T3V9G3 | 405 | travel-gear-2025.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=DJI+Mavic+3 | 503 | tech-review-dji-mavic3.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=DJI+Mavic+3+ND+filters | 503 | tech-review-dji-mavic3.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=Rode+Wireless+Pro | 503 | sony-a7cii-review.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=Sony+15mm+f1.4+G | 503 | sony-fx30-setup-guide.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=Zhiyun+Weebill+2 | 503 | tech-review-zhiyun-weebill2.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.amazon.com/s?k=drone+carry+case | 503 | tech-review-dji-mavic3.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/3ZR1DoA | error | DJI-Flip-review.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/421eJjs | error | dji-mini-3-pro-review.html, sony-a7cii-review.html, travel-gear-2025.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/44ZnzR8 | error | howtofoldapopuptent.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/467fEAU | error | Berlin.html, Hagiangloop.html, balitravelguide.html, beginners-guide-davinci-resolve-2025.html, blog.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/4c0rCPk | error | bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html, dji-mini-3-pro-review.html, sony-a7cii-review.html, travel-gear-2025.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://amzn.to/4hFqguz | error | bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html, dji-mini-3-pro-review.html, travel-gear-2025.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://evisa.gov.vn/ | error | vietnam-e-visa-2026-guide.html | Local Python certificate verification failed; this should be browser-checked because it is an official government site. |
| https://khuerestaurant.vn | error | finedininginhanoi.html | URLError: <urlopen error timed out> |
| https://www.amazon.com/s?k=Sigma+18-50mm+f2.8+Sony+E | error | sony-fx30-setup-guide.html | Likely bot/rate-limit or timeout from Amazon/shortlink checks; verify in browser if important. |
| https://www.apple.com/iphone-16-pro/ | error | travel-gear-2025.html | URLError: <urlopen error timed out> |
| https://www.apple.com/macbook-pro/ | error | macbook-pro-m4-max-review.html, travel-gear-2025.html | URLError: <urlopen error timed out> |

## Public URL Inventory

Full inventory is in `public-url-inventory.csv`. Summary list:

- `Berlin.html` - index - Berlin – Carl Travels: Your Ultimate Week in History, Art, and Hedonism
- `DJI-Flip-review.html` - index - DJI Flip Review 2025: Budget Drone or Toy? - Carl Travels
- `Hagiangloop.html` - index - Hà Giang Loop (3D2N) – Easy Rider Motorbike Tour from Hanoi | Carl Travels
- `Hifuinhanoi.html` - index - Why I Tried HIFU in Vietnam at 40 | Carl Travels
- `about.html` - index - About Carl Tomich – Carl Travels
- `affiliate-disclosure.html` - index - Affiliate Disclosure - Carl Travels
- `aiarty-image-enhancer-review.html` - noindex - Aiarty AI Image Enhancer: Features, Pricing, and Why It Stands Out | Carl Travels
- `aiarty-video-enhancer-review.html` - index - AIARTY Video Enhancer Review (2026) + Topaz Video AI Comparison | Carl Travels
- `aiarty-vs-topaz-video-ai.html` - noindex - AIARTY vs Topaz Video AI (2026): Which Video Enhancer Wins? | Carl Travels
- `avangate-verification.html` - noindex - Affiliate Verification - Carl Travels
- `balitravelguide.html` - index - Bali, Indonesia Travel Guide - Carl Travels
- `becomingadigitalnomad.html` - index - Affordable Digital Nomad Bases I Would Actually Consider in 2026 - Carl Travels
- `beginners-guide-davinci-resolve-2025.html` - index - Beginner’s Guide to DaVinci Resolve 2025 (Step-by-Step Tutorial) | Carl Travels
- `best-cafes-in-tay-ho-for-digital-nomads.html` - index - Best Cafes in Tay Ho for Digital Nomads | Carl Travels
- `blog/horse-riding-near-hanoi-countryside-experience.html` - index - Horse Riding Near Hanoi: A Quiet Countryside Experience | Carl Travels
- `blog/where-to-train-karate-in-okinawa.html` - index - Where to Train Karate in Okinawa (Starting From Zero) | Carl Travels
- `blog.html` - index - Blog by Carl Tomich: Travel Filmmaking, Living Abroad, Gear & YouTube Strategy
- `bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html` - index - Bose S1 Pro Plus vs Everse 8 (2026): Portable PA Comparison | Carl Travels
- `budvatravelguide.html` - index - Budva, Montenegro Travel Guide - Carl Travels
- `buskingguide.html` - index - The Ultimate Guide to Busking - Carl Travels
- `cairnstravelguide.html` - index - Cairns Travel Guide – Carl Travels: Your Ultimate Week in Reef, Rainforest, and Adventure
- `cheap-accommodation-while-traveling.html` - index - 7 Ways to Find Cheap Accommodation While Traveling - Carl Travels
- `contact.html` - index - Contact Carl Tomich - Carl Travels
- `da-nang-to-hanoi-bus-guide/index.html` - index - Da Nang to Hanoi by Sleeper Bus: What to Expect Before You Book | Carl Travels
- `daily-essential-travel-gear.html` - index - My Daily Essential Travel Gear (Filmmaking Kit) | Carl Travels
- `danangtravelguide.html` - index - Da Nang, Vietnam Travel Guide - Carl Travels
- `dating-in-vietnam.html` - index - Dating in Vietnam: An Honest Guide for Expats & Nomads - Carl Travels
- `destinations.html` - index - Filmmaker's Location Guides , Carl Tomich
- `dji-mini-3-pro-review.html` - index - DJI Mini 3 Pro Review: More Than Just a Drone - Carl Travels
- `donate.html` - noindex - Support & Donate - Carl Travels
- `electro-voice-everse-8-review.html` - noindex - Electro-Voice Everse 8 Review (2026): Busking & Gig Test | Carl Travels
- `farnorthqueenslandtravelguide.html` - index - Far North Queensland Guide - Carl Travels
- `films/a-sail-untold.html` - noindex - A Sail Untold (2022) , Documentary Film by Carl Tomich
- `films/busk-life.html` - noindex - Busk Life (2024) , Documentary Film by Carl Tomich
- `films/busking-for-berlin.html` - noindex - Busking for Berlin (2014) , Documentary Film by Carl Tomich
- `films/martial-arts-documentary.html` - noindex - Martial Arts Documentary (2025-26) , In Production | Carl Tomich
- `finedininginhanoi.html` - index - Khuê Restaurant Hanoi – The Best Fine Dining in Hanoi | Carl Travels
- `gear.html` - index - Filmmaker Tools & Gear , Carl Tomich
- `getyourwisecard.html` - index - Why Every Traveller Should Get a Wise Card - Carl Travels
- `grand-world-hanoi-guide.html` - index - Grand World Hanoi Guide: Is It Worth the Trip? - Carl Travels
- `guide-to-sarande.html` - noindex - Guide to Sarandë, Albania: Ksamil, Butrint, Corfu & Tirana - Carl Travels
- `ha-long-bay-travel-guide/index.html` - index - Ha Long Bay Travel Guide (2026): How to Go, Best Cruises, Costs & Itineraries
- `hanoi-by-night.html` - index - Hanoi by Night – Cinematic Short Film | Carl Travels
- `hanoi-heatwave-best-pools-tay-ho-quang-an/index.html` - index - How I Survived Hanoi's 40°C Heatwave: Best Pools in Tay Ho & Quang An | Carl Travels
- `hanoitravelguide.html` - index - 7-Day Hanoi Itinerary – Carl Travels: Street Eats & Ha Long Bay
- `hiroshima-travel-guide.html` - index - Hiroshima Travel Guide – Shinkansen Journey, Peace Memorial & Miyajima Day Trip | Carl Travels
- `hon-chong-rocks-nha-trang.html` - index - Hon Chong Rocks – Nha Trang Coastal Escape | Carl Travels
- `how-to-get-croatian-citizenship-by-descent.html` - index - How to Get Croatian Citizenship by Descent (The Real 2025 Guide) - Carl Travels
- `how-to-get-croatian-citizenship-through-your-grandparent.html` - index - How I Applied for Croatian Citizenship by Descent Through My Grandfather - Carl Travels
- `how-to-get-to-sarande-from-athens-by-bus.html` - index - How to Get to Sarandë from Athens by Bus - Carl Travels
- `how-to-make-your-videos-look-cinematic.html` - index - Why I Use Dehancer to Make My Videos Look Cinematic (And How You Can Too) – Carl Travels
- `howtofoldapopuptent.html` - index - Why Do Pop-Up Tents Pop Up… But Never Pop Down? - Carl Travels
- `howtomakemoneyonlinesellingstockfootage.html` - index - How to Earn Money on Adobe Stock and Shutterstock - Carl Travels
- `index.html` - index - Carl Tomich — Documentary Filmmaker, Travel Creator & Life Abroad Blog
- `japanonabudget.html` - index - How to Visit Japan on a Budget (From Someone Who Actually Did It) - Carl Travels
- `korcula.html` - index - Your Ultimate Guide to Visiting Korčula, Croatia - Carl Travels
- `kyototravelguide.html` - index - Kyoto, Japan Travel Guide - Carl Travels
- `learning-vietnamese-after-living-in-vietnam.html` - index - Learning Vietnamese After Living In Vietnam For Almost A Year | Carl Travels
- `living-in-bangkok.html` - index - The $1,000 "Live Like a King" Myth in Bangkok (What It Actually Costs to Live Here) - Carl Travels
- `lotte-world-aquarium-hanoi.html` - index - Lotte World Aquarium Hanoi Review – Globe Travel Adventures
- `macbook-pro-m4-max-review.html` - index - MacBook Pro M4 Max Review (2025): A Video Editor's Dream Machine? | Carl Travels
- `make-money-online-while-traveling.html` - index - How I Make Money Online While Traveling (2025 Breakdown) - Carl Travels
- `melbournetravelguide.html` - index - Melbourne Travel Guide – Carl Travels: Your Ultimate Week in Laneways, Culture, and Coffee
- `muay-thai-thailand-koh-samui-guide.html` - index - Where to Train Muay Thai in Thailand: Koh Samui at 39 | Carl Travels
- `mytop10travelhacks.html` - index - 10 Powerful Budget Travel Hacks - Carl Travels
- `ninhbinhtravelguide.html` - index - Ninh Bình Travel Guide 2025 – Tràng An, Tam Cốc & Múa Cave | Carl Travels
- `nusa-lembongan-travel-guide/index.html` - index - Nusa Lembongan Travel Guide (2026): How to Get There, Costs, Where to Stay & What It’s Really Like
- `nusalembongan.html` - noindex - Nusa Lembongan Travel Guide (2026): Costs, Ferries, Areas to Stay, and Mistakes | Carl Travels
- `old-quarter-scams-hanoi.html` - index - Old Quarter Scams in Hanoi: What to Watch For (and How to Avoid Them) | Carl Travels
- `one-day-in-hcmc-guide.html` - index - One Day in Ho Chi Minh City (Saigon) – Markets, Skylines & Chaos | Carl Travels
- `osakatravelguide.html` - index - Osaka Travel Guide – Carl Travels: Your Ultimate Week in Street Food, Culture, and Chaos
- `phuketravelguide.html` - index - 7-Day Phuket Itinerary – Carl Travels: Beaches, Nightlife & Island Adventures
- `phuquoctravelguide.html` - index - Phu Quoc Travel Guide 2026 – Sunset Town, Cable Car & Where to Stay | Carl Travels
- `port-douglas-travel-guide/index.html` - index - Port Douglas Travel Guide (2026): Reef Tours, Daintree Day Trips, Costs & Best Things To Do | Carl Travels
- `portdouglas.html` - noindex - Port Douglas Uncovered: A Comprehensive Guide - Carl Travels
- `portfolio.html` - noindex - Video Portfolio - Carl Travels
- `privacy-policy.html` - index - Privacy Policy - Carl Travels
- `pros-and-cons-and-cost-of-living-in-hanoi.html` - index - Pros and Cons of Living in Hanoi (Honest, Lived-In Perspective) | Carl Travels
- `saily-e-simguide.html` - noindex - Saily eSIM Review for Travelers (2026): Costs, Setup, and Mistakes to Avoid | Carl Travels
- `sapa-travel-guide.html` - index - Sapa Travel Guide – Fansipan Cable Car, Rice Terraces & Mountain Weather | Carl Travels
- `sarande-ksamil-butrint-travel-guide/index.html` - index - Sarandë, Ksamil and Butrint Travel Guide: How to Visit Southern Albania
- `scoot-plus-review.html` - index - Scoot Plus Review: Is Scoot’s Budget Premium Economy Worth It? | Carl Travels
- `somnipods-3-review.html` - index - SomniPods 3 Honest Review: Better Than Expected | Carl Travels
- `sony-a7cii-review.html` - index - Sony A7CII Review: The Best Full-Frame Camera for Creators on the Move? - Carl Travels
- `sony-a7iii-review-2025.html` - noindex - Sony A7III Review (2026): Still Worth It for Travel Creators? | Carl Travels
- `sony-fx30-setup-guide.html` - index - Sony FX30 Setup Guide: The Best Settings for Filmmakers (2025) | Carl Travels
- `soundmarket.html` - index - SoundMarket Review (2026): Royalty Free Music for YouTube Creators | Carl Travels
- `starting-over-at-40.html` - index - I Wasted My 30s. Now I’m Starting Over at 40 - Carl Travels
- `tech-review-dji-mavic3.html` - index - DJI Mavic 3 Review: Ultimate Travel Drone? - Carl Travels
- `tech-review-sony-a7siii.html` - index - Sony A7III Review (2025): The Workhorse That Won’t Quit | Carl Travels
- `tech-review-zhiyun-weebill2.html` - index - Zhiyun Weebill 2 Review - Carl Travels Tech
- `terms-and-conditions.html` - index - Terms & Conditions - Carl Travels
- `thankyou.html` - noindex - Thank You - Carl Travels
- `the-reality-of-digital-nomading-before-you-buy-into-it.html` - index - The Reality of Digital Nomading (Before You Buy Into It) - Carl Travels
- `the-reality-of-living-overseas.html` - index - The Reality of Living Overseas That No One Really Talks About - Carl Travels
- `thebesttemplesinhanoi.html` - index - Trấn Quốc Pagoda – Hanoi’s Oldest Temple on West Lake | Carl Travels
- `things-to-know-before-moving-to-vietnam.html` - index - Things to Know Before Moving to Vietnam | Carl Travels
- `tokyotravelguide.html` - index - Tokyo, Japan Travel Guide - Carl Travels
- `tolifo-100w-rgb-light-review.html` - index - Tolifo 100W RGB COB Light Review: Portable Power After 5 Months | Carl Travels
- `top-10-things-to-do-in-hanoi.html` - index - Top 10 Things to Do in Hanoi, Vietnam (2025) , Local Tips, Hidden Gems & Travel Guide
- `travel-gear-2025.html` - index - My Essential Travel Filmmaking Kit (2025) – Carl Travels
- `videos/beginners-guide-davinci-resolve-2025.html` - noindex - Beginner’s Guide to DaVinci Resolve 2025 , Step-by-Step Tutorial | Carl Travels Watch Page
- `videos/commercial-1.html` - noindex - Hotel Commercial Video: Cinematic Brand Film Breakdown | Carl Travels
- `videos/commercial-2.html` - noindex - Commercial 2 | Carl Travels Watch Page
- `videos/commercial-3.html` - noindex - Commercial 3 | Carl Travels Watch Page
- `videos/ha-giang-loop-easy-rider.html` - noindex - Hà Giang Loop (3D2N) , Easy Rider Motorbike Tour | Carl Travels Watch Page
- `videos/hanoi-ha-long-bay-adventure.html` - noindex - Ha Long Bay Adventure (Days 6–7) | Carl Travels Watch Page
- `videos/hanoi-learn-vietnamese-testimonial.html` - noindex - Learn Vietnamese with Quynh | Carl Travels Watch Page
- `videos/hanoi-old-quarter-vibes.html` - noindex - Old Quarter Vibes (Day 4) | Carl Travels Watch Page
- `videos/hanoi-train-street-thrills.html` - noindex - Train Street Thrills (Day 2) | Carl Travels Watch Page
- `videos/index.html` - noindex - Watch Library | Carl Travels
- `videos/music-video-1.html` - noindex - Music Video 1 | Carl Travels Watch Page
- `videos/music-video-2.html` - noindex - Music Video 2 | Carl Travels Watch Page
- `videos/music-video-3.html` - noindex - Music Video 3 | Carl Travels Watch Page
- `videos/osaka-dotonbori-at-night.html` - noindex - Dotonbori at Night | Carl Travels Watch Page
- `videos/osaka-expo-70-park-journey.html` - noindex - Expo '70 Park Daytrip | Carl Travels Watch Page
- `videos/osaka-kobe-beef-experience.html` - noindex - Kobe Beef Pilgrimage | Carl Travels Watch Page
- `videos/tran-quoc-pagoda-watch.html` - noindex - Trấn Quốc Pagoda Watch Page | Carl Travels
- `videos/wedding-film-1.html` - noindex - Wedding Film 1 | Carl Travels Watch Page
- `videos/wedding-film-2.html` - noindex - Wedding Film 2 | Carl Travels Watch Page
- `videos/wedding-film-3.html` - noindex - Wedding Film 3 | Carl Travels Watch Page
- `vietnam-e-visa-2026-guide.html` - index - Vietnam E-Visa 2026 Guide: Official Fees, Processing, Visa Runs - Carl Travels
- `vinwonders-nha-trang.html` - index - VinWonders Nha Trang – Vietnam's Ultimate Island Theme Park | Carl Travels
- `what-i-learned-after-returning-to-australia-and-why-i-LEFT-again.html` - index - The Things That Hit Me When I Came Back to Australia - Carl Travels
- `whyileftaustralia.html` - index - Why I Left Australia - Carl Travels
- `work.html` - noindex - My Work - Carl Travels
- `yesim-guide.html` - index - Stay Seamlessly Connected Abroad with Yesim eSIM - Carl Travels
- `your-guide-to-moving-to-da-nang-2026.html` - index - Your Guide to Moving to Da Nang (2026): Reality, Costs, and Areas - Carl Travels

## Recommendation

The internal site link graph is clean. Before treating the external audit as fully clean, manually browser-check the external links marked as blocked/timed out, especially affiliate links and any links used in high-traffic articles. For AdSense, the important result is that the public sitemap is consistent, no noindexed URLs are leaking into it, and local broken links/assets are at zero.
