document.addEventListener("DOMContentLoaded", () => {
    // Determine depth to adjust relative paths
    const pathDepth = window.location.pathname.split("/").filter(p => p !== "").length;
    // Calculate prefix: "" for root, "../" for depth 1, "../../" for depth 2, etc.
    // If it's a file at root (e.g. index.html), pathDepth is 1 but we don't need prefix
    // Actually, let's detect if we are in a subdirectory
    const isInSubdir = window.location.pathname.includes("/reviews/") || window.location.pathname.includes("/destinations/");
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 1 ? "../".repeat(depth - 1) : (depth === 1 && !window.location.pathname.endsWith('.html') && !window.location.pathname.endsWith('/') ? "" : "");

    // Better depth calculation:
    const calculatePrefix = () => {
        const path = window.location.pathname;
        if (path === "/" || path === "/index.html") return "";
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0) return "";
        // If the last segment is a file, we need depth - 1
        // If the last segment is a directory, we need depth
        const isFile = path.endsWith('.html');
        return "../".repeat(isFile ? segments.length - 1 : segments.length);
    };
    const rootPrefix = calculatePrefix();

    const renderHeader = () => {
        const headerContainer = document.getElementById("global-header");
        if (!headerContainer) return;

        headerContainer.innerHTML = `
    <nav id="navbar" class="navbar fixed w-full z-50 shadow-sm transition-all duration-300">
        <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
                <a href="${rootPrefix}index.html" class="text-2xl font-bold flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center mr-2">
                        <i class="fas fa-camera text-black text-lg"></i>
                    </div>
                    <span class="heading-font bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Carl Tomich</span>
                </a>

                <div class="hidden md:flex items-center space-x-8">
                    <a href="${rootPrefix}index.html" class="nav-link font-medium transition-colors">Home</a>
                    <a href="${rootPrefix}destinations.html" class="nav-link font-medium transition-colors">Destinations</a>
                    <a href="${rootPrefix}portfolio.html" class="nav-link font-medium transition-colors">Portfolio</a>
                    <a href="${rootPrefix}videos/index.html" class="nav-link font-medium transition-colors">Watch</a>
                    <a href="${rootPrefix}blog.html" class="nav-link font-medium transition-colors">Blog</a>
                    <a href="${rootPrefix}gear.html" class="nav-link font-medium transition-colors">Gear</a>
                    <a href="${rootPrefix}index.html#about" class="nav-link font-medium transition-colors">About</a>
                    <a href="${rootPrefix}donate.html" class="nav-link font-medium transition-colors">Donate</a>
                    <a href="${rootPrefix}index.html#contact" class="contact-button px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full hover:shadow-lg transition-all">Contact</a>
                </div>

                <button id="mobile-menu-button" class="md:hidden text-gray-300 focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>

            <div id="mobile-menu" class="mobile-menu md:hidden">
                <div class="pt-4 pb-2 space-y-2">
                    <a href="${rootPrefix}index.html" class="mobile-link block px-3 py-2 rounded-md font-medium">Home</a>
                    <a href="${rootPrefix}destinations.html" class="mobile-link block px-3 py-2 rounded-md">Destinations</a>
                    <a href="${rootPrefix}portfolio.html" class="mobile-link block px-3 py-2 rounded-md">Portfolio</a>
                    <a href="${rootPrefix}videos/index.html" class="mobile-link block px-3 py-2 rounded-md">Watch</a>
                    <a href="${rootPrefix}blog.html" class="mobile-link block px-3 py-2 rounded-md">Blog</a>
                    <a href="${rootPrefix}gear.html" class="mobile-link block px-3 py-2 rounded-md">Gear</a>
                    <a href="${rootPrefix}index.html#about" class="mobile-link block px-3 py-2 rounded-md">About</a>
                    <a href="${rootPrefix}donate.html" class="mobile-link block px-3 py-2 rounded-md">Donate</a>
                    <a href="${rootPrefix}index.html#contact" class="mobile-link block px-3 py-2 rounded-md">Contact</a>
                </div>
            </div>
        </div>
    </nav>`;
        // Re-initialize navbar logic after injection
        initNavbar();
    };

    const renderFooter = () => {
        const footerContainer = document.getElementById("global-footer");
        if (!footerContainer) return;

        footerContainer.innerHTML = `
    <footer class="bg-[#111] text-white py-12 border-t border-gray-800">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <a href="${rootPrefix}index.html" class="text-2xl font-bold flex items-center mb-6">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center mr-2">
                            <i class="fas fa-camera text-black text-lg"></i>
                        </div>
                        <span class="heading-font text-2xl">Carl Travels</span>
                    </a>
                    <p class="text-gray-400 mb-4">
                        Crafting cinematic stories through travel, tech, and filmmaking.
                    </p>
                    <div class="flex space-x-4">
                        <a href="https://www.youtube.com/@thecarltomich" target="_blank" class="text-gray-400 hover:text-yellow-500 transition-colors">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="https://www.instagram.com/carlostomich" target="_blank" class="text-gray-400 hover:text-yellow-500 transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/thecarlostomich/" target="_blank" class="text-gray-400 hover:text-yellow-500 transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-6">Quick Links</h3>
                    <ul class="space-y-3">
                        <li><a href="${rootPrefix}index.html" class="text-gray-400 hover:text-yellow-500 transition-colors">Home</a></li>
                        <li><a href="${rootPrefix}destinations.html" class="text-gray-400 hover:text-yellow-500 transition-colors">Destinations</a></li>
                        <li><a href="${rootPrefix}portfolio.html" class="text-gray-400 hover:text-yellow-500 transition-colors">Portfolio</a></li>
                        <li><a href="${rootPrefix}blog.html" class="text-gray-400 hover:text-yellow-500 transition-colors">Blog</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-6">Popular Destinations</h3>
                    <ul class="space-y-3">
                        <li><a href="${rootPrefix}berlin-travel-guide/" class="text-gray-400 hover:text-yellow-500 transition-colors">Berlin</a></li>
                        <li><a href="${rootPrefix}melbourne-travel-guide/" class="text-gray-400 hover:text-yellow-500 transition-colors">Melbourne</a></li>
                        <li><a href="${rootPrefix}cairns-travel-guide/" class="text-gray-400 hover:text-yellow-500 transition-colors">Cairns</a></li>
                        <li><a href="${rootPrefix}hanoi-travel-guide/" class="text-gray-400 hover:text-yellow-500 transition-colors">Hanoi</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-6">Newsletter</h3>
                    <p class="text-gray-400 mb-4">
                        Subscribe for exclusive filmmaking and travel insights.
                    </p>
                    <form action="https://formspree.io/f/mnnnoogg" method="POST" class="flex">
                        <input type="email" name="_replyto" placeholder="Your email" class="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full" required>
                        <button type="submit" class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-r-lg hover:shadow-lg transition-all">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm mb-4 md:mb-0">
                    © 2025 Carl Travels. All rights reserved.
                </p>
                <div class="flex space-x-6">
                    <a href="${rootPrefix}privacy-policy.html" class="text-gray-400 hover:text-yellow-500 text-sm transition-colors">Privacy Policy</a>
                    <a href="${rootPrefix}terms-and-conditions.html" class="text-gray-400 hover:text-yellow-500 text-sm transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;
    };

    const initNavbar = () => {
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
            const navbar = document.getElementById("navbar");
            if (!navbar) return;
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        // Active link highlighting
        const currentPath = window.location.pathname;
        document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
            const href = link.getAttribute("href") || "";
            // Clean up relative links for comparison
            if (currentPath.includes(href.replace('../', '').replace('./', '')) && href !== "" && href !== "#") {
                link.classList.add("active");
            }
        });
    };

    // Inject Header and Footer
    renderHeader();
    renderFooter();

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

    // Auto-embed YouTube Links
    const convertYouTubeLinks = () => {
        const articleArea = document.querySelector(".article-content") || document.querySelector("main");
        if (!articleArea) return;

        const links = articleArea.getElementsByTagName("a");
        Array.from(links).forEach(link => {
            const href = link.getAttribute("href");
            if (href && (href.includes("youtube.com/watch") || href.includes("youtu.be/"))) {
                // Ignore if it's already in the footer or social classes (though selector scopes to article-content)
                if (link.closest("footer") || link.closest(".social-links")) return;

                let videoId = "";
                if (href.includes("youtu.be/")) {
                    videoId = href.split("youtu.be/")[1]?.split("?")[0];
                } else if (href.includes("v=")) {
                    videoId = href.split("v=")[1]?.split("&")[0];
                }

                if (videoId) {
                    const wrapper = document.createElement("div");
                    wrapper.className = "relative aspect-video rounded-2xl overflow-hidden shadow-2xl my-8";
                    wrapper.innerHTML = `
                        <iframe class="absolute inset-0 w-full h-full" 
                                src="https://www.youtube.com/embed/${videoId}" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen>
                        </iframe>
                    `;
                    link.replaceWith(wrapper);
                }
            }
        });
    };
    convertYouTubeLinks();
}
);
