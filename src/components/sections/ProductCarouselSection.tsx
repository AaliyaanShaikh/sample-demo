"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import ProductCard from "../ProductCard";
import type { Product } from "../../data/products";

type ProductCarouselSectionProps = {
  title: string;
  description: ReactNode;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  celebrateSale?: boolean;
};

type ConfettiPiece = {
  id: number;
  color: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
  shape: "rect" | "square";
};

const CONFETTI_COLORS = [
  "#fb923c",
  "#fdba74",
  "#fcd34d",
  "#fde68a",
  "#f9fafb",
  "#c2410c",
  "#ea580c",
] as const;
const CONFETTI_COUNT = 55;

function createConfetti(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 400 - 50,
    rotate: (Math.random() - 0.5) * 720,
    delay: Math.random() * 0.15,
    duration: 1.2 + Math.random() * 0.6,
    shape: Math.random() > 0.5 ? "rect" : "square",
  }));
}

export default function ProductCarouselSection({
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = "View collection",
  celebrateSale = false,
}: ProductCarouselSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const confettiPieces = useMemo(createConfetti, []);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (isInView && celebrateSale) setHasAnimated(true);
  }, [isInView, celebrateSale]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-24 md:py-28"
    >
      <AnimatePresence>
        {celebrateSale && hasAnimated ? (
          <motion.div
            key="sale-confetti-burst"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {confettiPieces.map((piece) => (
              <motion.span
                key={piece.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  backgroundColor: piece.color,
                  width: piece.shape === "rect" ? 5 : 6,
                  height: piece.shape === "rect" ? 12 : 6,
                  borderRadius: piece.shape === "rect" ? 2 : 1,
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.2 }}
                animate={{
                  x: piece.x,
                  y: piece.y,
                  rotate: piece.rotate,
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1, 0.95],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">
              {title}
            </h2>
            <p className="max-w-xl font-light leading-relaxed text-white/80">
              {description}
            </p>
          </div>
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="self-start text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-70 md:self-auto"
            >
              {viewAllLabel}
            </Link>
          ) : null}
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_85%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ProductCard product={product} index={index} omitMotion />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
