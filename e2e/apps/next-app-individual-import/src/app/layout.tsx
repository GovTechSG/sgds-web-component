import type { Metadata } from "next";
import localFont from "next/font/local";
import { setCSPNonce } from "@govtechsg/sgds-web-component/react/ssr";
import "./globals.css";
import "@govtechsg/sgds-web-component/themes/day.css";
import { headers } from "next/headers";

const inter = localFont({ src: "./fonts/Inter.woff2" });

export const metadata: Metadata = {
  title: "Next App - Individual Imports",
  description: "E2E test app using individual subpath imports"
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
