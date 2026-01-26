#!/usr/bin/env python3
"""
Batch update navigation across all CarlTravels pages.
Replaces old navigation with new filmmaker-focused navigation from index.html.
Preserves ALL content, monetization, and SEO.
"""

import os
import re
from pathlib import Path

# New navigation HTML (from index.html)
NEW_NAV = '''    <!-- Navigation -->
    <nav id="navbar" class="navbar fixed w-full z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <a href="/index.html" class="text-2xl font-bold">
                    <span class="heading-font" style="color: var(--primary);">CARL TOMICH</span>
                </a>

                <div class="hidden md:flex items-center space-x-8">
                    <a href="/index.html" class="nav-link font-medium">Films</a>
                    <a href="/portfolio.html" class="nav-link font-medium">Portfolio</a>
                    <a href="/films/martial-arts-documentary.html" class="nav-link font-medium">Current Project</a>
                    <a href="/blog.html" class="nav-link font-medium">Blog</a>
                    <a href="/gear.html" class="nav-link font-medium">Gear</a>
                    <a href="/destinations.html" class="nav-link font-medium">Travel</a>
                    <a href="/about.html" class="nav-link font-medium">About</a>
                    <a href="/donate.html" class="nav-link font-medium" style="color: var(--primary);">Donate</a>
                </div>

                <button id="mobile-menu-button" class="md:hidden focus:outline-none" style="color: var(--light);">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>

            <div id="mobile-menu" class="mobile-menu md:hidden">
                <div class="pt-4 pb-2 space-y-2">
                    <a href="/index.html" class="block px-3 py-2 rounded-md nav-link">Films</a>
                    <a href="/portfolio.html" class="block px-3 py-2 rounded-md nav-link">Portfolio</a>
                    <a href="/films/martial-arts-documentary.html" class="block px-3 py-2 rounded-md nav-link">Current Project</a>
                    <a href="/blog.html" class="block px-3 py-2 rounded-md nav-link">Blog</a>
                    <a href="/gear.html" class="block px-3 py-2 rounded-md nav-link">Gear</a>
                    <a href="/destinations.html" class="block px-3 py-2 rounded-md nav-link">Travel</a>
                    <a href="/about.html" class="block px-3 py-2 rounded-md nav-link">About</a>
                    <a href="/donate.html" class="block px-3 py-2 rounded-md nav-link" style="color: var(--primary);">Donate</a>
                </div>
            </div>
        </div>
    </nav>'''

# New footer HTML (from index.html)
NEW_FOOTER = '''    <!-- Footer -->
    <footer class="py-12" style="background: var(--dark); border-top: 1px solid var(--dark-3);">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 class="heading-font text-2xl mb-4" style="color: var(--primary);">CARL TOMICH</h3>
                    <p class="mb-4 text-sm" style="color: var(--light);">
                        Documentary Filmmaker
                    </p>
                    <p class="text-sm" style="color: var(--muted);">
                        Engineering extreme life projects and turning them into films since 2014.
                    </p>
                </div>

                <div>
                    <h3 class="font-semibold mb-4" style="color: var(--light);">Films</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="https://www.youtube.com/watch?v=WjtMEQx34NE" target="_blank" class="nav-link">Busking for Berlin (2014)</a></li>
                        <li><a href="https://www.youtube.com/watch?v=6iDgajITe6Q" target="_blank" class="nav-link">A Sail Untold (2022)</a></li>
                        <li><a href="https://www.youtube.com/watch?v=S8L4Hmwkgiw" target="_blank" class="nav-link">Busk Life (2024)</a></li>
                        <li><a href="#current-project" class="nav-link">Martial Arts Doc (In Production)</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold mb-4" style="color: var(--light);">Explore</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/about.html" class="nav-link">About</a></li>
                        <li><a href="/blog.html" class="nav-link">Essays</a></li>
                        <li><a href="/gear.html" class="nav-link">Gear</a></li>
                        <li><a href="/destinations.html" class="nav-link">Travel Guides</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold mb-4" style="color: var(--light);">Connect</h3>
                    <div class="flex space-x-4 mb-4">
                        <a href="https://www.youtube.com/@thecarltomich" target="_blank" class="nav-link text-2xl"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.instagram.com/carlostomich" target="_blank" class="nav-link text-2xl"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.imdb.com/name/nm6869150/" target="_blank" class="nav-link text-2xl"><i class="fab fa-imdb"></i></a>
                    </div>
                    <a href="mailto:watchcarltravel@gmail.com" class="nav-link text-sm">watchcarltravel@gmail.com</a>
                </div>
            </div>

            <div class="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style="border-color: var(--dark-3);">
                <p class="text-sm mb-4 md:mb-0" style="color: var(--muted);">
                    © 2025 Carl Tomich. All rights reserved.
                </p>
                <div class="flex space-x-6">
                    <a href="/privacy-policy.html" class="text-sm nav-link">Privacy Policy</a>
                    <a href="/terms-and-conditions.html" class="text-sm nav-link">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>'''

def update_navigation(file_path):
    """Update navigation and footer in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already updated (check for new nav signature including Portfolio)
        if 'CARL TOMICH' in content and 'Films</a>' in content and 'Portfolio</a>' in content:
            print(f"✓ Already updated: {file_path}")
            return False
        
        # Find and replace navigation
        # Pattern: from <nav to </nav>
        nav_pattern = r'<nav[^>]*>.*?</nav>'
        if re.search(nav_pattern, content, re.DOTALL):
            content = re.sub(nav_pattern, NEW_NAV, content, count=1, flags=re.DOTALL)
        
        # Find and replace footer
        # Pattern: from <footer to </footer>
        footer_pattern = r'<footer[^>]*>.*?</footer>'
        if re.search(footer_pattern, content, re.DOTALL):
            content = re.sub(footer_pattern, NEW_FOOTER, content, count=1, flags=re.DOTALL)
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated: {file_path}")
        return True
        
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False

def main():
    """Update all HTML files in the Carltravels directory."""
    base_dir = Path('/Users/carltomich/Desktop/Carltravels')
    
    # Find all HTML files
    html_files = []
    
    # Root directory HTML files
    html_files.extend(base_dir.glob('*.html'))
    
    # Subdirectory HTML files
    for subdir in ['videos', 'films', 'ha-long-bay-travel-guide', 'nusa-lembongan-travel-guide', 'port-douglas-travel-guide', 'blog', 'docs']:
        subdir_path = base_dir / subdir
        if subdir_path.exists():
            html_files.extend(subdir_path.glob('*.html'))
            html_files.extend(subdir_path.glob('**/*.html'))
    
    print(f"Found {len(html_files)} HTML files to update\n")
    
    updated_count = 0
    skipped_count = 0
    
    for html_file in sorted(html_files):
        if update_navigation(html_file):
            updated_count += 1
        else:
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"SUMMARY:")
    print(f"  Updated: {updated_count} files")
    print(f"  Skipped: {skipped_count} files (already updated)")
    print(f"  Total:   {len(html_files)} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
