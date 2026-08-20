"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import { PEXELS, pexelsPhoto } from "../constants/images";

const values = [
  {
    title: "Craft first",
    text: "Every piece is finished by hand and inspected before it leaves the studio—no shortcuts.",
  },
  {
    title: "Anti-tarnish by design",
    text: "We use finishes and alloys selected to resist tarnish and dulling, so your jewelry keeps its lustre longer with normal wear.",
  },
  {
    title: "Made for real life",
    text: "Anti-tarnish jewelry should feel as good on Tuesday as it does on a night out—comfort, durability, and lasting shine.",
  },
];

export default function About() {
  return (
    <PageShell
      title="Our story"
      subtitle="This sample atelier began with a simple idea: anti-tarnish fine jewelry should feel personal, honest, and built to last—with finishes that stay bright through real life. Each collection is shaped with that promise in mind."
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] overflow-hidden bg-[#111] max-h-[560px]"
        >
          <Image
            src={pexelsPhoto(PEXELS.brandStory, 1200)}
            alt="Anti-tarnish jewelry craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>
        <div className="space-y-8 text-white/90 font-light leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What started as custom pieces for friends and family grew into a
            full anti-tarnish line of rings, necklaces, earrings, and
            bracelets—each one reflecting a balance of classic silhouette,
            contemporary detail, and lasting shine.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Today, this studio works with trusted bench jewelers and
            suppliers to bring those designs to life. Whether you are choosing a
            a statement ring, layering necklaces, or commissioning something one of a
            kind, we are here to guide you with patience and clarity.
          </motion.p>
        </div>
      </div>

      <section className="mb-24 border-y border-white/10 py-16 md:py-20">
        <h2 className="text-xs tracking-[0.35em] uppercase text-white/70 mb-12 text-center">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <h3 className="font-serif text-xl text-white mb-4">{v.title}</h3>
              <p className="text-white/80 font-light leading-relaxed text-sm">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-xs tracking-[0.35em] uppercase text-white/70 mb-4">
            Visit & appointments
          </h2>
          <p className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
            See the collection in person
          </p>
          <p className="text-white/85 font-light leading-relaxed mb-8">
            Private viewings and sizing appointments are available by request.
            Reach out with your preferred dates and we will confirm a time that
            works for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-sm tracking-[0.2em] uppercase text-white hover:border-white hover:bg-white/5 transition-colors"
          >
            Book via contact
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden bg-[#111]"
        >
          <Image
            src={pexelsPhoto(PEXELS.necklace, 1200)}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </section>
    </PageShell>
  );
}
