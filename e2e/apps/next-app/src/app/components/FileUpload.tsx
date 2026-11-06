'use client';

import { SgdsFileUpload } from '@govtechsg/sgds-web-component/react/ssr';

export const FileUpload = () => {
  return (
    <>
      <SgdsFileUpload variant="default" ariaLabel="Choose files" label="FileUpload">
        FileUpload
      </SgdsFileUpload>
    </>
  );
};
