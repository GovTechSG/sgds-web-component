import { html } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import mastheadStyle from "./masthead.style";

/**
 * @summary All .gov.sg digital services shall adopt The Official Government Banner for every page in the digital service and be placed at the top of the page.
 *
 * @cssproperty --masthead-font-family - Sets font family for masthead
 * @cssproperty --masthead-text-color - Sets overall text color
 * @cssproperty --masthead-link-color - Sets link color for `How to identify?` and `Trusted Site`
 * @cssproperty --masthead-link-color-hover - Sets link hover color for `How to identify?` and `Trusted Site`
 * @cssproperty --masthead-mobile-font-size - Sets the padding left and right for viewport width 1024px and below
 * @cssproperty --masthead-mobile-padding-x - Sets the font size for viewport width 1024px and below
 * @cssproperty --masthead-fluid-padding-x - Sets the container-fluid padding left and right for viewport width 1024px and above
 * @cssproperty --masthead-crest-color - Sets the lion head crest color.
 */
export class SgdsMasthead extends SgdsElement {
  static styles = [...SgdsElement.styles, mastheadStyle];

  /**
   * Sets the masthead container width to 100% for all breakpoints
   */
  @property({ type: Boolean, reflect: true })
  fluid = false;

  /** @internal */
  @state()
  toggleVisibility = false;

  /** @internal */
  private _toggleVisibility() {
    this.toggleVisibility = !this.toggleVisibility;
  }

