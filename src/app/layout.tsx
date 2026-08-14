import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const outfit = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pop Culture | Culture Your Gut",
  description: "The smart soda that updates your internal operating system. Cyber-Organic prebiotic soda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased selection:bg-lemon selection:text-bio-blue">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
