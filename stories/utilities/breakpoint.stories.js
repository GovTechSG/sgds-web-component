import { html } from "lit";

export default {
  title: "Utilities/Breakpoint",
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

export const Breakpoints = () => html`
  <p class="sgds:mb-md sgds:text-body-md">
    Responsive breakpoints use the syntax
    <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm"
      >sgds:&lt;breakpoint&gt;:&lt;utility&gt;</code
    >
    (e.g. <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:sm:hidden</code>).
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>Responsive Prefix</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Min-width</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:xs:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:xs:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-xs</code>
      </sgds-table-cell>
      <sgds-table-cell>320px</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:sm:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:sm:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-sm</code>
      </sgds-table-cell>
      <sgds-table-cell>512px</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:md:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:md:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-md</code>
      </sgds-table-cell>
      <sgds-table-cell>768px</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:lg:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:lg:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-lg</code>
      </sgds-table-cell>
      <sgds-table-cell>1024px</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:xl:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:xl:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>1280px</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:2-xl:</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard("sgds:2-xl:", e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">--sgds-breakpoint-2-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>1440px</sgds-table-cell>
    </sgds-table-row>
  </sgds-table>

  <div class="sgds:mb-2-xl"></div>
  <h3 class="sgds:mb-md">Example: Responsive Visibility</h3>
  <p class="sgds:mb-md sgds:text-body-md">
    Each badge below appears only when the viewport reaches its breakpoint. Resize the browser to see them appear or
    disappear.
  </p>
  <div class="sgds:flex sgds:flex-wrap sgds:gap-sm">
    <sgds-badge variant="primary" class="sgds:hidden sgds:xs:inline-flex">xs+ (320px)</sgds-badge>
    <sgds-badge variant="accent" class="sgds:hidden sgds:sm:inline-flex">sm+ (512px)</sgds-badge>
    <sgds-badge variant="success" class="sgds:hidden sgds:md:inline-flex">md+ (768px)</sgds-badge>
    <sgds-badge variant="warning" class="sgds:hidden sgds:lg:inline-flex">lg+ (1024px)</sgds-badge>
    <sgds-badge variant="danger" class="sgds:hidden sgds:xl:inline-flex">xl+ (1280px)</sgds-badge>
    <sgds-badge variant="cyan" class="sgds:hidden sgds:2-xl:inline-flex">2-xl+ (1440px)</sgds-badge>
  </div>
`;
