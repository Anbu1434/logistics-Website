import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeClient } from "./home-client";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `${brandConfig.name} | Natural Skincare & Botanical Science`,
  description: brandConfig.description,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        <HomeClient />
      </main>
      <Footer />
    </div>
  );
}
