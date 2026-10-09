#!/bin/sh
# Downloads every photo, logo and film the homepage uses from the live site (Webflow CDN) and Premier's YouTube
# channel, then resizes them for the web. Needs curl, sips (macOS), ffmpeg and yt-dlp.
#   npm run media
# The homepage's own films sit on Vimeo (vimeo.com/423084346 and the /about-us loops), which this network cannot
# reach; the same films are published on Premier's YouTube channel (UCQ0BjTkRZ5tKzCMT98fuxAQ), so they come from there.
set -e
CDN="https://cdn.prod.website-files.com/5de5569063e17beb5353952b"
OUT="public/media"
TMP="${TMPDIR:-/tmp}/premier-media"
mkdir -p "$OUT" "$OUT/logos" "$TMP"

# photo <name> <cdn file> [max px]: download once, resize the long edge, save as JPEG (quality 78).
photo() {
  [ -f "$TMP/$1.src" ] || curl -sfL "$CDN/$2" -o "$TMP/$1.src"
  sips -s format jpeg -s formatOptions 78 -Z "${3:-2000}" "$TMP/$1.src" --out "$OUT/$1.jpg" >/dev/null
}
# asset <path> <cdn file>: copied as served (SVG/PNG logos and marks).
asset() { curl -sfL "$CDN/$2" -o "$OUT/$1"; }

# Hero slider (live homepage, .img-slider), in the live order.
photo hero-luxury "5f0f1c308e420ec92c4480d0_LUXURY%20LIFT%20%20-%20HERO.jpg"
photo hero-hill-street "5eac0ed3b6d3c70a28481b5f_P_HS_15.jpg"
photo hero-aspinal "5eb57c7a5c02e653c6e7702d_P_ASP_5.jpg"

# Leaders in lift design: the about-us cover photo (also the homepage's "about us" tile is about-us-cover).
photo about "5fb3a83ac434076c35ebebc6_Premier-Lift-Group-About-Us.jpg" 1600

# Lift collections: the six tile backgrounds from the live CSS (.collection-tile-text-wrap.*) + the bespoke tile.
photo col-home "5fb53a38728198637bbe2560_Home-Lift-Premier-Lift-Group.jpg" 1400
photo col-public "5ec4065c9eecb786539b92c5_38_3_1-8.jpg" 1400
photo col-passenger "5fb538e33811f33f1ea749e7_Passenger-Lift-Premier-Lift-Group.jpg" 1400
photo col-goods "5f93f93f20465e54748a8a44_Goods-Lift.jpg" 1400
photo col-step "5f94252fa70b66353de63071_Step-Lift.jpg" 1400
photo col-vehicle "5f943fdb43200f839e997d4e_Vehicle-Lift.jpg" 1400
photo bespoke "5fae9c680c55818a22d2a3f8_Bespoke-Scenic-Glass-Lift-Circular.jpg" 2200

# Bespoke craft (from /luxury-lifts "Expert design and craftsmanship").
photo craft-sewing "5ef4d1cfc935183edc90d629_Best-Leather-Sewing-Machine.jpg" 1000
photo craft-mill "5ef4e82227151e3799ddf422_MILL.jpg" 1000
photo craft-leather "5ef777cebdbac1475ecdcff4_leather.jpg" 1000

# Selected projects: the first six on /projects, their own thumbnails.
photo pr-hill-street "5f95b278632fcac429a92673_Bespoke-Scenic-Glass-Lift-Hill-Street.jpg" 1200
photo pr-edgecroft "5f95b2783bcbdcc9ea5ac72d_Bespoke-Scenic-Glass-Lift-Edgecroft.jpg" 1200
photo pr-royal-yacht "5f95b27943200fda429ce50b_Bespoke-Yacht-and-Marine-Lift.jpg" 1200
photo pr-farthings "643d1397dd96540a45dc9f6a_Luxury-glass-circular-lift-staircase.jpg" 1200
photo pr-sb-tower "5e88dbb0fbc2c0880dd3f386_zha_sbt_lobby_indoor_groundfloor2_lowres.jpg" 1200
photo pr-sw1w "6549150f976cd800cb42c5b6_Bespoke%20Glass%20Lift%20Structure%20Staircase%20-08.jpg" 1200

