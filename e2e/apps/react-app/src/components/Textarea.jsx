import { SgdsTextarea } from '@govtechsg/sgds-web-component/react';

export const Textarea = () => {
  return (
    <>
      <SgdsTextarea
        label="Label"
        name="textarea"
        placeholder="Enter your comments"
      ></SgdsTextarea>
    </>
  );
};
