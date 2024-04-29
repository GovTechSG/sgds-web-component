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
  /**scss */
  :host {
  --modal-padding: 1.5rem;
  --modal-panel-z-index: var(--zindex-modal, 105500);
  --modal-panel-width: 35rem;
  --modal-panel-height: auto;
  --modal-panel-background-color: white;
  --modal-panel-border-radius: 5px;
  --modal-header-bottom-border-line-width: 1px;
  --modal-overlay-background-color: var(--overlay-background-color, rgba(0, 0, 0, 0.5));
  display: contents;
}

[hidden] {
  display: none !important;
}

.modal {
  display: flex;
  align-items: start;
  padding-top: 1.75rem;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--modal-panel-z-index);
  font-family: var(--sgds-body-font-family);
}

.modal.centered {
  align-items: center;
  padding-top: 0;
}

.modal-panel {
  display: flex;
  flex-direction: column;
  z-index: var(--modal-panel-z-index);
  width: var(--modal-panel-width);
  height: var(--modal-panel-height);
  max-width: calc(100% - 2.25rem);
  max-height: calc(100% - 2.25rem);
  background-color: var(--modal-panel-background-color);
  border-radius: var(--modal-panel-border-radius);
}

.modal-panel:focus {
  outline: none;
}

/* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
@media screen and (max-width: 420px) {
  .modal-panel {
    max-height: 80vh;
  }
}

.modal--open .modal-panel {
  display: flex;
  opacity: 1;
  transform: none;
}

.modal-header {
  flex: 0 0 auto;
  margin-bottom: 0.5rem;
  margin-top: 0px;
  font-weight: 700;
  line-height: 1.33;
  font-size: calc(1.275rem + 0.3vw);
  display: flex;
  padding: var(--modal-padding);
  align-items: center;
  border-bottom: var(--modal-header-bottom-border-line-width) solid var(--sgds-gray-400, #98a2b3);
  &.centered {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.modal-title {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 1rem;
  &.centered {
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-left: 3rem;
  }
}

.modal-close {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  &.centered {
    align-self: flex-start;
    margin-top: -0.5rem;
  }
}

.modal-body {
  flex: 1 1 auto;
  padding: var(--modal-padding);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &.centered {
    text-align: center;
  }
}

.modal-footer {
  flex: 0 0 auto;
  text-align: right;
  padding: var(--modal-padding);
  padding-top: 0;
  &.centered {
    text-align: center;
    justify-content: center;
  }
}

.modal-footer ::slotted(sgds-button) {
  margin-inline-start: 0.5rem;
}

.modal:not(.modal--has-footer) .modal-footer {
  display: none;
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--modal-overlay-background-color);
}

`;
