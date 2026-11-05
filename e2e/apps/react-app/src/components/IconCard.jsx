import { SgdsIconCard } from '@govtechsg/sgds-web-component/react';

export const IconCard = () => {
  return (
    <>
      <SgdsIconCard>
        <span slot="title">Icon Card Title</span>
        <span slot="description">Description of the icon card.</span>
      </SgdsIconCard>
    </>
  );
};
