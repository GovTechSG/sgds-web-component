import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <div class="container">
      <sgds-card
        ?stretchedLink=${ifDefined(args.stretchedLink)}
        ?disabled=${ifDefined(args.disabled)}
        orientation=${ifDefined(args.orientation)}
        imagePosition=${ifDefined(args.imagePosition)}
        imageAdjustment=${ifDefined(args.imageAdjustment)}
        ?hideBorder=${ifDefined(args.hideBorder)}
        ?tinted=${ifDefined(args.tinted)}
      >
        <img
          slot="image"
          alt="img alternate text goes here"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="title">Card</span>
        <span slot="description"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</span
        >
        <sgds-link slot="link">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card>
        <sgds-icon slot="icon" name="placeholder" size="3-xl"></sgds-icon>
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Icon Card</h3>
        <span slot="description">default vertical card</span>
        <sgds-link slot="link">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;

export const args = {};

export const parameters = {};
