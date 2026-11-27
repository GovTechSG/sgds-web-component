import { html } from "lit";
import { copyToClipboard, CODE_CLASSES, COPY_BTN_CLASSES } from "../shared.js";

export default {
  title: "Utilities/Form/Control Size",
  tags: ["!autodocs"]
};

const tokenCode = token => html`
  <div class="sgds:flex sgds:items-center sgds:gap-xs">
    <code class="${CODE_CLASSES}">${token}</code>
    <button
      class="${COPY_BTN_CLASSES}"
      @click="${e => copyToClipboard(token, e.target.closest("button"))}"
      aria-label="Copy token"
    >
      <sgds-icon name="files"></sgds-icon>
    </button>
  </div>
`;

export const ControlSize = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Size tokens for form control elements. These define the standard heights for form inputs and icon buttons, and both
    height and width for checkbox/radio inputs.
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Usage</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          ${tokenCode("sgds:h-form-control-2-xs")} ${tokenCode("sgds:w-form-control-2-xs")}
        </div>
      </sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-2-xs</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">20px</code></sgds-table-cell>
      <sgds-table-cell>Checkbox/radio input (md size)</sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:rounded-form sgds:h-form-control-2-xs sgds:w-form-control-2-xs"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          ${tokenCode("sgds:h-form-control-xs")} ${tokenCode("sgds:w-form-control-xs")}
        </div>
      </sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-xs</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">24px</code></sgds-table-cell>
      <sgds-table-cell>Checkbox/radio input (lg size)</sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:rounded-form sgds:h-form-control-xs sgds:w-form-control-xs"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>${tokenCode("sgds:h-form-control-sm")}</sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-sm</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">32px</code></sgds-table-cell>
      <sgds-table-cell>Button xs, close button sm</sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:w-20 sgds:rounded-form sgds:h-form-control-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>${tokenCode("sgds:h-form-control-md")}</sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-md</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">40px</code></sgds-table-cell>
      <sgds-table-cell>Form input height (md size)</sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:w-20 sgds:rounded-form sgds:h-form-control-md"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>${tokenCode("sgds:h-form-control-lg")}</sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-lg</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">48px</code></sgds-table-cell>
      <sgds-table-cell>Form input height (lg size)</sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:w-20 sgds:rounded-form sgds:h-form-control-lg"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>${tokenCode("sgds:max-h-form-menu")}</sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-menu-max-height</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">320px</code></sgds-table-cell>
      <sgds-table-cell>Max height for form menu container</sgds-table-cell>
      <sgds-table-cell>
        <div
          class="sgds:bg-surface-raised sgds:border-default sgds:rounded-form-menu sgds:p-xs sgds:w-20 sgds:max-h-form-menu sgds:overflow-auto"
        >
          <div class="sgds:h-80 sgds:bg-primary-surface-muted sgds:rounded-sm"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;
