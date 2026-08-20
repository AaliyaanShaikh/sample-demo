import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "About — Maison Lumen",
};

export default function AboutPage() {
  return (
    <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
        The house
      </p>
      <h1 className="mb-8 text-4xl md:text-5xl">A lighter atelier.</h1>
      <div className="space-y-6 text-base font-light leading-relaxed text-ink/75 sm:text-lg">
        <p>
          Maison Lumen is a second sample storefront — cream paper, open type,
          and jewelry photographed as objects in light.
        </p>
        <p>
          Sample Atelier stays as it is on port 3001. This site exists beside it,
          not instead of it.
        </p>
        <p>
          Pieces are anti-tarnish by design: meant to be worn on ordinary days
          without losing their finish.
        </p>
      </div>
    </Reveal>
  );
}
