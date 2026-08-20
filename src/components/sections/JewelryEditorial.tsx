"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PEXELS, pexelsPhoto, publicImage } from "../../constants/images";

/** Pexels source width — keep ≤1280 so the optimizer pulls smaller originals. */
const W = 1280;

const heroPanels = [
  {
    id: "rings",
    to: "/collections/rings",
    label: "On the hand",
    title: "Rings",
    src: pexelsPhoto(PEXELS.lifestyleRingHand, W),
    alt: "Close-up of a woman’s hand wearing an elegant ring",
    span: "col-span-7 row-span-2 col-start-1 row-start-1 min-h-0",
    parallax: true,
  },
  {
    id: "portrait",
    to: "/collections/necklaces",
    label: "In portrait",
    title: "Necklaces & layers",
    src: pexelsPhoto(PEXELS.lifestylePortrait, W),
    alt: "Woman wearing gold and pearl jewelry",
    span: "col-span-5 col-start-8 row-start-1 min-h-0",
    parallax: false,
  },
  {
    id: "statement",
    to: "/collections/earrings",
    label: "In focus",
    title: "Statement earrings",
    src: publicImage("ar508650-1080-d95KVaEqWjiZanNa.jpg.avif"),
    alt: "Statement jewelry — campaign still",
    span: "col-span-5 col-start-8 row-start-2 min-h-0",
    parallax: false,
  },
] as const;

/** Uploaded campaign shots from `public/` — scroll-sideways strip */
const strip = [
  {
    id: "s1",
    to: "/collections",
    src: publicImage(
      "eCommerce_photography_jewellery_ModelAngle_08-01-2026 (15).webp",
    ),
    alt: "Model angle campaign photography",
    caption: "Campaign",
  },
  {
    id: "s2",
    to: "/collections/necklaces",
    src: publicImage("CXrLn1v5d1XdQCQLAGZLXhnmkr0.jpg.webp"),
    alt: "Editorial jewelry portrait",
    caption: "Portrait",
  },
  {
    id: "s3",
    to: "/collections/rings",
    src: publicImage(
      "eCommerce_photography_modelAngle_jewellery_09-01-2026 (9).webp",
    ),
    alt: "Model wearing fine jewelry — studio angle",
    caption: "Studio",
  },
  {
    id: "s4",
    to: "/collections/earrings",
    src: publicImage(
      "eCommerce_photogrphotography_modelAngle_jewellery_20-01-2026 (12).webp",
    ),
    alt: "Model angle — jewelry styling",
    caption: "In motion",
  },
  {
    id: "s5",
    to: "/collections/bracelets",
    src: publicImage("ar508650-1080-d95KVaEqWjiZanNa.jpg.avif"),
    alt: "Jewelry campaign — editorial still",
    caption: "Collections",
  },
];

function ParallaxImage({
  src,
  alt,
  shift,
}: {
  src: string;
  alt: string;
  shift: { x: number; y: number };
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="relative h-[118%] w-[118%] max-w-none will-change-transform transition-transform duration-500 ease-out"
        style={{
          transform: `translate(calc(-9% + ${shift.x}px), calc(-9% + ${shift.y}px))`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          decoding="async"
        />
      </div>
    </div>
  );
}

function EditorialPanel({
  to,
  label,
  title,
  src,
  alt,
  span,
  parallax,
  prefersReducedMotion,
}: {
  to: string;
  label: string;
  title: string;
  src: string;
  alt: string;
  span: string;
  parallax: boolean;
  prefersReducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const useParallax = parallax && !prefersReducedMotion;

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!useParallax || !cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setShift({ x: px * 28, y: py * 28 });
    },
    [useParallax],
  );

  const onLeave = useCallback(() => {
    setShift({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden bg-[#0a0a0a] theme-media-overlay ${span}`}
    >
      {useParallax ? (
        <ParallaxImage src={src} alt={alt} shift={shift} />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            decoding="async"
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 md:p-6 lg:p-8">
        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white/70 mb-1 sm:mb-2">
          {label}
        </p>
        <div className="flex items-end justify-between gap-2 sm:gap-4">
          <h3 className="text-xs leading-tight sm:text-sm md:text-2xl md:leading-snug lg:text-3xl font-serif text-white break-words hyphens-auto min-w-0">
            {title}
          </h3>
          <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
            <ArrowRight size={18} strokeWidth={1.25} aria-hidden />
          </span>
        </div>
      </div>
      <Link
        href={to}
        className="absolute inset-0 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        aria-label={`${title} — view collection`}
      />
    </motion.div>
  );
}

export default function JewelryEditorial() {
  const prefersReducedMotion = useReducedMotion() === true;

  return (
    <section className="relative bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 pt-20 pb-10 md:pt-28 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/55">
            On skin &amp; in light
          </p>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg">
            Real moments, real metal: anti-tarnish finishes shot the way you’ll
            wear them. Explore the gallery, then find your piece in the
            collection.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-16">
        <div className="grid min-h-0 w-full grid-cols-12 grid-rows-2 gap-3 sm:gap-4 md:gap-5 h-[min(68svh,620px)] sm:h-[min(76svh,720px)] md:h-[min(85vh,880px)] lg:h-[min(92vh,980px)]">
          {heroPanels.map((panel) => (
            <div key={panel.id} className="contents min-h-0">
              <EditorialPanel
                to={panel.to}
                label={panel.label}
                title={panel.title}
                src={panel.src}
                alt={panel.alt}
                span={panel.span}
                parallax={panel.parallax}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pb-24 md:pb-32">
        <div className="container mx-auto px-6 md:px-12 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-white/50"
          >
            Scroll sideways — more looks
          </motion.p>
          <Link
            href="/collections"
            className="text-sm tracking-widest uppercase text-white/90 hover:opacity-70 transition-opacity border-b border-white/30 hover:border-white pb-0.5 self-start sm:self-auto"
          >
            Shop all collections
          </Link>
        </div>

        <div
          className="flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-6 md:px-12 pb-4 scroll-smooth touch-manipulation [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25"
          style={{ scrollbarGutter: "stable" }}
        >
          {strip.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="snap-start shrink-0 w-[min(78vw,420px)] md:w-[min(32vw,380px)]"
            >
              <Link
                href={item.to}
                className="group block relative aspect-[3/4] overflow-hidden bg-[#111] ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.07]"
                  sizes="(max-width: 768px) 78vw, 380px"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.35em] uppercase text-white/85">
                  {item.caption}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
