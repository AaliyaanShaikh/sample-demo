"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import SearchOverlay from "@/components/SearchOverlay";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="min-w-0 truncate font-serif text-xl tracking-[0.08em] sm:text-2xl"
        >
          Maison Lumen
        </Link>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <LayoutGroup>
            <nav className="hidden gap-6 text-[11px] uppercase tracking-[0.22em] lg:flex">
              {links.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative pb-1 ${
                      active ? "text-ink" : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-ink"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-ink transition-opacity hover:opacity-60"
            aria-label="Search products"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-ink/10 lg:hidden"
          >
            <div className="flex flex-col gap-5 px-4 py-6 text-[12px] uppercase tracking-[0.22em] sm:px-6">
              {links.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? "text-ink" : "text-ink/50"}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
