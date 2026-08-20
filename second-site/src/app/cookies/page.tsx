import Link from "next/link";

export const metadata = {
  title: "Cookie Policy — Maison Lumen",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
        Legal
      </p>
      <h1 className="mb-4 text-4xl md:text-5xl">Cookie Policy</h1>
      <p className="mb-12 text-sm text-ink/55">Last updated: March 2026.</p>
      <div className="space-y-8 text-base font-light leading-relaxed text-ink/75">
        <section>
          <h2 className="mb-3 text-2xl text-ink">What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They can remember preferences and help the site understand
            how it is used.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl text-ink">How we use them</h2>
          <p>
            This demo may use essential cookies for basic function. It is not a
            live commerce site and does not run advertising cookies.
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
