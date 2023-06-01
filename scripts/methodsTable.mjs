export const methodsTable = metaArr =>
  // const accordionModule = modules[0]
  metaArr.map(component => ({
    tagName: component.tagName,
    methods: component.members.filter(member => member.kind === 'method' && member.privacy === 'public')
  }));

