import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XV Años de Danna Abigail | Una Noche de Ensueño",
  description:
    "Con gran alegría te invitamos a celebrar los XV años de Danna Abigail, una noche llena de amor, ilusión y momentos inolvidables junto a familiares y amigos.",
  openGraph: {
    title: "XV Años de Danna Abigail",
    description:
      "Acompáñanos a celebrar los XV años de Danna Abigail en una noche llena de alegría, amor y momentos especiales.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

import { AudioPlayer } from "@/components/audio-player";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <head>
        {/* Preload critical images for instant render */}
        <link rel="preload" as="image" href="/FONDO.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/CASTILLO.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/QUINCEAÑERA.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/telon-izquierdo.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/telon-derecho.png" fetchPriority="high" />
        {/* Preload Google Fonts to avoid FOUT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <AudioPlayer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
