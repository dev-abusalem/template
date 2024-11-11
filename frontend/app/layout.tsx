import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "@/app/css/styles.css";

import LayoutWrapper from "./LayoutWrapper";
import CustomCodeInjector from "./globals/Code/CodeInject";
const inter = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amio - Candles that speak, scents that last",
  description: "Candles that speak, scents that last",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-invms50 ${inter.className}`}>
        <LayoutWrapper>
          <Toaster />
          <CustomCodeInjector />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
