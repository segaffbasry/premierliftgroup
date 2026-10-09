import { Button } from "@/components/ui";
import { bespoke } from "@/lib/content";

/* Bespoke: the live homepage's BESPOKE tile over its circular glass lift photo, staged the way Depoluxe frames a
   film: a wide image band with a centred italic serif title (theirs EB Garamond italic, here Premier's own Playfair
   Display italic, the face the live site uses for "BESPOKE") and a small line under it. Below, the /luxury-lifts
   introduction beside its "Expert design and craftsmanship" photographs. The one place Premier Gold leads. */
export default function Bespoke() {
  return <section className="section bespoke" id="bespoke" aria-labelledby="bespoke-title">
    <div className="bespoke-band" data-tone="dark">
      <figure className="bespoke-media media" data-parallax>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bespoke.image.src} alt={bespoke.image.alt} loading="lazy" />
      </figure>
      <div className="bespoke-title">
        <h2 id="bespoke-title" data-reveal="heading"><em>{bespoke.title}</em></h2>
        <p data-reveal="text">{bespoke.sub}</p>
        <Button href={bespoke.href} tone="bright">Explore</Button>
      </div>
    </div>
    <div className="wrap bespoke-body">
      <p className="lede bespoke-intro" data-reveal="text">{bespoke.text}</p>
      <div className="bespoke-craft">
        <ul className="craft-row">
          {bespoke.craft.map((c) => <li key={c.src} className="media" data-reveal="image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.alt} loading="lazy" />
          </li>)}
        </ul>
        <h3 className="text-s" data-reveal="heading">{bespoke.craftTitle}</h3>
        <p className="small" data-reveal="text">{bespoke.craftText}</p>
      </div>
    </div>
  </section>;
}
