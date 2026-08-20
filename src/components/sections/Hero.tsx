"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PEXELS, pexelsPhoto } from "../../constants/images";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 7000;

const HERO_SLIDES = [
  {
    src: pexelsPhoto(PEXELS.ring, 1920),
    alt: "Gold ring close-up",
  },
  {
    src: pexelsPhoto(PEXELS.lifestyleRingHand, 1920),
    alt: "Ring worn on the hand",
  },
  {
    src: pexelsPhoto(PEXELS.bracelet, 1920),
    alt: "Bracelet detail in close-up",
  },
] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex h-[92svh] w-full items-center justify-center overflow-hidden bg-background theme-media-overlay sm:h-screen">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync" initial={false}>
          {HERO_SLIDES.map((slide, i) =>
            i === index ? (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
        <div className="absolute inset-0 z-10 bg-black/45" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto mt-14 max-w-4xl px-4 text-center sm:mt-20 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-5 block text-[11px] uppercase tracking-[0.38em] text-white/80 sm:mb-7 sm:text-xs"
        >
          Sample collection
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease }}
          className="mx-auto mb-6 max-w-4xl text-balance font-sans text-4xl font-light tracking-[-0.04em] leading-[1.05] text-white sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Jewelry Redefined.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="mx-auto max-w-lg text-base font-light leading-relaxed text-white/85 sm:text-lg"
        >
          Anti-tarnish fine jewellery and everyday pieces, finished to keep their
          lustre wear after wear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-10 flex items-center justify-center"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Shop collections
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
