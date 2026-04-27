
    import { Template, args, parameters, play } from "../templates/FileUpload/basic.js";

    export default {
      title: 'Components/FileUpload',
      component: 'sgds-file-upload',
      argTypes: {"multiple":{"defaultValue":false,"control":"boolean"},"accept":{"defaultValue":"","control":"text"},"hasFeedback":{"defaultValue":false,"control":"boolean"},"invalidFeedback":{"control":"text"},"required":{"defaultValue":false,"control":"boolean"},"validity":{"control":"object"},"validationMessage":{"control":"text"},"files":{"control":"object"},"label":{"defaultValue":"","control":"text"},"hintText":{"defaultValue":"","control":"text"},"name":{"control":"text"},"disabled":{"defaultValue":false,"control":"boolean"},"invalid":{"defaultValue":false,"control":"boolean"},"_controlId":{"control":"object"},"_labelId":{"control":"object"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  