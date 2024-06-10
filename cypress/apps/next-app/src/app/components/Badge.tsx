import SgdsBadge from "@govtechsg/sgds-web-component/react/badge/index.js";

export const Badge = () => {
    return (
        <>
            <SgdsBadge>primary</SgdsBadge>
            <SgdsBadge>
                <i slot="leftIcon" className="bi bi-credit-card-fill"></i>
                leftIcon slot
            </SgdsBadge>
            <SgdsBadge>
                <i slot="rightIcon" className="bi bi-credit-card-fill"></i>
                rightIcon slot
            </SgdsBadge>
        </>

    )
}
