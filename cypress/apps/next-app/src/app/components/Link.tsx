import SgdsLink from "@govtechsg/sgds-web-component/react/link/index.js";
import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";

export const Link = () => {
  return (
    <>
      <SgdsLink>
        <a href="#">
          <SgdsIcon name="placeholder"></SgdsIcon> light dom anchor
        </a>
      </SgdsLink>
    </>
  );
};
