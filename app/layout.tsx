import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import MainLayout from "@/layouts/MainLayout";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const tanMonCheri = localFont({
  src: "../assets/fonts/moncherifonts/tan-mon-cheri.woff",
  variable: "--font-tan-mon-cheri",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SENSIBAR | sensibel & wunderbar",
  description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${tanMonCheri.variable}`}>
      <MainLayout>
        {children}
      </MainLayout>
      </body>
    </html>
  );
}
