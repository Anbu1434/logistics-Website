import * as React from "react";
import { Marquee } from "@/components/ui/marquee";

const servicesList = [
  "AIR FREIGHT",
  "OCEAN FREIGHT",
  "LAND TRANSPORT",
  "WAREHOUSING",
  "GLOBAL LOGISTICS",
];

export function ServicesMarquee() {
  return (
    <section className="w-full bg-navy-900 select-none" aria-label="Services Capabilities Marquee">
      <Marquee
        items={servicesList}
        variant="navy"
        speedSeconds={32}
      />
    </section>
  );
}

