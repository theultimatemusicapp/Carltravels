#!/usr/bin/env python3
"""Check all public homepage copy and sections against the approved Cinema prototype."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import json,re
root=Path(__file__).resolve().parent.parent
contract=json.loads((root/'scripts/cinema-home-contract.json').read_text())
html=(root/'index.html').read_text()
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.text=Counter();self.skip=[];self.images=[];self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'):self.skip.append(tag)
        if tag=='img':self.images.append(a.get('src'))
        if tag=='a':self.links.append(a.get('href'))
    def handle_endtag(self,tag):
        if tag in self.skip:self.skip.remove(tag)
    def handle_data(self,text):
        text=' '.join(text.split())
        if text and not self.skip:self.text[text]+=1
p=Page();p.feed(html)
missing=Counter(contract['approved_home_text'])-p.text
assert not missing, f'Approved homepage copy missing: {list(missing)}'
positions=[html.index(f'class="{name}') if name!='cinema-home-hero' else html.index('class="hero cinema-home-hero') for name in contract['section_order']]
assert positions==sorted(positions),'Approved homepage sections are out of order'
for c in contract['cards']:
    assert c['path'] in p.links and c['image'] in p.images, f'Destination assignment missing: {c}'
    assert c['title'] in p.text and c['description'] in p.text,f'Destination copy missing: {c["path"]}'
assert contract['photograph'] in p.images and contract['film_poster'] in p.images,'Approved feature imagery missing'
for image in [contract['photograph'],contract['film_poster']]+[c['image'] for c in contract['cards']]:
    assert (root/image.lstrip('/')).is_file(),f'Missing original image file: {image}'
assert 'id="cinema-film-dialog"' in html and 'data-cinema-film' in html,'Film feature interaction missing'
assert 'Films worth making. Places worth understanding.' in p.text,'Approved footer tagline missing'
print(f'PASS: all {len(contract["approved_home_text"])} approved homepage text blocks, all five sections in order, three correctly assigned destination cards, portrait, poster, film dialog and footer.')
