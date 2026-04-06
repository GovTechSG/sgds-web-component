"use client";

import { useRef, useEffect } from "react";

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

  return <sgds-pagination ref={ref} suppressHydrationWarning></sgds-pagination>;
};
