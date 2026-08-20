"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { BRAND_NAME } from "../../constants/brand";
import { CONTACT, whatsappUrl } from "../../constants/contact";

const collectionLinks: { label: string; to: string }[] = [
  { label: "Fine Jewelry", to: "/collections" },
  { label: "Rings", to: "/collections/rings" },
  { label: "Necklaces", to: "/collections/necklaces" },
  { label: "Gifts", to: "/collections" },
  { label: "New Arrivals", to: "/collections" },
];

const aboutLinks: { label: string; to: string }[] = [
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
    <footer className="bg-[#0a0a0a] pt-16 pb-10 sm:pt-24 sm:pb-12 border-t border-white/5 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:mb-16 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Link href="/">
              <h2 className="text-2xl font-serif tracking-[0.12em] mb-6 text-white hover:opacity-90 transition-opacity">
                {BRAND_NAME}
              </h2>
            </Link>
            <p className="text-white text-sm leading-relaxed mb-8 max-w-sm">
              Anti-tarnish fine jewelry for life’s brightest moments—designed to
              keep its shine with finishes that resist dulling and everyday wear.
            </p>
            <div className="mb-8 space-y-2 text-sm text-white/85">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block hover:text-white transition-colors"
              >
                {CONTACT.email}
              </a>
              <a
                href={whatsappUrl(CONTACT.whatsapp, "Hello, I'd like to know more about this sample collection.")}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white transition-colors"
              >
                WhatsApp: {CONTACT.phone}
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:opacity-70 hover:border-white/30 transition-all duration-300"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:opacity-70 hover:border-white/30 transition-all duration-300"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:opacity-70 hover:border-white/30 transition-all duration-300"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Newsletter: directly under social on mobile; last column on lg */}
          <div className="min-w-0 max-w-md lg:col-start-4 lg:row-start-1 lg:max-w-none">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:mb-6 sm:text-sm sm:tracking-widest">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-white">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletter} className="relative group min-w-0 max-w-full">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full min-w-0 bg-transparent border-b border-white/20 py-3 pr-11 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
            {newsletterSent ? (
              <p className="mt-3 text-xs text-white/60">Thanks—you are on the list.</p>
            ) : null}
          </div>

          {/* Collections + About: side-by-side on mobile (after newsletter); cols 2–3 on lg */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:gap-x-8 lg:contents">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:mb-6 sm:text-sm sm:tracking-widest">
                Collections
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {collectionLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to}
                      className="text-sm text-white hover:opacity-70 transition-opacity"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 lg:col-start-3 lg:row-start-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:mb-6 sm:text-sm sm:tracking-widest">
                About
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {aboutLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to}
                      className="text-sm text-white hover:opacity-70 transition-opacity"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-center text-xs leading-relaxed text-white/50 sm:text-left text-balance">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. Sample demo website. All rights reserved.
          </p>
          <nav
            className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50 sm:w-auto sm:justify-end sm:gap-x-6"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="shrink-0 whitespace-nowrap hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="shrink-0 whitespace-nowrap hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="shrink-0 whitespace-nowrap hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
