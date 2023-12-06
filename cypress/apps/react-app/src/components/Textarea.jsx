import SgdsTextarea from "@govtechsg/sgds-web-component/react/textarea";

export const Textarea = () => {
    return <SgdsTextarea
        label="Label" 
        name="textarea"
        rows="4" 
        invalidfeedback="" 
        placeholder="Placeholder"
        maxlength="100" 
        resize="vertical" 
        defaultvalue="" />
}
