import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elastik",
  description: "Elastik app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
