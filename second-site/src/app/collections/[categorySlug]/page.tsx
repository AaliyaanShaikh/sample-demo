import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getPiecesByCategorySlug,
} from "@/lib/catalog";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  return {
    title: category
      ? `${category.title} — Maison Lumen`
      : "Collection — Maison Lumen",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) redirect("/collections");
  const pieces = getPiecesByCategorySlug(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <Reveal>
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/45">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="transition-colors hover:text-ink">
            Collections
          </Link>
          <span>/</span>
          <span className="text-ink">{category.title}</span>
        </nav>

        <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ink/45">
          Collection
        </p>
        <h1 className="mb-4 text-4xl md:text-5xl">{category.title}</h1>
        <p className="mb-8 max-w-xl text-ink/70">{category.copy}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mb-10 h-40 w-full overflow-hidden bg-mist sm:h-48">
          <Image
            src={category.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/25" />
        </div>
      </Reveal>

      {pieces.length === 0 ? (
        <p className="font-light text-ink/70">
          No pieces in this category yet.{" "}
          <Link href="/collections" className="underline underline-offset-4">
            Browse all collections
          </Link>
          .
        </p>
      ) : (
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
          {pieces.map((piece) => (
            <StaggerItem key={piece.slug}>
              <Link href={`/product/${piece.slug}`} className="group">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src={piece.image}
                    alt={piece.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
                  {piece.category}
                </p>
                <h2 className="mt-1 text-base sm:text-xl">{piece.name}</h2>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <div className="mt-16 border-t border-ink/10 pt-12 text-center">
        <Link
          href="/collections"
          className="inline-flex border-b border-ink/30 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-ink"
        >
          Back to all collections
        </Link>
      </div>
    </div>
  );
}
