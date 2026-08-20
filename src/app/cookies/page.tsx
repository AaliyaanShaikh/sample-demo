import type { Metadata } from "next";
import CookiePolicy from "@/views/CookiePolicy";
import { BRAND_NAME } from "@/constants/brand";

export const metadata: Metadata = {
  title: `Cookie Policy — ${BRAND_NAME}`,
  description:
    "How this sample website uses cookies and similar technologies.",
};

export default function Page() {
  return <CookiePolicy />;
}
