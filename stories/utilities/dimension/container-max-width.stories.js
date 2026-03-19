import { html } from "lit";

export default {
  title: "Utilities/Dimension/Container Max Width",
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

const tokens = [
  { token: "sgds:max-w-container-md", variable: "--sgds-container-max-width-md", value: "768px" },
  { token: "sgds:max-w-container-lg", variable: "--sgds-container-max-width-lg", value: "888px" },
  { token: "sgds:max-w-container-xl", variable: "--sgds-container-max-width-xl", value: "1168px" },
  { token: "sgds:max-w-container-2-xl", variable: "--sgds-container-max-width-2-xl", value: "1312px" },
  { token: "sgds:max-w-container-3-xl", variable: "--sgds-container-max-width-3-xl", value: "1440px" }
];

export const ContainerMaxWidth = () => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-2-xl">
    ${tokens.map(
      ({ token, variable, value }) => html`
        <div class="sgds:flex sgds:flex-col sgds:gap-sm">
          <div class="sgds:flex sgds:items-center sgds:gap-xs sgds:flex-wrap">
            <code class="${CODE_CLASSES}">${token}</code>
            <button
              class="${COPY_BTN_CLASSES}"
              @click="${e => copyToClipboard(token, e.target.closest("button"))}"
              aria-label="Copy token"
            >
              <sgds-icon name="files"></sgds-icon>
            </button>
            <span class="sgds:text-body-sm sgds:text-subtle">·</span>
            <code class="${CODE_CLASSES}">${variable}</code>
            <span class="sgds:text-body-sm sgds:text-subtle">·</span>
            <span class="sgds:text-body-sm sgds:text-subtle">${value}</span>
          </div>
          <div class="sgds:w-full sgds:bg-neutral-surface-default sgds:rounded-md sgds:p-xs">
            <div class="${token} sgds:mx-auto sgds:bg-primary-surface-muted sgds:px-md sgds:py-sm sgds:rounded-md">
              <span class="sgds:text-label-sm sgds:text-subtle">${token} · ${value}</span>
            </div>
          </div>
        </div>
      `
    )}
  </div>
`;
