import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] px-7 py-3.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-40";

const variants = {
  solid: "bg-ink text-warm-white hover:bg-charcoal",
  "solid-inverse": "bg-warm-white text-ink hover:bg-warm-cream",
  outline: "border border-ink/25 text-ink hover:border-ink/60",
  "outline-inverse": "border border-warm-white/35 text-warm-white hover:border-warm-white/70",
  ghost: "text-ink hover:text-muted-brown",
  "ghost-inverse": "text-warm-white hover:text-warm-cream",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const {
    variant = "solid",
    icon,
    iconPosition = "right",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
