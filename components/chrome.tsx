"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { focusOverlay, usePageMotion } from "@/components/motion";
import { Arrow, SocialIcon, linkProps, reducedMotion } from "@/components/ui";
import { address, bespokeLink, contactLink, copyright, email, footerSitemap, nav, phones, products, socials } from "@/lib/site";

// Menu shortcuts to the homepage's own sections (scrolled through Lenis).
const onPage = [
  { label: "Home", href: "#top" },
  { label: "Leaders in lift design", href: "#about" },
  { label: "Lift collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* Full-screen menu. In: the Stone sheet wipes down from the header line (lift-in-out, .8s), then the columns fade
   in one after another the way Depoluxe brings in its project info (.6/.7/.8/.9s, .1s apart). One GSAP timeline;
   reverse() plays the way out. Focus is trapped, Esc closes, focus returns to the trigger. */
function Menu({ open, close, trigger }: { open: boolean; close: () => void; trigger: HTMLElement | null }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8, ease: "lift-in-out" }, 0);
    el.querySelectorAll("[data-menu-in]").forEach((item, i) => tl.fromTo(item, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6 + Math.min(i, 3) * .1, ease: "lift-out" }, .35 + i * .05));
    timeline.current = tl;
    return () => { tl.kill(); timeline.current = null; };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 50 : 1).play();
      return focusOverlay(el, close, trigger);
    }
    if (tl.progress() > 0) tl.timeScale(reducedMotion() ? 50 : 1.7).reverse();
  }, [open, close, trigger]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top wrap">
      <span />
      <a href="#top" className="brand" onClick={close} aria-label="Premier Lift Group, back to the top"><Logo title="" /></a>
      <button className="menu-toggle menu-close" onClick={close}><span>Close</span></button>
    </div>
    <div className="menu-body wrap">
      <nav className="menu-page" aria-label="On this page">
        <ul>{onPage.map((l) => <li key={l.href} data-menu-in><a href={l.href} onClick={close}>{l.label}</a></li>)}</ul>
      </nav>
      <nav className="menu-col" aria-label="Product range" data-menu-in>
        <h2 className="menu-label">Products</h2>
        <ul>{products.map((p) => <li key={p.id}><a href={p.href} className="u-link" {...linkProps(p.href)}>{p.label}</a></li>)}</ul>
        <a href={bespokeLink.href} className="menu-bespoke" {...linkProps(bespokeLink.href)}>{bespokeLink.label} <Arrow /></a>
      </nav>
      <nav className="menu-col" aria-label="Premier Lift Group" data-menu-in>
        <h2 className="menu-label">Premier Lift Group</h2>
        <ul>{[...nav.slice(1), contactLink].map((l) => <li key={l.href}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
        <ul className="menu-contact">{phones.map((p) => <li key={p.href}><a href={p.href} className="u-link">{p.city} {p.number}</a></li>)}<li><a href={email.href} className="u-link">{email.label}</a></li></ul>
        <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} {...linkProps(s.href)} aria-label={`Premier Lift Group on ${s.name}`}><SocialIcon icon={s.icon} /></a></li>)}</ul>
      </nav>
    </div>
  </div>;
}

/* Frameless header in Luxury Places' arrangement: links left and right, the wordmark centred. No bar or box; its
   colour follows what is underneath (motion.tsx sets html[data-header]). It slides away on the way down and
   returns on the way up. */
function Header() {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const bar = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const openMenu = (e: React.MouseEvent<HTMLElement>) => { e.preventDefault(); setTrigger(e.currentTarget); setOpen(true); };

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      el.classList.toggle("is-hidden", delta > 0 && !document.documentElement.classList.contains("overlay-open"));
      last = y;
    };
    const reveal = () => el.classList.remove("is-hidden");
    el.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); };
  }, []);

  return <>
    <header className="site-header" ref={bar}>
      <div className="wrap site-header-inner">
        <nav className="header-left" aria-label="Main" data-hero-part>
          <ul className="header-links">
            <li><button className="link-underline" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={openMenu}>Product range</button></li>
            {nav.slice(1, 3).map((l) => <li key={l.href}><a href={l.href} className="link-underline" {...linkProps(l.href)}>{l.label}</a></li>)}
          </ul>
        </nav>
        <a href="#top" className="brand" aria-label="Premier Lift Group, back to the top"><Logo title="" /></a>
        <div className="header-right" data-hero-part>
          <ul className="header-links">
            {[...nav.slice(3), contactLink].map((l) => <li key={l.href}><a href={l.href} className="link-underline" {...linkProps(l.href)}>{l.label}</a></li>)}
          </ul>
          <button className="menu-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={openMenu}>
            <span>Menu</span><span className="menu-lines" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
    </header>
    <Menu open={open} close={close} trigger={trigger} />
  </>;
}

/* Footer: the live footer's contact column, address, sitemap column, socials, the ISO and LEIA marks and the
   copyright line. No scroll reveals here (house rule: they read as a jump at the bottom). */
function Footer() {
  return <footer className="site-footer" data-tone="dark">
    <div className="wrap">
      <a href="#top" className="footer-logo" aria-label="Premier Lift Group, back to the top"><Logo title="" /></a>
      <div className="footer-grid">
        <div className="footer-col">
          <h2 className="footer-label">Contact us</h2>
          <ul>
            {phones.map((p) => <li key={p.href}><a href={p.href} className="u-link"><span className="footer-city">{p.city}</span> {p.number}</a></li>)}
            <li><a href={email.href} className="u-link">{email.label}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-label">Address</h2>
          <address>{address.map((line) => <span key={line}>{line}<br /></span>)}</address>
        </div>
        <nav className="footer-col" aria-label="Sitemap">
          <h2 className="footer-label">Sitemap</h2>
          <ul className="footer-sitemap">{footerSitemap.map((l) => <li key={l.href}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
        </nav>
        <div className="footer-col">
          <h2 className="footer-label">Accreditation</h2>
          <div className="footer-certs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/cert-iso.png" alt="ISO certified" width={88} height={88} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/cert-leia.svg" alt="Lift and Escalator Industry Association member" width={120} height={60} loading="lazy" />
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <p>{copyright}</p>
        <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} {...linkProps(s.href)} aria-label={`Premier Lift Group on ${s.name}`}><SocialIcon icon={s.icon} size={18} /></a></li>)}</ul>
      </div>
    </div>
  </footer>;
}

/* Everything around the page: header and menu, footer, smooth scroll and reveals. */
export function Shell({ children }: { children: ReactNode }) {
  usePageMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" tabIndex={-1} />
    <Header />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer />
  </>;
}
