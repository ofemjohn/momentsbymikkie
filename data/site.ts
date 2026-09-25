// Centralized business/contact configuration.
// TODO: Replace every empty value below with Mikkie's verified details.
// Nothing here is invented — empty values are hidden by the components that read them.
export const siteConfig = {
  brand: "momentsbymikkie",
  descriptor: "PHOTO & FILM",
  tagline: "Real moments. Beautifully remembered.",
  url: "https://www.momentsbymikkie.com", // TODO: confirm production domain

  // TODO: Replace with Mikkie's verified contact details.
  email: "",
  phone: "",
  whatsapp: "", // full international number, digits only, e.g. "254712345678"

  // TODO: Replace with Mikkie's verified social profile URLs.
  instagram: "",
  youtube: "",
  tiktok: "",
  facebook: "",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Work", href: "#featured-work" },
  { label: "Films", href: "#films" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function whatsappHref(number: string, message?: string) {
  const digits = number.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
