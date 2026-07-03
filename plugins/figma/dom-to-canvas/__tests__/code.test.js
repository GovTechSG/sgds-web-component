import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Mock Figma globals before eval
globalThis.figma = { showUI() {} };
globalThis.__html__ = "";

// Load and eval the config section of code.js (everything before figma.ui.onmessage)
const codeJs = readFileSync(resolve(__dirname, "../code.js"), "utf-8");
const configEnd = codeJs.indexOf("figma.ui.onmessage");
const configSection = codeJs.substring(0, configEnd);

// Eval into global scope (var in eval creates globals in non-strict mode)
const evalFn = new Function(
  configSection +
    `
  return { SGDS_COMPONENT_MAP, ATTR_TO_VARIANT_PROP, ATTR_VALUE_MAP, COMPONENT_SLOT_CONFIG, SGDS_SPACING_MAP, resolveComponentMapping };
`
);
const {
  SGDS_COMPONENT_MAP,
  ATTR_TO_VARIANT_PROP,
  ATTR_VALUE_MAP,
  COMPONENT_SLOT_CONFIG,
  SGDS_SPACING_MAP,
  resolveComponentMapping
} = evalFn();

// Extract classifySlots function from code.js
const classifySlotsMatch = codeJs.match(/function classifySlots\(data\) \{[\s\S]*?\n\}/);
let classifySlots;
eval(`classifySlots = ${classifySlotsMatch[0]}`);

// Helper: simulate variant matching logic from createSgdsComponent
function buildVariantCriteria(data) {
  const attrs = data.attrs || {};
  const slotConfig = COMPONENT_SLOT_CONFIG[data.tag];
  const criteria = {};

  for (const attrName in attrs) {
    if (slotConfig && slotConfig.attrOverrides && slotConfig.attrOverrides[attrName]) {
      const override = slotConfig.attrOverrides[attrName];
      const mappedValue = override.values[attrs[attrName]];
      if (mappedValue) criteria[override.prop] = mappedValue;
      continue;
    }
    const propName = ATTR_TO_VARIANT_PROP[attrName];
    if (propName) {
      const value = attrs[attrName];
      if (value === true || value === "") {
        // Only map to "True" for genuinely boolean Figma props
        const BOOLEAN_FIGMA_PROPS = ["Outlined", "Dismissible"];
        if (BOOLEAN_FIGMA_PROPS.indexOf(propName) >= 0) {
          criteria[propName] = "True";
        }
      } else if (value === false || value === "false") {
        criteria[propName] = "False";
      } else {
        const mapped =
          (slotConfig && slotConfig.valueOverrides && slotConfig.valueOverrides[value]) ||
          ATTR_VALUE_MAP[value] ||
          value;
        criteria[propName] = mapped;
      }
    }
  }

  if (slotConfig && slotConfig.childCountVariant && data.children) {
    const ccv = slotConfig.childCountVariant;
    const count = data.children.filter(c => c.tag === ccv.childTag).length;
    if (count > 0) criteria[ccv.prop] = String(count);

    if (slotConfig.overflowVariant) {
      const ov = slotConfig.overflowVariant;
      // Detect overflow from presence of overflow-menu child containing sgds-overflow-menu
      var hasOverflow = false;
      for (var oi = 0; oi < data.children.length; oi++) {
        var oc = data.children[oi];
        if (oc.children) {
          for (var oci = 0; oci < oc.children.length; oci++) {
            if (oc.children[oci].tag === "sgds-overflow-menu") {
              hasOverflow = true;
              break;
            }
          }
        }
        if (hasOverflow) break;
      }
      criteria[ov.prop] = hasOverflow ? "True" : "False";
    }
  }

  const BOOLEAN_VARIANT_PROPS = ["Outlined", "Dismissible"];
  for (const bvp of BOOLEAN_VARIANT_PROPS) {
    if (!criteria[bvp]) criteria[bvp] = "False";
  }

  // Fixed criteria: always merge these variant values
  if (slotConfig && slotConfig.fixedCriteria) {
    for (const fk in slotConfig.fixedCriteria) {
      criteria[fk] = slotConfig.fixedCriteria[fk];
    }
  }

  return criteria;
}

// Helper: simulate text property resolution
function resolveTextProp(data, textSlot, textConfig) {
  const slotChildren = classifySlots(data);
  const textChild = slotChildren[textSlot];
  let textValue = "";
  const underlineRanges = [];

  if (textConfig.source && textConfig.source.indexOf("attr:") === 0) {
    const attrKey = textConfig.source.substring(5);
    const attrVal = data.attrs && data.attrs[attrKey];
    textValue = typeof attrVal === "string" && attrVal ? attrVal : "";
  } else if (textSlot === "default") {
    const defaultChildren = Array.isArray(textChild) ? textChild : textChild ? [textChild] : [];
    const finalChildren = defaultChildren.length > 0 ? defaultChildren : (data.children || []).filter(c => !c.slot);
    if (finalChildren.length > 0) {
      const segments = [];
      let cursor = 0;
      for (const child of finalChildren) {
        const t = child.text || "";
        if (t) {
          if (segments.length > 0) cursor += 1;
          if (child.tag === "a") {
            underlineRanges.push({ start: cursor, end: cursor + t.length });
          }
          segments.push(t);
          cursor += t.length;
        }
      }
      if (segments.length > 0) textValue = segments.join(" ");
    } else {
      textValue = data.text || "";
    }
  } else if (textChild) {
    const child = Array.isArray(textChild) ? textChild[0] : textChild;
    textValue = child.text || "";
    if (child.tag === "a" && textValue) {
      underlineRanges.push({ start: 0, end: textValue.length });
    }
  }

  return { textValue, underlineRanges };
}

