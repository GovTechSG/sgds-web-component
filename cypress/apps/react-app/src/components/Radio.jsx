import SgdsRadio from "@govtechsg/sgds-web-component/react/radio";
import SgdsRadioGroup from "@govtechsg/sgds-web-component/react/radio-group";

export const Radio = () => {
    return (
        <SgdsRadioGroup>
            <span slot="label">Select an option</span>
            <SgdsRadio>Option 1</SgdsRadio>
            <SgdsRadio value="2">Option 2</SgdsRadio>
            <SgdsRadio value="3">Option 3</SgdsRadio>
        </SgdsRadioGroup>
    )
}
