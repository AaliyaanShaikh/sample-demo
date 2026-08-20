"use client";

import ProductCarouselSection from "./ProductCarouselSection";
import { getNewArrivalProducts } from "../../data/products";

const newArrivals = getNewArrivalProducts();

export default function ProductShowcase() {
  return (
    <ProductCarouselSection
      title="New arrivals"
      description={
        <>
          Latest anti-tarnish pieces hand-picked for this drop. Tap through to
          shop each design.
        </>
      }
      products={newArrivals}
      viewAllHref="/collections"
      viewAllLabel="View Collection"
    />
  );
}
