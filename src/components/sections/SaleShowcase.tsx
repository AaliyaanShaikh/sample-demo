"use client";

import Link from "next/link";
import ProductCarouselSection from "./ProductCarouselSection";
import { SALE_ITEMS } from "../../data/sale";

export default function SaleShowcase() {
  return (
    <ProductCarouselSection
      title="Sale Products"
      description={
        <>
          Limited-time anti-tarnish picks with reduced pricing.{" "}
          <Link href="/sale" className="underline underline-offset-4">
            See all sale items
          </Link>
          .
        </>
      }
      products={SALE_ITEMS}
      viewAllHref="/sale"
      viewAllLabel="View Sale Products"
      celebrateSale
    />
  );
}
