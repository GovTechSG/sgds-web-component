import dynamic from "next/dynamic"
const SgdsQuantityToggle = dynamic(
    () => import("@govtechsg/sgds-web-component/react/quantity-toggle/index.js"),
    {
      ssr: false,
    }
  );
export const QuantityToggle = () => {
  return <SgdsQuantityToggle step={1} size="sm" buttonVariant="primary" defaultValue="0" />;
};
