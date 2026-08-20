import type { Metadata } from "next";
import PrivacyPolicy from "@/views/PrivacyPolicy";
import { BRAND_NAME } from "@/constants/brand";

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND_NAME}`,
  description:
    "How this sample storefront collects, uses, and protects your personal information.",
};

export default function Page() {
  return <PrivacyPolicy />;
}
