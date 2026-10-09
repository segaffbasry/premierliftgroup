/* One easing family for the whole site; the CSS twins are custom properties in app/globals.css.

   From luxury-places.ch (look reference), theme CSS app.05abc0dd9887ec4c5b11.css, read 2026-10-09:
     cubic-bezier(.6,0,.3,1)    the loader's logo stroke (logoLoading 1.6s) and six other in-out moves
     cubic-bezier(.75,0,.25,1)  logoToHeader (1.2s), the loader logo travelling to the header
     cubic-bezier(.16,1,.3,1)   its one out curve
     .3s ease-out               button text colour on hover
   From depoluxe.xyz (motion reference), main.b0b97476d709cb690ddf.css / main.d4f10deae0b58c57225e.js:
     --ease-out-quart cubic-bezier(.165,.84,.44,1), the project info lines fading in .6/.7/.8/.9s, .1s apart.
   So reveals run on the out curve, things that travel (menu, preloader, hero) on Luxury Places' in-out curves. */

export const EASE_OUT = "0.16,1,0.3,1"; // "lift-out": reveals
export const EASE_IN_OUT = "0.6,0,0.3,1"; // "lift-in-out": the loader line, menu, hero zoom
export const EASE_TRAVEL = "0.75,0,0.25,1"; // "lift-travel": the logo flying to the header

export const timing = {
  heading: 1.1, // single fade and 24px rise of the whole phrase
  rise: 24,
  text: 0.9, // per line, under a mask
  lineStagger: 0.1, // Depoluxe's info stagger
  label: 0.6, // Depoluxe's first info line (.6s)
  card: 0.9,
  cardStagger: 0.1,
  image: 1.3,
  late: 0.75, // multiplier inside [data-late] sections
};
