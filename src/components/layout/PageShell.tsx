"use client";

import type { ReactNode } from "react";
import { BRAND_NAME } from "../../constants/brand";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function PageShell({
  eyebrow = BRAND_NAME,
  title,
  subtitle,
  children,
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`min-h-screen bg-background pb-20 pt-20 sm:pb-24 sm:pt-24 md:pt-32 ${className}`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-10 max-w-3xl sm:mb-14 md:mb-20">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
            {eyebrow}
          </p>
          <h1 className="mb-4 font-serif text-3xl leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-base font-light leading-relaxed text-white/85 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </div>
  );
}
