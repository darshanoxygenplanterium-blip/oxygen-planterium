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
  title: "Oxygen Planterium | Plants in Hubli",
  description:
    "Buy indoor & outdoor plants in Hubli. Oxygen Planterium offers premium plants, pots & gardening services with delivery.",
  keywords: [
    "plants in Hubli",
    "plant shop Hubli",
    "indoor plants Hubli",
    "outdoor plants Hubli",
    "nursery in Hubli",
    "buy plants Hubli",
    "best plant store Hubli",
  ],
  openGraph: {
    title: "Oxygen Planterium | Plants in Hubli",
    description:
      "Premium plant store in Hubli for indoor & outdoor plants, pots and gardening services.",
    url: "https://your-domain.com",
    siteName: "Oxygen Planterium",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
