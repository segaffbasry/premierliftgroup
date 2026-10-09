import { Button } from "@/components/ui";
import { explore } from "@/lib/content";

/* The live homepage's "blog" and "about us" tiles, side by side: photo, title in capitals, the live line and its
   "explore" button. (Its "projects" tile film leads the projects slider above.) Shorter reveals: data-late. */
export default function Explore() {
  return <section className="section explore" aria-label="Blog and company" data-late>
    <ul className="wrap explore-grid">
      {explore.map((t) => <li key={t.title} className="explore-tile">
        <figure className="explore-media media" data-reveal="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.image} alt="" loading="lazy" />
        </figure>
        <div className="explore-copy">
          <h2 className="text-m" data-reveal="heading">{t.title}</h2>
          <p data-reveal="text">{t.text}</p>
          <Button href={t.href} tone="stone" arrow>Explore</Button>
        </div>
      </li>)}
    </ul>
  </section>;
}
