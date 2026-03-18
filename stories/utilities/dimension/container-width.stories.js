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

const CODE_CLASSES = "sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm";
const COPY_BTN_CLASSES =
  "sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0";

export const ContainerWidth = () => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-2-xl">
    <div class="sgds:flex sgds:flex-col sgds:gap-sm">
      <div class="sgds:flex sgds:items-center sgds:gap-xs">
        <code class="${CODE_CLASSES}">sgds:w-container</code>
        <button
          class="${COPY_BTN_CLASSES}"
          @click="${e => copyToClipboard("sgds:w-container", e.target.closest("button"))}"
          aria-label="Copy token"
        >
          <sgds-icon name="files"></sgds-icon>
        </button>
        <span class="sgds:text-body-sm sgds:text-subtle">·</span>
        <code class="${CODE_CLASSES}">--sgds-container-width</code>
        <span class="sgds:text-body-sm sgds:text-subtle">·</span>
        <span class="sgds:text-body-sm sgds:text-subtle">360px / 888px / 1312px (responsive)</span>
      </div>
      <div class="sgds:w-full sgds:bg-neutral-surface-default sgds:rounded-md sgds:p-xs">
        <div class="sgds:w-container sgds:mx-auto sgds:bg-primary-surface-muted sgds:px-md sgds:py-sm sgds:rounded-md">
          <span class="sgds:text-label-sm sgds:text-subtle">w-container · responds to viewport</span>
        </div>
      </div>
    </div>
  </div>
`;
