"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistDrawer() {
  const { addItem } = useCart();
  const { wishlistOpen, closeWishlist, items, removeItem, itemCount } =
    useWishlist();

  useEffect(() => {
    if (!wishlistOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWishlist();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [wishlistOpen, closeWishlist]);

  const node = (
    <AnimatePresence mode="sync">
      {wishlistOpen ? (
        <>
          <motion.button
            key="wishlist-backdrop"
            type="button"
            aria-label="Close wishlist overlay"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
          />
          <motion.aside
            key="wishlist-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-title"
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2
                id="wishlist-title"
                className="font-serif text-xl tracking-wide text-white"
              >
                Wishlist{" "}
                <span className="text-white/50 text-sm font-sans">
                  ({itemCount})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeWishlist}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center px-2 min-h-[min(55vh,420px)]">
                  <Heart className="mb-6 text-white/45" size={28} strokeWidth={1.2} />
                  <p className="font-serif italic text-xl md:text-2xl text-white/50 mb-10">
                    Your wishlist is empty.
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeWishlist}
                    className="text-[11px] tracking-[0.35em] uppercase text-white/45 border-b border-white/35 pb-1 hover:text-white/80 hover:border-white/55 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-4 border-b border-white/5 pb-8 last:border-0"
                    >
                      <Link
                        href={`/product/${line.id}`}
                        onClick={closeWishlist}
                        className="relative block h-24 w-20 shrink-0 overflow-hidden bg-[#111]"
                      >
                        <Image
                          src={line.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product/${line.id}`}
                          onClick={closeWishlist}
                          className="font-serif text-white hover:opacity-90 line-clamp-2"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm text-white/80">{line.price}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-white/45">
                          {line.category}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                id: line.id,
                                name: line.name,
                                price: line.price,
                                image: line.image,
                              });
                              removeItem(line.id);
                              closeWishlist();
                            }}
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs uppercase tracking-wider"
                            aria-label="Move to bag"
                          >
                            Move to bag
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(line.id)}
                            className="inline-flex items-center gap-2 text-white/45 hover:text-white/80 text-xs uppercase tracking-wider"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 size={14} strokeWidth={1.25} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}
