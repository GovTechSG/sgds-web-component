'use client';

import { SgdsDatepicker } from '@govtechsg/sgds-web-component/react/ssr';

export const Datepicker = () => {
  return (
    <>
      <SgdsDatepicker mode="single" label="Datepicker" drop="down"></SgdsDatepicker>
    </>
  );
};
