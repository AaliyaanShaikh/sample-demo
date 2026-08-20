"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchOverlay from "../search/SearchOverlay";
import { BRAND_NAME } from "../../constants/brand";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Sale", path: "/sale" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/** lg breakpoint — must match Tailwind `lg` (1024px). */
const LG_MIN = 1024;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  /** At lg+, switch to mobile layout when centered title would collide with nav or actions. */
  const [compactNav, setCompactNav] = useState(false);
  /** Synced with (min-width: 1024px) — avoids SSR `window` in render. */
  const [isLg, setIsLg] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const { itemCount, toggleCart } = useCart();
  const { itemCount: wishlistCount, toggleWishlist } = useWishlist();

  const badge =
    itemCount > 99 ? "99+" : String(itemCount);
  const wishlistBadge = wishlistCount > 99 ? "99+" : String(wishlistCount);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const runNavLayout = useCallback(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(min-width: ${LG_MIN}px)`);
    const lg = mq.matches;
    setIsLg(lg);
    if (!lg) {
      setCompactNav(false);
      return;
    }
    const row = rowRef.current;
    const logo = logoRef.current;
    const actions = actionsRef.current;
    const navMeasure = navMeasureRef.current;
    if (!row || !logo || !actions || !navMeasure) return;

    const rowRect = row.getBoundingClientRect();
    const actionsLeft = actions.getBoundingClientRect().left;
    const logoWidth = logo.offsetWidth;
    const navWidth = navMeasure.offsetWidth;
    const padX = 24;
    const centerX = rowRect.left + rowRect.width / 2;
    const logoLeftIfCentered = centerX - logoWidth / 2;
    const logoRightIfCentered = centerX + logoWidth / 2;
    const navRight = rowRect.left + padX + navWidth;
    const gap = 16;
    const overlaps =
      logoLeftIfCentered < navRight + gap ||
      logoRightIfCentered > actionsLeft - gap;
    setCompactNav(overlaps);
  }, []);

  useLayoutEffect(() => {
    runNavLayout();
    const mq = window.matchMedia(`(min-width: ${LG_MIN}px)`);
    mq.addEventListener("change", runNavLayout);
    window.addEventListener("resize", runNavLayout);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(runNavLayout)
        : null;
    if (ro) {
      if (rowRef.current) ro.observe(rowRef.current);
      if (logoRef.current) ro.observe(logoRef.current);
      if (actionsRef.current) ro.observe(actionsRef.current);
      if (navMeasureRef.current) ro.observe(navMeasureRef.current);
    }
    return () => {
      mq.removeEventListener("change", runNavLayout);
      window.removeEventListener("resize", runNavLayout);
      ro?.disconnect();
    };
  }, [runNavLayout]);

  const mobileNavLayout = !isLg || compactNav;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        mobileMenuOpen
          ? "bg-background border-b border-white/10 py-4 transition-none"
          : isScrolled
            ? "glass py-4 transition-all duration-500"
            : "bg-transparent py-6 transition-all duration-500",
      )}
    >
      <div
        ref={rowRef}
        className="container mx-auto px-6 md:px-6 flex items-center justify-between"
      >
        {/* Width probe for inline nav — off-screen, matches link typography */}
        <div
          ref={navMeasureRef}
          className="pointer-events-none fixed left-0 top-0 -z-[100] flex w-max items-center gap-8 whitespace-nowrap opacity-0"
          aria-hidden
        >
          {navLinks.map((link) => (
            <span
              key={link.name}
              className="text-sm tracking-widest uppercase text-white"
            >
              {link.name}
            </span>
          ))}
        </div>

        {mobileNavLayout ? (
          <div className="flex min-w-0 flex-1 items-center gap-3 pr-2">
            <button
              type="button"
              className="shrink-0 text-white hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <Link
              ref={logoRef}
              href="/"
              className="min-w-0 text-left"
            >
              <h1 className="font-serif text-base sm:text-lg tracking-[0.12em] text-white leading-tight truncate">
                {BRAND_NAME}
              </h1>
            </Link>
          </div>
        ) : (
          <>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-sm tracking-widest uppercase text-white hover:opacity-70 transition-opacity duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link
              ref={logoRef}
              href="/"
              className="absolute left-1/2 max-w-[calc(100vw-10rem)] -translate-x-1/2 text-center"
            >
              <h1 className="font-serif text-base sm:text-lg tracking-[0.12em] text-white leading-tight lg:text-xl xl:text-2xl">
                {BRAND_NAME}
              </h1>
            </Link>
          </>
        )}

        {/* Icons */}
        <div ref={actionsRef} className="flex items-center gap-3 sm:gap-6">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-white hover:opacity-70 transition-opacity p-1"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={toggleWishlist}
            className="text-white hover:opacity-70 transition-opacity relative p-1"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-4 px-1 bg-white text-background text-[10px] font-medium flex items-center justify-center rounded-full">
                {wishlistBadge}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={toggleCart}
            className="text-white hover:opacity-70 transition-opacity relative p-1"
            aria-label={`Shopping bag, ${itemCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-4 px-1 bg-white text-background text-[10px] font-medium flex items-center justify-center rounded-full">
                {badge}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={false}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0f0f0f]"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="text-lg font-serif tracking-[0.12em] text-center px-4 text-white">
                {BRAND_NAME}
              </h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:opacity-70 transition-opacity"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif tracking-widest text-white hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
