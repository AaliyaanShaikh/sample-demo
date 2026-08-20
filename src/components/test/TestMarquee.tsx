"use client";

import { motion } from "motion/react";

const LINE = "Rings  ·  Necklaces  ·  Earrings  ·  Bracelets  ·  ";

export default function TestMarquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-background py-4">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <span className="px-4 font-serif text-2xl italic text-white/80 sm:text-4xl">
          {LINE}
          {LINE}
        </span>
        <span className="px-4 font-serif text-2xl italic text-white/80 sm:text-4xl">
          {LINE}
          {LINE}
        </span>
      </motion.div>
    </div>
  );
}