# Explore tiles (live homepage): blog cover, about-us cover, and the projects film with its poster.
photo tile-blog "5f02e4a93319a34d3544b9d9_blog-cover-blue.jpg" 1200
photo tile-about "5f02ee6d7bc6f83eeb4bac24_about-us-cover.jpg" 1200
photo tile-projects-poster "5f02ea1ef7afea42d3f3094f_projects-darken-poster-00001.jpg" 1200
curl -sfL "$CDN/5f02ea1ef7afea42d3f3094f_projects-darken-transcode.mp4" -o "$TMP/projects.mp4"
ffmpeg -v error -y -i "$TMP/projects.mp4" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/tile-projects.mp4"

# "We work with" logos (live homepage, in order) and the accreditation marks (footer + /about-us).
asset logos/marriott.svg "5f072c9db8efc17001e4023e_work-with__MARRIOT.svg"
asset logos/foster-partners.svg "5f072c9d4f4ecc063a53c5f1_work-with__F%2BP.svg"
asset logos/zaha-hadid.svg "5f072c9db853bc467f291155_work-with__ZHA.svg"
asset logos/heatherwick.svg "5f072c9d9bef5c9e14f2e3b6_work-with__HW.svg"
asset logos/porsche.svg "5f072c9d7e1ba3c5632c463f_work-with__PORSCHE.svg"
asset logos/man-utd.svg "5f072f39b359d4e5d0f9a4d8_work-with__mufc.svg"
asset logos/savoy.svg "5f072c9d959bf3908206d0c7_work-with__SAVOY.svg"
asset logos/mawd.svg "5f072c9dd8a42e247a31abdd_work-with__MAWD.svg"
asset cert-iso.png "63317e767f6beb0bb8adc97e_iso-inverted-revised.png"
asset cert-leia.svg "66b383103343f701529b5b1d_LEIA-pREMIER-01.svg"

# Collection icons (live nav dropdown, .nav-link-icon).
asset icon-home.svg "602e93bdde741ef6b028585c_home-lifts.svg"
asset icon-public.svg "602e93d3b48fabf6ab696051_public-lifts.svg"
asset icon-passenger.svg "602e93d3fda36a7dc4cba923_passenger-lifts.svg"
asset icon-goods.svg "602e93d31ca547ee5e05289b_goods-lifts.svg"
asset icon-step.svg "602e93d3ec8bee6bf77bc5f7_step-%26-incline-lifts.svg"
asset icon-vehicle.svg "602e93d3f05c4c39aaf8da53_vehicle-lifts.svg"

# Films (YouTube channel). Hero: "Incredible Glass Lift from Premier Lift Group UK" (elPK2usK5to), cropped out of
# its 2.4:1 letterbox (ffmpeg cropdetect: 1920x800+0+140), the opening logo card cut (starts at 5s), muted.
# Lightbox: "Lift Collections & Bespoke Lift Design" (ThyWUzk8Ez4), the live homepage's WATCH VIDEO, with sound.
[ -f "$TMP/glass.mp4" ] || yt-dlp -q -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" -o "$TMP/glass.mp4" "https://www.youtube.com/watch?v=elPK2usK5to"
[ -f "$TMP/collections.mp4" ] || yt-dlp -q -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" -o "$TMP/collections.mp4" "https://www.youtube.com/watch?v=ThyWUzk8Ez4"
ffmpeg -v error -y -ss 5 -t 50 -i "$TMP/glass.mp4" -an -vf "crop=1920:800:0:140,scale=1600:-2,fps=25" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero.mp4"
ffmpeg -v error -y -ss 9 -i "$TMP/glass.mp4" -frames:v 1 -vf "crop=1920:800:0:140,scale=1600:-2" -q:v 4 "$OUT/hero-poster.jpg"
ffmpeg -v error -y -i "$TMP/collections.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "$OUT/collections.mp4"
ffmpeg -v error -y -ss 168 -i "$TMP/collections.mp4" -frames:v 1 -vf "scale=1280:-2" -q:v 4 "$OUT/collections-poster.jpg"
ls -la "$OUT"
