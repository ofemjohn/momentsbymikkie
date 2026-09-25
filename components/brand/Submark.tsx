import { cn } from "@/lib/utils";

type SubmarkProps = {
  theme?: "light" | "dark";
  /** Filled circle (favicon/app-icon style) vs. an outlined ring (watermark style). */
  variant?: "outline" | "filled";
  className?: string;
};

/**
 * The circular "m" monogram used as favicon, compact mobile mark, and
 * watermark base. Pure inline SVG so it stays crisp at 16px and at 512px.
 */
export function Submark({ theme = "light", variant = "outline", className }: SubmarkProps) {
  const ink = theme === "light" ? "#191816" : "#faf8f4";
  const fill = variant === "filled" ? ink : "none";
  const stroke = ink;
  const textFill = variant === "filled" ? (theme === "light" ? "#faf8f4" : "#191816") : ink;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="momentsbymikkie monogram"
    >
      <circle cx="32" cy="32" r="30" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-display), 'Cormorant Garamond', serif"
        fontSize="30"
        fill={textFill}
      >
        m
      </text>
    </svg>
  );
}
