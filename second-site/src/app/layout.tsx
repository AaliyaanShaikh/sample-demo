import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AIChatAssistant from "@/components/AIChatAssistant";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Lumen — Jewelry Demo",
  description:
    "A second sample jewelry house: light, editorial, and separate from Sample Atelier.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${inter.className}`}>
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <AIChatAssistant />
      </body>
    </html>
  );
}