// =============================================================================
// TESTS
// =============================================================================

describe("ATTR_TO_VARIANT_PROP", () => {
  it("contains all expected DOM attribute keys", () => {
    const expected = [
      "variant",
      "size",
      "tone",
      "density",
      "orientation",
      "thickness",
      "outlined",
      "dismissible",
      "state"
    ];
    for (const key of expected) {
      assert.ok(ATTR_TO_VARIANT_PROP[key], `Missing key: ${key}`);
    }
  });

  it("maps to correctly cased Figma property names", () => {
    assert.equal(ATTR_TO_VARIANT_PROP.variant, "Variant");
    assert.equal(ATTR_TO_VARIANT_PROP.size, "Size");
    assert.equal(ATTR_TO_VARIANT_PROP.tone, "Tone");
    assert.equal(ATTR_TO_VARIANT_PROP.density, "Density");
    assert.equal(ATTR_TO_VARIANT_PROP.orientation, "Orientation");
    assert.equal(ATTR_TO_VARIANT_PROP.thickness, "Thickness");
  });
});

describe("ATTR_VALUE_MAP", () => {
  it("maps tone values", () => {
    assert.equal(ATTR_VALUE_MAP["fixed-light"], "fixed light (white)");
    assert.equal(ATTR_VALUE_MAP["fixed-dark"], "fixed dark");
  });

  it("maps variant values", () => {
    assert.equal(ATTR_VALUE_MAP["outline"], "outline (secondary)");
    assert.equal(ATTR_VALUE_MAP["ghost"], "ghost (tertiary)");
  });

  it("maps size/thickness defaults", () => {
    assert.equal(ATTR_VALUE_MAP["md"], "md (default)");
    assert.equal(ATTR_VALUE_MAP["thin"], "thin (default)");
  });

  it("maps boolean strings", () => {
    assert.equal(ATTR_VALUE_MAP["true"], "True");
    assert.equal(ATTR_VALUE_MAP["false"], "False");
  });
});

describe("Variant matching (buildVariantCriteria)", () => {
  it("alert: variant + outlined boolean", () => {
    const r = buildVariantCriteria({ tag: "sgds-alert", attrs: { variant: "info", outlined: true }, children: [] });
    assert.equal(r.Variant, "info");
    assert.equal(r.Outlined, "True");
    assert.equal(r.Dismissible, "False");
  });

  it("button: ghost + fixed-light + sm", () => {
    const r = buildVariantCriteria({
      tag: "sgds-button",
      attrs: { variant: "ghost", tone: "fixed-light", size: "sm" },
      children: []
    });
    assert.equal(r.Variant, "ghost (tertiary)");
    assert.equal(r.Tone, "fixed light (white)");
    assert.equal(r.Size, "sm");
  });

  it("button: active attr → State = hover/active", () => {
    const r = buildVariantCriteria({
      tag: "sgds-button",
      attrs: { variant: "primary", active: true },
      children: []
    });
    assert.equal(r.State, "hover/active");
    assert.equal(r.Variant, "primary");
  });

  it("button: disabled attr → State = disabled", () => {
    const r = buildVariantCriteria({
      tag: "sgds-button",
      attrs: { variant: "primary", disabled: true },
      children: []
    });
    assert.equal(r.State, "disabled");
  });

  it("button: loading attr → State = loading", () => {
    const r = buildVariantCriteria({
      tag: "sgds-button",
      attrs: { variant: "primary", loading: true },
      children: []
    });
    assert.equal(r.State, "loading");
  });

  it("close-button: attrOverrides tone → Variant (fixed-light → fixed light)", () => {
    const r = buildVariantCriteria({ tag: "sgds-close-button", attrs: { tone: "fixed-light" }, children: [] });
    assert.equal(r.Variant, "fixed light");
  });

  it("link: valueOverrides (fixed-dark → fixed dark (black))", () => {
    const r = buildVariantCriteria({ tag: "sgds-link", attrs: { tone: "fixed-dark" }, children: [] });
    assert.equal(r.Tone, "fixed dark (black)");
  });

  it("accordion: attrOverrides (variant=border → Border=True)", () => {
    const r = buildVariantCriteria({
      tag: "sgds-accordion",
      attrs: { variant: "border", density: "compact" },
      children: []
    });
    assert.equal(r.Border, "True");
    assert.equal(r.Density, "compact");
    assert.equal(r.Variant, undefined);
  });

  it("card: attrOverrides (hideBorder + disabled)", () => {
    const r = buildVariantCriteria({ tag: "sgds-card", attrs: { hideBorder: "true", disabled: "true" }, children: [] });
    assert.equal(r.Border, "False");
    assert.equal(r.State, "disabled");
  });

  it("divider: thickness + orientation", () => {
    const r = buildVariantCriteria({
      tag: "sgds-divider",
      attrs: { thickness: "thin", orientation: "vertical" },
      children: []
    });
    assert.equal(r.Thickness, "thin (default)");
    assert.equal(r.Orientation, "vertical");
  });

  it("enum props with boolean true (attr present without value) → skipped, not mapped to True", () => {
    const r = buildVariantCriteria({
      tag: "sgds-accordion",
      attrs: { variant: true, density: true },
      children: [{ tag: "sgds-accordion-item" }, { tag: "sgds-accordion-item" }, { tag: "sgds-accordion-item" }]
    });
    // density=true should NOT produce Density:"True" — it should be skipped
    assert.equal(r.Density, undefined);
    // variant=true goes through attrOverrides but finds no match → should not produce any variant criteria
    assert.equal(r.Variant, undefined);
    assert.equal(r.Border, undefined);
    // childCountVariant should still work
    assert.equal(r["No. of item"], "3");
  });

  it("boolean defaults: absent dismissible/outlined → False", () => {
    const r = buildVariantCriteria({ tag: "sgds-alert", attrs: { variant: "info" }, children: [] });
    assert.equal(r.Dismissible, "False");
    assert.equal(r.Outlined, "False");
  });
});

