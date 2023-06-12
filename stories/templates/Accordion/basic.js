import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-accordion accordionClasses="mb-4">
      <sgds-accordion-item summary="Solo Accordion">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
      </sgds-accordion-item>
    </sgds-accordion>
    <sgds-accordion .allowMultiple=${args.allowMultiple} .accordionClasses=${args.accordionClasses}>
      <sgds-accordion-item
        .open=${args.open}
        .disabled=${args.disabled}
        .summary=${args.summary}
        .accordionItemClasses=${args.accordionItemClasses}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </sgds-accordion-item>
      <sgds-accordion-item summary="Accordion 1" .accordionItemClasses=${args.accordionItemClasses}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </sgds-accordion-item>
      <sgds-accordion-item summary="Accordion 2" .accordionItemClasses=${args.accordionItemClasses}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </sgds-accordion-item>
      <sgds-accordion-item summary="Accordion 3" .accordionItemClasses=${args.accordionItemClasses}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </sgds-accordion-item>
    </sgds-accordion>
  `;

export const args = { summary: "This is an accordion" };

export const parameters = {};
