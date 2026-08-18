import customElements from "../../../custom-elements.json";

export interface ComponentMeta {
  tagName: string;
  name: string; // PascalCase React component name (e.g. SgdsButton)
  importPath: string; // e.g. "button"
  attrToField: Record<string, string>; // HTML attr name → React prop name
  events: Record<string, string>; // DOM event name → React prop name (e.g. "sgds-blur" → "onSgdsBlur")
}

const componentMap = new Map<string, ComponentMeta>();

for (const mod of (customElements as any).modules) {
  for (const decl of mod.declarations || []) {
    if (!decl.tagName || !decl.tagName.startsWith("sgds-") || decl.tagName === "sgds-element") continue;

    const attrToField: Record<string, string> = {};
    for (const attr of decl.attributes || []) {
      if (attr.fieldName) {
        // Map HTML attribute → React prop (fieldName is the camelCase prop)
        attrToField[attr.name] = attr.fieldName;
        // Also map the lowercased version since HTML attributes are case-insensitive
        // and rendered source may show them lowercased (e.g. "arialabel" → "ariaLabel")
        const lower = attr.name.toLowerCase();
        if (lower !== attr.name) {
          attrToField[lower] = attr.fieldName;
        }
      }
    }

    const events: Record<string, string> = {};
    for (const evt of decl.events || []) {
      if (evt.reactName) {
        events[evt.name] = evt.reactName;
      }
    }

    const importPath = decl.tagName.replace("sgds-", "");

    componentMap.set(decl.tagName, {
      tagName: decl.tagName,
      name: decl.name,
      importPath,
      attrToField,
      events
    });
  }
}

export { componentMap };
