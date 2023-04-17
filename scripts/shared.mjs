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
  const srcComponents = allComponents.filter(component => component.modulePath.startsWith('src/'))
  return srcComponents.filter(component =>  !component.modulePath.includes('src/base'))
}
