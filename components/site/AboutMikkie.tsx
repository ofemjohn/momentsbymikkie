import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { stats, aboutCopy } from "@/data/about";

export function AboutMikkie() {
  return (
    <section id="about" className="scroll-mt-20 bg-near-black py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.6fr)] lg:gap-14 lg:px-12">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal lg:aspect-auto">
          <Image
            src="/images/about/mikkie.svg"
            alt="Placeholder — a real photograph of Mikkie at work will appear here"
            fill
            sizes="(min-width: 1024px) 28vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
        </Reveal>

        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="The Person Behind the Lens"
            headline="Hi, I'm Mikkie"
            theme="dark"
            as="h2"
          />
          <Reveal delay={80}>
            <p className="max-w-md font-sans text-[0.95rem] leading-relaxed text-warm-white/75">
              {aboutCopy}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <Button href="#contact" variant="outline-inverse">
              Let&apos;s Create Together &rarr;
            </Button>
          </Reveal>
        </div>

        {stats.length > 0 ? (
          <Reveal delay={100} className="flex flex-col gap-8 lg:justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 border-t border-warm-white/15 pt-4">
                <span className="font-display text-3xl font-medium text-warm-white">{stat.value}</span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-warm-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
