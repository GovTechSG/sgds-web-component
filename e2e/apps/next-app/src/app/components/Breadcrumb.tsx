'use client';

import { SgdsBreadcrumb, SgdsBreadcrumbItem } from '@govtechsg/sgds-web-component/react/ssr';

export const Breadcrumb = () => {
  return (
    <>
      <SgdsBreadcrumb ariaLabel="breadcrumb">
        <SgdsBreadcrumbItem><a href="#">Home</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem><a href="#">About</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem active><a href="#">Contacts</a></SgdsBreadcrumbItem>
      </SgdsBreadcrumb>
    </>
  );
};
