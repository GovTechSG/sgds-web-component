import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import { SgdsButton } from "../Button/sgds-button";
import fileUploadStyles from "./file-upload.css";

import FormControlElement from "../../base/form-control-element";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * @summary Allows users to upload files of various sizes and formats
 *
 * @slot default - Label for file upload button
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading. Access the selected files with event.target.detail
 */

export class SgdsFileUpload extends SgdsFormValidatorMixin(FormControlElement) {
  static styles = [...FormControlElement.styles, fileUploadStyles];
  /**@internal */
  static dependencies = {
    "sgds-button": SgdsButton,
    "sgds-close-button": SgdsCloseButton,
    "sgds-icon": SgdsIcon
  };

  /** Allows multiple files to be listed for uploading */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Specify the acceptable file type  */
  @property({ type: String, reflect: true }) accept = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /** Makes the input as a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  @state()
  private selectedFiles: File[] = [];

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
  /**
   * Returns files selected for upload
   */
  public get files(): File[] {
    return this.selectedFiles;
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
        <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
        <div id="${this._controlId}-invalid" class="invalid-feedback">
          ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
        </div>
      </div>
    `;
  }
  render() {
    const getCheckedIcon = () => {
      return html`<sgds-icon name="check-circle-fill"></sgds-icon>`;
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
            <sgds-icon slot="rightIcon" name="upload"></sgds-icon>
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
