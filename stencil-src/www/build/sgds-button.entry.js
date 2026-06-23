import { r as registerInstance, a as createEvent, h, d as Host, e as getElement } from "./index-CZw3wUWJ.js";

/**
 * Finds the form associated with an element.
 * If formId is provided, looks up the form by ID in the root node.
 * Otherwise falls back to the closest containing form.
 */
function getAssociatedForm(el, formId) {
  if (formId) {
    const root = el.getRootNode();
    return root.getElementById(formId);
  }
  return el.closest("form");
}
/**
 * Submits a form by injecting a temporary hidden submit button.
 * This technique allows web components to trigger native form submission
 * with proper submitter reference and form attribute overrides.
 */
function submitForm(form, invoker) {
  doAction("submit", form, invoker);
}
/**
 * Resets a form by injecting a temporary hidden reset button.
 */
function resetForm(form) {
  doAction("reset", form, {});
}
function doAction(type, form, invoker) {
  const button = document.createElement("button");
  button.type = type;
  button.style.position = "absolute";
  button.style.width = "0";
  button.style.height = "0";
  button.style.clipPath = "inset(50%)";
  button.style.overflow = "hidden";
  button.style.whiteSpace = "nowrap";
  if (type === "submit") {
    if (invoker.formAction) {
      button.formAction = invoker.formAction;
    }
    if (invoker.formMethod) {
      button.setAttribute("formmethod", invoker.formMethod);
    }
    if (invoker.formNoValidate) {
      button.formNoValidate = true;
    }
    if (invoker.formTarget) {
      button.formTarget = invoker.formTarget;
    }
  }
  form.appendChild(button);
  button.click();
  form.removeChild(button);
}

