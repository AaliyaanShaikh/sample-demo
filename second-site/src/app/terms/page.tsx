import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Maison Lumen",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
        Legal
      </p>
      <h1 className="mb-4 text-4xl md:text-5xl">Terms of Service</h1>
      <p className="mb-12 text-sm text-ink/55">Last updated: March 2026.</p>
      <div className="space-y-8 text-base font-light leading-relaxed text-ink/75">
        <section>
          <h2 className="mb-3 text-2xl text-ink">Agreement</h2>
          <p>
            By using this sample website, you agree to these terms. If you do
            not agree, please do not use the site.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl text-ink">Sample collection</h2>
          <p>
            Maison Lumen is a demonstration storefront. Pieces, prices, and
            availability are illustrative and not an offer to sell.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl text-ink">Contact</h2>
          <p>
            Questions can be sent via the{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
