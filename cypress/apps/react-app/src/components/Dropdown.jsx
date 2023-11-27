import SgdsDropdown from "@govtechsg/sgds-web-component/react/dropdown";
import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item";

export const Dropdown = () => {
    return (
        <SgdsDropdown togglertext="Dropdown" drop="down" variant="secondary" close="default">
            <SgdsDropdownItem href="#" target="_self">item #1 (argsTable controlled)</SgdsDropdownItem>
            <SgdsDropdownItem href="https://google.com">item #2</SgdsDropdownItem>
            <SgdsDropdownItem href="#" disabled="">item #3</SgdsDropdownItem>
        </SgdsDropdown>
    )
}