import { html } from "lit-html";
const CardAsRadioTemplate = args =>
  html`
    <form>
      <sgds-radio-group>
        <sgds-action-card type="radio" name="apple">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Apple</span>
          <span slot="card-text">Macbook Pro M1</span>
        </sgds-action-card>
        <sgds-action-card type="radio" name="microsoft">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Microsoft</span>
          <span slot="card-text">Microsoft Surface Pro</span>
        </sgds-action-card>
        <sgds-action-card type="radio" name="acer">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Acer</span>
          <span slot="card-text">Aspire 5</span>
        </sgds-action-card>
      </sgds-radio-group>
    </form>
  `;

export const ActionCardAsRadio = {
  render: CardAsRadioTemplate.bind({}),
  name: "Action Card as radio",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

// const ActionCardPlaygroundTemplate = args =>
//   html`
//     <sgds-action-card type="radio" name="apple">
//       <span slot="card-subtitle">Laptop</span>
//       <span slot="card-title">Apple</span>
//       <span slot="card-text">Macbook Pro M1</span>
//     </sgds-action-card>
//   `;

// export const ActionCardPlayground = {
//   render: ActionCardPlaygroundTemplate.bind({}),
//   name: "Playground",
//   args: {},
//   parameters: {},
//   tags: ["dev"]
// };
