"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { easeOut } from "@/components/Reveal";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
