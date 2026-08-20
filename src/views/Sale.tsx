"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import PageShell from "../components/layout/PageShell";
import { SALE_ITEMS } from "../data/sale";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "name";

function parseInr(price: string): number {
  const n = parseInt(price.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

export default function Sale() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("featured");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(SALE_ITEMS.map((i) => i.category)))],
    [],
  );

  const visibleItems = useMemo(() => {
    const base = [...SALE_ITEMS];
    const filtered =
      selectedCategory === "All"
        ? base
        : base.filter((item) => item.category === selectedCategory);

    if (sortBy === "priceAsc") {
      return [...filtered].sort((a, b) => parseInr(a.price) - parseInr(b.price));
    }
    if (sortBy === "priceDesc") {
      return [...filtered].sort((a, b) => parseInr(b.price) - parseInr(a.price));
    }
    if (sortBy === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <PageShell
      eyebrow="Sale"
      title="Sale Catalog"
      subtitle="Shop the current anti-tarnish sale edit from one single list."
    >
      <section className="mb-10 rounded-xl border border-white/10 bg-white/[0.015] p-4 md:mb-12 md:p-5">
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-md border px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                selectedCategory === cat
                  ? "border-white/60 bg-white/10 text-white"
                  : "border-white/20 text-white/75 hover:border-white/45 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">
            {visibleItems.length} items
          </p>
          <label className="flex w-full items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70 sm:w-auto">
            <span className="shrink-0">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="w-full border border-white/25 bg-transparent px-3 py-2 text-xs tracking-[0.08em] text-white outline-none sm:w-auto sm:min-w-[210px]"
            >
              <option value="featured" className="bg-[#0a0a0a]">
                Featured
              </option>
              <option value="priceAsc" className="bg-[#0a0a0a]">
                Price: Low to High
              </option>
              <option value="priceDesc" className="bg-[#0a0a0a]">
                Price: High to Low
              </option>
              <option value="name" className="bg-[#0a0a0a]">
                Name
              </option>
            </select>
          </label>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
