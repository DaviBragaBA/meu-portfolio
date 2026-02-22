import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { GlobalEffects } from "@/components/GlobalEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SplashGate } from "@/components/SplashGate";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** Altere para a URL pública do site (ex.: https://seudominio.com) para preview em redes. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://davibraga.dev";

export const metadata: Metadata = {
  title: {
    default: "Davi Braga | Business Analyst · Core Limit Policies · Limites de cartão, métricas e experimentos (BR/MX/COL)",
    template: "%s | Davi Braga",
  },
  description:
    "Business Analyst em políticas de limite de cartão. Métricas de cartão, experimentos, monitoria, Databricks, dashboards.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Davi Braga",
    title: "Davi Braga | Business Analyst · Core Limit Policies",
    description: "Business Analyst em políticas de limite de cartão. Métricas, experimentos, monitoria, Databricks, dashboards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davi Braga | Business Analyst · Core Limit Policies",
    description: "Business Analyst em políticas de limite de cartão. Métricas, experimentos, monitoria, Databricks, dashboards.",
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen font-sans`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light'||t==='terminal')document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <GlobalEffects />
        <SplashGate />
        <Nav />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {children}
          <SiteFooter />
        </main>
      </body>
    </html>
  );
}