const sgdsElementCss = () =>
  `:host {   -webkit-text-size-adjust: 100%;   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);   color: var(--sgds-body-color-default, #1a1a1a);   font-family: var(--sgds-font-family-brand, "Inter", system-ui, sans-serif);   font-size: var(--sgds-font-size-body-md, 1rem);   font-weight: var(--sgds-font-weight-regular, 400);   line-height: var(--sgds-line-height-xs, 24px);   margin: 0;   display: block;   -webkit-font-smoothing: antialiased;    *,   *::after,   *::before {     -webkit-box-sizing: border-box;     -moz-box-sizing: border-box;     box-sizing: border-box;   }   *:disabled {     cursor: not-allowed;   }   @media (prefers-reduced-motion: no-preference) {     :root {       scroll-behavior: smooth;     }   }    a[target="_blank"]::after,   ::slotted(a[target="_blank"])::after {     background-color: currentColor;     display: inline-block;     content: "/";     -webkit-mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77365 4.4L9.7999 4.4C10.1313 4.4 10.3999 4.66863 10.3999 5C10.3999 5.33137 10.1313 5.6 9.7999 5.6C8.94992 5.6 8.34852 5.60047 7.87837 5.63888C7.41522 5.67672 7.13251 5.74838 6.91033 5.86159C6.45874 6.09168 6.09158 6.45884 5.86149 6.91042C5.74828 7.13261 5.67662 7.41531 5.63878 7.87847C5.60037 8.34862 5.5999 8.95002 5.5999 9.8V14.2C5.5999 15.05 5.60037 15.6514 5.63878 16.1215C5.67662 16.5847 5.74828 16.8674 5.86149 17.0896C6.09158 17.5412 6.45874 17.9083 6.91033 18.1384C7.13251 18.2516 7.41522 18.3233 7.87837 18.3611C8.34852 18.3995 8.94992 18.4 9.7999 18.4H14.1999C15.0499 18.4 15.6513 18.3995 16.1214 18.3611C16.5846 18.3233 16.8673 18.2516 17.0895 18.1384C17.5411 17.9083 17.9082 17.5412 18.1383 17.0896C18.2515 16.8674 18.3232 16.5847 18.361 16.1215C18.3994 15.6514 18.3999 15.05 18.3999 14.2C18.3999 13.8686 18.6685 13.6 18.9999 13.6C19.3313 13.6 19.5999 13.8686 19.5999 14.2V14.2262C19.5999 15.0441 19.5999 15.6945 19.557 16.2193C19.5131 16.7566 19.4213 17.2148 19.2075 17.6344C18.8624 18.3118 18.3117 18.8625 17.6343 19.2076C17.2147 19.4214 16.7565 19.5132 16.2192 19.5571C15.6944 19.6 15.044 19.6 14.2261 19.6H9.77366C8.95583 19.6 8.30541 19.6 7.78065 19.5571C7.24329 19.5132 6.78509 19.4214 6.36554 19.2076C5.68815 18.8625 5.13742 18.3118 4.79228 17.6344C4.57851 17.2148 4.48667 16.7566 4.44277 16.2193C4.39989 15.6945 4.3999 15.0441 4.3999 14.2263V9.77375C4.3999 8.95592 4.39989 8.3055 4.44277 7.78075C4.48667 7.24339 4.57851 6.78518 4.79228 6.36564C5.13742 5.68825 5.68815 5.13752 6.36554 4.79238C6.78509 4.57861 7.24329 4.48677 7.78065 4.44287C8.3054 4.39999 8.95582 4.4 9.77365 4.4ZM12.3999 5.00001C12.3999 4.66864 12.6685 4.40001 12.9999 4.40001H18.9999C19.3312 4.40001 19.5999 4.66864 19.5999 5.00001L19.5999 11C19.5999 11.3314 19.3313 11.6 18.9999 11.6C18.6685 11.6 18.3999 11.3314 18.3999 11L18.3999 6.44854L12.4242 12.4243C12.1899 12.6586 11.81 12.6586 11.5756 12.4243C11.3413 12.19 11.3413 11.8101 11.5756 11.5757L17.5514 5.60001H12.9999C12.6685 5.60001 12.3999 5.33138 12.3999 5.00001Z" fill="%230E0E0E"/></svg>');     mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77365 4.4L9.7999 4.4C10.1313 4.4 10.3999 4.66863 10.3999 5C10.3999 5.33137 10.1313 5.6 9.7999 5.6C8.94992 5.6 8.34852 5.60047 7.87837 5.63888C7.41522 5.67672 7.13251 5.74838 6.91033 5.86159C6.45874 6.09168 6.09158 6.45884 5.86149 6.91042C5.74828 7.13261 5.67662 7.41531 5.63878 7.87847C5.60037 8.34862 5.5999 8.95002 5.5999 9.8V14.2C5.5999 15.05 5.60037 15.6514 5.63878 16.1215C5.67662 16.5847 5.74828 16.8674 5.86149 17.0896C6.09158 17.5412 6.45874 17.9083 6.91033 18.1384C7.13251 18.2516 7.41522 18.3233 7.87837 18.3611C8.34852 18.3995 8.94992 18.4 9.7999 18.4H14.1999C15.0499 18.4 15.6513 18.3995 16.1214 18.3611C16.5846 18.3233 16.8673 18.2516 17.0895 18.1384C17.5411 17.9083 17.9082 17.5412 18.1383 17.0896C18.2515 16.8674 18.3232 16.5847 18.361 16.1215C18.3994 15.6514 18.3999 15.05 18.3999 14.2C18.3999 13.8686 18.6685 13.6 18.9999 13.6C19.3313 13.6 19.5999 13.8686 19.5999 14.2V14.2262C19.5999 15.0441 19.5999 15.6945 19.557 16.2193C19.5131 16.7566 19.4213 17.2148 19.2075 17.6344C18.8624 18.3118 18.3117 18.8625 17.6343 19.2076C17.2147 19.4214 16.7565 19.5132 16.2192 19.5571C15.6944 19.6 15.044 19.6 14.2261 19.6H9.77366C8.95583 19.6 8.30541 19.6 7.78065 19.5571C7.24329 19.5132 6.78509 19.4214 6.36554 19.2076C5.68815 18.8625 5.13742 18.3118 4.79228 17.6344C4.57851 17.2148 4.48667 16.7566 4.44277 16.2193C4.39989 15.6945 4.3999 15.0441 4.3999 14.2263V9.77375C4.3999 8.95592 4.39989 8.3055 4.44277 7.78075C4.48667 7.24339 4.57851 6.78518 4.79228 6.36564C5.13742 5.68825 5.68815 5.13752 6.36554 4.79238C6.78509 4.57861 7.24329 4.48677 7.78065 4.44287C8.3054 4.39999 8.95582 4.4 9.77365 4.4ZM12.3999 5.00001C12.3999 4.66864 12.6685 4.40001 12.9999 4.40001H18.9999C19.3312 4.40001 19.5999 4.66864 19.5999 5.00001L19.5999 11C19.5999 11.3314 19.3313 11.6 18.9999 11.6C18.6685 11.6 18.3999 11.3314 18.3999 11L18.3999 6.44854L12.4242 12.4243C12.1899 12.6586 11.81 12.6586 11.5756 12.4243C11.3413 12.19 11.3413 11.8101 11.5756 11.5757L17.5514 5.60001H12.9999C12.6685 5.60001 12.3999 5.33138 12.3999 5.00001Z" fill="%230E0E0E"/></svg>');     -webkit-mask-repeat: no-repeat;     mask-repeat: no-repeat;     -webkit-mask-position: center;     mask-position: center;     width: 1em;     height: 1em;     vertical-align: top;   }    ::slotted(svg) {     vertical-align: middle;   } } `;

