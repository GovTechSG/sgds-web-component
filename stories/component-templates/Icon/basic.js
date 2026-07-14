import { html } from "lit";
import { iconRegistry } from "../../../src/components/Icon/icon-registry";

const toReadableLabel = iconName =>
  iconName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const iconDocsSource = Object.keys(iconRegistry)
  .map(iconName => `          <sgds-icon name="${iconName}" ariaLabel="${toReadableLabel(iconName)}"></sgds-icon>`)
  .join("\n\n");

const filterIcons = event => {
  const query = String(event.currentTarget?.value ?? "")
    .trim()
    .toLowerCase();
  const container = event.currentTarget.closest("[data-icon-explorer]");
  if (!container) return;

  const iconItems = container.querySelectorAll("[data-icon-name]");
  iconItems.forEach(item => {
    const iconName = String(item.getAttribute("data-icon-name") || "").toLowerCase();
    item.hidden = query.length > 0 && !iconName.includes(query);
  });
};

const copyIconName = async (iconName, event) => {
  const trigger = event.currentTarget;

  try {
    await navigator.clipboard.writeText(iconName);
    trigger.dataset.copyState = "copied";
    trigger.title = `Copied: ${iconName}`;
  } catch {
    trigger.dataset.copyState = "failed";
    trigger.title = `Unable to copy: ${iconName}`;
  }

  window.setTimeout(() => {
    trigger.dataset.copyState = "";
    trigger.title = "Click to copy";
  }, 1200);
};

export const Template = () => {
  return html`
    <style>
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
        gap: var(--sgds-gap-sm);
        margin-top: var(--sgds-margin-lg);
      }
    </style>

    <div data-icon-explorer>
      <sgds-input
        type="search"
        hintText="Search for an icon name, then click an icon to copy its name to your clipboard."
        placeholder="Search icon name"
        @sgds-input=${filterIcons}
      ></sgds-input>

      <div class="icon-grid">
        ${Object.keys(iconRegistry).map(
          iconName => html`
            <div data-icon-name=${iconName}>
              <sgds-tooltip content=${iconName}>
                <sgds-icon-button
                  name=${iconName}
                  size="md"
                  variant="ghost"
                  tone="neutral"
                  title="Click to copy"
                  ariaLabel=${iconName}
                  @click=${e => copyIconName(iconName, e)}
                ></sgds-icon-button>
              </sgds-tooltip>
            </div>
          `
        )}
      </div>
    </div>
  `;
};

export const args = {};

export const parameters = {
  docs: {
    source: {
      code: `
          <!-- Standalone informative icon (add ariaLabel) -->
            ${iconDocsSource}
        `
    }
  }
};

export const play = undefined;
