import type { Metadata } from "next";
import { Noto_Sans_JP, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Suka2Jepang — Portal Lowongan & Penyaluran Kerja Jepang",
  description: "Portal penyaluran kerja Tokutei Ginou (SSW) dan Gijinkoku ke Jepang resmi LPK Timedoor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full", "antialiased", notoSansJP.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans bg-[#F9FAFB] text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
