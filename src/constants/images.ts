/**
 * Pexels CDN — jewelry-only stock photos.
 */
export const PEXELS = {
  ring: 10475790,
  necklace: 31757541,
  earrings: 10475792,
  bracelet: 1191531,
  ringAlt: 10475793,
  detailExtra: 1395306,
  brandStory: 1454179,
  lifestyleRingHand: 16689782,
  lifestylePortrait: 31757541,
} as const;

/** Confirmed jewelry photographs only (rings, necklaces, earrings, bracelets). */
const STOCK_PHOTO_IDS = [
  10475790, 10475791, 10475792, 10475793, 265906, 1454179, 16689782, 1413420,
  1191531, 248077, 1395306, 31757541,
] as const;

export function pexelsPhoto(photoId: number, width: number): string {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Stable jewelry stock photo URL from a product filename or other key. */
export function stockPhoto(key: string, width = 900): string {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const id = STOCK_PHOTO_IDS[hash % STOCK_PHOTO_IDS.length];
  return pexelsPhoto(id, width);
}

/**
 * Asset under `public/` (e.g. `photo.webp` or `products/sku-1.jpg`).
 * Encodes each path segment so subfolders and spaces in filenames work.
 */
export function publicImage(path: string): string {
  const segments = path.split("/").filter((s) => s.length > 0);
  return "/" + segments.map((s) => encodeURIComponent(s)).join("/");
}
