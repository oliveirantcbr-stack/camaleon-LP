import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camaleon IA — A plataforma de inteligência artificial criativa",
  description:
    "Crie textos, imagens, vídeos e automatize seu trabalho com Camaleon IA — a revolução da inteligência artificial em um só lugar.",
  keywords: ["inteligência artificial", "IA criativa", "geração de conteúdo", "automação", "Camaleon IA"],
  icons: {
    icon: "/camaleonai.svg",
    shortcut: "/camaleonai.svg",
    apple: "/camaleonai.svg",
  },
  openGraph: {
    title: "Camaleon IA",
    description: "A revolução da inteligência artificial criativa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        {children}
      </body>
    </html>
  );
}
