import type { Metadata } from "next";
import { MemoryOnlyBanner } from "@/components/MemoryOnlyBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "vocab-1000",
  description:
    "Aprende vocabulario de las palabras más usadas en inglés y español, sin login y sin coste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <MemoryOnlyBanner />
        {children}
      </body>
    </html>
  );
}
