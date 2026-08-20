"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCookieConsent } from "../../context/CookieConsentContext";

export default function CookieConsent() {
  const { consent, accept, acceptAll } = useCookieConsent();
  const visible = consent === "pending";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="theme-keep-dark fixed inset-x-0 bottom-0 z-[120] p-4 sm:p-6"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-copy"
        >
          <div className="mx-auto max-w-4xl border border-white/10 bg-[#111] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-8">
            <p
              id="cookie-consent-title"
              className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/50"
            >
              Cookies
            </p>
            <p
              id="cookie-consent-copy"
              className="max-w-2xl text-sm font-light leading-relaxed text-white/80"
            >
              We use cookies to remember your preferences and to play campaign
              video. Accepting lets the immersive film start automatically.{" "}
              <Link
                href="/cookies"
                className="text-white underline underline-offset-4"
              >
                Cookie policy
              </Link>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={accept}
                className="border border-white/25 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-transform hover:scale-[1.02]"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
