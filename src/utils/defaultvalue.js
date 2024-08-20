// @defaultValue decorator
//
// Runs when the corresponding attribute of the observed property changes, e.g. after calling Element.setAttribute or after updating
// the observed property.
//
// The decorator checks whether the value of the attribute is different from the value of the property and in that case
// it saves the new value.
//
//
// Usage:
//
//  @property({ type: Boolean, reflect: true })
//  checked = false;
//
//  @defaultValue('checked')
//  defaultChecked = false;
//
import { defaultConverter } from "lit";
export const defaultValue = (propertyName = "value") => (proto, key) => {
    const ctor = proto.constructor;
    const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
    ctor.prototype.attributeChangedCallback = function (name, old, value) {
        var _a;
        const options = ctor.getPropertyOptions(propertyName);
        const attributeName = (typeof options.attribute === "string" ? options.attribute : propertyName).toLowerCase();
        if (name === attributeName) {
            const converter = options.converter || defaultConverter;
            const fromAttribute = typeof converter === "function" ? converter : (_a = converter === null || converter === void 0 ? void 0 : converter.fromAttribute) !== null && _a !== void 0 ? _a : defaultConverter.fromAttribute;
            const newValue = fromAttribute(value, options.type);
            if (this[propertyName] !== newValue) {
                this[key] = newValue;
            }
        }
        attributeChangedCallback.call(this, name, old, value);
    };
};
//# sourceMappingURL=defaultvalue.js.map