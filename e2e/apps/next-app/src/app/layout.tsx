import type { Metadata } from "next";
import { setCSPNonce } from "@govtechsg/sgds-web-component/react/ssr";
import { Inter } from "next/font/google";
import "./globals.css";
import "@govtechsg/sgds-web-component/themes/day.css";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGDS E2E Next.js App",
  description: "E2E test app for SGDS web components in Next.js"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce");
  if (nonce) setCSPNonce(nonce);
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
