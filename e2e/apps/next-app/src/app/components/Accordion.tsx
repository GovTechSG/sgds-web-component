'use client';

import { SgdsAccordion, SgdsAccordionItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Accordion = () => {
  return (
    <>
      <SgdsAccordion variant="default" density="default">
        <SgdsAccordionItem ariaLabel="AccordionItem">
          <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
          <div slot="header">Header text</div>
          <div slot="content">Content goes here.</div>
        </SgdsAccordionItem>
      </SgdsAccordion>
    </>
  );
};
