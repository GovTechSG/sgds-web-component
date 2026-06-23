import { r as registerInstance, h } from "./index-CZw3wUWJ.js";

const sgdsElementCss = () =>
  `:host {   -webkit-text-size-adjust: 100%;   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);   color: var(--sgds-body-color-default, #1a1a1a);   font-family: var(--sgds-font-family-brand, "Inter", system-ui, sans-serif);   font-size: var(--sgds-font-size-body-md, 1rem);   font-weight: var(--sgds-font-weight-regular, 400);   line-height: var(--sgds-line-height-xs, 24px);   margin: 0;   display: block;   -webkit-font-smoothing: antialiased;    *,   *::after,   *::before {     -webkit-box-sizing: border-box;     -moz-box-sizing: border-box;     box-sizing: border-box;   }   *:disabled {     cursor: not-allowed;   }   @media (prefers-reduced-motion: no-preference) {     :root {       scroll-behavior: smooth;     }   }    a[target="_blank"]::after,   ::slotted(a[target="_blank"])::after {     background-color: currentColor;     display: inline-block;     content: "/";     -webkit-mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77365 4.4L9.7999 4.4C10.1313 4.4 10.3999 4.66863 10.3999 5C10.3999 5.33137 10.1313 5.6 9.7999 5.6C8.94992 5.6 8.34852 5.60047 7.87837 5.63888C7.41522 5.67672 7.13251 5.74838 6.91033 5.86159C6.45874 6.09168 6.09158 6.45884 5.86149 6.91042C5.74828 7.13261 5.67662 7.41531 5.63878 7.87847C5.60037 8.34862 5.5999 8.95002 5.5999 9.8V14.2C5.5999 15.05 5.60037 15.6514 5.63878 16.1215C5.67662 16.5847 5.74828 16.8674 5.86149 17.0896C6.09158 17.5412 6.45874 17.9083 6.91033 18.1384C7.13251 18.2516 7.41522 18.3233 7.87837 18.3611C8.34852 18.3995 8.94992 18.4 9.7999 18.4H14.1999C15.0499 18.4 15.6513 18.3995 16.1214 18.3611C16.5846 18.3233 16.8673 18.2516 17.0895 18.1384C17.5411 17.9083 17.9082 17.5412 18.1383 17.0896C18.2515 16.8674 18.3232 16.5847 18.361 16.1215C18.3994 15.6514 18.3999 15.05 18.3999 14.2C18.3999 13.8686 18.6685 13.6 18.9999 13.6C19.3313 13.6 19.5999 13.8686 19.5999 14.2V14.2262C19.5999 15.0441 19.5999 15.6945 19.557 16.2193C19.5131 16.7566 19.4213 17.2148 19.2075 17.6344C18.8624 18.3118 18.3117 18.8625 17.6343 19.2076C17.2147 19.4214 16.7565 19.5132 16.2192 19.5571C15.6944 19.6 15.044 19.6 14.2261 19.6H9.77366C8.95583 19.6 8.30541 19.6 7.78065 19.5571C7.24329 19.5132 6.78509 19.4214 6.36554 19.2076C5.68815 18.8625 5.13742 18.3118 4.79228 17.6344C4.57851 17.2148 4.48667 16.7566 4.44277 16.2193C4.39989 15.6945 4.3999 15.0441 4.3999 14.2263V9.77375C4.3999 8.95592 4.39989 8.3055 4.44277 7.78075C4.48667 7.24339 4.57851 6.78518 4.79228 6.36564C5.13742 5.68825 5.68815 5.13752 6.36554 4.79238C6.78509 4.57861 7.24329 4.48677 7.78065 4.44287C8.3054 4.39999 8.95582 4.4 9.77365 4.4ZM12.3999 5.00001C12.3999 4.66864 12.6685 4.40001 12.9999 4.40001H18.9999C19.3312 4.40001 19.5999 4.66864 19.5999 5.00001L19.5999 11C19.5999 11.3314 19.3313 11.6 18.9999 11.6C18.6685 11.6 18.3999 11.3314 18.3999 11L18.3999 6.44854L12.4242 12.4243C12.1899 12.6586 11.81 12.6586 11.5756 12.4243C11.3413 12.19 11.3413 11.8101 11.5756 11.5757L17.5514 5.60001H12.9999C12.6685 5.60001 12.3999 5.33138 12.3999 5.00001Z" fill="%230E0E0E"/></svg>');     mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77365 4.4L9.7999 4.4C10.1313 4.4 10.3999 4.66863 10.3999 5C10.3999 5.33137 10.1313 5.6 9.7999 5.6C8.94992 5.6 8.34852 5.60047 7.87837 5.63888C7.41522 5.67672 7.13251 5.74838 6.91033 5.86159C6.45874 6.09168 6.09158 6.45884 5.86149 6.91042C5.74828 7.13261 5.67662 7.41531 5.63878 7.87847C5.60037 8.34862 5.5999 8.95002 5.5999 9.8V14.2C5.5999 15.05 5.60037 15.6514 5.63878 16.1215C5.67662 16.5847 5.74828 16.8674 5.86149 17.0896C6.09158 17.5412 6.45874 17.9083 6.91033 18.1384C7.13251 18.2516 7.41522 18.3233 7.87837 18.3611C8.34852 18.3995 8.94992 18.4 9.7999 18.4H14.1999C15.0499 18.4 15.6513 18.3995 16.1214 18.3611C16.5846 18.3233 16.8673 18.2516 17.0895 18.1384C17.5411 17.9083 17.9082 17.5412 18.1383 17.0896C18.2515 16.8674 18.3232 16.5847 18.361 16.1215C18.3994 15.6514 18.3999 15.05 18.3999 14.2C18.3999 13.8686 18.6685 13.6 18.9999 13.6C19.3313 13.6 19.5999 13.8686 19.5999 14.2V14.2262C19.5999 15.0441 19.5999 15.6945 19.557 16.2193C19.5131 16.7566 19.4213 17.2148 19.2075 17.6344C18.8624 18.3118 18.3117 18.8625 17.6343 19.2076C17.2147 19.4214 16.7565 19.5132 16.2192 19.5571C15.6944 19.6 15.044 19.6 14.2261 19.6H9.77366C8.95583 19.6 8.30541 19.6 7.78065 19.5571C7.24329 19.5132 6.78509 19.4214 6.36554 19.2076C5.68815 18.8625 5.13742 18.3118 4.79228 17.6344C4.57851 17.2148 4.48667 16.7566 4.44277 16.2193C4.39989 15.6945 4.3999 15.0441 4.3999 14.2263V9.77375C4.3999 8.95592 4.39989 8.3055 4.44277 7.78075C4.48667 7.24339 4.57851 6.78518 4.79228 6.36564C5.13742 5.68825 5.68815 5.13752 6.36554 4.79238C6.78509 4.57861 7.24329 4.48677 7.78065 4.44287C8.3054 4.39999 8.95582 4.4 9.77365 4.4ZM12.3999 5.00001C12.3999 4.66864 12.6685 4.40001 12.9999 4.40001H18.9999C19.3312 4.40001 19.5999 4.66864 19.5999 5.00001L19.5999 11C19.5999 11.3314 19.3313 11.6 18.9999 11.6C18.6685 11.6 18.3999 11.3314 18.3999 11L18.3999 6.44854L12.4242 12.4243C12.1899 12.6586 11.81 12.6586 11.5756 12.4243C11.3413 12.19 11.3413 11.8101 11.5756 11.5757L17.5514 5.60001H12.9999C12.6685 5.60001 12.3999 5.33138 12.3999 5.00001Z" fill="%230E0E0E"/></svg>');     -webkit-mask-repeat: no-repeat;     mask-repeat: no-repeat;     -webkit-mask-position: center;     mask-position: center;     width: 1em;     height: 1em;     vertical-align: top;   }    ::slotted(svg) {     vertical-align: middle;   } } `;

