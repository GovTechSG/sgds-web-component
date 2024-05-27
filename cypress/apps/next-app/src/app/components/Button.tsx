import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";

export const Button = () => {
    return (
        <>
            <SgdsButton variant="primary"> primary </SgdsButton>
            <SgdsButton variant="secondary"> secondary </SgdsButton>
            <SgdsButton variant="success"> success </SgdsButton>
            <SgdsButton variant="danger"> danger </SgdsButton>
            <SgdsButton variant="warning"> warning </SgdsButton>
            <SgdsButton variant="info"> info </SgdsButton>
            <SgdsButton variant="light"> light </SgdsButton>
            <SgdsButton variant="dark"> dark </SgdsButton>
        </>
    )
}
