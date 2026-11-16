import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesMarquee } from "@/components/sections/services-marquee";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrackingCTA } from "@/components/sections/tracking-cta";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">
      {/* Section 7.1: Hero */}
      <Hero />

      {/* Section 7.2: Trust bar */}
      <TrustBar />

      {/* Section 7.3: Services marquee */}
      <ServicesMarquee />

      {/* Section 7.4: About */}
      <About />

      {/* Section 7.5: Services */}
      <Services />

      {/* Section 7.6: Why choose us */}
      <WhyChooseUs />

      {/* Section 7.7: How it works */}
      <HowItWorks />

      {/* Section 7.8: Track your shipment */}
      <TrackingCTA />

      {/* Section 7.9: Testimonials */}
      <Testimonials />
    </main>
  );
}
