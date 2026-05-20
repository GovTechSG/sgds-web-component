import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import { SgdsButton } from "../Button/sgds-button";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
import fileUploadStyles from "./file-upload.css";

import FormControlElement from "../../base/form-control-element";
import { formatFileSize } from "../../utils/file";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsSpinner from "../Spinner/sgds-spinner";
import type {
  ISgdsFileUploadAddFilesEventDetail,
  ISgdsFileUploadChangeEventDetail,
  ISgdsFileUploadFilesSelectedEventDetail,
  ISgdsFileUploadRemoveFileEventDetail
} from "./types";
export type {
  ISgdsFileUploadAddFilesEventDetail,
  ISgdsFileUploadChangeEventDetail,
  ISgdsFileUploadFilesSelectedEventDetail,
  ISgdsFileUploadRemoveFileEventDetail
};

/**
 * @summary Allows users to upload files of various sizes and formats
 *
 * @slot default - Label for file upload button (used in default variant)
 *
 * @event sgds-files-selected - (@deprecated) Deprecated since 3.19.0 in favour of sgds-change. Emitted whenever the file set changes (files added or removed). Access the files with event.detail.
 * @eventDetail {ISgdsFileUploadFilesSelectedEventDetail} sgds-files-selected
 * @event sgds-add-files - Emitted when files are added to the upload. Access the files with event.detail
 * @eventDetail {ISgdsFileUploadAddFilesEventDetail} sgds-add-files
 * @event sgds-remove-file - Emitted when files are removed from the upload. Access the remaining files with event.detail
 * @eventDetail {ISgdsFileUploadRemoveFileEventDetail} sgds-remove-file
 * @event sgds-change - Emitted whenever the file set changes (files added or removed). Access the current files with event.detail
 * @eventDetail {ISgdsFileUploadChangeEventDetail} sgds-change
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

  /** Disables native and sgds validation for the component. Use this when you want to do custom validation */
  @property({ type: Boolean, reflect: true }) noValidate = false;

  @state()
  private selectedFiles: File[] = [];

  @state()
  private exitingFile: File | null = null;

  @state()
  private fileMetadata: Map<File, { uploading: boolean; error?: string }> = new Map();

  @state() protected _isTouched = false;

  /**
   * Flag to distinguish code-driven file changes from user-initiated ones.
   *
   * Set to `true` inside `_removeFileHandler` before it manually assigns
   * `inputElement.files` and dispatches a synthetic `change` event.
   * This tells `_handleChange` to:
   *  - Skip appending/combining files (avoid duplicating remaining files)
   *  - Skip emitting user-facing events (sgds-add-files, sgds-change)
   *  - Still run validation (so required-field checks update after removal)
   *
   * Reset to `false` immediately after the synthetic change event is processed.
   */
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
  public setFileUploadState(index: number, state: "loading" | "success" | "error", error?: string) {
    const file = this.selectedFiles[index];
    if (file) {
      this.fileMetadata.set(file, {
        uploading: state === "loading",
        error: error
      });
      this.requestUpdate();
    }
  }

  private _setFileList(files: FileList, previousCount = 0, deletedFile?: File) {
    // Always emit sgds-change event (fires on any file set change)
    this.emit<ISgdsFileUploadChangeEventDetail>("sgds-change", { detail: files });

    // Always emit sgds-files-selected for backwards compatibility (deprecated)
    this.emit<ISgdsFileUploadFilesSelectedEventDetail>("sgds-files-selected", { detail: files });

    // Emit sgds-add-files when files are ADDED (count increased or file set changed while maintaining same count)
    if (files.length > previousCount) {
      // Extract only the new files (those added after previousCount)
      const allFilesArray = Array.from(files);
      const newFilesArray = allFilesArray.slice(previousCount);

      // Create a FileList containing only new files using DataTransfer
      const dt = new DataTransfer();
      newFilesArray.forEach(file => dt.items.add(file));

      this.emit<ISgdsFileUploadAddFilesEventDetail>("sgds-add-files", { detail: dt.files });
    } else if (files.length === previousCount && previousCount > 0 && !deletedFile) {
      // Handle single-file replacement case (e.g., when multiple=false and user selects a different file)
      // In this case, all files are "new" (different from before)
      const dt = new DataTransfer();
      Array.from(files).forEach(file => dt.items.add(file));
      this.emit<ISgdsFileUploadAddFilesEventDetail>("sgds-add-files", { detail: dt.files });
    }

    // Emit sgds-remove-file when files are REMOVED (count decreased)
    if (files.length < previousCount && deletedFile) {
      this.emit<ISgdsFileUploadRemoveFileEventDetail>("sgds-remove-file", { detail: { file: deletedFile, files } });
    }
  }

  private inputRef = createRef<HTMLInputElement>();
  private _dragZoneRef = createRef<HTMLDivElement>();
  private _dragCounter = 0;
  private _isDialogOpen = false;

  private _handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      this._isDialogOpen = true;
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement?.click();
    }
  }

  private _handleCancel() {
    this._isDialogOpen = false;
    this._isTouched = true;
    if (this._mixinShouldSkipSgdsValidation()) return;
    this.setInvalid(!this._mixinCheckValidity());
  }

  private _handleChange(event: Event) {
    this._isDialogOpen = false;
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;
    const previousCount = this.selectedFiles.length;

    const isUserCancel = files.length === 0 && !this._isProgrammaticChange;
    const isUserSelection = files.length > 0 && !this._isProgrammaticChange;
    const shouldAppendFiles = isUserSelection && this.multiple && this.selectedFiles.length > 0;

    // --- 1. Sync selectedFiles with native input ---
    if (isUserCancel && this.selectedFiles.length > 0) {
      this._restoreNativeInput(inputElement);
    } else if (shouldAppendFiles) {
      this._appendFiles(inputElement, files);
    } else if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }

    // --- 2. Emit events (only on user-initiated selection) ---
    if (isUserSelection) {
      this._setFileList(inputElement.files as FileList, previousCount);
    }

    // --- 3. Run validation ---
    if (!isUserCancel || this._isTouched) {
      super._mixinHandleChange(event);
    }
  }

  private _restoreNativeInput(inputElement: HTMLInputElement) {
    const fileBuffer = new DataTransfer();
    this.selectedFiles.forEach(file => fileBuffer.items.add(file));
    inputElement.files = fileBuffer.files;
  }

  private _appendFiles(inputElement: HTMLInputElement, files: FileList) {
    const combined = [...this.selectedFiles, ...Array.from(files)];
    this.selectedFiles = combined;
    const fileBuffer = new DataTransfer();
    combined.forEach(file => fileBuffer.items.add(file));
    inputElement.files = fileBuffer.files;
  }

  private _removeFileHandler(index: number) {
    // Mark the file as exiting to trigger the animation (store the actual File object)
    const deletedFile = this.selectedFiles[index];
    this.exitingFile = deletedFile;
    this.requestUpdate();

    // Wait for animation to complete before removing the file
    setTimeout(() => {
      const inputElement = this.inputRef.value;
      if (!inputElement) return;

      const previousCount = this.selectedFiles.length; // Track count before removal

      const fileBuffer = new DataTransfer();
      this.selectedFiles.forEach((file, i) => {
        if (index !== i) fileBuffer.items.add(file);
      });

      // Mark as programmatic change to prevent file combining in _handleChange
      this._isProgrammaticChange = true;

      // Assign buffer to file input
      inputElement.files = fileBuffer.files;
      // Re-populate selected files to the lists, passing the deleted file
      this._setFileList(fileBuffer.files, previousCount, deletedFile);
      this.selectedFiles = Array.from(fileBuffer.files);

      // Clear exiting file after removal
      this.exitingFile = null;

      this.requestUpdate();

      // Dispatch change event to trigger validation
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));

      // Reset flag after change event is processed
      this._isProgrammaticChange = false;
    }, 300); // Motion token for standard duration
  }

  private _clearAllFiles() {
    const inputElement = this.inputRef.value;
    const previousCount = this.selectedFiles.length;
    const fileBuffer = new DataTransfer();
    if (inputElement) {
      inputElement.files = fileBuffer.files;
    }
    this._setFileList(fileBuffer.files, previousCount);
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

  protected _handleBlur() {
    const sgdsBlur = this.emit("sgds-blur", { cancelable: true });
    if (this._mixinShouldSkipSgdsValidation()) return;
    if (sgdsBlur.defaultPrevented) return;
    if (this._isDialogOpen) return;

    this.setInvalid(!this._mixinCheckValidity());
    this._isTouched = true;
  }

  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._mixinShouldSkipSgdsValidation()) return;
    if (this._isTouched) {
      this.setInvalid(!this._mixinCheckValidity());
    }
  }
  protected _renderLabel() {
    const labelTemplate = html` <label id=${this._labelId} class="form-label"> ${this.label} </label> `;
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

    // Set only the new files on the input, then let _handleChange
    // handle combining, event emission, and validation
    const fileBuffer = new DataTransfer();
    files.forEach(file => fileBuffer.items.add(file));

    const inputElement = this.inputRef.value;
    if (inputElement) {
      inputElement.files = fileBuffer.files;
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
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
          @blur=${this._handleBlur}
        >
          <sgds-icon name="upload" size="lg"></sgds-icon>
          <div class="drag-drop-text">Drag and drop files here</div>
          <sgds-button size="sm" variant="outline" tone="brand" ?disabled=${this.disabled} @click=${this._handleClick}>
            <slot>Choose files</slot>
          </sgds-button>
        </div>
      `;
    }

    return html`
      <sgds-button
        variant="outline"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @sgds-blur=${this._handleBlur}
      >
        <slot>Choose files</slot>
        <sgds-icon slot="rightIcon" name="upload"></sgds-icon>
      </sgds-button>
    `;
  }

  render() {
    const getCheckedIcon = (metadata?: { uploading: boolean; error?: string }) => {
      const iconClass = this.invalid || metadata?.error ? "invalid" : "valid";
      return html`<sgds-icon name="check-circle-fill" class="${iconClass}"></sgds-icon>`;
    };

    const listItems = repeat(
      this.selectedFiles,
      file => file, // Use File object as stable key
      (file, index) => {
        const metadata = this.fileMetadata.get(file);
        return html`
          <li class="file-upload-list-item-container ${this.exitingFile === file ? "file-upload-exit" : ""}">
            <div class="file-upload-list-item ${metadata?.error ? "file-upload-error" : ""}">
              ${metadata?.uploading ? html`<sgds-spinner size="sm"></sgds-spinner>` : getCheckedIcon(metadata)}
              <span class="filename">${file.name}</span>
              <span class="filesize">${formatFileSize(file.size)}</span>
              <sgds-close-button
                aria-label="remove the file"
                ?disabled=${metadata?.uploading}
                @click=${() => this._removeFileHandler(index)}
              ></sgds-close-button>
            </div>
            ${metadata?.error
              ? html`
                  <div class="invalid-feedback-container">
                    <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
                    <div class="invalid-feedback">${metadata.error}</div>
                  </div>
                `
              : ""}
          </li>
        `;
      }
    );

    return html`
      <input
        ${ref(this.inputRef)}
        type="file"
        @change=${this._handleChange}
        @cancel=${this._handleCancel}
        ?multiple=${this.multiple}
        accept=${this.accept}
        id=${this._controlId}
        ?required=${this.required && !this.noValidate}
        ?disabled=${this.disabled}
      />
      <div class="file-upload-container">
        ${this._renderLabel()} ${this._renderUploadZone()}
        ${this.hasFeedback && this.invalid ? this._renderFeedback() : this._renderHintText()}
      </div>
      <ul class="file-upload-list ${this.selectedFiles.length > 0 ? "has-files" : ""}">
        ${listItems}
      </ul>
    `;
  }
}

export default SgdsFileUpload;
