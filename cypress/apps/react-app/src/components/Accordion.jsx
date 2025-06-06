import SgdsAccordion from "@govtechsg/sgds-web-component/react/accordion";
import SgdsAccordionItem from "@govtechsg/sgds-web-component/react/accordion-item";

export const Accordion = () => {
    return (
        <>
            <SgdsAccordion accordionclasses="mb-4">
                <SgdsAccordionItem>
                    <div  slot="header">This is a solo accordion</div>
                    <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
            </SgdsAccordion>
            <SgdsAccordion>
                <SgdsAccordionItem>
                    <div  slot="header">This is an accordion</div>
                    <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem>
                    <div  slot="header">Accordion 1</div>
                    <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem open="">
                    <div slot="header">Accordion 2</div>
                    <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
                <SgdsAccordionItem>
                    <div  slot="header">Accordion 3</div>
                    <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.</span>
                </SgdsAccordionItem>
            </SgdsAccordion>
        </>
    )
};
