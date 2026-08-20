"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function TestClose() {
  return (
    <section className="border-t border-white/10 bg-background py-28 text-center md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6"
      >
        <p className="mb-6 text-[11px] uppercase tracking-[0.38em] text-white/50">
          This is a sandbox
        </p>
        <h2 className="mx-auto max-w-2xl font-serif text-4xl text-white md:text-6xl">
          Keep what you like.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/collections"
            className="text-sm uppercase tracking-[0.24em] text-white underline underline-offset-8"
          >
            Shop collections
          </Link>
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
          >
            Back to original home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
