'use client';

import { SgdsIconCard } from '@govtechsg/sgds-web-component/react';

export const IconCard = () => {
  return (
    <SgdsIconCard>
      <span slot="title">Icon Card Title</span>
      <span slot="description">This is an icon card with a description.</span>
      <a href="#" slot="link">Learn more</a>
    </SgdsIconCard>
  );
};
