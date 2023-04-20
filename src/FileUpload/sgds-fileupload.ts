import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './sgds-fileupload.scss';
import SgdsElement from '../base/sgds-element';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { createRef, ref } from 'lit/directives/ref.js';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';


@customElement('sgds-fileupload')
export class SgdsFileUpload extends SgdsElement {
  /** The button's variant. */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  // /** Sets a unique id to the file input, required. */
  // @property({ type: String }) controlId = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Button sizes */
  @property({ reflect: true }) size: 'sm' | 'lg';

  @property({ type: String })
  checkedIcon? = '';

  @property({ type: String })
  cancelIcon? = '';

  @property({ type: FileList })
  private fileList: FileList | undefined;

  @property({ type: Array })
  private selectedFiles: File[] = [];

  constructor() {
    super();
    this.addEventListener('sgds-files-selected', () => {
      this.selectedFiles = Array.from(this.fileList || []);
      this.emit('selected-files-changed', {
        detail: { selectedFiles: this.selectedFiles }
      });
    });
  }

  setFileList(fileList) {
    this.fileList = fileList[0];
    this.emit('sgds-files-selected');
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

    const dt = new DataTransfer();
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

    const fileBuffer = new DataTransfer();
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
    const getCheckedIcon = (checkedIcon: string) => {
      if (checkedIcon) {
        return html`${unsafeSVG(checkedIcon)}`;
      }
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="green"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
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
        fill="red"
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
          <span class="me-2">${getCheckedIcon(this.checkedIcon)}</span>
          <span class="filename">${file.name}</span>
          <span class="ms-2" @click=${() => this.removeFileHandler(index)}>${getCancelIcon(this.cancelIcon)}</span>
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
          <sgds-button size=${this.size} variant=${this.variant} ?disabled=${this.disabled} @click=${this.handleClick}
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
