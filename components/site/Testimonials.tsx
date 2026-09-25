"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  if (!current) return null;

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="scroll-mt-20 bg-warm-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Kind Words"
          headline={
            <>
              What Clients
              <br />
              Say
            </>
          }
          align="center"
          className="mb-12 lg:mb-16"
        />

        <Reveal key={current.id} className="flex flex-col items-center gap-6">
          <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-ink">
              {current.name}
            </span>
            {current.project ? (
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted-brown">
                {current.project}
              </span>
            ) : null}
            {current.placeholder ? (
              <span className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ink/40">
                Sample — pending real testimonials
              </span>
            ) : null}
          </div>
        </Reveal>

        {testimonials.length > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="text-ink/50 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="font-sans text-xs tabular-nums tracking-[0.15em] text-ink/50">
              {index + 1} / {testimonials.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="text-ink/50 transition-colors hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
