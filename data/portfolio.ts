export type PortfolioCategory =
  | "weddings"
  | "portraits"
  | "events"
  | "brands"
  | "lifestyle";

export const categoryLabels: Record<PortfolioCategory, string> = {
  weddings: "Weddings",
  portraits: "Portraits",
  events: "Events",
  brands: "Brands",
  lifestyle: "Lifestyle",
};

export type FeaturedCategory = {
  category: PortfolioCategory;
  image: string;
  alt: string;
};

// PLACEHOLDER imagery — replace with Mikkie's actual selects.
// TODO: Replace src images with real photography once supplied.
export const featuredCategories: FeaturedCategory[] = [
  { category: "weddings", image: "/images/featured/weddings.svg", alt: "Placeholder — representative wedding photograph" },
  { category: "portraits", image: "/images/featured/portraits.svg", alt: "Placeholder — representative portrait photograph" },
  { category: "events", image: "/images/featured/events.svg", alt: "Placeholder — representative event photograph" },
  { category: "brands", image: "/images/featured/brands.svg", alt: "Placeholder — representative brand photograph" },
  { category: "lifestyle", image: "/images/featured/lifestyle.svg", alt: "Placeholder — representative lifestyle photograph" },
];

export type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  title?: string;
  width: number;
  height: number;
};

// PLACEHOLDER imagery — replace with Mikkie's actual portfolio selects.
// TODO: Replace with real photography once supplied; keep varied orientations.
export const portfolioItems: PortfolioItem[] = [
  { id: "portfolio-01", src: "/images/portfolio/portfolio-01.svg", alt: "Placeholder — bride walking, full length", category: "weddings", width: 1200, height: 1500 },
  { id: "portfolio-02", src: "/images/portfolio/portfolio-02.svg", alt: "Placeholder — couple forehead to forehead", category: "weddings", width: 1500, height: 1200 },
  { id: "portfolio-03", src: "/images/portfolio/portfolio-03.svg", alt: "Placeholder — portrait looking up, laughing", category: "portraits", width: 1200, height: 1500 },
  { id: "portfolio-04", src: "/images/portfolio/portfolio-04.svg", alt: "Placeholder — candlelit table detail", category: "events", width: 1500, height: 1000 },
  { id: "portfolio-05", src: "/images/portfolio/portfolio-05.svg", alt: "Placeholder — bridal party group", category: "weddings", width: 1600, height: 1067 },
  { id: "portfolio-06", src: "/images/portfolio/portfolio-06.svg", alt: "Placeholder — rings on fabric detail", category: "weddings", width: 1200, height: 1200 },
  { id: "portfolio-07", src: "/images/portfolio/portfolio-07.svg", alt: "Placeholder — groom adjusting bow tie", category: "portraits", width: 1200, height: 1500 },
  { id: "portfolio-08", src: "/images/portfolio/portfolio-08.svg", alt: "Placeholder — coastal landscape brand shoot", category: "brands", width: 1600, height: 1067 },
  { id: "portfolio-09", src: "/images/portfolio/portfolio-09.svg", alt: "Placeholder — golden hour portrait", category: "lifestyle", width: 1200, height: 1500 },
  { id: "portfolio-10", src: "/images/portfolio/portfolio-10.svg", alt: "Placeholder — guests celebrating", category: "events", width: 1500, height: 1000 },
];
