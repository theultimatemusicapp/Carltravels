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

    if (mobileMenuButton && mobileMenu) {
        const syncMenu = () => {
            const open = mobileMenu.classList.contains("open");
            mobileMenuButton.setAttribute("aria-expanded", String(open));
            mobileMenuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
            mobileMenuButton.setAttribute("aria-controls", mobileMenu.id);
            mobileMenu.inert = !open;
            const icon = mobileMenuButton.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !open);
                icon.classList.toggle("fa-times", open);
            }
        };
        // Legacy pages also register bubble handlers. Own this interaction once.
        mobileMenuButton.addEventListener("click", (event) => {
            event.stopImmediatePropagation();
            mobileMenu.classList.toggle("open");
            syncMenu();
        }, true);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
                mobileMenu.classList.remove("open");
                syncMenu();
                mobileMenuButton.focus();
            }
        });
        mobileMenu.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                mobileMenu.classList.remove("open");
                syncMenu();
            }
        });
        new MutationObserver(syncMenu).observe(mobileMenu, { attributes: true, attributeFilter: ["class"] });
        syncMenu();
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

    const normalisePath = (path) => path.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const currentPath = normalisePath(window.location.pathname);
    document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
        const url = new URL(link.getAttribute("href") || "", window.location.href);
        if (url.origin === window.location.origin && !url.hash && normalisePath(url.pathname) === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    const mainElement = document.querySelector("main");
    if (mainElement && !mainElement.classList.contains("article-content")) {
        mainElement.classList.add("article-content");
    }

    const articleSection = document.querySelector("[data-article], #article, main[data-editorial-article]");
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
                const link = document.createElement("a");
                link.href = `#${heading.id}`;
                link.className = "text-yellow-400 hover:text-yellow-300";
                link.textContent = heading.textContent;
                item.appendChild(link);
                list.appendChild(item);
            });
            toc.appendChild(list);
            const firstHeading = headings[0];
            firstHeading.before(toc);
        }
    }

    const affiliateIntent = getAffiliateIntent();
    document.body.dataset.intentType = affiliateIntent;

    const ctaBlocks = document.querySelectorAll(".affiliate-cta");
    ctaBlocks.forEach((cta) => {
        let destination;
        try { destination = new URL(cta.dataset.link); } catch { return; }
        if (!["https:", "http:"].includes(destination.protocol)) return;
        // Product-specific copy must come from the page; never invent ownership or testing.
        const content = document.createElement("div");
        content.className = "affiliate-cta__content";
        const heading = document.createElement("h3");
        heading.className = "affiliate-cta__headline";
        heading.textContent = cta.dataset.title || cta.dataset.label || "Compare current options";
        content.appendChild(heading);
        if (cta.dataset.benefit) {
            const copy = document.createElement("p");
            copy.className = "affiliate-cta__copy";
            copy.textContent = cta.dataset.benefit;
            content.appendChild(copy);
        }
        const link = document.createElement("a");
        link.className = "button-primary affiliate-link";
        link.href = destination.href;
        link.target = "_blank";
        link.rel = "noopener sponsored nofollow";
        link.textContent = cta.dataset.ctaLabel || "Check current price and terms";
        link.dataset.affiliatePlacement = cta.dataset.placement || "inline";
        link.dataset.affiliateLabel = cta.dataset.label || heading.textContent;
        content.appendChild(link);
        const disclosure = document.createElement("p");
        disclosure.className = "affiliate-cta__disclosure";
        disclosure.textContent = "Affiliate link: Carl Travels may receive a commission or referral credit if you buy through this link.";
        content.appendChild(disclosure);
        if (cta.dataset.thumbnail) {
            const media = document.createElement("div");
            media.className = "affiliate-cta__media";
            const image = document.createElement("img");
            image.src = cta.dataset.thumbnail;
            image.alt = cta.dataset.title || cta.dataset.label || "Recommended product";
            image.loading = "lazy";
            media.appendChild(image);
            cta.replaceChildren(media, content);
        } else {
            cta.replaceChildren(content);
        }
        cta.dataset.ctaVariant = "editorial";
    });

    const shouldTrack = () => {
        const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        return !(dnt === "1" || dnt === "yes") && window.carlAnalyticsConsent === "granted";
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

    };

    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        const isAffiliateLink =
            anchor.classList.contains("affiliate-link") ||
            anchor.relList.contains("sponsored");
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
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    }
});
