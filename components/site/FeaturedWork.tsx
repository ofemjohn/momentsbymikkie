import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { featuredCategories, categoryLabels } from "@/data/portfolio";

export function FeaturedWork() {
  return (
    <section id="featured-work" className="scroll-mt-20 bg-warm-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Featured Work"
          headline="A Glimpse Into My World"
          supporting="From intimate celebrations to bold brand stories, here are some of my favourite moments."
          action={
            <a
              href="#selected-galleries"
              className="hidden items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-ink sm:inline-flex"
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          }
          className="mb-12 lg:mb-16"
        />

        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {featuredCategories.map(({ category, image, alt }, i) => (
            <Reveal key={category} delay={i * 80} className="min-w-[72%] shrink-0 snap-start sm:min-w-0 sm:shrink">
              <a href="#selected-galleries" className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 72vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-near-black/0 transition-colors duration-500 group-hover:bg-near-black/10" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                    {categoryLabels[category]}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 -translate-x-1 text-ink/50 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
