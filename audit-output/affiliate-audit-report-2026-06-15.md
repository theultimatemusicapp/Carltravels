# Carl Travels Affiliate Link Audit - 2026-06-15

Site audited: https://www.carltravels.com

## Scope

- Local HTML files parsed: 129
- Sitemap URLs checked live: 92
- Affiliate/link candidates found: 662 across 56 unique destination URLs
- Primary Saily referral code checked: `CARLRI5370`

## Affiliate Program Counts

- Amazon Associates: 497
- Saily eSIM: 77
- Wise: 38
- Dehancer: 31
- Yesim eSIM: 8
- 2Checkout/Avangate: 3
- Other tracked outbound: 3
- Somnipods/Fitnexa: 3
- Travel booking/activity: 2

## Issue Counts

- missing rel nofollow sponsored: 662
- missing target=_blank: 434
- not working or blocked: 86
- missing CARLRI5370: 75
- old Saily affiliate URL format: 75
- missing tracking: 58

## Critical Issues

- Saily: 75 Saily affiliate links do not pass `CARLRI5370` in the URL or anchor text. They mostly use `go.saily.site/aff_c?offer_id=101&aff_id=12234`; page copy often says `CARL10`, while sidebar/footer mentions sometimes say `CARLRI5370`.
- 86 affiliate link instances returned a non-working/blocking result during live redirect checks. Review the CSV rows marked `not working or blocked`.

## Medium Priority Issues

- 662 affiliate link instances are missing `rel="nofollow sponsored"`.
- 434 affiliate link instances do not use `target="_blank"`.
- 58 affiliate link instances appear to lack explicit tracking parameters or recognizable affiliate path markers.
- 75 Saily instances use the same old `go.saily.site/aff_c` URL pattern and should be standardized to the current Saily referral URL/code format if Saily has issued one for `CARLRI5370`.

## Saily Findings

- Saily link instances found: 77
- Links with `CARLRI5370` present: 2
- Links missing `CARLRI5370`: 75
- The detected Saily destination pattern is mainly `https://go.saily.site/aff_c?offer_id=101&aff_id=12234`. That contains affiliate network IDs but not your requested referral code.
- Several page snippets still promote `CARL10`, which conflicts with the required `CARLRI5370` referral code.

### Saily Pages Missing CARLRI5370

- https://www.carltravels.com/Berlin.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/DJI-Flip-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/Hagiangloop.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/Hifuinhanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/aiarty-video-enhancer-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/aiarty-vs-topaz-video-ai.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/balitravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/becomingadigitalnomad.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/beginners-guide-davinci-resolve-2025.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/best-cafes-in-tay-ho-for-digital-nomads.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/blog/horse-riding-near-hanoi-countryside-experience.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/blog/where-to-train-karate-in-okinawa.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/budvatravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/buskingguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/cairnstravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/cheap-accommodation-while-traveling.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/da-nang-to-hanoi-bus-guide/ -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/danangtravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/dating-in-vietnam.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/dji-mini-3-pro-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/electro-voice-everse-8-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/farnorthqueenslandtravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/finedininginhanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/grand-world-hanoi-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/ha-long-bay-travel-guide/ -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/hanoi-by-night.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/hanoi-heatwave-best-pools-tay-ho-quang-an/ -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/hanoitravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/hiroshima-travel-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/hon-chong-rocks-nha-trang.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/how-to-get-croatian-citizenship-by-descent.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/how-to-get-croatian-citizenship-through-your-grandparent.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/how-to-make-your-videos-look-cinematic.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/howtofoldapopuptent.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/howtomakemoneyonlinesellingstockfootage.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/japanonabudget.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/korcula.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/kyototravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/living-in-bangkok.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/lotte-world-aquarium-hanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/macbook-pro-m4-max-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/make-money-online-while-traveling.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/melbournetravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/mytop10travelhacks.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/ninhbinhtravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/nusa-lembongan-travel-guide/ -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/old-quarter-scams-hanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/one-day-in-hcmc-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/osakatravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/phuketravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/port-douglas-travel-guide/ -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/portdouglas.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/pros-and-cons-and-cost-of-living-in-hanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/saily-e-simguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/sapa-travel-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/somnipods-3-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/sony-a7cii-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/sony-a7iii-review-2025.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/sony-fx30-setup-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/starting-over-at-40.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/tech-review-dji-mavic3.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/tech-review-sony-a7siii.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/tech-review-zhiyun-weebill2.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/the-reality-of-living-overseas.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/thebesttemplesinhanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/things-to-know-before-moving-to-vietnam.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/tokyotravelguide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/tolifo-100w-rgb-light-review.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/top-10-things-to-do-in-hanoi.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/travel-gear-2025.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/vietnam-e-visa-2026-guide.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/vinwonders-nha-trang.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/what-i-learned-after-returning-to-australia-and-why-i-LEFT-again.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234
- https://www.carltravels.com/whyileftaustralia.html -> https://go.saily.site/aff_c?offer_id=101&aff_id=12234