describe("childCountVariant", () => {
  it("accordion: 3 items → No. of item = 3", () => {
    const r = buildVariantCriteria({
      tag: "sgds-accordion",
      attrs: { variant: "default" },
      children: [{ tag: "sgds-accordion-item" }, { tag: "sgds-accordion-item" }, { tag: "sgds-accordion-item" }]
    });
    assert.equal(r["No. of item"], "3");
  });

  it("breadcrumb: 4 items → No. of link = 4", () => {
    const r = buildVariantCriteria({
      tag: "sgds-breadcrumb",
      attrs: {},
      children: [
        { tag: "sgds-breadcrumb-item" },
        { tag: "sgds-breadcrumb-item" },
        { tag: "sgds-breadcrumb-item" },
        { tag: "sgds-breadcrumb-item" }
      ]
    });
    assert.equal(r["No. of link"], "4");
  });

  it("stepper: 5 items → No. of step = 5", () => {
    const r = buildVariantCriteria({
      tag: "sgds-stepper",
      attrs: {},
      children: Array(5).fill({ tag: "sgds-stepper-item" })
    });
    assert.equal(r["No. of step"], "5");
  });

  it("component without childCountVariant adds no extra criteria", () => {
    const r = buildVariantCriteria({
      tag: "sgds-button",
      attrs: { variant: "primary" },
      children: [{ tag: "sgds-icon" }]
    });
    assert.equal(r["No. of item"], undefined);
    assert.equal(r["No. of link"], undefined);
  });
});

describe("Text property resolution", () => {
  it("source attr:title with string → returns the string", () => {
    const { textValue } = resolveTextProp({ tag: "sgds-alert", attrs: { title: "My Title" }, children: [] }, "title", {
      key: "t",
      source: "attr:title"
    });
    assert.equal(textValue, "My Title");
  });

  it("source attr:title with boolean true → returns empty", () => {
    const { textValue } = resolveTextProp({ tag: "sgds-alert", attrs: { title: true }, children: [] }, "title", {
      key: "t",
      source: "attr:title"
    });
    assert.equal(textValue, "");
  });

  it("default slot with single text child → no underline", () => {
    const { textValue, underlineRanges } = resolveTextProp(
      { tag: "sgds-alert", attrs: {}, children: [{ tag: "#text", text: "Hello world" }] },
      "default",
      { key: "t" }
    );
    assert.equal(textValue, "Hello world");
    assert.equal(underlineRanges.length, 0);
  });

  it("default slot with <a> child → underline range", () => {
    const { textValue, underlineRanges } = resolveTextProp(
      { tag: "sgds-alert", attrs: {}, children: [{ tag: "a", text: "click me" }] },
      "default",
      { key: "t" }
    );
    assert.equal(textValue, "click me");
    assert.deepEqual(underlineRanges, [{ start: 0, end: 8 }]);
  });

  it("default slot mixed content [#text, a, #text] → correct underline offset", () => {
    const { textValue, underlineRanges } = resolveTextProp(
      {
        tag: "sgds-alert",
        attrs: {},
        children: [
          { tag: "#text", text: "Alert with no leading" },
          { tag: "a", text: "icon" },
          { tag: "#text", text: "and extra text" }
        ]
      },
      "default",
      { key: "t" }
    );
    assert.equal(textValue, "Alert with no leading icon and extra text");
    assert.deepEqual(underlineRanges, [{ start: 22, end: 26 }]);
  });

  it("named slot (header) → returns text from that slot child", () => {
    const { textValue } = resolveTextProp(
      {
        tag: "sgds-accordion-item",
        attrs: {},
        children: [
          { tag: "div", slot: "header", text: "Accordion title" },
          { tag: "div", slot: "content", text: "Body" }
        ]
      },
      "header",
      { key: "t" }
    );
    assert.equal(textValue, "Accordion title");
  });
});

