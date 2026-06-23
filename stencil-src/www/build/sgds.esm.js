import {
  B as BUILD,
  c as consoleDevInfo,
  H,
  w as win,
  N as NAMESPACE,
  p as promiseResolve,
  g as globalScripts,
  b as bootstrapLazy
} from "./index-CZw3wUWJ.js";
export { s as setNonce } from "./index-CZw3wUWJ.js";

/*
 Stencil Client Patch Browser v4.43.4 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  if (BUILD.isDev && !BUILD.isTesting) {
    consoleDevInfo("Running in development mode.");
  }
  if (BUILD.cloneNodeFix) {
    patchCloneNodeFix(H.prototype);
  }
  const scriptElm = BUILD.scriptDataOpts
    ? win.document &&
      Array.from(win.document.querySelectorAll("script")).find(
        s =>
          new RegExp(`/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
          s.getAttribute("data-stencil-namespace") === NAMESPACE
      )
    : null;
  const importMeta = import.meta.url;
  const opts = BUILD.scriptDataOpts ? (scriptElm || {})["data-opts"] || {} : {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};
var patchCloneNodeFix = HTMLElementPrototype => {
  const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
  HTMLElementPrototype.cloneNode = function (deep) {
    if (this.nodeName === "TEMPLATE") {
      return nativeCloneNodeFn.call(this, deep);
    }
    const clonedNode = nativeCloneNodeFn.call(this, false);
    const srcChildNodes = this.childNodes;
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        if (srcChildNodes[i].nodeType !== 2) {
          clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};

patchBrowser().then(async options => {
  await globalScripts();
  return bootstrapLazy(
    [
      [
        "sgds-spinner",
        [[1, "sgds-spinner", { tone: [513], variant: [513], size: [513], label: [513], orientation: [513] }]]
      ],
      [
        "sgds-button",
        [
          [
            257,
            "sgds-button",
            {
              variant: [513],
              tone: [513],
              size: [513],
              active: [516],
              disabled: [516],
              href: [513],
              target: [513],
              download: [513],
              ariaLabel: [1, "aria-label"],
              loading: [4],
              type: [513],
              form: [513],
              formAction: [513, "formaction"],
              formMethod: [513, "formmethod"],
              formNoValidate: [516, "formnovalidate"],
              formTarget: [513, "formtarget"],
              fullWidth: [516, "full-width"],
              hasLeftIconSlot: [1028, "has-left-icon-slot"],
              hasRightIconSlot: [1028, "has-right-icon-slot"],
              associatedForm: [32],
              setFocus: [64],
              setBlur: [64]
            }
          ]
        ]
      ]
    ],
    options
  );
});
//# sourceMappingURL=sgds.esm.js.map

//# sourceMappingURL=sgds.esm.js.map
