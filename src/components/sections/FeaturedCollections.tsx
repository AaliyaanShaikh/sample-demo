"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { PEXELS, pexelsPhoto } from "../../constants/images";
import { COLLECTION_CATEGORIES } from "../../data/products";
import { cn } from "../../lib/utils";

const getCategoryCover = (slug: string, fallback: string) =>
  COLLECTION_CATEGORIES.find((category) => category.slug === slug)?.image ??
  fallback;

const collections = [
  {
    id: 1,
    title: "Rings",
    image: getCategoryCover("rings", pexelsPhoto(PEXELS.ring, 800)),
    span: "col-span-2 row-span-2 col-start-1 row-start-1 min-h-0",
  },
  {
    id: 2,
    title: "Necklaces",
    image: getCategoryCover("necklaces", pexelsPhoto(PEXELS.necklace, 800)),
    span: "col-span-1 col-start-3 row-start-1 min-h-0",
    compactLabel: true,
  },
  {
    id: 3,
    title: "Earrings",
    image: getCategoryCover("earrings", pexelsPhoto(PEXELS.earrings, 800)),
    span: "col-span-1 col-start-4 row-start-1 min-h-0",
    compactLabel: true,
  },
  {
    id: 4,
    title: "Bracelets",
    image: getCategoryCover("bracelets", pexelsPhoto(PEXELS.bracelet, 800)),
    span: "col-span-2 col-start-3 row-start-2 min-h-0",
  },
] as const;

export default function FeaturedCollections() {
  return (
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-row flex-wrap justify-between items-end mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-[0.3em] text-white uppercase mb-4">
              Collections
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">
              Shop by Collection
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="border-b border-transparent pb-1 text-sm uppercase tracking-widest text-white transition-opacity hover:border-white hover:opacity-70"
            >
              View All Collections
            </Link>
          </motion.div>
        </div>

        <div className="grid min-h-0 w-full grid-cols-4 grid-rows-2 gap-3 sm:gap-4 md:gap-6 h-[min(68svh,620px)] sm:h-[min(76svh,720px)] md:h-[min(85vh,760px)] lg:h-[800px]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative h-full min-h-0 overflow-hidden bg-[#111] theme-media-overlay ${collection.span}`}
            >
              <Link
                href={`/collections/${collection.title.toLowerCase()}`}
                className="block w-full h-full"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 z-20 pointer-events-none transition-opacity duration-700">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
                </div>

                <div className="absolute inset-0">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    decoding="async"
                  />
                </div>

                <div
                  className={cn(
                    "absolute bottom-0 left-0 z-30 w-full bg-gradient-to-t from-black/80 to-transparent",
                    "compactLabel" in collection && collection.compactLabel
                      ? "px-2 py-3 sm:px-3 sm:py-4 md:px-5 md:py-5"
                      : "p-6 sm:p-7 md:p-8",
                  )}
                >
                  <h4
                    className={cn(
                      "font-serif text-white mb-1.5 sm:mb-2",
                      "compactLabel" in collection && collection.compactLabel
                        ? "text-[11px] leading-tight tracking-tight sm:text-xs md:text-sm lg:text-lg xl:text-2xl hyphens-none"
                        : "text-xl sm:text-2xl md:text-2xl leading-snug",
                    )}
                  >
                    {collection.title}
                  </h4>
                  <div className="h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-12" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
