import * as React from "react";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  dark = false,
  className,
  ...props
}: SectionHeadingProps) {
  // Split title if a highlight substring is provided
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
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Reveal y={8} duration={300}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal as="h2" delay={60} y={16} className={cn(
        "font-display font-bold text-[clamp(30px,4vw,48px)] leading-[1.15] tracking-[-0.015em] [text-wrap:balance]",
        dark ? "text-white" : "text-ink"
      )}>
        {renderTitle()}
      </Reveal>

      {description && (
        <Reveal
          as="p"
          delay={120}
          y={12}
          className={cn(
            "text-[16px] md:text-[18px] leading-[1.65] max-w-[640px]",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
