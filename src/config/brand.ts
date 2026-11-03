/**
 * Central Brand Configuration
 * Brand: Verdéa (Quiet luxury meets botanical science)
 */

export interface BrandConfig {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  supportEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
    freeShippingThreshold: number; // in minor units or whole units
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    pinterest: string;
    youtube: string;
  };
  trustHighlights: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export const brandConfig: BrandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "Verdéa",
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Botanical Science. Radiant Skin.",
  description:
    process.env.NEXT_PUBLIC_BRAND_DESCRIPTION ||
    "Clean, dermatologically proven skincare formulated with potent botanical actives and biocompatible science for timeless skin health.",
  domain: process.env.NEXT_PUBLIC_DOMAIN || "verdeaskincare.com",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@verdeaskincare.com",
  phone: "+91 (0) 800 234 5678",
  address: {
    street: "14 Botanical Gardens Way, Suite 400",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    country: "India",
  },
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
    freeShippingThreshold: 999, // ₹999 free shipping
  },
  socialLinks: {
    instagram: "https://instagram.com/verdeaskincare",
    facebook: "https://facebook.com/verdeaskincare",
    pinterest: "https://pinterest.com/verdeaskincare",
    youtube: "https://youtube.com/@verdeaskincare",
  },
  trustHighlights: [
    {
      id: "natural",
      title: "100% Bio-Actives",
      description: "Ethically harvested cold-pressed botanical oils & marine ferments",
      icon: "Leaf",
    },
    {
      id: "tested",
      title: "Dermatologically Tested",
      description: "Clinically certified non-irritating for ultra-sensitive skin barriers",
      icon: "ShieldCheck",
    },
    {
      id: "cruelty-free",
      title: "Cruelty Free & Vegan",
      description: "Leaping Bunny certified; zero animal derivatives or testing ever",
      icon: "HeartHandshake",
    },
    {
      id: "eco",
      title: "Eco-Conscious Packaging",
      description: "Infinitely recyclable amber glass, soy inks & FSC-certified paper",
      icon: "Recycle",
    },
  ],
};

export default brandConfig;

