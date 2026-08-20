import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPiece, PIECES, categoryPath } from "@/lib/catalog";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return PIECES.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  return {
    title: piece ? `${piece.name} — Maison Lumen` : "Piece — Maison Lumen",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-12">
      <Reveal>
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </Reveal>
      <Reveal delay={0.12} className="flex flex-col justify-center">
        <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
          <Link href={categoryPath(piece.category)} className="hover:text-ink">
            {piece.category}
          </Link>
        </p>
        <h1 className="mb-6 text-4xl md:text-5xl">{piece.name}</h1>
        <p className="mb-10 max-w-md text-ink/70">
          Anti-tarnish gold-tone jewelry from the Maison Lumen sample line.
          This is a demo piece and is not for sale.
        </p>
        <Link
          href="/collections"
          className="text-sm uppercase tracking-[0.22em] underline underline-offset-8"
        >
          Back to collections
        </Link>
      </Reveal>
    </div>
  );
}
