import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-accordion>
      <sgds-accordion-item>
        <div slot="accordion-header">This is a solo accordion</div>
        <span slot="accordion-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
    </sgds-accordion>
    <sgds-accordion ?allowMultiple=${args.allowMultiple}>
      <sgds-accordion-item ?open=${args.open}>
        <div slot="accordion-header">This is an accordion</div>
        <span slot="accordion-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
      <sgds-accordion-item>
        <div slot="accordion-header">Accordion 1</div>
        <span slot="accordion-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
      <sgds-accordion-item open>
        <div slot="accordion-header">Accordion 2</div>
        <span slot="accordion-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
      <sgds-accordion-item>
        <div slot="accordion-header">Accordion 3</div>
        <span slot="accordion-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
    </sgds-accordion>
  `;

export const args = {};

export const parameters = {};
