import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atualização OLT Huawei | Serviços Especializados em Telecomunicações",
  description: "Serviços profissionais de atualização e manutenção de OLT Huawei. Especialistas em equipamentos de telecomunicações, GPON, XGS-PON e redes ópticas.",
  keywords: "OLT Huawei, atualização OLT, GPON, XGS-PON, redes ópticas, telecomunicações, firmware OLT, manutenção OLT",
  robots: "index, follow",
  openGraph: {
    title: "Atualização OLT Huawei | Serviços Especializados",
    description: "Serviços profissionais de atualização e manutenção de OLT Huawei. Soluções completas para provedores de internet e empresas de telecomunicações.",
    type: "website",
    locale: "pt_BR",
    siteName: "Atualização OLT Huawei"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Atualização OLT Huawei",
            "description": "Serviços especializados em atualização e manutenção de equipamentos OLT Huawei para empresas de telecomunicações",
            "areaServed": "Brasil",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços de OLT Huawei",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Atualização de OLT",
                    "description": "Serviço especializado de atualização de equipamentos OLT Huawei"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Manutenção de Equipamentos",
                    "description": "Serviços de manutenção para equipamentos de telecomunicações"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Configuração GPON",
                    "description": "Serviços de configuração e otimização de redes GPON"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Atualização de Firmware",
                    "description": "Serviço de atualização de firmware para equipamentos OLT"
                  }
                }
              ]
            },
            "knowsAbout": ["OLT Huawei", "GPON", "XGS-PON", "Redes Ópticas", "Telecomunicações"],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+5551981754701",
              "email": "ismaelstrey@gmail.com",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressRegion": "RS"
            },
            "priceRange": "$$$",
            "openingHours": ["Mo-Fr 08:00-18:00"]
          })}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        {children}
      </body>
    </html>
  );
}
