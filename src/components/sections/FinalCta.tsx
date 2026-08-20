"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { publicImage } from "../../constants/images";

const CTA_IMAGE = publicImage(
  "Grace on your wrist, where pearls meet gold in quiet harmony_   #PearlBracelet #GoldAndPearls #EverydayLuxury #MinimalElegance #ModernHeirloom #RefinedStyle #PearlLover #LuxuryJewelry.jpg",
);

export default function FinalCta() {
  return (
    <section className="theme-media-overlay relative border-t border-white/5 py-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          aria-hidden
          className="object-cover object-[center_60%]"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Find your piece.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Anti-tarnish jewelry for everyday shine.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Shop collections.
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
