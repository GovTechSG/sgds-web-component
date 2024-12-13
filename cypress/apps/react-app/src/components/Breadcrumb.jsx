import SgdsBreadcrumb from "@govtechsg/sgds-web-component/react/breadcrumb";
import SgdsBreadcrumbItem from "@govtechsg/sgds-web-component/react/breadcrumb-item";

export const Breadcrumb = () => {
    return (
        <SgdsBreadcrumb arialabel="breadcrumb">
            <SgdsBreadcrumbItem>
            <a href="https://www.google.com/">Home</a>
            </SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem>
            <a href="https://www.google.com/">Home</a>
            </SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem><a href="https://www.google.com/">Home</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem ><a href="https://www.google.com/">Home</a></SgdsBreadcrumbItem>
            <SgdsBreadcrumbItem>Last Item</SgdsBreadcrumbItem>
        </SgdsBreadcrumb>
    )
}
