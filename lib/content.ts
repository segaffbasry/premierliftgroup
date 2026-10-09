import { LIVE } from "@/lib/site";

/* Homepage copy and media, from the live homepage unless a line says otherwise (premierliftgroup.co.uk, read
   2026-10-09). Live headings are set in capitals by CSS; they are stored in sentence case and capitalised the same
   way here. No em or en dashes anywhere (house rule). Media paths are under /public/media (scripts/media.sh). */

export const hero = {
  // Live h1 "BESpOKE LIFT SOLUTIONs" (mixed-case typo, displayed in capitals).
  title: ["Bespoke", "lift solutions"],
  film: { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg", label: "Premier circular glass lift beside a spiral staircase" },
  // The live hero slider's three photos, in order; the first two flank the film, the third leads the next section.
  side: [
    { src: "/media/hero-luxury.jpg", alt: "Bespoke glass lift in a gilded hallway with a sculpted mirror" },
    { src: "/media/hero-hill-street.jpg", alt: "Scenic glass terrace lift rising above a garden roof, Hill Street, London" },
  ],
};

export const about = {
  title: "Leaders in lift design",
  text: "We manufacture and install some of the most technically advanced and aesthetically pleasing lifts on the market. Our team of UK lift specialists is highly dedicated to excelling expectations with every brief, with lift solutions that are engineered to improve both accessibility and interior design in any property.",
  image: { src: "/media/hero-aspinal.jpg", alt: "Bespoke public lift in the Aspinal of London store, set in walnut panelling" },
  // From /about-us "about premier lift group": the compliance line, kept as the supporting paragraph.
  standards: "Premier Lift Group (formerly Premier Platform Lifts) provides lift solutions for both domestic and commercial projects, with an extensive range of passenger and platform lifts, which comply with the Equality Act, the DDA (Disability Discrimination Act), Part M of the Building Regulations, EN81-1/2 the EN81-41 and also the 2006/42/EC Machinery Directive.",
  // Live "work with" logos, in the live order.
  clients: [
    { name: "Marriott", src: "/media/logos/marriott.svg" },
    { name: "Foster + Partners", src: "/media/logos/foster-partners.svg" },
    { name: "Zaha Hadid Architects", src: "/media/logos/zaha-hadid.svg" },
    { name: "Heatherwick Studio", src: "/media/logos/heatherwick.svg" },
    { name: "Porsche", src: "/media/logos/porsche.svg" },
    { name: "Manchester United", src: "/media/logos/man-utd.svg" },
    { name: "The Savoy", src: "/media/logos/savoy.svg" },
    { name: "MAWD", src: "/media/logos/mawd.svg" },
  ],
};

export const collections = {
  title: "Lift collections",
  text: "Lift collections developed and curated by Premier Lift Group, covering a wide range of market sectors.",
  film: { src: "/media/collections.mp4", poster: "/media/collections-poster.jpg", title: "Lift Collections & Bespoke Lift Design" },
  // Live tiles HOME / PUBLIC / PASSENGER / GOODS / STEP & INCLINE / VEHICLE, each "view collection" (vehicle: "explore").
  items: [
    { id: "home", name: "Home", image: "/media/col-home.jpg", alt: "Premier home lift in a bright hallway beside a stair" },
    { id: "public", name: "Public", image: "/media/col-public.jpg", alt: "Public lift with glass doors beside a stone wall" },
    { id: "passenger", name: "Passenger", image: "/media/col-passenger.jpg", alt: "Glass passenger lift in a restaurant interior" },
    { id: "goods", name: "Goods", image: "/media/col-goods.jpg", alt: "Goods lift with a pallet truck and flowers" },
    { id: "step", name: "Step & incline", image: "/media/col-step.jpg", alt: "Step lift beside a short flight of stairs" },
    { id: "vehicle", name: "Vehicle", image: "/media/col-vehicle.jpg", alt: "Vehicle lift lowering a car into a lit garage" },
  ],
};

// Live BESPOKE tile ("BESPOKE / luxury lifts / EXPLORE" over Bespoke-Scenic-Glass-Lift-Circular.jpg), with the
// /luxury-lifts intro and its "Expert design and craftsmanship" block.
export const bespoke = {
  title: "Bespoke",
  sub: "Luxury lifts",
  image: { src: "/media/bespoke.jpg", alt: "Bespoke circular scenic glass lift in a bright, garden-facing hall" },
  text: "Bring unique visions to life with Premier Bespoke. Working in exclusive partnership with Milan-based Millepiani Elevators, we offer truly bespoke solutions through creative concept design, complex engineering and familiarity with the world's finest materials.",
  craftTitle: "Expert design and craftsmanship",
  craftText: "Bringing together the finest materials, our expert designers and craftspeople work with you to create an uncompromising final product.",
  craft: [
    { src: "/media/craft-sewing.jpg", alt: "Leather being stitched for a lift interior" },
    { src: "/media/craft-mill.jpg", alt: "A mill cutting brass for a lift panel" },
    { src: "/media/craft-leather.jpg", alt: "Brushed metal lift buttons set in leather" },
  ],
  href: `${LIVE}/luxury-lifts`,
};

// Live "projects" tile copy; the six cards are the first six on /projects (same titles, types and thumbnails).
export const projects = {
  title: "Projects",
  text: "Be inspired with a detailed look at our past projects.",
  total: 43, // unique project cards on /projects (2026-10-09)
  href: `${LIVE}/projects`,
  film: { src: "/media/tile-projects.mp4", poster: "/media/tile-projects-poster.jpg" },
  items: [
    { place: "Hill Street, London", type: "Bespoke Scenic Glass and Freesky Terrace Lift", image: "/media/pr-hill-street.jpg", href: `${LIVE}/projects/hill-street-luxury-glass-terrace-lift` },
    { place: "Edgecroft, Cheshire", type: "Bespoke Luxury Scenic Glass Lift", image: "/media/pr-edgecroft.jpg", href: `${LIVE}/projects/edgecroft-circular-glass-lift` },
    { place: "Royal Yacht, Edinburgh", type: "Bespoke Yacht and Marine Lift", image: "/media/pr-royal-yacht.jpg", href: `${LIVE}/projects/royal-yacht-lighthouse-lift` },
    { place: "The Farthings, West Midlands", type: "Bespoke Scenic Glass Lift", image: "/media/pr-farthings.jpg", href: `${LIVE}/projects/the-farthings-luxury-scenic-glass-lift` },
    { place: "SB Tower Zaha Hadid, London", type: "Luxury Public Scenic Glass Lift", image: "/media/pr-sb-tower.jpg", href: `${LIVE}/projects/sb-tower-luxury-glass-lift` },
    { place: "SW1W Residential", type: "Bespoke Home Lift", image: "/media/pr-sw1w.jpg", href: `${LIVE}/projects/sw1w-feature-glass-lift` },
  ],
};

// Live "blog" and "about us" tiles (the "projects" tile's film leads the projects slider instead).
export const explore = [
  { title: "Blog", text: "The latest news offering in-depth insights into our projects, philosophy, people and process.", image: "/media/tile-blog.jpg", href: `${LIVE}/news` },
  { title: "About us", text: "Our company profile, regulation details and certifications.", image: "/media/tile-about.jpg", href: `${LIVE}/about-us` },
];

// /luxury-lifts "tell us about your project" + the live homepage newsletter block.
export const contact = {
  title: "Tell us about your project",
  text: "Whether you are looking for sleek, minimal round lifts or want us to provide a statement yacht elevator, we have a luxury lift solution to satisfy your requirements. If you would like to request a quotation or find out more about Premier Lift Group, contact our team.",
  newsletterTitle: "Subscribe to our newsletter",
  newsletterText: "Stay up to date on the news and latest innovations from Premier Lift Group",
};
