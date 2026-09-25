"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialLink = { href: string; label: string; Icon: LucideIcon | ((props: { className?: string }) => React.ReactElement) };

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  socialLinks: SocialLink[];
};

export function MobileNavigation({ open, onClose, socialLinks }: MobileNavigationProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-near-black transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <Logo theme="dark" className="text-[0.95rem]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 flex h-10 w-10 items-center justify-center text-warm-white"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-col gap-2 px-8 pt-10">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            className={cn(
              "font-display border-b border-warm-white/10 py-4 text-4xl font-medium text-warm-white transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-8 pb-10">
        <Button href="#contact" onClick={onClose} variant="outline-inverse" className="w-full">
          Let&apos;s Talk
        </Button>
        {socialLinks.length > 0 ? (
          <ul className="flex items-center justify-center gap-6">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
