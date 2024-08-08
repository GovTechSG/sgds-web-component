export function getAllComponents(metadata) {
  const allComponents = [];

  metadata.modules.map(module => {
    module.declarations?.map(declaration => {
      if (declaration.customElement) {
        const component = declaration;
        const modulePath = module.path;

        if (component) {
          allComponents.push(Object.assign(component, { modulePath }));
        }
      }
    });
  });

  return allComponents;
}

export function getSgdsComponents(allComponents) {
  const srcComponents = allComponents.filter(component => component.modulePath.startsWith('src/components'))
  return srcComponents
}

export function pascalToKebab(str) {
  return str
    .replace(/([A-Z])/g, '-$1') // Insert hyphen before each uppercase letter
    .toLowerCase()              // Convert the entire string to lowercase
    .slice(1);                  // Remove the leading hyphen if any
}
