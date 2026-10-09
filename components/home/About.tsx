import { Button } from "@/components/ui";
import { about } from "@/lib/content";
import { contactLink } from "@/lib/site";

/* Leaders in lift design, in Luxury Places' "mixed" block (section.mixed.mixed--media_right): the title in capitals
   top left, the copy and a dark button below it a few columns in, a tall photo on the right with parallax. Under it
   the live "work with" logos in one row, drawn in Ink through a mask (their files are #333 with a hidden teal layer). */
export default function About() {
  return <section className="section about" id="about" aria-labelledby="about-title">
    <div className="wrap about-grid">
      <h2 id="about-title" className="text-l about-title" data-reveal="heading">{about.title}</h2>
      <div className="about-copy">
        <p className="lede" data-reveal="text">{about.text}</p>
        <p className="small" data-reveal="text">{about.standards}</p>
        <Button href={contactLink.href} arrow>Contact us</Button>
      </div>
      <figure className="about-media media" data-reveal="image" data-parallax>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={about.image.src} alt={about.image.alt} loading="lazy" />
      </figure>
    </div>
    <div className="wrap">
      <ul className="clients" aria-label="We work with">
        {about.clients.map((c) => <li key={c.name} data-reveal="card"><span className="client" role="img" aria-label={c.name} style={{ "--logo": `url(${c.src})` } as React.CSSProperties} /></li>)}
      </ul>
    </div>
  </section>;
}
