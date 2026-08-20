import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Maison Lumen",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
        Legal
      </p>
      <h1 className="mb-4 text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mb-12 text-sm text-ink/55">Last updated: March 2026.</p>
      <div className="space-y-8 text-base font-light leading-relaxed text-ink/75">
        <section>
          <h2 className="mb-3 text-2xl text-ink">Introduction</h2>
          <p>
            This sample storefront (“we”, “us”, “our”) respects your privacy.
            This policy describes how we handle personal information when you
            visit our website or contact us.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl text-ink">Information we collect</h2>
          <p>
            We may collect contact details you send us, technical data such as
            browser type, and messages from the contact form. This is a demo
            site and is not a live store.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-2xl text-ink">How we use it</h2>
          <p>
            Information is used to respond to enquiries, improve the demo, and
            meet legal obligations. We do not sell personal data.
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
