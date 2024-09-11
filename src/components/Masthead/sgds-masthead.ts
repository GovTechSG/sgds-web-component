import { html } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import mastheadStyle from "./masthead.css";
import svgStyles from "../../styles/svg.css";
import anchorStyles from "../../styles/anchor.css";

/**
 * @summary All .gov.sg digital services shall adopt The Official Government Banner for every page in the digital service and be placed at the top of the page.
 *
 * @cssproperty --masthead-mobile-font-size - Sets the padding left and right for viewport width 1024px and below
 * @cssproperty --masthead-mobile-padding-x - Sets the font size for viewport width 1024px and below
 * @cssproperty --masthead-fluid-padding-x - Sets the container-fluid padding left and right for viewport width 1024px and above
 */
export class SgdsMasthead extends SgdsElement {
  static styles = [...SgdsElement.styles, svgStyles, anchorStyles, mastheadStyle];

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
      <div id="sgds-masthead" class="sgds-masthead" aria-label="A Singapore Government Agency Website" role="banner">
        <div class="${this.fluid ? "container-fluid" : "container"}">
          <div class="row">
            <div class="col">
              <div class="masthead-layout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5.17419 8.41308C5.17419 8.41308 4.54237 9.33755 5.36993 10.533C5.36993 10.533 5.50042 9.92422 6.80735 9.92422H8.37592C9.85727 9.92422 10.9678 8.45858 10.2707 6.94674C10.2707 6.94674 11.316 7.0598 11.6655 6.38282C12.0137 5.70652 11.6436 5.43559 11.1209 5.43559H8.48511C8.48511 5.92092 7.5923 5.98848 7.5923 5.43559H6.11094C6.11094 5.43559 4.99976 5.43559 4.97845 6.40557C4.97845 6.40557 5.22945 6.2477 5.47912 6.22564V6.48416C5.47912 6.48416 5.17419 6.54069 5.03238 6.61997C4.89124 6.69856 4.68418 6.91296 4.88058 7.46585C5.07632 8.01805 5.15289 8.20971 5.15289 8.20971C5.15289 8.20971 5.46913 7.92705 5.98112 7.92705H6.58032C7.64689 7.92705 7.45115 8.99837 6.38391 8.99837C5.31667 8.99837 5.17552 8.41239 5.17552 8.41239L5.17419 8.41308Z"
                    fill="#DB0000"
                  />
                  <path
                    d="M10.7394 7.29696C10.7394 7.29696 11.0989 7.31971 11.3599 7.08325C11.3599 7.08325 13.7234 8.98942 10.2168 12.8231C6.70947 16.6575 9.42118 19.1393 9.42118 19.1393C9.42118 19.1393 8.79002 19.7701 9.14888 21C9.14888 21 7.69016 20.1472 6.57432 18.6988C4.9618 16.6058 3.97645 13.4036 8.40454 10.8494C8.40454 10.8494 11.3273 9.32722 10.7394 7.29696Z"
                    fill="#DB0000"
                  />
                  <path
                    d="M7.12702 5.07507C7.12702 5.07507 7.59906 4.20299 8.69493 4.20299C9.55911 4.20299 9.75618 3.74385 9.75618 3.74385C9.75618 3.74385 10.133 3 12.0358 3C13.7795 3 14.9546 3.60184 15.9053 4.40567C15.9053 4.40567 13.3421 2.7594 10.8154 5.07507H7.12702Z"
                    fill="#DB0000"
                  />
                  <path
                    d="M17.7861 10.5936C17.7135 7.87188 15.6803 4.95507 11.3094 5.12052C15.5791 1.37644 22.9852 9.736 16.8853 14.1281C16.8853 14.1281 17.906 12.6204 17.7861 10.5936Z"
                    fill="#DB0000"
                  />
                  <path
                    d="M11.9632 5.42114C17.2927 5.25568 19.1955 11.8718 15.7534 14.8493L12.2974 16.5789C12.2974 16.5789 11.8473 15.0754 13.5178 13.3154C15.1882 11.5567 16.7994 8.2635 12.1822 6.09812C12.1822 6.09812 12.2694 5.64726 11.9645 5.42182L11.9632 5.42114Z"
                    fill="#DB0000"
                  />
                  <path
                    d="M11.6869 6.90954C11.6869 6.90954 11.9485 6.65377 12.0358 6.44351C15.9998 8.15734 15.376 11.0604 13.0085 13.496C11.5564 15.0444 12.0065 16.7141 12.0065 16.7141C12.0065 16.7141 10.2355 17.8564 9.62498 18.8491C9.62498 18.8491 7.0604 16.5879 10.6123 12.8349C14.0977 9.15075 11.6869 6.90954 11.6869 6.90954Z"
                    fill="#DB0000"
                  />
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
                    fill="currentColor"
                    class="sgds-masthead-identify-icon ${!this.toggleVisibility ? null : "show"}"
                  >
                    <path
                      d="M8.65188 6.85L8.64813 6.84625L10.0031 5.49125L17.0744 12.5625L15.7194 13.9175L10.0075 8.20562L4.2875 13.9256L2.9325 12.5706L8.6525 6.85062L8.65188 6.85Z"
                      fill="currentColor"
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
