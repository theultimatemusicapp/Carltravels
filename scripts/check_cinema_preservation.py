#!/usr/bin/env python3
"""Verify that the Cinema rollout preserves every preexisting file's content.

Usage: python scripts/check_cinema_preservation.py --base <pre-Cinema commit>
Only the stylesheet link and body layout attribute may differ in original HTML.
All original non-HTML files, including every image, thumbnail, script, sitemap,
redirect configuration and existing stylesheet, must be byte-for-byte unchanged.
"""
from pathlib import Path
import argparse
import re
import subprocess


def git(*args):
    return subprocess.check_output(["git", *args])


def verify(base):
    files = git("ls-tree", "-r", "--name-only", "-z", base).decode().split("\0")
    pages = 0
    unchanged = 0
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
            stylesheet = b'    <link rel="stylesheet" href="/assets/css/cinema.css?v=20261022">\n'
            if updated.count(stylesheet) != 1:
                errors.append(f"Expected one Cinema stylesheet: {name}")
            if not re.search(rb'<body\b[^>]* data-cinema-layout="[a-z]+"', updated, re.I):
                errors.append(f"Missing Cinema layout: {name}")
            recovered = updated.replace(stylesheet, b"", 1)
            recovered = re.sub(rb' data-cinema-layout="[a-z]+"', b"", recovered, count=1)
            if recovered != original:
                errors.append(f"Original HTML content changed: {name}")
        elif original != updated:
            errors.append(f"Original asset changed: {name}")
        else:
            unchanged += 1
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {pages} original HTML pages retain all source content, image references, thumbnails, links, metadata and scripts.")
    print(f"PASS: {unchanged} original non-HTML files are byte-for-byte unchanged.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True)
    verify(parser.parse_args().base)
