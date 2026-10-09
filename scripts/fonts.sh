#!/bin/sh
# Self-hosts Premier's own fonts, as the live site loads them:
#   Helvetica Neue LT Std 55 Roman + 75 Bold  @font-face in the live Webflow CSS (premiernew.webflow.shared.*.css),
#                                             served as TTF from their CDN; converted to WOFF2, Latin subset
#   Playfair Display (OFL)                    WebFont.load({ google: { families: ["Playfair Display:300,400,500,600,700"] } })
#                                             on the live homepage; the variable roman + italic, Latin subset
# Needs python3 with fontTools + brotli. Run: npm run fonts
set -e
CDN="https://cdn.prod.website-files.com/5de5569063e17beb5353952b"
TMP="${TMPDIR:-/tmp}/premier-fonts"; mkdir -p "$TMP" public/fonts
curl -sfL "$CDN/5e8da8f6a1b1cc04f48dd8fd_HelveticaNeueLTStd55Roman_22526.ttf" -o "$TMP/hn-roman.ttf"
curl -sfL "$CDN/5e8da57c030ea43bf159ae60_HelveticaNeueLTStd75Bold_22539.ttf" -o "$TMP/hn-bold.ttf"
curl -sfL "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf" -o "$TMP/pf.ttf"
curl -sfL "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay-Italic%5Bwght%5D.ttf" -o "$TMP/pf-italic.ttf"
U="U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212"
for f in hn-roman hn-bold pf pf-italic; do
  python3 -m fontTools.subset "$TMP/$f.ttf" --unicodes="$U" --flavor=woff2 --layout-features='*' --output-file="public/fonts/$f.woff2"
done
ls -la public/fonts
