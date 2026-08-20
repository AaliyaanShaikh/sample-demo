import { PEXELS, pexelsPhoto, stockPhoto } from "../constants/images";
import { BRAND_NAME } from "../constants/brand";
import { PLACEHOLDER_PRICE } from "../constants/pricing";

/** Current drop label — used across PDP, grids, and category copy */
export const OCTOBER_COLLECTION = "";

const P = (filename: string) => stockPhoto(filename);

function formatInr(_amount: number): string {
  return PLACEHOLDER_PRICE;
}

/** Ring SKUs: placeholder demo pricing. */
function ringPrice(_displayInr: number): string {
  return PLACEHOLDER_PRICE;
}

/** Necklace SKUs: placeholder demo pricing. */
function necklacePrice(_displayInr: number): string {
  return PLACEHOLDER_PRICE;
}

/** Earring SKUs: placeholder demo pricing. */
function earringPrice(_displayInr: number): string {
  return PLACEHOLDER_PRICE;
}

/** Bracelet SKUs: placeholder demo pricing. */
function braceletPrice(_displayInr: number): string {
  return PLACEHOLDER_PRICE;
}

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  /** Marketing line (optional) */
  collection: string;
  /** One line describing the design for PDP */
  summary: string;
  /** Shown in the home “New arrivals” carousel only when true */
  isNewArrival?: boolean;
};

