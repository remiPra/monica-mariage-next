import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata = {
  title: "Monica Mariage",
  description: "Boutique de robes de mariée",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Ajoute la balise manifest ici */}
        <link rel="manifest" href="/manifest.json" />
        {/* Assure-toi d'avoir la même couleur que dans le manifest */}
        <meta name="theme-color" content="#D2B48C" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
