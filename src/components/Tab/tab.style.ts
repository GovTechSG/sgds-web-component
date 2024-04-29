import { css } from "lit";
export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  ul {
    padding-left: 2rem;
  }
  ul {
    margin-bottom: 1rem;
    margin-top: 0;
  }
  .list-unstyled {
    list-style: none;
    padding-left: 0;
  }
  .nav-link {
    color: #0f71bb;
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-link {
      transition: none;
    }
  }
  .nav-link:focus,
  .nav-link:hover {
    color: #0c5a96;
  }
`;
