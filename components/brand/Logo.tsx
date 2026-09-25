import { cn } from "@/lib/utils";

type LogoProps = {
  /** The background this logo sits on — determines ink color, not layout. */
  theme?: "light" | "dark";
  layout?: "horizontal" | "stacked";
  showDescriptor?: boolean;
  className?: string;
};

/**
 * The momentsbymikkie wordmark, recreated in type rather than as a raster
 * logo file: "moments by" in the display serif, "mikkie" in the signature
 * script, "PHOTO & FILM" tracked out beneath in the UI sans.
 */
export function Logo({
  theme = "light",
  layout = "horizontal",
  showDescriptor = true,
  className,
}: LogoProps) {
  const ink = theme === "light" ? "text-ink" : "text-warm-white";
  const descriptorInk = theme === "light" ? "text-ink/60" : "text-warm-white/65";

  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline gap-2",
        layout === "stacked" ? "flex-col items-start gap-1" : "flex-row",
        className,
      )}
    >
      <span className={cn("font-display text-[1.5em] leading-none tracking-tight", ink)}>
        moments<span className="font-normal">by</span>
        <span className="font-signature ml-[0.08em] text-[1.15em] font-normal">mikkie</span>
      </span>
      {showDescriptor ? (
        <span
          className={cn(
            "font-sans text-[0.28em] font-medium uppercase tracking-[0.28em]",
            layout === "horizontal" && "self-center pt-[0.15em]",
            descriptorInk,
          )}
        >
          Photo &amp; Film
        </span>
      ) : null}
    </span>
  );
}
