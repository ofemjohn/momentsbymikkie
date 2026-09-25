"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryItem } from "@/components/portfolio/GalleryItem";
import { GalleryLightbox } from "@/components/portfolio/GalleryLightbox";
import { portfolioItems, categoryLabels, type PortfolioCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Filter = "all" | PortfolioCategory;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const availableCategories = useMemo(() => {
    const set = new Set(portfolioItems.map((item) => item.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section id="selected-galleries" className="scroll-mt-20 bg-near-black py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Selected Galleries"
          headline={
            <>
              Real People.
              <br />
              Real Moments.
            </>
          }
          theme="dark"
          action={
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {(["all", ...availableCategories] as Filter[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={cn(
                    "shrink-0 border px-4 py-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors",
                    filter === key
                      ? "border-warm-white bg-warm-white text-near-black"
                      : "border-warm-white/25 text-warm-white/70 hover:border-warm-white/60 hover:text-warm-white",
                  )}
                >
                  {key === "all" ? "All" : categoryLabels[key]}
                </button>
              ))}
            </div>
          }
          className="mb-12 lg:mb-14"
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => (
            <GalleryItem key={item.id} item={item} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
