"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import type { Product } from "../data/products";

export type ProductCardProps = {
  product: Product & { originalPrice?: string };
  index?: number;
  className?: string;
  /** Parent owns motion (e.g. carousel slide) — skip motion.article wrapper */
  omitMotion?: boolean;
};

function ProductCardInner({
  product,
}: {
  product: Product & { originalPrice?: string };
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-[#111]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          decoding="async"
        />
        {product.isNewArrival ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-sm border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            New arrival
          </span>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"
          aria-hidden
        />
      </div>

      <div className="text-center">
        <span className="mb-2 block text-xs uppercase tracking-widest text-white/80">
          {product.category}
        </span>
        <h3 className="mb-2 font-serif text-lg text-white transition-opacity group-hover:opacity-90">
          {product.name}
        </h3>
        {product.originalPrice ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-white/50 line-through text-sm">
              {product.originalPrice}
            </p>
            <p className="font-light text-white">{product.price}</p>
          </div>
        ) : (
          <p className="font-light text-white">{product.price}</p>
        )}
      </div>
    </Link>
  );
}

export default function ProductCard({
  product,
  index = 0,
  className,
  omitMotion = false,
}: ProductCardProps) {
  if (omitMotion) {
    return (
      <div className={cn(className)}>
        <ProductCardInner product={product} />
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
      className={cn(className)}
    >
      <ProductCardInner product={product} />
    </motion.article>
  );
}
