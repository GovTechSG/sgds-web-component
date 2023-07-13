export const makeArgTypes = componentProps =>
  componentProps.reduce((obj, item) => {
    let controlObject = {};
    controlObject.defaultValue = item?.default?.replaceAll('"', '')
    switch (true) {
      case /\|/.test(item.type?.text):
        controlObject.control = 'select';
        controlObject.options = item.type?.text
          .replaceAll('"', '')
          .split('|')
          .map(opt => opt.trim());
        break;
      case /^string$/.test(item.type?.text):
        controlObject.control = 'text';
        // controlObject.defaultValue = item?.default?.replaceAll('"', '')
        break;
      case /^boolean$/.test(item.type?.text):
        controlObject.control = 'boolean';
        controlObject.defaultValue = (item.default === 'true')
        break;
      case /^number$/.test(item.type?.text):
        controlObject.control = 'number';
        break;
      case /^array$/.test(item.type?.text):
        controlObject.control = 'object';
        break;
      default:
        controlObject.control = 'object';
    }
    return Object.assign(obj, { [item.name]: controlObject });
  }, {});