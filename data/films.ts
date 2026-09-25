export type Film = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  duration?: string;
  featured?: boolean;
};

// PLACEHOLDER footage — a public Creative Commons demo reel stands in for
// Mikkie's real films until they're supplied.
// TODO: Replace youtubeId + thumbnail + title/duration with Mikkie's real films.
export const films: Film[] = [
  {
    id: "film-01",
    title: "A Wedding in Nairobi",
    youtubeId: "aqz-KE-bpKQ",
    thumbnail: "/images/films/film-01.svg",
    duration: "03:24",
    featured: true,
  },
  {
    id: "film-02",
    title: "Brand Story — Local & Bold",
    youtubeId: "aqz-KE-bpKQ",
    thumbnail: "/images/films/film-02.svg",
    duration: "02:18",
  },
  {
    id: "film-03",
    title: "A Day to Remember",
    youtubeId: "aqz-KE-bpKQ",
    thumbnail: "/images/films/film-03.svg",
    duration: "02:56",
  },
  {
    id: "film-04",
    title: "Capturing What Matters",
    youtubeId: "aqz-KE-bpKQ",
    thumbnail: "/images/films/film-01.svg",
    duration: "02:47",
  },
];
