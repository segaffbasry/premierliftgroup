"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import "@/components/motion";
import { reducedMotion } from "@/components/ui";

/* The opening moment: Premier signing its name, built from the wordmark's own seven letter shapes (lib/logo.ts).
   The letters are cut from straight bars and quarter turns, like lift cars in a shaft, so each one rises into place
   from below its own baseline (the SVG's viewBox is the shaft and clips them), one after another, left to right.
   Under the wordmark a hairline fills in Premier Gold, with a counter to 100, so the screen clearly reads as
   loading (house rule).

   The copied interaction is Luxury Places' loader handover (theme CSS, .loader / .loader-logo, read 2026-10-09):
     logoLoading   the stroke fills over 1.6s on cubic-bezier(.6,0,.3,1)            → the gold line here
     logoToHeader  the mark travels to the header logo, 1.2s cubic-bezier(.75,0,.25,1) → the wordmark here (.9s)
     .loader.hide  the ground fades out (1.6s ease-out) while a 12px backdrop blur, masked by a soft band
                   (--mask-pos 110% → -10%), sweeps up the screen                     → same, shortened to .9s

     Build   0.10–0.80s  P R E M I E R rise into place, .08s apart (lift-out)
             0.10–1.70s  the gold line fills and the counter runs to 100 (lift-in-out, Luxury Places' 1.6s)
     Hold    0.20s
     Exit    0.90s       the wordmark travels into the header logo while the Stone ground fades through the blur band,
                         uncovering the hero on the same Stone (no colour jump)
   About 2.8s. It waits for the web font and hero poster for at most 0.4s more; a failsafe ends it at 3.6s.
   Handover early in the exit: removes `is-loading`, sets `data-intro="done"`, dispatches `intro:done`.
   Plays on every load (house rule), never with reduced motion, hidden by <noscript>. */

// Read once at module load: did the boot script (app/layout.tsx) decide the intro plays? (React dev double-mount safe.)
const shouldPlay = typeof document !== "undefined" && document.documentElement.classList.contains("is-loading");

function heroReady() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const poster = new Promise<void>((resolve) => { const img = new Image(); img.onload = img.onerror = () => resolve(); img.src = "/media/hero-poster.jpg"; });
  return Promise.all([fonts, poster]);
}

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const root = document.documentElement;
    let handed = false, dead = false;
    const handover = () => {
      if (handed) return; handed = true;
      root.classList.remove("is-loading");
      root.dataset.intro = "done";
      document.dispatchEvent(new Event("intro:done"));
    };
    // The header logo stays hidden (is-landing) until the travelling wordmark arrives; then the two swap in one frame.
    const finish = () => { handover(); root.classList.remove("is-landing"); el.style.display = "none"; };
    delete root.dataset.intro;
    if (reducedMotion() || !shouldPlay) { finish(); return; }
    root.classList.add("is-loading", "is-landing");

    const logo = el.querySelector<SVGSVGElement>(".logo")!;
    const letters = el.querySelectorAll<SVGPathElement>(".logo path");
    const target = document.querySelector<SVGSVGElement>(".site-header .brand .logo");
    const count = el.querySelector(".preloader-count");
    const level = { v: 0 };
    const show = () => { if (count) count.textContent = String(Math.round(level.v)).padStart(3, "0"); };

    const build = gsap.timeline();
    build.set(el.querySelector(".preloader-sign"), { autoAlpha: 1 })
      .fromTo(letters, { yPercent: 105 }, { yPercent: 0, duration: .62, stagger: .08, ease: "lift-out" }, .1)
      .fromTo(el.querySelector(".preloader-line i"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "lift-in-out" }, .1)
      .to(level, { v: 100, duration: 1.6, ease: "lift-in-out", onUpdate: show }, .1)
      .fromTo(el.querySelectorAll(".preloader-meta > *"), { opacity: 0 }, { opacity: 1, duration: .6, stagger: .1, ease: "power1.in" }, .2);

    let land: gsap.core.Timeline | null = null;
    const complete = () => {
      if (dead || land) return;
      land = gsap.timeline({ onComplete: finish });
      land.addLabel("exit", .2)
        .to(el.querySelectorAll(".preloader-meta, .preloader-line"), { opacity: 0, duration: .3, ease: "power1.out" }, "exit")
        .add(() => {
          // Measured at exit time so a late web font or a resize cannot misplace the landing.
          if (!target || !target.getBoundingClientRect().width) { gsap.to(logo, { opacity: 0, duration: .4 }); return; }
          const from = logo.getBoundingClientRect(), to = target.getBoundingClientRect();
          gsap.to(logo, { x: to.left - from.left + (to.width - from.width) / 2, y: to.top - from.top + (to.height - from.height) / 2, scale: to.width / from.width, transformOrigin: "50% 50%", duration: .9, ease: "lift-travel" });
        }, "exit")
        .to(el.querySelector(".preloader-ground"), { opacity: 0, duration: .9, ease: "power1.out" }, "exit+=.05")
        .fromTo(el.querySelector(".preloader-blur"), { "--mask-pos": "110%" }, { "--mask-pos": "-10%", duration: .9, ease: "power1.out" }, "exit")
        .add(handover, "exit+=.15")
        .set({}, {}, "exit+=.9");
    };
    const wait = Promise.race([heroReady(), new Promise((r) => setTimeout(r, 400))]);
    build.eventCallback("onComplete", () => { void wait.then(complete); });

    // Never hold the page beyond ~3.6s, even if a frame stalls or an asset hangs.
    const failsafe = window.setTimeout(finish, 3600);
    return () => {
      dead = true; window.clearTimeout(failsafe); build.kill(); land?.kill(); gsap.killTweensOf([logo, level]);
      root.classList.remove("is-loading", "is-landing");
    };
  }, []);

  return <div className="preloader" ref={ref} aria-hidden="true">
    <div className="preloader-blur" />
    <div className="preloader-ground" />
    <div className="preloader-sign">
      <Logo title="" />
      <div className="preloader-line"><i /></div>
      <div className="preloader-meta">
        <span>Bespoke lift solutions</span>
        <span className="preloader-count">000</span>
      </div>
    </div>
  </div>;
}
