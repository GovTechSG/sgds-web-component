import SgdsTextarea from "@govtechsg/sgds-web-component/react/textarea/index.js";

export const Textarea = () => {
  return (
    <SgdsTextarea
      label="Label"
      name="textarea"
      rows={4}
      invalidFeedback=""
      placeholder="Placeholder"
      maxlength={100}
      resize="vertical"
      defaultValue=""
    />
  );
};
