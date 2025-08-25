
export const Badge = () => {
    return (
        <>
            <sgds-badge>primary</sgds-badge>
            <sgds-badge>
                <i slot="leftIcon" className="bi bi-credit-card-fill"></i>
                leftIcon slot
            </sgds-badge>
            <sgds-badge>
                <i slot="rightIcon" className="bi bi-credit-card-fill"></i>
                rightIcon slot
            </sgds-badge>
        </>

    )
}
