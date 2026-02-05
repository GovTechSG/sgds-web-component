import { html } from "lit";

export default {
  title: "Utilities/Line Height",
  tags: ["autodocs"]
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

export const DefaultLineHeight = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-16</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-16", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-16</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-16 sgds:text-sm">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-20</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-20", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-20</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-20 sgds:text-sm">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-24</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-24", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-24</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-24">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-32</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-32", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-32</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-32 sgds:text-lg">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-36</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-36", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-36</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-36 sgds:text-lg">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-40</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-40", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-40</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-40 sgds:text-xl">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-48</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-48", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-48</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-48 sgds:text-2xl">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-56</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-56", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-56</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-56 sgds:text-3xl">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >sgds:leading-64</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:leading-64", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >--sgds-line-height-64</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:leading-64 sgds:text-4xl">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft
          zebras jump.
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;
