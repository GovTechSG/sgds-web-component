import { html } from "lit";

export default {
  title: "Utilities/Opacity",
  tags: ["autodocs"],
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

export const DefaultOpacity = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-0</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-0', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-0</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-0 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-3</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-3', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-3</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-3 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-5</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-5', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-5</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-5 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-10</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-10', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-10</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-10 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-20</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-20', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-20</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-20 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-30</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-30', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-30</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-30 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-40</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-40', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-40</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-40 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-50</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-50', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-50</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-50 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-60</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-60', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-60</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-60 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-70</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-70', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-70</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-70 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-80</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-80', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-80</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-80 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-90</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-90', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-90</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-90 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:opacity-100</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:opacity-100', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-opacity-100</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:opacity-100 sgds:bg-primary-default sgds:w-12 sgds:h-12 sgds:rounded-sm"></div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;
