import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import SiteLayout from "@/components/layout/SiteLayout";
import { BRAND_NAME } from "@/constants/brand";
import "./globals.css";

const THEME_INIT = `(function(){try{var t=localStorage.getItem("sample-atelier-theme");var light=t==="light";document.documentElement.classList.toggle("light",light);document.documentElement.classList.toggle("dark",!light);document.documentElement.style.colorScheme=light?"light":"dark";}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}})();`;

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Sample Jewelry Demo`,
  description:
    "A sample jewelry storefront demo with anti-tarnish fine jewelry collections, product pages, and checkout flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link
          rel="preconnect"
          href="https://images.pexels.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <ThemeProvider>
          <CookieConsentProvider>
            <WishlistProvider>
              <CartProvider>
                <SiteLayout>{children}</SiteLayout>
              </CartProvider>
            </WishlistProvider>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