describe("Slot boolean toggling logic", () => {
  it("icon slot present → classifySlots has icon entry", () => {
    const r = classifySlots({ children: [{ tag: "sgds-icon", slot: "icon" }] });
    assert.ok(r.icon);
  });

  it("icon slot absent → no icon entry, has default", () => {
    const r = classifySlots({ children: [{ tag: "a", text: "link" }] });
    assert.equal(r.icon, undefined);
    assert.ok(r.default);
  });

  it("title attr string → text resolves non-empty (boolean enabled)", () => {
    const { textValue } = resolveTextProp({ tag: "sgds-alert", attrs: { title: "Title" }, children: [] }, "title", {
      key: "t",
      source: "attr:title"
    });
    assert.ok(textValue);
  });

  it("title attr boolean → text resolves empty (boolean disabled)", () => {
    const { textValue } = resolveTextProp({ tag: "sgds-alert", attrs: { title: true }, children: [] }, "title", {
      key: "t",
      source: "attr:title"
    });
    assert.equal(textValue, "");
  });
});

describe("Breadcrumb itemProps configuration", () => {
  it("breadcrumb itemProps has label with correct text key", () => {
    const cfg = COMPONENT_SLOT_CONFIG["sgds-breadcrumb"];
    assert.ok(cfg.itemProps.label, "breadcrumb should have label itemProp");
    assert.equal(cfg.itemProps.label.key, "Edit link#16129:0");
  });

  it("breadcrumb itemProps has state mapping for active items", () => {
    const cfg = COMPONENT_SLOT_CONFIG["sgds-breadcrumb"];
    assert.ok(cfg.itemProps.state, "breadcrumb should have state itemProp");
    assert.equal(cfg.itemProps.state.prop, "State");
    assert.equal(cfg.itemProps.state.activeValue, "active");
    assert.equal(cfg.itemProps.state.defaultValue, "default");
  });

  it("breadcrumb with 3 items → No. of link = 3, Overflow = False", () => {
    const r = buildVariantCriteria({
      tag: "sgds-breadcrumb",
      attrs: {},
      children: [
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "Home" }] },
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "About" }] },
        { tag: "sgds-breadcrumb-item", attrs: { active: true }, children: [{ tag: "a", text: "Contacts" }] }
      ]
    });
    assert.equal(r["No. of link"], "3");
    assert.equal(r["Overflow"], "False");
  });

  it("breadcrumb with overflow-menu item → Overflow = True, No. of link = 4", () => {
    // Shadow DOM rendered structure: Home, overflow-menu, Link-3, Link-4
    const r = buildVariantCriteria({
      tag: "sgds-breadcrumb",
      attrs: {},
      children: [
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "Home" }] },
        { tag: "sgds-breadcrumb-item", attrs: { class: "overflow-menu" }, children: [{ tag: "sgds-overflow-menu" }] },
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "Link-3" }] },
        {
          tag: "sgds-breadcrumb-item",
          attrs: { active: true, "aria-current": "page" },
          children: [{ tag: "a", text: "Link-4" }]
        }
      ]
    });
    assert.equal(r["No. of link"], "4");
    assert.equal(r["Overflow"], "True");
  });

  it("breadcrumb without overflow-menu item → Overflow = False", () => {
    const r = buildVariantCriteria({
      tag: "sgds-breadcrumb",
      attrs: {},
      children: [
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "Home" }] },
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "About" }] },
        { tag: "sgds-breadcrumb-item", children: [{ tag: "a", text: "Link-3" }] },
        { tag: "sgds-breadcrumb-item", attrs: { active: true }, children: [{ tag: "a", text: "Link-4" }] }
      ]
    });
    assert.equal(r["No. of link"], "4");
    assert.equal(r["Overflow"], "False");
  });

  it("breadcrumb item text resolves from nested <a> child", () => {
    const itemData = {
      tag: "sgds-breadcrumb-item",
      attrs: {},
      children: [{ tag: "a", text: "Home" }]
    };
    const itemSlots = classifySlots(itemData);
    const defaultChildren = itemSlots["default"]
      ? Array.isArray(itemSlots["default"])
        ? itemSlots["default"]
        : [itemSlots["default"]]
      : itemData.children || [];
    const textChild = defaultChildren[0];
    assert.equal(textChild.text, "Home");
  });

  it("breadcrumb last item with active attr should be identified as active", () => {
    const items = [
      { tag: "sgds-breadcrumb-item", attrs: {}, children: [{ tag: "a", text: "Home" }] },
      { tag: "sgds-breadcrumb-item", attrs: {}, children: [{ tag: "a", text: "About" }] },
      {
        tag: "sgds-breadcrumb-item",
        attrs: { active: true, "aria-current": "page" },
        children: [{ tag: "a", text: "Contacts" }]
      }
    ];
    const cfg = COMPONENT_SLOT_CONFIG["sgds-breadcrumb"];
    // The last item should have active=true in attrs, which the state itemProp maps to State="active"
    const lastItem = items[2];
    const isActive = lastItem.attrs.active === true || lastItem.attrs.active === "" || lastItem.attrs.active === "true";
    assert.ok(isActive, "last item should be detected as active");
    assert.equal(cfg.itemProps.state.activeValue, "active");
  });
});

