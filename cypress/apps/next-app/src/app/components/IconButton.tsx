import SgdsIconButton from "@govtechsg/sgds-web-component/react/icon-button/index.js";

export const IconButton = () => {
  return (
    <>
      <SgdsIconButton name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="ghost" name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="outline" name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="danger" name="placeholder"></SgdsIconButton>
    </>
  );
};
