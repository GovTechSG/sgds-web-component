import { css } from "lit";
import closeButton from "../../styles/close-button";
export default css`
  ${closeButton}
  .tooltip {
    --sgds-tooltip-zindex: 1080;
    --sgds-tooltip-max-width: 200px;
    --sgds-tooltip-padding-x: 0.5rem;
    --sgds-tooltip-padding-y: 0.25rem;
    --sgds-tooltip-margin: ;
    --sgds-tooltip-font-size: 0.875rem;
    --sgds-tooltip-color: var(--sgds-body-bg);
    --sgds-tooltip-bg: var(--sgds-emphasis-color);
    --sgds-tooltip-border-radius: var(--sgds-border-radius);
    --sgds-tooltip-opacity: 0.9;
    --sgds-tooltip-arrow-width: 0.8rem;
    --sgds-tooltip-arrow-height: 0.4rem;
    word-wrap: break-word;
    display: block;
    font-family: var(--sgds-font-sans-serif);
    font-size: var(--sgds-tooltip-font-size);
    font-style: normal;
    font-weight: 400;
    letter-spacing: normal;
    line-break: auto;
    line-height: 2;
    margin: var(--sgds-tooltip-margin);
    opacity: 0;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    white-space: normal;
    word-break: normal;
    word-spacing: normal;
    z-index: var(--sgds-tooltip-zindex);
  }
  .tooltip.show {
    opacity: var(--sgds-tooltip-opacity);
  }
  .tooltip .tooltip-arrow {
    display: block;
    height: var(--sgds-tooltip-arrow-height);
    width: var(--sgds-tooltip-arrow-width);
  }
  .tooltip .tooltip-arrow:before {
    border-color: transparent;
    border-style: solid;
    content: "";
    position: absolute;
  }
  .bs-tooltip-auto[data-popper-placement^="top"] .tooltip-arrow,
  .bs-tooltip-top .tooltip-arrow {
    bottom: calc(var(--sgds-tooltip-arrow-height) * -1);
  }
  .bs-tooltip-auto[data-popper-placement^="top"] .tooltip-arrow:before,
  .bs-tooltip-top .tooltip-arrow:before {
    border-top-color: var(--sgds-tooltip-bg);
    border-width: var(--sgds-tooltip-arrow-height) calc(var(--sgds-tooltip-arrow-width) * 0.5) 0;
    top: -1px;
  }
  .bs-tooltip-auto[data-popper-placement^="right"] .tooltip-arrow,
  .bs-tooltip-end .tooltip-arrow {
    height: var(--sgds-tooltip-arrow-width);
    left: 0; //calc(var(--sgds-tooltip-arrow-height) * -1);
    width: var(--sgds-tooltip-arrow-height);
  }
  .bs-tooltip-auto[data-popper-placement^="right"] .tooltip-arrow:before,
  .bs-tooltip-end .tooltip-arrow:before {
    border-right-color: var(--sgds-tooltip-bg);
    border-width: calc(var(--sgds-tooltip-arrow-width) * 0.5) var(--sgds-tooltip-arrow-height)
      calc(var(--sgds-tooltip-arrow-width) * 0.5) 0;
    right: -1px;
  }
  .bs-tooltip-auto[data-popper-placement^="bottom"] .tooltip-arrow,
  .bs-tooltip-bottom .tooltip-arrow {
    top: calc(var(--sgds-tooltip-arrow-height) * -1);
  }
  .bs-tooltip-auto[data-popper-placement^="bottom"] .tooltip-arrow:before,
  .bs-tooltip-bottom .tooltip-arrow:before {
    border-bottom-color: var(--sgds-tooltip-bg);
    border-width: 0 calc(var(--sgds-tooltip-arrow-width) * 0.5) var(--sgds-tooltip-arrow-height);
    bottom: -1px;
  }
  .bs-tooltip-auto[data-popper-placement^="left"] .tooltip-arrow,
  .bs-tooltip-start .tooltip-arrow {
    height: var(--sgds-tooltip-arrow-width);
    right: 0; // calc(var(--sgds-tooltip-arrow-height) * -1);
    width: var(--sgds-tooltip-arrow-height);
  }
  .bs-tooltip-auto[data-popper-placement^="left"] .tooltip-arrow:before,
  .bs-tooltip-start .tooltip-arrow:before {
    border-left-color: var(--sgds-tooltip-bg);
    border-width: calc(var(--sgds-tooltip-arrow-width) * 0.5) 0 calc(var(--sgds-tooltip-arrow-width) * 0.5)
      var(--sgds-tooltip-arrow-height);
    left: -1px;
  }
  .tooltip-inner {
    background-color: var(--sgds-tooltip-bg);
    border-radius: var(--sgds-tooltip-border-radius);
    color: var(--sgds-tooltip-color);
    max-width: var(--sgds-tooltip-max-width);
    padding: var(--sgds-tooltip-padding-y) var(--sgds-tooltip-padding-x);
    text-align: center;
  }
  .d-flex {
    display: flex !important;
  }
  .gap-4 {
    gap: 1.5rem !important;
  }
  .text-start {
    text-align: left !important;
  }

  .mt-1 {
    margin-top: 0.25rem !important;
  }
  /** scss */

  :host {
    --tooltip-max-width: 20rem;
    display: inline-block;
  }

  .tooltip-inner {
    max-width: var(--tooltip-max-width);
  }

  div {
    max-width: fit-content;
  }
`;
