"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { categoryLabels } from "@/data/portfolio";

type GalleryLightboxProps = {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const item = items[index];

  const goPrev = () => onNavigate((index - 1 + items.length) % items.length);
  const goNext = () => onNavigate((index + 1) % items.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-[60] flex flex-col bg-near-black/97"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
          if (delta > 0) goPrev();
          else goNext();
        }
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-sans text-xs tabular-nums tracking-[0.15em] text-warm-white/60">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photograph viewer"
          className="text-warm-white/80 transition-colors hover:text-warm-white"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 pb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photograph"
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 p-3 text-warm-white/70 transition-colors hover:text-warm-white sm:left-4"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
        </button>

        <div className="relative h-full max-h-[78vh] w-full max-w-5xl">
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photograph"
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 p-3 text-warm-white/70 transition-colors hover:text-warm-white sm:right-4"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
        </button>
      </div>

      <p className="px-5 pb-6 text-center font-sans text-xs uppercase tracking-[0.2em] text-warm-white/50 sm:pb-8">
        {categoryLabels[item.category]}
      </p>
    </div>
  );
}
