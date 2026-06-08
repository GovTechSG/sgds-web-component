import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const SolidVariant = {
  render: Template.bind({}),
  name: "Solid variant",
  args: { variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};

export const LightToneTemplate = ({ tone }) => html`
  <div class="sgds:p-component-xs">
    <sgds-tab-group variant="underlined" tone="${ifDefined(tone)}">
      <sgds-tab slot="nav" panel="home">Home</sgds-tab>
      <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
      <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
      <sgds-tab-panel name="home">Home information</sgds-tab-panel>
      <sgds-tab-panel name="profile">Profile information</sgds-tab-panel>
      <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    </sgds-tab-group>
  </div>
  <div class="sgds:p-component-xs">
    <sgds-tab-group variant="solid" tone="${ifDefined(tone)}">
      <sgds-tab slot="nav" panel="home">Home</sgds-tab>
      <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
      <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
      <sgds-tab-panel name="home">Home information</sgds-tab-panel>
      <sgds-tab-panel name="profile">Profile information</sgds-tab-panel>
      <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    </sgds-tab-group>
  </div>
`;

export const DarkToneTemplate = ({ tone }) => html`
  <div class="sgds:p-component-xs sgds:bg-primary-default">
    <sgds-tab-group variant="underlined" tone="${ifDefined(tone)}">
      <sgds-tab slot="nav" panel="home">Home</sgds-tab>
      <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
      <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
      <sgds-tab-panel name="home">Home information</sgds-tab-panel>
      <sgds-tab-panel name="profile">Profile information</sgds-tab-panel>
      <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    </sgds-tab-group>
  </div>
  <div class="sgds:p-component-xs sgds:bg-primary-default">
    <sgds-tab-group variant="solid" tone="${ifDefined(tone)}">
      <sgds-tab slot="nav" panel="home">Home</sgds-tab>
      <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
      <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
      <sgds-tab-panel name="home">Home information</sgds-tab-panel>
      <sgds-tab-panel name="profile">Profile information</sgds-tab-panel>
      <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    </sgds-tab-group>
  </div>
`;

export const BrandTone = {
  render: LightToneTemplate.bind({}),
  name: "Primary tone",
  args: { tone: "brand" },
  parameters: {},
  tags: ["!dev"]
};
export const NeutralTone = {
  render: LightToneTemplate.bind({}),
  name: "Neutral tone",
  args: { tone: "neutral" },
  parameters: {},
  tags: ["!dev"]
};
export const FixedDarkTone = {
  render: DarkToneTemplate.bind({}),
  name: "Fixed dark tone",
  args: { tone: "fixed-dark" },
  parameters: {},
  tags: ["!dev"]
};
export const InverseTone = {
  render: DarkToneTemplate.bind({}),
  name: "Fixed dark tone",
  args: { tone: "inverse" },
  parameters: {},
  tags: ["!dev"]
};
export const FixedLightTone = {
  render: DarkToneTemplate.bind({}),
  name: "Fixed dark tone",
  args: { tone: "fixed-light" },
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
        <sgds-tab slot="nav" panel="general" ariaLabel="General">General</sgds-tab>
        <sgds-tab slot="nav" panel="settings" ariaLabel="Settings">Settings</sgds-tab>
        <sgds-tab slot="nav" panel="advanced" ariaLabel="Advanced">Advanced</sgds-tab>

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
