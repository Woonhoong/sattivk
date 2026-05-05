import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sattvik — Pure Indian Spices, Fruits & Vegetables | Global Wholesale",
  description:
    "Sattvik is India's premier wholesale supplier of certified pure spices, exotic fruits, and fresh vegetables. Sourced at origin. Engineered for global supply chains.",
  keywords: "Indian spices wholesale, bulk spices supplier, turmeric, cardamom, black pepper, India export, Sattvik",
  openGraph: {
    title: "Sattvik — Purity, Revealed.",
    description: "From origin to perfection. India's premium spice wholesale experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