const buttonCss$1 = () =>
  `:host{--btn-font-weight:var(--sgds-font-weight-regular);--btn-color:var(--sgds-color-fixed-light);--btn-bg:var(--sgds-primary-surface-default);--btn-hover-bg:var(--sgds-primary-surface-emphasis);--btn-border-radius:var(--sgds-border-radius-md);--btn-opacity:var(--sgds-opacity-100, 1)}:host([variant="danger"]){--btn-bg:var(--sgds-danger-surface-default);--btn-hover-bg:var(--sgds-danger-surface-emphasis);--btn-color:var(--sgds-color-fixed-light)}:host([variant="primary"][tone="brand"]){--btn-bg:var(--sgds-primary-surface-default);--btn-color:var(--sgds-color-fixed-light)}:host([variant="outline"]){--btn-border-width:var(--sgds-border-width-1)}:host([variant="outline"][tone="brand"]){--btn-border-color:var(--sgds-primary-border-color-default);--btn-bg:var(--sgds-bg-transparent);--btn-color:var(--sgds-primary-color-default);--btn-hover-bg:var(--sgds-primary-bg-translucent)}:host([variant="ghost"][tone="brand"]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-primary-surface-translucent);--btn-color:var(--sgds-primary-color-default)}:host([variant="primary"][tone="danger"]){--btn-bg:var(--sgds-danger-surface-default);--btn-hover-bg:var(--sgds-danger-surface-emphasis);--btn-color:var(--sgds-color-fixed-light)}:host([variant="outline"][tone="danger"]){--btn-border-color:var(--sgds-danger-border-color-default);--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-danger-surface-translucent);--btn-color:var(--sgds-danger-color-default)}:host([variant="ghost"][tone="danger"]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-danger-surface-translucent);--btn-color:var(--sgds-danger-color-default)}:host([variant="primary"][tone="fixed-light"]){--btn-bg:var(--sgds-surface-fixed-light);--btn-hover-bg:linear-gradient(       0deg,       var(--sgds-bg-translucent-fixed-dark, rgba(14, 14, 14, 0.2)) 0%,       var(--sgds-bg-translucent-fixed-dark, rgba(14, 14, 14, 0.2)) 100%     ),     var(--sgds-surface-fixed-light, #fff);--btn-color:var(--sgds-color-fixed-dark)}:host([variant="outline"][tone="fixed-light"]){--btn-border-color:var(--sgds-border-color-fixed-light);--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:linear-gradient(       0deg,       var(--sgds-bg-translucent-fixed-dark) 0%,       var(--sgds-bg-translucent-fixed-dark) 100%     ),     var(--sgds-bg-transparent);--btn-color:var(--sgds-color-fixed-light)}:host([variant="ghost"][tone="fixed-light"]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:linear-gradient(       0deg,       var(--sgds-bg-translucent-fixed-dark) 0%,       var(--sgds-bg-translucent-fixed-dark) 100%     ),     var(--sgds-bg-transparent);--btn-color:var(--sgds-color-fixed-light)}:host([variant="primary"][tone="neutral"]){--btn-bg:var(--sgds-surface-inverse);--btn-hover-bg:linear-gradient(0deg, var(--sgds-bg-translucent-inverse) 0%, var(--sgds-bg-translucent-inverse) 100%),     var(--sgds-surface-inverse);--btn-color:var(--sgds-color-inverse)}:host([variant="outline"][tone="neutral"]){--btn-border-color:var(--sgds-border-color-emphasis);--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:linear-gradient(0deg, var(--sgds-bg-translucent-inverse) 0%, var(--sgds-bg-translucent-inverse) 100%),     var(--sgds-bg-translucent-subtle);--btn-color:var(--sgds-color-default)}:host([variant="ghost"][tone="neutral"]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-bg-translucent-subtle);--btn-color:var(--sgds-color-default)}:host([variant="primary"]) .btn,:host([variant="outline"]) .btn,:host([variant="ghost"]) .btn{color:var(--btn-color)}:host([variant="outline"]) .btn{border:var(--btn-border-width) solid var(--btn-border-color)}:host([size="lg"]) .btn{font-size:var(--sgds-font-size-label-lg);line-height:var(--sgds-line-height-md);padding:var(--sgds-padding-none) var(--sgds-padding-xl);min-width:var(--sgds-dimension-112);height:var(--sgds-dimension-56)}:host([size="sm"]) .btn{font-size:var(--sgds-font-size-label-sm);line-height:var(--sgds-line-height-2-xs);padding:var(--sgds-padding-none) var(--sgds-padding-md);min-width:var(--sgds-dimension-80);height:var(--sgds-dimension-40)}:host([size="xs"]) .btn{font-size:var(--sgds-font-size-label-xs);line-height:var(--sgds-line-height-3-xs);padding:var(--sgds-padding-none) var(--sgds-padding-sm);min-width:var(--sgds-dimension-64);height:var(--sgds-dimension-32)}.btn{background-color:var(--btn-bg);border:var(--sgds-border-width-1) solid var(--sgds-border-color-transparent);border-radius:var(--btn-border-radius);color:var(--sgds-color-fixed-light);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:var(--sgds-gap-2-xs);font-size:var(--sgds-font-size-label-md);font-weight:var(--btn-font-weight);line-height:var(--sgds-line-height-xs);padding:var(--sgds-padding-none) var(--sgds-padding-lg);min-width:var(--sgds-dimension-96);width:inherit;height:var(--sgds-dimension-48);white-space:nowrap;text-align:center;text-decoration:none;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,     box-shadow 0.15s ease-in-out;user-select:none;vertical-align:middle;opacity:var(--btn-opacity)}@media (prefers-reduced-motion: reduce){.btn{transition:none}}.btn:hover,.btn.active{background:var(--btn-hover-bg)}.btn:focus,.btn:focus-visible{background:var(--btn-hover-bg);border-color:transparent;outline:var(--sgds-outline-focus);outline-offset:var(--sgds-outline-offset-focus)}.btn.disabled,.btn:disabled{opacity:var(--sgds-opacity-40);cursor:not-allowed;color:var(--btn-color)}.btn.loading{cursor:default}.btn slot::slotted(*){color:var(--btn-color)}`;

