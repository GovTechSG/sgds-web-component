/**
 * Injects HTML/React tabs into Storybook's docs mode source blocks.
 * Targets `pre.prismjs` elements inside the Canvas source containers.
 */
import { htmlToReact } from "./htmlToReact";

const PROCESSED_ATTR = "data-react-tabs";
const SEPARATOR = "\n\n// ─── React ───────────────────────────────────────\n\n";

function injectTabs(pre: HTMLElement) {
  if (pre.hasAttribute(PROCESSED_ATTR)) return;
  pre.setAttribute(PROCESSED_ATTR, "true");

  // Get code content from the inner div
  const codeDiv = pre.querySelector("div[class*='language-']") as HTMLElement;
  if (!codeDiv) return;

  const fullText = pre.textContent || "";

  // Check if this contains our separator (meaning transform already ran)
  if (!fullText.includes("// ─── React")) return;

  // Split into HTML and React parts
  const sepIndex = fullText.indexOf(SEPARATOR);
  if (sepIndex < 0) return;

  const htmlCode = fullText.substring(0, sepIndex);
  const reactCode = htmlToReact(htmlCode);

  // Find the outermost source container (parent of the scroll area wrapper)
  // Structure: div.css-* > div[dir="ltr"] > ... > pre.prismjs
  const scrollWrapper = pre.closest("[data-radix-scroll-area-viewport]")?.parentElement;
  const sourceContainer = scrollWrapper?.parentElement;
  if (!sourceContainer) return;

  // Create tab bar
  const tabBar = document.createElement("div");
  tabBar.className = "react-source-tab-bar";
  tabBar.innerHTML = `
    <button class="react-source-tab active" data-tab="react">React</button>
    <button class="react-source-tab" data-tab="html">Others (Vue, Angular, HTML)</button>
  `;
  tabBar.style.cssText =
    "display:flex;gap:0;padding:0 12px;border-bottom:1px solid rgba(255,255,255,0.1);background:inherit;";

  // Style the tab buttons
  tabBar.querySelectorAll(".react-source-tab").forEach(btn => {
    (btn as HTMLElement).style.cssText =
      "padding:8px 12px;font-size:12px;font-weight:400;border:none;border-bottom:2px solid transparent;background:transparent;cursor:pointer;color:rgba(255,255,255,0.6);font-family:inherit;";
  });
  const activeBtn = tabBar.querySelector(".active") as HTMLElement;
  if (activeBtn) {
    activeBtn.style.fontWeight = "600";
    activeBtn.style.color = "#fff";
    activeBtn.style.borderBottomColor = "#2563eb";
  }

  // Insert tab bar before the scroll area
  sourceContainer.insertBefore(tabBar, sourceContainer.firstChild);

  // State
  let activeTab = "react";

  // Initially show React code
  codeDiv.innerHTML = highlightReact(reactCode);

  // Tab click handler
  tabBar.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("react-source-tab")) return;

    const tab = target.dataset.tab;
    if (!tab || tab === activeTab) return;
    activeTab = tab;

    // Update active styles
    tabBar.querySelectorAll(".react-source-tab").forEach(btn => {
      const el = btn as HTMLElement;
      const isActive = el.dataset.tab === tab;
      el.style.fontWeight = isActive ? "600" : "400";
      el.style.color = isActive ? "#fff" : "rgba(255,255,255,0.6)";
      el.style.borderBottomColor = isActive ? "#2563eb" : "transparent";
    });

    // Update code content
    codeDiv.innerHTML = tab === "html" ? highlightHtml(htmlCode) : highlightReact(reactCode);
  });
}

/** Simple syntax coloring for HTML code (reuses Storybook's token classes) */
function highlightHtml(code: string): string {
  return escapeHtml(code)
    .replace(/(&lt;\/?)([\w-]+)/g, '<span class="token tag punctuation">$1</span><span class="token tag">$2</span>')
    .replace(
      /([\w-]+)(=)(&quot;)([^&]*?)(&quot;)/g,
      '<span class="token tag attr-name">$1</span><span class="token tag attr-value punctuation attr-equals">$2</span><span class="token tag attr-value punctuation">$3</span><span class="token tag attr-value">$4</span><span class="token tag attr-value punctuation">$5</span>'
    )
    .replace(/(&gt;)/g, '<span class="token tag punctuation">$1</span>');
}

/** Simple syntax coloring for React/JSX code */
function highlightReact(code: string): string {
  return escapeHtml(code)
    .replace(/^(import .+)$/gm, '<span class="token keyword">$1</span>')
    .replace(/(&lt;\/?)([\w]+)/g, '<span class="token tag punctuation">$1</span><span class="token tag">$2</span>')
    .replace(
      /([\w]+)(=)(&quot;)([^&]*?)(&quot;)/g,
      '<span class="token tag attr-name">$1</span><span class="token tag attr-value punctuation attr-equals">$2</span><span class="token tag attr-value punctuation">$3</span><span class="token tag attr-value">$4</span><span class="token tag attr-value punctuation">$5</span>'
    )
    .replace(/(&gt;)/g, '<span class="token tag punctuation">$1</span>');
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function observe() {
  // Process existing
  document.querySelectorAll<HTMLElement>("pre.prismjs").forEach(injectTabs);

  // Watch for new ones
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.matches?.("pre.prismjs")) {
          injectTabs(node);
        }
        node.querySelectorAll<HTMLElement>("pre.prismjs").forEach(injectTabs);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observe);
} else {
  observe();
}
