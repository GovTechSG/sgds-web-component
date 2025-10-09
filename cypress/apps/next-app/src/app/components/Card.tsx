"use client"
// import SgdsCard from "@govtechsg/sgds-web-component/react/card/index.js";
// import SgdsThumbnailCard from "@govtechsg/sgds-web-component/react/thumbnail-card/index.js";
// import SgdsLink from "@govtechsg/sgds-web-component/react/link/index.js";
// import Image from "next/image";
export const Card = () => {
  console.log("card")
  return (
    <>
      {/* <SgdsThumbnailCard stretchedlink="" orientation="vertical">
        <img slot="thumbnail" alt="img alternate text goes here" width="48" height="48" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg"/>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <span slot="description">Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span>
        <div slot="lower">
        </div>
          <a href="#"  slot="link">Register now</a>
      </SgdsThumbnailCard> */}
         <sgds-thumbnail-card stretchedlink="" orientation="vertical">
          <a href="#" slot="link">Register now </a>
      </sgds-thumbnail-card>
      <sgds-select value="1">
        <sgds-select-option value="1">1</sgds-select-option>
        <sgds-select-option value="2">2</sgds-select-option>
        <sgds-select-option value="3">3</sgds-select-option>
      </sgds-select>
    </>
  );
};
