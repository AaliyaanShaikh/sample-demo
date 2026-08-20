"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CATEGORIES, getPiecesByCategorySlug } from "@/lib/catalog";

export default function ShopByCategory() {
  const [slug, setSlug] = useState<string>(CATEGORIES[0].slug);
  const category = CATEGORIES.find((item) => item.slug === slug) ?? CATEGORIES[0];
  const piece = useMemo(
    () => getPiecesByCategorySlug(category.slug)[0],
    [category.slug],
  );

  if (!piece) return null;

  return (
    <section className="relative overflow-hidden bg-paper py-12 sm:py-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[28%] top-1/2 hidden h-[140%] w-[62%] -translate-y-1/2 rounded-full bg-ink lg:block"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr_0.9fr] lg:gap-8">
        <div className="relative z-10 w-full max-w-md text-paper lg:max-w-xs lg:pl-4">
          <div className="rounded-[1.5rem] bg-ink px-6 py-8 sm:rounded-[2rem] sm:px-8 sm:py-10 lg:bg-transparent lg:p-0">
            <h2 className="font-sans text-xl font-medium uppercase tracking-[0.12em] text-paper sm:text-2xl lg:text-3xl">
              Shop by
              <span className="block">category</span>
            </h2>
            <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-paper/55 sm:mt-8">
              Choose category
            </p>
            <div className="relative mt-3 max-w-xs">
              <select
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                aria-label="Choose category"
                className="w-full appearance-none rounded-full border border-paper/35 bg-transparent py-3 pl-5 pr-10 text-sm text-paper outline-none"
              >
                {CATEGORIES.map((item) => (
                  <option key={item.slug} value={item.slug} className="text-ink">
                    {item.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-paper/70"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[340px]">
          <div className="relative aspect-[3/4] overflow-hidden bg-mist shadow-[0_24px_60px_rgba(28,25,22,0.18)]">
            <Image
              src={piece.image}
              alt={piece.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 260px, 340px"
            />
            <Link
              href={`/product/${piece.slug}`}
              className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full border border-paper/80 text-[10px] uppercase tracking-[0.18em] text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink sm:right-4 sm:top-4 sm:h-14 sm:w-14"
            >
              View
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gold">
            {piece.category}
          </p>
          <h3 className="max-w-[12ch] text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {piece.name}
          </h3>
          <Link
            href={`/collections/${category.slug}`}
            className="mt-8 inline-flex w-fit rounded-full border border-ink px-8 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper sm:mt-10"
          >
            View more
          </Link>
        </div>
      </div>
    </section>
  );
}
