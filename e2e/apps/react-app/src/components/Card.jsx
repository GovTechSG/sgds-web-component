import { SgdsCard, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Card = () => {
  return (
    <>
      <SgdsCard imagePosition="before" imageAdjustment="default" orientation="vertical">
        <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
        <span slot="title">Card</span>
        <span slot="description">Description of the card.</span>
        <span slot="footer">Footer content</span>
        Card
      </SgdsCard>
    </>
  );
};
