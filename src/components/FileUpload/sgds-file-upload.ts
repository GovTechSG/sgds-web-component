import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
import { SgdsButton } from "../Button/sgds-button";
import fileUploadStyles from "./file-upload.css";

import FormControlElement from "../../base/form-control-element";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import { formatFileSize } from "../../utils/file";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsSpinner from "../Spinner/sgds-spinner";
import type { ISgdsFileUploadFilesSelectedEventDetail } from "./types";
export type { ISgdsFileUploadFilesSelectedEventDetail };

/**
 * @summary Allows users to upload files of various sizes and formats
 *
 * @slot default - Label for file upload button (used in default variant)
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading. Access the selected files with event.target.detail
 * @eventDetail {ISgdsFileUploadFilesSelectedEventDetail} sgds-files-selected
 */

export class SgdsFileUpload extends SgdsFormValidatorMixin(FormControlElement) {
  static styles = [...FormControlElement.styles, fileUploadStyles];
  /**@internal */
  static dependencies = {
    "sgds-button": SgdsButton,
    "sgds-close-button": SgdsCloseButton,
    "sgds-icon": SgdsIcon,
    "sgds-spinner": SgdsSpinner
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

  /** Variant of the file upload component: "default" or "drag-and-drop" */
  @property({ type: String, reflect: true }) variant: "default" | "drag-and-drop" = "default";

  @state()
  private selectedFiles: File[] = [];

  @state()
  private exitingIndex: number | null = null;

  @state()
  private fileMetadata: Map<number, { uploading: boolean; error?: string }> = new Map();

  private _isProgrammaticChange = false;

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

  /**
   * Set the upload state of a file at the given index
   */
  public setFileUploadState(index: number, state: "uploading" | "success" | "error", error?: string) {
    this.fileMetadata.set(index, {
      uploading: state === "uploading",
      error: error
    });
    this.requestUpdate();
  }

  private _setFileList(files: FileList) {
    this.emit<ISgdsFileUploadFilesSelectedEventDetail>("sgds-files-selected", { detail: files });
  }

  private inputRef = createRef<HTMLInputElement>();
  private _dragZoneRef = createRef<HTMLDivElement>();
  private _dragCounter = 0;

  private _handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement?.click();
    }
  }

  private _handleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;

    if (files.length > 0) {
      // Only combine files if this is user-initiated (not programmatic removal)
      if (this.multiple && this.selectedFiles.length > 0 && !this._isProgrammaticChange) {
        const newFiles = Array.from(files);
        const combined = [...this.selectedFiles, ...newFiles];
        this.selectedFiles = combined;

        // Update inputElement.files with combined files using DataTransfer
        const fileBuffer = new DataTransfer();
        combined.forEach(file => fileBuffer.items.add(file));
        inputElement.files = fileBuffer.files;
      } else {
        this.selectedFiles = Array.from(files);
      }
    }
    // Trigger a re-render of the component to update the list of selected files
    this._setFileList(inputElement.files as FileList);
    this.requestUpdate();
    super._mixinHandleChange(event);
  }

  private _removeFileHandler(index: number) {
    // Mark the file as exiting to trigger the animation
    this.exitingIndex = index;
    this.requestUpdate();

    // Wait for animation to complete before removing the file
    setTimeout(() => {
      const inputElement = this.inputRef.value;
      if (!inputElement) return;

      const attachments = inputElement.files;
      if (!attachments) return;

      const fileBuffer = new DataTransfer();
      for (let i = 0; i < attachments.length; i++) {
        if (index !== i) fileBuffer.items.add(attachments[i]);
      }

      // Mark as programmatic change to prevent file combining in _handleChange
      this._isProgrammaticChange = true;

      // Assign buffer to file input
      inputElement.files = fileBuffer.files;
      // Re-populate selected files to the lists
      this._setFileList(fileBuffer.files);
      this.selectedFiles = Array.from(fileBuffer.files);

      this.requestUpdate();

      // Dispatch change event to trigger validation
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));

      // Reset flag after change event is processed
      this._isProgrammaticChange = false;
    }, 300); // Motion token for standard duration
  }

  private _clearAllFiles() {
    const inputElement = this.inputRef.value;
    const fileBuffer = new DataTransfer();
    if (inputElement) {
      inputElement.files = fileBuffer.files;
    }
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
  private _handleDragEnter(e: DragEvent) {
    e.preventDefault();
    this._dragCounter++;
    if (this._dragCounter === 1) {
      this._dragZoneRef.value?.focus();
    }
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  }

  private _handleDragLeave(e: DragEvent) {
    this._dragCounter--;
    if (this._dragCounter === 0) {
      this._dragZoneRef.value?.blur();
    }
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    this._dragCounter = 0;
    this._dragZoneRef.value?.blur();

    if (this.disabled || !e.dataTransfer) {
      return;
    }

    let files = Array.from(e.dataTransfer.files);

    // Apply multiple constraint
    if (!this.multiple && files.length > 1) {
      files = files.slice(0, 1);
    }

    // Sync files into inputRef using DataTransfer
    const fileBuffer = new DataTransfer();
    files.forEach(file => fileBuffer.items.add(file));
    const inputElement = this.inputRef.value;
    if (inputElement) {
      inputElement.files = fileBuffer.files;
      this.selectedFiles = Array.from(fileBuffer.files);
      this._setFileList(fileBuffer.files);
      this._mixinValidate(this.input);
    }
  }

  private _renderUploadZone() {
    if (this.variant === "drag-and-drop") {
      return html`
        <div
          class="drag-drop-zone"
          tabindex=${this.disabled ? "-1" : "0"}
          ${ref(this._dragZoneRef)}
          @dragenter=${this._handleDragEnter}
          @dragover=${this._handleDragOver}
          @dragleave=${this._handleDragLeave}
          @drop=${this._handleDrop}
        >
          <sgds-icon name="upload" size="lg"></sgds-icon>
          <div class="drag-drop-text">Drag and drop files here</div>
          <sgds-button size="sm" variant="outline" tone="brand" ?disabled=${this.disabled} @click=${this._handleClick}>
            <slot></slot>
          </sgds-button>
        </div>
      `;
    }

    return html`
      <sgds-button variant="outline" ?disabled=${this.disabled} @click=${this._handleClick}>
        <label for=${this._controlId}><slot></slot></label>
        <sgds-icon slot="rightIcon" name="upload"></sgds-icon>
      </sgds-button>
    `;
  }

  render() {
    const getCheckedIcon = (metadata?: { uploading: boolean; error?: string }) => {
      const iconClass = this.invalid || metadata?.error ? "invalid" : "valid";
      return html`<sgds-icon name="check-circle-fill" class="${iconClass}"></sgds-icon>`;
    };

    const listItems = this.selectedFiles.map((file, index) => {
      const metadata = this.fileMetadata.get(index);
      return html`
        <div class="file-upload-list-item-container" key=${index}>
          <li
            key=${index}
            class="file-upload-list-item ${this.exitingIndex === index ? "file-upload-exit" : ""} ${metadata?.error
              ? "file-upload-error"
              : ""}"
          >
            ${metadata?.uploading ? html`<sgds-spinner size="sm"></sgds-spinner>` : getCheckedIcon(metadata)}
            <span class="filename">${file.name}</span>
            <span class="filesize">${formatFileSize(file.size)}</span>
            <sgds-close-button
              aria-label="remove the file"
              ?disabled=${metadata?.uploading}
              @click=${() => this._removeFileHandler(index)}
            ></sgds-close-button>
          </li>
          ${metadata?.error
            ? html`
                <div class="invalid-feedback-container">
                  <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
                  <div class="invalid-feedback">${metadata.error}</div>
                </div>
              `
            : ""}
        </div>
      `;
    });

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
          ${this._renderLabel()} ${this._renderUploadZone()}
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
