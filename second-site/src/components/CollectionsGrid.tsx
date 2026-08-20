"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, PIECES } from "@/lib/catalog";
import { easeOut } from "@/components/Reveal";

const FILTERS = ["All", ...CATEGORIES.map((category) => category.title)];

export default function CollectionsGrid() {
  const [selected, setSelected] = useState("All");

  const visible = useMemo(
    () =>
      selected === "All"
        ? PIECES
        : PIECES.filter((piece) => piece.category === selected),
    [selected],
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelected(filter)}
            className={`rounded-md border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
              selected === filter
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="mb-8 text-[11px] uppercase tracking-[0.16em] text-ink/45">
        {visible.length} items
      </p>

      <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((piece) => (
            <motion.div
              key={piece.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <Link href={`/product/${piece.slug}`} className="group">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src={piece.image}
                    alt={piece.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
                  {piece.category}
                </p>
                <h2 className="mt-1 text-base sm:text-xl">{piece.name}</h2>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
