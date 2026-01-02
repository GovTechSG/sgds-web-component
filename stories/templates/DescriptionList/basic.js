import { html, nothing } from "lit";

export const Template = args => html`
  <sgds-description-list-group ?stacked=${args.stacked} ?bordered=${args.bordered}>
    ${args.title ? html`<span slot="title"> Title</span>` : nothing}
    ${args.description ? html`<span slot="description">Description</span>` : nothing}
    <sgds-description-list>
      Label 1
      <span slot="data">Data Text Description List 1</span>
    </sgds-description-list>
    <sgds-description-list>
      Label 2
      <span slot="data">Data Text Description List 2</span>
    </sgds-description-list>
    <sgds-description-list>
      Label 3
      <span slot="data">Data Text Description List 3</span>
    </sgds-description-list>
    <sgds-description-list>
      Label 4
      <span slot="data">Data Text Description List 4</span>
    </sgds-description-list>
  </sgds-description-list-group>
`;

export const args = {};

export const parameters = {};
