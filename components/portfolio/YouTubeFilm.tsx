"use client";

import { useState } from "react";
import type { Film } from "@/data/films";
import { FilmPoster } from "@/components/portfolio/FilmPoster";

type YouTubeFilmProps = {
  film: Film;
  playing: boolean;
  onPlay: () => void;
};

/**
 * Featured film slot: shows a custom poster (no default YouTube embed chrome)
 * until clicked, then swaps in a privacy-enhanced youtube-nocookie iframe.
 * Nothing loads from YouTube until the visitor explicitly presses play.
 */
export function YouTubeFilm({ film, playing, onPlay }: YouTubeFilmProps) {
  const [ready, setReady] = useState(false);

  if (!playing) {
    return <FilmPoster film={film} onPlay={onPlay} size="featured" />;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-near-black">
      {!ready ? (
        <div className="absolute inset-0 animate-pulse bg-charcoal" aria-hidden />
      ) : null}
      <iframe
        key={film.id}
        src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
        title={film.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setReady(true)}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