const buttonCss = () =>
  `:host{display:inline-block}:host([fullWidth]),:host([fullWidth]) .btn{width:100%}:host([fullWidth]) .btn.has-left-icon{justify-content:flex-start}:host([fullWidth]) .btn.has-right-icon{justify-content:space-between}:host([fullWidth]) .btn.has-left-icon.has-right-icon{justify-content:center}.btn span{padding:0px var(--sgds-padding-2-xs)}.btn.no-icon{gap:var(--sgds-gap-none)}.loading{cursor:default}`;

const SgdsButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sgdsBlur = createEvent(this, "sgds-blur", 7);
    this.sgdsFocus = createEvent(this, "sgds-focus", 7);
    // --- Props from ButtonElement base ---
    /** Sets the visual variants such as: `primary`, `outline`, `ghost`. `danger` is @deprecated since v3.5.6 */
    this.variant = "primary";
    /** Sets the visual colour of the button: `brand`, `danger`, `fixed-light`, `neutral` */
    this.tone = "brand";
    /** Specifies a small, medium or large button, the size is medium by default. */
    this.size = "md";
    /** Manually set the visual state of the button to `:active` */
    this.active = false;
    /** The disabled state of the button */
    this.disabled = false;
    /** Where to display the linked URL */
    this.target = "_self";
    /** When true, shows a loading spinner */
    this.loading = false;
    // --- Props specific to SgdsButton ---
    /** The behavior of the button with default as `type='button'`, `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
    this.type = "button";
    /** When set, the button will be in full width. */
    this.fullWidth = false;
    /** Used only for SSR to indicate the presence of the `leftIcon` slot. */
    this.hasLeftIconSlot = false;
    /** Used only for SSR to indicate the presence of the `rightIcon` slot. */
    this.hasRightIconSlot = false;
    // --- Internal state ---
    this.associatedForm = null;
    this.handleSlotChange = () => {
      this.checkSlots();
    };
    this.handleClick = event => {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (this.type === "submit") {
        const form = this.associatedForm || getAssociatedForm(this.el, this.form);
        if (form) {
          submitForm(form, {
            formAction: this.formAction,
            formMethod: this.formMethod,
            formNoValidate: this.formNoValidate,
            formTarget: this.formTarget
          });
        }
      }
      if (this.type === "reset") {
        const form = this.associatedForm || getAssociatedForm(this.el, this.form);
        if (form) {
          resetForm(form);
        }
      }
    };
    this.handleKeydown = event => {
      if (event.key === "Enter" && this.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };
    this.handleFocus = () => {
      this.sgdsFocus.emit();
    };
    this.handleBlur = () => {
      this.sgdsBlur.emit();
    };
  }
  // --- Lifecycle ---
  connectedCallback() {
    this.associatedForm = getAssociatedForm(this.el, this.form);
  }
  disconnectedCallback() {
    this.associatedForm = null;
  }
  componentDidLoad() {
    this.checkSlots();
  }
  // --- Public methods ---
  /** Sets focus on the button. */
  async setFocus(options) {
    var _a;
    (_a = this.getInnerElement()) === null || _a === void 0 ? void 0 : _a.focus(options);
  }
  /** Removes focus from the button. */
  async setBlur() {
    var _a;
    (_a = this.getInnerElement()) === null || _a === void 0 ? void 0 : _a.blur();
  }
  // --- Private methods ---
  getInnerElement() {
    var _a, _b;
    return (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".btn")) !== null &&
      _b !== void 0
      ? _b
      : null;
  }
  checkSlots() {
    // Use children iteration instead of :scope selector (not supported in mock-doc for testing)
    const children = Array.from(this.el.children);
    this.hasLeftIconSlot = children.some(child => child.getAttribute("slot") === "leftIcon");
    this.hasRightIconSlot = children.some(child => child.getAttribute("slot") === "rightIcon");
  }
  assignSpinnerSize(buttonSize) {
    if (buttonSize === "xs" || buttonSize === "sm") return "xs";
    return "sm";
  }
  assignSpinnerTone(buttonTone, buttonVariant) {
    if (buttonTone === "fixed-light" && buttonVariant === "primary") return "fixed-dark";
    if (buttonTone === "neutral" && buttonVariant === "primary") return "inverse";
    if (buttonTone === "fixed-light" || buttonVariant === "primary") return "fixed-light";
    if (buttonTone === "neutral" && (buttonVariant === "outline" || buttonVariant === "ghost")) return "neutral";
    return "brand";
  }
  // --- Render ---
  render() {
    const isLink = !!this.href;
    const Tag = isLink ? "a" : "button";
    const noIcon = !this.hasLeftIconSlot && !this.hasRightIconSlot;
    const classes = {
      btn: true,
      disabled: this.disabled,
      active: this.active,
      "has-left-icon": this.hasLeftIconSlot,
      "has-right-icon": this.hasRightIconSlot,
      "no-icon": noIcon,
      loading: this.loading
    };
    const attrs = {
      class: classes,
      onClick: this.handleClick,
      onKeydown: this.handleKeydown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      "aria-disabled": String(this.disabled || this.loading),
      tabindex: this.disabled ? "-1" : "0",
      "aria-label": this.loading ? "Loading" : this.ariaLabel
    };
    if (isLink) {
      attrs.href = this.href;
      attrs.target = this.target;
      attrs.download = this.download;
      attrs.rel = this.target === "_blank" ? "noreferrer noopener" : undefined;
      attrs.role = "button";
    } else {
      attrs.disabled = this.disabled;
      attrs.type = this.type;
    }
    return h(
      Host,
      { key: "d6ff239c0e700beb9244c671a5c2a24a89af04fa" },
      h(
        Tag,
        Object.assign({ key: "0d99cbc70cc74b71325968930bc2090b80afb1be" }, attrs),
        this.loading
          ? h("sgds-spinner", {
              size: this.assignSpinnerSize(this.size),
              tone: this.assignSpinnerTone(this.tone, this.variant)
            })
          : [
              h("slot", { name: "leftIcon", onSlotchange: this.handleSlotChange }),
              h("span", null, h("slot", null)),
              h("slot", { name: "rightIcon", onSlotchange: this.handleSlotChange })
            ]
      )
    );
  }
  get el() {
    return getElement(this);
  }
};
SgdsButton.style = sgdsElementCss() + (buttonCss$1() + buttonCss());

export { SgdsButton as sgds_button };
//# sourceMappingURL=sgds-button.entry.esm.js.map

//# sourceMappingURL=sgds-button.entry.js.map
