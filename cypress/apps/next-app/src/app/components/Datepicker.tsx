import dynamic from "next/dynamic"
const SgdsDatepicker = dynamic(
    () => import("@govtechsg/sgds-web-component/react/datepicker/index.js"),
    {
      ssr: false,
    }
  );
export const Datepicker = () => {
  return <SgdsDatepicker dateformat="DD/MM/YYYY" mode="single"></SgdsDatepicker>;
};
