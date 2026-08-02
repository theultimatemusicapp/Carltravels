document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

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

    const mainElement = document.querySelector("main");
    if (mainElement && !mainElement.classList.contains("article-content")) {
        mainElement.classList.add("article-content");
    }

    const articleSection = document.querySelector("[data-article], #article, .article-content, main");
    if (articleSection) {
        const headings = Array.from(articleSection.querySelectorAll("h2"));

        if (headings.length >= 2 && !articleSection.querySelector(".toc")) {
            const toc = document.createElement("div");
            toc.className = "toc mb-8";
            toc.innerHTML = "<h2 class=\"heading-font text-2xl text-white mb-4\">Table of Contents</h2>";
            const list = document.createElement("ul");
            list.className = "space-y-2";
            headings.forEach((heading) => {
                if (!heading.id) {
                    heading.id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                }
                const item = document.createElement("li");
                item.innerHTML = `<a href=\"#${heading.id}\" class=\"text-yellow-400 hover:text-yellow-300\">${heading.textContent}</a>`;
                list.appendChild(item);
            });
            toc.appendChild(list);
            articleSection.prepend(toc);
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
        "saily",
        "getyourwisecard",
    ];

    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;
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
});
