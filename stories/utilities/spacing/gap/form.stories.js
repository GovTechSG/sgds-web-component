import { html } from "lit";
import { copyToClipboard } from "../../shared.js";

export default {
  title: "Utilities/Form/Gap",
  tags: ["!autodocs"]
};

export const SimplifiedSemantic = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:gap-form-md</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:gap-form-md", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-form-gap-md</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-md">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:gap-form-lg</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:gap-form-lg", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-form-gap-lg</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-lg">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;
