import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ALLPE Engenharia | Engenharia Civil de Alto Padrão",
    template: "%s | ALLPE Engenharia",
  },
  description:
    "Com 5 anos de atuação, a ALLPE Engenharia oferece soluções completas e de alta gama em Engenharia Civil, topografia avançada (GNSS/RTK), legalização fundiária, laudos técnicos, construções e reformas.",
  keywords: [
    "ALLPE Engenharia",
    "Engenharia Civil",
    "Topografia Rio de Janeiro",
    "Legalização Fundiária",
    "Projetos Arquitetônicos",
    "Alvará de Construção",
    "Laudo de Estrutura",
    "Usucapião Extrajudicial",
    "Construção Civil",
    "Reformas Residenciais",
    "Allisson Teixeira",
  ],
  authors: [{ name: "ALLPE Engenharia", url: "https://allpeengenharia.com.br" }],
  creator: "ALLPE Engenharia",
  metadataBase: new URL("https://allpeengenharia.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ALLPE Engenharia | Engenharia Civil de Alto Padrão",
    description:
      "Cinco anos no mercado entregando projetos, laudos, topografia avançada, legalizações e construções civis de excelência.",
    url: "https://allpeengenharia.com.br",
    siteName: "ALLPE Engenharia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLPE Engenharia | Projetos e Obras de Engenharia Civil",
    description:
      "Soluções de engenharia de alta gama para atender necessidades de infraestrutura, topografia, legalizações e incorporações.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#1D1D1F] selection:text-[#FBFBFB]">
        {children}
      </body>
    </html>
  );
}
