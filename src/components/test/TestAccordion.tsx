"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTION_CATEGORIES } from "../../data/products";

export default function TestAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="theme-media-overlay relative flex min-h-[100svh] flex-col bg-background">
      {COLLECTION_CATEGORIES.map((category, index) => {
        const isActive = active === index;
        return (
          <Link
            key={category.slug}
            href={`/collections/${category.slug}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={`relative min-h-0 overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive ? "flex-[2.4]" : "flex-[0.7]"
            }`}
          >
            <Image
              src={category.image}
              alt={category.label}
              fill
              className={`object-cover transition-transform duration-[1.4s] ease-out ${
                isActive ? "scale-100" : "scale-110"
              }`}
              sizes="100vw"
            />
            <div
              className={`absolute inset-0 transition-colors duration-700 ${
                isActive ? "bg-black/25" : "bg-black/55"
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
              <span className="font-serif text-3xl text-white sm:text-5xl md:text-7xl">
                {category.label}
              </span>
              <span
                className={`hidden text-[11px] uppercase tracking-[0.32em] text-white/80 transition-opacity duration-500 md:block ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                Open collection
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
