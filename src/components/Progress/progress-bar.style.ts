import { css } from "lit";
import bgVariants from "../../styles/bg-variants";
export default css`
  ${bgVariants}
  progress {
    vertical-align: baseline;
  }
  .progress,
  .progress-stacked {
    --sgds-progress-height: 1rem;
    --sgds-progress-font-size: 0.75rem;
    --sgds-progress-bg: var(--sgds-secondary-bg);
    --sgds-progress-border-radius: var(--sgds-border-radius);
    --sgds-progress-box-shadow: var(--sgds-box-shadow-inset);
    --sgds-progress-bar-color: #fff;
    --sgds-progress-bar-bg: #5942db;
    --sgds-progress-bar-transition: width 0.6s ease;
    background-color: var(--sgds-progress-bg);
    border-radius: var(--sgds-progress-border-radius);
    display: flex;
    font-size: var(--sgds-progress-font-size);
    height: var(--sgds-progress-height);
    overflow: hidden;
  }
  .progress-bar {
    background-color: var(--sgds-progress-bar-bg);
    color: var(--sgds-progress-bar-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    transition: var(--sgds-progress-bar-transition);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .progress-bar {
      transition: none;
    }
  }
  .progress-bar-striped {
    background-image: linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.15) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.15) 0,
      hsla(0, 0%, 100%, 0.15) 75%,
      transparent 0,
      transparent
    );
    background-size: var(--sgds-progress-height) var(--sgds-progress-height);
  }
  .progress-stacked > .progress {
    overflow: visible;
  }
  .progress-stacked > .progress > .progress-bar {
    width: 100%;
  }
  .progress-bar-animated {
    animation: progress-bar-stripes 1s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .progress-bar-animated {
      animation: none;
    }
  }

  .progress-bar-striped {
    background-image: linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.15) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.15) 0,
      hsla(0, 0%, 100%, 0.15) 75%,
      transparent 0,
      transparent
    );
    background-size: 1rem 1rem;
  }

  /*! CSS Used keyframes */
  @keyframes progress-bar-stripes {
    0% {
      background-position-x: 1rem;
    }
  }
`;
