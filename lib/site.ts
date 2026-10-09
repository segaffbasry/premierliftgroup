import type { BrandIcon } from "@/lib/brand-icons";

/* Site-wide links and company details, all from the live site (premierliftgroup.co.uk, read 2026-10-09).
   Every URL here is checked by `npm run links` against the live /sitemap.xml. */
export const LIVE = "https://www.premierliftgroup.co.uk";

export type Link = { label: string; href: string };

// Live header, in order: PRODUCT RANGE (dropdown), BESPOKE LIFTS, Projects, BLOG, ABOUT US, Contact.
export const nav: Link[] = [
  { label: "Product range", href: `${LIVE}/product-range` },
  { label: "Bespoke lifts", href: `${LIVE}/luxury-lifts` },
  { label: "Projects", href: `${LIVE}/projects` },
  { label: "Blog", href: `${LIVE}/news` },
  { label: "About us", href: `${LIVE}/about-us` },
];
export const contactLink: Link = { label: "Contact us", href: `${LIVE}/contact` };

// The live product dropdown (.dropdown-link), names and one-line descriptions verbatim (sentence case here).
export const products = [
  { id: "home", label: "Home lifts", line: "Collection of our home lifts", href: `${LIVE}/home-lifts` },
  { id: "public", label: "Commercial lifts", line: "Designed for commercial and public spaces", href: `${LIVE}/commercial-lifts` },
  { id: "passenger", label: "Passenger lifts", line: "Designed for commercial and public spaces", href: `${LIVE}/passenger-lifts` },
  { id: "goods", label: "Goods lifts", line: "Safe precise delivery of goods", href: `${LIVE}/goods-lifts` }, // live: "SpeSafe precise" (typo)
  { id: "step", label: "Step & incline lifts", line: "Disability access that complements the location", href: `${LIVE}/wheelchair-step-lifts` },
  { id: "vehicle", label: "Vehicle lifts", line: "The most aesthetic, high performance vehicle lift on the market", href: `${LIVE}/vehicle-lifts` },
] as const;
export const bespokeLink: Link = { label: "See our bespoke lifts", href: `${LIVE}/luxury-lifts` };

// Live footer "SITEMAP" column, in order.
export const footerSitemap: Link[] = [
  { label: "Home", href: `${LIVE}/` },
  { label: "Product Range", href: `${LIVE}/product-range` },
  { label: "Scenic and Glass Lifts", href: `${LIVE}/glass-scenic-lifts` },
  { label: "Platform Lifts", href: `${LIVE}/platform-lifts` },
  { label: "School Lifts", href: `${LIVE}/school-lifts` },
  { label: "Dumbwaiter Lifts", href: `${LIVE}/dumbwaiter-lifts` },
  { label: "Portal", href: `${LIVE}/portal` },
  { label: "Privacy Policy", href: `${LIVE}/privacy-policy` },
];

// Live footer "CONTACT US". The live labels read "Tel: 020 3355 0523 - LONDON"; dashes are removed (house rule).
export const phones = [
  { city: "London", number: "020 3355 0523", href: "tel:02033550523" },
  { city: "Manchester", number: "0161 820 3716", href: "tel:01618203716" },
];
export const email = { label: "info@premierliftgroup.co.uk", href: "mailto:info@premierliftgroup.co.uk" };
export const address = ["Premier Platform Lifts UK Ltd", "Trading as Premier Lift Group", "Unit C10, Heathrow Corporate Park", "Hounslow", "TW4 6ER", "United Kingdom"];
export const copyright = "Copyright © 2024 Premier Lifts. All rights reserved.";

// Live footer social links, in order.
export const socials: { name: string; href: string; icon: BrandIcon }[] = [
  { name: "Instagram", href: "https://www.instagram.com/premierliftgroup/", icon: "instagram" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCQ0BjTkRZ5tKzCMT98fuxAQ", icon: "youtube" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/premier-lift-group/", icon: "linkedin" },
];
