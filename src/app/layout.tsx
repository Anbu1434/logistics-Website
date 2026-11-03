import type { Metadata } from "next";
import "./globals.css";
import brandConfig from "@/config/brand";
import { StoreProvider } from "@/context/store-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

export const metadata: Metadata = {
  title: {
    default: `${brandConfig.name} | ${brandConfig.tagline}`,
    template: `%s | ${brandConfig.name}`,
  },
  description: brandConfig.description,
  keywords: [
    "natural skincare",
    "botanical skincare",
    "clean beauty",
    "vegan skincare",
    "dermatologist tested",
    "glow serum",
    "hydrating moisturizer",
  ],
  authors: [{ name: brandConfig.name }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://verdeaskincare.com"),
  openGraph: {
    title: `${brandConfig.name} - ${brandConfig.tagline}`,
    description: brandConfig.description,
    siteName: brandConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream-50 text-ink-900 font-sans antialiased selection:bg-sage-300 selection:text-forest-900">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
