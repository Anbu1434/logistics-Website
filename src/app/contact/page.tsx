import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactClient } from "./contact-client";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Contact Our Care Concierge | ${brandConfig.name}`,
  description: `Get personalized botanical advice, order support, or routine guidance from our certified educators.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}

