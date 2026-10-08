import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AIRLIT — Environmental Liquid Scrubbing & CADI Platform",
  description: "A dual-phase environmental kit designed to trap invisible industrial gases (SO2, NO2, NH3), map acid deposition hazards, and audit home air purifiers.",
  keywords: ["AIRLIT", "CADI", "Environmental Dashboard", "Liquid Wet Scrubbing", "Atmospheric Acidification Potential", "Citizen Science", "AQI Gas Monitor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F8F8] text-[#102A43] font-sans">
        {children}
      </body>
    </html>
  );
}
