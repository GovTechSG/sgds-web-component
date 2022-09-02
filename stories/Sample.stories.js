import { Story, Meta } from '@storybook/web-components';
import '../lib/Button'
import {html } from 'lit'

export default {
    title: 'Components/Sample-js',
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
      variant: { control: 'text' },
      classes: { control: "text" },
    },
  };

  const Template = ({variant, classes}) => html`
  <button-element .variant=${variant} .classes=${classes}>
    Blaze it
  </button-element>
  `;


  export const Primary = Template.bind({})
  Primary.args = {
    variant : "secondary"
  }