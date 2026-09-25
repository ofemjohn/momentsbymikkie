import Image from "next/image";
import { Play } from "lucide-react";
import type { Film } from "@/data/films";
import { cn } from "@/lib/utils";

type FilmPosterProps = {
  film: Film;
  onPlay: () => void;
  size?: "featured" | "secondary";
  active?: boolean;
};

export function FilmPoster({ film, onPlay, size = "featured", active = false }: FilmPosterProps) {
  const isFeatured = size === "featured";

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play film: ${film.title}`}
      className={cn(
        "group relative block w-full overflow-hidden bg-near-black text-left",
        "aspect-video",
        active && !isFeatured && "ring-1 ring-warm-white/50",
      )}
    >
      <Image
        src={film.thumbnail}
        alt=""
        fill
        sizes={isFeatured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 22vw, 45vw"}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/10 to-transparent"
      />

      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-full border border-warm-white/70 text-warm-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-warm-white group-hover:text-near-black",
            isFeatured ? "h-16 w-16" : "h-10 w-10",
          )}
        >
          <Play className={isFeatured ? "h-5 w-5" : "h-3.5 w-3.5"} fill="currentColor" strokeWidth={0} />
        </span>
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
        <span
          className={cn(
            "min-w-0 truncate font-sans font-medium text-warm-white",
            isFeatured ? "text-sm sm:text-base" : "text-xs",
          )}
        >
          {film.title}
        </span>
        {film.duration ? (
          <span className="shrink-0 font-sans text-[0.65rem] tabular-nums text-warm-white/70">
            {film.duration}
          </span>
        ) : null}
      </div>
    </button>
  );
}
