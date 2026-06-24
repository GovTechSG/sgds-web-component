import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const PlacementTemplate = args => {
  const placements = ["top", "bottom", "left", "right"];
  return html`
    <div class="d-flex-row">
      ${placements.map(
        p => html` <div class="d-flex-row">
        <sgds-tooltip content="${p}" placement="${p}">
          <sgds-icon name="info-circle" ariaLabel="Information" tabindex="0"></sgds-icon>
        </sgds-tooltip>
      </div>
      </div>
      `
      )}
    </div>
  `;
};
const TriggerTemplate = args => {
  const trigger = ["click", "hover", "focus", "hover focus"];
  return html`
    <div class="d-flex-column">
      ${trigger.map(
        t => html` <div class="d-flex-row">
            ${t} to invoke the tooltip
        <sgds-tooltip content="${t}" trigger=${t}>
          <sgds-icon name="info-circle" ariaLabel="Information" tabindex="0"></sgds-icon>
        </sgds-tooltip>
      </div>
      </div>
      `
      )}
    </div>
  `;
};

export const Placement = {
  render: PlacementTemplate.bind({}),
  name: "Placement",
  args: {},
  parameters: {}
};

export const Trigger = {
  render: TriggerTemplate.bind({}),
  name: "Trigger",
  args: {},
  parameters: {}
};
