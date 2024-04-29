import { css } from "lit";
export default css`
  :host {
    --sidenav-theme-color: #5925dc;
    --sidenav-sticky-top: 0rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding-left: 0;
  }

  .sticky {
    position: sticky;
    top: var(--sidenav-sticky-top);
    height: calc(100vh - var(--sidenav-sticky-top));
    overflow-y: auto;
  }
`;
