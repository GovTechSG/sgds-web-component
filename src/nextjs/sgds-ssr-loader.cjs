/**
 * Tiny webpack/Turbopack loader that prepends an _ssr-init side-effect
 * import to every matched file. This patches React globally for DSD
 * rendering before any SGDS component renders.
 */
module.exports = function sgdsSsrLoader(source) {
  return `import '@govtechsg/sgds-web-component/react/_ssr-init';\n${source}`;
};
