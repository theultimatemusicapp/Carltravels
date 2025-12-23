document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

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
