import { css } from "lit";
import textVariants from "../../styles/text-variants";
export default css`
  ${textVariants}
  *,:after,:before {
    box-sizing: border-box;
  }
  .spinner-border {
    animation: spinner-border 0.75s linear infinite;
    border: 0.25em solid;
    border-radius: 50%;
    border-right: 0.25em solid transparent;
    display: inline-block;
    height: 2rem;
    vertical-align: -0.125em;
    width: 2rem;
  }
  @media (prefers-reduced-motion: reduce) {
    .spinner-border {
      animation-duration: 1.5s;
    }
  }
  /*! CSS Used keyframes */
  @keyframes spinner-border {
    to {
      transform: rotate(1turn);
    }
  }
  /** scss */


.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}
`;
