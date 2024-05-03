import { css } from "lit";
export default css`
  .text-center {
    text-align: center !important;
  }
  /* button {
  border-radius: 0;
} */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }
  /* button {
  text-transform: none;
}
button {
  -webkit-appearance: button;
} */
  .text-center {
    text-align: center !important;
  }
  /** scss */

  .datepicker-body {
    padding: 0 1.5rem 1.5rem;
  }

  table {
    border-collapse: collapse;
  }
  .sgds.monthpicker,
  .sgds.yearpicker {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 3rem);
    justify-content: space-between;
    align-content: space-between;
    padding: 1rem 0 0;
  }

  button.month,
  button.year {
    padding: 0;
    border: 0;
    background-color: transparent;
  }
  button.month.active {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  button.month.active.selected-ends {
    background-color: var(--datepicker-selected-date-bg-color);
    color: var(--datepicker-selected-date-text-color);
  }
  button.month:hover:not(.active) {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  button.month:focus {
    outline: var(--datepicker-theme-color) auto 2px;
    z-index: 100;
  }
  button.year.active {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  button.year.active.selected-ends {
    background-color: var(--datepicker-selected-date-bg-color);
    color: var(--datepicker-selected-date-text-color);
  }
  button.year:hover:not(.active) {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  button.year:focus {
    outline: var(--datepicker-theme-color) auto 2px;
    z-index: 100;
  }
  td {
    width: 3rem;
    height: 3rem;
    padding: 0;
  }

  td[data-day] {
    cursor: pointer;
  }

  td[data-day]:hover:not(.disabled):not(.selected-ends) {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  td[data-day].active {
    cursor: pointer;
    background-color: var(--datepicker-hover-bg-color);
  }
  td[data-day].active.selected-ends {
    background-color: var(--datepicker-selected-date-bg-color);
    color: var(--datepicker-selected-date-text-color);
  }
  td[data-day]:focus {
    outline: var(--datepicker-theme-color) auto 2px;
  }
  td[data-day].disabled {
    color: var(--sgds-gray-400);
    cursor: not-allowed;
  }

  .today {
    color: var(--datepicker-theme-color);
  }
`;
