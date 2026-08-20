"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

const BRAND_NAME = "Maison Lumen";
const CONTACT = {
  phone: "+1 (555) 010-0000",
  email: "hello@example.com",
  whatsapp: "https://wa.me/15550100000?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20this%20sample%20collection.",
};

const collectionLinks = [
  { label: "Fine Jewelry", to: "/collections" },
  { label: "Rings", to: "/collections/rings" },
  { label: "Necklaces", to: "/collections/necklaces" },
  { label: "Earrings", to: "/collections/earrings" },
  { label: "Bracelets", to: "/collections/bracelets" },
];

const aboutLinks = [
  { label: "Our Story", to: "/about" },
  { label: "Boutiques", to: "/contact" },
  { label: "Careers", to: "/contact" },
  { label: "Sustainability", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSent(true);
    setNewsletterEmail("");
  }

  return (
    <footer className="overflow-x-hidden border-t border-ink/10 bg-paper pb-24 pt-16 sm:pb-12 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:mb-16 lg:grid-cols-4 lg:gap-8">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Link href="/">
              <h2 className="mb-6 text-2xl tracking-[0.12em] transition-opacity hover:opacity-70">
                {BRAND_NAME}
              </h2>
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-ink/70">
              Anti-tarnish fine jewelry for life’s brightest moments—designed to
              keep its shine with finishes that resist dulling and everyday wear.
            </p>
            <div className="mb-8 space-y-2 text-sm text-ink/70">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block transition-colors hover:text-ink"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-ink"
              >
                WhatsApp: {CONTACT.phone}
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-ink/40 hover:opacity-70"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-ink/40 hover:opacity-70"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-ink/40 hover:opacity-70"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="min-w-0 max-w-md lg:col-start-4 lg:row-start-1 lg:max-w-none">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink sm:mb-6 sm:text-sm sm:tracking-widest">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-ink/70">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletter} className="group relative min-w-0 max-w-full">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full min-w-0 border-b border-ink/20 bg-transparent py-3 pr-11 text-sm text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/50 transition-colors group-focus-within:text-ink"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
            {newsletterSent ? (
              <p className="mt-3 text-xs text-ink/55">Thanks—you are on the list.</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:gap-x-8 lg:contents">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink sm:mb-6 sm:text-sm sm:tracking-widest">
                Collections
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {collectionLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to}
                      className="text-sm text-ink/70 transition-opacity hover:text-ink hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 lg:col-start-3 lg:row-start-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink sm:mb-6 sm:text-sm sm:tracking-widest">
                About
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {aboutLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to}
                      className="text-sm text-ink/70 transition-opacity hover:text-ink hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-balance text-center text-xs leading-relaxed text-ink/45 sm:text-left">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. Sample demo website. All rights reserved.
          </p>
          <nav
            className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink/45 sm:w-auto sm:justify-end sm:gap-x-6"
            aria-label="Legal"
          >
            <Link href="/privacy" className="shrink-0 whitespace-nowrap transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="shrink-0 whitespace-nowrap transition-colors hover:text-ink">
              Terms of Service
            </Link>
            <Link href="/cookies" className="shrink-0 whitespace-nowrap transition-colors hover:text-ink">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
