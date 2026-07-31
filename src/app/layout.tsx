import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";

/* Body/base font — Inter, bound to --font-sans */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Heading font — Outfit, bound to --font-display */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Pandey | AI & Full Stack Developer",
  description: "Rishi Pandey - Software Engineer, Full Stack Developer, and AI Enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        outfit.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/* The Spline runtime lazy-loads its wasm from unpkg; warm the connection early */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
