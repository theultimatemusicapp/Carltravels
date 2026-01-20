document.addEventListener("DOMContentLoaded", () => {
    const GA_MEASUREMENT_ID = "G-G72KT5ZW2J";
    const navbar = document.getElementById("navbar");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const loadScript = (src, attrs = {}) =>
        new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            Object.entries(attrs).forEach(([key, value]) => {
                script.setAttribute(key, value);
            });
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
        });

    const initAnalytics = () => {
        if (typeof window.gtag === "function") return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            allow_google_signals: false,
        });
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`).catch(
            () => {}
        );
    };

    if (window.Cookiebot) {
        window.addEventListener("CookiebotOnConsentReady", () => {
            if (window.Cookiebot?.consent?.statistics) {
                initAnalytics();
            }
        });
    } else {
        initAnalytics();
    }

    loadScript("/assets/js/affiliate-links.js").catch(() => {});

    const getAffiliateIntent = () => {
        const manualIntent = document.querySelector('meta[name="affiliateIntent"]')?.content;
        if (manualIntent && ["A", "B", "C", "D"].includes(manualIntent)) {
            return manualIntent;
        }
        const path = window.location.pathname.toLowerCase();
        const title = document.title.toLowerCase();
        const hasKeyword = (words) => words.some((word) => title.includes(word) || path.includes(word));

        if (hasKeyword(["gear", "review", "camera", "lens", "mic", "gimbal", "workflow", "setup"])) {
            return "C";
        }
        if (hasKeyword(["how-to", "howto", "tutorial", "guide", "steps", "e-visa", "visa"])) {
            return "D";
        }
        if (hasKeyword(["blog", "story", "rant", "learned", "left", "returned", "returning"])) {
            return "A";
        }
        if (hasKeyword(["travelguide", "travel-guide", "destinations", "itinerary", "trip"])) {
            return "B";
        }
        return "B";
    };

    const resolveCtaVariant = () => {
        const storageKey = "ctaVariant";
        const existing = window.localStorage.getItem(storageKey);
        if (existing && ["1", "2", "3"].includes(existing)) {
            return Number(existing);
        }
        const assigned = Math.floor(Math.random() * 3) + 1;
        window.localStorage.setItem(storageKey, String(assigned));
        return assigned;
    };

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
            const icon = mobileMenuButton.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }

    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
        const href = link.getAttribute("href") || "";
        const hrefPath = href.replace(/^\/+/, "").split("#")[0];
        if (hrefPath === currentPath) {
            link.classList.add("active");
        }
    });

    const existingHero = document.querySelector(".page-hero, .hero, .hero-gradient");
    if (!existingHero) {
        const description = document.querySelector('meta[name="description"]')?.content;
        const hero = document.createElement("section");
        hero.className = "page-hero relative overflow-hidden pt-24 pb-16";
        hero.innerHTML = `
            <div class="container mx-auto px-6">
                <span class="section-title text-xs md:text-sm">CarlTravels Guide</span>
                <h1 class="heading-font text-4xl md:text-5xl text-white mt-4">${document.title.replace(" - Carl Travels", "").replace(" - Carl Tomich", "")}</h1>
                <p class="text-lg text-gray-300 mt-4 max-w-3xl">${description || "Fresh tips, practical costs, and honest insights to help you plan better."}</p>
            </div>
        `;
        const target = document.querySelector("main") || document.body;
        target.prepend(hero);
    }

    const mainElement = document.querySelector("main");
    if (mainElement && !mainElement.classList.contains("article-content")) {
        mainElement.classList.add("article-content");
    }

    const disclosureTargets = document.querySelectorAll("[data-affiliate-section]");
    disclosureTargets.forEach((section) => {
        if (section.querySelector(".affiliate-disclosure-line")) return;
        const disclosure = document.createElement("p");
        disclosure.className = "affiliate-disclosure-line";
        disclosure.textContent = "Disclosure: some links are affiliate links. If you buy, I may earn a small commission at no extra cost to you.";
        section.appendChild(disclosure);
    });

    const articleSection = document.querySelector("[data-article], #article, .article-content, main");
    if (articleSection) {
        const createCtaBlock = () => {
            const cta = document.createElement("div");
            cta.className = "cta-block text-center";
            cta.innerHTML = `
                <p class="text-lg mb-3"><strong>Enjoying this guide?</strong> If it helped you plan smarter, buy me a coffee to keep the guides flowing.</p>
                <a href="/donate.html" class="button-primary">Buy me a coffee</a>
            `;
            return cta;
        };

        if (!articleSection.querySelector(".cta-block")) {
            articleSection.prepend(createCtaBlock());
            articleSection.appendChild(createCtaBlock());
        }

        const headings = Array.from(articleSection.querySelectorAll("h2"));
        const insertAfter = (node, newNode) => {
            if (node && node.parentNode) {
                node.parentNode.insertBefore(newNode, node.nextSibling);
            }
        };

        if (headings.length >= 2 && !articleSection.querySelector(".toc")) {
            const toc = document.createElement("div");
            toc.className = "toc mb-8";
            toc.innerHTML = "<h2 class=\"heading-font text-2xl text-white mb-4\">Table of Contents</h2>";
            const list = document.createElement("ul");
            list.className = "space-y-2";
            headings.forEach((heading) => {
                if (!heading.id) {
                    heading.id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, \"-\").replace(/(^-|-$)/g, \"\");
                }
                const item = document.createElement("li");
                item.innerHTML = `<a href=\"#${heading.id}\" class=\"text-yellow-400 hover:text-yellow-300\">${heading.textContent}</a>`;
                list.appendChild(item);
            });
            toc.appendChild(list);
            const firstCta = articleSection.querySelector(".cta-block");
            if (firstCta && firstCta.nextSibling) {
                articleSection.insertBefore(toc, firstCta.nextSibling);
            } else {
                articleSection.prepend(toc);
            }
        }

        if (!articleSection.querySelector(".quick-essentials")) {
            const title = document.title.toLowerCase();
            const isGear = title.includes("review") || title.includes("camera") || title.includes("gimbal") || title.includes("dji") || title.includes("sony");
            const essentials = document.createElement("section");
            essentials.className = "quick-essentials mt-10";
            if (isGear) {
                essentials.innerHTML = `
                    <h2 class="heading-font text-3xl text-white mb-4">Quick Essentials</h2>
                    <div class="grid gap-6 md:grid-cols-2">
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">Who it’s best for</h3>
                            <p class="text-gray-300">Creators who need reliable stabilization in a travel-sized kit, especially if you’re balancing run-and-gun shooting with cinematic movement.</p>
                        </div>
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">What to know before buying</h3>
                            <ul class="list-disc text-gray-300 pl-5 space-y-2">
                                <li>Plan on a quick balancing routine before each shoot day.</li>
                                <li>Pack one extra battery or power bank for long travel days.</li>
                                <li>Test your favorite lens combo at home so you’re dialed in on the road.</li>
                            </ul>
                        </div>
                        <div class="info-card md:col-span-2">
                            <h3 class="text-xl font-semibold text-white mb-2">Field workflow tip</h3>
                            <p class="text-gray-300">I keep a “ready-to-roll” setup in my day bag: gimbal, quick-release plate, and one lens that can handle both tight interiors and street walk-throughs.</p>
                        </div>
                    </div>
                `;
            } else {
                essentials.innerHTML = `
                    <h2 class="heading-font text-3xl text-white mb-4">Quick Essentials</h2>
                    <div class="grid gap-6 md:grid-cols-2">
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">Getting there</h3>
                            <p class="text-gray-300">Double-check ferry, flight, or bus schedules the night before and screenshot tickets so you’re not hunting for Wi-Fi at the terminal.</p>
                        </div>
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">Budget snapshot</h3>
                            <p class="text-gray-300">Expect mid-range costs if you stay central, eat local, and book activities in person. Prices spike on weekends and public holidays.</p>
                        </div>
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">Best areas to stay</h3>
                            <p class="text-gray-300">Choose one neighborhood for convenience, then day-trip to the rest. Being close to transit saves the most time and money.</p>
                        </div>
                        <div class="info-card">
                            <h3 class="text-xl font-semibold text-white mb-2">Local tips</h3>
                            <ul class="list-disc text-gray-300 pl-5 space-y-2">
                                <li>Start early for the top sights before the crowds build.</li>
                                <li>Carry cash for small vendors and transport.</li>
                                <li>Keep a light rain layer in your day pack.</li>
                            </ul>
                        </div>
                    </div>
                `;
            }
            const tocBlock = articleSection.querySelector(".toc");
            if (tocBlock) {
                insertAfter(tocBlock, essentials);
            } else {
                articleSection.prepend(essentials);
            }
        }
    }

    const affiliateIntent = getAffiliateIntent();
    document.body.dataset.intentType = affiliateIntent;

    const ctaBlocks = document.querySelectorAll(".affiliate-cta");
    if (ctaBlocks.length) {
        const assignedVariant = resolveCtaVariant();

        const createAffiliateCta = (cta) => {
            const link = cta.dataset.link || "#";
            const placement = cta.dataset.placement || "inline";
            const label = cta.dataset.label || cta.dataset.title || "Affiliate link";
            const thumbnail = cta.dataset.thumbnail;
            const benefit = cta.dataset.benefit || "A quick, reliable pick to save you time.";
            const who = cta.dataset.who || "Ideal for travelers who want a dependable setup.";
            const reasonOne = cta.dataset.reasonOne || "I use it in my own kit for dependable results.";
            const reasonTwo = cta.dataset.reasonTwo || "Solid value without overpaying for extras.";
            const alternative = cta.dataset.alternative || "Alternative: compare with a budget-friendly option.";

            const variants = {
                1: {
                    title: "Quick recommendation",
                    copy: `${benefit} ${who}`,
                    ctaLabel: cta.dataset.ctaLabel || "Check price",
                    body: `<p class="affiliate-cta__copy">${benefit} ${who}</p>`,
                },
                2: {
                    title: "Support the channel",
                    copy: "If you’re buying anyway, this helps keep the guides free.",
                    ctaLabel: cta.dataset.ctaLabel || "Grab it on Amazon",
                    body: `<p class="affiliate-cta__copy">If you’re buying anyway, this helps keep the guides free.</p>`,
                },
                3: {
                    title: "My pick (and why)",
                    copy: "Quick comparison notes.",
                    ctaLabel: cta.dataset.ctaLabel || "See options",
                    body: `<ul class="affiliate-cta__list">\n<li>${reasonOne}</li>\n<li>${reasonTwo}</li>\n</ul>\n<p class="affiliate-cta__alt">${alternative}</p>`,
                },
            };

            const variant = variants[assignedVariant];
            const imageMarkup = thumbnail
                ? `<div class="affiliate-cta__media"><img src="${thumbnail}" alt="${variant.title}"></div>`
                : "";

            cta.dataset.ctaVariant = String(assignedVariant);
            cta.dataset.intentType = affiliateIntent;
            cta.dataset.placement = placement;
            cta.innerHTML = `
                ${imageMarkup}
                <div class="affiliate-cta__content">
                    <p class="affiliate-cta__eyebrow">${variant.title}</p>
                    <h3 class="affiliate-cta__headline">${cta.dataset.title || variant.title}</h3>
                    ${variant.body}
                    <a class="button-primary affiliate-link" data-affiliate-placement="${placement}" data-affiliate-label="${label}" href="${link}" target="_blank" rel="noopener">
                        ${variant.ctaLabel}
                    </a>
                    <p class="affiliate-cta__disclosure">Affiliate disclosure: I may earn a commission at no extra cost to you.</p>
                </div>
            `;
        };

        ctaBlocks.forEach((cta) => createAffiliateCta(cta));
    }

    const shouldTrack = () => {
        const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        return !(dnt === "1" || dnt === "yes");
    };

    const sendEvent = (eventName, params) => {
        if (!shouldTrack()) return;
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
            return;
        }
        if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: eventName, ...params });
            return;
        }
        const storageKey = "affiliateEventLog";
        const existing = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
        existing.push({ event: eventName, params, ts: Date.now() });
        window.localStorage.setItem(storageKey, JSON.stringify(existing.slice(-100)));
        if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
            console.info("[affiliate-event]", eventName, params);
        }
    };

    const affiliateDomains = [
        "amzn.to",
        "amazon.",
        "wise.com",
        "dehancer.com",
        "yesim.app",
        "safetywing.com",
        "getyourguide.com",
        "hostelworld.com",
        "saily",
        "getyourwisecard",
    ];

    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        if (href.startsWith("mailto:")) {
            sendEvent("email_click", {
                page_path: window.location.pathname,
                email: href.replace("mailto:", ""),
            });
            return;
        }

        if (href.includes("work.html") || anchor.dataset.workCta === "true") {
            sendEvent("work_with_me_click", {
                page_path: window.location.pathname,
                label: anchor.textContent.trim() || "work-with-me",
            });
        }

        const isAffiliateLink =
            anchor.classList.contains("affiliate-link") ||
            affiliateDomains.some((domain) => href.includes(domain));
        if (!isAffiliateLink) return;

        let linkDomain = "";
        try {
            linkDomain = new URL(href, window.location.origin).hostname;
        } catch (error) {
            linkDomain = href.split("/")[0];
        }
        const placement =
            anchor.dataset.affiliatePlacement ||
            anchor.closest("[data-affiliate-placement]")?.dataset.affiliatePlacement ||
            "inline";
        const ctaVariant =
            anchor.closest(".affiliate-cta")?.dataset.ctaVariant ||
            window.localStorage.getItem("ctaVariant") ||
            "unknown";
        const intentType = document.body.dataset.intentType || "unknown";
        const linkLabel = anchor.dataset.affiliateLabel || anchor.textContent.trim() || "affiliate link";

        sendEvent("affiliate_click", {
            page_path: window.location.pathname,
            intent_type: intentType,
            placement,
            cta_variant: ctaVariant,
            link_domain: linkDomain,
            link_label: linkLabel,
        });
    });

    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
        const isAffiliateLink =
            anchor.classList.contains("affiliate-link") ||
            affiliateDomains.some((domain) => href.includes(domain));
        if (isAffiliateLink) return;
        let url;
        try {
            url = new URL(href, window.location.origin);
        } catch (error) {
            return;
        }
        if (url.hostname === window.location.hostname) return;
        sendEvent("outbound_click", {
            page_path: window.location.pathname,
            link_domain: url.hostname,
            link_path: url.pathname,
        });
    });

    const scrollDepths = [25, 50, 75, 90];
    const firedDepths = new Set();
    const handleScrollDepth = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const scrollPercent = Math.round((window.scrollY / docHeight) * 100);
        scrollDepths.forEach((depth) => {
            if (scrollPercent >= depth && !firedDepths.has(depth)) {
                firedDepths.add(depth);
                sendEvent("scroll_depth", {
                    page_path: window.location.pathname,
                    depth,
                });
            }
        });
    };
    window.addEventListener("scroll", handleScrollDepth, { passive: true });
    handleScrollDepth();

    [30, 60, 120].forEach((seconds) => {
        window.setTimeout(() => {
            sendEvent("time_on_page", {
                page_path: window.location.pathname,
                bucket: `${seconds}s`,
            });
        }, seconds * 1000);
    });

    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove("opacity-0", "invisible");
                backToTop.classList.add("opacity-100", "visible");
            } else {
                backToTop.classList.add("opacity-0", "invisible");
                backToTop.classList.remove("opacity-100", "visible");
            }
        };
        window.addEventListener("scroll", toggleBackToTop);
        toggleBackToTop();
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const addJsonLd = (data) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    };

    const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
    const description = document.querySelector('meta[name="description"]')?.content || "";
    const ogImage = document.querySelector('meta[property="og:image"]')?.content || "";
    addJsonLd({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Carl Travels",
        url: "https://www.carltravels.com/",
        logo: "https://www.carltravels.com/carlcircle.png",
        sameAs: [
            "https://www.youtube.com/@thecarltomich",
            "https://www.youtube.com/@carltomichtech",
            "https://www.youtube.com/@globetraveladventures",
            "https://www.instagram.com/carlostomich",
            "https://www.facebook.com/thecarlostomich/",
        ],
    });

    const pageName = (document.title || "").toLowerCase();
    const articleExclusions = [
        "home",
        "about",
        "contact",
        "privacy",
        "terms",
        "work with me",
        "start here",
        "gear",
        "destinations",
        "blog",
    ];
    if (!articleExclusions.some((word) => pageName.includes(word))) {
        addJsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: document.title.replace(" - Carl Travels", "").replace(" - Carl Tomich", ""),
            description,
            image: ogImage ? [ogImage] : undefined,
            author: { "@type": "Person", name: "Carl Tomich" },
            publisher: {
                "@type": "Organization",
                name: "Carl Travels",
                logo: { "@type": "ImageObject", url: "https://www.carltravels.com/carlcircle.png" },
            },
            mainEntityOfPage: canonical,
        });
    }
});
