import SgdsProgressBar from "@govtechsg/sgds-web-component/react/progress-bar";

export const ProgressBar = () => {
  return (
    <SgdsProgressBar
      label="50%"
      variant="neutral"
      value="50"
      ariamin="0"
      ariamax="100"
      arialabel="Loading in progress"
    ></SgdsProgressBar>
  );
};
