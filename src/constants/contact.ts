export const CONTACT = {
  phone: "+1 (555) 010-0000",
  phoneHref: "tel:+15550100000",
  whatsapp: "+15550100000",
  email: "hello@example.com",
} as const;

export function whatsappUrl(number: string, message: string): string {
  const normalized = number.replace(/[^\d+]/g, "");
  const withCountryCode = normalized.startsWith("+")
    ? normalized.slice(1)
    : normalized;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
}
