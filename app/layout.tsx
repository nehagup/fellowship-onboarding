import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// import { WavyBackground } from "@/components/ui/wavy-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keploy API Fellowship",
  description: "Keploy API Fellowship badge collection platform. Enter your registered details and get your id cards in both 2d and and 3d format!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>{children}</body>
    </html>
  );
}
