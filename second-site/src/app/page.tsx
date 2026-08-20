"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORIES, PIECES, photo } from "@/lib/catalog";
import CraftPillars from "@/components/CraftPillars";
import Testimonials from "@/components/Testimonials";
import VisitAtelier from "@/components/VisitAtelier";
import ShopByCategory from "@/components/ShopByCategory";
import ExploreTiles from "@/components/ExploreTiles";
import { Reveal, Stagger, StaggerItem, easeOut } from "@/components/Reveal";

const HERO = photo(10475793, 1920);

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0.65 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeOut }}
        >
          <Image
            src={HERO}
            alt="Gold ring in studio light"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-16 text-paper sm:px-6 sm:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mb-4 text-[11px] uppercase tracking-[0.32em] text-paper/80"
          >
            A second house
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            className="max-w-3xl text-4xl leading-[0.95] sm:text-5xl md:text-7xl"
          >
            Light on gold.
            <em className="mt-2 block font-normal italic">Quiet on the body.</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: easeOut }}
          >
            <Link
              href="/collections"
              className="mt-8 inline-flex w-fit border border-paper px-6 py-3 text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-paper hover:text-ink sm:mt-10 sm:px-8"
            >
              Enter the line
            </Link>
          </motion.div>
        </div>
      </section>

      <ShopByCategory />
      <ExploreTiles />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
            Shop
          </p>
          <h2 className="mb-8 text-3xl md:text-4xl">Four collections</h2>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((item) => (
            <StaggerItem key={item.slug}>
              <Link href={`/collections/${item.slug}`} className="group block">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-lg sm:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm text-ink/60 max-sm:hidden">{item.copy}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="mb-8 text-3xl md:mb-12 md:text-4xl">Selected pieces</h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
            {PIECES.map((piece) => (
              <StaggerItem key={piece.slug}>
                <Link href={`/product/${piece.slug}`} className="group">
                  <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-paper">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
                    {piece.category}
                  </p>
                  <h3 className="mt-1 text-base sm:text-xl">{piece.name}</h3>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-14 flex justify-center">
            <Link
              href="/collections"
              className="inline-flex border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-ink hover:text-paper sm:px-10"
            >
              View collection
            </Link>
          </Reveal>
        </div>
      </section>

      <CraftPillars />
      <Testimonials />
      <VisitAtelier />
    </>
  );
}
