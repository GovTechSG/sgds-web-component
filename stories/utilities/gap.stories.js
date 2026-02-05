import { html } from "lit";

export default {
  title: "Utilities/Gap",
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

export const DefaultGap = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-none</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-none', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-none</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-none">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-2-xs</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-2-xs', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-2-xs</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-2-xs">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-xs</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-xs', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-xs</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-xs">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-sm</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-sm', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-sm</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-sm">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-md</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-md', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-md</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-md">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-lg</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-lg', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-lg</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-lg">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-xl</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-xl', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-xl">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-2-xl</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-2-xl', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-2-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-2-xl">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-3-xl</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-3-xl', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-gap-3-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-3-xl">
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;

export const FormGap = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-form-sm</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-form-sm', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-form-gap-sm</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-sm">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-form-md</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-form-md', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-form-gap-md</code>
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
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-form-lg</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-form-lg', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-form-gap-lg</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-lg">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-form-xl</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-form-xl', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-form-gap-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-xl">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">sgds:gap-form-2-xl</code>
          <button class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0" @click="${(e) => copyToClipboard('sgds:gap-form-2-xl', e.target.closest('button'))}" aria-label="Copy token">
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">--sgds-form-gap-2-xl</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:flex sgds:gap-form-2-xl">
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
          <div class="sgds:bg-accent-default sgds:w-6 sgds:h-6"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;
