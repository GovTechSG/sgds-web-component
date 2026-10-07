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
// SB 10: the copy button lives in ActionBar (sibling of the source wrapper),
// so we walk up to .sbdocs-preview and look for our container inside it.
document.addEventListener(
  "click",
  e => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn || btn.classList.contains("react-source-tab")) return;

    const btnText = btn.textContent?.trim() || "";
    if (!btnText.includes("Copy code") && btnText !== "Copy") return;

    // SB 10: copy button is in ActionBar (.sbdocs-preview-actions),
    // which is a sibling of .sbdocs-preview. Both share a common parent.
    const actionsBar = btn.closest(".sbdocs-preview-actions");
    const canvasParent = actionsBar?.parentElement ?? btn.closest(".sbdocs-preview");
    const container = canvasParent?.querySelector("[data-react-tabs-container]");
    if (!container) return;

    const getCode = containerCodeMap.get(container);
    if (!getCode) return;

    // Prevent Storybook's handler and write our own clipboard content
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(getCode()).then(() => {
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = "Copy code";
      }, 1500);
    });
  },
  true // capture phase to fire before Storybook's handler
);

function injectTabs(pre: HTMLElement) {
  if (pre.hasAttribute(PROCESSED_ATTR)) return;

  // Get code content from the inner div
  const codeDiv = pre.querySelector("div[class*='language-']") as HTMLElement;
  if (!codeDiv) return;

  const htmlCode = (pre.textContent || "").trim();

  // Only inject tabs for SGDS components (skip script-containing snippets)
  if (!htmlCode.includes("sgds-") || htmlCode.includes("<script")) return;

  const reactCode = htmlToReact(htmlCode);
  if (!reactCode) return;

  // Find the outermost source container (parent of the scroll area wrapper)
  // SB 10 DOM: pre.prismjs > div > div[radix] > div > div(sourceContainer)
  //            > div#react-aria > div.sbdocs-preview(.docs-story is inside here)
  const scrollWrapper = pre.closest("[data-radix-scroll-area-viewport]")?.parentElement;
  const sourceContainer = scrollWrapper?.parentElement;
  if (!sourceContainer) return;

  // Only inject tabs for Canvas blocks (which have a story preview sibling),
  // not standalone <Source> blocks in MDX documentation.
  // Walk up to the .sbdocs-preview container and check for .docs-story
  const canvasWrapper = pre.closest(".sbdocs-preview");
  if (!canvasWrapper?.querySelector(".docs-story")) return;

  // All checks passed — mark as processed to avoid re-injection
  pre.setAttribute(PROCESSED_ATTR, "true");

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

  // Insert tab bar before the scroll area wrapper, inside the source container
  // Ensure the source container has a block layout so the tab bar stacks above the code
  sourceContainer.style.display = "flex";
  sourceContainer.style.flexDirection = "column";
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

function processAll() {
  document.querySelectorAll<HTMLElement>("pre.prismjs").forEach(injectTabs);
}

function observe() {
  // Process existing
  processAll();

  // Watch for new elements AND content changes (SB 10 adds pre.prismjs first,
  // then populates content via React re-render)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const observer = new MutationObserver(() => {
    // Debounce to batch rapid mutations from React renders
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(processAll, 100);
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observe);
} else {
  observe();
}
