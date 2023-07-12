export const makeArgTypes = componentProps =>
  componentProps.reduce((obj, item) => {
    let controlObject = {};
    if (item.default) {
      const table = { defaultValue: {} };
      table.defaultValue.summary = item?.default?.replaceAll('"', "");
      controlObject.table = table;
    }
    // controlObject.table.defaultValue.summary = item?.default?.replaceAll('"', '')
    switch (true) {
      case /\|/.test(item.type?.text):
        controlObject.control = "select";
        controlObject.options = item.type?.text
          .replaceAll('"', "")
          .split("|")
          .map(opt => opt.trim());
        break;
      case /^string$/.test(item.type?.text):
        controlObject.control = "text";
        // controlObject.table.defaultValue.summary = item?.default?.replaceAll('"', '')
        break;
      case /^boolean$/.test(item.type?.text):
        controlObject.control = "boolean";
        if (item.default) {
          controlObject.table.defaultValue.summary = item.default === "true";
        }
        break;
      case /^number$/.test(item.type?.text):
        controlObject.control = "number";
        break;
      case /^array$/.test(item.type?.text):
        controlObject.control = "object";
        break;
      default:
        controlObject.control = "object";
    }
    return Object.assign(obj, { [item.name]: controlObject });
  }, {});
