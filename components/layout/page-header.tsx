import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-orange-500">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <div className="relative bg-navy-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-navy-700 overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#1F5F9E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-slate-400 mb-4 select-none">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label + idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-orange-500 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Eyebrow */}
        {eyebrow && (
          <div className="mb-2">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}

        {/* H1 Title */}
        <h1 className="font-display font-bold text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] text-white max-w-[850px] [text-wrap:balance]">
          {renderTitle()}
        </h1>

        {/* Subtitle / One sentence */}
        <p className="font-sans text-[16px] sm:text-[18px] text-slate-300 max-w-[640px] mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

