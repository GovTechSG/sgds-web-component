'use client';

import { useRef, useEffect } from "react";
import { SgdsPagination } from "@govtechsg/sgds-web-component/react";

export const Pagination = () => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.dataLength = 50;
      ref.current.currentPage = 1;
      ref.current.itemsPerPage = 5;
      ref.current.limit = 3;
      ref.current.directionVariant = "icon-text";
      ref.current.size = "sm";
      ref.current.ellipsisJump = 3;
    }
  }, []);

  return <SgdsPagination ref={ref}></SgdsPagination>;
};
