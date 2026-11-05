import { SgdsCheckboxGroup, SgdsCheckbox } from '@govtechsg/sgds-web-component/react';

export const CheckboxGroup = () => {
  return (
    <>
      <SgdsCheckboxGroup label="CheckboxGroup">
        <SgdsCheckbox ariaLabel="Checkbox" label="Checkbox">
          Checkbox content
        </SgdsCheckbox>
      </SgdsCheckboxGroup>
    </>
  );
};
