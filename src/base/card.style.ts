import { css } from "lit";
import textVariantsStyle from "../styles/text-variants";
import bgVariantsStyle from "../styles/bg-variants";
import borderVariantsStyle from "../styles/border-variants";

export default css`
  ${textVariantsStyle} ${bgVariantsStyle} ${borderVariantsStyle},
  .h5,
  .h6,
  h5,
  h6 {
    color: var(--sgds-heading-color);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .h5,
  .h6,
  h5,
  h6 {
    font-size: 1rem;
  }
  p {
    margin-bottom: 1.5rem;
    margin-top: 0;
  }
  .h5,
  .h6,
  h5,
  h6 {
    line-height: 1.2;
  }
  .card {
    --sgds-card-spacer-y: 1.5rem;
    --sgds-card-spacer-x: 1.5rem;
    --sgds-card-title-spacer-y: 0.5rem;
    --sgds-card-title-color: ;
    --sgds-card-subtitle-color: ;
    --sgds-card-border-width: var(--sgds-border-width);
    --sgds-card-border-color: var(--sgds-border-color-translucent);
    --sgds-card-border-radius: var(--sgds-border-radius);
    --sgds-card-box-shadow: ;
    --sgds-card-inner-border-radius: calc(var(--sgds-border-radius) - var(--sgds-border-width));
    --sgds-card-cap-padding-y: 0.75rem;
    --sgds-card-cap-padding-x: 1.5rem;
    --sgds-card-cap-bg: rgba(var(--sgds-body-color-rgb), 0.03);
    --sgds-card-cap-color: ;
    --sgds-card-height: ;
    --sgds-card-color: ;
    --sgds-card-bg: var(--sgds-body-bg);
    --sgds-card-img-overlay-padding: 1rem;
    --sgds-card-group-margin: 0.75rem;
    word-wrap: break-word;
    background-clip: border-box;
    background-color: var(--sgds-card-bg);
    border: var(--sgds-card-border-width) solid var(--sgds-card-border-color);
    border-radius: var(--sgds-card-border-radius);
    color: var(--sgds-body-color);
    display: flex;
    flex-direction: column;
    height: var(--sgds-card-height);
    min-width: 0;
    position: relative;
  }
  .card > hr {
    margin-left: 0;
    margin-right: 0;
  }
  .card > .list-group {
    border-bottom: inherit;
    border-top: inherit;
  }
  .card > .list-group:first-child {
    border-top-left-radius: var(--sgds-card-inner-border-radius);
    border-top-right-radius: var(--sgds-card-inner-border-radius);
    border-top-width: 0;
  }
  .card > .list-group:last-child {
    border-bottom-left-radius: var(--sgds-card-inner-border-radius);
    border-bottom-right-radius: var(--sgds-card-inner-border-radius);
    border-bottom-width: 0;
  }
  .card > .card-header + .list-group,
  .card > .list-group + .card-footer {
    border-top: 0;
  }
  .card-body {
    color: var(--sgds-card-color);
    flex: 1 1 auto;
    padding: var(--sgds-card-spacer-y) var(--sgds-card-spacer-x);
  }
  .card-title {
    color: var(--sgds-card-title-color);
    margin-bottom: var(--sgds-card-title-spacer-y);
  }
  .card-subtitle {
    color: var(--sgds-card-subtitle-color);
    margin-top: calc(var(--sgds-card-title-spacer-y) * -0.5);
  }
  .card-subtitle,
  .card-text:last-child {
    margin-bottom: 0;
  }
  .card-link + .card-link {
    margin-left: var(--sgds-card-spacer-x);
  }
  .card-header {
    background-color: var(--sgds-card-cap-bg);
    border-bottom: var(--sgds-card-border-width) solid var(--sgds-card-border-color);
    color: var(--sgds-card-cap-color);
    margin-bottom: 0;
    padding: var(--sgds-card-cap-padding-y) var(--sgds-card-cap-padding-x);
  }
  .card-header:first-child {
    border-radius: var(--sgds-card-inner-border-radius) var(--sgds-card-inner-border-radius) 0 0;
  }
  .card-footer {
    background-color: var(--sgds-card-cap-bg);
    border-top: var(--sgds-card-border-width) solid var(--sgds-card-border-color);
    color: var(--sgds-card-cap-color);
    padding: var(--sgds-card-cap-padding-y) var(--sgds-card-cap-padding-x);
  }
  .card-footer:last-child {
    border-radius: 0 0 var(--sgds-card-inner-border-radius) var(--sgds-card-inner-border-radius);
  }
  .card-header-tabs {
    border-bottom: 0;
    margin-bottom: calc(var(--sgds-card-cap-padding-y) * -1);
    margin-left: calc(var(--sgds-card-cap-padding-x) * -0.5);
    margin-right: calc(var(--sgds-card-cap-padding-x) * -0.5);
  }
  .card-header-tabs .nav-link.active {
    background-color: var(--sgds-card-bg);
    border-bottom-color: var(--sgds-card-bg);
  }
  .card-header-pills {
    margin-left: calc(var(--sgds-card-cap-padding-x) * -0.5);
    margin-right: calc(var(--sgds-card-cap-padding-x) * -0.5);
  }
  .card-img-overlay {
    border-radius: var(--sgds-card-inner-border-radius);
    bottom: 0;
    left: 0;
    padding: var(--sgds-card-img-overlay-padding);
    position: absolute;
    right: 0;
    top: 0;
  }
  .card-img,
  .card-img-bottom,
  .card-img-top {
    width: 100%;
  }
  .card-img,
  .card-img-top {
    border-top-left-radius: var(--sgds-card-inner-border-radius);
    border-top-right-radius: var(--sgds-card-inner-border-radius);
  }
  .card-img,
  .card-img-bottom {
    border-bottom-left-radius: var(--sgds-card-inner-border-radius);
    border-bottom-right-radius: var(--sgds-card-inner-border-radius);
  }
  .card-group > .card {
    margin-bottom: var(--sgds-card-group-margin);
  }
  @media (min-width: 576px) {
    .card-group {
      display: flex;
      flex-flow: row wrap;
    }
    .card-group > .card {
      flex: 1 0 0%;
      margin-bottom: 0;
    }
    .card-group > .card + .card {
      border-left: 0;
      margin-left: 0;
    }
    .card-group > .card:not(:last-child) {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    .card-group > .card:not(:last-child) .card-header,
    .card-group > .card:not(:last-child) .card-img-top {
      border-top-right-radius: 0;
    }
    .card-group > .card:not(:last-child) .card-footer,
    .card-group > .card:not(:last-child) .card-img-bottom {
      border-bottom-right-radius: 0;
    }
    .card-group > .card:not(:first-child) {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
    .card-group > .card:not(:first-child) .card-header,
    .card-group > .card:not(:first-child) .card-img-top {
      border-top-left-radius: 0;
    }
    .card-group > .card:not(:first-child) .card-footer,
    .card-group > .card:not(:first-child) .card-img-bottom {
      border-bottom-left-radius: 0;
    }
  }
  .sgds.card a:not(.btn) {
    font-weight: 700;
  }
`;
