import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-accordion
      ?allowMultiple=${args.allowMultiple}
      variant=${ifDefined(args.variant)}
      density=${ifDefined(args.density)}
    >
      <sgds-accordion-item ?open=${args.open} ?disabled=${args.disabled}>
        <div slot="header">Accordion title #1</div>
        <div slot="content">
          Lorem ipsum dolorsdsf sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
        </div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <div slot="header">Accordion title #2</div>
        <div slot="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
        </div>
      </sgds-accordion-item>
      <sgds-accordion-item open>
        <div slot="header">Accordion title #3</div>
        <div slot="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
        </div>
      </sgds-accordion-item>
    </sgds-accordion>
  `;

export const args = {};

export const parameters = {
  controls: { exclude: ["slots"] }
};
