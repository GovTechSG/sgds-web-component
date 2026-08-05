import { componentMap, type ComponentMeta } from "./componentMap";

/**
 * Converts an HTML source string (containing sgds-* custom elements)
 * to React JSX with proper imports.
 */
export function htmlToReact(html: string): string {
  const usedComponents = new Set<ComponentMeta>();

  // Transform the HTML to JSX
  let jsx = transformNode(html, usedComponents);

  // Generate import statements
  const imports = Array.from(usedComponents)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => `import ${c.name} from "@govtechsg/sgds-web-component/react/${c.importPath}/index.js";`)
    .join("\n");

  // Clean up whitespace
  jsx = jsx.trim();

  if (imports) {
    return `${imports}\n\n${jsx}`;
  }
  return jsx;
}

function transformNode(html: string, usedComponents: Set<ComponentMeta>): string {
  // Match opening tags (self-closing and normal)
  // This regex handles: <sgds-button attr="val" disabled>...</sgds-button> and <sgds-icon ... />
  const tagPattern = /<(sgds-[\w-]+)((?:\s+[^>]*?)?)(\s*\/?)>/g;

  let result = html;

  // First pass: collect all used components
  let match: RegExpExecArray | null;
  const tagRegex = /<(sgds-[\w-]+)/g;
  while ((match = tagRegex.exec(html)) !== null) {
    const meta = componentMap.get(match[1]);
    if (meta) {
      usedComponents.add(meta);
    }
  }

  // Replace closing tags: </sgds-button> → </SgdsButton>
  result = result.replace(/<\/(sgds-[\w-]+)>/g, (_, tagName) => {
    const meta = componentMap.get(tagName);
    return meta ? `</${meta.name}>` : `</${tagName}>`;
  });

  // Replace opening tags and their attributes
  result = result.replace(tagPattern, (fullMatch, tagName: string, attrs: string, selfClose: string) => {
    const meta = componentMap.get(tagName);
    if (!meta) return fullMatch;

    const reactTag = meta.name;
    const reactAttrs = transformAttributes(attrs, meta);
    const closing = selfClose.trim() ? " /" : "";

    return `<${reactTag}${reactAttrs}${closing}>`;
  });

  // Transform standard HTML attributes for non-sgds elements
  // class → className (only on elements that weren't already transformed to Sgds*)
  result = result.replace(/<([a-z][\w-]*)((?:\s[^>]*?)?)>/g, (fullMatch, tag: string, attrs: string) => {
    if (!attrs.includes(" class=") && !attrs.includes("\tclass=")) return fullMatch;
    const newAttrs = attrs.replace(/\bclass=/g, "className=");
    return `<${tag}${newAttrs}>`;
  });

  return result;
}

function transformAttributes(attrString: string, meta: ComponentMeta): string {
  if (!attrString.trim()) return "";

  let result = attrString;

  // Transform class → className
  result = result.replace(/\bclass=/g, "className=");

  // Transform all attribute names to their React prop equivalents (camelCase fieldName)
  // e.g., hinttext → hintText, arialabel → ariaLabel, formaction → formAction
  for (const [htmlAttr, reactProp] of Object.entries(meta.attrToField)) {
    if (htmlAttr === reactProp) continue; // skip if already same casing
    const attrRegex = new RegExp(`\\b${htmlAttr}(?==|\\s|$|/)`, "g");
    result = result.replace(attrRegex, reactProp);
  }

  // Transform boolean attributes without values to JSX style
  // e.g., ' disabled' → ' disabled'  (same in JSX, just leave as-is)
  // Boolean attrs with explicit values: disabled="" → disabled
  result = result.replace(/\s([\w-]+)=""/g, " $1");

  // Transform event attributes if present (from lit template @event syntax in source.code overrides)
  // @sgds-change=${handler} → onSgdsChange={handler}
  result = result.replace(/@(sgds-[\w-]+)=["']?\$\{([^}]+)\}["']?/g, (_, evtName, handler) => {
    const reactEvt = meta.events[evtName] || toCamelCaseEvent(evtName);
    return `${reactEvt}={${handler}}`;
  });

  // Also handle @sgds-event="handler" syntax
  result = result.replace(/@(sgds-[\w-]+)="([^"]+)"/g, (_, evtName, handler) => {
    const reactEvt = meta.events[evtName] || toCamelCaseEvent(evtName);
    return `${reactEvt}={${handler}}`;
  });

  return result;
}

function toCamelCaseEvent(eventName: string): string {
  const camel = eventName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `on${camel.charAt(0).toUpperCase()}${camel.slice(1)}`;
}
