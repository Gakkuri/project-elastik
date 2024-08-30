import type { Metadata } from "next";
import { CContainer } from "@coreui/react";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Elastik Dashboard",
  description: "List of students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
