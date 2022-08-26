import { Story, Meta } from '@storybook/web-components';
import  '../Button/button-element'
import { html, TemplateResult } from 'lit';

export default {
    title: 'Example/Test',
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
      variant: { control: 'text' }
    },
  };

  const Template = (args) => html`
  <button-element>
    
  </button-element>
  `;


  export const Primary = Template.bind({})