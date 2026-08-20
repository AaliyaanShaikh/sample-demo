"use client";

import Image from "next/image";
import { motion } from "motion/react";

const HERO_IMAGE_SRC = `/${encodeURIComponent("Home.webp")}`;
const ease = [0.22, 1, 0.36, 1] as const;

export default function TestHero() {
  return (
    <section className="theme-media-overlay relative flex min-h-[100svh] items-end overflow-hidden bg-background pb-16 sm:pb-24">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease }}
        >
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mb-6 text-[11px] uppercase tracking-[0.42em] text-white/70"
        >
          Experimental lookbook
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="max-w-3xl font-serif text-5xl leading-[0.95] text-white sm:text-7xl md:text-8xl"
        >
          Quiet metal.
          <span className="mt-2 block italic text-white/80">Loud light.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 max-w-md text-sm font-light leading-relaxed text-white/75 sm:text-base"
        >
          A sandbox layout — not the live homepage. Scroll to move through
          collections as a single cinematic strip.
        </motion.p>
      </div>
    </section>
  );
}
