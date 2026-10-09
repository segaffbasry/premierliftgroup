"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Button, reducedMotion } from "@/components/ui";
import { projects } from "@/lib/content";

/* Projects, after Luxury Places' property slider (section.properties_slider): heading row with a dark button and
   the total in brackets, square Ink arrow buttons, and a row of cards (photo, place in small capitals, type) that
   scrolls sideways with snap. The first card is the live "projects" tile's own film. Cards open the real project. */
export default function Projects() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current; if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector("li"); const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * .8;
    el.scrollBy({ left: dir * step, behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return <section className="section projects" id="projects" aria-labelledby="projects-title">
    <div className="wrap">
      <div className="section-head">
        <h2 id="projects-title" className="text-l" data-reveal="heading">{projects.title}</h2>
        <div className="section-head-side">
          <p data-reveal="text">{projects.text}</p>
          <div className="projects-controls" data-reveal="label">
            <Button href={projects.href} count={projects.total} reveal={false}>All projects</Button>
            <span className="slider-buttons">
              <button className="slider-button" onClick={() => move(-1)} disabled={edge.start} aria-label="Previous projects"><Arrow className="arrow arrow-back" /></button>
              <button className="slider-button" onClick={() => move(1)} disabled={edge.end} aria-label="Next projects"><Arrow /></button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <ul className="project-track" ref={track} aria-label="Selected projects" data-lenis-prevent-horizontal>
      <li data-reveal="card">
        <a href={projects.href} className="project-card project-card-film" target="_blank" rel="noopener">
          <span className="project-media media">
            <video src={projects.film.src} poster={projects.film.poster} muted loop playsInline autoPlay preload="none" aria-hidden="true" />
          </span>
          <span className="project-place">All projects</span>
          <span className="project-type">View all {projects.total} projects</span>
        </a>
      </li>
      {projects.items.map((p) => <li key={p.href} data-reveal="card">
        <a href={p.href} className="project-card" target="_blank" rel="noopener">
          <span className="project-media media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" loading="lazy" />
          </span>
          <span className="project-place">{p.place}</span>
          <span className="project-type">{p.type}</span>
        </a>
      </li>)}
    </ul>
  </section>;
}
