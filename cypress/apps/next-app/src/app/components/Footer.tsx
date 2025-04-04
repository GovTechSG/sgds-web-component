import SgdsFooter from "@govtechsg/sgds-web-component/react/footer/index.js";
import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";

export const Footer = () => {
  return (
    <SgdsFooter>
      <a slot="social-media" href="https://www.facebook.com">
        <SgdsIcon name="facebook"></SgdsIcon>
      </a>
      <a slot="social-media" href="https://www.instagram.com">
        <SgdsIcon name="instagram"></SgdsIcon>
      </a>
      <a slot="social-media" href="https://www.linkedin.com">
        <SgdsIcon name="linkedin"></SgdsIcon>
      </a>
      <a slot="social-media" href="https://www.x.com">
        <SgdsIcon name="twitter-x"></SgdsIcon>
      </a>
      <a slot="social-media" href="https://www.youtube.com">
        <SgdsIcon name="youtube"></SgdsIcon>
      </a>
    </SgdsFooter>
  );
};
