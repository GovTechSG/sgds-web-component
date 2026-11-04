'use client';

import { SgdsBreadcrumb, SgdsBreadcrumbItem } from '@govtechsg/sgds-web-component/react';

export const Breadcrumb = () => {
  return (
    <>
      <SgdsBreadcrumb>
        <SgdsBreadcrumbItem><a href="/">Home</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem><a href="/about">About</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem><a href="/current">Current Page</a></SgdsBreadcrumbItem>
      </SgdsBreadcrumb>
    </>
  );
};
