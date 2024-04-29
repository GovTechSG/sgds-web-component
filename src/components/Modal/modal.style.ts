import { css } from "lit";
export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  h3 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  h3 {
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    h3 {
      font-size: 1.5rem;
    }
  }
  svg {
    vertical-align: middle;
  }
  button {
    border-radius: 0;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
  }
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }
  button {
    text-transform: none;
  }
  button {
    -webkit-appearance: button;
  }
  button:not(:disabled) {
    cursor: pointer;
  }
  h3 {
    line-height: 1.33;
  }
  .btn-sm {
    border-radius: 0.2rem;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
  .btn-close {
    background: transparent
      url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2398A2B3'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      50%/1em auto no-repeat;
    border: 0;
    border-radius: 0.3125rem;
    box-sizing: content-box;
    color: #98a2b3;
    height: 1em;
    opacity: 1;
    padding: 0.25em;
    width: 1em;
  }
  .btn-close:hover {
    color: #98a2b3;
    opacity: 1;
    text-decoration: none;
  }
  .btn-close:focus {
    box-shadow: 0 0 0 0.125rem rgba(15, 113, 187, 0.25);
    opacity: 1;
    outline: 0;
  }
  .btn-close:disabled {
    opacity: 0.25;
    pointer-events: none;
    user-select: none;
  }
  .btn-close:hover {
    background: transparent
      url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23344054'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      50%/1em auto no-repeat;
  }
  .modal-header {
    align-items: center;
    border-bottom: 1px solid #98a2b3;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    padding: 1.5rem;
  }
  .modal-header .btn-close {
    margin: -0.75rem -0.75rem -0.75rem auto;
    padding: 0.75rem;
  }
  .modal-title {
    line-height: 2;
    margin-bottom: 0;
  }
`;
