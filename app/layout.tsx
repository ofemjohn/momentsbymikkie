import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Petit_Formal_Script } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const signature = Petit_Formal_Script({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "momentsbymikkie | Photography & Videography",
    template: `%s | ${siteConfig.brand}`,
  },
  description:
    "Photography and videography for meaningful moments, stories and celebrations.",
  openGraph: {
    title: "momentsbymikkie | Photography & Videography",
    description:
      "Photography and videography for meaningful moments, stories and celebrations.",
    siteName: siteConfig.brand,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "momentsbymikkie | Photography & Videography",
    description:
      "Photography and videography for meaningful moments, stories and celebrations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${signature.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white text-ink">{children}</body>
    </html>
  );
}
