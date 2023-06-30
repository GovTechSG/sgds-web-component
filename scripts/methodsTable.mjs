export const methodsTable = metaArr =>
  // const accordionModule = modules[0]
  metaArr.map(component => ({
    tagName: component.tagName,
    methods: component.members.filter(member => member.kind === "method" && member.privacy === "public")
  }));

export const writeParams = metaObj => {
  if ("parameters" in metaObj && metaObj.parameters.length > 0) {
    const { parameters } = metaObj;
    return parameters
      .map(param => 
        piecingParam(param)
      )
      .join(", ");
  } else {
    return "";
  }
};

export const piecingParam = (param) => {
  const typedParam = param.name + ": " + param.type.text;
  if ("default" in param) {
    return typedParam + " = " + param.default
  }
  return typedParam;
}