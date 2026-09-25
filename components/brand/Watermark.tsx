import { cn } from "@/lib/utils";
import { Submark } from "@/components/brand/Submark";

type WatermarkProps = {
  theme?: "light" | "dark";
  className?: string;
};

/**
 * Reusable watermark mark for selected portfolio exports/presentation
 * imagery. Not applied automatically anywhere in the site UI — see
 * README/brief §23. Intentionally low-opacity and small.
 */
export function Watermark({ theme = "dark", className }: WatermarkProps) {
  return (
    <div
      className={cn(
        "pointer-events-none inline-flex items-center gap-1.5 opacity-70",
        className,
      )}
    >
      <Submark theme={theme} variant="outline" className="h-5 w-5" />
      <span
        className={cn(
          "font-sans text-[10px] font-medium uppercase tracking-[0.25em]",
          theme === "dark" ? "text-warm-white" : "text-ink",
        )}
      >
        momentsbymikkie
      </span>
    </div>
  );
}
