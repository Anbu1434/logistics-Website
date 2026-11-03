import type { Metadata } from "next";
import { StyleguideClient } from "./styleguide-client";

export const metadata: Metadata = {
  title: "Design System & Component Styleguide",
  description: "Internal design system, tokens, accessibility standards and component documentation for Verdéa.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleguidePage() {
  return <StyleguideClient />;
}
