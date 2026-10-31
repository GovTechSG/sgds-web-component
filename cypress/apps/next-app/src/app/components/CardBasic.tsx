'use client';

import { SgdsCard } from '@govtechsg/sgds-web-component/react';

export const CardBasic = () => {
  return (
    <SgdsCard>
      <span slot="title">Card Title</span>
      <span slot="subtitle">Card Subtitle</span>
      <p>This is a basic card component with some content.</p>
    </SgdsCard>
  );
};
