import { html } from "lit-html";

export const Template = ({
  alwaysOpen,
  active,
  href,
  activeSNL,
  hrefSNL,
  collapseId,
  buttonId,
  disabledSNL,
  disabledSNI,
}) => {
  return html`
    <sgds-sidenav .alwaysOpen=${alwaysOpen}>
      <sgds-sidenav-item
        .active=${active}
        .href=${href}
        .collapseId=${collapseId}
        .buttonId=${buttonId}
        .disabled=${disabledSNI}
      >
        <span slot="title">
          <sl-icon name="stack"></sl-icon> SideNav Item #1 (control by
          Argstable)
        </span>
        <sgds-sidenav-link
          .href=${hrefSNL}
          .active=${activeSNL}
          .disabled=${disabledSNL}
          >sgds-sidenav-link (control by Argstable)</sgds-sidenav-link
        >
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">
          <sl-icon name="stack"></sl-icon>SideNav Item #2</span
        >
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
        <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item href="#">
        <span slot="title">SideNav Item #3</span>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
};


