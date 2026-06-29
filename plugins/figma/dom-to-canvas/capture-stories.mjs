#!/usr/bin/env node
/**
 * Automated Storybook DOM Capture via Puppeteer
 *
 * Opens each component story in headless Chromium, runs the same
 * captureDom() logic as the Chrome extension, and saves JSON fixtures.
 *
 * Usage:
 *   node plugins/figma/dom-to-canvas/capture-stories.mjs
 *
 * Options:
 *   --base-url <url>   Storybook base URL (default: https://webcomponent.designsystem.tech.gov.sg)
 *   --filter <pattern> Only capture stories matching pattern (e.g. "button")
 *   --concurrency <n>  Parallel pages (default: 3)
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "__fixtures__");

// --- Parse CLI args ---
const args = process.argv.slice(2);
function getArg(name, defaultVal) {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : defaultVal;
}

const BASE_URL = getArg("base-url", "https://webcomponent.designsystem.tech.gov.sg");
const FILTER = getArg("filter", "");
const CONCURRENCY = parseInt(getArg("concurrency", "3"));

// --- captureDom function (same as Chrome extension popup.js) ---
// This runs inside the browser page context
function captureDom(maxDepth) {
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  function parseColor(color) {
    if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return null;
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        hex: rgbToHex(match[1], match[2], match[3]),
        r: parseInt(match[1]) / 255,
        g: parseInt(match[2]) / 255,
        b: parseInt(match[3]) / 255,
        a: match[4] !== undefined ? parseFloat(match[4]) : 1
      };
    }
    return null;
  }

  function parseShadow(shadow) {
    if (!shadow || shadow === "none") return null;
    const match = shadow.match(/([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px\s+(?:([\d.]+)px\s+)?(.+)/);
    if (match) {
      return {
        offsetX: parseFloat(match[1]),
        offsetY: parseFloat(match[2]),
        blur: parseFloat(match[3]),
        spread: match[4] ? parseFloat(match[4]) : 0,
        color: parseColor(match[5])
      };
    }
    return null;
  }

  function getNodeName(el) {
    if (el.id) return el.id;
    if (el.className && typeof el.className === "string") {
      const cls = el.className.trim();
      if (cls) return cls;
    }
    return el.tagName.toLowerCase();
  }

  function isVisible(el, style) {
    if (style.display === "none") return false;
    if (style.visibility === "hidden") return false;
    if (style.opacity === "0") return false;
    if (el.offsetWidth === 0 && el.offsetHeight === 0) return false;
    return true;
  }

  function captureNode(el, depth) {
    if (depth > maxDepth) return null;
    if (el.nodeType === Node.TEXT_NODE) {
      const text = el.textContent.trim();
      if (!text) return null;
      return { type: "text", text };
    }

    if (el.nodeType !== Node.ELEMENT_NODE) return null;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "META", "LINK", "HEAD"].includes(el.tagName)) return null;

    const style = getComputedStyle(el);
    if (!isVisible(el, style)) return null;

    const rect = el.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const tag = el.tagName.toLowerCase();
    const node = {
      type: "element",
      tag: tag,
      name: getNodeName(el),
      x: Math.round(rect.left + scrollX),
      y: Math.round(rect.top + scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      styles: {}
    };

    const slotAttr = el.getAttribute("slot");
    if (slotAttr) node.slot = slotAttr;

    if (tag.startsWith("sgds-")) {
      const attrs = {};
      for (const attr of el.attributes) {
        if (["class", "style", "slot", "id"].includes(attr.name)) continue;
        if (attr.name.startsWith("data-v-")) continue;
        attrs[attr.name] = attr.value === "" ? true : attr.value;
      }
      if (Object.keys(attrs).length > 0) node.attrs = attrs;
    }

    if (node.width === 0 || node.height === 0) return null;

    const bg = parseColor(style.backgroundColor);
    if (bg) node.styles.backgroundColor = bg;

    if (style.backgroundImage && style.backgroundImage !== "none") {
      const urlMatch = style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
      if (urlMatch) node.styles.backgroundImage = urlMatch[1];
    }

    const br = parseFloat(style.borderRadius);
    if (br > 0) node.styles.borderRadius = br;

    const bw = parseFloat(style.borderWidth);
    if (bw > 0) {
      node.styles.border = { width: bw, color: parseColor(style.borderColor), style: style.borderStyle };
    }

    const shadow = parseShadow(style.boxShadow);
    if (shadow) node.styles.boxShadow = shadow;

    const opacity = parseFloat(style.opacity);
    if (opacity < 1) node.styles.opacity = opacity;

    if (style.overflow === "hidden") node.styles.clipContent = true;

    if (el.tagName === "IMG" && el.src) {
      node.type = "image";
      node.imageSrc = el.src;
    }

    const directText = Array.from(el.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map(n => n.textContent.trim())
      .join(" ");

    if (directText && el.children.length === 0) {
      node.type = "text";
      node.text = directText;
      node.textStyles = {
        fontSize: parseFloat(style.fontSize),
        fontFamily: style.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
        fontWeight: style.fontWeight,
        color: parseColor(style.color),
        lineHeight: parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2,
        textAlign: style.textAlign,
        letterSpacing: parseFloat(style.letterSpacing) || 0
      };
    }

    if (el.children.length > 0 && node.type !== "text") {
      node.children = [];
      const hasTextSiblings = Array.from(el.childNodes).some(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );

      if (hasTextSiblings) {
        for (const childNode of el.childNodes) {
          if (childNode.nodeType === Node.TEXT_NODE) {
            const text = childNode.textContent.trim();
            if (text) {
              node.children.push({
                type: "text", tag: "#text", text: text,
                textStyles: {
                  fontSize: parseFloat(style.fontSize),
                  fontFamily: style.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
                  fontWeight: style.fontWeight,
                  color: parseColor(style.color),
                  lineHeight: parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2,
                  textAlign: style.textAlign,
                  letterSpacing: parseFloat(style.letterSpacing) || 0
                }
              });
            }
          } else if (childNode.nodeType === Node.ELEMENT_NODE) {
            const captured = captureNode(childNode, depth + 1);
            if (captured) node.children.push(captured);
          }
        }
      } else {
        for (const child of el.children) {
          const childNode = captureNode(child, depth + 1);
          if (childNode) node.children.push(childNode);
        }
      }
      if (node.children.length === 0) delete node.children;
    }

    return node;
  }

  const body = document.body;
  const root = captureNode(body, 0);

  root.pageWidth = document.documentElement.scrollWidth;
  root.pageHeight = document.documentElement.scrollHeight;
  root.width = document.documentElement.scrollWidth;
  root.height = document.documentElement.scrollHeight;
  root.title = document.title;
  root.url = window.location.href;
  root.theme = null;

  try {
    for (const sheet of document.styleSheets) {
      const href = sheet.href || "";
      const themeMatch = href.match(/themes\/([a-z]+)\/([a-z]+)\.css/);
      if (themeMatch) { root.theme = { agency: themeMatch[1], color: themeMatch[2] }; break; }
    }
  } catch (e) {}

  return root;
}

// --- Fetch story list from Storybook ---
async function fetchStoryList(browser) {
  const page = await browser.newPage();
  try {
    const res = await page.goto(`${BASE_URL}/index.json`, { waitUntil: "networkidle2", timeout: 30000 });
    const data = await res.json();
    const stories = Object.values(data.entries || data.stories || {});
    // Filter to component stories only
    return stories.filter(s => {
      const id = s.id || "";
      if (!id.startsWith("components-")) return false;
      if (FILTER && !id.toLowerCase().includes(FILTER.toLowerCase())) return false;
      return true;
    });
  } finally {
    await page.close();
  }
}

// --- Capture a single story ---
async function captureStory(browser, story) {
  const page = await browser.newPage();
  try {
    const url = `${BASE_URL}/iframe.html?id=${story.id}&viewMode=story`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Wait for custom elements to render
    await page.waitForFunction(() => {
      const sgdsElements = document.querySelectorAll("[class*='sgds'], sgds-button, sgds-card, sgds-alert, sgds-input");
      return sgdsElements.length > 0 || document.querySelector("[data-story]");
    }, { timeout: 10000 }).catch(() => {});

    // Small delay for web component rendering
    await new Promise(r => setTimeout(r, 500));

    // Run captureDom in page context
    const result = await page.evaluate(captureDom, 15);
    return result;
  } catch (e) {
    console.error(`  Error capturing ${story.id}: ${e.message}`);
    return null;
  } finally {
    await page.close();
  }
}

// --- Process stories in batches ---
async function processBatch(browser, stories, batchSize) {
  const results = [];
  for (let i = 0; i < stories.length; i += batchSize) {
    const batch = stories.slice(i, i + batchSize);
    const promises = batch.map(story => captureStory(browser, story).then(data => ({ story, data })));
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    console.log(`  Progress: ${Math.min(i + batchSize, stories.length)}/${stories.length}`);
  }
  return results;
}

// --- Main ---
async function main() {
  console.log("=== SGDS Storybook DOM Capture ===\n");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Filter: ${FILTER || "(all components)"}`);
  console.log(`Concurrency: ${CONCURRENCY}\n`);

  // Ensure fixtures directory exists
  if (!existsSync(FIXTURES_DIR)) {
    mkdirSync(FIXTURES_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });

  try {
    // Fetch story list
    console.log("Fetching story list...");
    const stories = await fetchStoryList(browser);
    console.log(`Found ${stories.length} component stories\n`);

    if (stories.length === 0) {
      console.log("No stories found. Check --base-url and --filter options.");
      return;
    }

    // Capture all stories
    console.log("Capturing stories...");
    const results = await processBatch(browser, stories, CONCURRENCY);

    // Save fixtures
    let saved = 0;
    let failed = 0;
    for (const { story, data } of results) {
      if (data) {
        const filename = `${story.id}.json`;
        writeFileSync(resolve(FIXTURES_DIR, filename), JSON.stringify(data));
        saved++;
      } else {
        failed++;
      }
    }

    console.log(`\n=== Done ===`);
    console.log(`  Saved: ${saved} fixtures`);
    console.log(`  Failed: ${failed}`);
    console.log(`  Output: ${FIXTURES_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch(e => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
