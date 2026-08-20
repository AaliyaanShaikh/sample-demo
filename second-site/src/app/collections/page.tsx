import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import CollectionsGrid from "@/components/CollectionsGrid";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export const metadata = {
  title: "Collections — Maison Lumen",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <Reveal>
        <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
          The line
        </p>
        <h1 className="mb-6 text-4xl md:text-5xl">Collections</h1>
        <p className="mb-10 max-w-xl text-ink/70">
          Filter by category or browse the full anti-tarnish line in one view.
        </p>
      </Reveal>

      <Stagger className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((item) => (
          <StaggerItem key={item.slug}>
            <Link href={`/collections/${item.slug}`} className="group">
              <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h2 className="text-base sm:text-xl">{item.title}</h2>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <h2 className="mb-8 text-3xl md:text-4xl">All pieces</h2>
      </Reveal>
      <CollectionsGrid />
    </div>
  );
}
