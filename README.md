# Premier Lift Group: homepage redesign (private prospect demo)

A one-page rebuild of [premierliftgroup.co.uk](https://www.premierliftgroup.co.uk/). It uses Premier's own vector wordmark, fonts, palette, photography, films and copy, restaged on three references:

- [luxury-places.ch](https://www.luxury-places.ch/): look and layout (one pale ground, centred capitals headline over a three-frame row, "mixed" blocks, property slider, header arrangement, buttons) and the copied interaction (its loader handover).
- [depoluxe.xyz](https://depoluxe.xyz/): motion (full-bleed film framed by a centred italic serif title, the staggered info fades, the thin progress line, the hairline link hover).
- [future-human.de](https://www.future-human.de/): restraint. Small type, few elements per screen, no decoration.

**Scope: homepage only.** Every other link points at the real page on premierliftgroup.co.uk.

Stack: Next.js 16 (App Router, TypeScript), GSAP + ScrollTrigger + CustomEase, and Lenis. No UI kit, CSS framework or other animation library. Plain CSS in `app/globals.css` and `styles/*.css`.

```bash
npm install
npm run dev        # http://127.0.0.1:3043
npm run build      # static build of the single route
npm run typecheck
npm run media      # re-download photos, logos and films and re-encode them (needs curl, sips, ffmpeg, yt-dlp)
npm run fonts      # self-host Helvetica Neue LT Std and Playfair Display as WOFF2 (needs python3 + fontTools)
npm run logo       # re-extract the vector wordmark into lib/logo.ts
npm run links      # check every outbound link against the live sitemap
```

## Routes

| Route | What |
|---|---|
| `/` | The homepage. Statically generated. |
| `/icon.svg` | Favicon: the wordmark's own P in Stone on Ink. |

`next build` generates `/`, `/_not-found` and `/icon.svg`. There are no archive or detail pages.

## Recon (phase 1)

**Live homepage (Webflow), every section:**

| # | Live section | Items |
|---|---|---|
| 1 | Hero: white logo, h1 "BESpOKE LIFT SOLUTIONs", slider | 3 photos |
| 2 | "Leaders in lift design": paragraph, "contact us", "work with" logos | 1 paragraph, 8 logos |
| 3 | "Lift collections": line, WATCH VIDEO (Vimeo lightbox), tiles | 6 collection tiles |
| 4 | Bespoke tile ("luxury lifts", EXPLORE) | 1 photo |
| 5 | Projects / Blog / About us tiles | 3 tiles (1 film, 2 photos) |
| 6 | Newsletter: title, line, email form, policy | 1 form |
| 7 | Footer: logo, 3 socials, 2 phones + email, address, 8 sitemap links, ISO + LEIA marks, copyright | |

Header: PRODUCT RANGE (dropdown of 6 collections with icons and one-line descriptions, plus "See our bespoke lifts"), BESPOKE LIFTS, Projects, BLOG, ABOUT US, Contact. Socials: Instagram, YouTube, LinkedIn.

**Inner pages used:** `/projects` (43 unique project cards; the first six are featured here), `/luxury-lifts` (Bespoke intro, Millepiani partnership, craft photos, "tell us about your project"), `/about-us` (the standards line). **Sitemap:** `/sitemap.xml` (85 URLs).

**Brand:**
- **Logo.** The header's `PREMIER_black.svg` is a real vector (Illustrator export): seven shapes, one per letter (six paths and the I as a polygon). `scripts/logo.mjs` writes them to `lib/logo.ts` left to right; `components/Logo.tsx` draws them in `currentColor` (light and dark versions come from the colour). There is no separate symbol: the letters are the mark, so the preloader builds them letter by letter.
- **Films.** The live films sit on Vimeo, which this network cannot reach. The same films are on Premier's YouTube channel: "Incredible Glass Lift" (hero, cropped out of its 2.4:1 letterbox, muted, 50s, 4.0MB) and "Lift Collections & Bespoke Lift Design" (the homepage's WATCH VIDEO, 3:06 with sound, 12.7MB). The projects tile's own short film comes from the Webflow CDN.
- **Fonts.** The live CSS self-hosts **Helvetica Neue LT Std** 55 Roman and 75 Bold (TTF on their CDN) and loads **Playfair Display** from Google for the "BESPOKE" headings. Both are self-hosted here as Latin-subset WOFF2 (`scripts/fonts.sh`).

## Decisions

| Bracket | Decision |
|---|---|
| Palette | **Ink** `#222222` (the wordmark's fill), **Gold** `#92794A` (the live CSS's bespoke colour), **Stone** `#F5F3F0` (the live pale band), **White**. Stone is the page ground, as Luxury Places sets its whole page on one pale ground. Not yet confirmed by the client; every value is theirs. |
| Look reference | luxury-places.ch |
| Motion reference | depoluxe.xyz; future-human.de for restraint |
| Copied interaction | Luxury Places' loader handover (below) |
| Preloader | Every load (house rule: loaders must be noticed), about 2.8s, with a gold progress line and counter |
| Typography | Helvetica Neue LT Std for UI, body and capitals headings; Playfair Display italic for the preloader-adjacent hero word "Bespoke", the Bespoke title, the film caption and the menu's bespoke link |
| PostHog key | The standing Regen EU key (`lib/posthog.ts`), overridable with `NEXT_PUBLIC_POSTHOG_KEY` |
| Slug / domain | Not given; Vercel and `{slug}.regendigital.co` are a separate step |

**Reference conflicts, resolved:**
- Luxury Places runs its category stack as a long pinned zoom (3,400px). House rule: only the hero may pin, and only briefly, so its zoom is the hero (90% of a screen).
- Luxury Places' headings are Poppins 200; Premier's site has only Helvetica Neue 55 and 75, so headings use 55 Roman at a slightly smaller scale.
- Depoluxe's films are full-screen, scene after scene. Here only the hero opens to full-bleed; Bespoke uses its framing (centred italic serif title) on a 74svh photo band.
- Luxury Places' section padding (up to 120px) is capped at 88px.

## Page structure and pacing

Seven sections plus the footer, image-led at the top. One Stone ground all the way (white only for panels, Ink for the footer). Nothing recolours as you scroll. Spacing: `--section-y: clamp(56px, 6.1vw, 88px)`.

| # | Section | Component | Imagery |
|---|---|---|---|
| 1 | Hero: "Bespoke / lift solutions", two buttons, three frames; the centre film opens to full-bleed | `Hero.tsx` | brand film + 2 photos |
| 2 | Leaders in lift design + "work with" logos | `About.tsx` | Aspinal photo + 8 logos |
| 3 | Lift collections + film dialog | `Collections.tsx`, `VideoDialog.tsx` | 6 photos + collections film |
| 4 | Bespoke: photo band with italic title, intro, craft row | `Bespoke.tsx` | 1 + 3 photos |
| 5 | Projects slider | `Projects.tsx` | projects film + 6 photos |
| 6 | Blog and About us tiles | `Explore.tsx` | 2 photos |
| 7 | Contact + newsletter | `Contact.tsx` | |
| 8 | Footer | `chrome.tsx` | ISO + LEIA marks |

**Page height** (production build, `document.documentElement.scrollHeight`):

| Width × height | Total | Viewport heights |
|---|---|---|
| 1440 × 900 | 7,528px (includes the 810px hero pin) | 8.4 |
| 768 × 1024 | 8,093px | 7.9 |
| 375 × 812 | 7,749px | 9.5 (single column; collections drop to a compact 2-column grid) |

## Content counts: live homepage vs this build

| Section | Live | Here | Note |
|---|---|---|---|
| Hero | h1 + 3 slider photos | h1 + 2 photos + film + 2 buttons | The third slider photo (Aspinal) leads "Leaders in lift design". |
| Leaders in lift design | paragraph, button, 8 logos | same + the /about-us standards line | |
| Lift collections | line, video, 6 tiles | same; each tile adds its live dropdown icon and description | The film plays on the page. |
| Bespoke | 1 tile | tile + /luxury-lifts intro + 3 craft photos | |
| Projects | 1 tile (film) | the tile's film + the first 6 of 43 projects | Cut to 6 for pacing; "All projects (43)" goes to /projects. |
| Blog, About us | 2 tiles | 2 tiles | |
| Newsletter | form | form (does not submit in the demo) | Sits beside a contact block from /luxury-lifts. |
| Footer | all of it | all of it | The address and phone labels lose their dashes (house rule). |

Copy is verbatim except: dashes removed, live typos fixed in display ("BESpOKE LIFT SOLUTIONs" → capitals by CSS; "SpeSafe precise delivery" → "Safe precise delivery").

## Copied interaction: Luxury Places' loader handover

Source: `luxury-places.ch/wp-content/themes/solanum/public/build/frontend/css/app.05abc0dd9887ec4c5b11.css` (`.loader`, `.loader-logo`, `@keyframes logoLoading / logoToHeader`). Rebuilt in `components/Preloader.tsx` + `styles/chrome.css`:

| Theirs | Here |
|---|---|
| `logoLoading`: the ring stroke fills, 1.6s `cubic-bezier(.6,0,.3,1)` | The gold line under the wordmark fills, same 1.6s and curve; a counter runs to 100 beside it |
| `logoToHeader`: the mark travels to the header, 1.2s `cubic-bezier(.75,0,.25,1)` | The wordmark travels into the header logo (measured at exit time), 0.9s, same curve |
| `.loader.hide`: ground fades (1.6s ease-out) while a 12px backdrop blur masked by a soft band sweeps (`--mask-pos` 110% → -10%, registered with `@property`) | Same mechanism, 0.9s |

The curves are CSS variables (`--ease-in-out`, `--ease-travel`) and GSAP CustomEases (`lift-in-out`, `lift-travel`). The header button (`.button`) is also Luxury Places' value for value: padding .625rem .75rem, radius .13rem, 12px capitals, muted count, only the label dims on hover (.3s ease-out).

Side by side: the Luxury Places loader never completes in headless Chrome, so the comparison is value for value against its CSS; its stages were inspected in the browser with the loader hidden.

## The opening moment (preloader)

The letters of PREMIER are cut from straight bars and quarter turns, like lift cars in a shaft, so each one rises into place from below its own baseline (the SVG's viewBox clips them), left to right.

| Time | Stage |
|---|---|
| 0.10 to 0.80s | P R E M I E R rise, 0.08s apart (lift-out) |
| 0.10 to 1.70s | the gold line fills and the counter runs 000 to 100 (Luxury Places' 1.6s) |
| +0.20s | hold |
| +0.90s | the wordmark travels into the header while the Stone ground clears through the blur band |

About 2.8s, never more than 3.6s (failsafe). It waits at most 0.4s more for the font and hero poster. Handover at exit + 0.15s: removes `is-loading`, sets `data-intro="done"`, dispatches `intro:done`. The hero entrance and Lenis wait for it. Plays on every load (boot script in `app/layout.tsx`), skipped with reduced motion, hidden by `<noscript>`. Checked in headless captures at 0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7 and 3.1s: no flash of the page or hero before it, no colour jump (both Stone).

## Hero

After Luxury Places' `.highlighted_properties`: headline and buttons centred in the upper part, three frames on the bottom edge. The centre frame is 39vw (their `grid-template-columns: 100% 39vw 100%`), the side photos 63% of its height, the gap their `--spacing-md`. The centre frame is one full-viewport film clipped to that rectangle, so on a 90%-of-a-screen pin the clip opens to full-bleed (no video resize), the side photos part and the headline lifts away. Past 82% the header turns white over the film and the italic caption "Scenic & glass lifts" fades in. Entrance on `intro:done`: lines and buttons fade up with Depoluxe's timing (.6/.7/.8s, .1s apart), the frame opens from the bottom, the side photos rise. Film: muted, pause control, paused off-screen, poster fallback, Depoluxe's progress hairline.

## Motion system

Smooth scroll: Lenis (`lerp .12`), on the GSAP ticker, synced with ScrollTrigger; anchors go through it; the preloader, menu and film dialog stop it.

| Move | Where | What |
|---|---|---|
| heading | section titles | the whole phrase fades and rises 24px, 1.1s, lift-out |
| text | paragraphs | each line's words fade up .4em, lines 0.1s apart, 0.9s |
| label | buttons, small lines | fade and 12px rise, 0.6s |
| card | logos, collection and project cards | batched 40px rise and fade, 0.1s apart, 0.9s |
| image | photos | clip opens from the bottom, 1.3s lift-in-out; `[data-parallax]` adds about 10% drift |

All play once. `[data-late]` sections (Explore, Contact) run at 75%. No per-character effects anywhere; no reveals in the footer. Header: no bar, colour from what is underneath, hides on scroll down, returns on scroll up. Menu: Stone sheet wipes down (.8s), columns fade in with Depoluxe's stagger, reverse to close, focus trapped, Esc closes, focus returns to the trigger.

## Private-demo settings

- `noindex, nofollow` in the layout metadata; no sitemap or robots route.
- PostHog EU (`lib/posthog.ts`): pageview, pageleave, autocapture, session recording, surveys off, `site` and UTM registration, `scroll_depth` at 25/50/75/100 once each. No visible UI.
- Links never navigate (house rule): hrefs are real and checked, a capture-phase guard cancels clicks. External links carry `target="_blank" rel="noopener"`.
- No Regen branding, no cookie banner.

## Links

`npm run links`: 29 links, 0 failed. Three live footer links are not in the live sitemap and are reported as known: `/dumbwaiter-lifts` and `/school-lifts` (200) and `/portal` (401, the client login).

## Verification (2026-10-09)

- `npm run typecheck` and `npm run build` pass: `/`, `/_not-found`, `/icon.svg`.
- 375, 768, 1440: no horizontal scroll, no console errors, no broken images.
- Reduced motion: no preloader, no smooth scroll, all content visible, film paused.
- Keyboard: menu opens from "Product range" (desktop) or "Menu" (tablet/phone), focus stays inside over 30 tabs, Esc closes and returns focus, menu section links scroll through Lenis.
- Built HTML has no em or en dashes and no `href="#"`.

## Where the images came from

All from Premier's own site (Webflow CDN `5de5569063e17beb5353952b`) and YouTube channel; see `scripts/media.sh` for every file. Photos are in natural colour, held at 92% saturation; the client and collection logos are drawn in Ink through CSS masks.
