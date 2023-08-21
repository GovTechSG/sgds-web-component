import * as Components from "./components";

//takes all the components exported from index.ts, converts it to kebab case and register it in customElementsRegistry
const tagNameConverter = (key: string) => key.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
for (const [key, value] of Object.entries(Components)) {
  const customElementTag = tagNameConverter(key);
  customElements.define(customElementTag, value);
}

declare global {
  interface HTMLElementTagNameMap {
    "sgds-accordion-item": Components.SgdsAccordionItem;
    "sgds-accordion": Components.SgdsAccordion;
    "sgds-action-card": Components.SgdsActionCard;
    "sgds-alert-heading": Components.SgdsAlertHeading;
    "sgds-alert-link": Components.SgdsAlertLink;
    "sgds-alert": Components.SgdsAlert;
    "sgds-badge": Components.SgdsBadge;
    "sgds-breadcrumb-item": Components.SgdsBreadcrumbItem;
    "sgds-breadcrumb": Components.SgdsBreadcrumb;
    "sgds-button": Components.SgdsButton;
    "sgds-card": Components.SgdsCard;
    "sgds-checkbox": Components.SgdsCheckbox;
    "sgds-datepicker": Components.SgdsDatepicker;
    "sgds-drawer": Components.SgdsDrawer;
    "sgds-dropdown-item": Components.SgdsDropdownItem;
    "sgds-dropdown": Components.SgdsDropdown;
    "sgds-file-upload": Components.SgdsFileUpload;
    "sgds-footer": Components.SgdsFooter;
    "sgds-input": Components.SgdsInput;
    "sgds-mainnav-dropdown": Components.SgdsMainnavDropdown;
    "sgds-mainnav-item": Components.SgdsMainnavItem;
    "sgds-mainnav": Components.SgdsMainnav;
    "sgds-masthead": Components.SgdsMasthead;
    "sgds-modal": Components.SgdsModal;
    "sgds-progress": Components.SgdsProgress,
    "sgds-progress-bar": Components.SgdsProgressBar
    "sgds-quantity-toggle": Components.SgdsQuantityToggle;
    "sgds-radio-group": Components.SgdsRadioGroup;
    "sgds-radio": Components.SgdsRadio;
    "sgds-sidenav-item": Components.SgdsSidenavItem;
    "sgds-sidenav-link": Components.SgdsSidenavLink;
    "sgds-sidenav": Components.SgdsSidenav;
    "sgds-spinner": Components.SgdsSpinner;
    "sgds-table": Components.SgdsTable;
    "sgds-textarea": Components.SgdsTextarea;
    "sgds-toast-container": Components.SgdsToastContainer;
    "sgds-toast": Components.SgdsToast;
    "sgds-tooltip": Components.SgdsTooltip;
  }
}
