import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact — Maison Lumen",
};

export default function ContactPage() {
  return (
    <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
        Studio
      </p>
      <h1 className="mb-8 text-4xl md:text-5xl">Write to the house.</h1>
      <p className="mb-10 max-w-lg text-ink/70">
        This is a demo inbox. Use the placeholders below — nothing is sent.
      </p>
      <div className="space-y-4 text-sm">
        <p>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-ink/45">
            Email
          </span>
          hello@example.com
        </p>
        <p>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-ink/45">
            Phone
          </span>
          +1 (555) 010-0000
        </p>
      </div>
    </Reveal>
  );
}
