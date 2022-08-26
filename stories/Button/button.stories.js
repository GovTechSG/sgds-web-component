import { html, TemplateResult } from "lit";
import "../src/Button/button-element.ts";

export default {
  title: "ButtonElement",
  component: "button-element",
  argTypes: {
    variant: { control: "text" },
    //   counter: { control: 'number' },
    //   textColor: { control: 'color' },
  },
};

const Template = ({ variant }) => html`
  <button-element .variant=${variant}> </button-element>
`;

export const Regular = Template.bind({})