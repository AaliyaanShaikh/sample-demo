"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "../../data/products";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const trending = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
] as const;

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const filteredProducts =
    query.trim().length > 0
      ? PRODUCTS.filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.collection.toLowerCase().includes(q)
          );
        })
      : [];

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const node = (
    <div
      className="fixed inset-0 z-[150]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-overlay-title"
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/95 to-[#0a0a0a] backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="absolute inset-0 z-10 flex justify-center px-6 pt-20 pb-0 md:px-12 md:pt-24 pointer-events-none">
        <div className="pointer-events-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col">
          <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
            <span id="search-overlay-title" className="sr-only">
              Search products
            </span>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              aria-label="Close search"
            >
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>

          <div className="relative mb-12 md:mb-16">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections…"
              className="w-full border-b border-white/15 bg-transparent py-6 font-serif text-3xl text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none md:text-6xl"
            />
            <SearchIcon
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/35"
              size={32}
              strokeWidth={1}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pb-12">
            {query.trim() && filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-2xl italic text-white/45">
                  No results found for &ldquo;{query.trim()}&rdquo;
                </p>
              </div>
            ) : null}

            {query.trim() && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-white/5 ring-1 ring-inset ring-white/10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="font-serif text-xl text-white transition-colors group-hover:text-white/85">
                      {product.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/45">
                      {product.category}
                    </p>
                    <p className="mt-1 font-mono text-sm text-white/75">
                      {product.price}
                    </p>
                  </Link>
                ))}
              </div>
            ) : null}

            {!query.trim() ? (
              <div className="grid grid-cols-1 gap-12 opacity-90 md:grid-cols-3">
                <div>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-white/45">
                    Popular
                  </span>
                  <ul className="space-y-2">
                    {trending.map((label) => (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => setQuery(label)}
                          className="font-serif text-xl text-white/90 transition-transform hover:translate-x-2 hover:text-white"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
