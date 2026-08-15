#!/usr/bin/env python3
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE = "https://www.carltravels.com"

NOINDEX_PATHS = {
    "portfolio.html",
    "work.html",
    "donate.html",
    "thankyou.html",
    "avangate-verification.html",
    "films/a-sail-untold.html",
    "films/busk-life.html",
    "films/busking-for-berlin.html",
    "films/martial-arts-documentary.html",
    "videos/index.html",
    "videos/beginners-guide-davinci-resolve-2025.html",
    "videos/commercial-1.html",
    "videos/commercial-2.html",
    "videos/commercial-3.html",
    "videos/ha-giang-loop-easy-rider.html",
    "videos/hanoi-ha-long-bay-adventure.html",
    "videos/hanoi-learn-vietnamese-testimonial.html",
    "videos/hanoi-old-quarter-vibes.html",
    "videos/hanoi-train-street-thrills.html",
    "videos/music-video-1.html",
    "videos/music-video-2.html",
    "videos/music-video-3.html",
    "videos/osaka-dotonbori-at-night.html",
    "videos/osaka-expo-70-park-journey.html",
    "videos/osaka-kobe-beef-experience.html",
    "videos/tran-quoc-pagoda-watch.html",
    "videos/wedding-film-1.html",
    "videos/wedding-film-2.html",
    "videos/wedding-film-3.html",
    "aiarty-vs-topaz-video-ai.html",
    "electro-voice-everse-8-review.html",
    "saily-e-simguide.html",
    "sony-a7iii-review-2025.html",
    "guide-to-sarande.html",
}

NON_ARTICLES = {
    "index.html",
    "about.html",
    "contact.html",
    "privacy-policy.html",
    "terms-and-conditions.html",
    "affiliate-disclosure.html",
    "blog.html",
    "destinations.html",
    "gear.html",
    "portfolio.html",
    "work.html",
    "donate.html",
    "thankyou.html",
    "avangate-verification.html",
}

FAKE_LINK_REPLACEMENTS = {
    "https://amzn.to/3-example-everse8": "https://www.amazon.com/s?k=Electro-Voice+Everse+8",
    "https://amzn.to/3-example-mavic3": "https://www.amazon.com/s?k=DJI+Mavic+3",
    "https://amzn.to/3-example-nd": "https://www.amazon.com/s?k=DJI+Mavic+3+ND+filters",
    "https://amzn.to/3-example-battery": "https://www.amazon.com/s?k=DJI+Mavic+3+battery",
    "https://amzn.to/3-example-bag": "https://www.amazon.com/s?k=drone+carry+case",
    "https://amzn.to/3-example": "https://www.amazon.com/s?k=Zhiyun+Weebill+2",
    "https://amzn.to/3XYZabc": "https://www.amazon.com/s?k=Rode+Wireless+Pro",
    "https://amzn.to/m4max-link": "https://www.apple.com/macbook-pro/",
    "https://amzn.to/sigma-link": "https://www.amazon.com/s?k=Sigma+18-50mm+f2.8+Sony+E",
    "https://amzn.to/sony15-link": "https://www.amazon.com/s?k=Sony+15mm+f1.4+G",
}

AUTHOR_BOX = """
    <aside class="author-bio" style="margin: 48px 0; padding: 24px; border: 1px solid rgba(245,197,24,.35); border-radius: 14px; background: rgba(245,197,24,.08);">
        <h2 style="margin: 0 0 12px; color: inherit;">About the author</h2>
        <p style="margin: 0 0 12px;"><strong>Carl Tomich</strong> is an Australian documentary filmmaker and travel creator who has filmed and lived across Vietnam, Japan, Bali, Thailand, Albania, Montenegro, Croatia, and Australia. His guides come from being on the ground with camera gear, local transport, short-term rentals, visa runs, long travel days, and the practical mistakes that rarely make it into polished tourism content.</p>
        <p style="margin: 0;">On Carl Travels, he focuses on honest costs, transport details, neighbourhood choices, filming notes, and whether a place is actually worth your time.</p>
    </aside>
"""


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def title_from(content: str, fallback: str) -> str:
    m = re.search(r"<title>(.*?)</title>", content, re.I | re.S)
    if not m:
        return fallback
    return re.sub(r"\s+", " ", html.unescape(m.group(1))).strip()


