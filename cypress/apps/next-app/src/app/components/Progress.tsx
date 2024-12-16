import SgdsProgressBar from "@govtechsg/sgds-web-component/react/progress-bar/index.js";

export const Progress = () => {
  return (
      <SgdsProgressBar
        label="50%"
        variant="secondary"
        value={50}
        ariamin={0}
        ariamax={100}
        aria-label="Loading in progress"
      ></SgdsProgressBar>
  );
};
