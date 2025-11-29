import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Send Files",
  description:
    "A simple file sharing app for sending temporary files securely.",
  authors: {
    name: "Gabriel Logan",
    url: "https://github.com/gabriel-logan",
  },
  keywords: [
    "file sharing",
    "temporary files",
    "send files",
    "file upload",
    "file download",
    "secure file sharing",
  ],
  classification: "File Sharing Application",
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
