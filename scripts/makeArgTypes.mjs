export const makeArgTypes = componentProps =>
  componentProps.reduce((obj, item) => {
    let controlObject = {};
    controlObject.defaultValue = item.default
    console.log(item)
    switch (true) {
      case item.enum?.length > 0: 
        controlObject.control = 'select'
        controlObject.options = item.enum
        break;
      case /string/.test(item.type):
        controlObject.control = 'text';
        break;
      case /boolean/.test(item.type):
        controlObject.control = 'boolean';
        break;
      case /number/.test(item.type):
        controlObject.control = 'number';
        break;
      case /array/.test(item.type):
        controlObject.control = 'object';
        break;
      // case /\|/.test(item.type?.text):
      //   controlObject.control = 'select';
      //   controlObject.options = item.type?.text
      //     .replaceAll('"', '')
      //     .split('|')
      //     .map(opt => opt.trim());
      //   break;
      default:
        controlObject.control = 'object';
    }
    return Object.assign(obj, { [item.name]: controlObject });
  }, {});
