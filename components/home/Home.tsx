import About from "@/components/home/About";
import Bespoke from "@/components/home/Bespoke";
import Collections from "@/components/home/Collections";
import Contact from "@/components/home/Contact";
import Explore from "@/components/home/Explore";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";

// The homepage, top to bottom (README "Page structure and pacing").
export default function Home() {
  return <>
    <Hero />
    <About />
    <Collections />
    <Bespoke />
    <Projects />
    <Explore />
    <Contact />
  </>;
}
