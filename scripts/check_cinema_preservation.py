#!/usr/bin/env python3
"""Verify original content, media and routes while allowing the approved layout.

Usage: python scripts/check_cinema_preservation.py --base <pre-Cinema commit>
Navigation labels and homepage CTA labels may follow the approved design.
Original article text, metadata, images, thumbnails and embed sources must remain.
"""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import argparse
import re
import subprocess


def git(*args):
    return subprocess.check_output(["git", *args])


def expected_script_fixes(name, data):
    """Permit only the six diagnosed runtime fixes, not arbitrary script edits."""
    if name in ("Hagiangloop.html", "aiarty-video-enhancer-review.html", "hanoi-by-night.html", "videos/ha-giang-loop-easy-rider.html"):
        data = data.replace(b"document.getElementById('year').textContent = new Date().getFullYear();", b"const yearElement = document.getElementById('year');\n        if (yearElement) yearElement.textContent = new Date().getFullYear();")
    if name == "make-money-online-while-traveling.html":
        data = data.replace(b"getElementById('mobileMenu')", b"getElementById('mobile-menu')").replace(b"getElementById('menuButton')", b"getElementById('mobile-menu-button')")
    if name == "sapa-travel-guide.html":
        data = data.replace(b"            const map = L.map('sapa-map')", b"            if (typeof L === 'undefined') return;\n            const map = L.map('sapa-map')")
    return data


class Content(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.text = Counter()
        self.media = Counter()
        self.metadata = Counter()
        self.skip = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("nav", "script", "style"):
            self.skip.append(tag)
        if tag in ("img", "source", "video", "audio", "iframe", "script"):
            for key in ("src", "srcset", "poster"):
                if attrs.get(key):
                    value = attrs[key]
                    if tag == "script" and value.startswith("/assets/js/site.js?"):
                        value = "/assets/js/site.js"
                    self.media[(tag, key, value)] += 1
        if attrs.get("data-thumbnail"):
            self.media[(tag, "data-thumbnail", attrs["data-thumbnail"])] += 1
        if tag == "meta":
            self.metadata[tuple(sorted(attrs.items()))] += 1
        if tag == "link" and attrs.get("rel") in ("canonical", "alternate"):
            self.metadata[tuple(sorted(attrs.items()))] += 1

    def handle_endtag(self, tag):
        if tag in self.skip:
            self.skip.remove(tag)

    def handle_data(self, data):
        if not self.skip:
            value = " ".join(data.split())
            if value:
                self.text[value] += 1


def verify(base):
    files = git("ls-tree", "-r", "--name-only", "-z", base).decode().split("\0")
    pages = unchanged = 0
    errors = []
    for name in filter(None, files):
        path = Path(name)
        if not path.is_file():
            errors.append(f"Original file removed: {name}")
            continue
        original = git("show", f"{base}:{name}")
        updated = path.read_bytes()
        if name.endswith(".html"):
            pages += 1
            old, new = Content(original.decode()), Content(updated.decode())
            inline = lambda data: Counter(re.findall(rb'<script\b[^>]*>(.*?)</script>', data, re.S | re.I))
            if inline(expected_script_fixes(name, original)) - inline(updated):
                errors.append(f"Original inline script changed: {name}")
            # The two old hero CTA labels are replaced by the approved copy.
            if name == "index.html":
                old.text.subtract(Counter({"Films & Work": 1, "Explore Carl Travels": 1}))
            for kind in ("text", "media", "metadata"):
                missing = getattr(old, kind) - getattr(new, kind)
                if missing:
                    errors.append(f"Original {kind} missing in {name}: {list(missing)[:3]}")
            if len(re.findall(rb'<link[^>]+href="/assets/css/cinema.css\?', updated)) != 1:
                errors.append(f"Expected one Cinema stylesheet: {name}")
            if not re.search(rb'<body\b[^>]* data-cinema-layout="[a-z]+"', updated, re.I):
                errors.append(f"Missing Cinema layout: {name}")
        elif name == "assets/js/site.js":
            # Shared menu fixes are intentional; page-specific scripts are unchanged.
            continue
        elif original != updated:
            errors.append(f"Original asset changed: {name}")
        else:
            unchanged += 1
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {pages} original pages retain their content, metadata, image/thumbnail references and embed sources.")
    print(f"PASS: {unchanged} original assets are byte-for-byte unchanged; only the shared navigation script is updated.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True)
    verify(parser.parse_args().base)
