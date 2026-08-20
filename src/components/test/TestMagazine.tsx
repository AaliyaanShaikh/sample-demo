"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { getNewArrivalProducts } from "../../data/products";

const pieces = getNewArrivalProducts().slice(0, 7);

export default function TestMagazine() {
  const [hero, second, third, ...rest] = pieces;
  if (!hero) return null;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/50">
              Selected pieces
            </p>
            <h2 className="font-serif text-3xl text-white md:text-5xl">
              No frames. Just the metal.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          <Piece
            href={`/product/${hero.id}`}
            src={hero.image}
            name={hero.name}
            className="md:col-span-7 md:row-span-2 min-h-[52vh]"
          />
          {second ? (
            <Piece
              href={`/product/${second.id}`}
              src={second.image}
              name={second.name}
              className="md:col-span-5 min-h-[32vh]"
            />
          ) : null}
          {third ? (
            <Piece
              href={`/product/${third.id}`}
              src={third.image}
              name={third.name}
              className="md:col-span-5 min-h-[32vh]"
            />
          ) : null}
        </div>

        {rest.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {rest.map((product) => (
              <Piece
                key={product.id}
                href={`/product/${product.id}`}
                src={product.image}
                name={product.name}
                className="min-h-[28vh] md:min-h-[36vh]"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Piece({
  href,
  src,
  name,
  className,
}: {
  href: string;
  src: string;
  name: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={href} className="theme-media-overlay group relative block h-full min-h-[280px] overflow-hidden">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <p className="absolute bottom-5 left-5 right-5 font-serif text-lg text-white opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {name}
        </p>
      </Link>
    </motion.div>
  );
}
