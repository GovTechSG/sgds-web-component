import { html } from "lit";

const SgdsSelectCloseTemplate = args => {
  return html`
    <sgds-dropdown close="default">
      <sgds-button slot="toggler" role="button" variant="primary" tone="brand">
        Default Close
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>Item #1</sgds-dropdown-item>
      <sgds-dropdown-item>Item #2</sgds-dropdown-item>
      <sgds-dropdown-item>Item #3</sgds-dropdown-item>
    </sgds-dropdown>
    <br />
    <sgds-dropdown close="outside">
      <sgds-button slot="toggler" role="button" variant="primary" tone="brand">
        Close Outside
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>Item #1</sgds-dropdown-item>
      <sgds-dropdown-item>Item #2</sgds-dropdown-item>
      <sgds-dropdown-item>Item #3</sgds-dropdown-item>
    </sgds-dropdown>
    <br />
    <sgds-dropdown close="inside">
      <sgds-button slot="toggler" role="button" variant="primary" tone="brand">
        Close Inside
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>Item #1</sgds-dropdown-item>
      <sgds-dropdown-item>Item #2</sgds-dropdown-item>
      <sgds-dropdown-item>Item #3</sgds-dropdown-item>
    </sgds-dropdown>
  `;
};

export const SgdsSelectClose = {
  render: SgdsSelectCloseTemplate.bind({}),
  name: "sgds-select close",
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true }
  },
  tags: ["!dev"]
};

const SgdsSelectEventTemplate = args => {
  return html`
    <sgds-dropdown id="select-event-dropdown">
      <sgds-button slot="toggler" role="button" variant="primary" tone="brand">
        <span id="select-toggler-text">Dynamic Text</span>
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>Item #1</sgds-dropdown-item>
      <sgds-dropdown-item>Item #2</sgds-dropdown-item>
      <sgds-dropdown-item>Item #3</sgds-dropdown-item>
      <sgds-dropdown-item disabled>item #4 (disabled)</sgds-dropdown-item>
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
  },
  tags: ["!dev"]
};

const SgdsSelectDropdownItemTemplate = args => {
  return html`
    <sgds-dropdown close="outside">
      <sgds-button slot="toggler" role="button" variant="primary" tone="brand">
        Dropdown
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>
        <div
          style="
          flex-grow: 1;
          align-items: center;
        "
        >
          <sgds-icon name="placeholder" size="2-xl"></sgds-icon>
          <div
            style="
            display: flex;
            flex-direction: column;
            gap: var(--sgds-text-gap-2-xs);
          "
          >
            <span
              style="
              font-size: var(--sgds-font-size-label-sm);
              line-height: var(--sgds-line-height-2-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
            "
              >Label</span
            >
            <span
              style="
              font-size: var(--sgds-font-size-label-xs);
              line-height: var(--sgds-line-height-3-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
              color: var(--sgds-color-subtle);
            "
              >Secondary text</span
            >
          </div>
          <sgds-icon name="placeholder"></sgds-icon>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <div
          style="
          flex-grow: 1;
          align-items: center;
        "
        >
          <sgds-icon name="placeholder"></sgds-icon>
          <span
            style="
            font-size: var(--sgds-font-size-label-sm);
            line-height: var(--sgds-line-height-2-xs);
            font-weight: var(--sgds-font-weight-regular);
            letter-spacing: var(--sgds-letter-spacing-normal);
            flex-grow: 1;
          "
            >Label</span
          >
          <span
            style="
            font-size: var(--sgds-font-size-label-xs);
            line-height: var(--sgds-line-height-3-xs);
            font-weight: var(--sgds-font-weight-regular);
            letter-spacing: var(--sgds-letter-spacing-normal);
            color: var(--sgds-color-subtle);
          "
            >Secondary text</span
          >
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <div
          style="
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;
        "
        >
          <div
            style="
            display: flex;
            flex-direction: column;
            gap: var(--sgds-text-gap-2-xs);
          "
          >
            <span
              style="
              font-size: var(--sgds-font-size-label-sm);
              line-height: var(--sgds-line-height-2-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
            "
              >Label</span
            >
            <span
              style="
              font-size: var(--sgds-font-size-label-xs);
              line-height: var(--sgds-line-height-3-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
              color: var(--sgds-color-subtle);
            "
              >Secondary text</span
            >
          </div>
          <sgds-badge variant="white" outlined>Badge</sgds-badge>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <div
          style="
          flex-grow: 1;
          align-items: center;
        "
        >
          <sgds-icon name="placeholder"></sgds-icon>
          <span
            style="
            font-size: var(--sgds-font-size-label-sm);
            line-height: var(--sgds-line-height-2-xs);
            font-weight: var(--sgds-font-weight-regular);
            letter-spacing: var(--sgds-letter-spacing-normal);
            flex-grow: 1;
          "
            >Label</span
          >
          <sgds-switch size="sm"></sgds-switch>
        </div>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <div
          style="
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;
        "
        >
          <div
            style="
            display: flex;
            flex-direction: column;
            gap: var(--sgds-text-gap-2-xs);
          "
          >
            <span
              style="
              font-size: var(--sgds-font-size-label-sm);
              line-height: var(--sgds-line-height-2-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
            "
              >Label</span
            >
            <span
              style="
              font-size: var(--sgds-font-size-label-xs);
              line-height: var(--sgds-line-height-3-xs);
              font-weight: var(--sgds-font-weight-regular);
              letter-spacing: var(--sgds-letter-spacing-normal);
              color: var(--sgds-color-subtle);
            "
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
  },
  tags: ["!dev"]
};
