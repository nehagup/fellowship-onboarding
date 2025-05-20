import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // ✅ Import Script
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keploy API Fellowship Onboarding",
  description:
    "Keploy API Fellowship is a free 2-week program to learn open source, Git, GitHub, CI/CD, GSoC prep, and automation. Download your official Fellowship ID card here in 2D and 3D formats.",
  keywords: [
    "Keploy",
    "Keploy Fellowship",
    "API Fellowship",
    "Keploy ID Card",
    "Open Source Fellowship",
    "GitHub CI/CD",
    "GSoC Preparation",
    "Open Source Contribution",
    "Keploy Internship",
    "Keploy Badge Download",
    "Keploy id card download"
  ],
  metadataBase: new URL("https://keploy.io"),
  openGraph: {
    title: "Keploy API Fellowship ID Card | 2D & 3D Download",
    description:
      "Join the Keploy API Fellowship — a free program to learn Git, GitHub, automation, CI/CD, and open source. Download your 2D and 3D ID cards now.",
    url: "https://badge.keploy.io",
    siteName: "Keploy API Fellowship",
    images: [
      {
        url: "https://keploy.io/images/api-fellowship-banner.png",
        width: 1200,
        height: 630,
        alt: "Keploy API Fellowship ID Card Preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Your Keploy API Fellowship Badge",
    description:
      "Claim your 2D and 3D ID card for the Keploy API Fellowship. Learn Git, GitHub, CI/CD, and open source to unlock internship opportunities.",
    images: ["https://keploy.io/images/api-fellowship-banner.png"],
    site: "@keployio"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TLL6DW2H6N"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TLL6DW2H6N');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "iu0391ggta");
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
