/** Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements. */
export function waitForEvent(el, eventName) {
    return new Promise(resolve => {
        function done(event) {
            if (event.target === el) {
                el.removeEventListener(eventName, done);
                resolve();
            }
        }
        el.addEventListener(eventName, done);
    });
}
//# sourceMappingURL=event.js.map