import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-accordion accordionClasses="mb-4">
      <sgds-accordion-item>
        <p class="m-0" slot="accordion-header">${args.header}</p>
        <span slot="accordion-content">${args.content}</span>
      </sgds-accordion-item>
    </sgds-accordion>
    <sgds-accordion .allowMultiple=${args.allowMultiple} .accordionClasses=${args.accordionClasses}>
      <sgds-accordion-item
        .open=${args.open}
        .disabled=${args.disabled}
        .accordionItemClasses=${args.accordionItemClasses}
      > 
        <p class="m-0" slot="accordion-header">This is an accordion</p>
        <span slot="accordion-content">${args.content}</span>
      </sgds-accordion-item>
      <sgds-accordion-item .accordionItemClasses=${args.accordionItemClasses}>
        <p class="m-0" slot="accordion-header">Accordion 1</p>
        <span slot="accordion-content">${args.content}</span>
      </sgds-accordion-item>
      <sgds-accordion-item open .accordionItemClasses=${args.accordionItemClasses}>
        <p class="m-0" slot="accordion-header">Accordion 2</p>
        <span slot="accordion-content">${args.content}</span>
      </sgds-accordion-item>
      <sgds-accordion-item .accordionItemClasses=${args.accordionItemClasses}>
        <p class="m-0" slot="accordion-header">Accordion 3</p>
        <span slot="accordion-content">${args.content}</span>
      </sgds-accordion-item>
    </sgds-accordion>
  `;

export const args = { 
  header: "This is a solo accordion",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum."
};

export const parameters = {};
