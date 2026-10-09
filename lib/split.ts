/* Text splitting for the reveal system, modelled on on.energy's use of GSAP SplitText (its Nuxt bundle, 2026-10-09):
     BlurReveal  new SplitText(el, { type: "lines" }), then each line split again into chars
     CopyReveal  new SplitText(el.firstElementChild, { type: "lines" })
   Here text nodes are wrapped in word spans (kept whole with white-space: nowrap so a word never breaks between
   characters), words are grouped into the lines the browser laid them out on, and chars are wrapped on request.
   The original markup is kept for revert(); the split spans are aria-hidden and a visually hidden copy of the plain text is read instead. */

export type Split = { words: HTMLElement[]; lines: HTMLElement[][]; chars: HTMLElement[][]; revert: () => void };

export function splitText(root: HTMLElement, { chars = false } = {}): Split {
  const original = root.innerHTML;
  const text = root.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { fragment.appendChild(document.createTextNode(" ")); return; }
          const word = document.createElement("span");
          word.className = "sw";
          word.setAttribute("aria-hidden", "true");
          if (chars) Array.from(part).forEach((ch) => { const c = document.createElement("span"); c.className = "sc"; c.textContent = ch; word.appendChild(c); });
          else word.textContent = part;
          words.push(word);
          fragment.appendChild(word);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== "BR") {
        walk(child);
      }
    });
  };
  walk(root);
  const plain = document.createElement("span");
  plain.className = "sr-only";
  plain.textContent = text;
  root.prepend(plain);
  // One group per rendered line, by each word's top edge.
  const lines: HTMLElement[][] = [];
  let top = Number.NaN;
  words.forEach((word) => {
    const y = word.getBoundingClientRect().top;
    if (Number.isNaN(top) || Math.abs(y - top) > 4) { lines.push([]); top = y; }
    lines[lines.length - 1].push(word);
  });
  const charLines = chars ? lines.map((line) => line.flatMap((w) => Array.from(w.children) as HTMLElement[])) : [];
  return {
    words, lines, chars: charLines,
    revert: () => { root.innerHTML = original; },
  };
}

/* Masked lines: the text is split into the lines the browser laid it out on, and each line is rebuilt as
   <span class="sl"><span class="sli">…</span></span>. The outer span clips (overflow: clip), so the inner one can
   rise from below its own edge. Inline elements (an <em>, a link) are cloned around the words they held, so styling
   survives. revert() restores the original markup once the reveal has played, so later resizes reflow normally. */
export type LineSplit = { lines: HTMLElement[]; revert: () => void };

export function splitLines(root: HTMLElement): LineSplit {
  const original = root.innerHTML;
  const { words, lines: groups } = splitText(root);
  const chainOf = (word: HTMLElement) => {
    const chain: Element[] = [];
    for (let n = word.parentElement; n && n !== root; n = n.parentElement) chain.unshift(n);
    return chain;
  };
  const plain = root.querySelector(".sr-only");
  const fragment = document.createDocumentFragment();
  const inners: HTMLElement[] = [];
  groups.forEach((line) => {
    const outer = document.createElement("span");
    outer.className = "sl";
    outer.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "sli";
    outer.appendChild(inner);
    let openChain: Element[] = [];
    let clones: Element[] = [];
    line.forEach((word, i) => {
      const chain = chainOf(word);
      // Reuse the clones shared with the previous word; clone the rest of this word's ancestors.
      let keep = 0;
      while (keep < chain.length && keep < openChain.length && chain[keep] === openChain[keep]) keep++;
      clones = clones.slice(0, keep);
      for (let k = keep; k < chain.length; k++) {
        const clone = chain[k].cloneNode(false) as Element;
        (clones[k - 1] ?? inner).appendChild(clone);
        clones.push(clone);
      }
      openChain = chain;
      const host = clones[clones.length - 1] ?? inner;
      if (i > 0) host.appendChild(document.createTextNode(" "));
      host.appendChild(word);
    });
    inners.push(inner);
    fragment.appendChild(outer);
  });
  root.innerHTML = "";
  if (plain) root.appendChild(plain);
  root.appendChild(fragment);
  void words;
  return { lines: inners, revert: () => { root.innerHTML = original; } };
}
