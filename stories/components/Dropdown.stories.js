
    import { Template, args, parameters, play } from "../templates/Dropdown/basic.js";

    export default {
      title: 'Components/Dropdown',
      component: 'sgds-dropdown',
      argTypes: {"dependencies":{"defaultValue":"{\n    sgds-icon: SgdsIcon\n  }","control":"object"},"active":{"defaultValue":false,"control":"boolean"},"disabled":{"defaultValue":false,"control":"boolean"},"noFlip":{"defaultValue":false,"control":"boolean"},"menuAlignRight":{"defaultValue":false,"control":"boolean"},"drop":{"defaultValue":"down","control":"select","options":["left","right","up","down"]},"menuRef":{"control":"object"},"hidden":{"defaultValue":false,"control":"boolean"},"floatingOpts":{"defaultValue":"{}","control":"object"},"menuIsOpen":{"defaultValue":false,"control":"boolean"},"close":{"defaultValue":"default","control":"select","options":["outside","default","inside"]},"readonly":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const SgdsSelectEventTemplate = args => {
  return html`
    <sgds-dropdown id="select-event-dropdown">
      <sgds-button slot="toggler" role="button">
        Dropdown
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>item #1</sgds-dropdown-item>
      <sgds-dropdown-item>item #2</sgds-dropdown-item>
      <sgds-dropdown-item>item #3</sgds-dropdown-item>
      <sgds-dropdown-item disabled>item #4 (disabled)</sgds-dropdown-item>
    </sgds-dropdown>

    <div class="sgds:mt-md">Selected item: <strong id="selected-output">—</strong></div>

    <script>
      const dropdown = document.querySelector("#select-event-dropdown");
      const output = document.querySelector("#selected-output");

      dropdown.addEventListener("sgds-select", e => {
        output.textContent = e.detail.item.textContent.trim();
      });
    </script>
  `;
};

export const SgdsSelectEvent = {
  render: SgdsSelectEventTemplate.bind({}),
  name: "sgds-select event",
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true }
  },
  tags: ["!dev"]
};