/** Full catalog — stock photos from Pexels for this sample demo. */
export const PRODUCTS: Product[] = [
  {
    id: "13",
    name: "Fluted Clover Station Necklace",
    price: formatInr(116_000),
    image: P("WhatsApp Image 2026-03-23 at 09.43.15 (2).jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    summary:
      "Gold-tone station bracelet with fluted clover medallions and a softly vintage-inspired finish.",
  },
  {
    id: "24",
    name: "Liquid Gold Snake Chain — Extender Necklace",
    price: necklacePrice(399),
    image: P("WhatsApp Image 2026-04-05 at 16.26.22 (2).jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Polished gold-tone snake chain with a fluid, liquid-metal drape, lobster clasp, and link extender for adjustable length—made for solo wear or layering.",
  },
  {
    id: "22",
    name: "Seven-Star Bezel Drip Necklace",
    price: necklacePrice(699),
    image: P("WhatsApp Image 2026-04-05 at 16.26.22.jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Gold-tone ball chain with seven bezel-set clear stones spaced along the front—short fringe that sits at the collarbone.",
  },
  {
    id: "15",
    name: "Classic Herringbone Chain Necklace",
    price: necklacePrice(599),
    image: P("WhatsApp Image 2026-03-23 at 09.43.17 (2).jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    summary:
      "Sleek flat herringbone chain with reflective movement, designed for solo wear or stacking.",
  },
  {
    id: "14",
    name: "Multi-Gem Bar Pendant Necklace",
    price: necklacePrice(899),
    image: P("WhatsApp Image 2026-03-23 at 09.43.16 (1).jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Horizontal pendant necklace featuring mixed-shape multicolor stones in a linked bar arrangement.",
  },
  {
    id: "20",
    name: "Aria Puffed Heart Station Necklace",
    price: necklacePrice(399),
    image: P("WhatsApp Image 2026-03-31 at 19.12.54.jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Elongated polished puffed heart on a delicate chain with evenly spaced gold beads—romantic station detail for everyday layering.",
  },
  {
    id: "18",
    name: "Luna Crescent Moon Necklace",
    price: necklacePrice(599),
    image: P("WhatsApp Image 2026-03-31 at 19.11.01.jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Chunky polished gold-tone crescent with a single clear stone on the inner curve, on a fine link chain—celestial and minimal.",
  },
  {
    id: "23",
    name: "Emerald Trio Layered Necklace Set",
    price: necklacePrice(899),
    image: P("WhatsApp Image 2026-04-05 at 16.26.22 (1).jpeg"),
    category: "Necklaces",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Three gold-tone layers: fine cable, rope twist, and flat herringbone with a rectangular emerald-cut crystal pendant—one stack, full look.",
  },
  {
    id: "25",
    name: "Aurelia Mesh Teardrop Hoops",
    price: earringPrice(489),
    image: P("WhatsApp Image 2026-03-23 at 09.43.11 (1).jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Soft teardrop hoops with all-over basketweave mesh texture and hinged latch-back closure—medium scale, high shine.",
  },
  {
    id: "28",
    name: "Ribbed Oval Gold Hoops",
    price: earringPrice(469),
    image: P("WhatsApp Image 2026-03-23 at 09.43.13 (2).jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Elongated oval hoops with diagonal ribbed texture and polished gold finish—secure latch-back, everyday statement.",
  },
  {
    id: "29",
    name: "Perlée Open Clover Studs",
    price: earringPrice(449),
    image: P("WhatsApp Image 2026-03-23 at 09.43.13 (3).jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Open four-leaf clover studs with beaded perlée edge and butterfly backs—dainty Alhambra-inspired everyday pair.",
  },
  {
    id: "8",
    name: "Textured Geo Hoop Earrings",
    price: formatInr(84_000),
    image: P("WhatsApp Image 2026-03-23 at 09.43.11.jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Angular open hoop earrings with a fine textured mesh surface and a softly sculpted silhouette.",
  },
  {
    id: "19",
    name: "Triple Bloom Tiered Floral Drops",
    price: earringPrice(459),
    image: P("WhatsApp Image 2026-03-31 at 19.11.47.jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Three stacked five-petal blooms per ear in warm gold with radial petal texture—linear drops with a brushed, light-catching finish.",
  },
  {
    id: "26",
    name: "Aurelia Heart-Silhouette Textured Hoops",
    price: earringPrice(479),
    image: P("WhatsApp Image 2026-03-23 at 09.43.12.jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Tapered heart-inspired hoops with snakeskin-style micro texture and latch-back closure—warmer gold tone, statement silhouette.",
  },
  {
    id: "30",
    name: "Onyx Perlée Clover Studs",
    price: earringPrice(529),
    image: P("WhatsApp Image 2026-03-23 at 09.43.15 (1).jpeg"),
    category: "Earrings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Four-leaf clover studs with jet-black inlay and gold-tone beaded border—post and butterfly closure, bold contrast.",
  },
  {
    id: "1",
    name: "Lyra Princess Ring — Split Shank",
    price: ringPrice(399),
    image: P("WhatsApp Image 2026-03-16 at 16.45.11.jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Double rounded rails merging at the base with a princess-cut solitaire in a four-prong basket.",
  },
  {
    id: "7",
    name: "Aura Oval Ring — Marquise Suspended",
    price: ringPrice(399),
    image: P("WhatsApp Image 2026-03-16 at 16.45.12 (3).jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    summary:
      "Molten-textured oval halo frame with a diagonally set marquise stone and prism light play.",
  },
  {
    id: "4",
    name: "Helix Pear Ring — Sculptural Bypass",
    price: ringPrice(399),
    image: P("WhatsApp Image 2026-03-16 at 16.45.10 (1).jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    summary:
      "Organic bypass silhouette with flame-like shoulders and a pear-cut centre stone.",
  },
  {
    id: "5",
    name: "Sculptural Bypass Ring — Round Brilliance",
    price: ringPrice(349),
    image: P("WhatsApp Image 2026-03-16 at 16.45.06.jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Bypass band with two tapered ends and a tension-set round brilliant-cut centre stone.",
  },
  {
    id: "3",
    name: "Waveform Ring — Triple Band Solitaire",
    price: ringPrice(299),
    image: P("WhatsApp Image 2026-03-16 at 16.45.09 (1).jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Fluid triple-band waves with a round brilliant-cut stone in a raised prong basket.",
  },
  {
    id: "45",
    name: "Chain-Link Band Ring",
    price: ringPrice(499),
    image: pexelsPhoto(PEXELS.lifestyleRingHand, 900),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Open-link chain band ring in high-polish gold tone—bold texture with a comfortable everyday profile.",
  },
  {
    id: "46",
    name: "Art Deco Halo Ring — Baguette Center",
    price: ringPrice(499),
    image: P("WhatsApp Image 2026-04-27 at 15.25.22.jpeg"),
    category: "Rings",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Rectangular art-deco top with a baguette center and pavé halo—structured sparkle with vintage energy.",
  },
  {
    id: "17",
    name: "Lilac Ice Tennis Bracelet",
    price: braceletPrice(399),
    image: pexelsPhoto(PEXELS.bracelet, 900),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Classic tennis line with pale lavender-tinged round stones in silver-toned prong settings—cool, luminous, and stack-ready.",
  },
  {
    id: "16",
    name: "Midnight Noir Tennis Bracelet",
    price: braceletPrice(449),
    image: P("WhatsApp Image 2026-03-31 at 19.07.03.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Continuous row of faceted black stones in dark-toned four-prong settings—full tennis line on black velvet with a bold monochrome look.",
  },
  {
    id: "21",
    name: "Noir Clover Motif Station Bracelet",
    price: braceletPrice(359),
    image: P("WhatsApp Image 2026-03-31 at 19.14.58.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Four-leaf clover stations with smooth black centres and gold-tone beaded milgrain borders, linked on a fine cable chain.",
  },
  {
    id: "52",
    name: "Bubble Bezel Tennis Bracelet",
    price: braceletPrice(899),
    image: P("WhatsApp Image 2026-04-28 at 15.28.37.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Bezel-set round stones in graduated sizes—delicate sparkle with a modern, bubbly silhouette.",
  },
  {
    id: "53",
    name: "Roman Double Disc Cuff Bracelet",
    price: braceletPrice(599),
    image: P("WhatsApp Image 2026-04-28 at 15.28.35.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Open cuff bracelet with two Roman numeral discs and tiny stone accents—graphic and iconic for stacking.",
  },
  {
    id: "55",
    name: "Clover & Pavé Bangle Bracelet",
    price: braceletPrice(699),
    image: P("WhatsApp Image 2026-04-28 at 15.28.34.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Polished bangle with clover motifs and a pavé-set strip—bright, feminine, and made for easy stacking.",
  },
  {
    id: "61",
    name: "Pavé Wave Nail Cuff",
    price: braceletPrice(999),
    image: P("WhatsApp Image 2026-04-28 at 15.28.37 (1).jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Open cuff with a nail-inspired silhouette and a pavé wave spine—bold shape with a sparkling center line.",
  },
  {
    id: "51",
    name: "Engraved Monogram Bangle",
    price: braceletPrice(499),
    image: P("WhatsApp Image 2026-04-28 at 15.28.38.jpeg"),
    category: "Bracelets",
    collection: OCTOBER_COLLECTION,
    isNewArrival: true,
    summary:
      "Slim engraved bangle with all-over monogram-style motifs—minimal thickness with a luxe patterned finish.",
  },
];

/** Products flagged `isNewArrival` — home carousel only shows these (order by id). */
export function getNewArrivalProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNewArrival).sort(
    (a, b) => Number(a.id) - Number(b.id),
  );
}

export type ProductPageData = Product & {
  images: string[];
  description: string;
  details: string[];
};

const EXTRA_PRODUCT_IMAGES: Record<string, string[]> = {
  "45": [pexelsPhoto(PEXELS.ringAlt, 900)],
  "53": [P("WhatsApp Image 2026-04-28 at 15.28.36.jpeg")],
  "61": [P("WhatsApp Image 2026-04-28 at 15.28.37 (2).jpeg")],
};

export function getProductPageData(id: string | undefined): ProductPageData {
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]!;
  const images = [product.image, ...(EXTRA_PRODUCT_IMAGES[product.id] ?? [])];
  const description = `${product.summary} ${product.name} is part of the ${product.collection} collection at ${BRAND_NAME}—anti-tarnish ${product.category.toLowerCase()}, finished to resist tarnish and dulling through everyday wear.`;
  const details = [
    `Collection: ${product.collection}`,
    `Category: ${product.category}`,
    "Anti-tarnish gold-tone finish with clear cubic zirconia centre stones where shown",
    "Hallmarked and individually inspected before dispatch",
    "Certificate of authenticity included",
    "Complimentary ring sizing where applicable",
  ];
  return { ...product, images, description, details };
}

export type CollectionCategory = {
  slug: string;
  label: string;
  description: string;
  image: string;
};

export const COLLECTION_CATEGORIES: CollectionCategory[] = [
  {
    slug: "rings",
    label: "Rings",
    description:
      "Anti-tarnish statement rings—bypass, marquise, princess, and sculptural bands. Shop the full line below.",
    image: P("WhatsApp Image 2026-03-16 at 16.45.11.jpeg"),
  },
  {
    slug: "necklaces",
    label: "Necklaces",
    description:
      "Anti-tarnish necklaces with station motifs, gemstone pendants, and classic herringbone lines.",
    image: PRODUCTS.find((p) => p?.category === "Necklaces")?.image ?? P("WhatsApp Image 2026-03-23 at 09.43.16 (1).jpeg"),
  },
  {
    slug: "earrings",
    label: "Earrings",
    description:
      "Anti-tarnish earrings including textured hoops, twist hoops, and clover studs.",
    image: PRODUCTS.find((p) => p?.category === "Earrings")?.image ?? P("WhatsApp Image 2026-03-23 at 09.43.13 (3).jpeg"),
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    description:
      "Tennis lines, clover stations, and fine chains—anti-tarnish finishes built for everyday shine.",
    image: P("WhatsApp Image 2026-03-31 at 19.07.03.jpeg"),
  },
];

export function getCategoryBySlug(
  slug: string | undefined,
): CollectionCategory | undefined {
  if (!slug) return undefined;
  return COLLECTION_CATEGORIES.find((c) => c.slug === slug.toLowerCase());
}

export function getProductsByCategoryLabel(label: string): Product[] {
  return PRODUCTS.filter(
    (p) => p.category.toLowerCase() === label.toLowerCase(),
  );
}

export function getProductsByCategorySlug(slug: string): Product[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  return getProductsByCategoryLabel(cat.label);
}
