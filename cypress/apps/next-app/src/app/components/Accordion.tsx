import SgdsAccordion from "@govtechsg/sgds-web-component/react/accordion/index.js";
import SgdsAccordionItem from "@govtechsg/sgds-web-component/react/accordion-item/index.js";

export const Accordion = () => {
    return (
        <>
            <SgdsAccordion accordionclasses="mb-4">
                <SgdsAccordionItem>
                    <p className="m-0" slot="accordion-header">This is a solo accordion</p>
                    <span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
            </SgdsAccordion>
            <SgdsAccordion>
                <SgdsAccordionItem>
                    <p className="m-0" slot="accordion-header">This is an accordion</p>
                    <span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem>
                    <p className="m-0" slot="accordion-header">Accordion 1</p>
                    <span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem open="">
                    <p className="m-0" slot="accordion-header">Accordion 2</p>
                    <span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem>
                    <p className="m-0" slot="accordion-header">Accordion 3</p>
                    <span slot="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
            </SgdsAccordion>
        </>
    )
};