## Pages With Affiliate Product Mentions

- https://www.carltravels.com/Berlin.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/DJI-Flip-review.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/Hagiangloop.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/Hifuinhanoi.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/about.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/affiliate-disclosure.html: affiliate, amazon, dehancer, saily, wise, yesim; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/aiarty-image-enhancer-review.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/aiarty-video-enhancer-review.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/aiarty-vs-topaz-video-ai.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/avangate-verification.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/balitravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/becomingadigitalnomad.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/beginners-guide-davinci-resolve-2025.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/best-cafes-in-tay-ho-for-digital-nomads.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/blog/horse-riding-near-hanoi-countryside-experience.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/blog/where-to-train-karate-in-okinawa.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/blog.html: affiliate, amzn, dehancer, saily, wise, yesim; Saily link=False; `CARLRI5370`=True
- https://www.carltravels.com/bose-s1pro-plus-vs-everse8-the-best-portable-speaker.html: affiliate, amazon, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/budvatravelguide.html: affiliate, amzn, booking.com, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/buskingguide.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/cairnstravelguide.html: affiliate, amzn, dehancer, saily, wise, yesim; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/cheap-accommodation-while-traveling.html: affiliate, booking.com, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/contact.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/da-nang-to-hanoi-bus-guide/: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/daily-essential-travel-gear.html: affiliate, amazon, amzn; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/danangtravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/dating-in-vietnam.html: affiliate, amazon, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/dental-tourism-vietnam-hanoi-crowns.html: affiliate, wise; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/destinations.html: affiliate, amzn, dehancer, saily, wise; Saily link=False; `CARLRI5370`=True
- https://www.carltravels.com/dji-mini-3-pro-review.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/donate.html: affiliate, amazon, dehancer, saily, wise, yesim; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/electro-voice-everse-8-review.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/farnorthqueenslandtravelguide.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/films/a-sail-untold.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/films/busk-life.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/films/busking-for-berlin.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/films/martial-arts-documentary.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/finedininginhanoi.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/gear.html: affiliate, amzn, dehancer, saily, somnipods, wise; Saily link=False; `CARLRI5370`=True
- https://www.carltravels.com/getyourwisecard.html: affiliate, wise; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/grand-world-hanoi-guide.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/guide-to-sarande.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/ha-long-bay-travel-guide/: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/hanoi-by-night.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/hanoi-heatwave-best-pools-tay-ho-quang-an/: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/hanoitravelguide.html: affiliate, amzn, dehancer, getyourguide, saily, viator, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/hiroshima-travel-guide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/hon-chong-rocks-nha-trang.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/how-to-get-croatian-citizenship-by-descent.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/how-to-get-croatian-citizenship-through-your-grandparent.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/how-to-get-to-sarande-from-athens-by-bus.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/how-to-make-your-videos-look-cinematic.html: affiliate, dehancer, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/howtofoldapopuptent.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/howtomakemoneyonlinesellingstockfootage.html: affiliate, dehancer, saily, wise; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/japanonabudget.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/korcula.html: affiliate, amzn, booking.com, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/kyototravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/learning-vietnamese-after-living-in-vietnam.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/living-in-bangkok.html: affiliate, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/lotte-world-aquarium-hanoi.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/macbook-pro-m4-max-review.html: affiliate, amazon, dehancer, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/make-money-online-while-traveling.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/melbournetravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/muay-thai-thailand-koh-samui-guide.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/mytop10travelhacks.html: affiliate, booking.com, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/ninhbinhtravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/nusa-lembongan-travel-guide/: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/old-quarter-scams-hanoi.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/one-day-in-hcmc-guide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/osakatravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/phuketravelguide.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/phuquoctravelguide.html: affiliate, saily; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/port-douglas-travel-guide/: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/portdouglas.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/portfolio.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/privacy-policy.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/pros-and-cons-and-cost-of-living-in-hanoi.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/saily-e-simguide.html: saily, yesim; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/sapa-travel-guide.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/sarande-ksamil-butrint-travel-guide/: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/scoot-plus-review.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/somnipods-3-review.html: affiliate, fitnexa, saily, somnipods; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/sony-a7cii-review.html: affiliate, amazon, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/sony-a7iii-review-2025.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/sony-fx30-setup-guide.html: affiliate, amazon, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/soundmarket.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/starting-over-at-40.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/tech-review-dji-mavic3.html: affiliate, amazon, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/tech-review-sony-a7siii.html: affiliate, amazon, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/tech-review-zhiyun-weebill2.html: affiliate, amazon, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/terms-and-conditions.html: affiliate, wise; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/thankyou.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/the-reality-of-digital-nomading-before-you-buy-into-it.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/the-reality-of-living-overseas.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/thebesttemplesinhanoi.html: affiliate, amzn, dehancer, saily, wise; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/things-to-know-before-moving-to-vietnam.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/tokyotravelguide.html: affiliate, amzn, booking.com, dehancer, saily, wise, yesim; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/tolifo-100w-rgb-light-review.html: affiliate, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/top-10-things-to-do-in-hanoi.html: affiliate, amzn, dehancer, saily, wise, yesim; Saily link=True; `CARLRI5370`=True
- https://www.carltravels.com/travel-gear-2025.html: affiliate, amazon, amzn, saily; Saily link=True; `CARLRI5370`=False
- https://www.carltravels.com/videos/beginners-guide-davinci-resolve-2025.html: affiliate, amzn; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/commercial-1.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/commercial-2.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/commercial-3.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/ha-giang-loop-easy-rider.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/hanoi-ha-long-bay-adventure.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/hanoi-learn-vietnamese-testimonial.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/hanoi-old-quarter-vibes.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/hanoi-train-street-thrills.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/music-video-1.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/music-video-2.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/music-video-3.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/osaka-dotonbori-at-night.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/osaka-expo-70-park-journey.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/osaka-kobe-beef-experience.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/tran-quoc-pagoda-watch.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/wedding-film-1.html: affiliate; Saily link=False; `CARLRI5370`=False
- https://www.carltravels.com/videos/wedding-film-2.html: affiliate; Saily link=False; `CARLRI5370`=False
- ...and 8 more in mentions CSV.

