import { redirect } from "next/navigation";
import CollectionCategory from "@/views/CollectionCategory";
import { getCategoryBySlug } from "@/data/products";

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  if (!getCategoryBySlug(categorySlug)) {
    redirect("/collections");
  }
  return <CollectionCategory />;
}
