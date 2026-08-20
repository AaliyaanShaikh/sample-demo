import type { Metadata } from "next";
import TermsOfService from "@/views/TermsOfService";
import { BRAND_NAME } from "@/constants/brand";

export const metadata: Metadata = {
  title: `Terms of Service — ${BRAND_NAME}`,
  description:
    "Terms and conditions for using this sample website and browsing our products.",
};

export default function Page() {
  return <TermsOfService />;
}
