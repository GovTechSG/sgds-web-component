import * as React from 'react';
import { render as __litRender } from 'lit';
import * as S from "@ds-stories/stories/components/Textarea.stories";

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

function __bridge(fn: any) {
  return function BridgedStory() {
    const ref = React.useRef<any>(null);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let out: any;
      try { out = fn(); }
      catch (e: any) { el.textContent = '⚠ ' + ((e && e.message) || String(e)); return; }
      try { __litRender(out, el); }
      catch (e: any) { el.textContent = '⚠ ' + ((e && e.message) || String(e)); }
      return () => { try { __litRender(null, el); } catch (e) {} };
    }, []);
    return React.createElement('div', { ref });
  };
}

export const Basic = /* Basic */ __bridge(compose(S, "Basic"));
export const Validation = /* Validation */ __bridge(compose(S, "Validation"));
// The story module exports two stories both named "Validation"
// (Validation + OverrideInvalidFeedback). The generated preview deduped them
// by display name, leaving OverrideInvalidFeedback unpaired. This distinctly
// named cell renders that story so compare's order-fallback pairs it.
export const OverrideInvalidFeedback = /* Override default invalid feedback */ __bridge(compose(S, "OverrideInvalidFeedback"));
export const DefaultValue = /* Default Value */ __bridge(compose(S, "DefaultValue"));
export const Disabled = /* Disabled */ __bridge(compose(S, "Disabled"));
