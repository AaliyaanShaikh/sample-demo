"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { getProductPageData } from "../data/products";
import { getSaleProductPageData } from "../data/sale";
import { BRAND_NAME } from "../constants/brand";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const saleProductData = useMemo(() => getSaleProductPageData(id), [id]);
  const productData = useMemo(
    () => saleProductData ?? getProductPageData(id),
    [saleProductData, id],
  );
  const isSaleItem = Boolean(saleProductData);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<"idle" | "copied">("idle");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const lastZoomTapRef = useRef(0);
  const { addItem } = useCart();
  const { toggleItem, hasItem } = useWishlist();
  const inWishlist = hasItem(productData.id);

  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  useEffect(() => {
    if (!zoomOpen) {
      setZoomScale(1);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomOpen]);

  const handleAddToCart = () => {
    addItem({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.images[0],
    });
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareUrl = window.location.href;
    const shareTitle = `${productData.name} | ${BRAND_NAME}`;
    const shareText = `${productData.collection} • ${productData.category} • ${productData.price}\n${productData.summary}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${shareTitle}\n${shareText}\n${shareUrl}`,
        );
        setShareFeedback("copied");
        window.setTimeout(() => setShareFeedback("idle"), 1800);
        return;
      }

      window.open(
        `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
          `${shareText}\n\n${shareUrl}`,
        )}`,
      );
    } catch {
      // Ignore cancelled share dialogs and clipboard errors.
    }
  };

  const toggleZoomTap = () => {
    setZoomScale((s) => (s > 1 ? 1 : 2.25));
  };

  const handleZoomImageTouchEnd = () => {
    const now = Date.now();
    if (now - lastZoomTapRef.current < 300) {
      toggleZoomTap();
    }
    lastZoomTapRef.current = now;
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 mb-12">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/collections"
            className="hover:text-white transition-colors"
          >
            Collections
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/collections/${productData.category.toLowerCase()}`}
            className="text-white hover:text-white/80 transition-colors"
          >
            {productData.category}
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-[#111] overflow-hidden relative group cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productData.images[activeImage]}
                    alt={productData.name}
                    fill
                    className="object-cover cursor-zoom-in"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={activeImage === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
                Tap to zoom
              </div>
            </motion.div>

            {productData.images.length > 1 ? (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {productData.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 aspect-square flex-shrink-0 overflow-hidden border transition-colors duration-300 ${
                      activeImage === idx
                        ? "border-white"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    {activeImage !== idx && (
                      <div className="absolute inset-0 bg-black/40" />
                    )}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-white text-xs tracking-[0.2em] uppercase mb-4 block">
                {isSaleItem
                  ? `Sale · ${productData.category}`
                  : productData.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                {productData.name}
              </h1>
              <div className="mb-8 flex items-baseline gap-3">
                <p className="text-2xl text-white font-light">{productData.price}</p>
                {isSaleItem && saleProductData?.originalPrice ? (
                  <p className="text-base text-white/55 line-through">
                    {saleProductData.originalPrice}
                  </p>
                ) : null}
              </div>

              <div className="prose prose-invert prose-p:text-white prose-p:font-light prose-p:leading-relaxed mb-10">
                <p>{productData.description}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-row items-stretch gap-3 mb-12">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 min-w-0 bg-white text-black py-4 px-5 text-sm tracking-widest uppercase font-medium hover:bg-white/90 hover:text-black transition-colors duration-300 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="adding"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        Added to Bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        Add to Bag
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="invisible">Add to Bag</span>{" "}
                  {/* For sizing */}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toggleItem({
                      id: productData.id,
                      name: productData.name,
                      price: productData.price,
                      image: productData.images[0],
                      category: productData.category,
                    })
                  }
                  className="h-14 w-14 shrink-0 border border-white/20 flex items-center justify-center text-white hover:border-white/50 hover:opacity-80 transition-colors"
                  aria-label={
                    inWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={20}
                    strokeWidth={1.5}
                    className={inWishlist ? "fill-white" : "fill-transparent"}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className={`h-14 w-14 shrink-0 border flex items-center justify-center transition-colors ${
                    shareFeedback === "copied"
                      ? "border-white text-white bg-white/10"
                      : "border-white/20 text-white hover:border-white/50 hover:opacity-80"
                  }`}
                  aria-label={
                    shareFeedback === "copied"
                      ? "Product link copied"
                      : "Share product"
                  }
                  title={shareFeedback === "copied" ? "Link copied" : "Share"}
                >
                  <Share2 size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Details Accordion (Simplified for demo) */}
              <div className="border-t border-white/10 pt-8 mb-8">
                <h3 className="text-sm tracking-widest uppercase text-white mb-4">
                  Product Details
                </h3>
                <ul className="space-y-2 text-white font-light text-sm">
                  {productData.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 pt-8">
                <div className="flex min-w-0 flex-col items-center text-center gap-2 sm:gap-3">
                  <ShieldCheck
                    size={24}
                    className="text-white"
                    strokeWidth={1}
                  />
                  <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
                    Lifetime Warranty
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center text-center gap-2 sm:gap-3">
                  <Truck size={24} className="text-white" strokeWidth={1} />
                  <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
                    Complimentary Shipping
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center text-center gap-2 sm:gap-3">
                  <RotateCcw
                    size={24}
                    className="text-white"
                    strokeWidth={1}
                  />
                  <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
                    30-Day Returns
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomOpen ? (
          <>
            <motion.button
              key="zoom-backdrop"
              type="button"
              className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomOpen(false)}
              aria-label="Close image zoom"
            />
            <motion.div
              key="zoom-modal"
              className="fixed inset-0 z-[150] p-4 md:p-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute right-4 top-4 z-20 flex items-center gap-2 md:right-8 md:top-8">
                <button
                  type="button"
                  onClick={() => setZoomScale((s) => Math.max(1, s - 0.25))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:bg-black/60"
                  aria-label="Zoom out"
                >
                  <Minus size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((s) => Math.min(3, s + 0.25))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:bg-black/60"
                  aria-label="Zoom in"
                >
                  <Plus size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:bg-black/60"
                  aria-label="Close image zoom"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="h-full w-full overflow-auto rounded-sm border border-white/10 bg-black/60">
                <div className="flex min-h-full min-w-full items-start justify-center p-4 md:p-8">
                  <Image
                    src={productData.images[activeImage]}
                    alt={`${productData.name} zoomed view`}
                    width={1600}
                    height={1600}
                    className="h-auto object-contain transition-[width] duration-200"
                    style={{ width: `${zoomScale * 100}%`, maxWidth: "none" }}
                    priority
                    onDoubleClick={toggleZoomTap}
                    onTouchEnd={handleZoomImageTouchEnd}
                  />
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
