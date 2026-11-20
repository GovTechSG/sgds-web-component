'use client';

import { SgdsThumbnailCard, SgdsBadge, SgdsLink, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const ThumbnailCard = () => {
  return (
    <>
      <SgdsThumbnailCard orientation="vertical">
        <img slot="thumbnail" alt="placeholder" width="64" height="64" src="https://placehold.co/64" />
        <SgdsBadge variant="primary" slot="upper">New</SgdsBadge>
        <span slot="subtitle">FEATURES</span>
        <span slot="title">Innovative solutions for you</span>
        <span slot="description">Discover how our platform can streamline your workflow.</span>
        <SgdsLink slot="footer"><a href="#" aria-label="Learn more">Learn more <SgdsIcon name="arrow-right"></SgdsIcon></a></SgdsLink>
      </SgdsThumbnailCard>
    </>
  );
};
