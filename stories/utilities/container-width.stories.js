import { html } from "lit";

export default {
  title: "Utilities/Dimension/Container Width",
  tags: ["!autodocs"]
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const CODE_CLASSES = "sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono";
const COPY_BTN_CLASSES =
  "sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0";

export const ContainerWidth = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="${CODE_CLASSES}">sgds:w-container</code>
          <button
            class="${COPY_BTN_CLASSES}"
            @click="${e => copyToClipboard("sgds:w-container", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-container-width</code></sgds-table-cell>
      <sgds-table-cell><code class="${CODE_CLASSES}">360px / 888px / 1312px</code></sgds-table-cell>
    </sgds-table-row>
  </sgds-table>

  <div class="sgds:mt-2-xl">
    <p class="sgds:mb-md sgds:text-subtle">
      Apply <code class="${CODE_CLASSES}">sgds:w-container sgds:mx-auto</code> to constrain page content to the
      responsive container width and centre it horizontally.
    </p>
    <div class="sgds:bg-surface-raised sgds:p-xl sgds:rounded-md">
      <div class="sgds:w-container sgds:mx-auto sgds:bg-primary-surface-muted sgds:p-xl sgds:rounded-md">
        <p class="sgds:text-label-sm sgds:text-subtle sgds:mb-xs">w-container · mx-auto</p>
        <h3 class="sgds:text-heading-sm sgds:mb-sm">Content Container</h3>
        <p class="sgds:text-body-md sgds:text-subtle">
          This block is constrained to <code class="${CODE_CLASSES}">--sgds-container-width</code> and centred
          horizontally. Resize the window to see it adapt between 360px, 888px and 1312px.
        </p>
      </div>
    </div>
  </div>
`;

ContainerWidth.storyName = "Container Width";
