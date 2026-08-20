"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { photo } from "@/lib/catalog";

const VIEWING_IMAGE = photo(16689782, 1400);

export default function VisitAtelier() {
  return (
    <section className="relative min-h-[min(70vh,640px)] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={VIEWING_IMAGE}
          alt=""
          fill
          aria-hidden
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[min(70vh,640px)] max-w-6xl items-center px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-paper"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-paper/80">
            Private viewing
          </p>
          <h2 className="mb-5 text-3xl leading-tight sm:text-4xl md:text-5xl">
            See the collection in person.
          </h2>
          <p className="mb-10 max-w-md font-light leading-relaxed text-paper/80">
            Sizing and one-to-one appointments are available by request. Tell us
            when you’d like to visit and we’ll confirm a time.
          </p>
          <Link
            href="/contact"
            className="text-sm uppercase tracking-[0.22em] text-paper underline underline-offset-8 transition-opacity hover:opacity-70"
          >
            Book via contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
