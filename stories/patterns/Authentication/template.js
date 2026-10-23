import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { keyed } from "lit/directives/keyed.js";
import { patterns, defaultPattern } from "./patterns.js";

const FieldTemplate = (field, group) => html`
  <sgds-input
    label=${field.label}
    name=${field.name}
    type=${field.type}
    placeholder=""
    value=${field.value}
    autocomplete=${field.type === "password"
      ? group === "Sign up" || field.name.includes("new") || field.name === "confirm-password"
        ? "new-password"
        : "current-password"
      : field.type === "email"
      ? "email"
      : "one-time-code"}
    inputmode=${ifDefined(field.name === "verification-code" ? "numeric" : undefined)}
    ?disabled=${field.disabled}
    ?invalid=${!!field.error}
    hasFeedback="both"
    invalidFeedback=${ifDefined(field.error || undefined)}
  ></sgds-input>
`;

const ProviderTemplate = () => html`
  <sgds-button type="button" variant="outline" tone="neutral" fullWidth>Log in with Techpass</sgds-button>
  <sgds-button type="button" variant="outline" tone="neutral" fullWidth>Log in with WOG AD</sgds-button>
`;

export const PatternTemplate = ({ contentPattern = defaultPattern } = {}) => {
  const pattern =
    patterns.find(item => item.key === contentPattern) || patterns.find(item => item.key === defaultPattern);
  return html`${keyed(
    pattern.key,
    html`
      <form
        class="sgds:flex sgds:w-full sgds:max-w-120 sgds:flex-col sgds:gap-lg"
        @submit=${event => event.preventDefault()}
      >
        <div data-auth-slot="heading" class="sgds:flex sgds:flex-col sgds:gap-2">
          <h1
            class="sgds:m-0 sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-default"
          >
            ${pattern.title}
          </h1>
          <p class="sgds:m-0 sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
            ${pattern.description}
          </p>
        </div>
        ${pattern.alert || pattern.fields || pattern.body
          ? html`
              <div data-auth-slot="fields" class="sgds:flex sgds:flex-col sgds:gap-lg">
                ${pattern.alert
                  ? html`
                      <sgds-alert show outlined variant=${pattern.alert[0]} title=${pattern.alert[1]}>
                        <sgds-icon
                          slot="icon"
                          name=${pattern.alert[0] === "success"
                            ? "check-circle-fill"
                            : pattern.alert[0] === "warning"
                            ? "exclamation-triangle-fill"
                            : "exclamation-circle-fill"}
                          size="md"
                        ></sgds-icon>
                        ${pattern.alert[2]}
                      </sgds-alert>
                    `
                  : nothing}
                ${pattern.fields?.map(field => FieldTemplate(field, pattern.group))}
                ${pattern.loginOptions
                  ? html`
                      <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:justify-between sgds:gap-2">
                        <sgds-checkbox name="remember-me">Remember me</sgds-checkbox>
                        <sgds-link><a href="#">Forgot password?</a></sgds-link>
                      </div>
                    `
                  : nothing}
                ${pattern.body
                  ? html`<p class="sgds:m-0 sgds:text-body-md sgds:leading-xs sgds:text-default">${pattern.body}</p>`
                  : nothing}
              </div>
            `
          : nothing}
        <div data-auth-slot="actions" class="sgds:flex sgds:flex-col sgds:gap-md">
          ${pattern.buttons?.map(
            (label, index) => html`
              <sgds-button
                type="button"
                variant=${index === 0 ? "primary" : "outline"}
                fullWidth
                ?disabled=${pattern.disabled}
                >${label}</sgds-button
              >
            `
          )}
          ${pattern.providers && pattern.buttons
            ? html`
                <div class="sgds:flex sgds:items-center sgds:gap-md sgds:py-1">
                  <sgds-divider class="sgds:flex-1"></sgds-divider>
                  <span class="sgds:text-label-sm sgds:text-subtle">OR</span>
                  <sgds-divider class="sgds:flex-1"></sgds-divider>
                </div>
              `
            : nothing}
          ${pattern.providers ? ProviderTemplate() : nothing}
        </div>
        ${pattern.support
          ? html`
              <div
                data-auth-slot="supporting-content"
                class="sgds:flex sgds:flex-wrap sgds:items-center sgds:justify-center sgds:gap-1"
              >
                <p class="sgds:m-0 sgds:text-body-md sgds:leading-xs sgds:text-subtle">${pattern.support[0]}</p>
                <sgds-link><a href="#">${pattern.support[1]}</a></sgds-link>
              </div>
            `
          : nothing}
      </form>
    `
  )}`;
};

export const parameters = {
  controls: { disable: true },
  actions: { disable: true },
  interactions: { disable: true },
  layout: "padded"
};
