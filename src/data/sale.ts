import { stockPhoto } from "../constants/images";
import { PLACEHOLDER_PRICE } from "../constants/pricing";
import type { Product, ProductPageData } from "./products";

const P = (filename: string) => stockPhoto(`sale/${filename}`);

function formatInr(_amount: number): string {
  return PLACEHOLDER_PRICE;
}

export type SaleItem = Product & {
  originalPrice: string;
};

export type SaleProductPageData = ProductPageData & {
  originalPrice: string;
  isSaleItem: true;
};

/**
 * Single source of truth for sale products.
 */
export const SALE_ITEMS: SaleItem[] = [
  {
    id: "sale-01",
    name: "Clover Charm Solitaire Necklace",
    price: formatInr(699),
    originalPrice: formatInr(899),
    image: P("WhatsApp Image 2026-03-25 at 10.04.56.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Fine-chain necklace with a small clover charm and clean minimal everyday styling.",
  },
  {
    id: "sale-02",
    name: "Bloom Vine Crystal Necklace",
    price: formatInr(999),
    originalPrice: formatInr(1299),
    image: P("WhatsApp Image 2026-03-25 at 10.05.15.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Floral vine-inspired necklace with white enamel petals and crystal accents.",
  },
  {
    id: "sale-03",
    name: "Layered Blue Crystal Necklace",
    price: formatInr(1499),
    originalPrice: formatInr(1799),
    image: P("WhatsApp Image 2026-03-25 at 10.05.59.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Double-layered chain with blue crystal drops for a dimensional evening-ready look.",
  },
  {
    id: "sale-04",
    name: "Twin Drop Solitaire Necklace",
    price: formatInr(499),
    originalPrice: formatInr(899),
    image: P("WhatsApp Image 2026-03-25 at 10.14.44.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Delicate chain with two stacked solitaire stones in a vertical drop pendant.",
  },
  {
    id: "sale-05",
    name: "Mini Heart Pendant Necklace",
    price: formatInr(499),
    originalPrice: formatInr(799),
    image: P("WhatsApp Image 2026-03-25 at 10.16.24.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Minimal beaded-link necklace with a smooth heart pendant in polished gold tone.",
  },
  {
    id: "sale-06",
    name: "Bold Heart Pendant Necklace",
    price: formatInr(499),
    originalPrice: formatInr(799),
    image: P("WhatsApp Image 2026-03-25 at 10.18.43.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Statement heart pendant suspended on a textured chain with modern proportions.",
  },
  {
    id: "sale-07",
    name: "Crescent Stone Necklace",
    price: formatInr(849),
    originalPrice: formatInr(1199),
    image: P("WhatsApp Image 2026-03-25 at 11.14.55.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Crescent moon pendant necklace accented with a single clear stone at the center.",
  },
  {
    id: "sale-08",
    name: "Baguette Cluster Bar Necklace",
    price: formatInr(999),
    originalPrice: formatInr(1399),
    image: P("WhatsApp Image 2026-03-25 at 11.20.14.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Slim chain with a horizontal cluster of baguette-cut stones for a refined sparkle.",
  },
  {
    id: "sale-09",
    name: "Pearl Blossom Station Necklace",
    price: formatInr(599),
    originalPrice: formatInr(899),
    image: P("WhatsApp Image 2026-03-25 at 11.22.35.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "All-around station necklace with clustered pearl blossoms and warm gold links.",
  },
  {
    id: "sale-10",
    name: "Horseshoe Drop Pendant Necklace",
    price: formatInr(499),
    originalPrice: formatInr(899),
    image: P("WhatsApp Image 2026-03-25 at 11.26.14.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Open horseshoe pendant necklace finished with a suspended solitaire stone.",
  },
  {
    id: "sale-11",
    name: "Crystal Station Bead Necklace",
    price: formatInr(899),
    originalPrice: formatInr(1199),
    image: P("WhatsApp Image 2026-03-25 at 11.30.38.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Fine chain necklace featuring evenly spaced crystal station discs and bead details.",
  },
  {
    id: "sale-12",
    name: "Cascade Crystal Drop Necklace",
    price: formatInr(999),
    originalPrice: formatInr(1199),
    image: P("WhatsApp Image 2026-03-25 at 11.37.56.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Vertical cascade pendant with faceted clear stones and subtle colored accents.",
  },
  {
    id: "sale-13",
    name: "Mother of Pearl Heart Necklace",
    price: formatInr(1099),
    originalPrice: formatInr(1599),
    image: P("WhatsApp Image 2026-03-25 at 11.45.51.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Heart pendant necklace with a mother-of-pearl center and polished gold-tone frame.",
  },
  {
    id: "sale-14",
    name: "Starfish Stud Earrings",
    price: formatInr(399),
    originalPrice: formatInr(699),
    image: P("WhatsApp Image 2026-03-25 at 11.48.15.jpeg"),
    category: "Earrings",
    collection: "Sale",
    summary:
      "Sculpted starfish-inspired studs with a bold metallic finish and oceanic mood.",
  },
  {
    id: "sale-15",
    name: "Abstract Wing Stud Earrings",
    price: formatInr(499),
    originalPrice: formatInr(699),
    image: P("WhatsApp Image 2026-03-25 at 11.51.14.jpeg"),
    category: "Earrings",
    collection: "Sale",
    summary:
      "Fluid abstract studs with wing-like curves in a mirror-polished gold tone.",
  },
  {
    id: "sale-16",
    name: "Emerald Bar Pendant Necklace",
    price: formatInr(699),
    originalPrice: formatInr(899),
    image: P("WhatsApp Image 2026-03-25 at 11.34.15.jpeg"),
    category: "Necklaces",
    collection: "Sale",
    summary:
      "Slim vertical bar pendant with emerald-tone stones and a crystal border on a fine chain.",
  },
];

export function getSaleItemById(id: string | undefined): SaleItem | undefined {
  if (!id) return undefined;
  return SALE_ITEMS.find((item) => item.id === id);
}

export function getSaleProductPageData(
  id: string | undefined,
): SaleProductPageData | undefined {
  const item = getSaleItemById(id);
  if (!item) return undefined;
  return {
    ...item,
    images: [item.image],
    description: `${item.summary} ${item.name} is available in our sale edit with anti-tarnish finishing and everyday comfort.`,
    details: [
      "Collection: Sale",
      `Category: ${item.category}`,
      "Sale pricing valid while stocks last",
      "Anti-tarnish finish with quality checks before dispatch",
      "Certificate of authenticity included",
      "Easy replacement support for eligible orders",
    ],
    isSaleItem: true,
  };
}
