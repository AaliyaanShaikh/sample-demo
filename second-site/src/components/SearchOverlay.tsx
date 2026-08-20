"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search as SearchIcon, X } from "lucide-react";
import { CATEGORIES, PIECES } from "@/lib/catalog";
import { easeOut } from "@/components/Reveal";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

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

  const filtered =
    query.trim().length > 0
      ? PIECES.filter((piece) => {
          const q = query.toLowerCase();
          return (
            piece.name.toLowerCase().includes(q) ||
            piece.category.toLowerCase().includes(q)
          );
        })
      : [];

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[150]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-overlay-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 z-0 bg-paper/95 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 flex justify-center px-4 pb-0 pt-16 sm:px-6 md:px-12 md:pt-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
        <div className="pointer-events-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col">
          <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
            <span id="search-overlay-title" className="sr-only">
              Search products
            </span>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
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
              className="w-full border-b border-ink/15 bg-transparent py-4 font-serif text-2xl text-ink placeholder:text-ink/35 focus:border-ink/40 focus:outline-none sm:py-6 sm:text-3xl md:text-6xl"
            />
            <SearchIcon
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink/35"
              size={32}
              strokeWidth={1}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pb-12">
            {query.trim() && filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-2xl italic text-ink/45">
                  No results found for &ldquo;{query.trim()}&rdquo;
                </p>
              </div>
            ) : null}

            {query.trim() && filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((piece) => (
                  <Link
                    key={piece.slug}
                    href={`/product/${piece.slug}`}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-mist">
                      <Image
                        src={piece.image}
                        alt={piece.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="font-serif text-xl text-ink">{piece.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-ink/45">
                      {piece.category}
                    </p>
                  </Link>
                ))}
              </div>
            ) : null}

            {!query.trim() ? (
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-ink/45">
                  Popular
                </span>
                <ul className="space-y-2">
                  {CATEGORIES.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/collections/${item.slug}`}
                        onClick={onClose}
                        className="font-serif text-xl text-ink/90 transition-transform hover:translate-x-2 hover:text-ink"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
