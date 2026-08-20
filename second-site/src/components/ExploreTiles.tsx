"use client";

import Image from "next/image";
import Link from "next/link";
import { photo } from "@/lib/catalog";

const tiles = [
  {
    href: "/collections",
    image: photo(1413420, 1400),
    eyebrow: "Just in",
    title: "New arrivals",
    alt: "Gold necklace on a tray",
    showView: false,
  },
  {
    href: "/collections",
    image: photo(16689782, 1400),
    eyebrow: "Explore",
    title: "Collections",
    alt: "Gold ring worn on a hand",
    showView: true,
  },
] as const;

export default function ExploreTiles() {
  return (
    <section className="grid md:min-h-[70vh] md:grid-cols-2">
      {tiles.map((tile) => (
        <Link
          key={tile.title}
          href={tile.href}
          className="group relative min-h-[42svh] overflow-hidden bg-ink sm:min-h-[46vh] md:min-h-0"
        >
          <Image
            src={tile.image}
            alt={tile.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-ink/30" />
          {tile.showView ? (
            <span className="absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-paper text-[10px] uppercase tracking-[0.2em] text-paper opacity-100 transition-opacity duration-300 md:h-16 md:w-16 md:opacity-0 md:group-hover:opacity-100">
              View
            </span>
          ) : null}
          <div className="absolute inset-x-0 bottom-10 text-center">
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-gold">
              {tile.eyebrow}
            </p>
            <h2 className="px-4 font-sans text-2xl font-medium uppercase tracking-[0.14em] text-paper sm:text-3xl md:text-4xl">
              {tile.title}
            </h2>
          </div>
        </Link>
      ))}
    </section>
  );
}
