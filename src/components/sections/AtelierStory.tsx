"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PEXELS, pexelsPhoto } from "../../constants/images";

export default function AtelierStory() {
  return (
    <section className="border-t border-white/5 bg-background py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="theme-media-overlay relative aspect-[4/5] overflow-hidden bg-[#111] md:aspect-[3/4]"
        >
          <Image
            src={pexelsPhoto(PEXELS.brandStory, 1200)}
            alt="Gold jewelry close-up from the atelier"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-lg"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/50">
            The atelier
          </p>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-white md:text-5xl">
            Finished to stay bright.
          </h2>
          <p className="mb-5 font-light leading-relaxed text-white/80">
            Each piece is designed for real wear—anti-tarnish finishes, considered
            silhouettes, and details that still look composed after a full day.
          </p>
          <p className="mb-10 font-light leading-relaxed text-white/70">
            Rings, necklaces, earrings, and bracelets are inspected before they
            leave the bench, so what you unbox is what you’ll keep reaching for.
          </p>
          <Link
            href="/about"
            className="text-sm uppercase tracking-[0.22em] text-white underline underline-offset-8 transition-opacity hover:opacity-70"
          >
            Read our story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
