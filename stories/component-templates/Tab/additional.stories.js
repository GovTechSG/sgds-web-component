import { html } from "lit";

export const SolidVariant = {
  render: Template.bind({}),
  name: "Solid variant",
  args: { variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};
export const UnderlinedDensityCompact = {
  render: Template.bind({}),
  name: "Compact density for underlined tabs",
  args: { density: "compact" },
  parameters: {},
  tags: ["!dev"]
};
export const SolidDensityCompact = {
  render: Template.bind({}),
  name: "Compact density for solid tabs",
  args: { density: "compact", variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};

export const OrientationUnderlined = {
  render: Template.bind({}),
  name: "Vertical orientation for underlined tabs",
  args: { orientation: "vertical" },
  parameters: {},
  tags: ["!dev"]
};
export const OrientationSolid = {
  render: Template.bind({}),
  name: "Vertical orientation for solid tabs",
  args: { orientation: "vertical", variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};

const EventsTemplate = () => {
  return html`
    <div>
      <div id="event-log" class="sgds:mb-lg sgds:p-lg sgds:bg-surface-raised sgds:rounded-md">
        <strong>Event Log:</strong>
        <div id="log-content" class="sgds:mt-sm sgds:font-mono sgds:text-xs"></div>
      </div>

      <sgds-tab-group id="event-tab-group">
        <sgds-tab slot="nav" panel="general">General</sgds-tab>
        <sgds-tab slot="nav" panel="settings">Settings</sgds-tab>
        <sgds-tab slot="nav" panel="advanced">Advanced</sgds-tab>

        <sgds-tab-panel name="general">
          <p>General tab content. Switch tabs to see the events being triggered.</p>
        </sgds-tab-panel>
        <sgds-tab-panel name="settings">
          <p>Settings tab content. The event log above shows which tab is active.</p>
        </sgds-tab-panel>
        <sgds-tab-panel name="advanced">
          <p>Advanced tab content. Use event.detail.name to track tab changes.</p>
        </sgds-tab-panel>
      </sgds-tab-group>
    </div>

    <script>
      const tabGroup = document.querySelector("#event-tab-group");
      const logContent = document.querySelector("#log-content");

      function addLog(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement("div");
        logEntry.textContent = timestamp + " - " + message;
        logContent.insertBefore(logEntry, logContent.firstChild);

        // Keep only last 5 entries
        while (logContent.children.length > 5) {
          logContent.removeChild(logContent.lastChild);
        }
      }

      tabGroup.addEventListener("sgds-tab-show", e => {
        addLog('sgds-tab-show: Panel "' + e.detail.name + '" is now active');

        // Example side effect: You can perform actions when a tab is shown
        console.log("Tab shown:", e.detail.name);
      });

      tabGroup.addEventListener("sgds-tab-hide", e => {
        addLog('sgds-tab-hide: Panel "' + e.detail.name + '" was hidden');

        // Example side effect: You can perform cleanup when a tab is hidden
        console.log("Tab hidden:", e.detail.name);
      });
    </script>
  `;
};

export const Events = {
  render: EventsTemplate.bind({}),
  name: "Tab events",
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true }
  },
  tags: ["!dev"]
};
