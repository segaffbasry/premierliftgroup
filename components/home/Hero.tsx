"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button, reducedMotion } from "@/components/ui";
import { hero, projects } from "@/lib/content";
import { contactLink } from "@/lib/site";

/* Hero, staged after Luxury Places' opening (.highlighted_properties, theme CSS read 2026-10-09):
   a centred capitals headline with a dark button and a count, and under it a row of three frames anchored to the
   bottom of the screen: a centre frame 39vw wide (their grid-template-columns: 100% 39vw 100%) flanked by two side
   images at 63% of its height (.highlighted_properties-preview-item--left/right img { height: 63% }), the gap
   their --spacing-md (clamp(2.5rem, 5.56vw, 5rem)). Their centre frame zooms to 100vw (…preview--final) as you scroll;
   here the centre frame is Premier's glass-lift film, and it opens to full-bleed on a short pin (the only pin on the
   page, house rule) while the side images part and the headline lifts away.

   The film frame is one full-viewport element clipped to the centre rectangle, so opening it animates clip-path
   only (no video resize). Entrance waits for `intro:done`: the headline lines and the button fade up one after
   another with Depoluxe's info timing (.6/.7/.8s, .1s apart), then the frames rise in. Muted film with a pause
   control, paused off-screen, poster as fallback, and Depoluxe's thin progress line along its bottom edge. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current, film = video.current; if (!el || !film) return;
    const root = document.documentElement;
    const reduced = reducedMotion();
    const frame = el.querySelector<HTMLElement>(".hero-film")!;
    const sides = el.querySelectorAll<HTMLElement>(".hero-side");
    const head = el.querySelector<HTMLElement>(".hero-head")!;
    const parts = el.querySelectorAll<HTMLElement>("[data-hero-in]");
    const bar = el.querySelector<HTMLElement>(".hero-progress i");

    // The closed state in pixels, measured from a probe sized by the same custom properties as the CSS clip
    // (--card-w, --card-h), so the no-JS and reduced-motion layouts match it exactly.
    const probe = el.querySelector<HTMLElement>(".hero-probe")!;
    const closed = () => {
      const h = el.getBoundingClientRect(), c = probe.getBoundingClientRect();
      return `inset(${c.top - h.top}px ${h.right - c.right}px 0px ${c.left - h.left}px)`;
    };
    const hidden = () => { const h = el.getBoundingClientRect(), c = probe.getBoundingClientRect(); return `inset(${h.height}px ${h.right - c.right}px 0px ${c.left - h.left}px)`; };
    let onIntro: (() => void) | null = null;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.set(parts, { autoAlpha: 0, y: 18 });
      gsap.set(frame, { clipPath: hidden() });
      gsap.set(sides, { yPercent: 40, autoAlpha: 0 });

      const enter = () => {
        const tl = gsap.timeline();
        parts.forEach((p, i) => tl.to(p, { autoAlpha: 1, y: 0, duration: .6 + i * .1, ease: "lift-out" }, i * .1));
        tl.to(frame, { clipPath: closed(), duration: 1.2, ease: "lift-in-out" }, .1)
          .to(sides, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "lift-out", stagger: .08 }, .3)
          .add(() => build(), "+=0");
      };

      // The scroll part: pinned for 90% of the screen height, scrubbed.
      let built = false;
      const build = () => {
        if (built) return; built = true;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el, start: "top top", end: "+=90%", pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => {
              const dark = self.progress > .82;
              if ((frame.dataset.tone === "dark") !== dark) { if (dark) frame.dataset.tone = "dark"; else delete frame.dataset.tone; document.dispatchEvent(new Event("hero:update")); }
            },
          },
        });
        tl.fromTo(frame, { clipPath: () => closed() }, { clipPath: "inset(0px 0px 0px 0px)", ease: "lift-in-out" }, 0)
          .to(head, { yPercent: -40, autoAlpha: 0, ease: "power1.in", duration: .55 }, 0)
          .to(sides[0], { xPercent: -60, ease: "lift-in-out" }, 0)
          .to(sides[1], { xPercent: 60, ease: "lift-in-out" }, 0)
          .fromTo(el.querySelector(".hero-caption"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .3 }, .7);
      };

      if (root.dataset.intro === "done") enter();
      else { onIntro = enter; document.addEventListener("intro:done", enter, { once: true }); }
    }, el);

    // The film: paused off-screen, progress line follows playback.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) film.pause();
      else if (!film.dataset.userPaused && !reduced) void film.play().catch(() => {});
    }, { threshold: .05 });
    io.observe(el);
    const progress = () => { if (bar && film.duration) bar.style.transform = `scaleX(${film.currentTime / film.duration})`; };
    film.addEventListener("timeupdate", progress);
    if (reduced) { film.pause(); film.dataset.userPaused = "1"; setPaused(true); }

    return () => { ctx.revert(); io.disconnect(); film.removeEventListener("timeupdate", progress); if (onIntro) document.removeEventListener("intro:done", onIntro); };
  }, []);

  const toggle = () => {
    const film = video.current; if (!film) return;
    if (film.paused) { delete film.dataset.userPaused; void film.play(); setPaused(false); }
    else { film.dataset.userPaused = "1"; film.pause(); setPaused(true); }
  };

  return <section className="hero" ref={ref} aria-labelledby="hero-title">
    <div className="hero-head wrap">
      <h1 id="hero-title" className="hero-title">
        <span className="hero-line" data-hero-in><em>{hero.title[0]}</em></span>
        <span className="hero-line" data-hero-in>{hero.title[1]}</span>
      </h1>
      <div className="hero-actions" data-hero-in>
        <Button href={projects.href} count={projects.total} reveal={false}>All projects</Button>
        <Button href={contactLink.href} tone="bright" reveal={false}>Contact us</Button>
      </div>
    </div>
    <div className="hero-stage" aria-hidden="true">
      <span className="hero-probe" />
      <div className="hero-side hero-side-left"><img src={hero.side[0].src} alt="" /></div>
      <div className="hero-side hero-side-right"><img src={hero.side[1].src} alt="" /></div>
    </div>
    <div className="hero-film">
      <video ref={video} src={hero.film.src} poster={hero.film.poster} muted loop playsInline autoPlay preload="auto" aria-label={hero.film.label} />
      <p className="hero-caption"><em>Scenic &amp; glass lifts</em></p>
      <button className="hero-pause" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Play the film" : "Pause the film"}>
          {paused ? <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
            : <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
          <span>{paused ? "Play" : "Pause"}</span>
      </button>
      <div className="hero-progress" aria-hidden="true"><i /></div>
    </div>
  </section>;
}
