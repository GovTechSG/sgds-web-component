'use client';

import { SgdsThumbnailCard } from "@govtechsg/sgds-web-component/react";

export const Card = () => {
  return (
    <SgdsThumbnailCard stretchedlink="" orientation="vertical">
      <span slot="subtitle">EXPLORE THE FEATURES</span>
      <span slot="title">Innovative Solutions for You</span>
      <span slot="description">
        Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
        and user-friendly design, we empower you to achieve more.
      </span>
      <div slot="lower"></div>
      <a href="#" slot="link">Register now</a>
    </SgdsThumbnailCard>
  );
};
