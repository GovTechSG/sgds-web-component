import { html, nothing } from "lit";
import {queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import checkboxGroupStyles from "./checkbox-group.css";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import SgdsCheckbox from "./sgds-checkbox";

export class SgdsCheckboxGroup extends SgdsElement {
  static styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, checkboxGroupStyles];

  @queryAssignedElements({ slot: "checkbox", flatten: true }) checkboxes!: NodeListOf<SgdsCheckbox>;

  @state() hasInvalidCheckbox = false;

  updated() {
    this.checkInvalidState();
  }

  checkInvalidState() {
    this.hasInvalidCheckbox = Array.from(this.checkboxes).some(checkbox => checkbox.invalid);
  }

  render() {
    return html`
      <div class="label-hint-container">
        <label
          @click=${null}
          class=${classMap({
            "form-label": true
          })}
        >
          <slot name="label"></slot>
        </label>

        <div class="hint-text">
          <slot name="hint-text"></slot>
        </div>
      </div>

      <fieldset>
        <div class="checkbox-container">
          <slot name="checkbox"></slot>
        </div>

        ${this.hasInvalidCheckbox
          ? html`
              <div class="error-message-container">
                <slot name="leftIcon" class="left-icon"></slot>
                <slot name="errorMessage" class="error-message"></slot>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}
