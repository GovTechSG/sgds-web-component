import { css } from "lit";

export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  @media (prefers-reduced-motion: no-preference) {
    :root {
      scroll-behavior: smooth;
    }
  }
  /* body {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: var(--sgds-body-bg);
    color: var(--sgds-body-color);
    font-family: var(--sgds-body-font-family);
    font-size: var(--sgds-body-font-size);
    font-weight: var(--sgds-body-font-weight);
    line-height: var(--sgds-body-line-height);
    margin: 0;
    text-align: var(--sgds-body-text-align);
  } */
  /* hr {
    border: 0;
    border-top: var(--sgds-border-width) solid;
    color: inherit;
    margin: 1rem 0;
    opacity: 0.25;
  } */
  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--sgds-heading-color);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  @media (min-width: 1200px) {
    h2 {
      font-size: 2rem;
    }
  }
  h3 {
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    h3 {
      font-size: 1.5rem;
    }
  }
  h4 {
    font-size: 1.125rem;
  }
  h5,
  h6 {
    font-size: 1rem;
  }
  p {
    margin-bottom: 1.5rem;
    margin-top: 0;
  }
  abbr[title] {
    cursor: help;
    text-decoration: underline dotted;
    text-decoration-skip-ink: none;
  }
  address {
    font-style: normal;
    line-height: inherit;
    margin-bottom: 1rem;
  } */
  /* ol,
  ul {
    padding-left: 2rem;
  }
  dl,
  ol,
  ul {
    margin-bottom: 1rem;
    margin-top: 0;
  }
  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin-bottom: 0;
  }
  dt {
    font-weight: 700;
  }
  dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }
  blockquote {
    margin: 0 0 1rem;
  }
  b,
  strong {
    font-weight: bolder;
  }
  small {
    font-size: 0.875em;
  }
  mark {
    background-color: var(--sgds-highlight-bg);
    color: var(--sgds-highlight-color);
    padding: 0.2em;
  }
  sub,
  sup {
    font-size: 0.75em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  a {
    color: rgba(var(--sgds-link-color-rgb), var(--sgds-link-opacity, 1));
    text-decoration: underline;
  }
  a:hover {
    --sgds-link-color-rgb: var(--sgds-link-hover-color-rgb);
  }
  a:not([href]):not([class]),
  a:not([href]):not([class]):hover {
    color: inherit;
    text-decoration: none;
  } */
  /* code,
  kbd,
  pre,
  samp {
    font-family: var(--sgds-font-monospace);
    font-size: 1em;
  }
  pre {
    display: block;
    font-size: 0.875em;
    margin-bottom: 1rem;
    margin-top: 0;
    overflow: auto;
  }
  pre code {
    color: inherit;
    font-size: inherit;
    word-break: normal;
  }
  code {
    word-wrap: break-word;
    color: var(--sgds-code-color);
    font-size: 0.875em;
  }
  a > code {
    color: inherit;
  } */
  /* kbd {
    background-color: var(--sgds-body-color);
    border-radius: 0.2rem;
    color: var(--sgds-body-bg);
    font-size: 0.875em;
    padding: 0.1875rem 0.375rem;
  }
  kbd kbd {
    font-size: 1em;
    font-weight: 700;
    padding: 0;
  }
  figure {
    margin: 0 0 1rem;
  }
  img,
  svg {
    vertical-align: middle;
  }
  table {
    border-collapse: collapse;
    caption-side: bottom;
  }
  caption {
    color: var(--sgds-secondary-color);
    padding-bottom: 1rem;
    padding-top: 1rem;
    text-align: left;
  }
  th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border: 0 solid;
    border-color: inherit;
  }
  label {
    /* display: inline-block; */
  /* } */
  button {
    border-radius: 0;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    /* line-height: inherit; */
    /* margin: 0; */
  }
  /* button,
  select {
    text-transform: none;
  }
  [role="button"] {
    cursor: pointer;
  }
  select {
    word-wrap: normal;
  }
  select:disabled {
    opacity: 1;
  } */
  /* [list]:not([type="date"]):not([type="datetime-local"]):not([type="month"]):not([type="week"]):not(
      [type="time"]
    )::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }
  [type="button"]:not(:disabled),
  [type="reset"]:not(:disabled),
  [type="submit"]:not(:disabled),
  button:not(:disabled) {
    cursor: pointer;
  }
  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  textarea {
    resize: vertical;
  } */
  /* fieldset {
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0;
  } */
  /* legend {
    float: left;
    font-size: calc(1.275rem + 0.3vw);
    line-height: inherit;
    margin-bottom: 0.5rem;
    padding: 0;
    width: 100%;
  }
  @media (min-width: 1200px) {
    legend {
      font-size: 1.5rem;
    }
  }
  legend + * {
    clear: left;
  }
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-fields-wrapper,
  ::-webkit-datetime-edit-hour-field,
  ::-webkit-datetime-edit-minute,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-text,
  ::-webkit-datetime-edit-year-field {
    padding: 0;
  }
  ::-webkit-inner-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  ::file-selector-button {
    -webkit-appearance: button;
    font: inherit;
  }
  output {
    display: inline-block;
  }
  iframe {
    border: 0;
  }
  summary {
    cursor: pointer;
    display: list-item;
  }
  progress {
    vertical-align: baseline;
  }
  [hidden] {
    display: none !important;
  }
  h1 {
    line-height: 1.2;
  }
  h2 {
    line-height: 1.25;
  }
  h3 {
    line-height: 1.33;
  }
  h4 {
    line-height: 1.78;
  }
  h5,
  h6 {
    line-height: 1.2;
  }  */
  /*# sourceMappingURL=reboot.css.map*/
`;