## Highest Saily Opportunity Pages

- https://www.carltravels.com/vietnam-e-visa-2026-guide.html | score 223 | Saily link=True | `CARLRI5370`=False | Vietnam E-Visa 2026 Guide: Official Fees, Processing, Visa Runs - Carl Travels
- https://www.carltravels.com/becomingadigitalnomad.html | score 176 | Saily link=True | `CARLRI5370`=False | Affordable Digital Nomad Bases I Would Actually Consider in 2026 - Carl Travels
- https://www.carltravels.com/things-to-know-before-moving-to-vietnam.html | score 168 | Saily link=True | `CARLRI5370`=False | Things to Know Before Moving to Vietnam | Carl Travels
- https://www.carltravels.com/japanonabudget.html | score 166 | Saily link=True | `CARLRI5370`=False | How to Visit Japan on a Budget (From Someone Who Actually Did It) - Carl Travels
- https://www.carltravels.com/da-nang-to-hanoi-bus-guide/ | score 164 | Saily link=True | `CARLRI5370`=False | Da Nang to Hanoi by Sleeper Bus: What to Expect Before You Book | Carl Travels
- https://www.carltravels.com/pros-and-cons-and-cost-of-living-in-hanoi.html | score 128 | Saily link=True | `CARLRI5370`=False | Pros and Cons of Living in Hanoi (Honest, Lived-In Perspective) | Carl Travels
- https://www.carltravels.com/cheap-accommodation-while-traveling.html | score 125 | Saily link=True | `CARLRI5370`=False | 7 Ways to Find Cheap Accommodation While Traveling - Carl Travels
- https://www.carltravels.com/hanoi-heatwave-best-pools-tay-ho-quang-an/ | score 123 | Saily link=True | `CARLRI5370`=False | How I Survived Hanoi's 40°C Heatwave: Best Pools in Tay Ho & Quang An | Carl Travels
- https://www.carltravels.com/dating-in-vietnam.html | score 110 | Saily link=True | `CARLRI5370`=False | Dating in Vietnam: An Honest Guide for Expats & Nomads - Carl Travels
- https://www.carltravels.com/travel-gear-2025.html | score 108 | Saily link=True | `CARLRI5370`=False | My Essential Travel Filmmaking Kit (2025) – Carl Travels
- https://www.carltravels.com/sapa-travel-guide.html | score 103 | Saily link=True | `CARLRI5370`=False | Sapa Travel Guide – Fansipan Cable Car, Rice Terraces & Mountain Weather | Carl Travels
- https://www.carltravels.com/grand-world-hanoi-guide.html | score 102 | Saily link=True | `CARLRI5370`=False | Grand World Hanoi Guide: Is It Worth the Trip? - Carl Travels
- https://www.carltravels.com/blog/horse-riding-near-hanoi-countryside-experience.html | score 98 | Saily link=True | `CARLRI5370`=False | Horse Riding Near Hanoi: A Quiet Countryside Experience | Carl Travels
- https://www.carltravels.com/living-in-bangkok.html | score 98 | Saily link=True | `CARLRI5370`=False | The $1,000 "Live Like a King" Myth in Bangkok (What It Actually Costs to Live Here) - Carl Travels
- https://www.carltravels.com/old-quarter-scams-hanoi.html | score 98 | Saily link=True | `CARLRI5370`=False | Old Quarter Scams in Hanoi: What to Watch For (and How to Avoid Them) | Carl Travels
- https://www.carltravels.com/Hifuinhanoi.html | score 95 | Saily link=True | `CARLRI5370`=False | Why I Tried HIFU in Vietnam at 40 | Carl Travels
- https://www.carltravels.com/best-cafes-in-tay-ho-for-digital-nomads.html | score 92 | Saily link=True | `CARLRI5370`=False | Best Cafes in Tay Ho for Digital Nomads | Carl Travels
- https://www.carltravels.com/hanoi-by-night.html | score 89 | Saily link=True | `CARLRI5370`=False | Hanoi by Night – Cinematic Short Film | Carl Travels
- https://www.carltravels.com/finedininginhanoi.html | score 88 | Saily link=True | `CARLRI5370`=False | Khuê Restaurant Hanoi – The Best Fine Dining in Hanoi | Carl Travels
- https://www.carltravels.com/how-to-get-croatian-citizenship-by-descent.html | score 85 | Saily link=True | `CARLRI5370`=False | How to Get Croatian Citizenship by Descent (The Real 2025 Guide) - Carl Travels
- https://www.carltravels.com/tech-review-dji-mavic3.html | score 84 | Saily link=True | `CARLRI5370`=False | DJI Mavic 3 Review: Ultimate Travel Drone? - Carl Travels
- https://www.carltravels.com/dji-mini-3-pro-review.html | score 82 | Saily link=True | `CARLRI5370`=False | DJI Mini 3 Pro Review: More Than Just a Drone - Carl Travels
- https://www.carltravels.com/howtomakemoneyonlinesellingstockfootage.html | score 82 | Saily link=True | `CARLRI5370`=False | How to Earn Money on Adobe Stock and Shutterstock - Carl Travels
- https://www.carltravels.com/buskingguide.html | score 80 | Saily link=True | `CARLRI5370`=False | The Ultimate Guide to Busking - Carl Travels
- https://www.carltravels.com/howtofoldapopuptent.html | score 79 | Saily link=True | `CARLRI5370`=False | Why Do Pop-Up Tents Pop Up… But Never Pop Down? - Carl Travels

## Quick Wins

- Replace/standardize every Saily CTA to use the current Saily URL that carries `CARLRI5370`, and update visible copy from `CARL10` to `CARLRI5370` where appropriate.
- Add `target="_blank" rel="nofollow sponsored noopener"` to every affiliate CTA/link.
- Add Saily CTAs to high-intent travel-planning pages that mention SIM/eSIM/internet/data or destination logistics but currently lack a Saily link.
- Add disclosure text near major affiliate blocks, especially on gear/review pages with Amazon/Saily/Wise links.

## CSV Outputs

- Affiliate link table: `/Users/carltomich/Documents/Codex/2026-05-30/you-are-auditing-and-fixing-carltravels/repo/audit-output/affiliate-link-audit-2026-06-15.csv`
- Product mention table: `/Users/carltomich/Documents/Codex/2026-05-30/you-are-auditing-and-fixing-carltravels/repo/audit-output/affiliate-mentions-2026-06-15.csv`
- Sitemap status table: `/Users/carltomich/Documents/Codex/2026-05-30/you-are-auditing-and-fixing-carltravels/repo/audit-output/sitemap-status-2026-06-15.csv`