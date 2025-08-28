import "./sgds-web-component";
import type { SgdsMasthead } from "../src/components";
import { fixture, assert, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";

describe("sgds-masthead", () => {
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-masthead></sgds-masthead>`);
    assert.shadowDom.equal(
      el,
      ` 
    <div id="sgds-masthead" class="sgds-masthead" aria-label="A Singapore Government Agency Website. Beware of government impersonation scams." role="banner">
        <div class="banner">
          <div class="container">
            <div class="masthead-layout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                class="sg-crest"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.31179 7.0109C4.31179 7.0109 3.78527 7.78129 4.4749 8.77746C4.4749 8.77746 4.58365 8.27018 5.67275 8.27018H6.97989C8.21435 8.27018 9.13979 7.04881 8.55889 5.78895C8.55889 5.78895 9.42995 5.88317 9.72123 5.31901C10.0114 4.75544 9.70292 4.52966 9.26739 4.52966H7.07088C7.07088 4.9341 6.32687 4.9904 6.32687 4.52966H5.09241C5.09241 4.52966 4.16643 4.52966 4.14867 5.33797C4.14867 5.33797 4.35784 5.20641 4.56589 5.18803V5.40346C4.56589 5.40346 4.31179 5.45057 4.19361 5.51664C4.07599 5.58213 3.90344 5.7608 4.06711 6.22154C4.23023 6.68171 4.29403 6.84142 4.29403 6.84142C4.29403 6.84142 4.55757 6.60588 4.98422 6.60588H5.48356C6.37237 6.60588 6.20925 7.49864 5.31989 7.49864C4.43052 7.49864 4.3129 7.01032 4.3129 7.01032L4.31179 7.0109Z"
                  fill="currentColor"
                />
                <path
                  d="M8.94948 6.0808C8.94948 6.0808 9.24908 6.09976 9.46657 5.90271C9.46657 5.90271 11.4362 7.49118 8.51395 10.6859C5.59118 13.8813 7.85094 15.9494 7.85094 15.9494C7.85094 15.9494 7.32498 16.4751 7.62402 17.5C7.62402 17.5 6.40843 16.7894 5.47856 15.5823C4.13479 13.8382 3.31367 11.1697 7.00374 9.04116C7.00374 9.04116 9.43938 7.77268 8.94948 6.0808Z"
                  fill="currentColor"
                />
                <path
                  d="M5.93914 4.22922C5.93914 4.22922 6.33251 3.50249 7.24573 3.50249C7.96588 3.50249 8.13011 3.11988 8.13011 3.11988C8.13011 3.11988 8.44413 2.5 10.0298 2.5C11.4829 2.5 12.4621 3.00153 13.2544 3.67139C13.2544 3.67139 11.1183 2.2995 9.01282 4.22922H5.93914Z"
                  fill="currentColor"
                />
                <path
                  d="M14.8217 8.828C14.7612 6.5599 13.0668 4.12922 9.42448 4.2671C12.9825 1.14703 19.1543 8.11333 14.0711 11.7734C14.0711 11.7734 14.9216 10.517 14.8217 8.828Z"
                  fill="currentColor"
                />
                <path
                  d="M9.96927 4.51761C14.4106 4.37973 15.9962 9.89315 13.1278 12.3744L10.2478 13.8158C10.2478 13.8158 9.87273 12.5628 11.2648 11.0961C12.6568 9.6306 13.9994 6.88625 10.1518 5.08177C10.1518 5.08177 10.2245 4.70605 9.97038 4.51819L9.96927 4.51761Z"
                  fill="currentColor"
                />
                <path
                  d="M9.73904 5.75795C9.73904 5.75795 9.95708 5.54481 10.0298 5.36959C13.3331 6.79778 12.8133 9.21697 10.8403 11.2467C9.63029 12.537 10.0053 13.9284 10.0053 13.9284C10.0053 13.9284 8.52954 14.8803 8.02078 15.7076C8.02078 15.7076 5.88363 13.8233 8.84357 10.6957C11.748 7.62563 9.73904 5.75795 9.73904 5.75795Z"
                  fill="currentColor"
                />
              </svg>
              <div class="masthead-text-layout">
                <span>A Singapore Government Agency Website. Beware of government impersonation scams.</span>
                <div
                  class="sgds-masthead-button"
                  id="sgds-masthead-identify"
                  role="button"
                  tabindex="0"
                  aria-expanded="false"
                  aria-controls="sgds-masthead-content"
                >
                  <span>How to identify</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="sgds-masthead-identify-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.64645 7.14645C9.84171 6.95118 10.1583 6.95118 10.3536 7.14645L15.3536 12.1464C15.5488 12.3417 15.5488 12.6583 15.3536 12.8536C15.1583 13.0488 14.8417 13.0488 14.6464 12.8536L10 8.20711L5.35355 12.8536C5.15829 13.0488 4.84171 13.0488 4.64645 12.8536C4.45118 12.6583 4.45118 12.3417 4.64645 12.1464L9.64645 7.14645Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div
            id="sgds-masthead-content"
            class="container sgds-masthead-content"
          >
            <div class="content-grid">
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.5 7.31409C2.5 7.01647 2.65873 6.74143 2.91644 6.59254L9.5831 2.74069C9.84105 2.59165 10.1589 2.59165 10.4169 2.74069L17.0836 6.59254C17.3413 6.74143 17.5 7.01647 17.5 7.31409V8.33314C17.5 8.79338 17.1269 9.16648 16.6667 9.16648H15.8333V14.9998H16.6667C17.1269 14.9998 17.5 15.3729 17.5 15.8331V16.6665C17.5 17.1267 17.1269 17.4998 16.6667 17.4998H3.33333C2.8731 17.4998 2.5 17.1267 2.5 16.6665V15.8331C2.5 15.3729 2.8731 14.9998 3.33333 14.9998H4.16667V9.16648H3.33333C2.8731 9.16648 2.5 8.79338 2.5 8.33314V7.31409ZM6.66667 9.16648V14.9998H8.75V9.16648H6.66667ZM11.25 9.16648V14.9998H13.3333V9.16648H11.25ZM11.25 6.24981C11.25 6.94017 10.6904 7.49981 10 7.49981C9.30964 7.49981 8.75 6.94017 8.75 6.24981C8.75 5.55945 9.30964 4.99981 10 4.99981C10.6904 4.99981 11.25 5.55945 11.25 6.24981Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Official website links end with .gov.sg</div>
                  <article>Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).</article>
                  <a
                    href="https://www.gov.sg/trusted-sites#govsites"
                    class="trusted-websites-link"
                    rel="noreferrer"
                    target="_blank"
                    >Trusted websites</a
                  >
                </div>
              </div>
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.83334 8.33317H5.41668C4.26608 8.33317 3.33334 9.26591 3.33334 10.4165V16.2498C3.33334 17.4004 4.26608 18.3332 5.41668 18.3332H14.5833C15.7339 18.3332 16.6667 17.4004 16.6667 16.2498V10.4165C16.6667 9.26591 15.7339 8.33317 14.5833 8.33317H14.1667V5.83317C14.1667 3.53198 12.3012 1.6665 10 1.6665C7.69882 1.6665 5.83334 3.53198 5.83334 5.83317V8.33317ZM7.50001 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 10 3.33317C8.6193 3.33317 7.50001 4.45246 7.50001 5.83317V8.33317Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Secure websites use HTTPS</div>
                  <article>
                    Look for a lock (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      class="banner-icon-inline"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.83331 8.33317H5.41665C4.26605 8.33317 3.33331 9.26591 3.33331 10.4165V16.2498C3.33331 17.4004 4.26605 18.3332 5.41665 18.3332H14.5833C15.7339 18.3332 16.6666 17.4004 16.6666 16.2498V10.4165C16.6666 9.26591 15.7339 8.33317 14.5833 8.33317H14.1666V5.83317C14.1666 3.53198 12.3012 1.6665 9.99998 1.6665C7.69879 1.6665 5.83331 3.53198 5.83331 5.83317V8.33317ZM7.49998 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 9.99998 3.33317C8.61927 3.33317 7.49998 4.45246 7.49998 5.83317V8.33317Z"
                        fill="currentColor"
                      /></svg
                    >) or https:// as an added precaution. Share sensitive information only on official, secure
                    websites.
                  </article>
                </div>
              </div>
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.33342 1.3335C12.0153 1.3335 15.0001 4.31826 15.0001 8.00016C15.0001 11.6821 12.0153 14.6668 8.33342 14.6668C4.65152 14.6668 1.66675 11.6821 1.66675 8.00016C1.66675 4.31826 4.65152 1.3335 8.33342 1.3335ZM8.33342 10.0002C7.96523 10.0002 7.66675 10.2986 7.66675 10.6668C7.66675 11.035 7.96523 11.3335 8.33342 11.3335C8.7016 11.3335 9.00008 11.035 9.00008 10.6668C9.00008 10.2986 8.7016 10.0002 8.33342 10.0002ZM8.33342 4.68311C8.01125 4.68311 7.75008 4.94492 7.75008 5.26709V8.66683C7.75026 8.98885 8.01136 9.25016 8.33342 9.25016C8.65547 9.25016 8.91657 8.98885 8.91675 8.66683V5.26709C8.91675 4.94492 8.65558 4.68311 8.33342 4.68311Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Scam alert</div>
                  <article>
                    Government officers will never ask you to send money or share your details over the phone. When
                    unsure, hang up and call Scamshield at 1799.
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    );
  });

  it("when clicked on #sgds-masthead-identify, shows #sgds-masthead-content", async () => {
    const el = await fixture<SgdsMasthead>(html`<sgds-masthead></sgds-masthead>`);
    expect(el.shadowRoot?.getElementById("sgds-masthead-content")?.classList.value).not.to.contain("show");
    el.shadowRoot?.getElementById("sgds-masthead-identify")?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.getElementById("sgds-masthead-content")).to.have.class("show");
  });

  it("toggles panel with keyboard (Enter)", async () => {
    const el = await fixture<SgdsMasthead>(html`<sgds-masthead></sgds-masthead>`);
    const button = el.shadowRoot!.querySelector(".sgds-masthead-button")!;

    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;
    expect(el.toggleVisibility).to.be.true;

    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;
    expect(el.toggleVisibility).to.be.false;
  });

  it("toggles panel with keyboard (Space)", async () => {
    const el = await fixture<SgdsMasthead>(html`<sgds-masthead></sgds-masthead>`);
    const button = el.shadowRoot!.querySelector(".sgds-masthead-button")!;

    button.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await el.updateComplete;
    expect(el.toggleVisibility).to.be.true;
  });
});
