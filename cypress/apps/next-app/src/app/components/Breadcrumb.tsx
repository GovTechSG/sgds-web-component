import SgdsBreadcrumbItem from "@govtechsg/sgds-web-component/react/breadcrumb-item/index.js";
import dynamic from "next/dynamic"
const SgdsBreadcrumb = dynamic(
  () => import("@govtechsg/sgds-web-component/react/breadcrumb/index.js"),
  {
    ssr: false,
  }
) 

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
