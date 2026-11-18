import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Guess The Number",
  description: "A number-guessing game built with Next.js, React, TypeScript and Tailwind CSS. Find the hidden number in 10 attempts.",
  openGraph: { title: "Guess The Number", description: "Find the hidden number in 10 attempts.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
