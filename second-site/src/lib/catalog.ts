const PEXELS = {
  ring: 10475790,
  ringAlt: 10475793,
  ringSet: 10475791,
  earrings: 10475792,
  bracelet: 1191531,
  braceletAlt: 248077,
  necklace: 1413420,
  necklaceAlt: 31757541,
  detail: 1395306,
} as const;

export function photo(id: number, width = 1400) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const CATEGORIES = [
  {
    slug: "rings",
    title: "Rings",
    copy: "Bypass bands and quiet solitaires.",
    image: photo(PEXELS.ring),
  },
  {
    slug: "necklaces",
    title: "Necklaces",
    copy: "Fine chains meant for every day.",
    image: photo(PEXELS.necklace),
  },
  {
    slug: "earrings",
    title: "Earrings",
    copy: "Light hoops and small statements.",
    image: photo(PEXELS.earrings),
  },
  {
    slug: "bracelets",
    title: "Bracelets",
    copy: "A line of gold at the wrist.",
    image: photo(PEXELS.bracelet),
  },
] as const;

export const PIECES = [
  {
    slug: "aurora-band",
    name: "Aurora Band",
    category: "Rings",
    image: photo(PEXELS.ring, 900),
  },
  {
    slug: "lumen-drop",
    name: "Lumen Drop",
    category: "Earrings",
    image: photo(PEXELS.earrings, 900),
  },
  {
    slug: "day-chain",
    name: "Day Chain",
    category: "Necklaces",
    image: photo(PEXELS.necklace, 900),
  },
  {
    slug: "quiet-cuff",
    name: "Quiet Cuff",
    category: "Bracelets",
    image: photo(PEXELS.bracelet, 900),
  },
  {
    slug: "studio-solitaire",
    name: "Studio Solitaire",
    category: "Rings",
    image: photo(PEXELS.detail, 900),
  },
  {
    slug: "pearl-station",
    name: "Pearl Station",
    category: "Necklaces",
    image: photo(PEXELS.necklaceAlt, 900),
  },
  {
    slug: "halo-hoop",
    name: "Halo Hoop",
    category: "Earrings",
    image: photo(PEXELS.ringSet, 900),
  },
  {
    slug: "gilded-link",
    name: "Gilded Link",
    category: "Bracelets",
    image: photo(PEXELS.braceletAlt, 900),
  },
  {
    slug: "dawn-signet",
    name: "Dawn Signet",
    category: "Rings",
    image: photo(PEXELS.ringAlt, 900),
  },
] as const;

export function getPiece(slug: string) {
  return PIECES.find((piece) => piece.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getPiecesByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return PIECES.filter((piece) => piece.category === category.title);
}

export function categoryPath(label: string) {
  return `/collections/${label.toLowerCase()}`;
}
