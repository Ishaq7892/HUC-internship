import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import ToastProvider from "@/components/ToastProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClubSync - Student Tech Club Platform",
  description: "Manage and register for club events",
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
        <NextAuthProvider>
          <ToastProvider />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
