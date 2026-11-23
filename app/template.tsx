import type { ReactNode } from "react";

/**
 * Client-side navigation fade. The template remounts on every route change,
 * so a single CSS animation is enough. Header and footer live in the layout
 * and are unaffected.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
