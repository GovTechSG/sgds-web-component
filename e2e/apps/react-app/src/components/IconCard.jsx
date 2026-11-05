import { SgdsIconCard, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const IconCard = () => {
  return (
    <>
      <SgdsIconCard orientation="vertical">
        <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
        <span slot="title">IconCard</span>
        <span slot="description">Description of the iconcard.</span>
        <span slot="footer">Footer content</span>
        IconCard
      </SgdsIconCard>
    </>
  );
};
