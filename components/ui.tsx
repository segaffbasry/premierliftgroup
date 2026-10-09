import type { ReactNode } from "react";
import { brandIcons, type BrandIcon } from "@/lib/brand-icons";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Links that leave the page open in a new tab with rel="noopener" (brief); motion.tsx keeps them from navigating at all.
export const linkProps = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

export function Arrow({ className = "arrow" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 10 10" aria-hidden="true" focusable="false">
    <path d="M1 5h8M5.5 1.5 9 5 5.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>;
}

/* The copied interaction's sibling: Luxury Places' .button, value for value (theme CSS app.05abc0dd9887ec4c5b11.css):
   inline-flex, gap .5rem, padding .625rem .75rem, radius .13rem, 12px uppercase label (.text-3xs), an optional
   muted count after it (.button-additional, "(146)"), and on hover only the label dims (.button-text,
   transition color .3s ease-out, to --color-white-40). Tones: "dark" (Ink, their button--dark), "bright"
   (white with a hairline, their button--bright) and "stone" (their button--grey). */
export function Button({ href, children, count, tone = "dark", arrow = false, className = "", reveal = true, onClick }: {
  href: string; children: ReactNode; count?: number; tone?: "dark" | "bright" | "stone"; arrow?: boolean; className?: string; reveal?: boolean; onClick?: () => void;
}) {
  return <a href={href} className={`button button-${tone} ${className}`} data-reveal={reveal ? "label" : undefined} onClick={onClick} {...linkProps(href)}>
    <span className="button-text">{children}</span>
    {count !== undefined && <span className="button-additional">({count})</span>}
    {arrow && <span className="button-icon"><Arrow /></span>}
  </a>;
}

export function SocialIcon({ icon, size = 18 }: { icon: BrandIcon; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false"><path d={brandIcons[icon]} fill="currentColor" /></svg>;
}
