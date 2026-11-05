import { SgdsBreadcrumb, SgdsBreadcrumbItem } from '@govtechsg/sgds-web-component/react';

export const Breadcrumb = () => {
  return (
    <>
      <SgdsBreadcrumb ariaLabel="breadcrumb">
        <SgdsBreadcrumbItem>
          BreadcrumbItem content
        </SgdsBreadcrumbItem>
      </SgdsBreadcrumb>
    </>
  );
};
