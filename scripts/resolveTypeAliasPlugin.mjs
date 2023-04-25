

export const resolveTypeAliasInMembers = (member, typesByAliasMap) => {
    const unionTypes = splitUnionTypes(member?.type?.text);
   const resolvedTypes = unionTypes?.flatMap((type) => {
      if (typesByAliasMap.has(type)) return typesByAliasMap.get(type);
      else return type;
    });
    
      return {
        ...member,
        type: { text: resolvedTypes?.join(" | ") },
      };
  };
  
 export const updateMembersOfDeclaration = (declaration, typesByAliasMap) => {
    if (declaration.members) {
      const members = declaration.members?.map((member) => resolveTypeAliasInMembers(member, typesByAliasMap));
      return {
        ...declaration,
        members,
      };
    }
  else return declaration
  };

 export const updateMembersOfDeclarations = (declarations, typesByAliasMap) => {
    return declarations?.map((d) => updateMembersOfDeclaration(d, typesByAliasMap));
  };
  
 export const splitUnionTypes = (unionTypes) => {
   if (unionTypes) return unionTypes.split(" | ") 
   else return unionTypes
  } 
  
  export const resolveTypeAliasPlugin = (typesByAliasMap) => ({
    name: 'ResolveTypeAliasPlugin',
    // Runs for all modules in a project, before continuing to the `analyzePhase`
    collectPhase({ts, node, context}){},
    // Runs for each module
    analyzePhase({ts, node, moduleDoc, context}){
      switch (node.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration: {
          const typeName = node.name.getText();
          const enumValues = node.type?.types?.map(n => '"' + n.literal?.text + '"')
          typesByAliasMap.set(typeName, enumValues)
        }
      }
      // You can use this phase to access a module's AST nodes and mutate the custom-elements-manifest
    },
    // Runs for each module, after analyzing, all information about your module should now be available
    moduleLinkPhase({moduleDoc, context}){
      moduleDoc.declarations = updateMembersOfDeclarations(moduleDoc?.declarations, typesByAliasMap)
    },
    // Runs after modules have been parsed and after post-processing
    packageLinkPhase({customElementsManifest, context}){},
  })