describe("COMPONENT_SLOT_CONFIG completeness", () => {
  it("has 43 configured components", () => {
    assert.equal(Object.keys(COMPONENT_SLOT_CONFIG).length, 43);
  });

  it("childCountVariant entries have valid prop and childTag", () => {
    for (const [tag, cfg] of Object.entries(COMPONENT_SLOT_CONFIG)) {
      if (cfg.childCountVariant) {
        assert.ok(typeof cfg.childCountVariant.prop === "string", `${tag}: prop should be string`);
        assert.ok(cfg.childCountVariant.childTag.includes("-"), `${tag}: childTag should contain -`);
      }
    }
  });

  it("attrOverrides entries have valid prop and values", () => {
    for (const [tag, cfg] of Object.entries(COMPONENT_SLOT_CONFIG)) {
      if (cfg.attrOverrides) {
        for (const [attr, override] of Object.entries(cfg.attrOverrides)) {
          assert.ok(typeof override.prop === "string", `${tag}.${attr}: prop should be string`);
          assert.ok(typeof override.values === "object", `${tag}.${attr}: values should be object`);
        }
      }
    }
  });

  it("valueOverrides entries are non-empty", () => {
    for (const [tag, cfg] of Object.entries(COMPONENT_SLOT_CONFIG)) {
      if (cfg.valueOverrides) {
        assert.ok(Object.keys(cfg.valueOverrides).length > 0, `${tag}: valueOverrides is empty`);
      }
    }
  });

  it("accordion has icon, badge, content, disabled, open in itemProps", () => {
    const acc = COMPONENT_SLOT_CONFIG["sgds-accordion"];
    assert.ok(acc.itemProps.icon);
    assert.ok(acc.itemProps.badge);
    assert.ok(acc.itemProps.content);
    assert.ok(acc.itemProps.disabled);
    assert.ok(acc.itemProps.open);
  });

  it("accordion icon itemProp has booleanKey and swapKey", () => {
    const icon = COMPONENT_SLOT_CONFIG["sgds-accordion"].itemProps.icon;
    assert.ok(icon.booleanKey);
    assert.ok(icon.swapKey);
  });
});

describe("classifySlots", () => {
  it("groups children by slot attribute", () => {
    const r = classifySlots({
      children: [
        { tag: "sgds-icon", slot: "icon" },
        { tag: "div", slot: "header", text: "Title" },
        { tag: "div", slot: "content", text: "Body" }
      ]
    });
    assert.ok(r.icon);
    assert.ok(r.header);
    assert.ok(r.content);
    assert.equal(r.icon.tag, "sgds-icon");
  });

  it("children without slot → grouped under default", () => {
    const r = classifySlots({
      children: [
        { tag: "a", text: "link" },
        { tag: "#text", text: "plain" }
      ]
    });
    assert.ok(r.default);
    assert.equal(r.icon, undefined);
  });

  it("multiple children in same slot → stored as array", () => {
    const r = classifySlots({
      children: [
        { tag: "div", slot: "action", text: "Action 1" },
        { tag: "div", slot: "action", text: "Action 2" }
      ]
    });
    assert.ok(Array.isArray(r.action));
    assert.equal(r.action.length, 2);
  });

  it("returns empty object for no children", () => {
    const r = classifySlots({ children: null });
    assert.deepEqual(r, {});
  });
});