def desc_from(content: str) -> str:
    class DescriptionParser(HTMLParser):
        def __init__(self) -> None:
            super().__init__()
            self.description = ""

        def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
            if tag.lower() != "meta" or self.description:
                return
            data = {k.lower(): v or "" for k, v in attrs}
            if data.get("name", "").lower() == "description":
                self.description = data.get("content", "").strip()

    parser = DescriptionParser()
    parser.feed(content)
    return html.unescape(parser.description).strip()


def canonical_for(path: Path) -> str:
    r = rel(path)
    if r == "index.html":
        return f"{SITE}/"
    if r.endswith("/index.html"):
        return f"{SITE}/{r[:-11]}/"
    return f"{SITE}/{r}"


def has_noindex(content: str) -> bool:
    return bool(re.search(r'<meta\s+name=["\']robots["\'][^>]*noindex', content, re.I))


def ensure_noindex(content: str) -> str:
    if has_noindex(content):
        return re.sub(
            r'(<meta\s+name=["\']robots["\']\s+content=["\'])([^"\']*)(["\'])',
            r"\1noindex,follow\3",
            content,
            count=1,
            flags=re.I,
        )
    return content.replace("</head>", '    <meta name="robots" content="noindex,follow">\n</head>', 1)


def ensure_canonical(content: str, canonical: str) -> str:
    if re.search(r'<link\s+rel=["\']canonical["\']', content, re.I):
        return re.sub(r'<link\s+rel=["\']canonical["\']\s+href=["\'][^"\']+["\']\s*/?>', f'<link rel="canonical" href="{canonical}">', content, count=1, flags=re.I)
    return content.replace("</head>", f'    <link rel="canonical" href="{canonical}">\n</head>', 1)


def ensure_footer_disclosure_link(content: str) -> str:
    if "affiliate-disclosure.html" in content:
        return content
    candidates = [
        (r'(<a href="/privacy-policy\.html"[^>]*>Privacy Policy</a>)', r'\1\n                    <a href="/affiliate-disclosure.html" class="text-sm nav-link">Affiliate Disclosure</a>'),
        (r'(<a href="/terms-and-conditions\.html"[^>]*>Terms(?: of Service)?</a>)', r'<a href="/affiliate-disclosure.html" class="text-sm nav-link">Affiliate Disclosure</a>\n                    \1'),
        (r'(</footer>)', r'    <p style="text-align:center; font-size:.875rem; margin-top:1rem;"><a href="/affiliate-disclosure.html">Affiliate Disclosure</a></p>\n\1'),
    ]
    for pattern, replacement in candidates:
        if re.search(pattern, content):
            return re.sub(pattern, replacement, content, count=1)
    return content


def ensure_author_box(content: str, path: Path) -> str:
    r = rel(path)
    if r in NON_ARTICLES or r.startswith("videos/") or r.startswith("films/") or "author-bio" in content:
        return content
    marker = "<!-- Saily Affiliate -->"
    if marker in content:
        return content.replace(marker, AUTHOR_BOX + "\n    " + marker, 1)
    if "</main>" in content:
        return content.replace("</main>", AUTHOR_BOX + "\n    </main>", 1)
    if "<footer" in content:
        return content.replace("<footer", AUTHOR_BOX + "\n    <footer", 1)
    return content


def ensure_article_schema(content: str, path: Path) -> str:
    r = rel(path)
    if r in NON_ARTICLES or r.startswith("videos/") or r.startswith("films/") or has_noindex(content):
        return content
    if '"@type": "Article"' in content or '"@type":"Article"' in content:
        return content
    title = title_from(content, path.stem)
    desc = desc_from(content)
    url = canonical_for(path)
    data = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": desc,
            "author": {"@type": "Person", "name": "Carl Tomich", "url": f"{SITE}/about.html"},
            "publisher": {"@type": "Person", "name": "Carl Tomich", "url": SITE},
            "mainEntityOfPage": {"@type": "WebPage", "@id": url},
            "image": f"{SITE}/carl-tomich-director.jpg",
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE}/"},
                {"@type": "ListItem", "position": 2, "name": title.replace(" - Carl Travels", "").replace(" | Carl Travels", ""), "item": url},
            ],
        },
    ]
    schema = '    <script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + "\n    </script>\n"
    return content.replace("</head>", schema + "</head>", 1)


