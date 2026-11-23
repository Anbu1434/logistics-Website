import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingElements } from "@/components/layout/floating-elements";
import { QuoteModalProvider } from "@/context/quote-modal-context";
import { QuoteModal } from "@/components/modal/quote-modal";
import { TrackingModalProvider } from "@/context/tracking-modal-context";
import { TrackingModal } from "@/components/modal/tracking-modal";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Precision Freight & Global Logistics`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-slate-600 antialiased selection:bg-orange-500 selection:text-white flex flex-col justify-between pb-[88px] md:pb-0">
        <noscript>
          <style>{`[data-reveal-ready="true"]{opacity:1!important;translate:none!important}[data-image-ready="true"][data-visible="false"]{clip-path:none!important}[data-visible="false"]>*{scale:1!important}`}</style>
        </noscript>
        <QuoteModalProvider>
          <TrackingModalProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <FloatingElements />
            <QuoteModal />
            <TrackingModal />
          </TrackingModalProvider>
        </QuoteModalProvider>
      </body>
    </html>
  );
}
