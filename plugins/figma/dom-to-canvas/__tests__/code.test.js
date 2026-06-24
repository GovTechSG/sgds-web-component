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
  return { SGDS_COMPONENT_MAP, ATTR_TO_VARIANT_PROP, ATTR_VALUE_MAP, COMPONENT_SLOT_CONFIG };
`
);
const { SGDS_COMPONENT_MAP, ATTR_TO_VARIANT_PROP, ATTR_VALUE_MAP, COMPONENT_SLOT_CONFIG } = evalFn();

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
  }

  const BOOLEAN_VARIANT_PROPS = ["Outlined", "Dismissible"];
  for (const bvp of BOOLEAN_VARIANT_PROPS) {
    if (!criteria[bvp]) criteria[bvp] = "False";
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

  it("close-button: valueOverrides (fixed-light → fixed light)", () => {
    const r = buildVariantCriteria({ tag: "sgds-close-button", attrs: { variant: "fixed-light" }, children: [] });
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
      children: [
        { tag: "sgds-accordion-item" },
        { tag: "sgds-accordion-item" },
        { tag: "sgds-accordion-item" },
      ],
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

describe("COMPONENT_SLOT_CONFIG completeness", () => {
  it("has 42 configured components", () => {
    assert.equal(Object.keys(COMPONENT_SLOT_CONFIG).length, 42);
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
