"use client";

import { Button } from "@/components/ui";
import { contact } from "@/lib/content";
import { LIVE, contactLink, email, phones } from "@/lib/site";

/* Contact, kept out of the footer (house rule): /luxury-lifts "tell us about your project" with the live phone
   numbers and email, beside the live homepage's newsletter block. The form is the live one's fields and wording;
   in this private demo it does not submit anywhere. Shorter reveals: data-late. */
export default function Contact() {
  return <section className="section contact" id="contact" aria-labelledby="contact-title" data-late>
    <div className="wrap contact-panel">
      <div className="contact-main">
        <h2 id="contact-title" className="text-l" data-reveal="heading">{contact.title}</h2>
        <p data-reveal="text">{contact.text}</p>
        <ul className="contact-lines">
          {phones.map((p) => <li key={p.href} data-reveal="label"><span>{p.city}</span><a href={p.href} className="u-link">{p.number}</a></li>)}
          <li data-reveal="label"><span>Email</span><a href={email.href} className="u-link">{email.label}</a></li>
        </ul>
        <Button href={contactLink.href} arrow>Contact us</Button>
      </div>
      <form className="newsletter" onSubmit={(e) => e.preventDefault()} aria-labelledby="newsletter-title">
        <h3 id="newsletter-title" className="text-s" data-reveal="heading">{contact.newsletterTitle}</h3>
        <p data-reveal="text">{contact.newsletterText}</p>
        <div className="newsletter-field" data-reveal="label">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input id="newsletter-email" type="email" name="email" placeholder="Email address" autoComplete="email" required />
          <button type="submit" className="button button-dark"><span className="button-text">Subscribe</span></button>
        </div>
        <p className="newsletter-policy" data-reveal="text">By subscribing you agree to receiving marketing and promotional emails from us. More information can be found in our <a href={`${LIVE}/privacy-policy`} className="u-link" target="_blank" rel="noopener">privacy policy</a>.</p>
      </form>
    </div>
  </section>;
}
