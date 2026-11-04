'use client';

import { SgdsCard, SgdsLink } from '@govtechsg/sgds-web-component/react';

export const Card = () => {
  return (
    <>
      <SgdsCard>
        <span slot="title">Card Title</span>
        <span slot="description">This is a description of the card content.</span>
        <SgdsLink slot="footer"><a href="#">Read more</a></SgdsLink>
      </SgdsCard>
    </>
  );
};
