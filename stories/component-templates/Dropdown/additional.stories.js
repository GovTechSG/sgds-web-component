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
