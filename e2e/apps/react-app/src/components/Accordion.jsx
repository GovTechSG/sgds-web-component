import { SgdsAccordion, SgdsAccordionItem } from '@govtechsg/sgds-web-component/react';

export const Accordion = () => {
  return (
    <>
      <SgdsAccordion>
        <SgdsAccordionItem ariaLabel="Accordion title #1">
          <div slot="header">Accordion title #1</div>
          <div slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </SgdsAccordionItem>
        <SgdsAccordionItem ariaLabel="Accordion title #2">
          <div slot="header">Accordion title #2</div>
          <div slot="content">Maiores soluta eaque fugit fuga distinctio.</div>
        </SgdsAccordionItem>
      </SgdsAccordion>
    </>
  );
};
