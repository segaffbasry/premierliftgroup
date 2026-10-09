// Checks every outbound link in lib/site.ts and lib/content.ts.
//   premierliftgroup.co.uk pages must be listed in the live /sitemap.xml and answer 200 (the homepage is listed
//   without its trailing slash). Other hosts must answer 2xx/3xx (LinkedIn and Instagram often refuse scripts:
//   999/429 are reported as such, not failed). tel: and mailto: links are not fetched.
// Run: npm run links
import { readFileSync } from "node:fs";

const LIVE = "https://www.premierliftgroup.co.uk";
const sources = ["lib/site.ts", "lib/content.ts"].map((f) => readFileSync(f, "utf8")).join("\n").replaceAll("${LIVE}", LIVE);
const urls = [...new Set([...sources.matchAll(/https?:\/\/[^"'`\s)]+/g)].map((m) => m[0]))]
  .filter((u) => !u.includes("cdn.prod.website-files.com")).sort();

const map = await (await fetch(`${LIVE}/sitemap.xml`)).text();
const listed = new Set([...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/\/$/, "")));

// Live footer links its own sitemap leaves out (checked 2026-10-09): two live pages (200) and the client portal,
// which answers 401 until you sign in. Kept so the footer matches the live one; reported as "known".
const KNOWN = new Map([[`${LIVE}/dumbwaiter-lifts`, 200], [`${LIVE}/school-lifts`, 200], [`${LIVE}/portal`, 401]]);

let failed = 0;
for (const url of urls) {
  const own = url.startsWith(LIVE);
  const inMap = own && listed.has(url.replace(/\/$/, ""));
  let status = 0;
  try { status = (await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (Macintosh) Chrome/130 link-check" } })).status; } catch { status = 0; }
  const known = KNOWN.get(url) === status;
  const ok = known || own ? known || (status === 200 && inMap) : (status >= 200 && status < 400) || status === 999 || status === 429;
  if (!ok) failed++;
  console.log(`${known ? "KNWN" : ok ? "ok  " : "FAIL"} ${status} ${own ? (inMap ? "in-sitemap" : "NOT-IN-MAP") : "external  "} ${url}`);
}
console.log(`\n${urls.length} links, ${failed} failed`);
process.exit(failed ? 1 : 0);
