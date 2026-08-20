"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import ProductCard from "../components/ProductCard";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "../data/products";

export default function CollectionCategory() {
  const params = useParams();
  const categorySlug = params?.categorySlug as string | undefined;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const products = category
    ? getProductsByCategorySlug(category.slug)
    : [];

  if (!categorySlug || !category) {
    return null;
  }

  return (
    <PageShell
      title={category.label}
      subtitle={category.description}
    >
      <nav className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase text-white/60 mb-12">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="opacity-50" />
        <Link href="/collections" className="hover:text-white transition-colors">
          Collections
        </Link>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-white">{category.label}</span>
      </nav>

      <div className="relative mb-14 aspect-[21/9] max-h-[320px] w-full overflow-hidden bg-[#111] md:mb-16">
        <Image
          src={category.image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {products.length === 0 ? (
        <p className="text-white/80 font-light">
          No pieces in this category yet.{" "}
          <Link href="/collections" className="underline hover:text-white">
            Browse all collections
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 pt-12 border-t border-white/10 text-center">
        <Link
          href="/collections"
          className="inline-flex text-sm tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
        >
          Back to all collections
        </Link>
      </div>
    </PageShell>
  );
}
