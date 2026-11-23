export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const siteConfig = {
  name: "Your Brand",
  legalName: "Your Brand Logistics LLC",
  tagline: "Where Logistics Meets Precision.",
  footerBlurb: "End-to-end freight forwarding, customs clearance and live tracking worldwide.",
  description:
    "Fast, secure, end-to-end freight across cities, countries, and continents. Combining live tracking, dedicated support, and global route expertise.",
  url: "https://yourbrandlogistics.com",
  contact: {
    phone: "+1 (800) 555-0199",
    phoneDisplay: "+1 (800) 555-0199",
    email: "quotes@yourbrandlogistics.com",
    supportEmail: "support@yourbrandlogistics.com",
    address: {
      street: "100 Ocean Gateway Blvd, Suite 400",
      city: "Long Beach",
      state: "CA",
      zip: "90802",
      country: "United States",
    },
    hours: "Mon to Fri: 06:00 to 20:00 PST, Sat: 08:00 to 16:00 PST",
    hoursLine1: "Mon to Fri: 06:00 to 20:00 PST",
    hoursLine2: "Sat: 08:00 to 16:00 PST",
    whatsappNumber: "+18005550199",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: [
        {
          label: "Ocean Freight",
          href: "/services/ocean-freight",
          description: "Cost-effective container and bulk cargo shipping across global ports.",
        },
        {
          label: "Air Freight",
          href: "/services/air-freight",
          description: "Priority handling and tight schedules for urgent shipments.",
        },
        {
          label: "Road Freight",
          href: "/services/road-freight",
          description: "Flexible FTL and LTL transport with real-time GPS monitoring.",
        },
        {
          label: "Warehousing",
          href: "/services/warehousing",
          description: "Secure storage, inventory control, and fast fulfillment.",
        },
      ],
    },
    { label: "Track", href: "/track" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  servicesMarquee: [
    "AIR FREIGHT",
    "OCEAN FREIGHT",
    "LAND TRANSPORT",
    "WAREHOUSING",
    "GLOBAL LOGISTICS",
    "CUSTOMS CLEARANCE",
    "COLD CHAIN",
  ],
  trustProof: "15k businesses shipped with us",
};

export type SiteConfig = typeof siteConfig;

