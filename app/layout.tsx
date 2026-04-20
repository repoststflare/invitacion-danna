import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XV Años de Danna Abigail | Una Noche de Ensueño",
  description:
    "Estás cordialmente invitado a celebrar los XV años de Danna Abigail en una noche mágica y cinematográfica.",
  openGraph: {
    title: "XV Años de Danna Abigail",
    description: "Una celebración elegante y cinematográfica",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
