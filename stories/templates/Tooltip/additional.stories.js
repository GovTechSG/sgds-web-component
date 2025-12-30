import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const PlacementTemplate = args => {
  const placements = ["top", "bottom", "left", "right"];
  return html`
    <div class="d-flex-row">
      ${placements.map(
        p => html` <div class="d-flex-row">
        <sgds-tooltip content="${p}" placement="${p}">
          <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 1.6C5.80855 1.6 1.60002 5.80852 1.60002 11C1.60002 16.1915 5.80855 20.4 11 20.4C16.1915 20.4 20.4 16.1915 20.4 11C20.4 5.80852 16.1915 1.6 11 1.6ZM0.400024 11C0.400024 5.14578 5.14581 0.4 11 0.4C16.8542 0.4 21.6 5.14578 21.6 11C21.6 16.8542 16.8542 21.6 11 21.6C5.14581 21.6 0.400024 16.8542 0.400024 11ZM11 9.4C11.3314 9.4 11.6 9.66863 11.6 10V15C11.6 15.3314 11.3314 15.6 11 15.6C10.6687 15.6 10.4 15.3314 10.4 15V10C10.4 9.66863 10.6687 9.4 11 9.4Z"
              fill="#0E0E0E"
            />
            <path
              d="M11 6.15002C10.5306 6.15002 10.15 6.53058 10.15 7.00002C10.15 7.46947 10.5306 7.85002 11 7.85002H11.01C11.4795 7.85002 11.8601 7.46947 11.8601 7.00002C11.8601 6.53058 11.4795 6.15002 11.01 6.15002H11Z"
              fill="#0E0E0E"
            />
          </svg>
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
          <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 1.6C5.80855 1.6 1.60002 5.80852 1.60002 11C1.60002 16.1915 5.80855 20.4 11 20.4C16.1915 20.4 20.4 16.1915 20.4 11C20.4 5.80852 16.1915 1.6 11 1.6ZM0.400024 11C0.400024 5.14578 5.14581 0.4 11 0.4C16.8542 0.4 21.6 5.14578 21.6 11C21.6 16.8542 16.8542 21.6 11 21.6C5.14581 21.6 0.400024 16.8542 0.400024 11ZM11 9.4C11.3314 9.4 11.6 9.66863 11.6 10V15C11.6 15.3314 11.3314 15.6 11 15.6C10.6687 15.6 10.4 15.3314 10.4 15V10C10.4 9.66863 10.6687 9.4 11 9.4Z"
              fill="#0E0E0E"
            />
            <path
              d="M11 6.15002C10.5306 6.15002 10.15 6.53058 10.15 7.00002C10.15 7.46947 10.5306 7.85002 11 7.85002H11.01C11.4795 7.85002 11.8601 7.46947 11.8601 7.00002C11.8601 6.53058 11.4795 6.15002 11.01 6.15002H11Z"
              fill="#0E0E0E"
            />
          </svg>
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
  parameters: {},
  tags: ["!dev"]
};

export const Trigger = {
  render: TriggerTemplate.bind({}),
  name: "Trigger",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
