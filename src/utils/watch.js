// @watch decorator
//
// Runs when an observed property changes, e.g. @property or @state, but before the component updates.
//
// To wait for an update to complete after a change occurs, use `await this.updateComplete` in the handler. To start
// watching after the initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
//
// Usage:
//
//  @watch('propName')
//  handlePropChange(oldValue, newValue) {
//    ...
//  }
export function watch(propName, options) {
    const resolvedOptions = Object.assign({ waitUntilFirstUpdate: false }, options);
    return (proto, decoratedFnName) => {
        // @ts-expect-error -- update is a protected property
        const { update } = proto;
        if (propName in proto) {
            const propNameKey = propName;
            // @ts-expect-error -- update is a protected property
            proto.update = function (changedProps) {
                if (changedProps.has(propNameKey)) {
                    const oldValue = changedProps.get(propNameKey);
                    const newValue = this[propNameKey];
                    if (oldValue !== newValue) {
                        if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                            this[decoratedFnName](oldValue, newValue);
                        }
                    }
                }
                update.call(this, changedProps);
            };
        }
    };
}
//# sourceMappingURL=watch.js.map