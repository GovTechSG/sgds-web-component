import { SgdsInput, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Input = () => {
  return (
    <>
      <SgdsInput type="text" placeholder="placeholder" autocomplete="on" label="Input">
        <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
      </SgdsInput>
    </>
  );
};
