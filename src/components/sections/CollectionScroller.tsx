"use client";

import ProductCarouselSection from "./ProductCarouselSection";
import { PRODUCTS } from "../../data/products";

export default function CollectionScroller() {
  return (
    <ProductCarouselSection
      title="Every piece in the line"
      description={
        <>
          Scroll through the full catalog—each design is shoppable. Tap through
          for details and care.
        </>
      }
      products={PRODUCTS}
      viewAllHref="/collections"
      viewAllLabel="View Collection"
    />
  );
}
