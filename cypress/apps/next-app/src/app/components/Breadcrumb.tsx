import SgdsBreadcrumb from "@govtechsg/sgds-web-component/react/breadcrumb/index.js";
import SgdsBreadcrumbItem from "@govtechsg/sgds-web-component/react/breadcrumb-item/index.js";

export const Breadcrumb = () => {
    return (
        <SgdsBreadcrumb ariaLabel="breadcrumb">
            <SgdsBreadcrumbItem >
                <a href="https://www.google.com">first</a>
            </SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem>Last Item</SgdsBreadcrumbItem>
        </SgdsBreadcrumb>
    )
}
