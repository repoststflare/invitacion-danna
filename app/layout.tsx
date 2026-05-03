import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XV Años de Danna Abigail | Una Noche de Ensueño",
  description:
    "Con gran alegría te invitamos a celebrar los XV años de Danna Abigail, una noche llena de amor, ilusión y momentos inolables junto a familiares y amigos.",
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
      <body className={`${cormorant.variable} ${cinzel.variable} ${cinzelDecorative.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <AudioPlayer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