def ensure_collection_schema(content: str, path: Path) -> str:
    r = rel(path)
    if r not in {"blog.html", "gear.html", "destinations.html"} or '"@type": "CollectionPage"' in content:
        return content
    title = title_from(content, path.stem)
    desc = desc_from(content)
    data = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "description": desc,
        "url": canonical_for(path),
        "publisher": {"@type": "Person", "name": "Carl Tomich", "url": SITE},
    }
    schema = '    <script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + "\n    </script>\n"
    return content.replace("</head>", schema + "</head>", 1)


SIMPLE_NAV = """
    <nav class="site-shell-nav" style="background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,.1);padding:14px 20px;position:relative;z-index:20;">
        <div style="max-width:1100px;margin:0 auto;display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap;">
            <a href="/index.html" style="color:#f5c518;font-weight:800;text-decoration:none;letter-spacing:.08em;">CARL TOMICH</a>
            <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:.92rem;">
                <a href="/destinations.html" style="color:#e5e7eb;text-decoration:none;">Travel Guides</a>
                <a href="/blog.html" style="color:#e5e7eb;text-decoration:none;">Blog</a>
                <a href="/gear.html" style="color:#e5e7eb;text-decoration:none;">Creator Gear</a>
                <a href="/about.html" style="color:#e5e7eb;text-decoration:none;">About</a>
                <a href="/contact.html" style="color:#e5e7eb;text-decoration:none;">Contact</a>
            </div>
        </div>
    </nav>
"""

SIMPLE_FOOTER = """
    <footer class="site-shell-footer" style="background:#0f0f0f;border-top:1px solid rgba(255,255,255,.1);padding:32px 20px;margin-top:48px;color:#9ca3af;">
        <div style="max-width:1100px;margin:0 auto;display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;">
            <p style="margin:0;">© 2026 Carl Tomich. Practical travel guides, creator gear, and life abroad notes.</p>
            <div style="display:flex;gap:14px;flex-wrap:wrap;">
                <a href="/about.html" style="color:#e5e7eb;">About</a>
                <a href="/contact.html" style="color:#e5e7eb;">Contact</a>
                <a href="/privacy-policy.html" style="color:#e5e7eb;">Privacy</a>
                <a href="/terms-and-conditions.html" style="color:#e5e7eb;">Terms</a>
                <a href="/affiliate-disclosure.html" style="color:#e5e7eb;">Affiliate Disclosure</a>
            </div>
        </div>
    </footer>
"""


def ensure_basic_shell(content: str, path: Path) -> str:
    if has_noindex(content):
        return content
    if "<nav" not in content:
        content = content.replace("<body>", "<body>\n" + SIMPLE_NAV, 1)
        content = re.sub(r"<body([^>]*)>", r"<body\1>\n" + SIMPLE_NAV, content, count=1) if SIMPLE_NAV not in content else content
    if "<footer" not in content:
        content = content.replace("</body>", SIMPLE_FOOTER + "\n</body>", 1)
    return content


def add_lazy_loading(content: str) -> str:
    content = re.sub(r"<img(?![^>]*\bloading=)", "<img loading=\"lazy\"", content)
    content = re.sub(r"<iframe(?![^>]*\bloading=)", "<iframe loading=\"lazy\"", content)
    return content


