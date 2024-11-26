import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import { SgdsButton } from "../Button/sgds-button";
import fileUploadStyles from "./file-upload.css";

import FormControlElement from "../../base/form-control-element";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";

/**
 * @summary Allows users to upload files of various sizes and formats
 * @slot default - Label for file upload button
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading. Access the selected files with event.target.detail
 */

export class SgdsFileUpload extends SgdsFormValidatorMixin(ScopedElementsMixin(FormControlElement)) {
  static styles = [...FormControlElement.styles, fileUploadStyles];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-button": SgdsButton,
      "sgds-close-button": SgdsCloseButton
    };
  }

  /** Allows multiple files to be listed for uploading */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Specify the acceptable file type  */
  @property({ type: String, reflect: true }) accept = "";

  // /** Customize the check icon with SVG */
  // @property({ type: String }) checkedIcon = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /** Makes the input as a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  @property()
  selectedFiles: File[] = [];

  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  public get validationMessage(): string {
    return this._mixinGetValidationMessage();
  }

  private _setFileList(files: FileList) {
    this.emit("sgds-files-selected", { detail: files });
  }

  private inputRef = createRef<HTMLInputElement>();

  private _handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement.click();
    }
  }

  private _handleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;

    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
    // Trigger a re-render of the component to update the list of selected files
    this._setFileList(files);
    this.requestUpdate();
    super._mixinHandleChange(event);
  }

  private _removeFileHandler(index: number) {
    const inputElement = this.inputRef.value;
    const attachments = inputElement.files;

    const fileBuffer = new DataTransfer();
    for (let i = 0; i < attachments.length; i++) {
      if (index !== i) fileBuffer.items.add(attachments[i]);
    }

    // Assign buffer to file input
    inputElement.files = fileBuffer.files;
    // Re-populate selected files to the lists
    this._setFileList(fileBuffer.files);
    this.selectedFiles = Array.from(fileBuffer.files);

    // Trigger a re-render of the component to update the list of selected files
    this.requestUpdate();
    this._mixinValidate(this.input);
  }

  private _clearAllFiles() {
    const inputElement = this.inputRef.value;
    const fileBuffer = new DataTransfer();
    inputElement.files = fileBuffer.files;
    this._setFileList(fileBuffer.files);
    this.selectedFiles = Array.from(fileBuffer.files);
  }

  /**
   * fileupload requries a custom _mixinResetFormControl for clearing files
   */
  private _mixinResetFormControl() {
    this._clearAllFiles();
    this._mixinResetValidity(this.input);
  }
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.setInvalid(false);
  }
  protected _renderLabel() {
    const labelTemplate = html`
      <label for=${this._controlId} id=${this._labelId} class="form-label"> ${this.label} </label>
    `;
    return this.label && labelTemplate;
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  protected _renderFeedback() {
    return html`
      <div class="invalid-feedback-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
            fill="#B90000"
          />
        </svg>
        <div id="${this._controlId}-invalid" class="invalid-feedback">
          ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
        </div>
      </div>
    `;
  }
  render() {
    const getCheckedIcon = () => {
      // if (checkedIcon) {
      //   return html`${unsafeSVG(checkedIcon)}`;
      // }
      return html` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
        />
      </svg>`;
    };

    const listItems = this.selectedFiles.map(
      (file, index) => html`
        <li key=${index} class="file-upload-list-item">
          <span>${getCheckedIcon()}</span>
          <span class="filename">${file.name}</span>
          <sgds-close-button
            aria-label="remove the file"
            @click=${() => this._removeFileHandler(index)}
          ></sgds-close-button>
        </li>
      `
    );

    return html`
      <div class="file-upload">
        <input
          ${ref(this.inputRef)}
          type="file"
          @change=${this._handleChange}
          ?multiple=${this.multiple}
          accept=${this.accept}
          id=${this._controlId}
          ?required=${this.required}
          ?disabled=${this.disabled}
        />
        <div class="file-upload-container">
          ${this._renderLabel()}
          <sgds-button variant="outline" ?disabled=${this.disabled} @click=${this._handleClick}>
            <label for=${this._controlId}><slot></slot></label>
            <svg
              slot="rightIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.5625 14.1943C3.71168 14.1943 3.85476 14.2535 3.96025 14.359C4.06574 14.4645 4.125 14.6076 4.125 14.7568V17.5693C4.125 17.8677 4.24353 18.1538 4.4545 18.3648C4.66548 18.5758 4.95163 18.6943 5.25 18.6943H18.75C19.0484 18.6943 19.3345 18.5758 19.5455 18.3648C19.7565 18.1538 19.875 17.8677 19.875 17.5693V14.7568C19.875 14.6076 19.9343 14.4645 20.0398 14.359C20.1452 14.2535 20.2883 14.1943 20.4375 14.1943C20.5867 14.1943 20.7298 14.2535 20.8352 14.359C20.9407 14.4645 21 14.6076 21 14.7568V17.5693C21 18.166 20.7629 18.7383 20.341 19.1603C19.919 19.5822 19.3467 19.8193 18.75 19.8193H5.25C4.65326 19.8193 4.08097 19.5822 3.65901 19.1603C3.23705 18.7383 3 18.166 3 17.5693V14.7568C3 14.6076 3.05926 14.4645 3.16475 14.359C3.27024 14.2535 3.41332 14.1943 3.5625 14.1943Z"
                fill="currentColor"
              />
              <path
                d="M11.6018 4.34604C11.654 4.29366 11.7161 4.2521 11.7844 4.22374C11.8528 4.19538 11.926 4.18079 12 4.18079C12.074 4.18079 12.1473 4.19538 12.2156 4.22374C12.2839 4.2521 12.346 4.29366 12.3983 4.34604L15.7733 7.72104C15.8789 7.82666 15.9382 7.96992 15.9382 8.11929C15.9382 8.26866 15.8789 8.41192 15.7733 8.51754C15.6676 8.62316 15.5244 8.6825 15.375 8.6825C15.2256 8.6825 15.0824 8.62316 14.9768 8.51754L12.5625 6.10217V15.9943C12.5625 16.1435 12.5032 16.2866 12.3978 16.392C12.2923 16.4975 12.1492 16.5568 12 16.5568C11.8508 16.5568 11.7077 16.4975 11.6023 16.392C11.4968 16.2866 11.4375 16.1435 11.4375 15.9943V6.10217L9.02326 8.51754C8.97096 8.56984 8.90887 8.61133 8.84054 8.63963C8.77221 8.66793 8.69897 8.6825 8.62501 8.6825C8.55105 8.6825 8.47781 8.66793 8.40948 8.63963C8.34114 8.61133 8.27906 8.56984 8.22676 8.51754C8.17446 8.46524 8.13297 8.40316 8.10467 8.33482C8.07636 8.26649 8.0618 8.19325 8.0618 8.11929C8.0618 8.04533 8.07636 7.97209 8.10467 7.90376C8.13297 7.83543 8.17446 7.77334 8.22676 7.72104L11.6018 4.34604Z"
                fill="currentColor"
              />
            </svg>
          </sgds-button>
          ${this.hasFeedback && this.invalid ? this._renderFeedback() : this._renderHintText()}
        </div>
        <ul class="file-upload-list">
          ${listItems}
        </ul>
      </div>
    `;
  }
}

export default SgdsFileUpload;
