import SgdsProgress from "@govtechsg/sgds-web-component/react/progress";
import SgdsProgressBar from "@govtechsg/sgds-web-component/react/progress-bar";

export const Progress = () => {
  return (
    <SgdsProgress>
      <SgdsProgressBar
        label="50%"
        value="50"
        variant="secondary"
        aria-valuenow="50"
        aria-minvalue="0"
        aria-maxvalue="100"
        aria-label="Loading in progress"
      ></SgdsProgressBar>
    </SgdsProgress>
  );
};
