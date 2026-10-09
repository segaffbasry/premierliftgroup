"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { focusOverlay } from "@/components/motion";
import { reducedMotion } from "@/components/ui";

/* The live homepage's "WATCH VIDEO" lightbox (Webflow w-lightbox, vimeo.com/423084346), rebuilt as an on-page
   dialog playing the same film from Premier's YouTube channel, self-hosted (scripts/media.sh). Fades in on an Ink
   veil, focus trapped, Esc or the close button ends it and returns focus to the trigger; the film stops on close. */
export default function VideoDialog({ open, close, trigger, film }: { open: boolean; close: () => void; trigger: HTMLElement | null; film: { src: string; poster: string; title: string } }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current, v = video.current; if (!el || !v) return;
    if (!open) { v.pause(); return; }
    el.style.visibility = "visible";
    const fast = reducedMotion();
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: fast ? 0 : .5, ease: "lift-out" });
    gsap.fromTo(el.querySelector(".video-dialog-frame"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: fast ? 0 : .8, ease: "lift-out", delay: fast ? 0 : .1 });
    v.currentTime = 0; void v.play().catch(() => {});
    const release = focusOverlay(el, close, trigger);
    return () => {
      release();
      gsap.to(el, { opacity: 0, duration: fast ? 0 : .35, ease: "power1.out", onComplete: () => { el.style.visibility = "hidden"; } });
    };
  }, [open, close, trigger]);

  return <div className="video-dialog" ref={root} role="dialog" aria-modal="true" aria-label={film.title} aria-hidden={!open} inert={!open} data-lenis-prevent onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
    <button className="video-dialog-close" onClick={close}>Close</button>
    <div className="video-dialog-frame">
      <video ref={video} src={open ? film.src : undefined} poster={film.poster} controls playsInline preload="none" />
    </div>
  </div>;
}
