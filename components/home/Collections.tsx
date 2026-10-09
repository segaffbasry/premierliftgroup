"use client";

import { useCallback, useState } from "react";
import { Arrow } from "@/components/ui";
import { collections } from "@/lib/content";
import { products } from "@/lib/site";
import VideoDialog from "@/components/home/VideoDialog";

/* Lift collections: the six live tiles as a 3 × 2 grid of photo cards. Each card carries the collection's icon and
   one-line description from the live product dropdown, and links to the real collection page. The live "WATCH VIDEO"
   lightbox plays the collections film here, on the page (components/home/VideoDialog.tsx). */
export default function Collections() {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  return <section className="section collections" id="collections" aria-labelledby="collections-title">
    <div className="wrap">
      <div className="section-head">
        <h2 id="collections-title" className="text-l" data-reveal="heading">{collections.title}</h2>
        <div className="section-head-side">
          <p data-reveal="text">{collections.text}</p>
          <button className="button button-dark" data-reveal="label" onClick={(e) => { setTrigger(e.currentTarget); setOpen(true); }}>
            <span className="button-text">Watch video</span><span className="button-additional">(3:06)</span>
          </button>
        </div>
      </div>
      <ul className="collection-grid">
        {collections.items.map((c) => {
          const p = products.find((x) => x.id === c.id)!;
          return <li key={c.id} data-reveal="card">
            <a href={p.href} className="collection-card" target="_blank" rel="noopener">
              <span className="collection-media media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.alt} loading="lazy" />
              </span>
              <span className="collection-row" data-rise>
                <span className="collection-icon" aria-hidden="true" style={{ "--icon": `url(/media/icon-${c.id}.svg)` } as React.CSSProperties} />
                <span className="collection-name">{c.name}</span>
                <span className="collection-more">View collection <Arrow /></span>
              </span>
              <span className="collection-line" data-rise>{p.line}</span>
            </a>
          </li>;
        })}
      </ul>
    </div>
    <VideoDialog open={open} close={close} trigger={trigger} film={collections.film} />
  </section>;
}

