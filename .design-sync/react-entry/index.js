// design-sync bundle+types entry: the SGDS React wrappers are the components a
// React design agent renders. Each wrapper imports its core web component,
// which registers the <sgds-*> custom element as a side effect — so this single
// re-export both exposes the React API on window.<GLOBAL> AND registers every
// custom element (needed for the lit-html story previews). Do NOT also re-export
// ../../lib/index.js: it registers the same elements a second time, and the
// components call customElements.define() unguarded, so a duplicate define
// throws "already used with this registry".
export * from "../../lib/react/index.js";
