import { html } from "lit";

const SgdsSelectCloseTemplate = args => {
  return html`
    <sgds-dropdown close="default">
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Default Close">
        Default Close
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="Item #1">Item #1</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #2">Item #2</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #3">Item #3</sgds-dropdown-item>
    </sgds-dropdown>
    <br />
    <sgds-dropdown close="outside">
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Close Outside">
        Close Outside
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="Item #1">Item #1</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #2">Item #2</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #3">Item #3</sgds-dropdown-item>
    </sgds-dropdown>
    <br />
    <sgds-dropdown close="inside">
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Close Inside">
        Close Inside
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="Item #1">Item #1</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #2">Item #2</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #3">Item #3</sgds-dropdown-item>
    </sgds-dropdown>
  `;
};

export const SgdsSelectClose = {
  render: SgdsSelectCloseTemplate.bind({}),
  name: "sgds-select close",
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

const SgdsSelectEventTemplate = args => {
  return html`
    <sgds-dropdown id="select-event-dropdown">
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Dynamic Text">
        <span id="select-toggler-text">Dynamic Text</span>
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="Item #1">Item #1</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #2">Item #2</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Item #3">Item #3</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #4" disabled>item #4 (disabled)</sgds-dropdown-item>
    </sgds-dropdown>

    <script>
      const dropdown = document.querySelector("#select-event-dropdown");
      const togglerText = document.querySelector("#select-toggler-text");

      dropdown.addEventListener("sgds-select", e => {
        togglerText.textContent = e.detail.item.textContent.trim();
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
  }
};

const SgdsSelectDropdownItemTemplate = args => {
  return html`
    <sgds-dropdown close="outside">
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Dropdown">
        Dropdown
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="Label">
        <div class="sgds:grow sgds:items-center">
          <sgds-icon name="placeholder" size="2-xl"></sgds-icon>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-label-sm sgds:leading-2-xs sgds:font-regular sgds:tracking-normal">Label</span>
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:font-regular sgds:tracking-normal sgds:text-subtle"
              >Secondary text</span
            >
          </div>
          <sgds-icon name="placeholder"></sgds-icon>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Label">
        <div class="sgds:grow sgds:items-center">
          <sgds-icon name="placeholder"></sgds-icon>
          <span class="sgds:text-label-sm sgds:leading-2-xs sgds:font-regular sgds:tracking-normal sgds:grow"
            >Label</span
          >
          <span class="sgds:text-label-xs sgds:leading-3-xs sgds:font-regular sgds:tracking-normal sgds:text-subtle"
            >Secondary text</span
          >
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Label">
        <div class="sgds:grow sgds:items-center sgds:justify-between">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-label-sm sgds:leading-2-xs sgds:font-regular sgds:tracking-normal">Label</span>
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:font-regular sgds:tracking-normal sgds:text-subtle"
              >Secondary text</span
            >
          </div>
          <sgds-badge variant="white" outlined>Badge</sgds-badge>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Label">
        <div class="sgds:grow sgds:items-center">
          <sgds-icon name="placeholder"></sgds-icon>
          <span class="sgds:text-label-sm sgds:leading-2-xs sgds:font-regular sgds:tracking-normal sgds:grow"
            >Label</span
          >
          <sgds-switch size="sm"></sgds-switch>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Label">
        <div class="sgds:grow sgds:items-center sgds:justify-between">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-label-sm sgds:leading-2-xs sgds:font-regular sgds:tracking-normal">Label</span>
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:font-regular sgds:tracking-normal sgds:text-subtle"
              >Secondary text</span
            >
          </div>
          <sgds-button variant="outline" tone="neutral" size="xs">Action</sgds-button>
        </div>
      </sgds-dropdown-item>
    </sgds-dropdown>
  `;
};

export const SgdsSelectDropdownItem = {
  render: SgdsSelectDropdownItemTemplate.bind({}),
  name: "sgds-dropdown-item customisation",
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
