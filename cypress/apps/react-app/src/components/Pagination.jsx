import SgdsPagination from "@govtechsg/sgds-web-component/react/pagination";

export const Pagination = () => {
    return (
        <SgdsPagination
            datalength="50"
            currentpage="1"
            itemsperpage="5"
            limit="3"
            directionvariant="icon-text"
            size="sm"
            ellipsisjump="3" />
    )
}
