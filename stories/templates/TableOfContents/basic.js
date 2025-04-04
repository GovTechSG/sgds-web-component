import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`<sgds-table-of-contents>
  <h3>${ifDefined(args.title)}</h3>
  ${args.contents?.map(
    item =>
      html`<li slot="contents">
        <sgds-link><a href=${ifDefined(item.href)}>${item.label}</a></sgds-link>
      </li>`
  )}
</sgds-table-of-contents>`;

export const args = {
  title: "Table of Contents",
  contents: [
    { label: "Introduction", href: "#" },
    { label: "Usage", href: "#" },
    { label: "Examples", href: "#" }
  ]
};

export const parameters = {};
