import type { Metadata } from "next";
import HomeTest from "@/views/HomeTest";

export const metadata: Metadata = {
  title: "Lookbook test — Sample Atelier",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return <HomeTest />;
}
