import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProgMan | Web & App Development",
  description: "Kami merancang pengalaman digital yang menghantui kompetisi. Pengembangan web premium dan layanan aplikasi elit.",
  keywords: ["pengembangan web", "pembuatan aplikasi", "agensi kreatif", "progman", "desain responsif", "dark mode"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://progman.agency",
    title: "ProgMan | Kerajinan Digital Elit",
    description: "Membangun pengalaman digital yang cepat, aman, dan memukau.",
    siteName: "ProgMan",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProgMan | Web & App Development",
    description: "Kami merancang pengalaman digital yang luar biasa.",
  },
};

import { Preloader } from "@/components/ui/Preloader";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ProgMan",
    "image": "https://progman.agency/logo.png",
    "url": "https://progman.agency",
    "telephone": "+62123456789",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    }
  };

  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LoadingProvider>
          <Preloader />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
