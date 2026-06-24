const captureBtn = document.getElementById("capture");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const statsEl = document.getElementById("stats");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const maxDepthInput = document.getElementById("max-depth");

let capturedData = null;

captureBtn.addEventListener("click", capture);
copyBtn.addEventListener("click", copyToClipboard);
downloadBtn.addEventListener("click", downloadJson);

async function capture() {
  captureBtn.disabled = true;
  resultEl.classList.add("hidden");
  showStatus("Capturing page DOM...", "loading");

  try {
    const maxDepth = parseInt(maxDepthInput.value) || 15;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: captureDom,
      args: [maxDepth]
    });

    capturedData = results[0]?.result;

    if (!capturedData) throw new Error("No data returned");

    const nodeCount = countNodes(capturedData);
    statsEl.textContent = `Captured: ${nodeCount} nodes | Page: ${capturedData.width}x${capturedData.height}px`;
    resultEl.classList.remove("hidden");
    showStatus("Capture complete!", "success");
  } catch (err) {
    showStatus(`Error: ${err.message}`, "error");
  } finally {
    captureBtn.disabled = false;
  }
}

async function copyToClipboard() {
  if (!capturedData) return;
  const json = JSON.stringify(capturedData);
  await navigator.clipboard.writeText(json);
  showStatus(`Copied! (${(json.length / 1024).toFixed(0)} KB)`, "success");
}

function downloadJson() {
  if (!capturedData) return;
  const json = JSON.stringify(capturedData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dom-capture-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function countNodes(node) {
  let count = 1;
  if (node.children) {
    for (const child of node.children) count += countNodes(child);
  }
  return count;
}

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = `status ${type}`;
  statusEl.classList.remove("hidden");
  if (type === "success") setTimeout(() => statusEl.classList.add("hidden"), 4000);
}

// This function runs in the PAGE context
function captureDom(maxDepth) {
  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map(x => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
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
      // Keep ALL classes — the plugin needs them for token parsing (bg, spacing, flex, etc.)
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

    // Capture slot attribute (critical for SGDS component slot mapping)
    const slotAttr = el.getAttribute("slot");
    if (slotAttr) node.slot = slotAttr;

    // Capture component attributes/props for SGDS custom elements
    if (tag.startsWith("sgds-")) {
      const attrs = {};
      for (const attr of el.attributes) {
        // Skip internal/framework attrs, class (already in name), style, slot (captured above)
        if (["class", "style", "slot", "id"].includes(attr.name)) continue;
        if (attr.name.startsWith("data-v-")) continue; // Vue scoped
        attrs[attr.name] = attr.value === "" ? true : attr.value;
      }
      if (Object.keys(attrs).length > 0) node.attrs = attrs;
    }

    // Skip zero-size elements
    if (node.width === 0 || node.height === 0) return null;

    // Background
    const bg = parseColor(style.backgroundColor);
    if (bg) node.styles.backgroundColor = bg;

    // Background image
    if (style.backgroundImage && style.backgroundImage !== "none") {
      const urlMatch = style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
      if (urlMatch) node.styles.backgroundImage = urlMatch[1];
    }

    // Border radius
    const br = parseFloat(style.borderRadius);
    if (br > 0) node.styles.borderRadius = br;

    // Border
    const bw = parseFloat(style.borderWidth);
    if (bw > 0) {
      node.styles.border = {
        width: bw,
        color: parseColor(style.borderColor),
        style: style.borderStyle
      };
    }

    // Shadow
    const shadow = parseShadow(style.boxShadow);
    if (shadow) node.styles.boxShadow = shadow;

    // Opacity
    const opacity = parseFloat(style.opacity);
    if (opacity < 1) node.styles.opacity = opacity;

    // Overflow (for clipping)
    if (style.overflow === "hidden") node.styles.clipContent = true;

    // Images
    if (el.tagName === "IMG" && el.src) {
      node.type = "image";
      node.imageSrc = el.src;
    }

    // Text content (leaf text nodes)
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

    // Children — use childNodes to capture interleaved text nodes and elements
    if (el.children.length > 0 && node.type !== "text") {
      node.children = [];
      // Check if there are mixed text nodes + elements (e.g. "Description with <a>link</a>")
      const hasTextSiblings = Array.from(el.childNodes).some(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );

      if (hasTextSiblings) {
        // Mixed content: iterate childNodes to preserve text + element order
        for (const childNode of el.childNodes) {
          if (childNode.nodeType === Node.TEXT_NODE) {
            const text = childNode.textContent.trim();
            if (text) {
              node.children.push({
                type: "text",
                tag: "#text",
                text: text,
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
        // No text siblings: only elements (original behavior)
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

  // Add page metadata
  root.pageWidth = document.documentElement.scrollWidth;
  root.pageHeight = document.documentElement.scrollHeight;
  root.width = document.documentElement.scrollWidth;
  root.height = document.documentElement.scrollHeight;
  root.title = document.title;
  root.url = window.location.href;

  // Detect SGDS theme from stylesheets
  // Looks for imports like @govtechsg/sgds-web-component/themes/gt/pink.css
  root.theme = null;
  try {
    for (const sheet of document.styleSheets) {
      const href = sheet.href || "";
      // Match theme path: /themes/{agency}/{color}.css
      const themeMatch = href.match(/themes\/([a-z]+)\/([a-z]+)\.css/);
      if (themeMatch) {
        root.theme = { agency: themeMatch[1], color: themeMatch[2] };
        break;
      }
    }
    // Also check <link> tags directly (for cases where styleSheets API doesn't expose href)
    if (!root.theme) {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of links) {
        const themeMatch = link.href.match(/themes\/([a-z]+)\/([a-z]+)\.css/);
        if (themeMatch) {
          root.theme = { agency: themeMatch[1], color: themeMatch[2] };
          break;
        }
      }
    }
    // Check inline <style> imports (@import url(...themes/...))
    if (!root.theme) {
      const styles = document.querySelectorAll("style");
      for (const style of styles) {
        const themeMatch = style.textContent.match(/themes\/([a-z]+)\/([a-z]+)\.css/);
        if (themeMatch) {
          root.theme = { agency: themeMatch[1], color: themeMatch[2] };
          break;
        }
      }
    }

    // Fallback: detect theme from computed CSS custom property values
    // Each SGDS theme has a unique --sgds-primary-bg-default value
    if (!root.theme) {
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryBg = rootStyles.getPropertyValue("--sgds-primary-bg-default").trim();
      const primaryColor = rootStyles.getPropertyValue("--sgds-primary-color-default").trim();

      // Known theme primary colors (from theme CSS files)
      const THEME_COLORS = {
        // GT themes
        "rgb(153, 31, 82)": { agency: "gt", color: "pink" },
        "#991f52": { agency: "gt", color: "pink" },
        "rgb(0, 107, 84)": { agency: "gt", color: "green" },
        "#006b54": { agency: "gt", color: "green" },
        "rgb(31, 105, 255)": { agency: "gt", color: "blue" },
        "#1f69ff": { agency: "gt", color: "blue" },
        "rgb(117, 59, 189)": { agency: "gt", color: "purple" },
        "#753bbd": { agency: "gt", color: "purple" },
        "rgb(196, 69, 0)": { agency: "gt", color: "orange" },
        "#c44500": { agency: "gt", color: "orange" }
      };

      if (primaryBg && THEME_COLORS[primaryBg]) {
        root.theme = THEME_COLORS[primaryBg];
      } else if (primaryColor && THEME_COLORS[primaryColor]) {
        root.theme = THEME_COLORS[primaryColor];
      }
    }
  } catch (e) {}

  return root;
}
