"use client";

import { useRef, useEffect, useMemo } from "react";

export const Stepper = () => {
  const ref = useRef<any>(null);

  const steps = useMemo(
    () => [
      { stepHeader: "Personal Details", component: "1 test" },
      { stepHeader: "Address and Contact Information", component: "2 test" },
      { stepHeader: "Review", component: "3 test" }
    ],
    []
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.steps = steps;
      ref.current.activeStep = 1;
    }
  }, [steps]);

  return <sgds-stepper ref={ref} suppressHydrationWarning></sgds-stepper>;
};
