"use client";

import { motion } from "motion/react";

const pillars = [
  {
    n: "01",
    title: "Craft first",
    text: "Every design is finished by hand and checked before it leaves the studio—no shortcuts on setting, polish, or clasp.",
  },
  {
    n: "02",
    title: "Anti-tarnish by design",
    text: "Alloys and coatings are chosen to resist dulling, so gold-tone pieces keep their lustre through everyday wear.",
  },
  {
    n: "03",
    title: "Made for real life",
    text: "Comfortable to layer, easy to live in, and built to look as considered on a Tuesday as on a night out.",
  },
];

export default function CraftPillars() {
  return (
    <section className="border-t border-ink/10 bg-paper py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-ink/45">
            How we make
          </p>
          <h2 className="text-3xl md:text-5xl">What lasts on the body.</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <span className="mb-5 block text-xs tracking-[0.28em] text-ink/40">
                {pillar.n}
              </span>
              <h3 className="mb-4 text-2xl">{pillar.title}</h3>
              <p className="font-light leading-relaxed text-ink/70">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
