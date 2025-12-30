import { html } from "lit";

export const Template = ({ active, disabled }) => html`<sgds-subnav>
  <h5 slot="header">Header</h5>
  <sgds-subnav-item ?active=${active} ?disabled=${disabled}>
    <a href="#">Overview</a>
  </sgds-subnav-item>
  <sgds-subnav-item disabled>
    <a href="#">On-site Activites</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="#">Programme</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="#">Speakers</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="#">Partners</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="#">Recordings</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="#">FAQ</a>
  </sgds-subnav-item>
  <sgds-button slot="actions" size="sm" fullWidth>Register</sgds-button>
  <sgds-button slot="actions" size="sm" fullWidth>Exhibit</sgds-button>
</sgds-subnav>`;

export const args = {};

export const parameters = {};
