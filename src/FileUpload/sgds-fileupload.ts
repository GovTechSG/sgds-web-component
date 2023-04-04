import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-fileupload.scss";
import SgdsElement from "../utils/sgds-element";
import genId from "../utils/generateId";
import { createRef, ref } from "lit/directives/ref.js";

export type ButtonVariant =
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

type SelectedFileType = FileList | {};

@customElement("sgds-fileupload")
export class SgdsFileUpload extends SgdsElement {
  /** The button's variant. */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  // /** Sets a unique id to the file input, required. */
  // @property({ type: String }) controlId = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Button sizes */
  @property({ reflect: true }) size: "sm" | "lg";

  @property({ type: String })
  checkedIcon = "check";

  @property({ type: String })
  cancelIcon = "x-circle";

  @property({ type: FileList })
  private fileList: FileList | undefined;

  @property({ type: Array })
  private selectedFiles: File[] = [];

  constructor() {
    super();
    this.addEventListener('sgds-change', () => {
      this.selectedFiles = Array.from(this.fileList || []);
      this.dispatchEvent(new CustomEvent('selected-files-changed', {
        detail: { selectedFiles: this.selectedFiles },
        bubbles: true,
        composed: true
      }));
    });
  }

  setFileList(fileList) {
    this.fileList = fileList[0];
    this.dispatchEvent(new CustomEvent('sgds-change', { bubbles: true, composed: true }));
  }


  static styles = styles;

  // Create a ref to the input element
  private inputRef = createRef<HTMLInputElement>();



  private handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement.click();
    }
  }

  private handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files as FileList;

    var dt = new DataTransfer();
    for (let i = 0; i < fileList.length; i++) {
      dt.items.add(fileList[i]);
    }


    this.setFileList(dt.files);
    this.selectedFiles = Array.from(dt.files);

    // Trigger a re-render of the component to update the list of selected files
    this.requestUpdate();
  }

  removeFileHandler(index: number) {
    const inputElement = this.inputRef.value;
    const attachments = inputElement.files;

    let fileBuffer = new DataTransfer();
    for (let i = 0; i < attachments.length; i++) {
      if (index !== i) fileBuffer.items.add(attachments[i]);
    }

    // Assign buffer to file input
    inputElement.files = fileBuffer.files;

    this.setFileList(fileBuffer.files);
    this.selectedFiles = Array.from(fileBuffer.files);

    // Trigger a re-render of the component to update the list of selected files
    this.requestUpdate();
  }

  render() {
    const checkedIcon = html`<sl-icon
      name=${this.checkedIcon}
      class="align-middle me-2"
    ></sl-icon>`;
    const cancelIcon = (index: number) => html`
      <sl-icon
        name=${this.cancelIcon}
        class="align-middle ms-2"
        @click=${() => this.removeFileHandler(index)}
      ></sl-icon>
    `;

    const listItems = this.selectedFiles.map(
      (file, index) => html`
        <li key=${index} class="fileupload-list-item">
          ${checkedIcon}
          <span class="filename">${file.name}</span>
          ${cancelIcon(index)}
        </li>
      `
    );
    return html`
      <form>
        <div>
          <input
            ${ref(this.inputRef)}
            type="file"
            class="d-none form-control"
            @change=${this.handleInputChange}
            multiple
          />
          <sgds-button
            size=${this.size}
            variant=${this.variant}
            ?disabled=${this.disabled}
            @click=${this.handleClick}
            ><slot></slot
          ></sgds-button>
        </div>
      </form>
      <ul class="sgds fileupload-list">
        ${listItems}
      </ul>
    `;
  }
}

export default SgdsFileUpload;
