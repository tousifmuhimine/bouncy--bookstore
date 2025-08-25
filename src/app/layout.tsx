/*
================================================================================
 FILE: src/app/layout.tsx
 DESC: The main layout file for the entire application.
================================================================================
*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bouncy Bookstore",
  description: "Your one-stop shop for amazing books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 min-h-screen font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}