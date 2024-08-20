const defaultAnimationRegistry = new Map();
const customAnimationRegistry = new WeakMap();
function ensureAnimation(animation) {
    return animation !== null && animation !== void 0 ? animation : { keyframes: [], options: { duration: 0 } };
}
//
// Given an ElementAnimation, this function returns a new ElementAnimation where the keyframes property reflects either
// keyframes or rtlKeyframes depending on the specified directionality.
//
function getLogicalAnimation(animation) {
    return animation;
}
//
// Gets an element's animation. Falls back to the default if no animation is found.
//
export function getAnimation(el, animationName) {
    const customAnimation = customAnimationRegistry.get(el);
    // Check for a custom animation
    if (customAnimation === null || customAnimation === void 0 ? void 0 : customAnimation[animationName]) {
        return getLogicalAnimation(customAnimation[animationName]);
    }
    // Check for a default animation
    const defaultAnimation = defaultAnimationRegistry.get(animationName);
    if (defaultAnimation) {
        return getLogicalAnimation(defaultAnimation);
    }
    // Fall back to an empty animation
    return {
        keyframes: [],
        options: { duration: 0 }
    };
}
//
// Sets a custom animation for the specified element.
//
export function setAnimation(el, animationName, animation) {
    customAnimationRegistry.set(el, Object.assign(Object.assign({}, customAnimationRegistry.get(el)), { [animationName]: ensureAnimation(animation) }));
}
//
// Sets a default animation. Components should use the `name.animation` for primary animations and `name.part.animation`
// for secondary animations, e.g. `dialog.show` and `dialog.overlay.show`. For modifiers, use `drawer.showTop`.
//
export function setDefaultAnimation(animationName, animation) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
//# sourceMappingURL=animation-registry.js.map