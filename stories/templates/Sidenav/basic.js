import { html } from "lit-html";
export const Template = ({
  alwaysOpen,
  active,
  href,
  activeSNL,
  hrefSNL,
  disabledSNL,
  disabledSNI,
  sticky,
  target
}) => {
  return html`
    <sgds-sidenav alwaysOpen=${ifDefined(alwaysOpen)} sticky=${ifDefined(sticky)}>
      <sgds-sidenav-item active=${ifDefined(active)} href=${ifDefined(href)} disabled=${ifDefined(disabledSNI)}>
        <span slot="title">SideNav Item #1 (control by Argstable) </span>
        <sgds-sidenav-link
          href=${ifDefined(hrefSNL)}
          active=${ifDefined(activeSNL)}
          disabled=${ifDefined(disabledSNL)}
          target=${ifDefined(target)}
          >sgds-sidenav-link (control by Argstable)</sgds-sidenav-link
        >
        <sgds-sidenav-link href="#" disabled>sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">SideNav Item #2</span>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-layers-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"
            />
            <path
              d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"
            />
          </svg>
        </span>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item href="#">
        <span slot="title">SideNav Item #3</span>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-layers-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"
            />
            <path
              d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"
            />
          </svg>
        </span>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
};

export const args = {};

export const parameters = {};
