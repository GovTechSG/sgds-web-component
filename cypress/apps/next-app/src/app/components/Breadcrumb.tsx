'use client';

import SgdsBreadcrumb from '@govtechsg/sgds-web-component/react/breadcrumb/index.js';
import SgdsBreadcrumbItem from '@govtechsg/sgds-web-component/react/breadcrumb-item/index.js';

export const Breadcrumb = () => {
  return (
    <SgdsBreadcrumb aria-label="breadcrumb">
      <SgdsBreadcrumbItem><a href="https://www.google.com">first</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem><a href="https://www.google.com">second</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem><a href="https://www.google.com">third</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem><a href="https://www.google.com">fourth</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem><a href="https://www.google.com">fifth</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem><a href="https://www.google.com">sixth</a></SgdsBreadcrumbItem>
      <SgdsBreadcrumbItem>Last Item</SgdsBreadcrumbItem>
    </SgdsBreadcrumb>
  );
};
