import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { featuredCategories, categoryLabels } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[95svh] min-h-[640px] w-full items-end overflow-hidden bg-near-black md:min-h-[760px]"
    >
      <Image
        src="/images/hero/hero.svg"
        alt="Placeholder — Mikkie's signature wedding photography will appear here"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-near-black/85 via-near-black/25 to-near-black/45"
      />

      <div className="relative z-10 flex w-full flex-col gap-16 px-5 pb-10 pt-32 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="flex flex-col items-start gap-6 sm:max-w-2xl">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-warm-white/75">
            More Than Photos
          </span>
          <h1 className="font-display text-6xl font-medium leading-[0.98] text-warm-white sm:text-7xl md:text-8xl">
            Stories
            <br />
            That Live
            <br />
            Forever
          </h1>
          <p className="max-w-sm font-sans text-[0.95rem] leading-relaxed text-warm-white/80">
            Photography &amp; videography for real people, meaningful moments and unforgettable
            stories.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button href="#featured-work" variant="solid-inverse">
              View My Work &rarr;
            </Button>
            <Button href="#films" variant="ghost-inverse" icon={<Play className="h-3.5 w-3.5" fill="currentColor" />} iconPosition="left">
              Watch Showreel
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <a
            href="#featured-work"
            className="group flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-warm-white/70 transition-colors hover:text-warm-white"
          >
            Scroll
            <span aria-hidden className="inline-block transition-transform group-hover:translate-y-0.5">
              &darr;
            </span>
          </a>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-warm-white/65">
            {featuredCategories.map((item, i) => (
              <li key={item.category} className="flex items-center gap-5">
                {categoryLabels[item.category]}
                {i < featuredCategories.length - 1 ? (
                  <span aria-hidden className="text-warm-white/30">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span
        aria-hidden
        className="font-signature pointer-events-none absolute right-6 top-28 hidden max-w-[10rem] text-right text-2xl leading-tight text-warm-white/75 sm:right-10 sm:block md:top-36 md:text-3xl"
      >
        Real People
        <br />
        Beautiful Stories
      </span>
    </section>
  );
}
