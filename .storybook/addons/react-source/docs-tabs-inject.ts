/**
 * Injects HTML/React tabs into Storybook's docs mode source blocks.
 * Targets `pre.prismjs` elements inside the Canvas source containers.
 *
 * Intercepts the native Storybook copy button so it copies only the
 * active tab's code (same behavior as the canvas mode panel).
 */
import { htmlToReact } from "./htmlToReact";

const PROCESSED_ATTR = "data-react-tabs";

// Store active tab code per container so the clipboard interceptor can read it
const containerCodeMap = new WeakMap<Element, () => string>();

// Intercept clipboard writes from native Storybook copy buttons.
// When a copy happens inside a processed container, override with the active tab's code.
document.addEventListener(
  "click",
  e => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn || btn.classList.contains("react-source-tab")) return;
    if (btn.textContent?.trim() !== "Copy") return;

    // Check if this button is inside one of our processed containers
    const container = btn.closest("[data-react-tabs-container]");
    if (!container) return;

    const getCode = containerCodeMap.get(container);
    if (!getCode) return;

    // Prevent Storybook's handler and write our own clipboard content
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(getCode()).then(() => {
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = "Copy";
      }, 1500);
    });
  },
  true // capture phase to fire before Storybook's handler
);

function injectTabs(pre: HTMLElement) {
  if (pre.hasAttribute(PROCESSED_ATTR)) return;
  pre.setAttribute(PROCESSED_ATTR, "true");

  // Get code content from the inner div
  const codeDiv = pre.querySelector("div[class*='language-']") as HTMLElement;
  if (!codeDiv) return;

  const htmlCode = (pre.textContent || "").trim();

  // Only inject tabs for SGDS components (skip script-containing snippets)
  if (!htmlCode.includes("sgds-") || htmlCode.includes("<script")) return;

  const reactCode = htmlToReact(htmlCode);
  if (!reactCode) return;

  // Find the outermost source container (parent of the scroll area wrapper)
  // Structure: div.css-* > div[dir="ltr"] > ... > pre.prismjs
  const scrollWrapper = pre.closest("[data-radix-scroll-area-viewport]")?.parentElement;
  const sourceContainer = scrollWrapper?.parentElement;
  if (!sourceContainer) return;

  // Mark the container for the clipboard interceptor
  sourceContainer.setAttribute("data-react-tabs-container", "true");

  // State
  let activeTab = "react";

  // Register code getter for clipboard interceptor
  containerCodeMap.set(sourceContainer, () => (activeTab === "react" ? reactCode : htmlCode));

  // Create tab bar
  const tabBar = document.createElement("div");
  tabBar.className = "react-source-tab-bar";
  tabBar.innerHTML = `
    <button class="react-source-tab active" data-tab="react">React</button>
    <button class="react-source-tab" data-tab="html">Others (Vue, Angular, HTML)</button>
  `;
  tabBar.style.cssText =
    "display:flex;gap:0;padding:0 12px;border-bottom:1px solid rgba(255,255,255,0.1);background:inherit;align-items:center;";

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
