import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

import { Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diploma Project",
  description:
    "Music instrument website implemented by Matsvei Balakhonau 58216 as a Diploma Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}
