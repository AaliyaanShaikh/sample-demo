"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PEXELS, pexelsPhoto } from "../../constants/images";

export default function VisitAtelier() {
  return (
    <section className="theme-media-overlay relative min-h-[min(70vh,640px)] overflow-hidden">
      <Image
        src={pexelsPhoto(PEXELS.lifestyleRingHand, 1400)}
        alt=""
        fill
        aria-hidden
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="container relative z-10 mx-auto flex min-h-[min(70vh,640px)] items-center px-6 py-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/65">
            Private viewing
          </p>
          <h2 className="mb-5 font-serif text-4xl leading-tight text-white md:text-5xl">
            See the collection in person.
          </h2>
          <p className="mb-10 max-w-md font-light leading-relaxed text-white/80">
            Sizing and one-to-one appointments are available by request. Tell us
            when you’d like to visit and we’ll confirm a time.
          </p>
          <Link
            href="/contact"
            className="text-sm uppercase tracking-[0.22em] text-white underline underline-offset-8 transition-opacity hover:opacity-70"
          >
            Book via contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
