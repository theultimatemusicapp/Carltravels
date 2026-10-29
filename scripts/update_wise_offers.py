#!/usr/bin/env python3
"""Regenerate static Wise placements after editing the shared offer below.
Run from the repository root: python3 scripts/update_wise_offers.py
"""
from pathlib import Path
import re
URL = 'https://wise.com/invite/ilpc/carlt62'
OFFER = 'Keep more of your travel money. Send money abroad with Wise at the mid-market exchange rate, with fees shown upfront. Join through my link for a free Wise card or zero Wise fees on your first transfer up to AUD $1,000.'
TERMS = 'Choose one offer, subject to eligibility and availability. AUD $1,000 is the transfer amount eligible for waived Wise fees, not a cash bonus. External charges may still apply.'
DISCLOSURE = 'Affiliate link. I earn a commission on qualifying referrals. Offer depends on your location. Terms apply.'

def render(kind):
    link = f'<a href="{URL}" target="_blank" rel="sponsored noopener" class="text-yellow-500 hover:text-yellow-400 underline font-medium">Get your Wise signup offer</a>'
    if kind == 'compact':
        return f'<span id="wise-offer" style="scroll-margin-top: 140px;" class="block">Wise: send money abroad at the mid-market exchange rate, with fees shown upfront. See the signup offer available in your country.</span> {link}<span class="block text-sm mt-2">{DISCLOSURE}</span>'
    return f'<div id="wise-offer" class="my-6 p-5 rounded-xl border border-yellow-500 space-y-3" style="color: inherit; scroll-margin-top: 140px;"><p>{OFFER}</p><p>{link}</p><p class="text-sm">{TERMS}</p><p class="text-sm">{DISCLOSURE}</p></div>'

def marked(kind):
    return f'<!-- wise-offer:{kind} -->'+render(kind)+'<!-- /wise-offer -->'

if __name__ == '__main__':
    for path in Path('.').rglob('*.html'):
        old = path.read_text()
        new = re.sub(r'<!-- wise-offer:(compact|block) -->.*?<!-- /wise-offer -->', lambda m: marked(m[1]), old, flags=re.S)
        if new != old:
            path.write_text(new)
