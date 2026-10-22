#!/usr/bin/env python3
"""Add the shared Cinema presentation to every existing HTML page.

This intentionally does not reserialize HTML: existing content, media paths,
metadata and scripts remain byte-for-byte intact around two small insertions.
Run from the repository root when adding a new page.
"""
from pathlib import Path
import re

STYLESHEET = '    <link rel="stylesheet" href="/assets/css/cinema.css?v=20261022-2">\n'


def layout(path):
    name = path.as_posix()
    if name == "index.html":
        return "home"
    if name in {"blog.html", "gear.html", "destinations.html", "portfolio.html", "videos/index.html"}:
        return "collection"
    if name == "media/index.html":
        return "press"
    if name == "about.html":
        return "profile"
    if name in {"work.html", "nusalembongan.html", "portdouglas.html", "thankyou.html"}:
        return "legacy"
    if name in {"privacy-policy.html", "terms-and-conditions.html", "affiliate-disclosure.html", "editorial-policy.html"}:
        return "legal"
    if name in {"404.html", "travelfinder.html", "labs/route-finder/index.html", "avangate-verification.html"}:
        return "utility"
    if name in {"contact.html", "donate.html"}:
        return "functional"
    return "article"


def apply(path):
    original = path.read_bytes()
    text = original.decode("utf-8")
    if '/assets/css/cinema.css?' not in text:
        if not re.search(r"</head\s*>", text, re.I):
            raise ValueError(f"Missing head: {path}")
        text = re.sub(r"</head\s*>", lambda match: STYLESHEET + match.group(0), text, count=1, flags=re.I)
    if 'data-cinema-layout=' not in text:
        text, count = re.subn(r"<body\b([^>]*)>", lambda match: '<body' + match.group(1) + f' data-cinema-layout="{layout(path)}">', text, count=1, flags=re.I)
        if count != 1:
            raise ValueError(f"Missing body: {path}")
    updated = text.encode("utf-8")
    if updated != original:
        path.write_bytes(updated)


if __name__ == "__main__":
    pages = sorted(Path(".").rglob("*.html"))
    for page in pages:
        if ".git" not in page.parts and ".openai" not in page.parts:
            apply(page)
    print(f"Cinema presentation applied to {len(pages)} HTML pages.")
