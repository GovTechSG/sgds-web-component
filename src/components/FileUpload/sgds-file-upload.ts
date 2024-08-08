import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsButton } from "../Button/sgds-button";
import fileUploadStyle from "./file-upload.css";
import genId from "../../utils/generateId";
import svgStyles from "../../styles/svg.css";
import formHintStyles from "../../styles/form-hint.css";
export type FileUploadButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

/**
 * @summary Allows users to upload files of various sizes and formats
 * @slot default - Label for file upload button
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading
 *
 * @cssproperty --sgds-file-upload-file-icon-color - Left icon color
 * @cssproperty --sgds-file-upload-remove-icon-color - Remove icon color
 * @cssproperty --sgds-file-upload-remove-icon-hover-color - Remove icon hover color
 * @cssproperty --sgds-file-upload-icon-gap - The gap between the icons of file upload
 * @cssproperty --sgds-file-upload-gap - The vertical gap between elements inside the file upload
 * @cssproperty --sgds-form-hint-text-color - The color of hint text
 * @cssproperty --sgds-form-hint-text-font-size - The font size of hint text
 * @cssproperty --sgds-form-hint-text-font-weight - The font weight of hint text
 */

export class SgdsFileUpload extends ScopedElementsMixin(SgdsElement) {
  static styles = [...SgdsElement.styles, svgStyles, formHintStyles, fileUploadStyle];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-button": SgdsButton
    };
  }
  /** The button's variant. */
  @property({ reflect: true }) variant: FileUploadButtonVariant = "primary";

  //** Disable the fileuploader button */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Allows multiple files to be listed for uploading */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /** Specify the acceptable file type  */
  @property({ type: String, reflect: true })
  accept = "";

  /** Specifies a large or small button */
  @property({ reflect: true }) size: "sm" | "lg";

  /** Customize the check icon with SVG */
  @property({ type: String })
  checkedIcon = "";

  /** Customize the cancel icon with SVG */
  @property({ type: String })
  cancelIcon = "";

  /** The input's hint text below the label */
  @property({ reflect: true }) hintText = "";

  /** @internal */
  @property({ type: Object, state: true })
  private files: FileList | undefined;

  /** @internal */
  @property({ type: Array })
  private selectedFiles: File[] = [];

  private _setFileList(files: FileList) {
    this.files = files;
    this.emit("sgds-files-selected");
    //Possible to pass in the files
  }

  // Create a ref to the input element
  /** @internal */
  private inputRef = createRef<HTMLInputElement>();

  /** @internal */
  private handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement.click();
    }
  }

  /** @internal */
  private handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;

    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
    // Trigger a re-render of the component to update the list of selected files
    this._setFileList(files);
    this.requestUpdate();
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
  }

  /**@internal */
  protected inputId: string = genId("input", "file");

  protected _renderHintText() {
    const hintTextTemplate = html` <small id="${this.inputId}Help" class="form-text">${this.hintText}</small> `;
    return this.hintText && hintTextTemplate;
  }

  private _sanitizeVariant(variant: FileUploadButtonVariant) {
    return variant.replace("outline-", "");
  }
  render() {
    const getCheckedIcon = (checkedIcon: string) => {
      if (checkedIcon) {
        return html`${unsafeSVG(checkedIcon)}`;
      }
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

    const getCancelIcon = (cancelIcon: string) => {
      if (cancelIcon) {
        return html`${unsafeSVG(cancelIcon)}`;
      }
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>`;
    };

    const listItems = this.selectedFiles.map(
      (file, index) => html`
        <li key=${index} class="fileupload-list-item">
          <span>${getCheckedIcon(this.checkedIcon)}</span>
          <span class="filename">${file.name}</span>
          <span @click=${() => this._removeFileHandler(index)}>${getCancelIcon(this.cancelIcon)}</span>
        </li>
      `
    );

    return html`
      <input
        ${ref(this.inputRef)}
        type="file"
        @change=${this.handleInputChange}
        ?multiple=${this.multiple}
        accept=${this.accept}
        id=${this.inputId}
      />
      <div class="fileupload-container">
        <sgds-button
          size=${this.size}
          variant=${this._sanitizeVariant(this.variant)}
          ?outlined=${this.variant.includes("outline")}
          ?disabled=${this.disabled}
          @click=${this.handleClick}
        >
          <label for=${this.inputId} class="file-upload-label"><slot></slot></label>
        </sgds-button>
        ${this._renderHintText()}
        <ul class="sgds fileupload-list">
          ${listItems}
        </ul>
      </div>
    `;
  }
}

export default SgdsFileUpload;
