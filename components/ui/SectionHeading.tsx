import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  headline: ReactNode;
  supporting?: ReactNode;
  theme?: "light" | "dark";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  /** Renders the headline as this heading level; defaults to h2. */
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  headline,
  supporting,
  theme = "light",
  align = "left",
  action,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const muted = theme === "light" ? "text-muted-brown" : "text-taupe";
  const ink = theme === "light" ? "text-ink" : "text-warm-white";
  const supportInk = theme === "light" ? "text-ink/70" : "text-warm-white/70";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        (action) && align === "left" && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <Reveal className="flex flex-col gap-5">
        <span className={cn("font-sans text-xs font-semibold uppercase tracking-[0.3em]", muted)}>
          {eyebrow}
        </span>
        <Tag
          className={cn(
            "font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl",
            ink,
          )}
        >
          {headline}
        </Tag>
        {supporting ? (
          <p className={cn("max-w-md font-sans text-[0.95rem] leading-relaxed", supportInk)}>
            {supporting}
          </p>
        ) : null}
      </Reveal>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
