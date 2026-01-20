window.affiliateLinks = {
    esim: {
        url: "https://yesim.app/",
        label: "Yesim eSIM",
        category: "Connectivity",
        note: "Reliable data without hunting for SIM cards."
    },
    insurance: {
        url: "https://safetywing.com/",
        label: "SafetyWing Travel Medical",
        category: "Protection",
        note: "Flexible coverage for long-term travel."
    },
    tours: {
        url: "https://www.getyourguide.com/",
        label: "GetYourGuide Tours",
        category: "Experiences",
        note: "Easy day trips and skip-the-line options."
    },
    hostel: {
        url: "https://www.hostelworld.com/",
        label: "Hostelworld",
        category: "Stays",
        note: "Budget stays with real reviews."
    },
    gear: {
        url: "https://amzn.to/",
        label: "Amazon Gear Picks",
        category: "Gear",
        note: "Quick links to the kit I travel with."
    }
};

window.resolveAffiliateLink = (slug) => {
    if (!slug) return null;
    return window.affiliateLinks?.[slug] || null;
};
