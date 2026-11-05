import { SgdsImageCard, SgdsBadge, SgdsLink, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const ImageCard = () => {
  return (
    <>
      <SgdsImageCard orientation="vertical">
        <img slot="image" alt="placeholder" width="80" height="80" src="https://placehold.co/400x300" />
        <SgdsBadge variant="primary" slot="upper">New</SgdsBadge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative solutions for you</span>
        <span slot="description">Discover how our platform can streamline your workflow.</span>
        <SgdsLink slot="footer"><a href="#" aria-label="Register now">Register now <SgdsIcon name="arrow-right"></SgdsIcon></a></SgdsLink>
      </SgdsImageCard>
    </>
  );
};