// =========================================================================
// 9. SGDS_SPACING_MAP completeness
// =========================================================================
describe("SGDS_SPACING_MAP", () => {
  it("has at least 60 entries", () => {
    assert.ok(Object.keys(SGDS_SPACING_MAP).length >= 60);
  });

  it("contains semantic gap tokens (none, xs, sm, md, lg, xl)", () => {
    assert.ok(SGDS_SPACING_MAP["none"]);
    assert.ok(SGDS_SPACING_MAP["xs"]);
    assert.ok(SGDS_SPACING_MAP["sm"]);
    assert.ok(SGDS_SPACING_MAP["md"]);
    assert.ok(SGDS_SPACING_MAP["lg"]);
    assert.ok(SGDS_SPACING_MAP["xl"]);
  });

  it("contains layout padding tokens", () => {
    assert.ok(SGDS_SPACING_MAP["layout-xs"]);
    assert.ok(SGDS_SPACING_MAP["layout-sm"]);
    assert.ok(SGDS_SPACING_MAP["layout-md"]);
    assert.ok(SGDS_SPACING_MAP["layout-lg"]);
    assert.ok(SGDS_SPACING_MAP["layout-xl"]);
  });

  it("contains layout gap tokens", () => {
    assert.ok(SGDS_SPACING_MAP["layout-gap-xs"]);
    assert.ok(SGDS_SPACING_MAP["layout-gap-sm"]);
    assert.ok(SGDS_SPACING_MAP["layout-gap-md"]);
    assert.ok(SGDS_SPACING_MAP["layout-gap-lg"]);
    assert.ok(SGDS_SPACING_MAP["layout-gap-xl"]);
  });

  it("contains component gap tokens", () => {
    assert.ok(SGDS_SPACING_MAP["component-gap-xs"]);
    assert.ok(SGDS_SPACING_MAP["component-gap-sm"]);
    assert.ok(SGDS_SPACING_MAP["component-gap-md"]);
    assert.ok(SGDS_SPACING_MAP["component-gap-lg"]);
    assert.ok(SGDS_SPACING_MAP["component-gap-xl"]);
  });

  it("contains component padding tokens", () => {
    assert.ok(SGDS_SPACING_MAP["component-xs"]);
    assert.ok(SGDS_SPACING_MAP["component-md"]);
    assert.ok(SGDS_SPACING_MAP["component-xl"]);
  });

  it("contains text gap tokens", () => {
    assert.ok(SGDS_SPACING_MAP["text-gap-xs"]);
    assert.ok(SGDS_SPACING_MAP["text-gap-sm"]);
    assert.ok(SGDS_SPACING_MAP["text-gap-md"]);
    assert.ok(SGDS_SPACING_MAP["text-gap-lg"]);
  });

  it("contains semantic padding tokens", () => {
    assert.ok(SGDS_SPACING_MAP["padding-xs"]);
    assert.ok(SGDS_SPACING_MAP["padding-sm"]);
    assert.ok(SGDS_SPACING_MAP["padding-md"]);
    assert.ok(SGDS_SPACING_MAP["padding-lg"]);
    assert.ok(SGDS_SPACING_MAP["padding-xl"]);
  });

  it("contains spacer primitives", () => {
    assert.ok(SGDS_SPACING_MAP["spacer-0"]);
    assert.ok(SGDS_SPACING_MAP["spacer-4"]);
    assert.ok(SGDS_SPACING_MAP["spacer-8"]);
    assert.ok(SGDS_SPACING_MAP["spacer-12"]);
  });

  it("all values are non-empty hex strings (variable keys)", () => {
    for (const [token, key] of Object.entries(SGDS_SPACING_MAP)) {
      assert.ok(typeof key === "string" && key.length > 20, `${token}: key should be a long hex string`);
    }
  });
});

// =========================================================================
// 10. Spacing resolution (resolveSpacingKey)
// =========================================================================
describe("Spacing resolution (resolveSpacingKey)", () => {
  // Replicate resolveSpacingKey logic with SGDS_SPACING_MAP in closure
  const resolveSpacingKey = new Function(
    "SGDS_SPACING_MAP",
    `return function resolveSpacingKey(token, context) {
      if (context === "gap") {
        var parts = token.match(/^(.+)-([a-z0-9-]+)$/);
        if (parts) {
          var gapKey = parts[1] + "-gap-" + parts[2];
          if (SGDS_SPACING_MAP[gapKey]) return SGDS_SPACING_MAP[gapKey];
        }
      }
      if (context === "padding" && SGDS_SPACING_MAP["padding-" + token]) {
        return SGDS_SPACING_MAP["padding-" + token];
      }
      if (SGDS_SPACING_MAP[token]) return SGDS_SPACING_MAP[token];
      if (SGDS_SPACING_MAP["layout-" + token]) return SGDS_SPACING_MAP["layout-" + token];
      return null;
    }`
  )(SGDS_SPACING_MAP);

  it("direct match: sm → key", () => {
    assert.ok(resolveSpacingKey("sm", "gap"));
    assert.equal(resolveSpacingKey("sm", "gap"), SGDS_SPACING_MAP["sm"]);
  });

  it("layout padding: layout-md → key", () => {
    assert.ok(resolveSpacingKey("layout-md", "padding"));
    assert.equal(resolveSpacingKey("layout-md", "padding"), SGDS_SPACING_MAP["layout-md"]);
  });

  it("layout gap context: layout-sm → layout-gap-sm key", () => {
    // sgds:gap-layout-sm → gapMatch[1] = "layout-sm" → context "gap" → tries "layout-gap-sm"
    assert.ok(resolveSpacingKey("layout-sm", "gap"));
    assert.equal(resolveSpacingKey("layout-sm", "gap"), SGDS_SPACING_MAP["layout-gap-sm"]);
  });

  it("component gap context: component-md → component-gap-md key", () => {
    assert.ok(resolveSpacingKey("component-md", "gap"));
    assert.equal(resolveSpacingKey("component-md", "gap"), SGDS_SPACING_MAP["component-gap-md"]);
  });

  it("text gap context: text-xs → text-gap-xs key", () => {
    assert.ok(resolveSpacingKey("text-xs", "gap"));
    assert.equal(resolveSpacingKey("text-xs", "gap"), SGDS_SPACING_MAP["text-gap-xs"]);
  });

  it("padding context: sm → padding-sm key", () => {
    assert.ok(resolveSpacingKey("sm", "padding"));
    assert.equal(resolveSpacingKey("sm", "padding"), SGDS_SPACING_MAP["padding-sm"]);
  });

  it("component padding: component-md → key (direct match)", () => {
    assert.ok(resolveSpacingKey("component-md", "padding"));
    assert.equal(resolveSpacingKey("component-md", "padding"), SGDS_SPACING_MAP["component-md"]);
  });

  it("unknown token → null", () => {
    assert.equal(resolveSpacingKey("nonexistent-token", "gap"), null);
  });
});

