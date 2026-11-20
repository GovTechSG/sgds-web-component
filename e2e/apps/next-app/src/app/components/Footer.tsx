'use client';

import { SgdsFooter } from '@govtechsg/sgds-web-component/react';

export const Footer = () => {
  return (
    <>
      <SgdsFooter
        contactHref="https://form.gov.sg/"
        feedbackHref="https://form.gov.sg/"
        privacyHref="/privacy"
        termsOfUseHref="/terms"
      ></SgdsFooter>
    </>
  );
};
