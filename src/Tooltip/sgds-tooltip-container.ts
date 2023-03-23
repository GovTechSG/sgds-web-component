import { html } from "lit";
import { customElement, property, query, queryAsync } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Tooltip } from "bootstrap";
import styles from "./sgds-tooltip.scss";
import {  tooltipInnerStyle, tooltipArrowStyle } from "./tooltip-inner-styles";
@customElement("sgds-tooltip-container")  
export class SgdsTooltipContainer extends SgdsElement {
  static styles = styles
  render() {
    return html`
     <sgds-tooltip trigger="click"><slot></slot></sgds-tooltip>
    `;
  }
}
