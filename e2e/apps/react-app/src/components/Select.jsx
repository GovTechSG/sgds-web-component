import { SgdsSelect, SgdsSelectOption } from '@govtechsg/sgds-web-component/react';

export const Select = () => {
  return (
    <>
      <SgdsSelect label="Country" name="country" placeholder="Select a country">
        <SgdsSelectOption value="sg">Singapore</SgdsSelectOption>
        <SgdsSelectOption value="my">Malaysia</SgdsSelectOption>
        <SgdsSelectOption value="id">Indonesia</SgdsSelectOption>
      </SgdsSelect>
    </>
  );
};
