"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { publicImage } from "../../constants/images";

const categories = [
  { label: "Rings", path: "/collections/rings" },
  { label: "Necklaces", path: "/collections/necklaces" },
  { label: "Earrings", path: "/collections/earrings" },
  { label: "Bracelets", path: "/collections/bracelets" },
];

export default function FullCollection() {
  return (
    <section className="theme-media-overlay relative flex min-h-[min(72vh,680px)] w-full items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={publicImage(" .jpg")}
          alt="Gold statement earring — editorial close-up for the full collection"
          fill
          className="object-cover object-[15%_center]"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent md:from-background/80 md:via-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-5 text-balance"
          >
            Explore the full <br /> collection.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
          >
            Anti-tarnish rings, necklaces, earrings, <br /> and bracelets in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex flex-col gap-5"
          >
            <Link
              href="/collections"
              className="inline-flex w-fit items-center border-b border-white pb-1 text-sm text-white transition-opacity hover:opacity-80"
            >
              Shop collections
            </Link>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
              {categories.map((cat, index) => (
                <span key={cat.path} className="inline-flex items-center gap-2">
                  <Link
                    href={cat.path}
                    className="border-b border-transparent hover:border-white/70 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                  {index < categories.length - 1 ? (
                    <span aria-hidden className="text-white/40">
                      •
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
