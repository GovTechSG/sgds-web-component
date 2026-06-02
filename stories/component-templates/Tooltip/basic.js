import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ content, trigger, placement }) => {
  return html`
    <div class="d-flex-row">
      Hover over the icon
      <sgds-tooltip content=${ifDefined(content)} trigger=${ifDefined(trigger)} placement=${ifDefined(placement)}>
        <sgds-icon name="info-circle" ariaLabel="Information" tabindex="0"></sgds-icon>
      </sgds-tooltip>
    </div>
  `;
};

export const args = {
  content: "This is a tooltip",
  placement: "bottom"
};

export const parameters = {
  layout: "centered"
};

export const play = undefined;
