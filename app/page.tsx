import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { FilmStories } from "@/components/site/FilmStories";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { AboutMikkie } from "@/components/site/AboutMikkie";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedWork />
        <FilmStories />
        <Services />
        <Gallery />
        <Testimonials />
        <AboutMikkie />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
