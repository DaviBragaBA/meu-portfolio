import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Davi Braga | Business Analyst · Core Limit Policies · Limites de cartão, métricas e experimentos (BR/MX/COL)",
    template: "%s | Davi Braga",
  },
  description:
    "Business Analyst em políticas de limite de cartão. Métricas de cartão, experimentos, monitoria, Databricks, dashboards.",
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
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <Nav />
        <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
