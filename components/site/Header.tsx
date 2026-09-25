"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNavigation } from "@/components/site/MobileNavigation";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const socialLinks = [
  { href: siteConfig.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: siteConfig.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: siteConfig.facebook, label: "Facebook", Icon: FacebookIcon },
].filter((link) => link.href);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-ink/10 bg-warm-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" aria-label="momentsbymikkie — back to top">
          <Logo theme={scrolled ? "light" : "dark"} className="text-[0.95rem] sm:text-base" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                scrolled ? "text-ink/75 hover:text-ink" : "text-warm-white/85 hover:text-warm-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {socialLinks.length > 0 ? (
            <ul className="flex items-center gap-3.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className={cn(
                      "transition-colors",
                      scrolled ? "text-ink/60 hover:text-ink" : "text-warm-white/80 hover:text-warm-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <Button
            href="#contact"
            variant={scrolled ? "outline" : "outline-inverse"}
            className="px-6 py-2.5 text-[0.65rem]"
          >
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className={cn(
            "-mr-2 flex h-10 w-10 items-center justify-center lg:hidden",
            scrolled ? "text-ink" : "text-warm-white",
          )}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} socialLinks={socialLinks} />
    </header>
  );
}