describe("Component resolution with fullWidth", () => {
  it("sgds-button with fullWidth attr resolves to sgds-button-fullwidth key", () => {
    const mapping = SGDS_COMPONENT_MAP["sgds-button"];
    const fullwidthMapping = SGDS_COMPONENT_MAP["sgds-button-fullwidth"];
    assert.ok(fullwidthMapping, "sgds-button-fullwidth should exist in SGDS_COMPONENT_MAP");
    assert.notEqual(mapping.key, fullwidthMapping.key, "fullwidth button should have different key");
    assert.equal(fullwidthMapping.name, "Full width button");
  });

  it("resolveComponentMapping returns regular button mapping even with fullWidth (swap handles it)", () => {
    const result = resolveComponentMapping({ tag: "sgds-button", attrs: { fullWidth: true } });
    assert.equal(result.key, SGDS_COMPONENT_MAP["sgds-button"].key);
  });

  it("resolveComponentMapping returns image-card mapping when sgds-card has slot=image child", () => {
    const result = resolveComponentMapping({
      tag: "sgds-card",
      attrs: {},
      children: [
        { tag: "img", slot: "image" },
        { tag: "div", slot: "default" }
      ]
    });
    assert.equal(result.key, SGDS_COMPONENT_MAP["sgds-image-card"].key);
  });

  it("resolveComponentMapping returns icon-card mapping when sgds-card has slot=icon child", () => {
    const result = resolveComponentMapping({
      tag: "sgds-card",
      attrs: {},
      children: [
        { tag: "sgds-icon", slot: "icon" },
        { tag: "div", slot: "default" }
      ]
    });
    assert.equal(result.key, SGDS_COMPONENT_MAP["sgds-icon-card"].key);
    assert.deepEqual(result.nestedProps, { Variant: "icon" });
  });

  it("resolveComponentMapping returns regular card mapping without slot=image/icon child", () => {
    const result = resolveComponentMapping({
      tag: "sgds-card",
      attrs: {},
      children: [{ tag: "div", slot: "default" }]
    });
    assert.equal(result.key, SGDS_COMPONENT_MAP["sgds-card"].key);
  });

  it("resolveComponentMapping returns normal mapping for non-button components", () => {
    const result = resolveComponentMapping({ tag: "sgds-alert", attrs: { variant: "info" } });
    assert.equal(result.key, SGDS_COMPONENT_MAP["sgds-alert"].key);
  });
});

// =============================================================================
// CHECKBOX / RADIO GROUP MAPPING
// =============================================================================

describe("sgds-checkbox → Checkbox group mapping", () => {
  it("standalone sgds-checkbox uses checkbox-group component key", () => {
    assert.equal(SGDS_COMPONENT_MAP["sgds-checkbox"].key, SGDS_COMPONENT_MAP["sgds-checkbox-group"].key);
  });

  it("standalone sgds-radio uses radio-group component key", () => {
    assert.equal(SGDS_COMPONENT_MAP["sgds-radio"].key, SGDS_COMPONENT_MAP["sgds-radio-group"].key);
  });

  it("standalone checkbox has fixedCriteria No. of option = 1", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox"];
    assert.deepEqual(config.fixedCriteria, { "No. of option": "1" });
  });

  it("standalone checkbox has forcedBooleans to hide label and hint", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox"];
    assert.equal(config.forcedBooleans["Label#15640:9"], false);
    assert.equal(config.forcedBooleans["Hint text#15640:8"], false);
  });

  it("standalone checkbox: invalid=true → Invalid: True via attrOverrides", () => {
    const r = buildVariantCriteria({ tag: "sgds-checkbox", attrs: { invalid: true } });
    assert.equal(r["Invalid"], "True");
    assert.equal(r["No. of option"], "1");
  });

  it("standalone checkbox: no invalid → no Invalid in criteria (defaults to False)", () => {
    const r = buildVariantCriteria({ tag: "sgds-checkbox", attrs: {} });
    assert.equal(r["Invalid"], undefined);
    assert.equal(r["No. of option"], "1");
  });

  it("standalone radio has fixedCriteria No. of option = 1", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-radio"];
    assert.deepEqual(config.fixedCriteria, { "No. of option": "1" });
  });
});

