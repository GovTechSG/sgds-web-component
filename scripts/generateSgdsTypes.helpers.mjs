/**
 * generateSgdsTypes.helpers.mjs
 *
 * Pure helper functions used by generateSgdsTypes.mjs.
 * Kept in a separate module so they can be unit-tested without triggering
 * the file-system side effects in the main script.
 */

/** Extract component folder name from "src/components/ComboBox/sgds-combo-box.ts" */
export function componentNameFromPath(modulePath) {
  const parts = modulePath.split("/");
  if (parts[0] === "src" && parts[1] === "components") return parts[2];
  return null;
}

/** "SgdsComboBox" → "SgdsComboBoxProps" */
export function toPropsInterface(className) {
  return `${className}Props`;
}

/** React: "sgds-input" → `"onsgds-input"` (kebab-case, for React 19 intrinsic elements) */
export function toReactEventPropKey(eventName) {
  return `"on${eventName}"`;
}

/** React: "sgds-change" → `onSgdsChange` (camelCase, for @lit/react wrapper components) */
export function toCamelCaseEventPropKey(eventName) {
  const camel = eventName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `on${camel.charAt(0).toUpperCase()}${camel.slice(1)}`;
}

/** Returns true when a CEM member should appear as a prop in the generated interface. */
export function shouldIncludeMember(member) {
  if (member.kind !== "field") return false;
  if (member.static) return false;
  const privacy = member.privacy ?? "public";
  if (privacy === "private" || privacy === "protected") return false;
  if (member.name.startsWith("_")) return false;
  if ((member.description ?? "").includes("@internal")) return false;
  if (member.inheritedFrom?.package) return false;
  return true;
}
