"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilmPoster } from "@/components/portfolio/FilmPoster";
import { YouTubeFilm } from "@/components/portfolio/YouTubeFilm";
import { films } from "@/data/films";

export function FilmStories() {
  const initial = films.find((f) => f.featured) ?? films[0];
  const [activeId, setActiveId] = useState(initial.id);
  const [playing, setPlaying] = useState(false);

  const active = films.find((f) => f.id === activeId) ?? initial;
  const secondary = films.filter((f) => f.id !== active.id).slice(0, 3);

  function selectFilm(id: string) {
    setActiveId(id);
    setPlaying(false);
  }

  return (
    <section id="films" className="scroll-mt-20 bg-near-black py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Film Stories"
          headline={
            <>
              Moments
              <br />
              in Motion
            </>
          }
          supporting="Films made to preserve the feeling, energy and little moments that photographs alone cannot tell."
          theme="dark"
          className="mb-12 lg:mb-16"
        />

        <Reveal className="mb-5">
          <YouTubeFilm
            film={active}
            playing={playing}
            onPlay={() => setPlaying(true)}
          />
        </Reveal>

        {secondary.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {secondary.map((film, i) => (
              <Reveal key={film.id} delay={i * 80}>
                <FilmPoster film={film} onPlay={() => selectFilm(film.id)} size="secondary" />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