describe("sgds-checkbox-group variant criteria", () => {
  it("3 checkbox children → No. of option = 3", () => {
    const r = buildVariantCriteria({
      tag: "sgds-checkbox-group",
      attrs: { label: "Group Label" },
      children: [
        { tag: "sgds-checkbox", text: "A" },
        { tag: "sgds-checkbox", text: "B" },
        { tag: "sgds-checkbox", text: "C" }
      ]
    });
    assert.equal(r["No. of option"], "3");
  });

  it("invalid=true → Invalid: True", () => {
    const r = buildVariantCriteria({
      tag: "sgds-checkbox-group",
      attrs: { invalid: true, label: "Group" },
      children: [{ tag: "sgds-checkbox" }]
    });
    assert.equal(r["Invalid"], "True");
  });

  it("no invalid attr → no Invalid in criteria", () => {
    const r = buildVariantCriteria({
      tag: "sgds-checkbox-group",
      attrs: { label: "Group" },
      children: [{ tag: "sgds-checkbox" }]
    });
    assert.equal(r["Invalid"], undefined);
  });
});

describe("sgds-radio-group variant criteria", () => {
  it("2 radio children → No. of option = 2", () => {
    const r = buildVariantCriteria({
      tag: "sgds-radio-group",
      attrs: { label: "Group" },
      children: [{ tag: "sgds-radio" }, { tag: "sgds-radio" }]
    });
    assert.equal(r["No. of option"], "2");
  });

  it("invalid=true → Invalid: True", () => {
    const r = buildVariantCriteria({
      tag: "sgds-radio-group",
      attrs: { invalid: true },
      children: [{ tag: "sgds-radio" }]
    });
    assert.equal(r["Invalid"], "True");
  });
});

describe("sgds-checkbox-group text property resolution", () => {
  it("label from attr:label", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    const { textValue } = resolveTextProp(
      { tag: "sgds-checkbox-group", attrs: { label: "My Label" }, children: [] },
      "label",
      config.textProps.label
    );
    assert.equal(textValue, "My Label");
  });

  it("hinttext from attr:hinttext (string)", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    const { textValue } = resolveTextProp(
      { tag: "sgds-checkbox-group", attrs: { hinttext: "Check one" }, children: [] },
      "hint",
      config.textProps.hint
    );
    assert.equal(textValue, "Check one");
  });

  it("hinttext boolean true → empty (no text)", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    const { textValue } = resolveTextProp(
      { tag: "sgds-checkbox-group", attrs: { hinttext: true }, children: [] },
      "hint",
      config.textProps.hint
    );
    assert.equal(textValue, "");
  });

  it("invalidfeedback from attr:invalidfeedback", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    const { textValue } = resolveTextProp(
      { tag: "sgds-checkbox-group", attrs: { invalidfeedback: "Please check one" }, children: [] },
      "feedback",
      config.textProps.feedback
    );
    assert.equal(textValue, "Please check one");
  });
});

describe("sgds-checkbox-group itemProps config", () => {
  it("has itemPattern ↳ Option", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    assert.equal(config.itemPattern, "↳ Option");
  });

  it("has label itemProp with correct key", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    assert.equal(config.itemProps.label.key, "↳ Edit text#15167:0");
  });

  it("has selection itemProp with checked/indeterminate/unselected", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    assert.equal(config.itemProps.selection.prop, "Selection");
    assert.equal(config.itemProps.selection.checkedValue, "selected");
    assert.equal(config.itemProps.selection.indeterminateValue, "indeterminate");
    assert.equal(config.itemProps.selection.uncheckedValue, "unselected");
  });

  it("has state itemProp with disabled/invalid/default", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-checkbox-group"];
    assert.equal(config.itemProps.state.prop, "State");
    assert.equal(config.itemProps.state.disabledValue, "disabled");
    assert.equal(config.itemProps.state.invalidValue, "invalid");
    assert.equal(config.itemProps.state.defaultValue, "default");
  });
});

describe("sgds-radio-group itemProps config", () => {
  it("has itemPattern ↳ Option", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-radio-group"];
    assert.equal(config.itemPattern, "↳ Option");
  });

  it("has label itemProp with radio text key", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-radio-group"];
    assert.equal(config.itemProps.label.key, "↳ Edit text#15163:0");
  });

  it("has selection itemProp with checked/unselected", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-radio-group"];
    assert.equal(config.itemProps.selection.prop, "Selection");
    assert.equal(config.itemProps.selection.checkedValue, "selected");
    assert.equal(config.itemProps.selection.uncheckedValue, "unselected");
  });

  it("has state itemProp with disabled/invalid/default", () => {
    const config = COMPONENT_SLOT_CONFIG["sgds-radio-group"];
    assert.equal(config.itemProps.state.prop, "State");
    assert.equal(config.itemProps.state.disabledValue, "disabled");
    assert.equal(config.itemProps.state.invalidValue, "invalid");
    assert.equal(config.itemProps.state.defaultValue, "default");
  });
});
