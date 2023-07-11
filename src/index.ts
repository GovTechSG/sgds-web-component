import * as Components from "./components";

const tagNameConverter = (key: string) => key.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
for (const [key, value] of Object.entries(Components)) {
    const customElementTag = tagNameConverter(key)
    customElements.define(customElementTag, value)
  }
// customElements.define("sgds-button", SgdsButton)
// import "./components/Sidenav";
// import "./components/Radio";
// import "./components/Masthead";
// import "./components/Button";
// import "./components/Footer";
// import "./components/Mainnav";
// import "./components/Input";
// import "./components/Checkbox";
// import "./components/Dropdown";
// import "./components/Textarea";
// import "./components/Modal";
// import "./components/QuantityToggle";
// import "./components/Tab";
// import "./components/ActionCard";
// import "./components/Badge";
// import "./components/Table";
// import "./components/Breadcrumb";
// import "./components/Stepper";
// import "./components/Alert";
// import "./components/CloseButton";
// import "./components/Toast";
// import "./components/FileUpload";
// import "./components/Accordion";
// import "./components/Tooltip";
// import "./components/Spinner";
