import { SgdsTooltip, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Tooltip = () => {
  return (
    <>
      <SgdsTooltip content="This is a tooltip" placement="top" trigger="hover focus">
        <SgdsIcon name="info-circle" ariaLabel="Information" tabindex="0"></SgdsIcon>
      </SgdsTooltip>
    </>
  );
};
