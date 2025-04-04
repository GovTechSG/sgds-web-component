import SgdsAccordion from "@govtechsg/sgds-web-component/react/accordion/index.js";
import SgdsAccordionItem from "@govtechsg/sgds-web-component/react/accordion-item/index.js";

export const Accordion = () => {
  return (
    <>
      <SgdsAccordion>
        <SgdsAccordionItem>
          <div className="m-0" slot="header">
            This is a solo accordion
          </div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </SgdsAccordionItem>
      </SgdsAccordion>
      <SgdsAccordion>
        <SgdsAccordionItem>
          <div className="m-0" slot="header">
            This is an accordion
          </div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </SgdsAccordionItem>
        <SgdsAccordionItem>
          <div className="m-0" slot="header">
            Accordion 1
          </div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </SgdsAccordionItem>
        <SgdsAccordionItem open>
          <div className="m-0" slot="header">
            Accordion 2
          </div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </SgdsAccordionItem>
        <SgdsAccordionItem>
          <div className="m-0" slot="header">
            Accordion 3
          </div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </SgdsAccordionItem>
      </SgdsAccordion>
    </>
  );
};
