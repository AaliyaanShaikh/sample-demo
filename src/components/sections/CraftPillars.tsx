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
    <section className="border-t border-white/5 bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/50">
            How we make
          </p>
          <h2 className="font-serif text-3xl text-white md:text-5xl">
            What lasts on the body.
          </h2>
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
              <span className="mb-5 block text-xs tracking-[0.28em] text-white/40">
                {pillar.n}
              </span>
              <h3 className="mb-4 font-serif text-2xl text-white">
                {pillar.title}
              </h3>
              <p className="font-light leading-relaxed text-white/75">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
