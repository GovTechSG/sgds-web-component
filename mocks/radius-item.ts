import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

export class RadiusItem extends LitElement {
  @property({ type: String }) token = "";
  @property({ type: String }) variable = "";
  @property({ type: String }) radiusValue = "";

  @state() private isCopied = false;

  static shadowRootOptions = { mode: "open" };

  static styles = css`
    :host {
      display: block;
    }

    .radius-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radius-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 120px;
      background-color: var(--sgds-bg-alternate, #f5f5f5);
      border: 2px solid var(--sgds-border-color-default, #dcdcdc);
      transition: all 200ms ease-in-out;
    }


    .token-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .token-header {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 8px;
    }

    .token-name {
      font-size: 14px;
      font-weight: 600;
      word-break: break-word;
      color: var(--sgds-text-default, #000);
      flex: 1;
    }

    .token-variable {
      font-size: 12px;
      color: var(--sgds-text-subtle, #666);
    }

    .copy-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      cursor: pointer;
      opacity: 0.6;
      background-color: transparent;
      border: none;
      padding: 0;
      transition: opacity 200ms ease-in-out;
      flex-shrink: 0;
    }

    .copy-button:hover {
      opacity: 1;
    }

    .copy-button sgds-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  `;

  private async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.token);
      this.isCopied = true;

      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }

  render() {
    return html`
      <div class="radius-item" >
        <div class="radius-box" style="border-radius: var(${this.radiusValue});">

        </div>
        <div class="token-info">
          <div class="token-header">
            <div class="token-name">${this.token}</div>
            <button
              class="copy-button"
              @click=${this.copyToClipboard}
              aria-label="Copy token to clipboard"
            >
              <sgds-icon
                name="${this.isCopied ? "check" : "files"}"
              ></sgds-icon>
            </button>
          </div>
          <div class="token-variable">${this.variable}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("radius-item", RadiusItem);
