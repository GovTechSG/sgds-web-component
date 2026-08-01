import * as React from 'react';
import { render as __litRender } from 'lit';
import * as S from "@ds-stories/stories/components/FileUpload.stories";

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

// Some FileUpload stories drive their visible state through an inline <script>
// that storybook executes in its iframe. Lit's render() inserts that <script>
// into the host div but the browser never runs a template-cloned script, so the
// preview shows only the empty control. This bridge renders the same lit output
// and then reproduces the script's imperative work (seed a file, then set the
// file state) directly against the upgraded custom element so the preview lands
// in the same rendered state storybook shows.
function __bridgeWithFileState(fn: any, state: 'loading' | 'error' | 'success') {
  return function BridgedFileStory() {
    const ref = React.useRef<any>(null);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let out: any;
      try { out = fn(); }
      catch (e: any) { el.textContent = '⚠ ' + ((e && e.message) || String(e)); return; }
      try { __litRender(out, el); }
      catch (e: any) { el.textContent = '⚠ ' + ((e && e.message) || String(e)); return; }
      let cancelled = false;
      (async () => {
        try {
          const fileUpload: any = el.querySelector('sgds-file-upload');
          if (!fileUpload) return;
          if (customElements && customElements.whenDefined) {
            await customElements.whenDefined('sgds-file-upload');
          }
          const files = [new File(['content'], 'document.pdf', { type: 'application/pdf' })];
          const dt = new DataTransfer();
          files.forEach(file => dt.items.add(file));
          const input = fileUpload.shadowRoot && fileUpload.shadowRoot.querySelector('input');
          if (!input) return;
          input.files = dt.files;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          if (fileUpload.updateComplete) await fileUpload.updateComplete;
          if (cancelled) return;
          if (typeof fileUpload.setFileUploadState === 'function') {
            fileUpload.setFileUploadState(0, state);
          }
        } catch (e) { /* leave the base control rendered */ }
      })();
      return () => { cancelled = true; try { __litRender(null, el); } catch (e) {} };
    }, []);
    return React.createElement('div', { ref });
  };
}

export const Basic = /* Basic */ __bridge(compose(S, "Basic"));
export const DragAndDrop = /* Drag and Drop */ __bridge(compose(S, "DragAndDrop"));
export const ValidationDefaultInvalid = /* Validation: Default - Invalid */ __bridge(compose(S, "ValidationDefaultInvalid"));
export const ValidationDragDropInvalid = /* Validation: Drag and Drop - Invalid */ __bridge(compose(S, "ValidationDragDropInvalid"));
export const UploadingStateDefault = /* Uploading State */ __bridgeWithFileState(compose(S, "UploadingStateDefault"), 'loading');
export const UploadingStateDragDrop = /* Uploading State - Drag and Drop */ __bridgeWithFileState(compose(S, "UploadingStateDragDrop"), 'loading');
export const ErrorStateDefault = /* Error State */ __bridge(compose(S, "ErrorStateDefault"));
export const ErrorStateDragDrop = /* Error State - Drag and Drop */ __bridge(compose(S, "ErrorStateDragDrop"));
export const SuccessStateDefault = /* Success State */ __bridge(compose(S, "SuccessStateDefault"));
export const SuccessStateDragDrop = /* Success State - Drag and Drop */ __bridge(compose(S, "SuccessStateDragDrop"));
export const SgdsAddFiles = /* Event: sgds-add-files */ __bridge(compose(S, "SgdsAddFiles"));
export const SgdsRemoveFile = /* Event: sgds-remove-file */ __bridge(compose(S, "SgdsRemoveFile"));
export const SgdsChange = /* Event: sgds-change */ __bridge(compose(S, "SgdsChange"));
export const UploadToServer = /* Upload to Server */ __bridge(compose(S, "UploadToServer"));
export const CustomValidation = /* Custom Validation with noValidate */ __bridge(compose(S, "CustomValidation"));
