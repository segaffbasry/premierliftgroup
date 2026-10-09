import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";
import "@/styles/ui.css";
import "@/styles/chrome.css";
import "@/styles/hero.css";
import "@/styles/home.css";

// Title and description: the live homepage's own <title> (premierliftgroup.co.uk); it publishes no meta description,
// so the description is the live "Leaders in lift design" line.
export const metadata: Metadata = {
  title: "Premier Lifts | Bespoke Lift Solutions & Cutting-Edge Lift Design",
  description: "We manufacture and install some of the most technically advanced and aesthetically pleasing lifts on the market.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#F5F3F0" };

/* `js` (and the preloader's `is-loading`/`is-landing`) is set before first paint, unless reduced motion is requested,
   so reveal targets start hidden without a flash. Without JavaScript the classes are never added and everything
   renders in place; the <noscript> style hides the preloader. */
const boot = "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js','is-loading','is-landing')";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" data-header="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/hn-roman.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/pf-italic.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero-poster.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body><Shell>{children}</Shell></body>
    </html>
  );
}