def update_html_files() -> None:
    for path in ROOT.rglob("*.html"):
        if ".git" in path.parts:
            continue
        content = path.read_text(encoding="utf-8")
        original = content
        r = rel(path)

        content = content.replace("7 ways to find cheap accomodation while traveling.html", "cheap-accommodation-while-traveling.html")
        content = content.replace("cheap accomodation", "cheap accommodation").replace("Cheap Accomodation", "Cheap Accommodation").replace("accomodation", "accommodation")
        for old, new in FAKE_LINK_REPLACEMENTS.items():
            content = content.replace(old, new)

        content = ensure_canonical(content, canonical_for(path))
        if r in NOINDEX_PATHS:
            content = ensure_noindex(content)
        content = ensure_footer_disclosure_link(content)
        content = ensure_author_box(content, path)
        content = ensure_article_schema(content, path)
        content = ensure_collection_schema(content, path)
        content = ensure_basic_shell(content, path)
        content = add_lazy_loading(content)

        if content != original:
            path.write_text(content, encoding="utf-8")


def write_sitemap() -> None:
    urls = []
    for path in sorted(ROOT.rglob("*.html")):
        if ".git" in path.parts or path.parts[-2:] == ("docs", path.name):
            continue
        content = path.read_text(encoding="utf-8")
        r = rel(path)
        if has_noindex(content) or r.startswith("docs/"):
            continue
        if r == "index.html" or r.endswith("/index.html") or not r.startswith(("videos/", "films/")):
            urls.append(canonical_for(path))
    urls = sorted(set(urls), key=lambda u: (u != f"{SITE}/", u))
    body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ""]
    for url in urls:
        body.append(f"  <url><loc>{url}</loc></url>")
    body.extend(["", "</urlset>", ""])
    (ROOT / "sitemap.xml").write_text("\n".join(body), encoding="utf-8")


def write_robots() -> None:
    (ROOT / "robots.txt").write_text(
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /avangate-verification.html\n"
        "Disallow: /thankyou.html\n"
        "Sitemap: https://www.carltravels.com/sitemap.xml\n"
        "Sitemap: https://www.carltravels.com/sitemap-video.xml\n",
        encoding="utf-8",
    )


def youtube_id(src: str) -> str | None:
    patterns = [
        r"youtube\.com/embed/([A-Za-z0-9_-]+)",
        r"youtube\.com/watch\?v=([A-Za-z0-9_-]+)",
        r"youtu\.be/([A-Za-z0-9_-]+)",
    ]
    for pattern in patterns:
        m = re.search(pattern, src)
        if m:
            return m.group(1)
    return None


def write_video_sitemap() -> None:
    entries = []
    for path in sorted(ROOT.rglob("*.html")):
        if ".git" in path.parts:
            continue
        content = path.read_text(encoding="utf-8")
        if has_noindex(content):
            continue
        ids = []
        for src in re.findall(r'<iframe[^>]+src=["\']([^"\']+)["\']', content, re.I):
            vid = youtube_id(src)
            if vid and vid not in ids:
                ids.append(vid)
        if not ids:
            continue
        title = title_from(content, path.stem).replace(" - Carl Travels", "").replace(" | Carl Travels", "")
        desc = desc_from(content) or f"Video and written guide by Carl Tomich: {title}."
        for vid in ids[:3]:
            entries.append((canonical_for(path), vid, title, desc[:240]))

    body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
    ]
    for loc, vid, title, desc in entries:
        body.extend(
            [
                "  <url>",
                f"    <loc>{loc}</loc>",
                "    <video:video>",
                f"      <video:thumbnail_loc>https://img.youtube.com/vi/{vid}/maxresdefault.jpg</video:thumbnail_loc>",
                f"      <video:title>{html.escape(title)}</video:title>",
                f"      <video:description>{html.escape(desc)}</video:description>",
                f"      <video:player_loc allow_embed=\"yes\">https://www.youtube.com/embed/{vid}</video:player_loc>",
                f"      <video:content_loc>https://www.youtube.com/watch?v={vid}</video:content_loc>",
                "      <video:family_friendly>yes</video:family_friendly>",
                "    </video:video>",
                "  </url>",
            ]
        )
    body.extend(["</urlset>", ""])
    (ROOT / "sitemap-video.xml").write_text("\n".join(body), encoding="utf-8")


if __name__ == "__main__":
    update_html_files()
    write_sitemap()
    write_video_sitemap()
    write_robots()
