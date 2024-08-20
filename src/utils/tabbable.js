/** Determines if the specified element is tabbable using heuristics inspired by https://github.com/focus-trap/tabbable */
function isTabbable(el) {
    const tag = el.tagName.toLowerCase();
    // Elements with a -1 tab index are not tabbable
    if (el.getAttribute("tabindex") === "-1") {
        return false;
    }
    // Elements with a disabled attribute are not tabbable
    if (el.hasAttribute("disabled")) {
        return false;
    }
    // Elements with aria-disabled are not tabbable
    if (el.hasAttribute("aria-disabled") && el.getAttribute("aria-disabled") !== "false") {
        return false;
    }
    // Radios without a checked attribute are not tabbable
    if (tag === "input" && el.getAttribute("type") === "radio" && !el.hasAttribute("checked")) {
        return false;
    }
    // Elements that are hidden have no offsetParent and are not tabbable
    if (el.offsetParent === null) {
        return false;
    }
    // Elements without visibility are not tabbable
    if (window.getComputedStyle(el).visibility === "hidden") {
        return false;
    }
    // Audio and video elements with the controls attribute are tabbable
    if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
        return true;
    }
    // Elements with a tabindex other than -1 are tabbable
    if (el.hasAttribute("tabindex")) {
        return true;
    }
    // Elements with a contenteditable attribute are tabbable
    if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
        return true;
    }
    // At this point, the following elements are considered tabbable
    return ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(tag);
}
/**
 * Returns the first and last bounding elements that are tabbable. This is more performant than checking every single
 * element because it short-circuits after finding the first and last ones.
 */
export function getTabbableBoundary(root) {
    var _a, _b;
    const allElements = [];
    function walk(el) {
        if (el instanceof HTMLElement) {
            allElements.push(el);
            if (el.shadowRoot !== null && el.shadowRoot.mode === "open") {
                walk(el.shadowRoot);
            }
        }
        [...el.children].forEach((e) => walk(e));
    }
    // Collect all elements including the root
    walk(root);
    // Find the first and last tabbable elements
    const start = (_a = allElements.find(el => isTabbable(el))) !== null && _a !== void 0 ? _a : null;
    const end = (_b = allElements.reverse().find(el => isTabbable(el))) !== null && _b !== void 0 ? _b : null;
    return { start, end };
}
//# sourceMappingURL=tabbable.js.map