import { css } from "lit";

export default css`
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    color: var(--sgds-heading-color);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  @media (min-width: 1200px) {
    .h1 {
      font-size: 2.5rem;
    }
  }
  .h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  @media (min-width: 1200px) {
    .h2 {
      font-size: 2rem;
    }
  }
  .h3 {
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    .h3 {
      font-size: 1.5rem;
    }
  }
  .h4 {
    font-size: 1.125rem;
  }
  .h5,
  .h6 {
    font-size: 1rem;
  }
  .h1 {
    line-height: 1.2;
  }
  .h2 {
    line-height: 1.25;
  }
  .h3 {
    line-height: 1.33;
  }
  .h4 {
    line-height: 1.78;
  }
  .h5,
  .h6 {
    line-height: 1.2;
  }
`;