const spinnerCss = () =>
  `:host{--sgds-spinner-bg:var(--sgds-primary-surface-default);display:inline-flex}:host([variant="neutral"]){--sgds-spinner-bg:var(--sgds-neutral-surface-default)}:host([tone="neutral"]){--sgds-spinner-bg:var(--sgds-surface-inverse)}:host([tone="inverse"]){--sgds-spinner-bg:var(--sgds-surface-default)}:host([tone="fixed-light"]){--sgds-spinner-bg:var(--sgds-surface-fixed-light)}:host([tone="fixed-dark"]){--sgds-spinner-bg:var(--sgds-surface-fixed-dark)}.spinner-wrapper{display:flex;flex-direction:column;align-items:center;gap:var(--sgds-gap-2-xs)}.spinner-wrapper.horizontal{flex-direction:row}.spinner{--border-thickness:4px;display:inline-flex;border-radius:50%;width:var(--sgds-dimension-32);height:var(--sgds-dimension-32);animation:spinner 0.75s linear infinite;border:var(--border-thickness) solid var(--sgds-bg-translucent);border-right:var(--border-thickness) solid var(--sgds-spinner-bg);color:var(--sgds-spinner-color)}.spinner-xs{--border-thickness:2px;width:var(--sgds-dimension-16);height:var(--sgds-dimension-16)}.spinner-sm{--border-thickness:3px;width:var(--sgds-dimension-24);height:var(--sgds-dimension-24)}.spinner-lg{--border-thickness:6px;width:var(--sgds-dimension-48);height:var(--sgds-dimension-48)}.spinner-xl{--border-thickness:8px;width:var(--sgds-dimension-64);height:var(--sgds-dimension-64)}.spinner-label{font-size:var(--sgds-font-size-14);color:var(--sgds-neutral-color-default)}@media (prefers-reduced-motion: reduce){.spinner{animation-duration:1.5s}}@keyframes spinner{to{transform:rotate(1turn)}}.sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}`;

const SgdsSpinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** The color tones of spinner, replaces variant prop */
    this.tone = "brand";
    /** The variant of spinner. @deprecated Use `tone` instead */
    this.variant = "primary";
    /** Specifies spinner size */
    this.size = "md";
    /** Orientation of label relative to the spinner */
    this.orientation = "vertical";
  }
  render() {
    return h(
      "div",
      {
        key: "630884f9499df1017dd80395fa71c0aa13003fc0",
        class: {
          "spinner-wrapper": true,
          horizontal: this.orientation === "horizontal"
        }
      },
      h(
        "div",
        {
          key: "c0d29587ed8ebbfde3e8ddde8c3a7ba273c13555",
          class: {
            spinner: true,
            [`spinner-${this.size}`]: !!this.size
          },
          role: "status"
        },
        !this.label && h("span", { key: "a643ce4b9f68886a7378010d067b1a600076ddd9", class: "sr-only" }, "Loading...")
      ),
      this.label && h("span", { key: "5b6a36a940800d5229438f6e254b573f18fba359", class: "spinner-label" }, this.label)
    );
  }
};
SgdsSpinner.style = sgdsElementCss() + spinnerCss();

export { SgdsSpinner as sgds_spinner };
//# sourceMappingURL=sgds-spinner.entry.esm.js.map

//# sourceMappingURL=sgds-spinner.entry.js.map
