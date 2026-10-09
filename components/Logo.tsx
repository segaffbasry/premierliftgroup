import { logoLetters, logoViewBox } from "@/lib/logo";

/* Premier's wordmark from its own vectors (lib/logo.ts, scripts/logo.mjs), one path per letter so the preloader
   can build it letter by letter. Colour follows currentColor. */
export function Logo({ title = "Premier Lift Group" }: { title?: string }) {
  return <svg className="logo" viewBox={logoViewBox} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title || undefined} focusable="false">
    {logoLetters.map((l) => <path key={l.id} data-part={l.id} d={l.d} fill="currentColor" />)}
  </svg>;
}