  render() {
    return html`
      <div id="sgds-masthead" class="sgds-masthead" aria-label="A Singapore Government Agency Website">
        <div class="${this.fluid ? "container-fluid" : "container"}">
          <div class="row">
            <div class="col">
              <div class="masthead-layout">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  class="sg-crest"
                >
                  <path
                    d="M5.896 11.185c0 0-0.949 1.341 0.294 3.075 0 0 0.196-0.883 2.159-0.883h2.356c2.225 0 3.893-2.126 2.846-4.319 0 0 1.57 0.164 2.095-0.818 0.523-0.981-0.033-1.374-0.818-1.374h-3.959c0 0.704-1.341 0.802-1.341 0h-2.225c0 0-1.669 0-1.701 1.407 0 0 0.377-0.229 0.752-0.261v0.375c0 0-0.458 0.082-0.671 0.197-0.212 0.114-0.523 0.425-0.228 1.227 0.294 0.801 0.409 1.079 0.409 1.079s0.475-0.41 1.244-0.41h0.9c1.602 0 1.308 1.554-0.295 1.554s-1.815-0.85-1.815-0.85z"
                  ></path>
                  <path
                    d="M14.255 9.566c0 0 0.54 0.033 0.932-0.31 0 0 3.55 2.765-1.717 8.326-5.268 5.562-1.195 9.162-1.195 9.162s-0.948 0.915-0.409 2.699c0 0-2.191-1.237-3.867-3.338-2.422-3.036-3.902-7.681 2.749-11.386 0 0 4.389-2.208 3.506-5.153z"
                  ></path>
                  <path
                    d="M8.829 6.343c0 0 0.709-1.265 2.355-1.265 1.298 0 1.594-0.666 1.594-0.666s0.566-1.079 3.424-1.079c2.619 0 4.384 0.873 5.812 2.039 0 0-3.85-2.388-7.645 0.971h-5.54z"
                  ></path>
                  <path
                    d="M24.839 14.348c-0.109-3.948-3.163-8.179-9.728-7.939 6.413-5.431 17.537 6.695 8.375 13.066 0 0 1.533-2.186 1.353-5.126z"
                  ></path>
                  <path
                    d="M16.093 6.845c8.005-0.24 10.863 9.357 5.693 13.676l-5.191 2.509c0 0-0.676-2.181 1.833-4.734 2.509-2.551 4.929-7.328-2.006-10.469 0 0 0.131-0.654-0.327-0.981z"
                  ></path>
                  <path
                    d="M15.678 9.004c0 0 0.393-0.371 0.524-0.676 5.954 2.486 5.017 6.697 1.461 10.23-2.181 2.246-1.505 4.668-1.505 4.668s-2.66 1.657-3.577 3.097c0 0-3.852-3.28 1.483-8.724 5.235-5.344 1.614-8.594 1.614-8.594z"
                  ></path>
                </svg>
                <span>A Singapore Government Agency Website</span>
                <div
                  class="sgds-masthead-button"
                  id="sgds-masthead-identify"
                  role="button"
                  aria-expanded="${this.toggleVisibility}"
                  aria-controls="sgds-masthead-content"
                  @click=${() => this._toggleVisibility()}
                >
                  <span class="sgds-masthead-button-text">How to identify</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="sgds-masthead-identify-icon ${!this.toggleVisibility ? null : "show"}"
                  >
                    <path
                      d="M8.65188 6.85L8.64813 6.84625L10.0031 5.49125L17.0744 12.5625L15.7194 13.9175L10.0075 8.20562L4.2875 13.9256L2.9325 12.5706L8.6525 6.85062L8.65188 6.85Z"
                      fill="#2F60CE"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="sgds-masthead-content"
          class="container sgds-masthead-content ${this.toggleVisibility ? "show" : null}"
        >
          <div class="row">
            <div class="col">
              <div class="content-grid">
                <div class="wrapper">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      class="banner-icon"
                    >
                      <path
                        d="M0.166016 5.6665V9.00067H0.999349V13.9998H0.166016V16.4998H0.999349H3.49935H5.16602H7.66601H9.33268H11.8327H13.4993L15.9993 16.5007V16.4998H16.8327V13.9998H15.9993V9.00067H16.8327V5.6665L8.49935 0.666504L0.166016 5.6665ZM3.49935 13.9998V9.00067H5.16602V13.9998H3.49935ZM7.66601 13.9998V9.00067H9.33268V13.9998H7.66601ZM13.4993 13.9998H11.8327V9.00067H13.4993V13.9998ZM10.166 5.6665C10.166 6.58651 9.41935 7.33317 8.49935 7.33317C7.57935 7.33317 6.83268 6.58651 6.83268 5.6665C6.83268 4.7465 7.57935 3.99984 8.49935 3.99984C9.41935 3.99984 10.166 4.7465 10.166 5.6665Z"
                        fill="#242425"
                      ></path>
                    </svg>
                  </div>
                  <div class="content">
                    <div class="title">Official website links end with .gov.sg</div>
                    <article>
                      Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).<a
                        href="https://www.gov.sg/trusted-sites#govsites"
                        class="trusted-websites-link"
                        rel="noreferrer"
                        target="_blank"
                        >Trusted websites</a
                      >
                    </article>
                  </div>
                </div>
                <div class="wrapper">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="18"
                      viewBox="0 0 15 18"
                      fill="none"
                      class="banner-icon"
                    >
                      <path
                        d="M14.1663 9.00008C14.1663 8.08091 13.4188 7.33342 12.4997 7.33342H11.6663V4.83342C11.6663 2.53591 9.79717 0.666748 7.49967 0.666748C5.20217 0.666748 3.33301 2.53591 3.33301 4.83342V7.33342H2.49967C1.58051 7.33342 0.833008 8.08091 0.833008 9.00008V15.6667C0.833008 16.5859 1.58051 17.3334 2.49967 17.3334H12.4997C13.4188 17.3334 14.1663 16.5859 14.1663 15.6667V9.00008ZM4.99967 4.83342C4.99967 3.45508 6.12134 2.33341 7.49967 2.33341C8.87801 2.33341 9.99967 3.45508 9.99967 4.83342V7.33342H4.99967V4.83342Z"
                        fill="#242425"
                      ></path>
                    </svg>
                  </div>
                  <div class="content">
                    <div class="title">Secure websites use HTTPS</div>
                    <article>
                      Look for a<b> lock </b>(<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        class="banner-icon-inline"
                      >
                        <path
                          d="M14.1663 9.00008C14.1663 8.08091 13.4188 7.33342 12.4997 7.33342H11.6663V4.83342C11.6663 2.53591 9.79717 0.666748 7.49967 0.666748C5.20217 0.666748 3.33301 2.53591 3.33301 4.83342V7.33342H2.49967C1.58051 7.33342 0.833008 8.08091 0.833008 9.00008V15.6667C0.833008 16.5859 1.58051 17.3334 2.49967 17.3334H12.4997C13.4188 17.3334 14.1663 16.5859 14.1663 15.6667V9.00008ZM4.99967 4.83342C4.99967 3.45508 6.12134 2.33341 7.49967 2.33341C8.87801 2.33341 9.99967 3.45508 9.99967 4.83342V7.33342H4.99967V4.83342Z"
                          fill="#242425"
                        ></path></svg
                      >) or https:// as an added precaution. Share sensitive information only on official, secure
                      websites.
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsMasthead;
