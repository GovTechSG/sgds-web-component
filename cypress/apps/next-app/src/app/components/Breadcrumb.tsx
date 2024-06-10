import SgdsBreadcrumb from "@govtechsg/sgds-web-component/react/breadcrumb/index.js";
import SgdsBreadcrumbItem from "@govtechsg/sgds-web-component/react/breadcrumb-item/index.js";

export const Breadcrumb = () => {
    return (
        <SgdsBreadcrumb arialabel="breadcrumb">
            <SgdsBreadcrumbItem rel="noreferrer noopener" href="undefined" target="undefined">Home</SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem href="https://www.google.com">Item 1</SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem href="https://www.google.com">Item 2</SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem href="https://www.google.com">Item 3</SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem>Last Item</SgdsBreadcrumbItem>
        </SgdsBreadcrumb>
    )
}
