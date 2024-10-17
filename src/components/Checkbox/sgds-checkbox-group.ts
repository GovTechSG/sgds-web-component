import { html, nothing } from "lit";
import { queryAssignedElements, state, property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import checkboxGroupStyles from "./checkbox-group.css";
import formHintStyles from "../../styles/form-hint.css";
import SgdsCheckbox from "./sgds-checkbox";

export class SgdsCheckboxGroup extends SgdsElement {
  static styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, checkboxGroupStyles, formHintStyles];
  /**@internal */
  @queryAssignedElements({ slot: "checkbox", flatten: true }) private checkboxes!: NodeListOf<SgdsCheckbox>;
  /**@internal */
  @state() private hasInvalidCheckbox = false;
  @state() private validationMessage: string;

  /** The checkbox group's label  */
  @property({ reflect: true }) label = "";

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Allows invalidFeedback, invalid styles to be visible. When SgdsCheckboxGroup is used, it overrides the value of hasFeedback on SgdsCheckbox with its own value. */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** The checkbox group's hint text */
  @property({ reflect: true }) hintText = "";

  constructor() {
    super();
    this.addEventListener("sgds-validity-change", (e: CustomEvent) => {
      this.hasInvalidCheckbox = e.detail.invalid;
      this.validationMessage = e.detail.validationMessage;
    });
  }

  private _checkInvalidState() {
    this.hasInvalidCheckbox = Array.from(this.checkboxes).some(checkbox => checkbox.invalid);
  }
  /** Overrides hasFeedback from individual SgdsCheckbox  */
  private _forwardHasFeedback() {
    Array.from(this.checkboxes).forEach(checkbox => (checkbox.hasFeedback = this.hasFeedback));
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  firstUpdated() {
    this._forwardHasFeedback();
  }
  updated() {
    this._checkInvalidState();
  }
  render() {
    return html`
      <fieldset>
        <div class="label-hint-container">
          <label class="form-label">${this.label}</label>
          ${this._renderHintText()}
        </div>
        <div class="checkbox-container">
          <slot name="checkbox"></slot>
        </div>
        ${this.hasInvalidCheckbox && this.hasFeedback
          ? html`
              <div class="invalid-feedback-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                    fill="#B90000"
                  />
                </svg>
                <div id="checkbox-feedback" tabindex="0" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
                </div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsCheckboxGroup;
