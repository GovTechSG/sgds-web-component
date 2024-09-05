(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  const appliedClassMixins = new WeakMap();

  /** Vefify if the Mixin was previously applyed
   * @private
   * @param {function} mixin      Mixin being applyed
   * @param {object} superClass   Class receiving the new mixin
   * @returns {boolean}
   */
  function wasMixinPreviouslyApplied(mixin, superClass) {
    let klass = superClass;
    while (klass) {
      if (appliedClassMixins.get(klass) === mixin) {
        return true;
      }
      klass = Object.getPrototypeOf(klass);
    }
    return false;
  }

  /** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
   * @export
   * @param {function} mixin      Mixin to be applyed
   * @returns {object}            Mixed class with mixin applied
   */
  function dedupeMixin(mixin) {
    return superClass => {
      if (wasMixinPreviouslyApplied(mixin, superClass)) {
        return superClass;
      }
      const mixedClass = mixin(superClass);
      appliedClassMixins.set(mixedClass, mixin);
      return mixedClass;
    };
  }

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const NODE_MODE = false;
  const global$3 = window;
  /**
   * Whether the current browser supports `adoptedStyleSheets`.
   */
  const supportsAdoptingStyleSheets = global$3.ShadowRoot &&
      (global$3.ShadyCSS === undefined || global$3.ShadyCSS.nativeShadow) &&
      'adoptedStyleSheets' in Document.prototype &&
      'replace' in CSSStyleSheet.prototype;
  const constructionToken = Symbol();
  const cssTagCache = new WeakMap();
  /**
   * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
   *
   * CSSResult is the return value of `css`-tagged template literals and
   * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
   * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
   */
  class CSSResult {
      constructor(cssText, strings, safeToken) {
          // This property needs to remain unminified.
          this['_$cssResult$'] = true;
          if (safeToken !== constructionToken) {
              throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
          }
          this.cssText = cssText;
          this._strings = strings;
      }
      // This is a getter so that it's lazy. In practice, this means stylesheets
      // are not created until the first element instance is made.
      get styleSheet() {
          // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
          // constructable.
          let styleSheet = this._styleSheet;
          const strings = this._strings;
          if (supportsAdoptingStyleSheets && styleSheet === undefined) {
              const cacheable = strings !== undefined && strings.length === 1;
              if (cacheable) {
                  styleSheet = cssTagCache.get(strings);
              }
              if (styleSheet === undefined) {
                  (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                  if (cacheable) {
                      cssTagCache.set(strings, styleSheet);
                  }
              }
          }
          return styleSheet;
      }
      toString() {
          return this.cssText;
      }
  }
  const textFromCSSResult = (value) => {
      // This property needs to remain unminified.
      if (value['_$cssResult$'] === true) {
          return value.cssText;
      }
      else if (typeof value === 'number') {
          return value;
      }
      else {
          throw new Error(`Value passed to 'css' function must be a 'css' function result: ` +
              `${value}. Use 'unsafeCSS' to pass non-literal values, but take care ` +
              `to ensure page security.`);
      }
  };
  /**
   * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */
  const unsafeCSS = (value) => new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
  /**
   * A template literal tag which can be used with LitElement's
   * {@linkcode LitElement.styles} property to set element styles.
   *
   * For security reasons, only literal string values and number may be used in
   * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
   * may be used inside an expression.
   */
  const css = (strings, ...values) => {
      const cssText = strings.length === 1
          ? strings[0]
          : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
      return new CSSResult(cssText, strings, constructionToken);
  };
  /**
   * Applies the given styles to a `shadowRoot`. When Shadow DOM is
   * available but `adoptedStyleSheets` is not, styles are appended to the
   * `shadowRoot` to [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   * Note, when shimming is used, any styles that are subsequently placed into
   * the shadowRoot should be placed *before* any shimmed adopted styles. This
   * will match spec behavior that gives adopted sheets precedence over styles in
   * shadowRoot.
   */
  const adoptStyles = (renderRoot, styles) => {
      if (supportsAdoptingStyleSheets) {
          renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
      }
      else {
          styles.forEach((s) => {
              const style = document.createElement('style');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const nonce = global$3['litNonce'];
              if (nonce !== undefined) {
                  style.setAttribute('nonce', nonce);
              }
              style.textContent = s.cssText;
              renderRoot.appendChild(style);
          });
      }
  };
  const cssResultFromStyleSheet = (sheet) => {
      let cssText = '';
      for (const rule of sheet.cssRules) {
          cssText += rule.cssText;
      }
      return unsafeCSS(cssText);
  };
  const getCompatibleStyle = supportsAdoptingStyleSheets ||
      (NODE_MODE )
      ? (s) => s
      : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;

  /**
   * @typedef {import('./types').RenderOptions} RenderOptions
   * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
   * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
   * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
   * @typedef {import('@lit/reactive-element').CSSResultOrNative} CSSResultOrNative
   */

  // @ts-ignore
  const supportsScopedRegistry = !!ShadowRoot.prototype.createElement;

  /**
   * @template {import('./types').Constructor<HTMLElement>} T
   * @param {T} superclass
   * @return {T & import('./types').Constructor<ScopedElementsHost>}
   */
  const ScopedElementsMixinImplementation = superclass =>
    /** @type {ScopedElementsHost} */
    class ScopedElementsHost extends superclass {
      /**
       * Obtains the scoped elements definitions map if specified.
       *
       * @returns {ScopedElementsMap}
       */
      static get scopedElements() {
        return {};
      }

      /**
       * Obtains the ShadowRoot options.
       *
       * @type {ShadowRootInit}
       */
      static get shadowRootOptions() {
        return this.__shadowRootOptions;
      }

      /**
       * Set the shadowRoot options.
       *
       * @param {ShadowRootInit} value
       */
      static set shadowRootOptions(value) {
        this.__shadowRootOptions = value;
      }

      /**
       * Obtains the element styles.
       *
       * @returns {CSSResultOrNative[]}
       */
      static get elementStyles() {
        return this.__elementStyles;
      }

      static set elementStyles(styles) {
        this.__elementStyles = styles;
      }

      // either TS or ESLint will complain here
      // eslint-disable-next-line no-unused-vars
      constructor(..._args) {
        super();
        /** @type {RenderOptions} */
        this.renderOptions = this.renderOptions || undefined;
      }

      /**
       * Obtains the CustomElementRegistry associated to the ShadowRoot.
       *
       * @returns {CustomElementRegistry}
       */
      get registry() {
        // @ts-ignore
        return this.constructor.__registry;
      }

      /**
       * Set the CustomElementRegistry associated to the ShadowRoot
       *
       * @param {CustomElementRegistry} registry
       */
      set registry(registry) {
        // @ts-ignore
        this.constructor.__registry = registry;
      }

      createRenderRoot() {
        const { scopedElements, shadowRootOptions, elementStyles } =
          /** @type {typeof ScopedElementsHost} */ (this.constructor);

        const shouldCreateRegistry =
          !this.registry ||
          // @ts-ignore
          (this.registry === this.constructor.__registry &&
            !Object.prototype.hasOwnProperty.call(this.constructor, '__registry'));

        /**
         * Create a new registry if:
         * - the registry is not defined
         * - this class doesn't have its own registry *AND* has no shared registry
         */
        if (shouldCreateRegistry) {
          this.registry = supportsScopedRegistry ? new CustomElementRegistry() : customElements;
          for (const [tagName, klass] of Object.entries(scopedElements)) {
            this.defineScopedElement(tagName, klass);
          }
        }

        /** @type {ShadowRootInit} */
        const options = {
          mode: 'open',
          ...shadowRootOptions,
          customElements: this.registry,
        };

        const createdRoot = this.attachShadow(options);
        if (supportsScopedRegistry) {
          this.renderOptions.creationScope = createdRoot;
        }

        if (createdRoot instanceof ShadowRoot) {
          adoptStyles(createdRoot, elementStyles);
          this.renderOptions.renderBefore = this.renderOptions.renderBefore || createdRoot.firstChild;
        }

        return createdRoot;
      }

      createScopedElement(tagName) {
        const root = supportsScopedRegistry ? this.shadowRoot : document;
        // @ts-ignore polyfill to support createElement on shadowRoot is loaded
        return root.createElement(tagName);
      }

      /**
       * Defines a scoped element.
       *
       * @param {string} tagName
       * @param {typeof HTMLElement} klass
       */
      defineScopedElement(tagName, klass) {
        const registeredClass = this.registry.get(tagName);
        if (registeredClass && supportsScopedRegistry === false && registeredClass !== klass) {
          // eslint-disable-next-line no-console
          console.error(
            [
              `You are trying to re-register the "${tagName}" custom element with a different class via ScopedElementsMixin.`,
              'This is only possible with a CustomElementRegistry.',
              'Your browser does not support this feature so you will need to load a polyfill for it.',
              'Load "@webcomponents/scoped-custom-element-registry" before you register ANY web component to the global customElements registry.',
              'e.g. add "<script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>" as your first script tag.',
              'For more details you can visit https://open-wc.org/docs/development/scoped-elements/',
            ].join('\n'),
          );
        }
        if (!registeredClass) {
          return this.registry.define(tagName, klass);
        }
        return this.registry.get(tagName);
      }

      /**
       * @deprecated use the native el.tagName instead
       *
       * @param {string} tagName
       * @returns {string} the tag name
       */
      // eslint-disable-next-line class-methods-use-this
      getScopedTagName(tagName) {
        // @ts-ignore
        return this.constructor.getScopedTagName(tagName);
      }

      /**
       * @deprecated use the native el.tagName instead
       *
       * @param {string} tagName
       * @returns {string} the tag name
       */
      // eslint-disable-next-line class-methods-use-this
      static getScopedTagName(tagName) {
        // @ts-ignore
        return this.__registry.get(tagName) ? tagName : undefined;
      }
    };

  const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var _b$3, _c$2, _d$1;
  var _e;
  const global$2 = window;
  let requestUpdateThenable;
  let issueWarning$2;
  const trustedTypes$1 = global$2
      .trustedTypes;
  // Temporary workaround for https://crbug.com/993268
  // Currently, any attribute starting with "on" is considered to be a
  // TrustedScript source. Such boolean attributes must be set to the equivalent
  // trusted emptyScript value.
  const emptyStringForBooleanAttribute$1 = trustedTypes$1
      ? trustedTypes$1.emptyScript
      : '';
  const polyfillSupport$2 = global$2.reactiveElementPolyfillSupportDevMode
      ;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = ((_b$3 = global$2.litIssuedWarnings) !== null && _b$3 !== void 0 ? _b$3 : (global$2.litIssuedWarnings = new Set()));
      // Issue a warning, if we haven't already.
      issueWarning$2 = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
      issueWarning$2('dev-mode', `Lit is in dev mode. Not recommended for production!`);
      // Issue polyfill support warning.
      if (((_c$2 = global$2.ShadyDOM) === null || _c$2 === void 0 ? void 0 : _c$2.inUse) && polyfillSupport$2 === undefined) {
          issueWarning$2('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` +
              `the \`polyfill-support\` module has not been loaded.`);
      }
      requestUpdateThenable = (name) => ({
          then: (onfulfilled, _onrejected) => {
              issueWarning$2('request-update-promise', `The \`requestUpdate\` method should no longer return a Promise but ` +
                  `does so on \`${name}\`. Use \`updateComplete\` instead.`);
              if (onfulfilled !== undefined) {
                  onfulfilled(false);
              }
          },
      });
  }
  /**
   * Useful for visualizing and logging insights into what the Lit template system is doing.
   *
   * Compiled out of prod mode builds.
   */
  const debugLogEvent$1 = (event) => {
          const shouldEmit = global$2
              .emitLitDebugLogEvents;
          if (!shouldEmit) {
              return;
          }
          global$2.dispatchEvent(new CustomEvent('lit-debug', {
              detail: event,
          }));
      }
      ;
  /*
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  /*@__INLINE__*/
  const JSCompiler_renameProperty = (prop, _obj) => prop;
  const defaultConverter = {
      toAttribute(value, type) {
          switch (type) {
              case Boolean:
                  value = value ? emptyStringForBooleanAttribute$1 : null;
                  break;
              case Object:
              case Array:
                  // if the value is `null` or `undefined` pass this through
                  // to allow removing/no change behavior.
                  value = value == null ? value : JSON.stringify(value);
                  break;
          }
          return value;
      },
      fromAttribute(value, type) {
          let fromValue = value;
          switch (type) {
              case Boolean:
                  fromValue = value !== null;
                  break;
              case Number:
                  fromValue = value === null ? null : Number(value);
                  break;
              case Object:
              case Array:
                  // Do *not* generate exception when invalid JSON is set as elements
                  // don't normally complain on being mis-configured.
                  // TODO(sorvell): Do generate exception in *dev mode*.
                  try {
                      // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                      fromValue = JSON.parse(value);
                  }
                  catch (e) {
                      fromValue = null;
                  }
                  break;
          }
          return fromValue;
      },
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */
  const notEqual = (value, old) => {
      // This ensures (old==NaN, value==NaN) always returns false
      return old !== value && (old === old || value === value);
  };
  const defaultPropertyDeclaration = {
      attribute: true,
      type: String,
      converter: defaultConverter,
      reflect: false,
      hasChanged: notEqual,
  };
  /**
   * The Closure JS Compiler doesn't currently have good support for static
   * property semantics where "this" is dynamic (e.g.
   * https://github.com/google/closure-compiler/issues/3177 and others) so we use
   * this hack to bypass any rewriting by the compiler.
   */
  const finalized = 'finalized';
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   * @noInheritDoc
   */
  class ReactiveElement
  // In the Node build, this `extends` clause will be substituted with
  // `(globalThis.HTMLElement ?? HTMLElement)`.
  //
  // This way, we will first prefer any global `HTMLElement` polyfill that the
  // user has assigned, and then fall back to the `HTMLElement` shim which has
  // been imported (see note at the top of this file about how this import is
  // generated by Rollup). Note that the `HTMLElement` variable has been
  // shadowed by this import, so it no longer refers to the global.
   extends HTMLElement {
      constructor() {
          super();
          this.__instanceProperties = new Map();
          /**
           * True if there is a pending update as a result of calling `requestUpdate()`.
           * Should only be read.
           * @category updates
           */
          this.isUpdatePending = false;
          /**
           * Is set to `true` after the first update. The element code cannot assume
           * that `renderRoot` exists before the element `hasUpdated`.
           * @category updates
           */
          this.hasUpdated = false;
          /**
           * Name of currently reflecting property
           */
          this.__reflectingProperty = null;
          this._initialize();
      }
      /**
       * Adds an initializer function to the class that is called during instance
       * construction.
       *
       * This is useful for code that runs against a `ReactiveElement`
       * subclass, such as a decorator, that needs to do work for each
       * instance, such as setting up a `ReactiveController`.
       *
       * ```ts
       * const myDecorator = (target: typeof ReactiveElement, key: string) => {
       *   target.addInitializer((instance: ReactiveElement) => {
       *     // This is run during construction of the element
       *     new MyController(instance);
       *   });
       * }
       * ```
       *
       * Decorating a field will then cause each instance to run an initializer
       * that adds a controller:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   @myDecorator foo;
       * }
       * ```
       *
       * Initializers are stored per-constructor. Adding an initializer to a
       * subclass does not add it to a superclass. Since initializers are run in
       * constructors, initializers will run in order of the class hierarchy,
       * starting with superclasses and progressing to the instance's class.
       *
       * @nocollapse
       */
      static addInitializer(initializer) {
          var _a;
          this.finalize();
          ((_a = this._initializers) !== null && _a !== void 0 ? _a : (this._initializers = [])).push(initializer);
      }
      /**
       * Returns a list of attributes corresponding to the registered properties.
       * @nocollapse
       * @category attributes
       */
      static get observedAttributes() {
          // note: piggy backing on this to ensure we're finalized.
          this.finalize();
          const attributes = [];
          // Use forEach so this works even if for/of loops are compiled to for loops
          // expecting arrays
          this.elementProperties.forEach((v, p) => {
              const attr = this.__attributeNameForProperty(p, v);
              if (attr !== undefined) {
                  this.__attributeToPropertyMap.set(attr, p);
                  attributes.push(attr);
              }
          });
          return attributes;
      }
      /**
       * Creates a property accessor on the element prototype if one does not exist
       * and stores a {@linkcode PropertyDeclaration} for the property with the
       * given options. The property setter calls the property's `hasChanged`
       * property option or uses a strict identity check to determine whether or not
       * to request an update.
       *
       * This method may be overridden to customize properties; however,
       * when doing so, it's important to call `super.createProperty` to ensure
       * the property is setup correctly. This method calls
       * `getPropertyDescriptor` internally to get a descriptor to install.
       * To customize what properties do when they are get or set, override
       * `getPropertyDescriptor`. To customize the options for a property,
       * implement `createProperty` like this:
       *
       * ```ts
       * static createProperty(name, options) {
       *   options = Object.assign(options, {myOption: true});
       *   super.createProperty(name, options);
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static createProperty(name, options = defaultPropertyDeclaration) {
          var _a;
          // if this is a state property, force the attribute to false.
          if (options.state) {
              // Cast as any since this is readonly.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              options.attribute = false;
          }
          // Note, since this can be called by the `@property` decorator which
          // is called before `finalize`, we ensure finalization has been kicked off.
          this.finalize();
          this.elementProperties.set(name, options);
          // Do not generate an accessor if the prototype already has one, since
          // it would be lost otherwise and that would never be the user's intention;
          // Instead, we expect users to call `requestUpdate` themselves from
          // user-defined accessors. Note that if the super has an accessor we will
          // still overwrite it
          if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
              const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
              const descriptor = this.getPropertyDescriptor(name, key, options);
              if (descriptor !== undefined) {
                  Object.defineProperty(this.prototype, name, descriptor);
                  {
                      // If this class doesn't have its own set, create one and initialize
                      // with the values in the set from the nearest ancestor class, if any.
                      if (!this.hasOwnProperty('__reactivePropertyKeys')) {
                          this.__reactivePropertyKeys = new Set((_a = this.__reactivePropertyKeys) !== null && _a !== void 0 ? _a : []);
                      }
                      this.__reactivePropertyKeys.add(name);
                  }
              }
          }
      }
      /**
       * Returns a property descriptor to be defined on the given named property.
       * If no descriptor is returned, the property will not become an accessor.
       * For example,
       *
       * ```ts
       * class MyElement extends LitElement {
       *   static getPropertyDescriptor(name, key, options) {
       *     const defaultDescriptor =
       *         super.getPropertyDescriptor(name, key, options);
       *     const setter = defaultDescriptor.set;
       *     return {
       *       get: defaultDescriptor.get,
       *       set(value) {
       *         setter.call(this, value);
       *         // custom action.
       *       },
       *       configurable: true,
       *       enumerable: true
       *     }
       *   }
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static getPropertyDescriptor(name, key, options) {
          return {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              get() {
                  return this[key];
              },
              set(value) {
                  const oldValue = this[name];
                  this[key] = value;
                  this.requestUpdate(name, oldValue, options);
              },
              configurable: true,
              enumerable: true,
          };
      }
      /**
       * Returns the property options associated with the given property.
       * These options are defined with a `PropertyDeclaration` via the `properties`
       * object or the `@property` decorator and are registered in
       * `createProperty(...)`.
       *
       * Note, this method should be considered "final" and not overridden. To
       * customize the options for a given property, override
       * {@linkcode createProperty}.
       *
       * @nocollapse
       * @final
       * @category properties
       */
      static getPropertyOptions(name) {
          return this.elementProperties.get(name) || defaultPropertyDeclaration;
      }
      /**
       * Creates property accessors for registered properties, sets up element
       * styling, and ensures any superclasses are also finalized. Returns true if
       * the element was finalized.
       * @nocollapse
       */
      static finalize() {
          if (this.hasOwnProperty(finalized)) {
              return false;
          }
          this[finalized] = true;
          // finalize any superclasses
          const superCtor = Object.getPrototypeOf(this);
          superCtor.finalize();
          // Create own set of initializers for this class if any exist on the
          // superclass and copy them down. Note, for a small perf boost, avoid
          // creating initializers unless needed.
          if (superCtor._initializers !== undefined) {
              this._initializers = [...superCtor._initializers];
          }
          this.elementProperties = new Map(superCtor.elementProperties);
          // initialize Map populated in observedAttributes
          this.__attributeToPropertyMap = new Map();
          // make any properties
          // Note, only process "own" properties since this element will inherit
          // any properties defined on the superClass, and finalization ensures
          // the entire prototype chain is finalized.
          if (this.hasOwnProperty(JSCompiler_renameProperty('properties'))) {
              const props = this.properties;
              // support symbols in properties (IE11 does not support this)
              const propKeys = [
                  ...Object.getOwnPropertyNames(props),
                  ...Object.getOwnPropertySymbols(props),
              ];
              // This for/of is ok because propKeys is an array
              for (const p of propKeys) {
                  // note, use of `any` is due to TypeScript lack of support for symbol in
                  // index types
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  this.createProperty(p, props[p]);
              }
          }
          this.elementStyles = this.finalizeStyles(this.styles);
          // DEV mode warnings
          {
              const warnRemovedOrRenamed = (name, renamed = false) => {
                  if (this.prototype.hasOwnProperty(name)) {
                      issueWarning$2(renamed ? 'renamed-api' : 'removed-api', `\`${name}\` is implemented on class ${this.name}. It ` +
                          `has been ${renamed ? 'renamed' : 'removed'} ` +
                          `in this version of LitElement.`);
                  }
              };
              warnRemovedOrRenamed('initialize');
              warnRemovedOrRenamed('requestUpdateInternal');
              warnRemovedOrRenamed('_getUpdateComplete', true);
          }
          return true;
      }
      /**
       * Takes the styles the user supplied via the `static styles` property and
       * returns the array of styles to apply to the element.
       * Override this method to integrate into a style management system.
       *
       * Styles are deduplicated preserving the _last_ instance in the list. This
       * is a performance optimization to avoid duplicated styles that can occur
       * especially when composing via subclassing. The last item is kept to try
       * to preserve the cascade order with the assumption that it's most important
       * that last added styles override previous styles.
       *
       * @nocollapse
       * @category styles
       */
      static finalizeStyles(styles) {
          const elementStyles = [];
          if (Array.isArray(styles)) {
              // Dedupe the flattened array in reverse order to preserve the last items.
              // Casting to Array<unknown> works around TS error that
              // appears to come from trying to flatten a type CSSResultArray.
              const set = new Set(styles.flat(Infinity).reverse());
              // Then preserve original order by adding the set items in reverse order.
              for (const s of set) {
                  elementStyles.unshift(getCompatibleStyle(s));
              }
          }
          else if (styles !== undefined) {
              elementStyles.push(getCompatibleStyle(styles));
          }
          return elementStyles;
      }
      /**
       * Returns the property name for the given attribute `name`.
       * @nocollapse
       */
      static __attributeNameForProperty(name, options) {
          const attribute = options.attribute;
          return attribute === false
              ? undefined
              : typeof attribute === 'string'
                  ? attribute
                  : typeof name === 'string'
                      ? name.toLowerCase()
                      : undefined;
      }
      /**
       * Internal only override point for customizing work done when elements
       * are constructed.
       *
       * @internal
       */
      _initialize() {
          var _a;
          this.__updatePromise = new Promise((res) => (this.enableUpdating = res));
          this._$changedProperties = new Map();
          this.__saveInstanceProperties();
          // ensures first update will be caught by an early access of
          // `updateComplete`
          this.requestUpdate();
          (_a = this.constructor._initializers) === null || _a === void 0 ? void 0 : _a.forEach((i) => i(this));
      }
      /**
       * Registers a `ReactiveController` to participate in the element's reactive
       * update cycle. The element automatically calls into any registered
       * controllers during its lifecycle callbacks.
       *
       * If the element is connected when `addController()` is called, the
       * controller's `hostConnected()` callback will be immediately called.
       * @category controllers
       */
      addController(controller) {
          var _a, _b;
          ((_a = this.__controllers) !== null && _a !== void 0 ? _a : (this.__controllers = [])).push(controller);
          // If a controller is added after the element has been connected,
          // call hostConnected. Note, re-using existence of `renderRoot` here
          // (which is set in connectedCallback) to avoid the need to track a
          // first connected state.
          if (this.renderRoot !== undefined && this.isConnected) {
              (_b = controller.hostConnected) === null || _b === void 0 ? void 0 : _b.call(controller);
          }
      }
      /**
       * Removes a `ReactiveController` from the element.
       * @category controllers
       */
      removeController(controller) {
          var _a;
          // Note, if the indexOf is -1, the >>> will flip the sign which makes the
          // splice do nothing.
          (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.splice(this.__controllers.indexOf(controller) >>> 0, 1);
      }
      /**
       * Fixes any properties set on the instance before upgrade time.
       * Otherwise these would shadow the accessor and break these properties.
       * The properties are stored in a Map which is played back after the
       * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
       * (<=41), properties created for native platform properties like (`id` or
       * `name`) may not have default values set in the element constructor. On
       * these browsers native properties appear on instances and therefore their
       * default value will overwrite any element default (e.g. if the element sets
       * this.id = 'id' in the constructor, the 'id' will become '' since this is
       * the native platform default).
       */
      __saveInstanceProperties() {
          // Use forEach so this works even if for/of loops are compiled to for loops
          // expecting arrays
          this.constructor.elementProperties.forEach((_v, p) => {
              if (this.hasOwnProperty(p)) {
                  this.__instanceProperties.set(p, this[p]);
                  delete this[p];
              }
          });
      }
      /**
       * Returns the node into which the element should render and by default
       * creates and returns an open shadowRoot. Implement to customize where the
       * element's DOM is rendered. For example, to render into the element's
       * childNodes, return `this`.
       *
       * @return Returns a node into which to render.
       * @category rendering
       */
      createRenderRoot() {
          var _a;
          const renderRoot = (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this.attachShadow(this.constructor.shadowRootOptions);
          adoptStyles(renderRoot, this.constructor.elementStyles);
          return renderRoot;
      }
      /**
       * On first connection, creates the element's renderRoot, sets up
       * element styling, and enables updating.
       * @category lifecycle
       */
      connectedCallback() {
          var _a;
          // create renderRoot before first update.
          if (this.renderRoot === undefined) {
              this.renderRoot = this.createRenderRoot();
          }
          this.enableUpdating(true);
          (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostConnected) === null || _a === void 0 ? void 0 : _a.call(c); });
      }
      /**
       * Note, this method should be considered final and not overridden. It is
       * overridden on the element instance with a function that triggers the first
       * update.
       * @category updates
       */
      enableUpdating(_requestedUpdate) { }
      /**
       * Allows for `super.disconnectedCallback()` in extensions while
       * reserving the possibility of making non-breaking feature additions
       * when disconnecting at some point in the future.
       * @category lifecycle
       */
      disconnectedCallback() {
          var _a;
          (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostDisconnected) === null || _a === void 0 ? void 0 : _a.call(c); });
      }
      /**
       * Synchronizes property values when attributes change.
       *
       * Specifically, when an attribute is set, the corresponding property is set.
       * You should rarely need to implement this callback. If this method is
       * overridden, `super.attributeChangedCallback(name, _old, value)` must be
       * called.
       *
       * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
       * on MDN for more information about the `attributeChangedCallback`.
       * @category attributes
       */
      attributeChangedCallback(name, _old, value) {
          this._$attributeToProperty(name, value);
      }
      __propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
          var _a;
          const attr = this.constructor.__attributeNameForProperty(name, options);
          if (attr !== undefined && options.reflect === true) {
              const converter = ((_a = options.converter) === null || _a === void 0 ? void 0 : _a.toAttribute) !==
                  undefined
                  ? options.converter
                  : defaultConverter;
              const attrValue = converter.toAttribute(value, options.type);
              if (this.constructor.enabledWarnings.indexOf('migration') >= 0 &&
                  attrValue === undefined) {
                  issueWarning$2('undefined-attribute-value', `The attribute value for the ${name} property is ` +
                      `undefined on element ${this.localName}. The attribute will be ` +
                      `removed, but in the previous version of \`ReactiveElement\`, ` +
                      `the attribute would not have changed.`);
              }
              // Track if the property is being reflected to avoid
              // setting the property again via `attributeChangedCallback`. Note:
              // 1. this takes advantage of the fact that the callback is synchronous.
              // 2. will behave incorrectly if multiple attributes are in the reaction
              // stack at time of calling. However, since we process attributes
              // in `update` this should not be possible (or an extreme corner case
              // that we'd like to discover).
              // mark state reflecting
              this.__reflectingProperty = name;
              if (attrValue == null) {
                  this.removeAttribute(attr);
              }
              else {
                  this.setAttribute(attr, attrValue);
              }
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /** @internal */
      _$attributeToProperty(name, value) {
          var _a;
          const ctor = this.constructor;
          // Note, hint this as an `AttributeMap` so closure clearly understands
          // the type; it has issues with tracking types through statics
          const propName = ctor.__attributeToPropertyMap.get(name);
          // Use tracking info to avoid reflecting a property value to an attribute
          // if it was just set because the attribute changed.
          if (propName !== undefined && this.__reflectingProperty !== propName) {
              const options = ctor.getPropertyOptions(propName);
              const converter = typeof options.converter === 'function'
                  ? { fromAttribute: options.converter }
                  : ((_a = options.converter) === null || _a === void 0 ? void 0 : _a.fromAttribute) !== undefined
                      ? options.converter
                      : defaultConverter;
              // mark state reflecting
              this.__reflectingProperty = propName;
              this[propName] = converter.fromAttribute(value, options.type
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              );
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /**
       * Requests an update which is processed asynchronously. This should be called
       * when an element should update based on some state not triggered by setting
       * a reactive property. In this case, pass no arguments. It should also be
       * called when manually implementing a property setter. In this case, pass the
       * property `name` and `oldValue` to ensure that any configured property
       * options are honored.
       *
       * @param name name of requesting property
       * @param oldValue old value of requesting property
       * @param options property options to use instead of the previously
       *     configured options
       * @category updates
       */
      requestUpdate(name, oldValue, options) {
          let shouldRequestUpdate = true;
          // If we have a property key, perform property update steps.
          if (name !== undefined) {
              options =
                  options ||
                      this.constructor.getPropertyOptions(name);
              const hasChanged = options.hasChanged || notEqual;
              if (hasChanged(this[name], oldValue)) {
                  if (!this._$changedProperties.has(name)) {
                      this._$changedProperties.set(name, oldValue);
                  }
                  // Add to reflecting properties set.
                  // Note, it's important that every change has a chance to add the
                  // property to `_reflectingProperties`. This ensures setting
                  // attribute + property reflects correctly.
                  if (options.reflect === true && this.__reflectingProperty !== name) {
                      if (this.__reflectingProperties === undefined) {
                          this.__reflectingProperties = new Map();
                      }
                      this.__reflectingProperties.set(name, options);
                  }
              }
              else {
                  // Abort the request if the property should not be considered changed.
                  shouldRequestUpdate = false;
              }
          }
          if (!this.isUpdatePending && shouldRequestUpdate) {
              this.__updatePromise = this.__enqueueUpdate();
          }
          // Note, since this no longer returns a promise, in dev mode we return a
          // thenable which warns if it's called.
          return requestUpdateThenable(this.localName)
              ;
      }
      /**
       * Sets up the element to asynchronously update.
       */
      async __enqueueUpdate() {
          this.isUpdatePending = true;
          try {
              // Ensure any previous update has resolved before updating.
              // This `await` also ensures that property changes are batched.
              await this.__updatePromise;
          }
          catch (e) {
              // Refire any previous errors async so they do not disrupt the update
              // cycle. Errors are refired so developers have a chance to observe
              // them, and this can be done by implementing
              // `window.onunhandledrejection`.
              Promise.reject(e);
          }
          const result = this.scheduleUpdate();
          // If `scheduleUpdate` returns a Promise, we await it. This is done to
          // enable coordinating updates with a scheduler. Note, the result is
          // checked to avoid delaying an additional microtask unless we need to.
          if (result != null) {
              await result;
          }
          return !this.isUpdatePending;
      }
      /**
       * Schedules an element update. You can override this method to change the
       * timing of updates by returning a Promise. The update will await the
       * returned Promise, and you should resolve the Promise to allow the update
       * to proceed. If this method is overridden, `super.scheduleUpdate()`
       * must be called.
       *
       * For instance, to schedule updates to occur just before the next frame:
       *
       * ```ts
       * override protected async scheduleUpdate(): Promise<unknown> {
       *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
       *   super.scheduleUpdate();
       * }
       * ```
       * @category updates
       */
      scheduleUpdate() {
          return this.performUpdate();
      }
      /**
       * Performs an element update. Note, if an exception is thrown during the
       * update, `firstUpdated` and `updated` will not be called.
       *
       * Call `performUpdate()` to immediately process a pending update. This should
       * generally not be needed, but it can be done in rare cases when you need to
       * update synchronously.
       *
       * Note: To ensure `performUpdate()` synchronously completes a pending update,
       * it should not be overridden. In LitElement 2.x it was suggested to override
       * `performUpdate()` to also customizing update scheduling. Instead, you should now
       * override `scheduleUpdate()`. For backwards compatibility with LitElement 2.x,
       * scheduling updates via `performUpdate()` continues to work, but will make
       * also calling `performUpdate()` to synchronously process updates difficult.
       *
       * @category updates
       */
      performUpdate() {
          var _a, _b;
          // Abort any update if one is not pending when this is called.
          // This can happen if `performUpdate` is called early to "flush"
          // the update.
          if (!this.isUpdatePending) {
              return;
          }
          debugLogEvent$1 === null || debugLogEvent$1 === void 0 ? void 0 : debugLogEvent$1({ kind: 'update' });
          // create renderRoot before first update.
          if (!this.hasUpdated) {
              // Produce warning if any class properties are shadowed by class fields
              {
                  const shadowedProperties = [];
                  (_a = this.constructor.__reactivePropertyKeys) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
                      var _a;
                      if (this.hasOwnProperty(p) && !((_a = this.__instanceProperties) === null || _a === void 0 ? void 0 : _a.has(p))) {
                          shadowedProperties.push(p);
                      }
                  });
                  if (shadowedProperties.length) {
                      throw new Error(`The following properties on element ${this.localName} will not ` +
                          `trigger updates as expected because they are set using class ` +
                          `fields: ${shadowedProperties.join(', ')}. ` +
                          `Native class fields and some compiled output will overwrite ` +
                          `accessors used for detecting changes. See ` +
                          `https://lit.dev/msg/class-field-shadowing ` +
                          `for more information.`);
                  }
              }
          }
          // Mixin instance properties once, if they exist.
          if (this.__instanceProperties) {
              // Use forEach so this works even if for/of loops are compiled to for loops
              // expecting arrays
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              this.__instanceProperties.forEach((v, p) => (this[p] = v));
              this.__instanceProperties = undefined;
          }
          let shouldUpdate = false;
          const changedProperties = this._$changedProperties;
          try {
              shouldUpdate = this.shouldUpdate(changedProperties);
              if (shouldUpdate) {
                  this.willUpdate(changedProperties);
                  (_b = this.__controllers) === null || _b === void 0 ? void 0 : _b.forEach((c) => { var _a; return (_a = c.hostUpdate) === null || _a === void 0 ? void 0 : _a.call(c); });
                  this.update(changedProperties);
              }
              else {
                  this.__markUpdated();
              }
          }
          catch (e) {
              // Prevent `firstUpdated` and `updated` from running when there's an
              // update exception.
              shouldUpdate = false;
              // Ensure element can accept additional updates after an exception.
              this.__markUpdated();
              throw e;
          }
          // The update is no longer considered pending and further updates are now allowed.
          if (shouldUpdate) {
              this._$didUpdate(changedProperties);
          }
      }
      /**
       * Invoked before `update()` to compute values needed during the update.
       *
       * Implement `willUpdate` to compute property values that depend on other
       * properties and are used in the rest of the update process.
       *
       * ```ts
       * willUpdate(changedProperties) {
       *   // only need to check changed properties for an expensive computation.
       *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
       *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
       *   }
       * }
       *
       * render() {
       *   return html`SHA: ${this.sha}`;
       * }
       * ```
       *
       * @category updates
       */
      willUpdate(_changedProperties) { }
      // Note, this is an override point for polyfill-support.
      // @internal
      _$didUpdate(changedProperties) {
          var _a;
          (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostUpdated) === null || _a === void 0 ? void 0 : _a.call(c); });
          if (!this.hasUpdated) {
              this.hasUpdated = true;
              this.firstUpdated(changedProperties);
          }
          this.updated(changedProperties);
          if (this.isUpdatePending &&
              this.constructor.enabledWarnings.indexOf('change-in-update') >= 0) {
              issueWarning$2('change-in-update', `Element ${this.localName} scheduled an update ` +
                  `(generally because a property was set) ` +
                  `after an update completed, causing a new update to be scheduled. ` +
                  `This is inefficient and should be avoided unless the next update ` +
                  `can only be scheduled as a side effect of the previous update.`);
          }
      }
      __markUpdated() {
          this._$changedProperties = new Map();
          this.isUpdatePending = false;
      }
      /**
       * Returns a Promise that resolves when the element has completed updating.
       * The Promise value is a boolean that is `true` if the element completed the
       * update without triggering another update. The Promise result is `false` if
       * a property was set inside `updated()`. If the Promise is rejected, an
       * exception was thrown during the update.
       *
       * To await additional asynchronous work, override the `getUpdateComplete`
       * method. For example, it is sometimes useful to await a rendered element
       * before fulfilling this Promise. To do this, first await
       * `super.getUpdateComplete()`, then any subsequent state.
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      get updateComplete() {
          return this.getUpdateComplete();
      }
      /**
       * Override point for the `updateComplete` promise.
       *
       * It is not safe to override the `updateComplete` getter directly due to a
       * limitation in TypeScript which means it is not possible to call a
       * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
       * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
       * This method should be overridden instead. For example:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   override async getUpdateComplete() {
       *     const result = await super.getUpdateComplete();
       *     await this._myChild.updateComplete;
       *     return result;
       *   }
       * }
       * ```
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      getUpdateComplete() {
          return this.__updatePromise;
      }
      /**
       * Controls whether or not `update()` should be called when the element requests
       * an update. By default, this method always returns `true`, but this can be
       * customized to control when to update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      shouldUpdate(_changedProperties) {
          return true;
      }
      /**
       * Updates the element. This method reflects property values to attributes.
       * It can be overridden to render and keep updated element DOM.
       * Setting properties inside this method will *not* trigger
       * another update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      update(_changedProperties) {
          if (this.__reflectingProperties !== undefined) {
              // Use forEach so this works even if for/of loops are compiled to for
              // loops expecting arrays
              this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
              this.__reflectingProperties = undefined;
          }
          this.__markUpdated();
      }
      /**
       * Invoked whenever the element is updated. Implement to perform
       * post-updating tasks via DOM APIs, for example, focusing an element.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      updated(_changedProperties) { }
      /**
       * Invoked when the element is first updated. Implement to perform one time
       * work on the element after update.
       *
       * ```ts
       * firstUpdated() {
       *   this.renderRoot.getElementById('my-text-area').focus();
       * }
       * ```
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      firstUpdated(_changedProperties) { }
  }
  _e = finalized;
  /**
   * Marks class as having finished creating properties.
   */
  ReactiveElement[_e] = true;
  /**
   * Memoized list of all element properties, including any superclass properties.
   * Created lazily on user subclasses when finalizing the class.
   * @nocollapse
   * @category properties
   */
  ReactiveElement.elementProperties = new Map();
  /**
   * Memoized list of all element styles.
   * Created lazily on user subclasses when finalizing the class.
   * @nocollapse
   * @category styles
   */
  ReactiveElement.elementStyles = [];
  /**
   * Options used when calling `attachShadow`. Set this property to customize
   * the options for the shadowRoot; for example, to create a closed
   * shadowRoot: `{mode: 'closed'}`.
   *
   * Note, these options are used in `createRenderRoot`. If this method
   * is customized, options should be respected if possible.
   * @nocollapse
   * @category rendering
   */
  ReactiveElement.shadowRootOptions = { mode: 'open' };
  // Apply polyfills if available
  polyfillSupport$2 === null || polyfillSupport$2 === void 0 ? void 0 : polyfillSupport$2({ ReactiveElement });
  // Dev mode warnings...
  {
      // Default warning set.
      ReactiveElement.enabledWarnings = ['change-in-update'];
      const ensureOwnWarnings = function (ctor) {
          if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings'))) {
              ctor.enabledWarnings = ctor.enabledWarnings.slice();
          }
      };
      ReactiveElement.enableWarning = function (warning) {
          ensureOwnWarnings(this);
          if (this.enabledWarnings.indexOf(warning) < 0) {
              this.enabledWarnings.push(warning);
          }
      };
      ReactiveElement.disableWarning = function (warning) {
          ensureOwnWarnings(this);
          const i = this.enabledWarnings.indexOf(warning);
          if (i >= 0) {
              this.enabledWarnings.splice(i, 1);
          }
      };
  }
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for ReactiveElement usage.
  ((_d$1 = global$2.reactiveElementVersions) !== null && _d$1 !== void 0 ? _d$1 : (global$2.reactiveElementVersions = [])).push('1.6.2');
  if (global$2.reactiveElementVersions.length > 1) {
      issueWarning$2('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
          `is not recommended.`);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var _a$3, _b$2, _c$1, _d;
  // Use window for browser builds because IE11 doesn't have globalThis.
  const global$1 = window;
  /**
   * Useful for visualizing and logging insights into what the Lit template system is doing.
   *
   * Compiled out of prod mode builds.
   */
  const debugLogEvent = (event) => {
          const shouldEmit = global$1
              .emitLitDebugLogEvents;
          if (!shouldEmit) {
              return;
          }
          global$1.dispatchEvent(new CustomEvent('lit-debug', {
              detail: event,
          }));
      }
      ;
  // Used for connecting beginRender and endRender events when there are nested
  // renders when errors are thrown preventing an endRender event from being
  // called.
  let debugLogRenderId = 0;
  let issueWarning$1;
  {
      (_a$3 = global$1.litIssuedWarnings) !== null && _a$3 !== void 0 ? _a$3 : (global$1.litIssuedWarnings = new Set());
      // Issue a warning, if we haven't already.
      issueWarning$1 = (code, warning) => {
          warning += code
              ? ` See https://lit.dev/msg/${code} for more information.`
              : '';
          if (!global$1.litIssuedWarnings.has(warning)) {
              console.warn(warning);
              global$1.litIssuedWarnings.add(warning);
          }
      };
      issueWarning$1('dev-mode', `Lit is in dev mode. Not recommended for production!`);
  }
  const wrap = ((_b$2 = global$1.ShadyDOM) === null || _b$2 === void 0 ? void 0 : _b$2.inUse) &&
      ((_c$1 = global$1.ShadyDOM) === null || _c$1 === void 0 ? void 0 : _c$1.noPatch) === true
      ? global$1.ShadyDOM.wrap
      : (node) => node;
  const trustedTypes = global$1.trustedTypes;
  /**
   * Our TrustedTypePolicy for HTML which is declared using the html template
   * tag function.
   *
   * That HTML is a developer-authored constant, and is parsed with innerHTML
   * before any untrusted expressions have been mixed in. Therefor it is
   * considered safe by construction.
   */
  const policy = trustedTypes
      ? trustedTypes.createPolicy('lit-html', {
          createHTML: (s) => s,
      })
      : undefined;
  const identityFunction = (value) => value;
  const noopSanitizer = (_node, _name, _type) => identityFunction;
  /** Sets the global sanitizer factory. */
  const setSanitizer = (newSanitizer) => {
      if (sanitizerFactoryInternal !== noopSanitizer) {
          throw new Error(`Attempted to overwrite existing lit-html security policy.` +
              ` setSanitizeDOMValueFactory should be called at most once.`);
      }
      sanitizerFactoryInternal = newSanitizer;
  };
  /**
   * Only used in internal tests, not a part of the public API.
   */
  const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
      sanitizerFactoryInternal = noopSanitizer;
  };
  const createSanitizer = (node, name, type) => {
      return sanitizerFactoryInternal(node, name, type);
  };
  // Added to an attribute name to mark the attribute as bound so we can find
  // it easily.
  const boundAttributeSuffix = '$lit$';
  // This marker is used in many syntactic positions in HTML, so it must be
  // a valid element name and attribute name. We don't support dynamic names (yet)
  // but this at least ensures that the parse tree is closer to the template
  // intention.
  const marker = `lit$${String(Math.random()).slice(9)}$`;
  // String used to tell if a comment is a marker comment
  const markerMatch = '?' + marker;
  // Text used to insert a comment marker node. We use processing instruction
  // syntax because it's slightly smaller, but parses as a comment node.
  const nodeMarker = `<${markerMatch}>`;
  const d = document;
  // Creates a dynamic marker. We never have to search for these in the DOM.
  const createMarker = () => d.createComment('');
  const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
  const isArray = Array.isArray;
  const isIterable = (value) => isArray(value) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === 'function';
  const SPACE_CHAR = `[ \t\n\f\r]`;
  const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
  const NAME_CHAR = `[^\\s"'>=/]`;
  // These regexes represent the five parsing states that we care about in the
  // Template's HTML scanner. They match the *end* of the state they're named
  // after.
  // Depending on the match, we transition to a new state. If there's no match,
  // we stay in the same state.
  // Note that the regexes are stateful. We utilize lastIndex and sync it
  // across the multiple regexes used. In addition to the five regexes below
  // we also dynamically create a regex to find the matching end tags for raw
  // text elements.
  /**
   * End of text is: `<` followed by:
   *   (comment start) or (tag) or (dynamic tag binding)
   */
  const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  const COMMENT_START = 1;
  const TAG_NAME = 2;
  const DYNAMIC_TAG_NAME = 3;
  const commentEndRegex = /-->/g;
  /**
   * Comments not started with <!--, like </{, can be ended by a single `>`
   */
  const comment2EndRegex = />/g;
  /**
   * The tagEnd regex matches the end of the "inside an opening" tag syntax
   * position. It either matches a `>`, an attribute-like sequence, or the end
   * of the string after a space (attribute-name position ending).
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#elements-attributes
   *
   * " \t\n\f\r" are HTML space characters:
   * https://infra.spec.whatwg.org/#ascii-whitespace
   *
   * So an attribute is:
   *  * The name: any character except a whitespace character, ("), ('), ">",
   *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */
  const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
  const ENTIRE_MATCH = 0;
  const ATTRIBUTE_NAME = 1;
  const SPACES_AND_EQUALS = 2;
  const QUOTE_CHAR = 3;
  const singleQuoteAttrEndRegex = /'/g;
  const doubleQuoteAttrEndRegex = /"/g;
  /**
   * Matches the raw text elements.
   *
   * Comments are not parsed within raw text elements, so we need to search their
   * text content for marker strings.
   */
  const rawTextElement = /^(?:script|style|textarea|title)$/i;
  /** TemplateResult types */
  const HTML_RESULT$1 = 1;
  const SVG_RESULT$1 = 2;
  // TemplatePart types
  // IMPORTANT: these must match the values in PartType
  const ATTRIBUTE_PART = 1;
  const CHILD_PART = 2;
  const PROPERTY_PART = 3;
  const BOOLEAN_ATTRIBUTE_PART = 4;
  const EVENT_PART = 5;
  const ELEMENT_PART = 6;
  const COMMENT_PART = 7;
  /**
   * Generates a template literal tag function that returns a TemplateResult with
   * the given result type.
   */
  const tag = (type) => (strings, ...values) => {
      // Warn against templates octal escape sequences
      // We do this here rather than in render so that the warning is closer to the
      // template definition.
      if (strings.some((s) => s === undefined)) {
          console.warn('Some template strings are undefined.\n' +
              'This is probably caused by illegal octal escape sequences.');
      }
      return {
          // This property needs to remain unminified.
          ['_$litType$']: type,
          strings,
          values,
      };
  };
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   *
   * ```ts
   * const header = (title: string) => html`<h1>${title}</h1>`;
   * ```
   *
   * The `html` tag returns a description of the DOM to render as a value. It is
   * lazy, meaning no work is done until the template is rendered. When rendering,
   * if a template comes from the same expression as a previously rendered result,
   * it's efficiently updated instead of replaced.
   */
  const html$1 = tag(HTML_RESULT$1);
  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  const noChange = Symbol.for('lit-noChange');
  /**
   * A sentinel value that signals a ChildPart to fully clear its content.
   *
   * ```ts
   * const button = html`${
   *  user.isAdmin
   *    ? html`<button>DELETE</button>`
   *    : nothing
   * }`;
   * ```
   *
   * Prefer using `nothing` over other falsy values as it provides a consistent
   * behavior between various expression binding contexts.
   *
   * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
   * same and render no nodes. In attribute expressions, `nothing` _removes_ the
   * attribute, while `undefined` and `null` will render an empty string. In
   * property expressions `nothing` becomes `undefined`.
   */
  const nothing = Symbol.for('lit-nothing');
  /**
   * The cache of prepared templates, keyed by the tagged TemplateStringsArray
   * and _not_ accounting for the specific template tag used. This means that
   * template tags cannot be dynamic - the must statically be one of html, svg,
   * or attr. This restriction simplifies the cache lookup, which is on the hot
   * path for rendering.
   */
  const templateCache = new WeakMap();
  const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */, null, false);
  let sanitizerFactoryInternal = noopSanitizer;
  function trustFromTemplateString(tsa, stringFromTSA) {
      // A security check to prevent spoofing of Lit template results.
      // In the future, we may be able to replace this with Array.isTemplateObject,
      // though we might need to make that check inside of the html and svg
      // functions, because precompiled templates don't come in as
      // TemplateStringArray objects.
      if (!Array.isArray(tsa) || !tsa.hasOwnProperty('raw')) {
          let message = 'invalid template strings array';
          {
              message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `
                  .trim()
                  .replace(/\n */g, '\n');
          }
          throw new Error(message);
      }
      return policy !== undefined
          ? policy.createHTML(stringFromTSA)
          : stringFromTSA;
  }
  /**
   * Returns an HTML string for the given TemplateStringsArray and result type
   * (HTML or SVG), along with the case-sensitive bound attribute names in
   * template order. The HTML contains comment markers denoting the `ChildPart`s
   * and suffixes on bound attributes denoting the `AttributeParts`.
   *
   * @param strings template strings array
   * @param type HTML or SVG
   * @return Array containing `[html, attrNames]` (array returned for terseness,
   *     to avoid object fields since this code is shared with non-minified SSR
   *     code)
   */
  const getTemplateHtml = (strings, type) => {
      // Insert makers into the template HTML to represent the position of
      // bindings. The following code scans the template strings to determine the
      // syntactic position of the bindings. They can be in text position, where
      // we insert an HTML comment, attribute value position, where we insert a
      // sentinel string and re-write the attribute name, or inside a tag where
      // we insert the sentinel string.
      const l = strings.length - 1;
      // Stores the case-sensitive bound attribute names in the order of their
      // parts. ElementParts are also reflected in this array as undefined
      // rather than a string, to disambiguate from attribute bindings.
      const attrNames = [];
      let html = type === SVG_RESULT$1 ? '<svg>' : '';
      // When we're inside a raw text tag (not it's text content), the regex
      // will still be tagRegex so we can find attributes, but will switch to
      // this regex when the tag ends.
      let rawTextEndRegex;
      // The current parsing state, represented as a reference to one of the
      // regexes
      let regex = textEndRegex;
      for (let i = 0; i < l; i++) {
          const s = strings[i];
          // The index of the end of the last attribute name. When this is
          // positive at end of a string, it means we're in an attribute value
          // position and need to rewrite the attribute name.
          // We also use a special value of -2 to indicate that we encountered
          // the end of a string in attribute name position.
          let attrNameEndIndex = -1;
          let attrName;
          let lastIndex = 0;
          let match;
          // The conditions in this loop handle the current parse state, and the
          // assignments to the `regex` variable are the state transitions.
          while (lastIndex < s.length) {
              // Make sure we start searching from where we previously left off
              regex.lastIndex = lastIndex;
              match = regex.exec(s);
              if (match === null) {
                  break;
              }
              lastIndex = regex.lastIndex;
              if (regex === textEndRegex) {
                  if (match[COMMENT_START] === '!--') {
                      regex = commentEndRegex;
                  }
                  else if (match[COMMENT_START] !== undefined) {
                      // We started a weird comment, like </{
                      regex = comment2EndRegex;
                  }
                  else if (match[TAG_NAME] !== undefined) {
                      if (rawTextElement.test(match[TAG_NAME])) {
                          // Record if we encounter a raw-text element. We'll switch to
                          // this regex at the end of the tag.
                          rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                      }
                      regex = tagEndRegex;
                  }
                  else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                      {
                          throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' +
                              'See https://lit.dev/docs/templates/expressions/#static-expressions');
                      }
                  }
              }
              else if (regex === tagEndRegex) {
                  if (match[ENTIRE_MATCH] === '>') {
                      // End of a tag. If we had started a raw-text element, use that
                      // regex
                      regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
                      // We may be ending an unquoted attribute value, so make sure we
                      // clear any pending attrNameEndIndex
                      attrNameEndIndex = -1;
                  }
                  else if (match[ATTRIBUTE_NAME] === undefined) {
                      // Attribute name position
                      attrNameEndIndex = -2;
                  }
                  else {
                      attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                      attrName = match[ATTRIBUTE_NAME];
                      regex =
                          match[QUOTE_CHAR] === undefined
                              ? tagEndRegex
                              : match[QUOTE_CHAR] === '"'
                                  ? doubleQuoteAttrEndRegex
                                  : singleQuoteAttrEndRegex;
                  }
              }
              else if (regex === doubleQuoteAttrEndRegex ||
                  regex === singleQuoteAttrEndRegex) {
                  regex = tagEndRegex;
              }
              else if (regex === commentEndRegex || regex === comment2EndRegex) {
                  regex = textEndRegex;
              }
              else {
                  // Not one of the five state regexes, so it must be the dynamically
                  // created raw text regex and we're at the close of that element.
                  regex = tagEndRegex;
                  rawTextEndRegex = undefined;
              }
          }
          {
              // If we have a attrNameEndIndex, which indicates that we should
              // rewrite the attribute name, assert that we're in a valid attribute
              // position - either in a tag, or a quoted attribute value.
              console.assert(attrNameEndIndex === -1 ||
                  regex === tagEndRegex ||
                  regex === singleQuoteAttrEndRegex ||
                  regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
          }
          // We have four cases:
          //  1. We're in text position, and not in a raw text element
          //     (regex === textEndRegex): insert a comment marker.
          //  2. We have a non-negative attrNameEndIndex which means we need to
          //     rewrite the attribute name to add a bound attribute suffix.
          //  3. We're at the non-first binding in a multi-binding attribute, use a
          //     plain marker.
          //  4. We're somewhere else inside the tag. If we're in attribute name
          //     position (attrNameEndIndex === -2), add a sequential suffix to
          //     generate a unique attribute name.
          // Detect a binding next to self-closing tag end and insert a space to
          // separate the marker from the tag end:
          const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
          html +=
              regex === textEndRegex
                  ? s + nodeMarker
                  : attrNameEndIndex >= 0
                      ? (attrNames.push(attrName),
                          s.slice(0, attrNameEndIndex) +
                              boundAttributeSuffix +
                              s.slice(attrNameEndIndex)) +
                          marker +
                          end
                      : s +
                          marker +
                          (attrNameEndIndex === -2 ? (attrNames.push(undefined), i) : end);
      }
      const htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT$1 ? '</svg>' : '');
      // Returned as an array for terseness
      return [trustFromTemplateString(strings, htmlResult), attrNames];
  };
  class Template {
      constructor(
      // This property needs to remain unminified.
      { strings, ['_$litType$']: type }, options) {
          this.parts = [];
          let node;
          let nodeIndex = 0;
          let attrNameIndex = 0;
          const partCount = strings.length - 1;
          const parts = this.parts;
          // Create template element
          const [html, attrNames] = getTemplateHtml(strings, type);
          this.el = Template.createElement(html, options);
          walker.currentNode = this.el.content;
          // Reparent SVG nodes into template root
          if (type === SVG_RESULT$1) {
              const content = this.el.content;
              const svgElement = content.firstChild;
              svgElement.remove();
              content.append(...svgElement.childNodes);
          }
          // Walk the template to find binding markers and create TemplateParts
          while ((node = walker.nextNode()) !== null && parts.length < partCount) {
              if (node.nodeType === 1) {
                  {
                      const tag = node.localName;
                      // Warn if `textarea` includes an expression and throw if `template`
                      // does since these are not supported. We do this by checking
                      // innerHTML for anything that looks like a marker. This catches
                      // cases like bindings in textarea there markers turn into text nodes.
                      if (/^(?:textarea|template)$/i.test(tag) &&
                          node.innerHTML.includes(marker)) {
                          const m = `Expressions are not supported inside \`${tag}\` ` +
                              `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
                              `information.`;
                          if (tag === 'template') {
                              throw new Error(m);
                          }
                          else
                              issueWarning$1('', m);
                      }
                  }
                  // TODO (justinfagnani): for attempted dynamic tag names, we don't
                  // increment the bindingIndex, and it'll be off by 1 in the element
                  // and off by two after it.
                  if (node.hasAttributes()) {
                      // We defer removing bound attributes because on IE we might not be
                      // iterating attributes in their template order, and would sometimes
                      // remove an attribute that we still need to create a part for.
                      const attrsToRemove = [];
                      for (const name of node.getAttributeNames()) {
                          // `name` is the name of the attribute we're iterating over, but not
                          // _necessarily_ the name of the attribute we will create a part
                          // for. They can be different in browsers that don't iterate on
                          // attributes in source order. In that case the attrNames array
                          // contains the attribute name we'll process next. We only need the
                          // attribute name here to know if we should process a bound attribute
                          // on this element.
                          if (name.endsWith(boundAttributeSuffix) ||
                              name.startsWith(marker)) {
                              const realName = attrNames[attrNameIndex++];
                              attrsToRemove.push(name);
                              if (realName !== undefined) {
                                  // Lowercase for case-sensitive SVG attributes like viewBox
                                  const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                                  const statics = value.split(marker);
                                  const m = /([.?@])?(.*)/.exec(realName);
                                  parts.push({
                                      type: ATTRIBUTE_PART,
                                      index: nodeIndex,
                                      name: m[2],
                                      strings: statics,
                                      ctor: m[1] === '.'
                                          ? PropertyPart
                                          : m[1] === '?'
                                              ? BooleanAttributePart
                                              : m[1] === '@'
                                                  ? EventPart
                                                  : AttributePart,
                                  });
                              }
                              else {
                                  parts.push({
                                      type: ELEMENT_PART,
                                      index: nodeIndex,
                                  });
                              }
                          }
                      }
                      for (const name of attrsToRemove) {
                          node.removeAttribute(name);
                      }
                  }
                  // TODO (justinfagnani): benchmark the regex against testing for each
                  // of the 3 raw text element names.
                  if (rawTextElement.test(node.tagName)) {
                      // For raw text elements we need to split the text content on
                      // markers, create a Text node for each segment, and create
                      // a TemplatePart for each marker.
                      const strings = node.textContent.split(marker);
                      const lastIndex = strings.length - 1;
                      if (lastIndex > 0) {
                          node.textContent = trustedTypes
                              ? trustedTypes.emptyScript
                              : '';
                          // Generate a new text node for each literal section
                          // These nodes are also used as the markers for node parts
                          // We can't use empty text nodes as markers because they're
                          // normalized when cloning in IE (could simplify when
                          // IE is no longer supported)
                          for (let i = 0; i < lastIndex; i++) {
                              node.append(strings[i], createMarker());
                              // Walk past the marker node we just added
                              walker.nextNode();
                              parts.push({ type: CHILD_PART, index: ++nodeIndex });
                          }
                          // Note because this marker is added after the walker's current
                          // node, it will be walked to in the outer loop (and ignored), so
                          // we don't need to adjust nodeIndex here
                          node.append(strings[lastIndex], createMarker());
                      }
                  }
              }
              else if (node.nodeType === 8) {
                  const data = node.data;
                  if (data === markerMatch) {
                      parts.push({ type: CHILD_PART, index: nodeIndex });
                  }
                  else {
                      let i = -1;
                      while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                          // Comment node has a binding marker inside, make an inactive part
                          // The binding won't work, but subsequent bindings will
                          parts.push({ type: COMMENT_PART, index: nodeIndex });
                          // Move to the end of the match
                          i += marker.length - 1;
                      }
                  }
              }
              nodeIndex++;
          }
          // We could set walker.currentNode to another node here to prevent a memory
          // leak, but every time we prepare a template, we immediately render it
          // and re-use the walker in new TemplateInstance._clone().
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'template prep',
              template: this,
              clonableTemplate: this.el,
              parts: this.parts,
              strings,
          });
      }
      // Overridden via `litHtmlPolyfillSupport` to provide platform support.
      /** @nocollapse */
      static createElement(html, _options) {
          const el = d.createElement('template');
          el.innerHTML = html;
          return el;
      }
  }
  function resolveDirective(part, value, parent = part, attributeIndex) {
      var _a, _b, _c;
      var _d;
      // Bail early if the value is explicitly noChange. Note, this means any
      // nested directive is still attached and is not run.
      if (value === noChange) {
          return value;
      }
      let currentDirective = attributeIndex !== undefined
          ? (_a = parent.__directives) === null || _a === void 0 ? void 0 : _a[attributeIndex]
          : parent.__directive;
      const nextDirectiveConstructor = isPrimitive(value)
          ? undefined
          : // This property needs to remain unminified.
              value['_$litDirective$'];
      if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
          // This property needs to remain unminified.
          (_b = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective['_$notifyDirectiveConnectionChanged']) === null || _b === void 0 ? void 0 : _b.call(currentDirective, false);
          if (nextDirectiveConstructor === undefined) {
              currentDirective = undefined;
          }
          else {
              currentDirective = new nextDirectiveConstructor(part);
              currentDirective._$initialize(part, parent, attributeIndex);
          }
          if (attributeIndex !== undefined) {
              ((_c = (_d = parent).__directives) !== null && _c !== void 0 ? _c : (_d.__directives = []))[attributeIndex] =
                  currentDirective;
          }
          else {
              parent.__directive = currentDirective;
          }
      }
      if (currentDirective !== undefined) {
          value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
      }
      return value;
  }
  /**
   * An updateable instance of a Template. Holds references to the Parts used to
   * update the template instance.
   */
  class TemplateInstance {
      constructor(template, parent) {
          this._$parts = [];
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$template = template;
          this._$parent = parent;
      }
      // Called by ChildPart parentNode getter
      get parentNode() {
          return this._$parent.parentNode;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      // This method is separate from the constructor because we need to return a
      // DocumentFragment and we don't want to hold onto it with an instance field.
      _clone(options) {
          var _a;
          const { el: { content }, parts: parts, } = this._$template;
          const fragment = ((_a = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a !== void 0 ? _a : d).importNode(content, true);
          walker.currentNode = fragment;
          let node = walker.nextNode();
          let nodeIndex = 0;
          let partIndex = 0;
          let templatePart = parts[0];
          while (templatePart !== undefined) {
              if (nodeIndex === templatePart.index) {
                  let part;
                  if (templatePart.type === CHILD_PART) {
                      part = new ChildPart(node, node.nextSibling, this, options);
                  }
                  else if (templatePart.type === ATTRIBUTE_PART) {
                      part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                  }
                  else if (templatePart.type === ELEMENT_PART) {
                      part = new ElementPart(node, this, options);
                  }
                  this._$parts.push(part);
                  templatePart = parts[++partIndex];
              }
              if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
                  node = walker.nextNode();
                  nodeIndex++;
              }
          }
          // We need to set the currentNode away from the cloned tree so that we
          // don't hold onto the tree even if the tree is detached and should be
          // freed.
          walker.currentNode = d;
          return fragment;
      }
      _update(values) {
          let i = 0;
          for (const part of this._$parts) {
              if (part !== undefined) {
                  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                      kind: 'set part',
                      part,
                      value: values[i],
                      valueIndex: i,
                      values,
                      templateInstance: this,
                  });
                  if (part.strings !== undefined) {
                      part._$setValue(values, part, i);
                      // The number of values the part consumes is part.strings.length - 1
                      // since values are in between template spans. We increment i by 1
                      // later in the loop, so increment it by part.strings.length - 2 here
                      i += part.strings.length - 2;
                  }
                  else {
                      part._$setValue(values[i]);
                  }
              }
              i++;
          }
      }
  }
  class ChildPart {
      constructor(startNode, endNode, parent, options) {
          var _a;
          this.type = CHILD_PART;
          this._$committedValue = nothing;
          // The following fields will be patched onto ChildParts when required by
          // AsyncDirective
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$startNode = startNode;
          this._$endNode = endNode;
          this._$parent = parent;
          this.options = options;
          // Note __isConnected is only ever accessed on RootParts (i.e. when there is
          // no _$parent); the value on a non-root-part is "don't care", but checking
          // for parent would be more code
          this.__isConnected = (_a = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a !== void 0 ? _a : true;
          {
              // Explicitly initialize for consistent class shape.
              this._textSanitizer = undefined;
          }
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          var _a, _b;
          // ChildParts that are not at the root should always be created with a
          // parent; only RootChildNode's won't, so they return the local isConnected
          // state
          return (_b = (_a = this._$parent) === null || _a === void 0 ? void 0 : _a._$isConnected) !== null && _b !== void 0 ? _b : this.__isConnected;
      }
      /**
       * The parent node into which the part renders its content.
       *
       * A ChildPart's content consists of a range of adjacent child nodes of
       * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
       * `.endNode`).
       *
       * - If both `.startNode` and `.endNode` are non-null, then the part's content
       * consists of all siblings between `.startNode` and `.endNode`, exclusively.
       *
       * - If `.startNode` is non-null but `.endNode` is null, then the part's
       * content consists of all siblings following `.startNode`, up to and
       * including the last child of `.parentNode`. If `.endNode` is non-null, then
       * `.startNode` will always be non-null.
       *
       * - If both `.endNode` and `.startNode` are null, then the part's content
       * consists of all child nodes of `.parentNode`.
       */
      get parentNode() {
          let parentNode = wrap(this._$startNode).parentNode;
          const parent = this._$parent;
          if (parent !== undefined &&
              (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11 /* Node.DOCUMENT_FRAGMENT */) {
              // If the parentNode is a DocumentFragment, it may be because the DOM is
              // still in the cloned fragment during initial render; if so, get the real
              // parentNode the part will be committed into by asking the parent.
              parentNode = parent.parentNode;
          }
          return parentNode;
      }
      /**
       * The part's leading marker node, if any. See `.parentNode` for more
       * information.
       */
      get startNode() {
          return this._$startNode;
      }
      /**
       * The part's trailing marker node, if any. See `.parentNode` for more
       * information.
       */
      get endNode() {
          return this._$endNode;
      }
      _$setValue(value, directiveParent = this) {
          var _a;
          if (this.parentNode === null) {
              throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
          }
          value = resolveDirective(this, value, directiveParent);
          if (isPrimitive(value)) {
              // Non-rendering child values. It's important that these do not render
              // empty text nodes to avoid issues with preventing default <slot>
              // fallback content.
              if (value === nothing || value == null || value === '') {
                  if (this._$committedValue !== nothing) {
                      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                          kind: 'commit nothing to child',
                          start: this._$startNode,
                          end: this._$endNode,
                          parent: this._$parent,
                          options: this.options,
                      });
                      this._$clear();
                  }
                  this._$committedValue = nothing;
              }
              else if (value !== this._$committedValue && value !== noChange) {
                  this._commitText(value);
              }
              // This property needs to remain unminified.
          }
          else if (value['_$litType$'] !== undefined) {
              this._commitTemplateResult(value);
          }
          else if (value.nodeType !== undefined) {
              if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.host) === value) {
                  this._commitText(`[probable mistake: rendered a template's host in itself ` +
                      `(commonly caused by writing \${this} in a template]`);
                  console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
                  return;
              }
              this._commitNode(value);
          }
          else if (isIterable(value)) {
              this._commitIterable(value);
          }
          else {
              // Fallback, will render the string representation
              this._commitText(value);
          }
      }
      _insert(node) {
          return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
      }
      _commitNode(value) {
          var _a;
          if (this._$committedValue !== value) {
              this._$clear();
              if (sanitizerFactoryInternal !== noopSanitizer) {
                  const parentNodeName = (_a = this._$startNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName;
                  if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                      let message = 'Forbidden';
                      {
                          if (parentNodeName === 'STYLE') {
                              message =
                                  `Lit does not support binding inside style nodes. ` +
                                      `This is a security risk, as style injection attacks can ` +
                                      `exfiltrate data and spoof UIs. ` +
                                      `Consider instead using css\`...\` literals ` +
                                      `to compose styles, and make do dynamic styling with ` +
                                      `css custom properties, ::parts, <slot>s, ` +
                                      `and by mutating the DOM rather than stylesheets.`;
                          }
                          else {
                              message =
                                  `Lit does not support binding inside script nodes. ` +
                                      `This is a security risk, as it could allow arbitrary ` +
                                      `code execution.`;
                          }
                      }
                      throw new Error(message);
                  }
              }
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'commit node',
                  start: this._$startNode,
                  parent: this._$parent,
                  value: value,
                  options: this.options,
              });
              this._$committedValue = this._insert(value);
          }
      }
      _commitText(value) {
          // If the committed value is a primitive it means we called _commitText on
          // the previous render, and we know that this._$startNode.nextSibling is a
          // Text node. We can now just replace the text content (.data) of the node.
          if (this._$committedValue !== nothing &&
              isPrimitive(this._$committedValue)) {
              const node = wrap(this._$startNode).nextSibling;
              {
                  if (this._textSanitizer === undefined) {
                      this._textSanitizer = createSanitizer(node, 'data', 'property');
                  }
                  value = this._textSanitizer(value);
              }
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'commit text',
                  node,
                  value,
                  options: this.options,
              });
              node.data = value;
          }
          else {
              {
                  const textNode = d.createTextNode('');
                  this._commitNode(textNode);
                  // When setting text content, for security purposes it matters a lot
                  // what the parent is. For example, <style> and <script> need to be
                  // handled with care, while <span> does not. So first we need to put a
                  // text node into the document, then we can sanitize its content.
                  if (this._textSanitizer === undefined) {
                      this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                  }
                  value = this._textSanitizer(value);
                  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                      kind: 'commit text',
                      node: textNode,
                      value,
                      options: this.options,
                  });
                  textNode.data = value;
              }
          }
          this._$committedValue = value;
      }
      _commitTemplateResult(result) {
          var _a;
          // This property needs to remain unminified.
          const { values, ['_$litType$']: type } = result;
          // If $litType$ is a number, result is a plain TemplateResult and we get
          // the template from the template cache. If not, result is a
          // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
          // to create the <template> element the first time we see it.
          const template = typeof type === 'number'
              ? this._$getTemplate(result)
              : (type.el === undefined &&
                  (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)),
                  type);
          if (((_a = this._$committedValue) === null || _a === void 0 ? void 0 : _a._$template) === template) {
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'template updating',
                  template,
                  instance: this._$committedValue,
                  parts: this._$committedValue._$parts,
                  options: this.options,
                  values,
              });
              this._$committedValue._update(values);
          }
          else {
              const instance = new TemplateInstance(template, this);
              const fragment = instance._clone(this.options);
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'template instantiated',
                  template,
                  instance,
                  parts: instance._$parts,
                  options: this.options,
                  fragment,
                  values,
              });
              instance._update(values);
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'template instantiated and updated',
                  template,
                  instance,
                  parts: instance._$parts,
                  options: this.options,
                  fragment,
                  values,
              });
              this._commitNode(fragment);
              this._$committedValue = instance;
          }
      }
      // Overridden via `litHtmlPolyfillSupport` to provide platform support.
      /** @internal */
      _$getTemplate(result) {
          let template = templateCache.get(result.strings);
          if (template === undefined) {
              templateCache.set(result.strings, (template = new Template(result)));
          }
          return template;
      }
      _commitIterable(value) {
          // For an Iterable, we create a new InstancePart per item, then set its
          // value to the item. This is a little bit of overhead for every item in
          // an Iterable, but it lets us recurse easily and efficiently update Arrays
          // of TemplateResults that will be commonly returned from expressions like:
          // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
          // If value is an array, then the previous render was of an
          // iterable and value will contain the ChildParts from the previous
          // render. If value is not an array, clear this part and make a new
          // array for ChildParts.
          if (!isArray(this._$committedValue)) {
              this._$committedValue = [];
              this._$clear();
          }
          // Lets us keep track of how many items we stamped so we can clear leftover
          // items from a previous render
          const itemParts = this._$committedValue;
          let partIndex = 0;
          let itemPart;
          for (const item of value) {
              if (partIndex === itemParts.length) {
                  // If no existing part, create a new one
                  // TODO (justinfagnani): test perf impact of always creating two parts
                  // instead of sharing parts between nodes
                  // https://github.com/lit/lit/issues/1266
                  itemParts.push((itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options)));
              }
              else {
                  // Reuse an existing part
                  itemPart = itemParts[partIndex];
              }
              itemPart._$setValue(item);
              partIndex++;
          }
          if (partIndex < itemParts.length) {
              // itemParts always have end nodes
              this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
              // Truncate the parts array so _value reflects the current state
              itemParts.length = partIndex;
          }
      }
      /**
       * Removes the nodes contained within this Part from the DOM.
       *
       * @param start Start node to clear from, for clearing a subset of the part's
       *     DOM (used when truncating iterables)
       * @param from  When `start` is specified, the index within the iterable from
       *     which ChildParts are being removed, used for disconnecting directives in
       *     those Parts.
       *
       * @internal
       */
      _$clear(start = wrap(this._$startNode).nextSibling, from) {
          var _a;
          (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, false, true, from);
          while (start && start !== this._$endNode) {
              const n = wrap(start).nextSibling;
              wrap(start).remove();
              start = n;
          }
      }
      /**
       * Implementation of RootPart's `isConnected`. Note that this metod
       * should only be called on `RootPart`s (the `ChildPart` returned from a
       * top-level `render()` call). It has no effect on non-root ChildParts.
       * @param isConnected Whether to set
       * @internal
       */
      setConnected(isConnected) {
          var _a;
          if (this._$parent === undefined) {
              this.__isConnected = isConnected;
              (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, isConnected);
          }
          else {
              throw new Error('part.setConnected() may only be called on a ' +
                  'RootPart returned from render().');
          }
      }
  }
  class AttributePart {
      constructor(element, name, strings, parent, options) {
          this.type = ATTRIBUTE_PART;
          /** @internal */
          this._$committedValue = nothing;
          /** @internal */
          this._$disconnectableChildren = undefined;
          this.element = element;
          this.name = name;
          this._$parent = parent;
          this.options = options;
          if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
              this._$committedValue = new Array(strings.length - 1).fill(new String());
              this.strings = strings;
          }
          else {
              this._$committedValue = nothing;
          }
          {
              this._sanitizer = undefined;
          }
      }
      get tagName() {
          return this.element.tagName;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      /**
       * Sets the value of this part by resolving the value from possibly multiple
       * values and static strings and committing it to the DOM.
       * If this part is single-valued, `this._strings` will be undefined, and the
       * method will be called with a single value argument. If this part is
       * multi-value, `this._strings` will be defined, and the method is called
       * with the value array of the part's owning TemplateInstance, and an offset
       * into the value array from which the values should be read.
       * This method is overloaded this way to eliminate short-lived array slices
       * of the template instance values, and allow a fast-path for single-valued
       * parts.
       *
       * @param value The part value, or an array of values for multi-valued parts
       * @param valueIndex the index to start reading values from. `undefined` for
       *   single-valued parts
       * @param noCommit causes the part to not commit its value to the DOM. Used
       *   in hydration to prime attribute parts with their first-rendered value,
       *   but not set the attribute, and in SSR to no-op the DOM operation and
       *   capture the value for serialization.
       *
       * @internal
       */
      _$setValue(value, directiveParent = this, valueIndex, noCommit) {
          const strings = this.strings;
          // Whether any of the values has changed, for dirty-checking
          let change = false;
          if (strings === undefined) {
              // Single-value binding case
              value = resolveDirective(this, value, directiveParent, 0);
              change =
                  !isPrimitive(value) ||
                      (value !== this._$committedValue && value !== noChange);
              if (change) {
                  this._$committedValue = value;
              }
          }
          else {
              // Interpolation case
              const values = value;
              value = strings[0];
              let i, v;
              for (i = 0; i < strings.length - 1; i++) {
                  v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                  if (v === noChange) {
                      // If the user-provided value is `noChange`, use the previous value
                      v = this._$committedValue[i];
                  }
                  change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
                  if (v === nothing) {
                      value = nothing;
                  }
                  else if (value !== nothing) {
                      value += (v !== null && v !== void 0 ? v : '') + strings[i + 1];
                  }
                  // We always record each value, even if one is `nothing`, for future
                  // change detection.
                  this._$committedValue[i] = v;
              }
          }
          if (change && !noCommit) {
              this._commitValue(value);
          }
      }
      /** @internal */
      _commitValue(value) {
          if (value === nothing) {
              wrap(this.element).removeAttribute(this.name);
          }
          else {
              {
                  if (this._sanitizer === undefined) {
                      this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                  }
                  value = this._sanitizer(value !== null && value !== void 0 ? value : '');
              }
              debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                  kind: 'commit attribute',
                  element: this.element,
                  name: this.name,
                  value,
                  options: this.options,
              });
              wrap(this.element).setAttribute(this.name, (value !== null && value !== void 0 ? value : ''));
          }
      }
  }
  class PropertyPart extends AttributePart {
      constructor() {
          super(...arguments);
          this.type = PROPERTY_PART;
      }
      /** @internal */
      _commitValue(value) {
          {
              if (this._sanitizer === undefined) {
                  this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
              }
              value = this._sanitizer(value);
          }
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'commit property',
              element: this.element,
              name: this.name,
              value,
              options: this.options,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.element[this.name] = value === nothing ? undefined : value;
      }
  }
  // Temporary workaround for https://crbug.com/993268
  // Currently, any attribute starting with "on" is considered to be a
  // TrustedScript source. Such boolean attributes must be set to the equivalent
  // trusted emptyScript value.
  const emptyStringForBooleanAttribute = trustedTypes
      ? trustedTypes.emptyScript
      : '';
  class BooleanAttributePart extends AttributePart {
      constructor() {
          super(...arguments);
          this.type = BOOLEAN_ATTRIBUTE_PART;
      }
      /** @internal */
      _commitValue(value) {
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'commit boolean attribute',
              element: this.element,
              name: this.name,
              value: !!(value && value !== nothing),
              options: this.options,
          });
          if (value && value !== nothing) {
              wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute);
          }
          else {
              wrap(this.element).removeAttribute(this.name);
          }
      }
  }
  class EventPart extends AttributePart {
      constructor(element, name, strings, parent, options) {
          super(element, name, strings, parent, options);
          this.type = EVENT_PART;
          if (this.strings !== undefined) {
              throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` +
                  'invalid content. Event listeners in templates must have exactly ' +
                  'one expression and no surrounding text.');
          }
      }
      // EventPart does not use the base _$setValue/_resolveValue implementation
      // since the dirty checking is more complex
      /** @internal */
      _$setValue(newListener, directiveParent = this) {
          var _a;
          newListener =
              (_a = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a !== void 0 ? _a : nothing;
          if (newListener === noChange) {
              return;
          }
          const oldListener = this._$committedValue;
          // If the new value is nothing or any options change we have to remove the
          // part as a listener.
          const shouldRemoveListener = (newListener === nothing && oldListener !== nothing) ||
              newListener.capture !==
                  oldListener.capture ||
              newListener.once !==
                  oldListener.once ||
              newListener.passive !==
                  oldListener.passive;
          // If the new value is not nothing and we removed the listener, we have
          // to add the part as a listener.
          const shouldAddListener = newListener !== nothing &&
              (oldListener === nothing || shouldRemoveListener);
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'commit event listener',
              element: this.element,
              name: this.name,
              value: newListener,
              options: this.options,
              removeListener: shouldRemoveListener,
              addListener: shouldAddListener,
              oldListener,
          });
          if (shouldRemoveListener) {
              this.element.removeEventListener(this.name, this, oldListener);
          }
          if (shouldAddListener) {
              // Beware: IE11 and Chrome 41 don't like using the listener as the
              // options object. Figure out how to deal w/ this in IE11 - maybe
              // patch addEventListener?
              this.element.addEventListener(this.name, this, newListener);
          }
          this._$committedValue = newListener;
      }
      handleEvent(event) {
          var _a, _b;
          if (typeof this._$committedValue === 'function') {
              this._$committedValue.call((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : this.element, event);
          }
          else {
              this._$committedValue.handleEvent(event);
          }
      }
  }
  class ElementPart {
      constructor(element, parent, options) {
          this.element = element;
          this.type = ELEMENT_PART;
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$parent = parent;
          this.options = options;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      _$setValue(value) {
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'commit to element binding',
              element: this.element,
              value,
              options: this.options,
          });
          resolveDirective(this, value);
      }
  }
  // Apply polyfills if available
  const polyfillSupport$1 = global$1.litHtmlPolyfillSupportDevMode
      ;
  polyfillSupport$1 === null || polyfillSupport$1 === void 0 ? void 0 : polyfillSupport$1(Template, ChildPart);
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for lit-html usage.
  ((_d = global$1.litHtmlVersions) !== null && _d !== void 0 ? _d : (global$1.litHtmlVersions = [])).push('2.8.0');
  if (global$1.litHtmlVersions.length > 1) {
      issueWarning$1('multiple-versions', `Multiple versions of Lit loaded. ` +
          `Loading multiple versions is not recommended.`);
  }
  /**
   * Renders a value, usually a lit-html TemplateResult, to the container.
   *
   * This example renders the text "Hello, Zoe!" inside a paragraph tag, appending
   * it to the container `document.body`.
   *
   * ```js
   * import {html, render} from 'lit';
   *
   * const name = "Zoe";
   * render(html`<p>Hello, ${name}!</p>`, document.body);
   * ```
   *
   * @param value Any [renderable
   *   value](https://lit.dev/docs/templates/expressions/#child-expressions),
   *   typically a {@linkcode TemplateResult} created by evaluating a template tag
   *   like {@linkcode html} or {@linkcode svg}.
   * @param container A DOM container to render to. The first render will append
   *   the rendered value to the container, and subsequent renders will
   *   efficiently update the rendered value if the same result type was
   *   previously rendered there.
   * @param options See {@linkcode RenderOptions} for options documentation.
   * @see
   * {@link https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates| Rendering Lit HTML Templates}
   */
  const render = (value, container, options) => {
      var _a, _b;
      if (container == null) {
          // Give a clearer error message than
          //     Uncaught TypeError: Cannot read properties of null (reading
          //     '_$litPart$')
          // which reads like an internal Lit error.
          throw new TypeError(`The container to render into may not be ${container}`);
      }
      const renderId = debugLogRenderId++ ;
      const partOwnerNode = (_a = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a !== void 0 ? _a : container;
      // This property needs to remain unminified.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let part = partOwnerNode['_$litPart$'];
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'begin render',
          id: renderId,
          value,
          container,
          options,
          part,
      });
      if (part === undefined) {
          const endNode = (_b = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b !== void 0 ? _b : null;
          // This property needs to remain unminified.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options !== null && options !== void 0 ? options : {});
      }
      part._$setValue(value);
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'end render',
          id: renderId,
          value,
          container,
          options,
          part,
      });
      return part;
  };
  {
      render.setSanitizer = setSanitizer;
      render.createSanitizer = createSanitizer;
      {
          render._testOnlyClearSanitizerFactoryDoNotCallOrElse =
              _testOnlyClearSanitizerFactoryDoNotCallOrElse;
      }
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var _a$2, _b$1, _c;
  let issueWarning;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = ((_a$2 = globalThis.litIssuedWarnings) !== null && _a$2 !== void 0 ? _a$2 : (globalThis.litIssuedWarnings = new Set()));
      // Issue a warning, if we haven't already.
      issueWarning = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
  }
  /**
   * Base element class that manages element properties and attributes, and
   * renders a lit-html template.
   *
   * To define a component, subclass `LitElement` and implement a
   * `render` method to provide the component's template. Define properties
   * using the {@linkcode LitElement.properties properties} property or the
   * {@linkcode property} decorator.
   */
  class LitElement extends ReactiveElement {
      constructor() {
          super(...arguments);
          /**
           * @category rendering
           */
          this.renderOptions = { host: this };
          this.__childPart = undefined;
      }
      /**
       * @category rendering
       */
      createRenderRoot() {
          var _a;
          var _b;
          const renderRoot = super.createRenderRoot();
          // When adoptedStyleSheets are shimmed, they are inserted into the
          // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
          // any styles in Lit content render before adoptedStyleSheets. This is
          // important so that adoptedStyleSheets have precedence over styles in
          // the shadowRoot.
          (_a = (_b = this.renderOptions).renderBefore) !== null && _a !== void 0 ? _a : (_b.renderBefore = renderRoot.firstChild);
          return renderRoot;
      }
      /**
       * Updates the element. This method reflects property values to attributes
       * and calls `render` to render DOM via lit-html. Setting properties inside
       * this method will *not* trigger another update.
       * @param changedProperties Map of changed properties with old values
       * @category updates
       */
      update(changedProperties) {
          // Setting properties in `render` should not trigger an update. Since
          // updates are allowed after super.update, it's important to call `render`
          // before that.
          const value = this.render();
          if (!this.hasUpdated) {
              this.renderOptions.isConnected = this.isConnected;
          }
          super.update(changedProperties);
          this.__childPart = render(value, this.renderRoot, this.renderOptions);
      }
      /**
       * Invoked when the component is added to the document's DOM.
       *
       * In `connectedCallback()` you should setup tasks that should only occur when
       * the element is connected to the document. The most common of these is
       * adding event listeners to nodes external to the element, like a keydown
       * event handler added to the window.
       *
       * ```ts
       * connectedCallback() {
       *   super.connectedCallback();
       *   addEventListener('keydown', this._handleKeydown);
       * }
       * ```
       *
       * Typically, anything done in `connectedCallback()` should be undone when the
       * element is disconnected, in `disconnectedCallback()`.
       *
       * @category lifecycle
       */
      connectedCallback() {
          var _a;
          super.connectedCallback();
          (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(true);
      }
      /**
       * Invoked when the component is removed from the document's DOM.
       *
       * This callback is the main signal to the element that it may no longer be
       * used. `disconnectedCallback()` should ensure that nothing is holding a
       * reference to the element (such as event listeners added to nodes external
       * to the element), so that it is free to be garbage collected.
       *
       * ```ts
       * disconnectedCallback() {
       *   super.disconnectedCallback();
       *   window.removeEventListener('keydown', this._handleKeydown);
       * }
       * ```
       *
       * An element may be re-connected after being disconnected.
       *
       * @category lifecycle
       */
      disconnectedCallback() {
          var _a;
          super.disconnectedCallback();
          (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(false);
      }
      /**
       * Invoked on each update to perform rendering tasks. This method may return
       * any value renderable by lit-html's `ChildPart` - typically a
       * `TemplateResult`. Setting properties inside this method will *not* trigger
       * the element to update.
       * @category rendering
       */
      render() {
          return noChange;
      }
  }
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See @lit/reactive-element for more information.
   */
  LitElement['finalized'] = true;
  // This property needs to remain unminified.
  LitElement['_$litElement$'] = true;
  // Install hydration if available
  (_b$1 = globalThis.litElementHydrateSupport) === null || _b$1 === void 0 ? void 0 : _b$1.call(globalThis, { LitElement });
  // Apply polyfills if available
  const polyfillSupport = globalThis.litElementPolyfillSupportDevMode
      ;
  polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ LitElement });
  // DEV mode warnings
  {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      // Note, for compatibility with closure compilation, this access
      // needs to be as a string property index.
      LitElement['finalize'] = function () {
          const finalized = ReactiveElement.finalize.call(this);
          if (!finalized) {
              return false;
          }
          const warnRemovedOrRenamed = (obj, name, renamed = false) => {
              if (obj.hasOwnProperty(name)) {
                  const ctorName = (typeof obj === 'function' ? obj : obj.constructor)
                      .name;
                  issueWarning(renamed ? 'renamed-api' : 'removed-api', `\`${name}\` is implemented on class ${ctorName}. It ` +
                      `has been ${renamed ? 'renamed' : 'removed'} ` +
                      `in this version of LitElement.`);
              }
          };
          warnRemovedOrRenamed(this, 'render');
          warnRemovedOrRenamed(this, 'getStyles', true);
          warnRemovedOrRenamed(this.prototype, 'adoptStyles');
          return true;
      };
      /* eslint-enable @typescript-eslint/no-explicit-any */
  }
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for LitElement usage.
  ((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : (globalThis.litElementVersions = [])).push('3.3.2');
  if (globalThis.litElementVersions.length > 1) {
      issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
          `is not recommended.`);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const standardProperty = (options, element) => {
      // When decorating an accessor, pass it through and add property metadata.
      // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
      // stomp over the user's accessor.
      if (element.kind === 'method' &&
          element.descriptor &&
          !('value' in element.descriptor)) {
          return {
              ...element,
              finisher(clazz) {
                  clazz.createProperty(element.key, options);
              },
          };
      }
      else {
          // createProperty() takes care of defining the property, but we still
          // must return some kind of descriptor, so return a descriptor for an
          // unused prototype field. The finisher calls createProperty().
          return {
              kind: 'field',
              key: Symbol(),
              placement: 'own',
              descriptor: {},
              // store the original key so subsequent decorators have access to it.
              originalKey: element.key,
              // When @babel/plugin-proposal-decorators implements initializers,
              // do this instead of the initializer below. See:
              // https://github.com/babel/babel/issues/9260 extras: [
              //   {
              //     kind: 'initializer',
              //     placement: 'own',
              //     initializer: descriptor.initializer,
              //   }
              // ],
              initializer() {
                  if (typeof element.initializer === 'function') {
                      this[element.key] = element.initializer.call(this);
                  }
              },
              finisher(clazz) {
                  clazz.createProperty(element.key, options);
              },
          };
      }
  };
  const legacyProperty = (options, proto, name) => {
      proto.constructor.createProperty(name, options);
  };
  /**
   * A property decorator which creates a reactive property that reflects a
   * corresponding attribute value. When a decorated property is set
   * the element will update and render. A {@linkcode PropertyDeclaration} may
   * optionally be supplied to configure property features.
   *
   * This decorator should only be used for public fields. As public fields,
   * properties should be considered as primarily settable by element users,
   * either via attribute or the property itself.
   *
   * Generally, properties that are changed by the element should be private or
   * protected fields and should use the {@linkcode state} decorator.
   *
   * However, sometimes element code does need to set a public property. This
   * should typically only be done in response to user interaction, and an event
   * should be fired informing the user; for example, a checkbox sets its
   * `checked` property when clicked and fires a `changed` event. Mutating public
   * properties should typically not be done for non-primitive (object or array)
   * properties. In other cases when an element needs to manage state, a private
   * property decorated via the {@linkcode state} decorator should be used. When
   * needed, state properties can be initialized via public properties to
   * facilitate complex interactions.
   *
   * ```ts
   * class MyElement {
   *   @property({ type: Boolean })
   *   clicked = false;
   * }
   * ```
   * @category Decorator
   * @ExportDecoratedItems
   */
  function property(options) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (protoOrDescriptor, name) => name !== undefined
          ? legacyProperty(options, protoOrDescriptor, name)
          : standardProperty(options, protoOrDescriptor);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Declares a private or protected reactive property that still triggers
   * updates to the element when it changes. It does not reflect from the
   * corresponding attribute.
   *
   * Properties declared this way must not be used from HTML or HTML templating
   * systems, they're solely for properties internal to the element. These
   * properties may be renamed by optimization tools like closure compiler.
   * @category Decorator
   */
  function state(options) {
      return property({
          ...options,
          state: true,
      });
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Helper for decorating a property that is compatible with both TypeScript
   * and Babel decorators. The optional `finisher` can be used to perform work on
   * the class. The optional `descriptor` should return a PropertyDescriptor
   * to install for the given property.
   *
   * @param finisher {function} Optional finisher method; receives the element
   * constructor and property key as arguments and has no return value.
   * @param descriptor {function} Optional descriptor method; receives the
   * property key as an argument and returns a property descriptor to define for
   * the given property.
   * @returns {ClassElement|void}
   */
  const decorateProperty = ({ finisher, descriptor, }) => (protoOrDescriptor, name
  // Note TypeScript requires the return type to be `void|any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => {
      var _a;
      // TypeScript / Babel legacy mode
      if (name !== undefined) {
          const ctor = protoOrDescriptor
              .constructor;
          if (descriptor !== undefined) {
              Object.defineProperty(protoOrDescriptor, name, descriptor(name));
          }
          finisher === null || finisher === void 0 ? void 0 : finisher(ctor, name);
          // Babel standard mode
      }
      else {
          // Note, the @property decorator saves `key` as `originalKey`
          // so try to use it here.
          const key = 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (_a = protoOrDescriptor.originalKey) !== null && _a !== void 0 ? _a : protoOrDescriptor.key;
          const info = descriptor != undefined
              ? {
                  kind: 'method',
                  placement: 'prototype',
                  key,
                  descriptor: descriptor(protoOrDescriptor.key),
              }
              : { ...protoOrDescriptor, key };
          if (finisher != undefined) {
              info.finisher = function (ctor) {
                  finisher(ctor, key);
              };
          }
          return info;
      }
  };

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * A property decorator that converts a class property into a getter that
   * executes a querySelector on the element's renderRoot.
   *
   * @param selector A DOMString containing one or more selectors to match.
   * @param cache An optional boolean which when true performs the DOM query only
   *     once and caches the result.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
   *
   * ```ts
   * class MyElement {
   *   @query('#first')
   *   first: HTMLDivElement;
   *
   *   render() {
   *     return html`
   *       <div id="first"></div>
   *       <div id="second"></div>
   *     `;
   *   }
   * }
   * ```
   * @category Decorator
   */
  function query(selector, cache) {
      return decorateProperty({
          descriptor: (name) => {
              const descriptor = {
                  get() {
                      var _a, _b;
                      return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector)) !== null && _b !== void 0 ? _b : null;
                  },
                  enumerable: true,
                  configurable: true,
              };
              if (cache) {
                  const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
                  descriptor.get = function () {
                      var _a, _b;
                      if (this[key] === undefined) {
                          this[key] = (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector)) !== null && _b !== void 0 ? _b : null;
                      }
                      return this[key];
                  };
              }
              return descriptor;
          },
      });
  }

  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var _a$1;
  const global = window;
  /**
   * A tiny module scoped polyfill for HTMLSlotElement.assignedElements.
   */
  ((_a$1 = global.HTMLSlotElement) === null || _a$1 === void 0 ? void 0 : _a$1.prototype.assignedElements) != null
      ? (slot, opts) => slot.assignedElements(opts)
      : (slot, opts) => slot
          .assignedNodes(opts)
          .filter((node) => node.nodeType === Node.ELEMENT_NODE);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const PartType = {
      ATTRIBUTE: 1,
      CHILD: 2,
      PROPERTY: 3,
      BOOLEAN_ATTRIBUTE: 4,
      EVENT: 5,
      ELEMENT: 6,
  };
  /**
   * Creates a user-facing directive function from a Directive class. This
   * function has the same parameters as the directive's render() method.
   */
  const directive = (c) => (...values) => ({
      // This property needs to remain unminified.
      ['_$litDirective$']: c,
      values,
  });
  /**
   * Base class for creating custom directives. Users should extend this class,
   * implement `render` and/or `update`, and then pass their subclass to
   * `directive`.
   */
  class Directive {
      constructor(_partInfo) { }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      /** @internal */
      _$initialize(part, parent, attributeIndex) {
          this.__part = part;
          this._$parent = parent;
          this.__attributeIndex = attributeIndex;
      }
      /** @internal */
      _$resolve(part, props) {
          return this.update(part, props);
      }
      update(_part, props) {
          return this.render(...props);
      }
  }

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  class ClassMapDirective extends Directive {
      constructor(partInfo) {
          var _a;
          super(partInfo);
          if (partInfo.type !== PartType.ATTRIBUTE ||
              partInfo.name !== 'class' ||
              ((_a = partInfo.strings) === null || _a === void 0 ? void 0 : _a.length) > 2) {
              throw new Error('`classMap()` can only be used in the `class` attribute ' +
                  'and must be the only part in the attribute.');
          }
      }
      render(classInfo) {
          // Add spaces to ensure separation from static classes
          return (' ' +
              Object.keys(classInfo)
                  .filter((key) => classInfo[key])
                  .join(' ') +
              ' ');
      }
      update(part, [classInfo]) {
          var _a, _b;
          // Remember dynamic classes on the first render
          if (this._previousClasses === undefined) {
              this._previousClasses = new Set();
              if (part.strings !== undefined) {
                  this._staticClasses = new Set(part.strings
                      .join(' ')
                      .split(/\s/)
                      .filter((s) => s !== ''));
              }
              for (const name in classInfo) {
                  if (classInfo[name] && !((_a = this._staticClasses) === null || _a === void 0 ? void 0 : _a.has(name))) {
                      this._previousClasses.add(name);
                  }
              }
              return this.render(classInfo);
          }
          const classList = part.element.classList;
          // Remove old classes that no longer apply
          // We use forEach() instead of for-of so that we don't require down-level
          // iteration.
          this._previousClasses.forEach((name) => {
              if (!(name in classInfo)) {
                  classList.remove(name);
                  this._previousClasses.delete(name);
              }
          });
          // Add or remove classes based on their classMap value
          for (const name in classInfo) {
              // We explicitly want a loose truthy check of `value` because it seems
              // more convenient that '' and 0 are skipped.
              const value = !!classInfo[name];
              if (value !== this._previousClasses.has(name) &&
                  !((_b = this._staticClasses) === null || _b === void 0 ? void 0 : _b.has(name))) {
                  if (value) {
                      classList.add(name);
                      this._previousClasses.add(name);
                  }
                  else {
                      classList.remove(name);
                      this._previousClasses.delete(name);
                  }
              }
          }
          return noChange;
      }
  }
  /**
   * A directive that applies dynamic CSS classes.
   *
   * This must be used in the `class` attribute and must be the only part used in
   * the attribute. It takes each property in the `classInfo` argument and adds
   * the property name to the element's `classList` if the property value is
   * truthy; if the property value is falsey, the property name is removed from
   * the element's `class`.
   *
   * For example `{foo: bar}` applies the class `foo` if the value of `bar` is
   * truthy.
   *
   * @param classInfo
   */
  const classMap = directive(ClassMapDirective);

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var _a, _b;
  ((_a = window.ShadyDOM) === null || _a === void 0 ? void 0 : _a.inUse) &&
      ((_b = window.ShadyDOM) === null || _b === void 0 ? void 0 : _b.noPatch) === true
      ? window.ShadyDOM.wrap
      : (node) => node;
  /**
   * Tests whether a part has only a single-expression with no strings to
   * interpolate between.
   *
   * Only AttributePart and PropertyPart can have multiple expressions.
   * Multi-expression parts have a `strings` property and single-expression
   * parts do not.
   */
  const isSingleExpression = (part) => part.strings === undefined;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Recursively walks down the tree of Parts/TemplateInstances/Directives to set
   * the connected state of directives and run `disconnected`/ `reconnected`
   * callbacks.
   *
   * @return True if there were children to disconnect; false otherwise
   */
  const notifyChildrenConnectedChanged = (parent, isConnected) => {
      var _a, _b;
      const children = parent._$disconnectableChildren;
      if (children === undefined) {
          return false;
      }
      for (const obj of children) {
          // The existence of `_$notifyDirectiveConnectionChanged` is used as a "brand" to
          // disambiguate AsyncDirectives from other DisconnectableChildren
          // (as opposed to using an instanceof check to know when to call it); the
          // redundancy of "Directive" in the API name is to avoid conflicting with
          // `_$notifyConnectionChanged`, which exists `ChildParts` which are also in
          // this list
          // Disconnect Directive (and any nested directives contained within)
          // This property needs to remain unminified.
          (_b = (_a = obj)['_$notifyDirectiveConnectionChanged']) === null || _b === void 0 ? void 0 : _b.call(_a, isConnected, false);
          // Disconnect Part/TemplateInstance
          notifyChildrenConnectedChanged(obj, isConnected);
      }
      return true;
  };
  /**
   * Removes the given child from its parent list of disconnectable children, and
   * if the parent list becomes empty as a result, removes the parent from its
   * parent, and so forth up the tree when that causes subsequent parent lists to
   * become empty.
   */
  const removeDisconnectableFromParent = (obj) => {
      let parent, children;
      do {
          if ((parent = obj._$parent) === undefined) {
              break;
          }
          children = parent._$disconnectableChildren;
          children.delete(obj);
          obj = parent;
      } while ((children === null || children === void 0 ? void 0 : children.size) === 0);
  };
  const addDisconnectableToParent = (obj) => {
      // Climb the parent tree, creating a sparse tree of children needing
      // disconnection
      for (let parent; (parent = obj._$parent); obj = parent) {
          let children = parent._$disconnectableChildren;
          if (children === undefined) {
              parent._$disconnectableChildren = children = new Set();
          }
          else if (children.has(obj)) {
              // Once we've reached a parent that already contains this child, we
              // can short-circuit
              break;
          }
          children.add(obj);
          installDisconnectAPI(parent);
      }
  };
  /**
   * Changes the parent reference of the ChildPart, and updates the sparse tree of
   * Disconnectable children accordingly.
   *
   * Note, this method will be patched onto ChildPart instances and called from
   * the core code when parts are moved between different parents.
   */
  function reparentDisconnectables(newParent) {
      if (this._$disconnectableChildren !== undefined) {
          removeDisconnectableFromParent(this);
          this._$parent = newParent;
          addDisconnectableToParent(this);
      }
      else {
          this._$parent = newParent;
      }
  }
  /**
   * Sets the connected state on any directives contained within the committed
   * value of this part (i.e. within a TemplateInstance or iterable of
   * ChildParts) and runs their `disconnected`/`reconnected`s, as well as within
   * any directives stored on the ChildPart (when `valueOnly` is false).
   *
   * `isClearingValue` should be passed as `true` on a top-level part that is
   * clearing itself, and not as a result of recursively disconnecting directives
   * as part of a `clear` operation higher up the tree. This both ensures that any
   * directive on this ChildPart that produced a value that caused the clear
   * operation is not disconnected, and also serves as a performance optimization
   * to avoid needless bookkeeping when a subtree is going away; when clearing a
   * subtree, only the top-most part need to remove itself from the parent.
   *
   * `fromPartIndex` is passed only in the case of a partial `_clear` running as a
   * result of truncating an iterable.
   *
   * Note, this method will be patched onto ChildPart instances and called from the
   * core code when parts are cleared or the connection state is changed by the
   * user.
   */
  function notifyChildPartConnectedChanged(isConnected, isClearingValue = false, fromPartIndex = 0) {
      const value = this._$committedValue;
      const children = this._$disconnectableChildren;
      if (children === undefined || children.size === 0) {
          return;
      }
      if (isClearingValue) {
          if (Array.isArray(value)) {
              // Iterable case: Any ChildParts created by the iterable should be
              // disconnected and removed from this ChildPart's disconnectable
              // children (starting at `fromPartIndex` in the case of truncation)
              for (let i = fromPartIndex; i < value.length; i++) {
                  notifyChildrenConnectedChanged(value[i], false);
                  removeDisconnectableFromParent(value[i]);
              }
          }
          else if (value != null) {
              // TemplateInstance case: If the value has disconnectable children (will
              // only be in the case that it is a TemplateInstance), we disconnect it
              // and remove it from this ChildPart's disconnectable children
              notifyChildrenConnectedChanged(value, false);
              removeDisconnectableFromParent(value);
          }
      }
      else {
          notifyChildrenConnectedChanged(this, isConnected);
      }
  }
  /**
   * Patches disconnection API onto ChildParts.
   */
  const installDisconnectAPI = (obj) => {
      var _a, _b;
      var _c, _d;
      if (obj.type == PartType.CHILD) {
          (_a = (_c = obj)._$notifyConnectionChanged) !== null && _a !== void 0 ? _a : (_c._$notifyConnectionChanged = notifyChildPartConnectedChanged);
          (_b = (_d = obj)._$reparentDisconnectables) !== null && _b !== void 0 ? _b : (_d._$reparentDisconnectables = reparentDisconnectables);
      }
  };
  /**
   * An abstract `Directive` base class whose `disconnected` method will be
   * called when the part containing the directive is cleared as a result of
   * re-rendering, or when the user calls `part.setConnected(false)` on
   * a part that was previously rendered containing the directive (as happens
   * when e.g. a LitElement disconnects from the DOM).
   *
   * If `part.setConnected(true)` is subsequently called on a
   * containing part, the directive's `reconnected` method will be called prior
   * to its next `update`/`render` callbacks. When implementing `disconnected`,
   * `reconnected` should also be implemented to be compatible with reconnection.
   *
   * Note that updates may occur while the directive is disconnected. As such,
   * directives should generally check the `this.isConnected` flag during
   * render/update to determine whether it is safe to subscribe to resources
   * that may prevent garbage collection.
   */
  class AsyncDirective extends Directive {
      constructor() {
          super(...arguments);
          // @internal
          this._$disconnectableChildren = undefined;
      }
      /**
       * Initialize the part with internal fields
       * @param part
       * @param parent
       * @param attributeIndex
       */
      _$initialize(part, parent, attributeIndex) {
          super._$initialize(part, parent, attributeIndex);
          addDisconnectableToParent(this);
          this.isConnected = part._$isConnected;
      }
      // This property needs to remain unminified.
      /**
       * Called from the core code when a directive is going away from a part (in
       * which case `shouldRemoveFromParent` should be true), and from the
       * `setChildrenConnected` helper function when recursively changing the
       * connection state of a tree (in which case `shouldRemoveFromParent` should
       * be false).
       *
       * @param isConnected
       * @param isClearingDirective - True when the directive itself is being
       *     removed; false when the tree is being disconnected
       * @internal
       */
      ['_$notifyDirectiveConnectionChanged'](isConnected, isClearingDirective = true) {
          var _a, _b;
          if (isConnected !== this.isConnected) {
              this.isConnected = isConnected;
              if (isConnected) {
                  (_a = this.reconnected) === null || _a === void 0 ? void 0 : _a.call(this);
              }
              else {
                  (_b = this.disconnected) === null || _b === void 0 ? void 0 : _b.call(this);
              }
          }
          if (isClearingDirective) {
              notifyChildrenConnectedChanged(this, isConnected);
              removeDisconnectableFromParent(this);
          }
      }
      /**
       * Sets the value of the directive's Part outside the normal `update`/`render`
       * lifecycle of a directive.
       *
       * This method should not be called synchronously from a directive's `update`
       * or `render`.
       *
       * @param directive The directive to update
       * @param value The value to set
       */
      setValue(value) {
          if (isSingleExpression(this.__part)) {
              this.__part._$setValue(value, this);
          }
          else {
              // this.__attributeIndex will be defined in this case, but
              // assert it in dev mode
              if (this.__attributeIndex === undefined) {
                  throw new Error(`Expected this.__attributeIndex to be a number`);
              }
              const newValues = [...this.__part._$committedValue];
              newValues[this.__attributeIndex] = value;
              this.__part._$setValue(newValues, this, 0);
          }
      }
      /**
       * User callbacks for implementing logic to release any resources/subscriptions
       * that may have been retained by this directive. Since directives may also be
       * re-connected, `reconnected` should also be implemented to restore the
       * working state of the directive prior to the next render.
       */
      disconnected() { }
      reconnected() { }
  }

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Creates a new Ref object, which is container for a reference to an element.
   */
  const createRef = () => new Ref();
  /**
   * An object that holds a ref value.
   */
  class Ref {
  }
  // When callbacks are used for refs, this map tracks the last value the callback
  // was called with, for ensuring a directive doesn't clear the ref if the ref
  // has already been rendered to a new spot. It is double-keyed on both the
  // context (`options.host`) and the callback, since we auto-bind class methods
  // to `options.host`.
  const lastElementForContextAndCallback = new WeakMap();
  class RefDirective extends AsyncDirective {
      render(_ref) {
          return nothing;
      }
      update(part, [ref]) {
          var _a;
          const refChanged = ref !== this._ref;
          if (refChanged && this._ref !== undefined) {
              // The ref passed to the directive has changed;
              // unset the previous ref's value
              this._updateRefValue(undefined);
          }
          if (refChanged || this._lastElementForRef !== this._element) {
              // We either got a new ref or this is the first render;
              // store the ref/element & update the ref value
              this._ref = ref;
              this._context = (_a = part.options) === null || _a === void 0 ? void 0 : _a.host;
              this._updateRefValue((this._element = part.element));
          }
          return nothing;
      }
      _updateRefValue(element) {
          var _a;
          if (typeof this._ref === 'function') {
              // If the current ref was called with a previous value, call with
              // `undefined`; We do this to ensure callbacks are called in a consistent
              // way regardless of whether a ref might be moving up in the tree (in
              // which case it would otherwise be called with the new value before the
              // previous one unsets it) and down in the tree (where it would be unset
              // before being set). Note that element lookup is keyed by
              // both the context and the callback, since we allow passing unbound
              // functions that are called on options.host, and we want to treat
              // these as unique "instances" of a function.
              const context = (_a = this._context) !== null && _a !== void 0 ? _a : globalThis;
              let lastElementForCallback = lastElementForContextAndCallback.get(context);
              if (lastElementForCallback === undefined) {
                  lastElementForCallback = new WeakMap();
                  lastElementForContextAndCallback.set(context, lastElementForCallback);
              }
              if (lastElementForCallback.get(this._ref) !== undefined) {
                  this._ref.call(this._context, undefined);
              }
              lastElementForCallback.set(this._ref, element);
              // Call the ref with the new element value
              if (element !== undefined) {
                  this._ref.call(this._context, element);
              }
          }
          else {
              this._ref.value = element;
          }
      }
      get _lastElementForRef() {
          var _a, _b, _c;
          return typeof this._ref === 'function'
              ? (_b = lastElementForContextAndCallback
                  .get((_a = this._context) !== null && _a !== void 0 ? _a : globalThis)) === null || _b === void 0 ? void 0 : _b.get(this._ref)
              : (_c = this._ref) === null || _c === void 0 ? void 0 : _c.value;
      }
      disconnected() {
          // Only clear the box if our element is still the one in it (i.e. another
          // directive instance hasn't rendered its element to it before us); that
          // only happens in the event of the directive being cleared (not via manual
          // disconnection)
          if (this._lastElementForRef === this._element) {
              this._updateRefValue(undefined);
          }
      }
      reconnected() {
          // If we were manually disconnected, we can safely put our element back in
          // the box, since no rendering could have occurred to change its state
          this._updateRefValue(this._element);
      }
  }
  /**
   * Sets the value of a Ref object or calls a ref callback with the element it's
   * bound to.
   *
   * A Ref object acts as a container for a reference to an element. A ref
   * callback is a function that takes an element as its only argument.
   *
   * The ref directive sets the value of the Ref object or calls the ref callback
   * during rendering, if the referenced element changed.
   *
   * Note: If a ref callback is rendered to a different element position or is
   * removed in a subsequent render, it will first be called with `undefined`,
   * followed by another call with the new element it was rendered to (if any).
   *
   * ```js
   * // Using Ref object
   * const inputRef = createRef();
   * render(html`<input ${ref(inputRef)}>`, container);
   * inputRef.value.focus();
   *
   * // Using callback
   * const callback = (inputElement) => inputElement.focus();
   * render(html`<input ${ref(callback)}>`, container);
   * ```
   */
  const ref = directive(RefDirective);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const HTML_RESULT = 1;
  class UnsafeHTMLDirective extends Directive {
      constructor(partInfo) {
          super(partInfo);
          this._value = nothing;
          if (partInfo.type !== PartType.CHILD) {
              throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
          }
      }
      render(value) {
          if (value === nothing || value == null) {
              this._templateResult = undefined;
              return (this._value = value);
          }
          if (value === noChange) {
              return value;
          }
          if (typeof value != 'string') {
              throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
          }
          if (value === this._value) {
              return this._templateResult;
          }
          this._value = value;
          const strings = [value];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          strings.raw = strings;
          // WARNING: impersonating a TemplateResult like this is extremely
          // dangerous. Third-party directives should not do this.
          return (this._templateResult = {
              // Cast to a known set of integers that satisfy ResultType so that we
              // don't have to export ResultType and possibly encourage this pattern.
              // This property needs to remain unminified.
              ['_$litType$']: this.constructor
                  .resultType,
              strings,
              values: [],
          });
      }
  }
  UnsafeHTMLDirective.directiveName = 'unsafeHTML';
  UnsafeHTMLDirective.resultType = HTML_RESULT;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const SVG_RESULT = 2;
  class UnsafeSVGDirective extends UnsafeHTMLDirective {
  }
  UnsafeSVGDirective.directiveName = 'unsafeSVG';
  UnsafeSVGDirective.resultType = SVG_RESULT;
  /**
   * Renders the result as SVG, rather than text.
   *
   * The values `undefined`, `null`, and `nothing`, will all result in no content
   * (empty string) being rendered.
   *
   * Note, this is unsafe to use with any user-provided input that hasn't been
   * sanitized or escaped, as it may lead to cross-site-scripting
   * vulnerabilities.
   */
  const unsafeSVG = directive(UnsafeSVGDirective);

  var css_248z$2 = css`@charset "UTF-8";:root{--sgds-blue:#1f69ff;--sgds-purple:#5925dc;--sgds-pink:#d63384;--sgds-red:#d7260f;--sgds-yellow:#f79009;--sgds-green:#0a8217;--sgds-cyan:#0f71bb;--sgds-white:#fff;--sgds-gray:#344054;--sgds-gray-dark:#000;--sgds-gray-100:#f7f7f9;--sgds-gray-200:#e4e7ec;--sgds-gray-300:#d0d5dd;--sgds-gray-400:#98a2b3;--sgds-gray-500:#667085;--sgds-gray-600:#344054;--sgds-gray-700:#1d2939;--sgds-gray-800:#000;--sgds-gray-900:#000;--sgds-primary:#5925dc;--sgds-secondary:#1f69ff;--sgds-success:#0a8217;--sgds-info:#0f71bb;--sgds-warning:#f79009;--sgds-danger:#d7260f;--sgds-light:#f7f7f9;--sgds-dark:#000;--sgds-primary-rgb:89,37,220;--sgds-secondary-rgb:31,105,255;--sgds-success-rgb:10,130,23;--sgds-info-rgb:15,113,187;--sgds-warning-rgb:247,144,9;--sgds-danger-rgb:215,38,15;--sgds-light-rgb:247,247,249;--sgds-dark-rgb:0,0,0;--sgds-white-rgb:255,255,255;--sgds-black-rgb:0,0,0;--sgds-body-color-rgb:29,41,57;--sgds-body-bg-rgb:255,255,255;--sgds-font-sans-serif:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--sgds-font-monospace:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--sgds-gradient:linear-gradient(180deg,hsla(0,0%,100%,.15),hsla(0,0%,100%,0));--sgds-body-font-family:var(--sgds-font-sans-serif);--sgds-body-font-size:1rem;--sgds-body-font-weight:400;--sgds-body-line-height:2;--sgds-body-color:#1d2939;--sgds-body-bg:#fff;--sgds-gutter-x:1.5rem}@media (min-width:992px){:root{--section-padding:3rem 1.5rem;--section-padding-xs:1rem 1.5rem;--section-padding-sm:1.5rem 1.5rem;--section-padding-lg:9rem 1.5rem;--section-padding-xl:18rem 1.5rem}}*,:after,:before{box-sizing:border-box}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}body{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);background-color:var(--sgds-body-bg);color:var(--sgds-body-color);font-family:var(--sgds-body-font-family);font-size:var(--sgds-body-font-size);font-weight:var(--sgds-body-font-weight);line-height:var(--sgds-body-line-height);margin:0;text-align:var(--sgds-body-text-align)}hr{background-color:currentColor;border:0;color:inherit;margin:1rem 0;opacity:.25}hr:not([size]){height:1px}.h1,.h2,.h3,.h4,.h5,.h6,.sgds.footer .footer-header .title,h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2;margin-bottom:.5rem;margin-top:0}.h1,h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width:1200px){.h1,h1{font-size:2.5rem}}.h2,h2{font-size:calc(1.325rem + .9vw)}@media (min-width:1200px){.h2,h2{font-size:2rem}}.h3,.sgds.footer .footer-header .title,h3{font-size:calc(1.275rem + .3vw)}@media (min-width:1200px){.h3,.sgds.footer .footer-header .title,h3{font-size:1.5rem}}.h4,h4{font-size:1.125rem}.h5,.h6,h5,h6{font-size:1rem}p{margin-bottom:1.5rem;margin-top:0}abbr[data-bs-original-title],abbr[title]{cursor:help;text-decoration:underline dotted;text-decoration-skip-ink:none}address{font-style:normal;line-height:inherit;margin-bottom:1rem}ol,ul{padding-left:2rem}dl,ol,ul{margin-bottom:1rem;margin-top:0}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}.small,small{font-size:.875em}.mark,mark{background-color:#fcf8e3;padding:.2em}sub,sup{font-size:.75em;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:#0f71bb;text-decoration:underline}a:hover{color:#0c5a96}a:not([href]):not([class]),a:not([href]):not([class]):hover{color:inherit;text-decoration:none}code,kbd,pre,samp{direction:ltr;font-family:var(--sgds-font-monospace);font-size:1em;unicode-bidi:bidi-override}pre{display:block;font-size:.875em;margin-bottom:1rem;margin-top:0;overflow:auto}pre code{color:inherit;font-size:inherit;word-break:normal}code{word-wrap:break-word;color:#d63384;font-size:.875em}a>code{color:inherit}kbd{background-color:#000;border-radius:.2rem;color:#fff;font-size:.875em;padding:.2rem .4rem}kbd kbd{font-size:1em;font-weight:700;padding:0}figure{margin:0 0 1rem}img,svg{vertical-align:middle}table{border-collapse:collapse;caption-side:bottom}caption{color:#667085;padding-bottom:1rem;padding-top:1rem;text-align:left}th{text-align:inherit;text-align:-webkit-match-parent}tbody,td,tfoot,th,thead,tr{border:0 solid;border-color:inherit}label{display:inline-block}button{border-radius:0}button:focus:not(:focus-visible){outline:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit;margin:0}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}select:disabled{opacity:1}[list]::-webkit-calendar-picker-indicator{display:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}::-moz-focus-inner{border-style:none;padding:0}textarea{resize:vertical}fieldset{border:0;margin:0;min-width:0;padding:0}legend{float:left;font-size:calc(1.275rem + .3vw);line-height:inherit;margin-bottom:.5rem;padding:0;width:100%}@media (min-width:1200px){legend{font-size:1.5rem}}legend+*{clear:left}::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-text,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::file-selector-button{font:inherit}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}output{display:inline-block}iframe{border:0}summary{cursor:pointer;display:list-item}progress{vertical-align:baseline}[hidden]{display:none!important}.h1,h1{line-height:1.2}.h2,h2{line-height:1.25}.h3,.sgds.footer .footer-header .title,h3{line-height:1.33}.h4,h4{line-height:1.78}.h5,.h6,h5,h6{line-height:1.2}.lead{font-size:1.25rem;font-weight:300}.display-0{font-size:calc(1.475rem + 2.7vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-0{font-size:3.5rem}}.display-1{font-size:calc(1.375rem + 1.5vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-1{font-size:2.5rem}}.display-2{font-size:calc(1.325rem + .9vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-2{font-size:2rem}}.display-3{font-size:calc(1.275rem + .3vw);font-weight:700;line-height:1.2}@media (min-width:1200px){.display-3{font-size:1.5rem}}.display-4{font-size:1.125rem;font-weight:700;line-height:1.2}.display-5,.display-6{font-size:1rem;font-weight:700;line-height:1.2}.list-inline,.list-unstyled{list-style:none;padding-left:0}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:.5rem}.initialism{font-size:.875em;text-transform:uppercase}.blockquote{font-size:1.25rem;margin-bottom:1rem}.blockquote>:last-child{margin-bottom:0}.blockquote-footer{color:#344054;font-size:.875em;margin-bottom:1rem;margin-top:-1rem}.blockquote-footer:before{content:"— "}p+p{margin-top:1.5rem}a{text-underline-offset:.25rem}a[target=_blank]:after{content:"\\f1c5";display:inline-block;font-family:bootstrap-icons;padding-left:.25rem;text-decoration-line:none}.img-fluid,.img-thumbnail{height:auto;max-width:100%}.img-thumbnail{background-color:#fff;border:1px solid #d0d5dd;border-radius:.3125rem;padding:.25rem}.figure{display:inline-block}.figure-img{line-height:1;margin-bottom:.5rem}.figure-caption{color:#344054;font-size:.875em}.section{padding:var(--section-padding)}.section-xs{padding:var(--section-padding-xs)}.section-sm{padding:var(--section-padding-sm)}.section-md{padding:var(--section-padding)}.section-lg{padding:var(--section-padding-lg)}.section-xl{padding:var(--section-padding-xl)}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{margin-left:auto;margin-right:auto;padding-left:var(--sgds-gutter-x,.75rem);padding-right:var(--sgds-gutter-x,.75rem);width:100%}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}@media (min-width:1400px){.container,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{max-width:1320px}}.row{--sgds-gutter-x:1.5rem;--sgds-gutter-y:0;display:flex;flex-wrap:wrap;margin-left:calc(var(--sgds-gutter-x)*-.5);margin-right:calc(var(--sgds-gutter-x)*-.5);margin-top:calc(var(--sgds-gutter-y)*-1)}.row>*{flex-shrink:0;margin-top:var(--sgds-gutter-y);max-width:100%;padding-left:calc(var(--sgds-gutter-x)*.5);padding-right:calc(var(--sgds-gutter-x)*.5);width:100%}.col{flex:1 0 0%}.row-cols-auto>*{flex:0 0 auto;width:auto}.row-cols-1>*{flex:0 0 auto;width:100%}.row-cols-2>*{flex:0 0 auto;width:50%}.row-cols-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-4>*{flex:0 0 auto;width:25%}.row-cols-5>*{flex:0 0 auto;width:20%}.row-cols-6>*{flex:0 0 auto;width:16.6666666667%}.col-auto{flex:0 0 auto;width:auto}.col-1{flex:0 0 auto;width:8.33333333%}.col-2{flex:0 0 auto;width:16.66666667%}.col-3{flex:0 0 auto;width:25%}.col-4{flex:0 0 auto;width:33.33333333%}.col-5{flex:0 0 auto;width:41.66666667%}.col-6{flex:0 0 auto;width:50%}.col-7{flex:0 0 auto;width:58.33333333%}.col-8{flex:0 0 auto;width:66.66666667%}.col-9{flex:0 0 auto;width:75%}.col-10{flex:0 0 auto;width:83.33333333%}.col-11{flex:0 0 auto;width:91.66666667%}.col-12{flex:0 0 auto;width:100%}.offset-1{margin-left:8.33333333%}.offset-2{margin-left:16.66666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.33333333%}.offset-5{margin-left:41.66666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.33333333%}.offset-8{margin-left:66.66666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.33333333%}.offset-11{margin-left:91.66666667%}.g-0,.gx-0{--sgds-gutter-x:0}.g-0,.gy-0{--sgds-gutter-y:0}.g-1,.gx-1{--sgds-gutter-x:0.25rem}.g-1,.gy-1{--sgds-gutter-y:0.25rem}.g-2,.gx-2{--sgds-gutter-x:0.5rem}.g-2,.gy-2{--sgds-gutter-y:0.5rem}.g-3,.gx-3{--sgds-gutter-x:1rem}.g-3,.gy-3{--sgds-gutter-y:1rem}.g-4,.gx-4{--sgds-gutter-x:1.5rem}.g-4,.gy-4{--sgds-gutter-y:1.5rem}.g-5,.gx-5{--sgds-gutter-x:2rem}.g-5,.gy-5{--sgds-gutter-y:2rem}.g-6,.gx-6{--sgds-gutter-x:2.5rem}.g-6,.gy-6{--sgds-gutter-y:2.5rem}.g-7,.gx-7{--sgds-gutter-x:3rem}.g-7,.gy-7{--sgds-gutter-y:3rem}.g-8,.gx-8{--sgds-gutter-x:3.5rem}.g-8,.gy-8{--sgds-gutter-y:3.5rem}@media (min-width:576px){.col-sm{flex:1 0 0%}.row-cols-sm-auto>*{flex:0 0 auto;width:auto}.row-cols-sm-1>*{flex:0 0 auto;width:100%}.row-cols-sm-2>*{flex:0 0 auto;width:50%}.row-cols-sm-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-sm-4>*{flex:0 0 auto;width:25%}.row-cols-sm-5>*{flex:0 0 auto;width:20%}.row-cols-sm-6>*{flex:0 0 auto;width:16.6666666667%}.col-sm-auto{flex:0 0 auto;width:auto}.col-sm-1{flex:0 0 auto;width:8.33333333%}.col-sm-2{flex:0 0 auto;width:16.66666667%}.col-sm-3{flex:0 0 auto;width:25%}.col-sm-4{flex:0 0 auto;width:33.33333333%}.col-sm-5{flex:0 0 auto;width:41.66666667%}.col-sm-6{flex:0 0 auto;width:50%}.col-sm-7{flex:0 0 auto;width:58.33333333%}.col-sm-8{flex:0 0 auto;width:66.66666667%}.col-sm-9{flex:0 0 auto;width:75%}.col-sm-10{flex:0 0 auto;width:83.33333333%}.col-sm-11{flex:0 0 auto;width:91.66666667%}.col-sm-12{flex:0 0 auto;width:100%}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.33333333%}.offset-sm-2{margin-left:16.66666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.33333333%}.offset-sm-5{margin-left:41.66666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.33333333%}.offset-sm-8{margin-left:66.66666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.33333333%}.offset-sm-11{margin-left:91.66666667%}.g-sm-0,.gx-sm-0{--sgds-gutter-x:0}.g-sm-0,.gy-sm-0{--sgds-gutter-y:0}.g-sm-1,.gx-sm-1{--sgds-gutter-x:0.25rem}.g-sm-1,.gy-sm-1{--sgds-gutter-y:0.25rem}.g-sm-2,.gx-sm-2{--sgds-gutter-x:0.5rem}.g-sm-2,.gy-sm-2{--sgds-gutter-y:0.5rem}.g-sm-3,.gx-sm-3{--sgds-gutter-x:1rem}.g-sm-3,.gy-sm-3{--sgds-gutter-y:1rem}.g-sm-4,.gx-sm-4{--sgds-gutter-x:1.5rem}.g-sm-4,.gy-sm-4{--sgds-gutter-y:1.5rem}.g-sm-5,.gx-sm-5{--sgds-gutter-x:2rem}.g-sm-5,.gy-sm-5{--sgds-gutter-y:2rem}.g-sm-6,.gx-sm-6{--sgds-gutter-x:2.5rem}.g-sm-6,.gy-sm-6{--sgds-gutter-y:2.5rem}.g-sm-7,.gx-sm-7{--sgds-gutter-x:3rem}.g-sm-7,.gy-sm-7{--sgds-gutter-y:3rem}.g-sm-8,.gx-sm-8{--sgds-gutter-x:3.5rem}.g-sm-8,.gy-sm-8{--sgds-gutter-y:3.5rem}}@media (min-width:768px){.col-md{flex:1 0 0%}.row-cols-md-auto>*{flex:0 0 auto;width:auto}.row-cols-md-1>*{flex:0 0 auto;width:100%}.row-cols-md-2>*{flex:0 0 auto;width:50%}.row-cols-md-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-md-4>*{flex:0 0 auto;width:25%}.row-cols-md-5>*{flex:0 0 auto;width:20%}.row-cols-md-6>*{flex:0 0 auto;width:16.6666666667%}.col-md-auto{flex:0 0 auto;width:auto}.col-md-1{flex:0 0 auto;width:8.33333333%}.col-md-2{flex:0 0 auto;width:16.66666667%}.col-md-3{flex:0 0 auto;width:25%}.col-md-4{flex:0 0 auto;width:33.33333333%}.col-md-5{flex:0 0 auto;width:41.66666667%}.col-md-6{flex:0 0 auto;width:50%}.col-md-7{flex:0 0 auto;width:58.33333333%}.col-md-8{flex:0 0 auto;width:66.66666667%}.col-md-9{flex:0 0 auto;width:75%}.col-md-10{flex:0 0 auto;width:83.33333333%}.col-md-11{flex:0 0 auto;width:91.66666667%}.col-md-12{flex:0 0 auto;width:100%}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.33333333%}.offset-md-2{margin-left:16.66666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.33333333%}.offset-md-5{margin-left:41.66666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.33333333%}.offset-md-8{margin-left:66.66666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.33333333%}.offset-md-11{margin-left:91.66666667%}.g-md-0,.gx-md-0{--sgds-gutter-x:0}.g-md-0,.gy-md-0{--sgds-gutter-y:0}.g-md-1,.gx-md-1{--sgds-gutter-x:0.25rem}.g-md-1,.gy-md-1{--sgds-gutter-y:0.25rem}.g-md-2,.gx-md-2{--sgds-gutter-x:0.5rem}.g-md-2,.gy-md-2{--sgds-gutter-y:0.5rem}.g-md-3,.gx-md-3{--sgds-gutter-x:1rem}.g-md-3,.gy-md-3{--sgds-gutter-y:1rem}.g-md-4,.gx-md-4{--sgds-gutter-x:1.5rem}.g-md-4,.gy-md-4{--sgds-gutter-y:1.5rem}.g-md-5,.gx-md-5{--sgds-gutter-x:2rem}.g-md-5,.gy-md-5{--sgds-gutter-y:2rem}.g-md-6,.gx-md-6{--sgds-gutter-x:2.5rem}.g-md-6,.gy-md-6{--sgds-gutter-y:2.5rem}.g-md-7,.gx-md-7{--sgds-gutter-x:3rem}.g-md-7,.gy-md-7{--sgds-gutter-y:3rem}.g-md-8,.gx-md-8{--sgds-gutter-x:3.5rem}.g-md-8,.gy-md-8{--sgds-gutter-y:3.5rem}}@media (min-width:992px){.col-lg{flex:1 0 0%}.row-cols-lg-auto>*{flex:0 0 auto;width:auto}.row-cols-lg-1>*{flex:0 0 auto;width:100%}.row-cols-lg-2>*{flex:0 0 auto;width:50%}.row-cols-lg-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-lg-4>*{flex:0 0 auto;width:25%}.row-cols-lg-5>*{flex:0 0 auto;width:20%}.row-cols-lg-6>*{flex:0 0 auto;width:16.6666666667%}.col-lg-auto{flex:0 0 auto;width:auto}.col-lg-1{flex:0 0 auto;width:8.33333333%}.col-lg-2{flex:0 0 auto;width:16.66666667%}.col-lg-3{flex:0 0 auto;width:25%}.col-lg-4{flex:0 0 auto;width:33.33333333%}.col-lg-5{flex:0 0 auto;width:41.66666667%}.col-lg-6{flex:0 0 auto;width:50%}.col-lg-7{flex:0 0 auto;width:58.33333333%}.col-lg-8{flex:0 0 auto;width:66.66666667%}.col-lg-9{flex:0 0 auto;width:75%}.col-lg-10{flex:0 0 auto;width:83.33333333%}.col-lg-11{flex:0 0 auto;width:91.66666667%}.col-lg-12{flex:0 0 auto;width:100%}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.33333333%}.offset-lg-2{margin-left:16.66666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.33333333%}.offset-lg-5{margin-left:41.66666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.33333333%}.offset-lg-8{margin-left:66.66666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.33333333%}.offset-lg-11{margin-left:91.66666667%}.g-lg-0,.gx-lg-0{--sgds-gutter-x:0}.g-lg-0,.gy-lg-0{--sgds-gutter-y:0}.g-lg-1,.gx-lg-1{--sgds-gutter-x:0.25rem}.g-lg-1,.gy-lg-1{--sgds-gutter-y:0.25rem}.g-lg-2,.gx-lg-2{--sgds-gutter-x:0.5rem}.g-lg-2,.gy-lg-2{--sgds-gutter-y:0.5rem}.g-lg-3,.gx-lg-3{--sgds-gutter-x:1rem}.g-lg-3,.gy-lg-3{--sgds-gutter-y:1rem}.g-lg-4,.gx-lg-4{--sgds-gutter-x:1.5rem}.g-lg-4,.gy-lg-4{--sgds-gutter-y:1.5rem}.g-lg-5,.gx-lg-5{--sgds-gutter-x:2rem}.g-lg-5,.gy-lg-5{--sgds-gutter-y:2rem}.g-lg-6,.gx-lg-6{--sgds-gutter-x:2.5rem}.g-lg-6,.gy-lg-6{--sgds-gutter-y:2.5rem}.g-lg-7,.gx-lg-7{--sgds-gutter-x:3rem}.g-lg-7,.gy-lg-7{--sgds-gutter-y:3rem}.g-lg-8,.gx-lg-8{--sgds-gutter-x:3.5rem}.g-lg-8,.gy-lg-8{--sgds-gutter-y:3.5rem}}@media (min-width:1200px){.col-xl{flex:1 0 0%}.row-cols-xl-auto>*{flex:0 0 auto;width:auto}.row-cols-xl-1>*{flex:0 0 auto;width:100%}.row-cols-xl-2>*{flex:0 0 auto;width:50%}.row-cols-xl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xl-4>*{flex:0 0 auto;width:25%}.row-cols-xl-5>*{flex:0 0 auto;width:20%}.row-cols-xl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xl-auto{flex:0 0 auto;width:auto}.col-xl-1{flex:0 0 auto;width:8.33333333%}.col-xl-2{flex:0 0 auto;width:16.66666667%}.col-xl-3{flex:0 0 auto;width:25%}.col-xl-4{flex:0 0 auto;width:33.33333333%}.col-xl-5{flex:0 0 auto;width:41.66666667%}.col-xl-6{flex:0 0 auto;width:50%}.col-xl-7{flex:0 0 auto;width:58.33333333%}.col-xl-8{flex:0 0 auto;width:66.66666667%}.col-xl-9{flex:0 0 auto;width:75%}.col-xl-10{flex:0 0 auto;width:83.33333333%}.col-xl-11{flex:0 0 auto;width:91.66666667%}.col-xl-12{flex:0 0 auto;width:100%}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.33333333%}.offset-xl-2{margin-left:16.66666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.33333333%}.offset-xl-5{margin-left:41.66666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.33333333%}.offset-xl-8{margin-left:66.66666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.33333333%}.offset-xl-11{margin-left:91.66666667%}.g-xl-0,.gx-xl-0{--sgds-gutter-x:0}.g-xl-0,.gy-xl-0{--sgds-gutter-y:0}.g-xl-1,.gx-xl-1{--sgds-gutter-x:0.25rem}.g-xl-1,.gy-xl-1{--sgds-gutter-y:0.25rem}.g-xl-2,.gx-xl-2{--sgds-gutter-x:0.5rem}.g-xl-2,.gy-xl-2{--sgds-gutter-y:0.5rem}.g-xl-3,.gx-xl-3{--sgds-gutter-x:1rem}.g-xl-3,.gy-xl-3{--sgds-gutter-y:1rem}.g-xl-4,.gx-xl-4{--sgds-gutter-x:1.5rem}.g-xl-4,.gy-xl-4{--sgds-gutter-y:1.5rem}.g-xl-5,.gx-xl-5{--sgds-gutter-x:2rem}.g-xl-5,.gy-xl-5{--sgds-gutter-y:2rem}.g-xl-6,.gx-xl-6{--sgds-gutter-x:2.5rem}.g-xl-6,.gy-xl-6{--sgds-gutter-y:2.5rem}.g-xl-7,.gx-xl-7{--sgds-gutter-x:3rem}.g-xl-7,.gy-xl-7{--sgds-gutter-y:3rem}.g-xl-8,.gx-xl-8{--sgds-gutter-x:3.5rem}.g-xl-8,.gy-xl-8{--sgds-gutter-y:3.5rem}}@media (min-width:1400px){.col-xxl{flex:1 0 0%}.row-cols-xxl-auto>*{flex:0 0 auto;width:auto}.row-cols-xxl-1>*{flex:0 0 auto;width:100%}.row-cols-xxl-2>*{flex:0 0 auto;width:50%}.row-cols-xxl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xxl-4>*{flex:0 0 auto;width:25%}.row-cols-xxl-5>*{flex:0 0 auto;width:20%}.row-cols-xxl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xxl-auto{flex:0 0 auto;width:auto}.col-xxl-1{flex:0 0 auto;width:8.33333333%}.col-xxl-2{flex:0 0 auto;width:16.66666667%}.col-xxl-3{flex:0 0 auto;width:25%}.col-xxl-4{flex:0 0 auto;width:33.33333333%}.col-xxl-5{flex:0 0 auto;width:41.66666667%}.col-xxl-6{flex:0 0 auto;width:50%}.col-xxl-7{flex:0 0 auto;width:58.33333333%}.col-xxl-8{flex:0 0 auto;width:66.66666667%}.col-xxl-9{flex:0 0 auto;width:75%}.col-xxl-10{flex:0 0 auto;width:83.33333333%}.col-xxl-11{flex:0 0 auto;width:91.66666667%}.col-xxl-12{flex:0 0 auto;width:100%}.offset-xxl-0{margin-left:0}.offset-xxl-1{margin-left:8.33333333%}.offset-xxl-2{margin-left:16.66666667%}.offset-xxl-3{margin-left:25%}.offset-xxl-4{margin-left:33.33333333%}.offset-xxl-5{margin-left:41.66666667%}.offset-xxl-6{margin-left:50%}.offset-xxl-7{margin-left:58.33333333%}.offset-xxl-8{margin-left:66.66666667%}.offset-xxl-9{margin-left:75%}.offset-xxl-10{margin-left:83.33333333%}.offset-xxl-11{margin-left:91.66666667%}.g-xxl-0,.gx-xxl-0{--sgds-gutter-x:0}.g-xxl-0,.gy-xxl-0{--sgds-gutter-y:0}.g-xxl-1,.gx-xxl-1{--sgds-gutter-x:0.25rem}.g-xxl-1,.gy-xxl-1{--sgds-gutter-y:0.25rem}.g-xxl-2,.gx-xxl-2{--sgds-gutter-x:0.5rem}.g-xxl-2,.gy-xxl-2{--sgds-gutter-y:0.5rem}.g-xxl-3,.gx-xxl-3{--sgds-gutter-x:1rem}.g-xxl-3,.gy-xxl-3{--sgds-gutter-y:1rem}.g-xxl-4,.gx-xxl-4{--sgds-gutter-x:1.5rem}.g-xxl-4,.gy-xxl-4{--sgds-gutter-y:1.5rem}.g-xxl-5,.gx-xxl-5{--sgds-gutter-x:2rem}.g-xxl-5,.gy-xxl-5{--sgds-gutter-y:2rem}.g-xxl-6,.gx-xxl-6{--sgds-gutter-x:2.5rem}.g-xxl-6,.gy-xxl-6{--sgds-gutter-y:2.5rem}.g-xxl-7,.gx-xxl-7{--sgds-gutter-x:3rem}.g-xxl-7,.gy-xxl-7{--sgds-gutter-y:3rem}.g-xxl-8,.gx-xxl-8{--sgds-gutter-x:3.5rem}.g-xxl-8,.gy-xxl-8{--sgds-gutter-y:3.5rem}}.table{--sgds-table-bg:transparent;--sgds-table-accent-bg:transparent;--sgds-table-striped-color:#1d2939;--sgds-table-striped-bg:rgba(0,0,0,.05);--sgds-table-active-color:#1d2939;--sgds-table-active-bg:rgba(0,0,0,.1);--sgds-table-hover-color:#1d2939;--sgds-table-hover-bg:rgba(0,0,0,.075);border-color:#98a2b3;color:#1d2939;margin-bottom:1rem;vertical-align:top;width:100%}.table>:not(caption)>*>*{background-color:var(--sgds-table-bg);border-bottom-width:1px;box-shadow:inset 0 0 0 9999px var(--sgds-table-accent-bg);padding:1rem}.table>tbody{vertical-align:inherit}.table>thead{vertical-align:bottom}.table>:not(:first-child){border-top:2px solid}.caption-top{caption-side:top}.table-sm>:not(caption)>*>*{padding:.5rem}.table-bordered>:not(caption)>*{border-width:1px 0}.table-bordered>:not(caption)>*>*{border-width:0 1px}.table-borderless>:not(caption)>*>*{border-bottom-width:0}.table-borderless>:not(:first-child){border-top-width:0}.table-striped>tbody>tr:nth-of-type(odd)>*{--sgds-table-accent-bg:var(--sgds-table-striped-bg);color:var(--sgds-table-striped-color)}.table-active{--sgds-table-accent-bg:var(--sgds-table-active-bg);color:var(--sgds-table-active-color)}.table-hover>tbody>tr:hover>*{--sgds-table-accent-bg:var(--sgds-table-hover-bg);color:var(--sgds-table-hover-color)}.table-danger,.table-info,.table-primary,.table-secondary,.table-success,.table-warning{--sgds-table-bg:#000;--sgds-table-striped-bg:#0d0d0d;--sgds-table-striped-color:#fff;--sgds-table-active-bg:#1a1a1a;--sgds-table-active-color:#fff;--sgds-table-hover-bg:#131313;--sgds-table-hover-color:#fff;border-color:#1a1a1a;color:#fff}.table-light{--sgds-table-bg:#f7f7f9;--sgds-table-striped-bg:#ebebed;--sgds-table-striped-color:#000;--sgds-table-active-bg:#dedee0;--sgds-table-active-color:#000;--sgds-table-hover-bg:#e4e4e6;--sgds-table-hover-color:#000;border-color:#dedee0;color:#000}.table-dark{--sgds-table-bg:#000;--sgds-table-striped-bg:#0d0d0d;--sgds-table-striped-color:#fff;--sgds-table-active-bg:#1a1a1a;--sgds-table-active-color:#fff;--sgds-table-hover-bg:#131313;--sgds-table-hover-color:#fff;border-color:#1a1a1a;color:#fff}.table-responsive{-webkit-overflow-scrolling:touch;overflow-x:auto}@media (max-width:575.98px){.table-responsive-sm{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:767.98px){.table-responsive-md{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:991.98px){.table-responsive-lg{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1199.98px){.table-responsive-xl{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1399.98px){.table-responsive-xxl{-webkit-overflow-scrolling:touch;overflow-x:auto}}.sgds.table{font-size:1rem}.form-label{font-weight:700;margin-bottom:.5rem}.col-form-label{font-size:inherit;font-weight:700;line-height:2;margin-bottom:0;padding-bottom:calc(.4375rem + 1px);padding-top:calc(.4375rem + 1px)}.col-form-label-lg{font-size:1.25rem;padding-bottom:calc(.5rem + 1px);padding-top:calc(.5rem + 1px)}.col-form-label-sm{font-size:.875rem;padding-bottom:calc(.25rem + 1px);padding-top:calc(.25rem + 1px)}.form-label{margin-bottom:0}.form-text{color:#667085;font-size:1rem;font-weight:300}.form-control{appearance:none;background-clip:padding-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control[type=file]{overflow:hidden}.form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.form-control:focus{background-color:#fff;border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);color:#1d2939;outline:0}.form-control::-webkit-date-and-time-value{height:2em}.form-control::placeholder{color:#98a2b3;opacity:1}.form-control:disabled,.form-control[readonly]{background-color:#e4e7ec;opacity:1}.form-control::file-selector-button{background-color:#e4e7ec;border:0 solid;border-color:inherit;border-inline-end-width:1px;border-radius:0;color:#1d2939;margin:-.4375rem -1rem;margin-inline-end:1rem;padding:.4375rem 1rem;pointer-events:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control::file-selector-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:#d9dbe0}.form-control::-webkit-file-upload-button{background-color:#e4e7ec;border:0 solid;border-color:inherit;border-inline-end-width:1px;border-radius:0;color:#1d2939;margin:-.4375rem -1rem;margin-inline-end:1rem;padding:.4375rem 1rem;pointer-events:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control::-webkit-file-upload-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:#d9dbe0}.form-control-plaintext{background-color:transparent;border:solid transparent;border-width:1px 0;color:#1d2939;display:block;line-height:2;margin-bottom:0;padding:.4375rem 0;width:100%}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm{padding-left:0;padding-right:0}.form-control-sm{border-radius:.2rem;font-size:.875rem;min-height:calc(2em + .5rem + 2px);padding:.25rem .5rem}.form-control-sm::file-selector-button{margin:-.25rem -.5rem;margin-inline-end:.5rem;padding:.25rem .5rem}.form-control-sm::-webkit-file-upload-button{margin:-.25rem -.5rem;margin-inline-end:.5rem;padding:.25rem .5rem}.form-control-lg{border-radius:.3rem;font-size:1.25rem;min-height:calc(2em + 1rem + 2px);padding:.5rem 1rem}.form-control-lg::file-selector-button{margin:-.5rem -1rem;margin-inline-end:1rem;padding:.5rem 1rem}.form-control-lg::-webkit-file-upload-button{margin:-.5rem -1rem;margin-inline-end:1rem;padding:.5rem 1rem}textarea.form-control{min-height:calc(2em + .875rem + 2px)}textarea.form-control-sm{min-height:calc(2em + .5rem + 2px)}textarea.form-control-lg{min-height:calc(2em + 1rem + 2px)}.form-control-color{height:auto;padding:.4375rem;width:3rem}.form-control-color:not(:disabled):not([readonly]){cursor:pointer}.form-control-color::-moz-color-swatch{border-radius:.3125rem;height:2em}.form-control-color::-webkit-color-swatch{border-radius:.3125rem;height:2em}.sgds.combobox .form-control-icon,.sgds.combobox .form-control-icon-validate,.sgds.form-control-group .form-control-icon,.sgds.form-control-group .form-control-icon-validate{align-items:center;display:flex;font-size:1rem;height:3rem;justify-content:center;position:absolute;width:3rem;z-index:4}.sgds.combobox,.sgds.form-control-group{align-items:stretch;display:flex;flex-wrap:wrap;position:relative;width:100%}.sgds.combobox>.form-control,.sgds.form-control-group>.form-control{padding-left:3rem}.sgds.combobox>.form-control:focus,.sgds.form-control-group>.form-control:focus{z-index:3}.sgds.combobox .form-control-icon-validate,.sgds.form-control-group .form-control-icon-validate{left:inherit;right:0}.form-select{-moz-padding-start:calc(1rem - 3px);appearance:none;background-color:#fff;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E");background-position:right 1rem center;background-repeat:no-repeat;background-size:16px 12px;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 3rem .4375rem 1rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.form-select{transition:none}}.form-select:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.form-select[multiple],.form-select[size]:not([size="1"]){background-image:none;padding-right:1rem}.form-select:disabled{background-color:#e4e7ec}.form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #1d2939}.form-select-sm{border-radius:.2rem;font-size:.875rem;padding-bottom:.25rem;padding-left:.5rem;padding-top:.25rem}.form-select-lg{border-radius:.3rem;font-size:1.25rem;padding-bottom:.5rem;padding-left:1rem;padding-top:.5rem}.form-check{display:block;margin-bottom:.125rem;min-height:2rem;padding-left:1.625em}.form-check .form-check-input{float:left;margin-left:-1.625em}.form-check-input{color-adjust:exact;appearance:none;background-color:#fff;background-position:50%;background-repeat:no-repeat;background-size:contain;border:1px solid rgba(0,0,0,.25);height:1.125em;margin-top:.4375em;vertical-align:top;width:1.125em}.form-check-input[type=checkbox]{border-radius:.25em}.form-check-input[type=radio]{border-radius:50%}.form-check-input:active{filter:brightness(90%)}.form-check-input:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.form-check-input:checked{background-color:#0f71bb;border-color:#0f71bb}.form-check-input:checked[type=checkbox]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")}.form-check-input:checked[type=radio]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='2' fill='%23fff'/%3E%3C/svg%3E")}.form-check-input[type=checkbox]:indeterminate{background-color:#0f71bb;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3E%3C/svg%3E");border-color:#0f71bb}.form-check-input:disabled{filter:none;opacity:.5;pointer-events:none}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{opacity:.5}.form-switch{padding-left:2.5em}.form-switch .form-check-input{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='rgba(0, 0, 0, 0.25)'/%3E%3C/svg%3E");background-position:0;border-radius:2em;margin-left:-2.5em;transition:background-position .15s ease-in-out;width:2em}@media (prefers-reduced-motion:reduce){.form-switch .form-check-input{transition:none}}.form-switch .form-check-input:focus{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%2387b8dd'/%3E%3C/svg%3E")}.form-switch .form-check-input:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E");background-position:100%}.form-check-inline{display:inline-block;margin-right:1rem}.btn-check{clip:rect(0,0,0,0);pointer-events:none;position:absolute}.btn-check:disabled+.btn,.btn-check[disabled]+.btn{filter:none;opacity:.65;pointer-events:none}.form-range{appearance:none;background-color:transparent;height:1.25rem;padding:0;width:100%}.form-range:focus{outline:0}.form-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .125rem rgba(15,113,187,.25)}.form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .125rem rgba(15,113,187,.25)}.form-range::-moz-focus-outer{border:0}.form-range::-webkit-slider-thumb{appearance:none;background-color:#0f71bb;border:0;border-radius:1rem;height:1rem;margin-top:-.25rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:1rem}@media (prefers-reduced-motion:reduce){.form-range::-webkit-slider-thumb{transition:none}}.form-range::-webkit-slider-thumb:active{background-color:#b7d4eb}.form-range::-webkit-slider-runnable-track{background-color:#d0d5dd;border-color:transparent;border-radius:1rem;color:transparent;cursor:pointer;height:.5rem;width:100%}.form-range::-moz-range-thumb{appearance:none;background-color:#0f71bb;border:0;border-radius:1rem;height:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:1rem}@media (prefers-reduced-motion:reduce){.form-range::-moz-range-thumb{transition:none}}.form-range::-moz-range-thumb:active{background-color:#b7d4eb}.form-range::-moz-range-track{background-color:#d0d5dd;border-color:transparent;border-radius:1rem;color:transparent;cursor:pointer;height:.5rem;width:100%}.form-range:disabled{pointer-events:none}.form-range:disabled::-webkit-slider-thumb{background-color:#667085}.form-range:disabled::-moz-range-thumb{background-color:#667085}.form-floating{position:relative}.form-floating>.form-control,.form-floating>.form-select{height:calc(3.5rem + 2px);line-height:1.25}.form-floating>label{border:1px solid transparent;height:100%;left:0;padding:1rem;pointer-events:none;position:absolute;top:0;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media (prefers-reduced-motion:reduce){.form-floating>label{transition:none}}.form-floating>.form-control{padding:1rem}.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control:focus,.form-floating>.form-control:not(:placeholder-shown){padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-control:-webkit-autofill{padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-select{padding-bottom:.625rem;padding-top:1.625rem}.form-floating>.form-control:focus~label,.form-floating>.form-control:not(:placeholder-shown)~label,.form-floating>.form-select~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translateX(.15rem)}.form-floating>.form-control:-webkit-autofill~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translateX(.15rem)}.input-group{align-items:stretch;display:flex;flex-wrap:wrap;position:relative;width:100%}.input-group>.form-control,.input-group>.form-select{flex:1 1 auto;min-width:0;position:relative;width:1%}.input-group>.form-control:focus,.input-group>.form-select:focus{z-index:3}.input-group .btn{position:relative;z-index:2}.input-group .btn:focus{z-index:3}.input-group-text{align-items:center;background-color:#e4e7ec;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;display:flex;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;text-align:center;white-space:nowrap}.input-group-lg>.btn,.input-group-lg>.form-control,.input-group-lg>.form-select,.input-group-lg>.input-group-text{border-radius:.3rem;font-size:1.25rem;padding:.5rem 1rem}.input-group-sm>.btn,.input-group-sm>.form-control,.input-group-sm>.form-select,.input-group-sm>.input-group-text{border-radius:.2rem;font-size:.875rem;padding:.25rem .5rem}.input-group-lg>.form-select,.input-group-sm>.form-select{padding-right:4rem}.input-group.has-validation>.dropdown-toggle:nth-last-child(n+4),.input-group.has-validation>:nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu),.input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3),.input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu){border-bottom-right-radius:0;border-top-right-radius:0}.input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.sgds.input-group .input-group-text .form-check-input{margin-top:0}.sgds.input-group[variant=quantity-toggle] input::-webkit-inner-spin-button,.sgds.input-group[variant=quantity-toggle] input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.valid-feedback{color:#0a8217;display:none;font-size:1rem;width:100%}.valid-tooltip{background-color:#0a8217;border-radius:.3125rem;color:#fff;display:none;font-size:.875rem;margin-top:.1rem;max-width:100%;padding:.5rem 1rem;position:absolute;top:100%;z-index:5}.is-valid~.valid-feedback,.is-valid~.valid-tooltip,.was-validated :valid~.valid-feedback,.was-validated :valid~.valid-tooltip{display:block}.form-control.is-valid,.was-validated .form-control:valid{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230A8217'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");background-position:right calc(.5em + .21875rem) center;background-repeat:no-repeat;background-size:calc(1em + .4375rem) calc(1em + .4375rem);border-color:#0a8217;padding-right:calc(2em + .875rem)}.form-control.is-valid:focus,.was-validated .form-control:valid:focus{border-color:#0a8217;box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.was-validated textarea.form-control:valid,textarea.form-control.is-valid{background-position:top calc(.5em + .21875rem) right calc(.5em + .21875rem);padding-right:calc(2em + .875rem)}.form-select.is-valid,.was-validated .form-select:valid{border-color:#0a8217}.form-select.is-valid:not([multiple]):not([size]),.form-select.is-valid:not([multiple])[size="1"],.was-validated .form-select:valid:not([multiple]):not([size]),.was-validated .form-select:valid:not([multiple])[size="1"]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230A8217'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");background-position:right 1rem center,center right 3rem;background-size:16px 12px,calc(1em + .4375rem) calc(1em + .4375rem);padding-right:5.5rem}.form-select.is-valid:focus,.was-validated .form-select:valid:focus{border-color:#0a8217;box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.form-check-input.is-valid,.was-validated .form-check-input:valid{border-color:#0a8217}.form-check-input.is-valid:checked,.was-validated .form-check-input:valid:checked{background-color:#0a8217}.form-check-input.is-valid:focus,.was-validated .form-check-input:valid:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.25)}.form-check-input.is-valid~.form-check-label,.was-validated .form-check-input:valid~.form-check-label{color:#0a8217}.form-check-inline .form-check-input~.valid-feedback{margin-left:.5em}.input-group .form-control.is-valid,.input-group .form-select.is-valid,.was-validated .input-group .form-control:valid,.was-validated .input-group .form-select:valid{z-index:1}.input-group .form-control.is-valid:focus,.input-group .form-select.is-valid:focus,.was-validated .input-group .form-control:valid:focus,.was-validated .input-group .form-select:valid:focus{z-index:3}.invalid-feedback{color:#d7260f;display:none;font-size:1rem;width:100%}.invalid-tooltip{background-color:#d7260f;border-radius:.3125rem;color:#fff;display:none;font-size:.875rem;margin-top:.1rem;max-width:100%;padding:.5rem 1rem;position:absolute;top:100%;z-index:5}.is-invalid~.invalid-feedback,.is-invalid~.invalid-tooltip,.was-validated :invalid~.invalid-feedback,.was-validated :invalid~.invalid-tooltip{display:block}.form-control.is-invalid,.was-validated .form-control:invalid{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D7260F'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E");background-position:right calc(.5em + .21875rem) center;background-repeat:no-repeat;background-size:calc(1em + .4375rem) calc(1em + .4375rem);border-color:#d7260f;padding-right:calc(2em + .875rem)}.form-control.is-invalid:focus,.was-validated .form-control:invalid:focus{border-color:#d7260f;box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.was-validated textarea.form-control:invalid,textarea.form-control.is-invalid{background-position:top calc(.5em + .21875rem) right calc(.5em + .21875rem);padding-right:calc(2em + .875rem)}.form-select.is-invalid,.was-validated .form-select:invalid{border-color:#d7260f}.form-select.is-invalid:not([multiple]):not([size]),.form-select.is-invalid:not([multiple])[size="1"],.was-validated .form-select:invalid:not([multiple]):not([size]),.was-validated .form-select:invalid:not([multiple])[size="1"]{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D7260F'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E");background-position:right 1rem center,center right 3rem;background-size:16px 12px,calc(1em + .4375rem) calc(1em + .4375rem);padding-right:5.5rem}.form-select.is-invalid:focus,.was-validated .form-select:invalid:focus{border-color:#d7260f;box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.form-check-input.is-invalid,.was-validated .form-check-input:invalid{border-color:#d7260f}.form-check-input.is-invalid:checked,.was-validated .form-check-input:invalid:checked{background-color:#d7260f}.form-check-input.is-invalid:focus,.was-validated .form-check-input:invalid:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.25)}.form-check-input.is-invalid~.form-check-label,.was-validated .form-check-input:invalid~.form-check-label{color:#d7260f}.form-check-inline .form-check-input~.invalid-feedback{margin-left:.5em}.input-group .form-control.is-invalid,.input-group .form-select.is-invalid,.was-validated .input-group .form-control:invalid,.was-validated .input-group .form-select:invalid{z-index:2}.input-group .form-control.is-invalid:focus,.input-group .form-select.is-invalid:focus,.was-validated .input-group .form-control:invalid:focus,.was-validated .input-group .form-select:invalid:focus{z-index:3}.footer-list-styling ul,.sgds.footer .footer-contact-links ul,.sgds.footer .footer-items ul,.sgds.footer .footer-mandatory-links ul{margin:0;padding:0}.footer-list-styling ul li,.sgds.footer .footer-contact-links ul li,.sgds.footer .footer-items ul li,.sgds.footer .footer-mandatory-links ul li{font-size:1rem;line-height:1.5;list-style-type:none}.footer-list-styling ul li+li,.sgds.footer .footer-contact-links ul li+li,.sgds.footer .footer-items ul li+li,.sgds.footer .footer-mandatory-links ul li+li{margin-top:1rem}.footer-list-styling ul li a,.sgds.footer .footer-contact-links ul li a,.sgds.footer .footer-items ul li a,.sgds.footer .footer-mandatory-links ul li a{color:#d0d5dd;text-decoration:none}.footer-list-styling ul li a:hover,.sgds.footer,.sgds.footer .footer-contact-links ul li a:hover,.sgds.footer .footer-items ul li a:hover,.sgds.footer .footer-mandatory-links ul li a:hover{color:#f7f7f9}.sgds.footer{height:auto}.sgds.footer .footer-top{background-color:#000;padding:3rem 0 1.5rem}.sgds.footer .footer-header{margin-bottom:1.5rem}.sgds.footer .footer-header .title{margin-bottom:1rem}.sgds.footer .footer-header .description{color:#98a2b3}@media (max-width:575.98px){.sgds.footer .footer-items>div[class*=col]+div[class*=col]{margin-top:2rem}}.sgds.footer .footer-items .title{font-weight:700}.sgds.footer .footer-items .links{margin-top:1rem}.sgds.footer .footer-contact-links{margin-top:2rem}@media (min-width:992px){.sgds.footer .footer-contact-links ul li{display:inline-block}.sgds.footer .footer-contact-links ul li+li{margin-left:1rem}}.sgds.footer .footer-bottom{background-color:#000;border-top:1px solid #000;padding:1.5rem 0}@media (min-width:992px){.sgds.footer .footer-mandatory-links ul li{display:inline-block}.sgds.footer .footer-mandatory-links ul li+li{margin-left:1rem}}@media (max-width:991.98px){.sgds.footer .footer-copyrights{margin-top:1rem}}.btn{background-color:transparent;border:1px solid transparent;border-radius:.3125rem;color:#1d2939;cursor:pointer;display:inline-block;font-size:1rem;font-weight:400;line-height:2;padding:.4375rem 1rem;text-align:center;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;user-select:none;vertical-align:middle}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:hover{color:#1d2939}.btn-check:focus+.btn,.btn:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0}.btn.disabled,.btn:disabled,fieldset:disabled .btn{opacity:.65;pointer-events:none}.btn-primary{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:focus+.btn-primary,.btn-primary:focus,.btn-primary:hover{background-color:#4c1fbb;border-color:#471eb0;color:#fff}.btn-check:focus+.btn-primary,.btn-primary:focus{box-shadow:0 0 0 .125rem rgba(114,70,225,.5)}.btn-check:active+.btn-primary,.btn-check:checked+.btn-primary,.btn-primary.active,.btn-primary:active,.show>.btn-primary.dropdown-toggle{background-color:#471eb0;border-color:#431ca5;color:#fff}.btn-check:active+.btn-primary:focus,.btn-check:checked+.btn-primary:focus,.btn-primary.active:focus,.btn-primary:active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(114,70,225,.5)}.btn-primary.disabled,.btn-primary:disabled{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-secondary{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:focus+.btn-secondary,.btn-secondary:focus,.btn-secondary:hover{background-color:#1a59d9;border-color:#1954cc;color:#fff}.btn-check:focus+.btn-secondary,.btn-secondary:focus{box-shadow:0 0 0 .125rem rgba(65,128,255,.5)}.btn-check:active+.btn-secondary,.btn-check:checked+.btn-secondary,.btn-secondary.active,.btn-secondary:active,.show>.btn-secondary.dropdown-toggle{background-color:#1954cc;border-color:#174fbf;color:#fff}.btn-check:active+.btn-secondary:focus,.btn-check:checked+.btn-secondary:focus,.btn-secondary.active:focus,.btn-secondary:active:focus,.show>.btn-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(65,128,255,.5)}.btn-secondary.disabled,.btn-secondary:disabled{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-success{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:focus+.btn-success,.btn-success:focus,.btn-success:hover{background-color:#096f14;border-color:#086812;color:#fff}.btn-check:focus+.btn-success,.btn-success:focus{box-shadow:0 0 0 .125rem rgba(47,149,58,.5)}.btn-check:active+.btn-success,.btn-check:checked+.btn-success,.btn-success.active,.btn-success:active,.show>.btn-success.dropdown-toggle{background-color:#086812;border-color:#086211;color:#fff}.btn-check:active+.btn-success:focus,.btn-check:checked+.btn-success:focus,.btn-success.active:focus,.btn-success:active:focus,.show>.btn-success.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(47,149,58,.5)}.btn-success.disabled,.btn-success:disabled{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-info{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:focus+.btn-info,.btn-info:focus,.btn-info:hover{background-color:#0d609f;border-color:#0c5a96;color:#fff}.btn-check:focus+.btn-info,.btn-info:focus{box-shadow:0 0 0 .125rem rgba(51,134,197,.5)}.btn-check:active+.btn-info,.btn-check:checked+.btn-info,.btn-info.active,.btn-info:active,.show>.btn-info.dropdown-toggle{background-color:#0c5a96;border-color:#0b558c;color:#fff}.btn-check:active+.btn-info:focus,.btn-check:checked+.btn-info:focus,.btn-info.active:focus,.btn-info:active:focus,.show>.btn-info.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(51,134,197,.5)}.btn-info.disabled,.btn-info:disabled{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-warning{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:focus+.btn-warning,.btn-warning:focus,.btn-warning:hover{background-color:#f8a12e;border-color:#f89b22;color:#000}.btn-check:focus+.btn-warning,.btn-warning:focus{box-shadow:0 0 0 .125rem rgba(210,122,8,.5)}.btn-check:active+.btn-warning,.btn-check:checked+.btn-warning,.btn-warning.active,.btn-warning:active,.show>.btn-warning.dropdown-toggle{background-color:#f9a63a;border-color:#f89b22;color:#000}.btn-check:active+.btn-warning:focus,.btn-check:checked+.btn-warning:focus,.btn-warning.active:focus,.btn-warning:active:focus,.show>.btn-warning.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(210,122,8,.5)}.btn-warning.disabled,.btn-warning:disabled{background-color:#f79009;border-color:#f79009;color:#000}.btn-danger{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:focus+.btn-danger,.btn-danger:focus,.btn-danger:hover{background-color:#b7200d;border-color:#ac1e0c;color:#fff}.btn-check:focus+.btn-danger,.btn-danger:focus{box-shadow:0 0 0 .125rem rgba(221,71,51,.5)}.btn-check:active+.btn-danger,.btn-check:checked+.btn-danger,.btn-danger.active,.btn-danger:active,.show>.btn-danger.dropdown-toggle{background-color:#ac1e0c;border-color:#a11d0b;color:#fff}.btn-check:active+.btn-danger:focus,.btn-check:checked+.btn-danger:focus,.btn-danger.active:focus,.btn-danger:active:focus,.show>.btn-danger.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(221,71,51,.5)}.btn-danger.disabled,.btn-danger:disabled{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-light{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-light,.btn-light:focus,.btn-light:hover{background-color:#f8f8fa;border-color:#f8f8fa;color:#000}.btn-check:focus+.btn-light,.btn-light:focus{box-shadow:0 0 0 .125rem hsla(240,2%,83%,.5)}.btn-check:active+.btn-light,.btn-check:checked+.btn-light,.btn-light.active,.btn-light:active,.show>.btn-light.dropdown-toggle{background-color:#f9f9fa;border-color:#f8f8fa;color:#000}.btn-check:active+.btn-light:focus,.btn-check:checked+.btn-light:focus,.btn-light.active:focus,.btn-light:active:focus,.show>.btn-light.dropdown-toggle:focus{box-shadow:0 0 0 .125rem hsla(240,2%,83%,.5)}.btn-light.disabled,.btn-light:disabled{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-dark,.btn-dark,.btn-dark:focus,.btn-dark:hover{background-color:#000;border-color:#000;color:#fff}.btn-check:focus+.btn-dark,.btn-dark:focus{box-shadow:0 0 0 .125rem rgba(38,38,38,.5)}.btn-check:active+.btn-dark,.btn-check:checked+.btn-dark,.btn-dark.active,.btn-dark:active,.show>.btn-dark.dropdown-toggle{background-color:#000;border-color:#000;color:#fff}.btn-check:active+.btn-dark:focus,.btn-check:checked+.btn-dark:focus,.btn-dark.active:focus,.btn-dark:active:focus,.show>.btn-dark.dropdown-toggle:focus{box-shadow:0 0 0 .125rem rgba(38,38,38,.5)}.btn-dark.disabled,.btn-dark:disabled{background-color:#000;border-color:#000;color:#fff}.btn-outline-primary{border-color:#5925dc;color:#5925dc}.btn-outline-primary:hover{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:focus+.btn-outline-primary,.btn-outline-primary:focus{box-shadow:0 0 0 .125rem rgba(89,37,220,.5)}.btn-check:active+.btn-outline-primary,.btn-check:checked+.btn-outline-primary,.btn-outline-primary.active,.btn-outline-primary.dropdown-toggle.show,.btn-outline-primary:active{background-color:#5925dc;border-color:#5925dc;color:#fff}.btn-check:active+.btn-outline-primary:focus,.btn-check:checked+.btn-outline-primary:focus,.btn-outline-primary.active:focus,.btn-outline-primary.dropdown-toggle.show:focus,.btn-outline-primary:active:focus{box-shadow:0 0 0 .125rem rgba(89,37,220,.5)}.btn-outline-primary.disabled,.btn-outline-primary:disabled{background-color:transparent;color:#5925dc}.btn-outline-secondary{border-color:#1f69ff;color:#1f69ff}.btn-outline-secondary:hover{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:focus+.btn-outline-secondary,.btn-outline-secondary:focus{box-shadow:0 0 0 .125rem rgba(31,105,255,.5)}.btn-check:active+.btn-outline-secondary,.btn-check:checked+.btn-outline-secondary,.btn-outline-secondary.active,.btn-outline-secondary.dropdown-toggle.show,.btn-outline-secondary:active{background-color:#1f69ff;border-color:#1f69ff;color:#fff}.btn-check:active+.btn-outline-secondary:focus,.btn-check:checked+.btn-outline-secondary:focus,.btn-outline-secondary.active:focus,.btn-outline-secondary.dropdown-toggle.show:focus,.btn-outline-secondary:active:focus{box-shadow:0 0 0 .125rem rgba(31,105,255,.5)}.btn-outline-secondary.disabled,.btn-outline-secondary:disabled{background-color:transparent;color:#1f69ff}.btn-outline-success{border-color:#0a8217;color:#0a8217}.btn-outline-success:hover{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:focus+.btn-outline-success,.btn-outline-success:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.5)}.btn-check:active+.btn-outline-success,.btn-check:checked+.btn-outline-success,.btn-outline-success.active,.btn-outline-success.dropdown-toggle.show,.btn-outline-success:active{background-color:#0a8217;border-color:#0a8217;color:#fff}.btn-check:active+.btn-outline-success:focus,.btn-check:checked+.btn-outline-success:focus,.btn-outline-success.active:focus,.btn-outline-success.dropdown-toggle.show:focus,.btn-outline-success:active:focus{box-shadow:0 0 0 .125rem rgba(10,130,23,.5)}.btn-outline-success.disabled,.btn-outline-success:disabled{background-color:transparent;color:#0a8217}.btn-outline-info{border-color:#0f71bb;color:#0f71bb}.btn-outline-info:hover{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:focus+.btn-outline-info,.btn-outline-info:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.5)}.btn-check:active+.btn-outline-info,.btn-check:checked+.btn-outline-info,.btn-outline-info.active,.btn-outline-info.dropdown-toggle.show,.btn-outline-info:active{background-color:#0f71bb;border-color:#0f71bb;color:#fff}.btn-check:active+.btn-outline-info:focus,.btn-check:checked+.btn-outline-info:focus,.btn-outline-info.active:focus,.btn-outline-info.dropdown-toggle.show:focus,.btn-outline-info:active:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.5)}.btn-outline-info.disabled,.btn-outline-info:disabled{background-color:transparent;color:#0f71bb}.btn-outline-warning{border-color:#f79009;color:#f79009}.btn-outline-warning:hover{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:focus+.btn-outline-warning,.btn-outline-warning:focus{box-shadow:0 0 0 .125rem rgba(247,144,9,.5)}.btn-check:active+.btn-outline-warning,.btn-check:checked+.btn-outline-warning,.btn-outline-warning.active,.btn-outline-warning.dropdown-toggle.show,.btn-outline-warning:active{background-color:#f79009;border-color:#f79009;color:#000}.btn-check:active+.btn-outline-warning:focus,.btn-check:checked+.btn-outline-warning:focus,.btn-outline-warning.active:focus,.btn-outline-warning.dropdown-toggle.show:focus,.btn-outline-warning:active:focus{box-shadow:0 0 0 .125rem rgba(247,144,9,.5)}.btn-outline-warning.disabled,.btn-outline-warning:disabled{background-color:transparent;color:#f79009}.btn-outline-danger{border-color:#d7260f;color:#d7260f}.btn-outline-danger:hover{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:focus+.btn-outline-danger,.btn-outline-danger:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.5)}.btn-check:active+.btn-outline-danger,.btn-check:checked+.btn-outline-danger,.btn-outline-danger.active,.btn-outline-danger.dropdown-toggle.show,.btn-outline-danger:active{background-color:#d7260f;border-color:#d7260f;color:#fff}.btn-check:active+.btn-outline-danger:focus,.btn-check:checked+.btn-outline-danger:focus,.btn-outline-danger.active:focus,.btn-outline-danger.dropdown-toggle.show:focus,.btn-outline-danger:active:focus{box-shadow:0 0 0 .125rem rgba(215,38,15,.5)}.btn-outline-danger.disabled,.btn-outline-danger:disabled{background-color:transparent;color:#d7260f}.btn-outline-light{border-color:#f7f7f9;color:#f7f7f9}.btn-outline-light:hover{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:focus+.btn-outline-light,.btn-outline-light:focus{box-shadow:0 0 0 .125rem rgba(247,247,249,.5)}.btn-check:active+.btn-outline-light,.btn-check:checked+.btn-outline-light,.btn-outline-light.active,.btn-outline-light.dropdown-toggle.show,.btn-outline-light:active{background-color:#f7f7f9;border-color:#f7f7f9;color:#000}.btn-check:active+.btn-outline-light:focus,.btn-check:checked+.btn-outline-light:focus,.btn-outline-light.active:focus,.btn-outline-light.dropdown-toggle.show:focus,.btn-outline-light:active:focus{box-shadow:0 0 0 .125rem rgba(247,247,249,.5)}.btn-outline-light.disabled,.btn-outline-light:disabled{background-color:transparent;color:#f7f7f9}.btn-outline-dark{border-color:#000;color:#000}.btn-outline-dark:hover{background-color:#000;border-color:#000;color:#fff}.btn-check:focus+.btn-outline-dark,.btn-outline-dark:focus{box-shadow:0 0 0 .125rem rgba(0,0,0,.5)}.btn-check:active+.btn-outline-dark,.btn-check:checked+.btn-outline-dark,.btn-outline-dark.active,.btn-outline-dark.dropdown-toggle.show,.btn-outline-dark:active{background-color:#000;border-color:#000;color:#fff}.btn-check:active+.btn-outline-dark:focus,.btn-check:checked+.btn-outline-dark:focus,.btn-outline-dark.active:focus,.btn-outline-dark.dropdown-toggle.show:focus,.btn-outline-dark:active:focus{box-shadow:0 0 0 .125rem rgba(0,0,0,.5)}.btn-outline-dark.disabled,.btn-outline-dark:disabled{background-color:transparent;color:#000}.btn-link{color:#0f71bb;font-weight:400;text-decoration:underline}.btn-link:hover{color:#0c5a96}.btn-link.disabled,.btn-link:disabled{color:#344054}.btn-group-lg>.btn,.btn-lg{border-radius:.3rem;font-size:1.25rem;padding:.5rem 1rem}.btn-group-sm>.btn,.btn-sm{border-radius:.2rem;font-size:.875rem;padding:.25rem .5rem}.btn-group,.btn-group-vertical{display:inline-flex;position:relative;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{flex:1 1 auto;position:relative}.btn-group-vertical>.btn-check:checked+.btn,.btn-group-vertical>.btn-check:focus+.btn,.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn-check:checked+.btn,.btn-group>.btn-check:focus+.btn,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:1}.btn-toolbar{display:flex;flex-wrap:wrap;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn-group:not(:first-child),.btn-group>.btn:not(:first-child){margin-left:-1px}.btn-group>.btn-group:not(:last-child)>.btn,.btn-group>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:not(:first-child)>.btn,.btn-group>.btn:nth-child(n+3),.btn-group>:not(.btn-check)+.btn{border-bottom-left-radius:0;border-top-left-radius:0}.dropdown-toggle-split{padding-left:.75rem;padding-right:.75rem}.dropdown-toggle-split:after,.dropend .dropdown-toggle-split:after,.dropup .dropdown-toggle-split:after{margin-left:0}.dropstart .dropdown-toggle-split:before{margin-right:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-left:.375rem;padding-right:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-left:.75rem;padding-right:.75rem}.btn-group-vertical{align-items:flex-start;flex-direction:column;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn-group:not(:first-child),.btn-group-vertical>.btn:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn-group:not(:last-child)>.btn,.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-left-radius:0;border-bottom-right-radius:0}.btn-group-vertical>.btn-group:not(:first-child)>.btn,.btn-group-vertical>.btn~.btn{border-top-left-radius:0;border-top-right-radius:0}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion:reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}.collapsing.collapse-horizontal{height:auto;transition:width .35s ease;width:0}@media (prefers-reduced-motion:reduce){.collapsing.collapse-horizontal{transition:none}}.sgds.datepicker{border-color:#98a2b3;font-size:1rem;max-width:24rem;width:24rem}.sgds.datepicker>.datepicker-header{border:none;color:#5925dc;padding:1.5rem 1.5rem 0}.sgds.datepicker>.datepicker-header button{background-color:transparent;border:none;color:#5925dc;font-weight:700}.sgds.datepicker>.datepicker-header button:focus-visible{outline:2px auto #5925dc;z-index:100}.sgds.datepicker>.datepicker-header button.disabled{cursor:not-allowed}.sgds.datepicker>.datepicker-header button:hover:not(.disabled){background-color:#ece6fb}.sgds.datepicker>.datepicker-header i{font-size:1.25rem}.sgds.datepicker>.datepicker-body{padding:0 1.5rem 1.5rem}.sgds.datepicker td{height:48px;padding:0;width:48px}.sgds.datepicker td:focus-visible{outline:2px auto #5925dc;z-index:100}.sgds.datepicker td.disabled{cursor:not-allowed}.sgds.datepicker td[role=button]:hover:not(.disabled){background-color:#ece6fb;cursor:pointer}.sgds.datepicker .monthpicker,.sgds.datepicker .yearpicker{align-content:space-between;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,48px);justify-content:space-between;padding:1rem 0 0}.sgds.datepicker .month,.sgds.datepicker .year{background-color:transparent;border:0;cursor:pointer;padding:0}.sgds.datepicker .month.active,.sgds.datepicker .year.active{background-color:#ece6fb;color:#5925dc}.sgds.datepicker .month:focus-visible,.sgds.datepicker .year:focus-visible{outline:2px auto #5925dc;z-index:100}.sgds.datepicker .month:hover,.sgds.datepicker .year:hover{background-color:#ece6fb}.dropdown,.dropend,.dropstart,.dropup{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle:after{border-bottom:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-top:.3em solid;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropdown-toggle:empty:after{margin-left:0}.dropdown-menu{background-clip:padding-box;background-color:#fff;border:1px solid rgba(0,0,0,.15);border-radius:.3125rem;color:#1d2939;display:none;font-size:1rem;list-style:none;margin:0;min-width:10rem;padding:.5rem 0;position:absolute;text-align:left;z-index:1000}.dropdown-menu[data-bs-popper]{left:0;margin-top:.125rem;top:100%}.dropdown-menu-start{--bs-position:start}.dropdown-menu-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-end{--bs-position:end}.dropdown-menu-end[data-bs-popper]{left:auto;right:0}@media (min-width:576px){.dropdown-menu-sm-start{--bs-position:start}.dropdown-menu-sm-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-sm-end{--bs-position:end}.dropdown-menu-sm-end[data-bs-popper]{left:auto;right:0}}@media (min-width:768px){.dropdown-menu-md-start{--bs-position:start}.dropdown-menu-md-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-md-end{--bs-position:end}.dropdown-menu-md-end[data-bs-popper]{left:auto;right:0}}@media (min-width:992px){.dropdown-menu-lg-start{--bs-position:start}.dropdown-menu-lg-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-lg-end{--bs-position:end}.dropdown-menu-lg-end[data-bs-popper]{left:auto;right:0}}@media (min-width:1200px){.dropdown-menu-xl-start{--bs-position:start}.dropdown-menu-xl-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-xl-end{--bs-position:end}.dropdown-menu-xl-end[data-bs-popper]{left:auto;right:0}}@media (min-width:1400px){.dropdown-menu-xxl-start{--bs-position:start}.dropdown-menu-xxl-start[data-bs-popper]{left:0;right:auto}.dropdown-menu-xxl-end{--bs-position:end}.dropdown-menu-xxl-end[data-bs-popper]{left:auto;right:0}}.dropup .dropdown-menu[data-bs-popper]{bottom:100%;margin-bottom:.125rem;margin-top:0;top:auto}.dropup .dropdown-toggle:after{border-bottom:.3em solid;border-left:.3em solid transparent;border-right:.3em solid transparent;border-top:0;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropup .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-menu[data-bs-popper]{left:100%;margin-left:.125rem;margin-top:0;right:auto;top:0}.dropend .dropdown-toggle:after{border-bottom:.3em solid transparent;border-left:.3em solid;border-right:0;border-top:.3em solid transparent;content:"";display:inline-block;margin-left:.255em;vertical-align:.255em}.dropend .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-toggle:after{vertical-align:0}.dropstart .dropdown-menu[data-bs-popper]{left:auto;margin-right:.125rem;margin-top:0;right:100%;top:0}.dropstart .dropdown-toggle:after{content:"";display:inline-block;display:none;margin-left:.255em;vertical-align:.255em}.dropstart .dropdown-toggle:before{border-bottom:.3em solid transparent;border-right:.3em solid;border-top:.3em solid transparent;content:"";display:inline-block;margin-right:.255em;vertical-align:.255em}.dropstart .dropdown-toggle:empty:after{margin-left:0}.dropstart .dropdown-toggle:before{vertical-align:0}.dropdown-divider{border-top:1px solid rgba(0,0,0,.15);height:0;margin:.5rem 0;overflow:hidden}.dropdown-item{background-color:transparent;border:0;clear:both;color:#000;display:block;font-weight:400;padding:.25rem 1rem;text-align:inherit;text-decoration:none;white-space:nowrap;width:100%}.dropdown-item:focus,.dropdown-item:hover{background-color:#e4e7ec;color:#000}.dropdown-item.active,.dropdown-item:active{background-color:#0f71bb;color:#fff;text-decoration:none}.dropdown-item.disabled,.dropdown-item:disabled{background-color:transparent;color:#667085;pointer-events:none}.dropdown-menu.show{display:block}.dropdown-header{color:#344054;display:block;font-size:.875rem;margin-bottom:0;padding:.5rem 1rem;white-space:nowrap}.dropdown-item-text{color:#000;display:block;padding:.25rem 1rem}.dropdown-menu-dark{background-color:#000;border-color:rgba(0,0,0,.15);color:#d0d5dd}.dropdown-menu-dark .dropdown-item{color:#d0d5dd}.dropdown-menu-dark .dropdown-item:focus,.dropdown-menu-dark .dropdown-item:hover{background-color:hsla(0,0%,100%,.15);color:#fff}.dropdown-menu-dark .dropdown-item.active,.dropdown-menu-dark .dropdown-item:active{background-color:#0f71bb;color:#fff}.dropdown-menu-dark .dropdown-item.disabled,.dropdown-menu-dark .dropdown-item:disabled{color:#667085}.dropdown-menu-dark .dropdown-divider{border-color:rgba(0,0,0,.15)}.dropdown-menu-dark .dropdown-item-text{color:#d0d5dd}.dropdown-menu-dark .dropdown-header{color:#667085}.sgds.dropdown .dropdown-toggle{align-items:center;display:flex;gap:.5rem;justify-content:space-between}.sgds.dropdown .dropdown-toggle:after{content:none}.sgds.dropdown-menu{border:1px solid #98a2b3;padding:0}.sgds.dropdown-menu li a.dropdown-item{padding:1rem}.sgds.dropdown-menu li a.dropdown-item.active,.sgds.dropdown-menu li a.dropdown-item:hover{background-color:#004ff0;color:#fff}.sgds.fileupload-list{list-style-type:none;margin-top:1rem;padding:0}.sgds.fileupload-list .fileupload-list-item+.fileupload-list-item{margin-top:.5rem}.sgds.fileupload-list .fileupload-list-item i:first-child{color:#0a8217}.sgds.fileupload-list .fileupload-list-item i:last-child{color:#d7260f}.sgds.fileupload-list .fileupload-list-item .filename{color:#0f71bb;text-decoration:underline;text-underline-offset:.25rem}.nav{display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;padding-left:0}.nav-link{color:#0f71bb;display:block;padding:.5rem 1rem;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}@media (prefers-reduced-motion:reduce){.nav-link{transition:none}}.nav-link:focus,.nav-link:hover{color:#0c5a96}.nav-link.disabled{color:#344054;cursor:default;pointer-events:none}.nav-tabs{border-bottom:1px solid transparent}.nav-tabs .nav-link{background:none;border:1px solid transparent;border-top-left-radius:.3125rem;border-top-right-radius:.3125rem;margin-bottom:-1px}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{border-color:#e4e7ec #e4e7ec transparent;isolation:isolate}.nav-tabs .nav-link.disabled{background-color:transparent;border-color:transparent;color:#344054}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{background-color:#fff;border-color:#d0d5dd #d0d5dd #fff;color:#1d2939}.nav-tabs .dropdown-menu{border-top-left-radius:0;border-top-right-radius:0;margin-top:-1px}.nav-pills .nav-link{background:none;border:0;border-radius:.3125rem}.nav-pills .nav-link.active,.nav-pills .show>.nav-link{background-color:#0f71bb;color:#fff}.nav-fill .nav-item,.nav-fill>.nav-link{flex:1 1 auto;text-align:center}.nav-justified .nav-item,.nav-justified>.nav-link{flex-basis:0;flex-grow:1;text-align:center}.nav-fill .nav-item .nav-link,.nav-justified .nav-item .nav-link{width:100%}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{align-items:center;display:flex;flex-wrap:wrap;justify-content:space-between;padding-bottom:2rem;padding-top:2rem;position:relative}.navbar>.container,.navbar>.container-fluid,.navbar>.container-lg,.navbar>.container-md,.navbar>.container-sm,.navbar>.container-xl,.navbar>.container-xxl{align-items:center;display:flex;flex-wrap:inherit;justify-content:space-between}.navbar-brand{font-size:1.25rem;margin-right:1rem;padding-bottom:.25rem;padding-top:.25rem;text-decoration:none;white-space:nowrap}.navbar-nav{display:flex;flex-direction:column;list-style:none;margin-bottom:0;padding-left:0}.navbar-nav .nav-link{padding-left:0;padding-right:0}.navbar-nav .dropdown-menu{position:static}.navbar-text{padding-bottom:.5rem;padding-top:.5rem}.navbar-collapse{align-items:center;flex-basis:100%;flex-grow:1}.navbar-toggler{background-color:transparent;border:1px solid transparent;border-radius:.3125rem;font-size:1.25rem;line-height:1;padding:.25rem .75rem;transition:box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.navbar-toggler{transition:none}}.navbar-toggler:hover{text-decoration:none}.navbar-toggler:focus{box-shadow:0 0 0 .125rem;outline:0;text-decoration:none}.navbar-toggler-icon{background-position:50%;background-repeat:no-repeat;background-size:100%;display:inline-block;height:1.5em;vertical-align:middle;width:1.5em}.navbar-nav-scroll{max-height:var(--sgds-scroll-height,75vh);overflow-y:auto}@media (min-width:576px){.navbar-expand-sm{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-sm .navbar-toggler,.navbar-expand-sm .offcanvas-header{display:none}.navbar-expand-sm .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-sm .offcanvas-bottom,.navbar-expand-sm .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-sm .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:768px){.navbar-expand-md{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-md .navbar-nav{flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-md .navbar-toggler,.navbar-expand-md .offcanvas-header{display:none}.navbar-expand-md .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-md .offcanvas-bottom,.navbar-expand-md .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-md .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-lg .navbar-toggler,.navbar-expand-lg .offcanvas-header{display:none}.navbar-expand-lg .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-lg .offcanvas-bottom,.navbar-expand-lg .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-lg .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:1200px){.navbar-expand-xl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xl .navbar-nav{flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xl .navbar-toggler,.navbar-expand-xl .offcanvas-header{display:none}.navbar-expand-xl .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-xl .offcanvas-bottom,.navbar-expand-xl .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-xl .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}@media (min-width:1400px){.navbar-expand-xxl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xxl .navbar-nav{flex-direction:row}.navbar-expand-xxl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xxl .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-xxl .navbar-nav-scroll{overflow:visible}.navbar-expand-xxl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xxl .navbar-toggler,.navbar-expand-xxl .offcanvas-header{display:none}.navbar-expand-xxl .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand-xxl .offcanvas-bottom,.navbar-expand-xxl .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand-xxl .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}}.navbar-expand{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand .navbar-nav{flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand .navbar-nav-scroll{overflow:visible}.navbar-expand .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand .navbar-toggler,.navbar-expand .offcanvas-header{display:none}.navbar-expand .offcanvas{background-color:transparent;border-left:0;border-right:0;bottom:0;flex-grow:1;position:inherit;transform:none;transition:none;visibility:visible!important;z-index:1000}.navbar-expand .offcanvas-bottom,.navbar-expand .offcanvas-top{border-bottom:0;border-top:0;height:auto}.navbar-expand .offcanvas-body{display:flex;flex-grow:0;overflow-y:visible;padding:0}.navbar-light .navbar-brand,.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover{color:rgba(0,0,0,.9)}.navbar-light .navbar-nav .nav-link{color:rgba(0,0,0,.55)}.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover{color:rgba(0,0,0,.7)}.navbar-light .navbar-nav .nav-link.disabled{color:rgba(0,0,0,.3)}.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .show>.nav-link{color:rgba(0,0,0,.9)}.navbar-light .navbar-toggler{border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.55)}.navbar-light .navbar-toggler-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")}.navbar-light .navbar-text{color:rgba(0,0,0,.55)}.navbar-light .navbar-text a,.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover{color:rgba(0,0,0,.9)}.navbar-dark .navbar-brand,.navbar-dark .navbar-brand:focus,.navbar-dark .navbar-brand:hover{color:#fff}.navbar-dark .navbar-nav .nav-link{color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{color:hsla(0,0%,100%,.75)}.navbar-dark .navbar-nav .nav-link.disabled{color:hsla(0,0%,100%,.25)}.navbar-dark .navbar-nav .nav-link.active,.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-toggler{border-color:hsla(0,0%,100%,.1);color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-toggler-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")}.navbar-dark .navbar-text{color:hsla(0,0%,100%,.55)}.navbar-dark .navbar-text a,.navbar-dark .navbar-text a:focus,.navbar-dark .navbar-text a:hover{color:#fff}.sgds.navbar{align-items:stretch;min-height:80px;padding:0 2rem}@media (max-width:991.98px){.sgds.navbar{padding:0 1rem}}.sgds.navbar a.navbar-brand{align-items:center;display:flex;padding-bottom:.125rem}.sgds.navbar .navbar-collapse{align-items:stretch}.sgds.navbar .nav-item.has-megamenu{position:static}.sgds.navbar .nav-item a.nav-link{align-items:center;border-bottom:.125rem solid transparent;color:#344054;display:flex;min-height:100%}.sgds.navbar .nav-item a.nav-link.active,.sgds.navbar .nav-item a.nav-link:hover{border-color:#5925dc;color:#5925dc}.sgds.navbar .nav-item a.nav-link.dropdown-toggle{gap:.75rem}.sgds.navbar .nav-item a.nav-link.dropdown-toggle.show{border-bottom:.125rem solid #5925dc;color:#5925dc}.sgds.navbar .dropdown-menu{background-color:#fff;border:1px solid rgba(0,0,0,.1);border-radius:0 0 5px 5px;box-shadow:0 .5rem 1rem rgba(0,0,0,.15);margin-top:0}.sgds.navbar .dropdown-menu.megamenu{left:0;right:0;width:100%}.card{word-wrap:break-word;background-clip:border-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;display:flex;flex-direction:column;min-width:0;position:relative}.card>hr{margin-left:0;margin-right:0}.card>.list-group{border-bottom:inherit;border-top:inherit}.card>.list-group:first-child{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px);border-top-width:0}.card>.list-group:last-child{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px);border-bottom-width:0}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{flex:1 1 auto;padding:1.5rem}.card-title{margin-bottom:.5rem}.card-subtitle{margin-top:-.25rem}.card-subtitle,.card-text:last-child{margin-bottom:0}.card-link+.card-link{margin-left:1.5rem}.card-header{background-color:rgba(0,0,0,.03);border-bottom:1px solid #98a2b3;margin-bottom:0;padding:.75rem 1.5rem}.card-header:first-child{border-radius:calc(.3125rem - 1px) calc(.3125rem - 1px) 0 0}.card-footer{background-color:rgba(0,0,0,.03);border-top:1px solid #98a2b3;padding:.75rem 1.5rem}.card-footer:last-child{border-radius:0 0 calc(.3125rem - 1px) calc(.3125rem - 1px)}.card-header-tabs{border-bottom:0;margin-bottom:-.75rem}.card-header-pills,.card-header-tabs{margin-left:-.75rem;margin-right:-.75rem}.card-img-overlay{border-radius:calc(.3125rem - 1px);bottom:0;left:0;padding:1rem;position:absolute;right:0;top:0}.card-img,.card-img-bottom,.card-img-top{width:100%}.card-img,.card-img-top{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px)}.card-img,.card-img-bottom{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px)}.card-group>.card{margin-bottom:.75rem}@media (min-width:576px){.card-group{display:flex;flex-flow:row wrap}.card-group>.card{flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{border-left:0;margin-left:0}.card-group>.card:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.card-group>.card:not(:last-child) .card-header,.card-group>.card:not(:last-child) .card-img-top{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-footer,.card-group>.card:not(:last-child) .card-img-bottom{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.card-group>.card:not(:first-child) .card-header,.card-group>.card:not(:first-child) .card-img-top{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-footer,.card-group>.card:not(:first-child) .card-img-bottom{border-bottom-left-radius:0}}.sgds.card a:not(.btn){font-weight:700}.sgds.card[variant*=card-action]{transition-duration:.3s;transition-property:box-shadow,border-color;transition-timing-function:ease-in-out}.sgds.card[variant*=card-action] .card-body{display:flex;flex-direction:column;gap:1rem}.sgds.card[variant*=card-action] .card-body i{font-size:1.5rem;margin-right:1rem}.sgds.card[variant*=card-action] .card-body>*{margin-bottom:0}.sgds.card[variant*=card-action].is-active,.sgds.card[variant*=card-action]:hover{border-color:transparent;box-shadow:0 .5rem 1rem rgba(0,0,0,.15),inset 0 0 0 2.1px #0f71bb}.sgds.card[variant*=card-action] .card-subtitle{align-items:center;display:flex;justify-content:space-between}.sgds.card[variant*=card-action] .card-subtitle div{align-items:center;display:flex}.sgds.card[variant*=card-action] .card-input input.form-check-input{margin-top:0;min-height:1.5rem;min-width:1.5rem}.sgds.card[variant=card-action-quantity-toggle] .card-body{display:flex;flex-direction:column;gap:2rem}.sgds.card[variant=card-action-quantity-toggle] div:not([class]){align-items:center;display:flex;justify-content:space-between}.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .btn,.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group{margin-top:0}.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group .btn i{margin-right:0}.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group button,.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .input-group input{margin-top:0}.sgds.card[variant=card-action-quantity-toggle] div:not([class]) .card-unit{flex-basis:150%}@media (max-width:500px){.sgds.card[variant=card-action-quantity-toggle] div:not([class]):last-child{display:block}.sgds.card[variant=card-action-quantity-toggle] div:not([class]):last-child div.card-unit{margin-bottom:1rem}}.accordion-button{align-items:center;background-color:#fff;border:0;border-radius:0;color:#1d2939;display:flex;font-size:1rem;overflow-anchor:none;padding:1rem 1.5rem;position:relative;text-align:left;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,border-radius .15s ease;width:100%}@media (prefers-reduced-motion:reduce){.accordion-button{transition:none}}.accordion-button:not(.collapsed){background-color:none;box-shadow:inset 0 -1px 0 #98a2b3;color:#5925dc}.accordion-button:not(.collapsed):after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%235925DC'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");transform:rotate(-180deg)}.accordion-button:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%231D2939'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:1.25rem;content:"";flex-shrink:0;height:1.25rem;margin-left:auto;transition:transform .2s ease-in-out;width:1.25rem}@media (prefers-reduced-motion:reduce){.accordion-button:after{transition:none}}.accordion-button:hover{z-index:2}.accordion-button:focus{border-color:#87b8dd;box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0;z-index:3}.accordion-header{margin-bottom:0}.accordion-item{background-color:#fff;border:1px solid #98a2b3}.accordion-item:first-of-type{border-top-left-radius:.3125rem;border-top-right-radius:.3125rem}.accordion-item:first-of-type .accordion-button{border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px)}.accordion-item:not(:first-of-type){border-top:0}.accordion-item:last-of-type{border-bottom-left-radius:.3125rem;border-bottom-right-radius:.3125rem}.accordion-item:last-of-type .accordion-button.collapsed{border-bottom-left-radius:calc(.3125rem - 1px);border-bottom-right-radius:calc(.3125rem - 1px)}.accordion-item:last-of-type .accordion-collapse{border-bottom-left-radius:.3125rem;border-bottom-right-radius:.3125rem}.accordion-body{padding:1rem 1.5rem}.accordion-flush .accordion-collapse{border-width:0}.accordion-flush .accordion-item{border-left:0;border-radius:0;border-right:0}.accordion-flush .accordion-item:first-child{border-top:0}.accordion-flush .accordion-item:last-child{border-bottom:0}.accordion-flush .accordion-item .accordion-button{border-radius:0}.sgds.accordion .accordion-button{line-height:2rem}.sgds.accordion .accordion-button:not(.collapsed){box-shadow:none;font-weight:700}.sgds.accordion .accordion-body{line-height:2rem;padding-bottom:1.5rem;padding-top:0}.breadcrumb{display:flex;flex-wrap:wrap;list-style:none;margin-bottom:1rem;padding:0}.breadcrumb-item+.breadcrumb-item{padding-left:.5rem}.breadcrumb-item+.breadcrumb-item:before{color:#344054;content:var(--sgds-breadcrumb-divider,"/");float:left;padding-right:.5rem}.breadcrumb-item.active{color:#344054}.pagination{display:flex;list-style:none;padding-left:0}.page-link{background-color:#fff;border:1px solid #98a2b3;color:#0f71bb;display:block;position:relative;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.page-link{transition:none}}.page-link:hover{border-color:#d0d5dd;z-index:2}.page-link:focus,.page-link:hover{background-color:#e4e7ec;color:#0c5a96}.page-link:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);outline:0;z-index:3}.page-item:not(:first-child) .page-link{margin-left:-1px}.page-item.active .page-link{background-color:#0f71bb;border-color:#0f71bb;color:#fff;z-index:3}.page-item.disabled .page-link{background-color:#fff;border-color:#98a2b3;color:#344054;pointer-events:none}.page-link{padding:.5rem 1rem}.page-item:first-child .page-link{border-bottom-left-radius:.3125rem;border-top-left-radius:.3125rem}.page-item:last-child .page-link{border-bottom-right-radius:.3125rem;border-top-right-radius:.3125rem}.pagination-lg .page-link{font-size:1.25rem;padding:.75rem 1.5rem}.pagination-lg .page-item:first-child .page-link{border-bottom-left-radius:.3rem;border-top-left-radius:.3rem}.pagination-lg .page-item:last-child .page-link{border-bottom-right-radius:.3rem;border-top-right-radius:.3rem}.pagination-sm .page-link{font-size:.875rem;padding:.25rem .5rem}.pagination-sm .page-item:first-child .page-link{border-bottom-left-radius:.2rem;border-top-left-radius:.2rem}.pagination-sm .page-item:last-child .page-link{border-bottom-right-radius:.2rem;border-top-right-radius:.2rem}.list-group{border-radius:.3125rem;display:flex;flex-direction:column;margin-bottom:0;padding-left:0}.list-group-numbered{counter-reset:section;list-style-type:none}.list-group-numbered>li:before{content:counters(section,".") ". ";counter-increment:section}.list-group-item-action{color:#1d2939;text-align:inherit;width:100%}.list-group-item-action:focus,.list-group-item-action:hover{background-color:#f7f7f9;color:#1d2939;text-decoration:none;z-index:1}.list-group-item-action:active{background-color:#e4e7ec;color:#1d2939}.list-group-item{background-color:#fff;border:1px solid rgba(0,0,0,.125);color:#000;display:block;padding:.5rem 1rem;position:relative;text-decoration:none}.list-group-item:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.list-group-item:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.list-group-item.disabled,.list-group-item:disabled{background-color:#fff;color:#344054;pointer-events:none}.list-group-item.active{background-color:#0f71bb;border-color:#0f71bb;color:#fff;z-index:2}.list-group-item+.list-group-item{border-top-width:0}.list-group-item+.list-group-item.active{border-top-width:1px;margin-top:-1px}.list-group-horizontal{flex-direction:row}.list-group-horizontal>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal>.list-group-item.active{margin-top:0}.list-group-horizontal>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}@media (min-width:576px){.list-group-horizontal-sm{flex-direction:row}.list-group-horizontal-sm>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-sm>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-sm>.list-group-item.active{margin-top:0}.list-group-horizontal-sm>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-sm>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:768px){.list-group-horizontal-md{flex-direction:row}.list-group-horizontal-md>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-md>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-md>.list-group-item.active{margin-top:0}.list-group-horizontal-md>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-md>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:992px){.list-group-horizontal-lg{flex-direction:row}.list-group-horizontal-lg>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-lg>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-lg>.list-group-item.active{margin-top:0}.list-group-horizontal-lg>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-lg>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:1200px){.list-group-horizontal-xl{flex-direction:row}.list-group-horizontal-xl>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-xl>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-xl>.list-group-item.active{margin-top:0}.list-group-horizontal-xl>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-xl>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}@media (min-width:1400px){.list-group-horizontal-xxl{flex-direction:row}.list-group-horizontal-xxl>.list-group-item:first-child{border-bottom-left-radius:.3125rem;border-top-right-radius:0}.list-group-horizontal-xxl>.list-group-item:last-child{border-bottom-left-radius:0;border-top-right-radius:.3125rem}.list-group-horizontal-xxl>.list-group-item.active{margin-top:0}.list-group-horizontal-xxl>.list-group-item+.list-group-item{border-left-width:0;border-top-width:1px}.list-group-horizontal-xxl>.list-group-item+.list-group-item.active{border-left-width:1px;margin-left:-1px}}.list-group-flush{border-radius:0}.list-group-flush>.list-group-item{border-width:0 0 1px}.list-group-flush>.list-group-item:last-child{border-bottom-width:0}.list-group-item-primary{background-color:#ded3f8;color:#351684}.list-group-item-primary.list-group-item-action:focus,.list-group-item-primary.list-group-item-action:hover{background-color:#c8bedf;color:#351684}.list-group-item-primary.list-group-item-action.active{background-color:#351684;border-color:#351684;color:#fff}.list-group-item-secondary{background-color:#d2e1ff;color:#133f99}.list-group-item-secondary.list-group-item-action:focus,.list-group-item-secondary.list-group-item-action:hover{background-color:#bdcbe6;color:#133f99}.list-group-item-secondary.list-group-item-action.active{background-color:#133f99;border-color:#133f99;color:#fff}.list-group-item-success{background-color:#cee6d1;color:#064e0e}.list-group-item-success.list-group-item-action:focus,.list-group-item-success.list-group-item-action:hover{background-color:#b9cfbc;color:#064e0e}.list-group-item-success.list-group-item-action.active{background-color:#064e0e;border-color:#064e0e;color:#fff}.list-group-item-info{background-color:#cfe3f1;color:#094470}.list-group-item-info.list-group-item-action:focus,.list-group-item-info.list-group-item-action:hover{background-color:#baccd9;color:#094470}.list-group-item-info.list-group-item-action.active{background-color:#094470;border-color:#094470;color:#fff}.list-group-item-warning{background-color:#fde9ce;color:#945605}.list-group-item-warning.list-group-item-action:focus,.list-group-item-warning.list-group-item-action:hover{background-color:#e4d2b9;color:#945605}.list-group-item-warning.list-group-item-action.active{background-color:#945605;border-color:#945605;color:#fff}.list-group-item-danger{background-color:#f7d4cf;color:#811709}.list-group-item-danger.list-group-item-action:focus,.list-group-item-danger.list-group-item-action:hover{background-color:#debfba;color:#811709}.list-group-item-danger.list-group-item-action.active{background-color:#811709;border-color:#811709;color:#fff}.list-group-item-light{background-color:#fdfdfe;color:#636364}.list-group-item-light.list-group-item-action:focus,.list-group-item-light.list-group-item-action:hover{background-color:#e4e4e5;color:#636364}.list-group-item-light.list-group-item-action.active{background-color:#636364;border-color:#636364;color:#fff}.list-group-item-dark{background-color:#ccc;color:#000}.list-group-item-dark.list-group-item-action:focus,.list-group-item-dark.list-group-item-action:hover{background-color:#b8b8b8;color:#000}.list-group-item-dark.list-group-item-action.active{background-color:#000;border-color:#000;color:#fff}.badge{border-radius:.3125rem;color:#fff;display:inline-block;font-size:.875em;font-weight:700;line-height:1;padding:.285em .571em;text-align:center;vertical-align:baseline;white-space:nowrap}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.sgds.badge{font-size:min(.875em,2rem);line-height:1.145;padding:.285em .571em}.sgds.badge i.left{padding-right:.43em}.sgds.badge i.right{padding-left:.43em}.sgds.badge-light.bg-primary{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-primary);color:var(--sgds-primary)}.sgds.badge-light.bg-secondary{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-secondary);color:var(--sgds-secondary)}.sgds.badge-light.bg-success{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-success);color:var(--sgds-success)}.sgds.badge-light.bg-info{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-info);color:var(--sgds-info)}.sgds.badge-light.bg-warning{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-warning);color:var(--sgds-warning)}.sgds.badge-light.bg-danger{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-danger);color:var(--sgds-danger)}.sgds.badge-light.bg-light{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-gray-500);color:var(--sgds-gray-500)}.sgds.badge-light.bg-dark{--sgds-bg-opacity:0.1;border:1px solid var(--sgds-dark);color:var(--sgds-dark)}.alert{border:1px solid transparent;border-radius:.3125rem;margin-bottom:1rem;padding:1rem;position:relative}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:3rem}.alert-dismissible .btn-close{padding:1.25rem 1rem;position:absolute;right:0;top:0;z-index:2}.alert-primary{background-color:#ded3f8;border-color:#cdbef5;color:#351684}.alert-primary .alert-link{color:#2a126a}.alert-secondary{background-color:#d2e1ff;border-color:#bcd2ff;color:#133f99}.alert-secondary .alert-link{color:#0f327a}.alert-success{background-color:#cee6d1;border-color:#b6dab9;color:#064e0e}.alert-success .alert-link{color:#053e0b}.alert-info{background-color:#cfe3f1;border-color:#b7d4eb;color:#094470}.alert-info .alert-link{color:#07365a}.alert-warning{background-color:#fde9ce;border-color:#fddeb5;color:#945605}.alert-warning .alert-link{color:#764504}.alert-danger{background-color:#f7d4cf;border-color:#f3beb7;color:#811709}.alert-danger .alert-link{color:#671207}.alert-light{background-color:#fdfdfe;border-color:#fdfdfd;color:#636364}.alert-light .alert-link{color:#4f4f50}.alert-dark{background-color:#ccc;border-color:#b3b3b3;color:#000}.alert-dark .alert-link{color:#000}.alert-primary{background-color:#ece6fb;border-color:#7e55e4;color:#344054}.alert-primary .alert-link{color:#2a3343}.alert-primary i{color:#491db6}.alert-secondary{background-color:#ebf1ff;border-color:#70a0ff;color:#344054}.alert-secondary .alert-link{color:#2a3343}.alert-secondary i{color:#004ff0}.alert-success{background-color:#e7f6e9;border-color:#58be62;color:#344054}.alert-success .alert-link{color:#2a3343}.alert-success i{color:#0a8217}.alert-info{background-color:#e2eff8;border-color:#58a1d4;color:#344054}.alert-info .alert-link{color:#2a3343}.alert-info i{color:#0f71bb}.alert-warning{background-color:#fffaeb;border-color:#fec84b;color:#344054}.alert-warning .alert-link{color:#2a3343}.alert-warning i{color:#f79009}.alert-danger{background-color:#fff4f3;border-color:#fb7463;color:#344054}.alert-danger .alert-link{color:#2a3343}.alert-danger i{color:#d7260f}.alert-light{background-color:#f7f7f9;border-color:#98a2b3;color:#344054}.alert-light .alert-link{color:#2a3343}.alert-dark,.alert-light i{color:#344054}.alert-dark{background-color:#f7f7f9;border-color:#98a2b3}.alert-dark .alert-link{color:#2a3343}.alert-dark i{color:#344054}@keyframes progress-bar-stripes{0%{background-position-x:1rem}}.progress{background-color:#e4e7ec;border-radius:.3125rem;font-size:.75rem;height:1rem}.progress,.progress-bar{display:flex;overflow:hidden}.progress-bar{background-color:#5925dc;color:#fff;flex-direction:column;justify-content:center;text-align:center;transition:width .6s ease;white-space:nowrap}@media (prefers-reduced-motion:reduce){.progress-bar{transition:none}}.progress-bar-striped{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:1rem 1rem}.progress-bar-animated{animation:progress-bar-stripes 1s linear infinite}@media (prefers-reduced-motion:reduce){.progress-bar-animated{animation:none}}.btn-close{background:transparent url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2398A2B3'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E") 50%/1em auto no-repeat;border:0;border-radius:.3125rem;box-sizing:content-box;color:#98a2b3;height:1em;opacity:1;padding:.25em;width:1em}.btn-close:hover{color:#98a2b3;opacity:1;text-decoration:none}.btn-close:focus{box-shadow:0 0 0 .125rem rgba(15,113,187,.25);opacity:1;outline:0}.btn-close.disabled,.btn-close:disabled{opacity:.25;pointer-events:none;user-select:none}.btn-close-white{filter:invert(1) grayscale(100%) brightness(200%)}.btn-close:hover{background:transparent url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23344054'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E") 50%/1em auto no-repeat}.sgds.sidenav{--sgds-sidenav-width:auto;--sgds-sidenav-font-size:1rem;font-size:var(--sgds-sidenav-font-size);list-style:none;width:var(--sgds-sidenav-width)}.sgds.sidenav .sidenav-item+.sidenav-item{margin-top:1rem}.sgds.sidenav .sidenav-item .sgds.btn{align-items:center;background:0;border:0;border-left:.125rem solid #5925dc;border-radius:0;color:#5925dc;display:flex;font-size:inherit;gap:1rem;line-height:1.5;padding-bottom:.5rem;padding-left:1rem;padding-top:.5rem;text-align:initial;width:100%}.sgds.sidenav .sidenav-item .sgds.btn i.bi-chevron-down{transform:rotate(180deg);transition:all .3s ease-in-out}.sgds.sidenav .sidenav-item .sgds.btn.collapsed,.sgds.sidenav .sidenav-item .sgds.btn.inactive{border-color:transparent;color:inherit}.sgds.sidenav .sidenav-item .sgds.btn.collapsed i,.sgds.sidenav .sidenav-item .sgds.btn.inactive i{transform:rotate(0deg)}.sgds.sidenav .sidenav-item .sgds.btn.active,.sgds.sidenav .sidenav-item .sgds.btn:hover{border-left-color:#5925dc;color:#5925dc;font-weight:700}.sgds.sidenav .sidenav-item .collapse,.sgds.sidenav .sidenav-item .collapse.show,.sgds.sidenav .sidenav-item .collapsing{margin-top:1rem}.sgds.sidenav .sidenav-item .collapse a.nav-link,.sgds.sidenav .sidenav-item .collapse.show a.nav-link,.sgds.sidenav .sidenav-item .collapsing a.nav-link{color:inherit;font-size:inherit;padding:.5rem 0 .5rem 4.125rem}.sgds.sidenav .sidenav-item .collapse a.nav-link+a.nav-link,.sgds.sidenav .sidenav-item .collapse.show a.nav-link+a.nav-link,.sgds.sidenav .sidenav-item .collapsing a.nav-link+a.nav-link{margin-top:1rem}.sgds.sidenav .sidenav-item .collapse a.nav-link.active,.sgds.sidenav .sidenav-item .collapse a.nav-link:hover,.sgds.sidenav .sidenav-item .collapse.show a.nav-link.active,.sgds.sidenav .sidenav-item .collapse.show a.nav-link:hover,.sgds.sidenav .sidenav-item .collapsing a.nav-link.active,.sgds.sidenav .sidenav-item .collapsing a.nav-link:hover{color:#5925dc}.sgds.sidenav .sidenav-item .collapse a.nav-link.disabled,.sgds.sidenav .sidenav-item .collapse.show a.nav-link.disabled,.sgds.sidenav .sidenav-item .collapsing a.nav-link.disabled{color:#344054}.sgds.sidenav.sticky{--sgds-sidenav-sticky-top:0rem;max-height:calc(100vh - var(--sgds-sidenav-sticky-top));overflow-y:auto;position:sticky;top:var(--sgds-sidenav-sticky-top)}.sgds.stepper{display:flex;flex-wrap:wrap;font-size:1rem;min-height:calc(1rem*2rem)}.sgds.stepper:not(:last-child){margin-bottom:1.5rem}.sgds.stepper .stepper-item{flex-basis:0;flex-grow:1;margin-top:0;position:relative}.sgds.stepper .stepper-item:not(:first-child){flex-basis:1em;flex-grow:1;flex-shrink:1}.sgds.stepper .stepper-item:not(:first-child):before{content:" ";position:absolute}.sgds.stepper .stepper-item.is-clickable{cursor:pointer}.sgds.stepper .stepper-item.is-clickable:hover .stepper-marker{background-color:#491db6;border-color:#491db6}.sgds.stepper .stepper-item.is-clickable:hover .stepper-detail,.sgds.stepper .stepper-item.is-clickable:hover .stepper-detail>*{color:#491db6;transition:all .5s ease}.sgds.stepper .stepper-item:before{background:linear-gradient(270deg,#d0d5dd 50%,#5925dc 0);background-position:100% 100%;background-size:200% 100%}.sgds.stepper .stepper-item:before .stepper-marker{color:#fff}.sgds.stepper .stepper-item.is-active:before{background-position:0 100%}.sgds.stepper .stepper-item.is-active .stepper-marker{background-color:#fff;border-color:#5925dc;color:#5925dc}.sgds.stepper .stepper-item.is-completed:before{background-position:0 100%}.sgds.stepper .stepper-item.is-completed .stepper-marker{background-color:#5925dc;border-color:#5925dc;color:#fff}.sgds.stepper .stepper-item>.stepper-marker{align-items:center;background:#98a2b3;border:.25rem solid #fff;border-radius:50%;color:#fff;display:flex;font-weight:700;justify-content:center;z-index:1}.sgds.stepper .stepper-item>.stepper-detail{text-align:center}.sgds.stepper .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:1rem;width:100%}.sgds.stepper .stepper-item .stepper-marker{height:2rem;left:calc(50% - 1rem);position:absolute;width:2rem}.sgds.stepper .stepper-item .stepper-marker .icon *{font-size:1rem}.sgds.stepper .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:2rem}.sgds.stepper.is-small{font-size:.875rem;min-height:calc(.875rem*2rem)}.sgds.stepper.is-small .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:.875rem;width:100%}.sgds.stepper.is-small .stepper-item .stepper-marker{height:1.75rem;left:calc(50% - .875rem);position:absolute;width:1.75rem}.sgds.stepper.is-small .stepper-item .stepper-marker .icon *{font-size:.875rem}.sgds.stepper.is-small .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:1.75rem}.sgds.stepper.is-large{font-size:1.25rem;min-height:calc(1.25rem*2rem)}.sgds.stepper.is-large .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:1.25rem;width:100%}.sgds.stepper.is-large .stepper-item .stepper-marker{height:2.5rem;left:calc(50% - 1.25rem);position:absolute;width:2.5rem}.sgds.stepper.is-large .stepper-item .stepper-marker .icon *{font-size:1.25rem}.sgds.stepper.is-large .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:2.5rem}.toast{background-clip:padding-box;background-color:hsla(0,0%,100%,.85);border:1px solid rgba(0,0,0,.1);border-radius:.3125rem;box-shadow:0 .5rem 1rem rgba(0,0,0,.15);font-size:1rem;max-width:100%;pointer-events:auto;width:350px}.toast.showing{opacity:0}.toast:not(.show){display:none}.toast-container{max-width:100%;pointer-events:none;width:max-content}.toast-container>:not(:last-child){margin-bottom:.75rem}.toast-header{align-items:center;background-clip:padding-box;background-color:hsla(0,0%,100%,.85);border-bottom:1px solid rgba(0,0,0,.05);border-top-left-radius:calc(.3125rem - 1px);border-top-right-radius:calc(.3125rem - 1px);color:#344054;display:flex;padding:.5rem .75rem}.toast-header .btn-close{margin-left:.75rem;margin-right:-.375rem}.toast-body{word-wrap:break-word;padding:.75rem}.sgds.toast{border-color:#344054;border-left:5px solid;border-radius:0 .3125rem .3125rem 0;font-size:1rem}.sgds.toast .toast-header{border-bottom:0;padding:1rem 1rem .5rem}.sgds.toast .toast-header .btn-close{margin:0}.sgds.toast .toast-body{padding:0 1rem 1rem}.sgds.toast .toast-body button{margin-top:2rem}.sgds.is-primary{border-color:#5925dc}.sgds.is-primary .toast-header{color:#5925dc}.sgds.is-secondary{border-color:#1f69ff}.sgds.is-secondary .toast-header{color:#1f69ff}.sgds.is-success{border-color:#0a8217}.sgds.is-success .toast-header{color:#0a8217}.sgds.is-info{border-color:#0f71bb}.sgds.is-info .toast-header{color:#0f71bb}.sgds.is-warning{border-color:#f79009}.sgds.is-warning .toast-header{color:#f79009}.sgds.is-danger{border-color:#d7260f}.sgds.is-danger .toast-header{color:#d7260f}.sgds.is-light{border-color:#f7f7f9}.sgds.is-light .toast-header{color:#f7f7f9}.sgds.is-dark{border-color:#000}.sgds.is-dark .toast-header{color:#000}.modal{display:none;height:100%;left:0;outline:0;overflow-x:hidden;overflow-y:auto;position:fixed;top:0;width:100%;z-index:1055}.modal-dialog{margin:.5rem;pointer-events:none;position:relative;width:auto}.modal.fade .modal-dialog{transform:translateY(-50px);transition:transform .3s ease-out}@media (prefers-reduced-motion:reduce){.modal.fade .modal-dialog{transition:none}}.modal.show .modal-dialog{transform:none}.modal.modal-static .modal-dialog{transform:scale(1.02)}.modal-dialog-scrollable{height:calc(100% - 1rem)}.modal-dialog-scrollable .modal-content{max-height:100%;overflow:hidden}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-dialog-centered{align-items:center;display:flex;min-height:calc(100% - 1rem)}.modal-content{background-clip:padding-box;background-color:#fff;border:1px solid #98a2b3;border-radius:.3rem;display:flex;flex-direction:column;outline:0;pointer-events:auto;position:relative;width:100%}.modal-backdrop{background-color:#000;height:100vh;left:0;position:fixed;top:0;width:100vw;z-index:1050}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-header{align-items:center;border-bottom:1px solid #98a2b3;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px);display:flex;flex-shrink:0;justify-content:space-between;padding:1.5rem}.modal-header .btn-close{margin:-.75rem -.75rem -.75rem auto;padding:.75rem}.modal-title{line-height:2;margin-bottom:0}.modal-body{flex:1 1 auto;padding:1.5rem;position:relative}.modal-footer{align-items:center;border-bottom-left-radius:calc(.3rem - 1px);border-bottom-right-radius:calc(.3rem - 1px);border-top:1px solid transparent;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end;padding:1.25rem}.modal-footer>*{margin:.25rem}@media (min-width:576px){.modal-dialog{margin:1.75rem auto;max-width:500px}.modal-dialog-scrollable{height:calc(100% - 3.5rem)}.modal-dialog-centered{min-height:calc(100% - 3.5rem)}.modal-sm{max-width:300px}}@media (min-width:992px){.modal-lg,.modal-xl{max-width:800px}}@media (min-width:1200px){.modal-xl{max-width:1140px}}.modal-fullscreen{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen .modal-header{border-radius:0}.modal-fullscreen .modal-body{overflow-y:auto}.modal-fullscreen .modal-footer{border-radius:0}@media (max-width:575.98px){.modal-fullscreen-sm-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-sm-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-sm-down .modal-header{border-radius:0}.modal-fullscreen-sm-down .modal-body{overflow-y:auto}.modal-fullscreen-sm-down .modal-footer{border-radius:0}}@media (max-width:767.98px){.modal-fullscreen-md-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-md-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-md-down .modal-header{border-radius:0}.modal-fullscreen-md-down .modal-body{overflow-y:auto}.modal-fullscreen-md-down .modal-footer{border-radius:0}}@media (max-width:991.98px){.modal-fullscreen-lg-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-lg-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-lg-down .modal-header{border-radius:0}.modal-fullscreen-lg-down .modal-body{overflow-y:auto}.modal-fullscreen-lg-down .modal-footer{border-radius:0}}@media (max-width:1199.98px){.modal-fullscreen-xl-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-xl-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-xl-down .modal-header{border-radius:0}.modal-fullscreen-xl-down .modal-body{overflow-y:auto}.modal-fullscreen-xl-down .modal-footer{border-radius:0}}@media (max-width:1399.98px){.modal-fullscreen-xxl-down{height:100%;margin:0;max-width:none;width:100vw}.modal-fullscreen-xxl-down .modal-content{border:0;border-radius:0;height:100%}.modal-fullscreen-xxl-down .modal-header{border-radius:0}.modal-fullscreen-xxl-down .modal-body{overflow-y:auto}.modal-fullscreen-xxl-down .modal-footer{border-radius:0}}.sgds.modal .modal-footer{padding-top:0}.sgds.modal button.btn-close{font-size:.75rem}.sgds.modal[variant=centered-align-icon] .modal-content{text-align:center}.sgds.modal[variant=centered-align-icon] .modal-header{align-items:flex-start;border-bottom:0;padding-bottom:0}.sgds.modal[variant=centered-align-icon] .modal-title{display:flex;flex-flow:column;flex-grow:1;justify-content:center}.sgds.modal[variant=centered-align-icon] .modal-footer{justify-content:center}.sgds.nav-tabs{border-bottom:none;gap:2rem}.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link{background-color:#fff;border:1px solid #98a2b3;border-radius:.3125rem;color:#1d2939;min-width:11.875rem;padding:.75rem}.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-label{display:flex;justify-content:flex-end;text-align:right}.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-label.has-icon{justify-content:space-between}.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link .tabs-info-count{text-align:right}.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link.active,.sgds.nav-tabs[variant=tabs-info-toggle] li.nav-item button.nav-link:hover{border-color:#5925dc;color:#5925dc;font-weight:700}.sgds.nav-tabs[variant=tabs-basic-toggle]{gap:0}.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item+li.nav-item{margin-left:-2px}.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link{background-color:#fff;border:1px solid #98a2b3;border-radius:0;color:#1d2939;padding:.5rem 1.5rem}.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link i.left,.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link span.left{margin-right:1rem}.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link i.right,.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link span.right{margin-left:1rem}.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link.active,.sgds.nav-tabs[variant=tabs-basic-toggle] li.nav-item button.nav-link:hover{background-color:#0f71bb;color:#fff}.sgds.nav-tabs:not([variant=tabs-basic-toggle]):not([variant=tabs-info-toggle]) li.nav-item button.nav-link{background-color:transparent;border:none;color:#1d2939;padding-left:0;padding-right:0;padding-top:0}.sgds.nav-tabs:not([variant=tabs-basic-toggle]):not([variant=tabs-info-toggle]) li.nav-item button.nav-link.active{background-color:transparent;border-bottom:.125rem solid #0f71bb;font-weight:700}.sgds.tab-content{padding-bottom:1rem;padding-top:1rem}.tooltip{word-wrap:break-word;display:block;font-family:var(--sgds-font-sans-serif);font-size:.875rem;font-style:normal;font-weight:400;letter-spacing:normal;line-break:auto;line-height:2;margin:0;opacity:0;position:absolute;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;z-index:1080}.tooltip.show{opacity:1}.tooltip .tooltip-arrow{display:block;height:.4rem;position:absolute;width:.8rem}.tooltip .tooltip-arrow:before{border-color:transparent;border-style:solid;content:"";position:absolute}.bs-tooltip-auto[data-popper-placement^=top],.bs-tooltip-top{padding:.4rem 0}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow,.bs-tooltip-top .tooltip-arrow{bottom:0}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow:before,.bs-tooltip-top .tooltip-arrow:before{border-top-color:#344054;border-width:.4rem .4rem 0;top:-1px}.bs-tooltip-auto[data-popper-placement^=right],.bs-tooltip-end{padding:0 .4rem}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow,.bs-tooltip-end .tooltip-arrow{height:.8rem;left:0;width:.4rem}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow:before,.bs-tooltip-end .tooltip-arrow:before{border-right-color:#344054;border-width:.4rem .4rem .4rem 0;right:-1px}.bs-tooltip-auto[data-popper-placement^=bottom],.bs-tooltip-bottom{padding:.4rem 0}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow,.bs-tooltip-bottom .tooltip-arrow{top:0}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow:before,.bs-tooltip-bottom .tooltip-arrow:before{border-bottom-color:#344054;border-width:0 .4rem .4rem;bottom:-1px}.bs-tooltip-auto[data-popper-placement^=left],.bs-tooltip-start{padding:0 .4rem}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow,.bs-tooltip-start .tooltip-arrow{height:.8rem;right:0;width:.4rem}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow:before,.bs-tooltip-start .tooltip-arrow:before{border-left-color:#344054;border-width:.4rem 0 .4rem .4rem;left:-1px}.tooltip-inner{background-color:#344054;border-radius:.3125rem;color:#fff;max-width:200px;padding:.5rem 1rem;text-align:center}.sgds.tooltip .tooltip-inner{display:flex;gap:2rem;text-align:left}.popover{word-wrap:break-word;background-clip:padding-box;background-color:#fff;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;display:block;font-family:var(--sgds-font-sans-serif);font-size:.875rem;font-style:normal;font-weight:400;left:0;letter-spacing:normal;line-break:auto;line-height:2;max-width:276px;position:absolute;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;top:0;white-space:normal;word-break:normal;word-spacing:normal;z-index:1070}.popover .popover-arrow{display:block;height:.5rem;position:absolute;width:1rem}.popover .popover-arrow:after,.popover .popover-arrow:before{border-color:transparent;border-style:solid;content:"";display:block;position:absolute}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow,.bs-popover-top>.popover-arrow{bottom:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:before,.bs-popover-top>.popover-arrow:before{border-top-color:rgba(0,0,0,.25);border-width:.5rem .5rem 0;bottom:0}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:after,.bs-popover-top>.popover-arrow:after{border-top-color:#fff;border-width:.5rem .5rem 0;bottom:1px}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow,.bs-popover-end>.popover-arrow{height:1rem;left:calc(-.5rem - 1px);width:.5rem}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:before,.bs-popover-end>.popover-arrow:before{border-right-color:rgba(0,0,0,.25);border-width:.5rem .5rem .5rem 0;left:0}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:after,.bs-popover-end>.popover-arrow:after{border-right-color:#fff;border-width:.5rem .5rem .5rem 0;left:1px}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow,.bs-popover-bottom>.popover-arrow{top:calc(-.5rem - 1px)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:before,.bs-popover-bottom>.popover-arrow:before{border-bottom-color:rgba(0,0,0,.25);border-width:0 .5rem .5rem;top:0}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:after,.bs-popover-bottom>.popover-arrow:after{border-bottom-color:#fff;border-width:0 .5rem .5rem;top:1px}.bs-popover-auto[data-popper-placement^=bottom] .popover-header:before,.bs-popover-bottom .popover-header:before{border-bottom:1px solid #f0f0f0;content:"";display:block;left:50%;margin-left:-.5rem;position:absolute;top:0;width:1rem}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow,.bs-popover-start>.popover-arrow{height:1rem;right:calc(-.5rem - 1px);width:.5rem}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:before,.bs-popover-start>.popover-arrow:before{border-left-color:rgba(0,0,0,.25);border-width:.5rem 0 .5rem .5rem;right:0}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:after,.bs-popover-start>.popover-arrow:after{border-left-color:#fff;border-width:.5rem 0 .5rem .5rem;right:1px}.popover-header{background-color:#f0f0f0;border-bottom:1px solid rgba(0,0,0,.2);border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px);font-size:1rem;margin-bottom:0;padding:.5rem 1rem}.popover-header:empty{display:none}.popover-body{color:#1d2939;padding:1rem}.carousel{position:relative}.carousel.pointer-event{touch-action:pan-y}.carousel-inner{overflow:hidden;position:relative;width:100%}.carousel-inner:after{clear:both;content:"";display:block}.carousel-item{backface-visibility:hidden;display:none;float:left;margin-right:-100%;position:relative;transition:transform .6s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.carousel-item{transition:none}}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.active.carousel-item-end,.carousel-item-next:not(.carousel-item-start){transform:translateX(100%)}.active.carousel-item-start,.carousel-item-prev:not(.carousel-item-end){transform:translateX(-100%)}.carousel-fade .carousel-item{opacity:0;transform:none;transition-property:opacity}.carousel-fade .carousel-item-next.carousel-item-start,.carousel-fade .carousel-item-prev.carousel-item-end,.carousel-fade .carousel-item.active{opacity:1;z-index:1}.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{opacity:0;transition:opacity 0s .6s;z-index:0}@media (prefers-reduced-motion:reduce){.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{transition:none}}.carousel-control-next,.carousel-control-prev{align-items:center;background:none;border:0;bottom:0;color:#fff;display:flex;justify-content:center;opacity:.5;padding:0;position:absolute;text-align:center;top:0;transition:opacity .15s ease;width:15%;z-index:1}@media (prefers-reduced-motion:reduce){.carousel-control-next,.carousel-control-prev{transition:none}}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;opacity:.9;outline:0;text-decoration:none}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{background-position:50%;background-repeat:no-repeat;background-size:100% 100%;display:inline-block;height:2rem;width:2rem}.carousel-control-prev-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")}.carousel-control-next-icon{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")}.carousel-indicators{bottom:0;display:flex;justify-content:center;left:0;list-style:none;margin-bottom:1rem;margin-left:15%;margin-right:15%;padding:0;position:absolute;right:0;z-index:2}.carousel-indicators [data-bs-target]{background-clip:padding-box;background-color:#fff;border:0;border-bottom:10px solid transparent;border-top:10px solid transparent;box-sizing:content-box;cursor:pointer;flex:0 1 auto;height:3px;margin-left:3px;margin-right:3px;opacity:.5;padding:0;text-indent:-999px;transition:opacity .6s ease;width:30px}@media (prefers-reduced-motion:reduce){.carousel-indicators [data-bs-target]{transition:none}}.carousel-indicators .active{opacity:1}.carousel-caption{bottom:1.25rem;color:#fff;left:15%;padding-bottom:1.25rem;padding-top:1.25rem;position:absolute;right:15%;text-align:center}.carousel-dark .carousel-control-next-icon,.carousel-dark .carousel-control-prev-icon{filter:invert(1) grayscale(100)}.carousel-dark .carousel-indicators [data-bs-target]{background-color:#000}.carousel-dark .carousel-caption{color:#000}@keyframes spinner-border{to{transform:rotate(1turn)}}.spinner-border{animation:spinner-border .75s linear infinite;border:.25em solid;border-radius:50%;border-right:.25em solid transparent;display:inline-block;height:2rem;vertical-align:-.125em;width:2rem}.spinner-border-sm{border-width:.2em;height:1rem;width:1rem}@keyframes spinner-grow{0%{transform:scale(0)}50%{opacity:1;transform:none}}.spinner-grow{animation:spinner-grow .75s linear infinite;background-color:currentColor;border-radius:50%;display:inline-block;height:2rem;opacity:0;vertical-align:-.125em;width:2rem}.spinner-grow-sm{height:1rem;width:1rem}@media (prefers-reduced-motion:reduce){.spinner-border,.spinner-grow{animation-duration:1.5s}}.offcanvas{background-clip:padding-box;background-color:#fff;bottom:0;display:flex;flex-direction:column;max-width:100%;outline:0;position:fixed;transition:transform .3s ease-in-out;visibility:hidden;z-index:1045}@media (prefers-reduced-motion:reduce){.offcanvas{transition:none}}.offcanvas-backdrop{background-color:#000;height:100vh;left:0;position:fixed;top:0;width:100vw;z-index:1040}.offcanvas-backdrop.fade{opacity:0}.offcanvas-backdrop.show{opacity:.5}.offcanvas-header{align-items:center;display:flex;justify-content:space-between;padding:1.5rem}.offcanvas-header .btn-close{margin-bottom:-.75rem;margin-right:-.75rem;margin-top:-.75rem;padding:.75rem}.offcanvas-title{line-height:2;margin-bottom:0}.offcanvas-body{flex-grow:1;overflow-y:auto;padding:1.5rem}.offcanvas-start{border-right:1px solid #98a2b3;left:0;top:0;transform:translateX(-100%);width:400px}.offcanvas-end{border-left:1px solid #98a2b3;right:0;top:0;transform:translateX(100%);width:400px}.offcanvas-top{border-bottom:1px solid #98a2b3;top:0;transform:translateY(-100%)}.offcanvas-bottom,.offcanvas-top{height:30vh;left:0;max-height:100%;right:0}.offcanvas-bottom{border-top:1px solid #98a2b3;transform:translateY(100%)}.offcanvas.show{transform:none}.placeholder{background-color:currentColor;cursor:wait;display:inline-block;min-height:1em;opacity:.5;vertical-align:middle}.placeholder.btn:before{content:"";display:inline-block}.placeholder-xs{min-height:.6em}.placeholder-sm{min-height:.8em}.placeholder-lg{min-height:1.2em}.placeholder-glow .placeholder{animation:placeholder-glow 2s ease-in-out infinite}@keyframes placeholder-glow{50%{opacity:.2}}.placeholder-wave{animation:placeholder-wave 2s linear infinite;mask-image:linear-gradient(130deg,#000 55%,rgba(0,0,0,.8) 75%,#000 95%);mask-size:200% 100%}@keyframes placeholder-wave{to{mask-position:-200% 0}}.sgds.combobox{justify-content:flex-end}.sgds.combobox>.form-control{padding-left:1rem;padding-right:3rem}.sgds.combobox>.dropdown-menu{min-width:100%}.clearfix:after{clear:both;content:"";display:block}.link-primary{color:#5925dc}.link-primary:focus,.link-primary:hover{color:#471eb0}.link-secondary{color:#1f69ff}.link-secondary:focus,.link-secondary:hover{color:#1954cc}.link-success{color:#0a8217}.link-success:focus,.link-success:hover{color:#086812}.link-info{color:#0f71bb}.link-info:focus,.link-info:hover{color:#0c5a96}.link-warning{color:#f79009}.link-warning:focus,.link-warning:hover{color:#f9a63a}.link-danger{color:#d7260f}.link-danger:focus,.link-danger:hover{color:#ac1e0c}.link-light{color:#f7f7f9}.link-light:focus,.link-light:hover{color:#f9f9fa}.link-dark,.link-dark:focus,.link-dark:hover{color:#000}.ratio{position:relative;width:100%}.ratio:before{content:"";display:block;padding-top:var(--sgds-aspect-ratio)}.ratio>*{height:100%;left:0;position:absolute;top:0;width:100%}.ratio-1x1{--sgds-aspect-ratio:100%}.ratio-4x3{--sgds-aspect-ratio:75%}.ratio-16x9{--sgds-aspect-ratio:56.25%}.ratio-21x9{--sgds-aspect-ratio:42.8571428571%}.fixed-top{top:0}.fixed-bottom,.fixed-top{left:0;position:fixed;right:0;z-index:1030}.fixed-bottom{bottom:0}.sticky-top{position:sticky;top:0;z-index:1020}@media (min-width:576px){.sticky-sm-top{position:sticky;top:0;z-index:1020}}@media (min-width:768px){.sticky-md-top{position:sticky;top:0;z-index:1020}}@media (min-width:992px){.sticky-lg-top{position:sticky;top:0;z-index:1020}}@media (min-width:1200px){.sticky-xl-top{position:sticky;top:0;z-index:1020}}@media (min-width:1400px){.sticky-xxl-top{position:sticky;top:0;z-index:1020}}.hstack{align-items:center;flex-direction:row}.hstack,.vstack{align-self:stretch;display:flex}.vstack{flex:1 1 auto;flex-direction:column}.visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within){clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}.stretched-link:after{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:1}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vr{align-self:stretch;background-color:currentColor;display:inline-block;min-height:1em;opacity:.25;width:1px}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.float-start{float:left!important}.float-end{float:right!important}.float-none{float:none!important}.opacity-0{opacity:0!important}.opacity-25{opacity:.25!important}.opacity-50{opacity:.5!important}.opacity-75{opacity:.75!important}.opacity-100{opacity:1!important}.overflow-auto{overflow:auto!important}.overflow-hidden{overflow:hidden!important}.overflow-visible{overflow:visible!important}.overflow-scroll{overflow:scroll!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block,.form-text{display:block!important}.d-grid{display:grid!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:flex!important}.d-inline-flex{display:inline-flex!important}.d-none{display:none!important}.shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}.shadow-sm{box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important}.shadow-lg{box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important}.shadow-none{box-shadow:none!important}.position-static{position:static!important}.position-relative{position:relative!important}.position-absolute{position:absolute!important}.position-fixed{position:fixed!important}.position-sticky{position:sticky!important}.top-0{top:0!important}.top-50{top:50%!important}.top-100{top:100%!important}.bottom-0{bottom:0!important}.bottom-50{bottom:50%!important}.bottom-100{bottom:100%!important}.start-0{left:0!important}.start-50{left:50%!important}.start-100{left:100%!important}.end-0{right:0!important}.end-50{right:50%!important}.end-100{right:100%!important}.translate-middle{transform:translate(-50%,-50%)!important}.translate-middle-x{transform:translateX(-50%)!important}.translate-middle-y{transform:translateY(-50%)!important}.border{border:1px solid #98a2b3!important}.border-0{border:0!important}.border-top{border-top:1px solid #98a2b3!important}.border-top-0{border-top:0!important}.border-end{border-right:1px solid #98a2b3!important}.border-end-0{border-right:0!important}.border-bottom{border-bottom:1px solid #98a2b3!important}.border-bottom-0{border-bottom:0!important}.border-start{border-left:1px solid #98a2b3!important}.border-start-0{border-left:0!important}.border-primary{border-color:#5925dc!important}.border-secondary{border-color:#1f69ff!important}.border-success{border-color:#0a8217!important}.border-info{border-color:#0f71bb!important}.border-warning{border-color:#f79009!important}.border-danger{border-color:#d7260f!important}.border-light{border-color:#f7f7f9!important}.border-dark{border-color:#000!important}.border-white{border-color:#fff!important}.border-1{border-width:1px!important}.border-2{border-width:2px!important}.border-3{border-width:3px!important}.border-4{border-width:4px!important}.border-5{border-width:5px!important}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.w-auto{width:auto!important}.mw-100{max-width:100%!important}.vw-100{width:100vw!important}.min-vw-100{min-width:100vw!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.h-auto{height:auto!important}.mh-100{max-height:100%!important}.vh-100{height:100vh!important}.min-vh-100{min-height:100vh!important}.flex-fill{flex:1 1 auto!important}.flex-row{flex-direction:row!important}.flex-column{flex-direction:column!important}.flex-row-reverse{flex-direction:row-reverse!important}.flex-column-reverse{flex-direction:column-reverse!important}.flex-grow-0{flex-grow:0!important}.flex-grow-1{flex-grow:1!important}.flex-shrink-0{flex-shrink:0!important}.flex-shrink-1{flex-shrink:1!important}.flex-wrap{flex-wrap:wrap!important}.flex-nowrap{flex-wrap:nowrap!important}.flex-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-0{gap:0!important}.gap-1{gap:.25rem!important}.gap-2{gap:.5rem!important}.gap-3{gap:1rem!important}.gap-4{gap:1.5rem!important}.gap-5{gap:2rem!important}.gap-6{gap:2.5rem!important}.gap-7{gap:3rem!important}.gap-8{gap:3.5rem!important}.justify-content-start{justify-content:flex-start!important}.justify-content-end{justify-content:flex-end!important}.justify-content-center,.sgds.modal[variant=centered-align-icon] .modal-footer{justify-content:center!important}.justify-content-between{justify-content:space-between!important}.justify-content-around{justify-content:space-around!important}.justify-content-evenly{justify-content:space-evenly!important}.align-items-start{align-items:flex-start!important}.align-items-end{align-items:flex-end!important}.align-items-center{align-items:center!important}.align-items-baseline{align-items:baseline!important}.align-items-stretch{align-items:stretch!important}.align-content-start{align-content:flex-start!important}.align-content-end{align-content:flex-end!important}.align-content-center{align-content:center!important}.align-content-between{align-content:space-between!important}.align-content-around{align-content:space-around!important}.align-content-stretch{align-content:stretch!important}.align-self-auto{align-self:auto!important}.align-self-start,.sgds.alert>i{align-self:flex-start!important}.align-self-end{align-self:flex-end!important}.align-self-center{align-self:center!important}.align-self-baseline{align-self:baseline!important}.align-self-stretch{align-self:stretch!important}.order-first{order:-1!important}.order-0{order:0!important}.order-1{order:1!important}.order-2{order:2!important}.order-3{order:3!important}.order-4{order:4!important}.order-5{order:5!important}.order-last{order:6!important}.m-0{margin:0!important}.m-1{margin:.25rem!important}.m-2{margin:.5rem!important}.m-3{margin:1rem!important}.m-4{margin:1.5rem!important}.m-5{margin:2rem!important}.m-6{margin:2.5rem!important}.m-7{margin:3rem!important}.m-8{margin:3.5rem!important}.m-auto{margin:auto!important}.mx-0{margin-left:0!important;margin-right:0!important}.mx-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-3{margin-left:1rem!important;margin-right:1rem!important}.mx-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-5{margin-left:2rem!important;margin-right:2rem!important}.mx-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-7{margin-left:3rem!important;margin-right:3rem!important}.mx-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-auto{margin-left:auto!important;margin-right:auto!important}.my-0{margin-bottom:0!important;margin-top:0!important}.my-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-0{margin-top:0!important}.mt-1{margin-top:.25rem!important}.mt-2{margin-top:.5rem!important}.mt-3{margin-top:1rem!important}.mt-4{margin-top:1.5rem!important}.mt-5{margin-top:2rem!important}.mt-6{margin-top:2.5rem!important}.mt-7{margin-top:3rem!important}.mt-8{margin-top:3.5rem!important}.mt-auto{margin-top:auto!important}.me-0{margin-right:0!important}.me-1{margin-right:.25rem!important}.me-2{margin-right:.5rem!important}.me-3{margin-right:1rem!important}.me-4{margin-right:1.5rem!important}.me-5{margin-right:2rem!important}.me-6{margin-right:2.5rem!important}.me-7{margin-right:3rem!important}.me-8{margin-right:3.5rem!important}.me-auto{margin-right:auto!important}.mb-0{margin-bottom:0!important}.mb-1{margin-bottom:.25rem!important}.mb-2{margin-bottom:.5rem!important}.mb-3{margin-bottom:1rem!important}.mb-4{margin-bottom:1.5rem!important}.mb-5{margin-bottom:2rem!important}.mb-6{margin-bottom:2.5rem!important}.mb-7{margin-bottom:3rem!important}.mb-8{margin-bottom:3.5rem!important}.mb-auto{margin-bottom:auto!important}.ms-0{margin-left:0!important}.ms-1{margin-left:.25rem!important}.ms-2{margin-left:.5rem!important}.ms-3{margin-left:1rem!important}.ms-4{margin-left:1.5rem!important}.ms-5{margin-left:2rem!important}.ms-6{margin-left:2.5rem!important}.ms-7{margin-left:3rem!important}.ms-8{margin-left:3.5rem!important}.ms-auto,.sgds.sidenav .sidenav-item .sgds.btn i.bi-chevron-down{margin-left:auto!important}.p-0{padding:0!important}.p-1{padding:.25rem!important}.p-2{padding:.5rem!important}.p-3{padding:1rem!important}.p-4{padding:1.5rem!important}.p-5{padding:2rem!important}.p-6{padding:2.5rem!important}.p-7{padding:3rem!important}.p-8{padding:3.5rem!important}.px-0{padding-left:0!important;padding-right:0!important}.px-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-3{padding-left:1rem!important;padding-right:1rem!important}.px-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-5{padding-left:2rem!important;padding-right:2rem!important}.px-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-7{padding-left:3rem!important;padding-right:3rem!important}.px-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-0{padding-bottom:0!important;padding-top:0!important}.py-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-0{padding-top:0!important}.pt-1{padding-top:.25rem!important}.pt-2{padding-top:.5rem!important}.pt-3{padding-top:1rem!important}.pt-4{padding-top:1.5rem!important}.pt-5{padding-top:2rem!important}.pt-6{padding-top:2.5rem!important}.pt-7{padding-top:3rem!important}.pt-8{padding-top:3.5rem!important}.pe-0{padding-right:0!important}.pe-1{padding-right:.25rem!important}.pe-2{padding-right:.5rem!important}.pe-3{padding-right:1rem!important}.pe-4{padding-right:1.5rem!important}.pe-5{padding-right:2rem!important}.pe-6{padding-right:2.5rem!important}.pe-7{padding-right:3rem!important}.pe-8{padding-right:3.5rem!important}.pb-0{padding-bottom:0!important}.pb-1{padding-bottom:.25rem!important}.pb-2{padding-bottom:.5rem!important}.pb-3{padding-bottom:1rem!important}.pb-4{padding-bottom:1.5rem!important}.pb-5{padding-bottom:2rem!important}.pb-6{padding-bottom:2.5rem!important}.pb-7{padding-bottom:3rem!important}.pb-8{padding-bottom:3.5rem!important}.ps-0{padding-left:0!important}.ps-1{padding-left:.25rem!important}.ps-2{padding-left:.5rem!important}.ps-3{padding-left:1rem!important}.ps-4{padding-left:1.5rem!important}.ps-5{padding-left:2rem!important}.ps-6{padding-left:2.5rem!important}.ps-7{padding-left:3rem!important}.ps-8{padding-left:3.5rem!important}.font-monospace{font-family:var(--sgds-font-monospace)!important}.fs-0{font-size:calc(1.475rem + 2.7vw)!important}.fs-1{font-size:calc(1.375rem + 1.5vw)!important}.fs-2{font-size:calc(1.325rem + .9vw)!important}.fs-3{font-size:calc(1.275rem + .3vw)!important}.fs-4{font-size:1.125rem!important}.fs-5,.fs-6{font-size:1rem!important}.fst-italic{font-style:italic!important}.fst-normal{font-style:normal!important}.fw-light{font-weight:300!important}.fw-lighter{font-weight:lighter!important}.fw-normal{font-weight:400!important}.fw-bold{font-weight:700!important}.fw-bolder{font-weight:bolder!important}.lh-1{line-height:1!important}.lh-sm{line-height:1.75!important}.lh-base{line-height:2!important}.lh-lg{line-height:2.25!important}.text-start{text-align:left!important}.text-end{text-align:right!important}.text-center{text-align:center!important}.text-decoration-none{text-decoration:none!important}.text-decoration-underline{text-decoration:underline!important}.text-decoration-line-through{text-decoration:line-through!important}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.text-wrap{white-space:normal!important}.text-nowrap{white-space:nowrap!important}.text-break{word-wrap:break-word!important;word-break:break-word!important}.text-primary{--sgds-text-opacity:1;color:rgba(var(--sgds-primary-rgb),var(--sgds-text-opacity))!important}.text-secondary{--sgds-text-opacity:1;color:rgba(var(--sgds-secondary-rgb),var(--sgds-text-opacity))!important}.text-success{--sgds-text-opacity:1;color:rgba(var(--sgds-success-rgb),var(--sgds-text-opacity))!important}.text-info{--sgds-text-opacity:1;color:rgba(var(--sgds-info-rgb),var(--sgds-text-opacity))!important}.text-warning{--sgds-text-opacity:1;color:rgba(var(--sgds-warning-rgb),var(--sgds-text-opacity))!important}.text-danger{--sgds-text-opacity:1;color:rgba(var(--sgds-danger-rgb),var(--sgds-text-opacity))!important}.text-light{--sgds-text-opacity:1;color:rgba(var(--sgds-light-rgb),var(--sgds-text-opacity))!important}.text-dark{--sgds-text-opacity:1;color:rgba(var(--sgds-dark-rgb),var(--sgds-text-opacity))!important}.text-black{--sgds-text-opacity:1;color:rgba(var(--sgds-black-rgb),var(--sgds-text-opacity))!important}.text-white{--sgds-text-opacity:1;color:rgba(var(--sgds-white-rgb),var(--sgds-text-opacity))!important}.text-body{--sgds-text-opacity:1;color:rgba(var(--sgds-body-color-rgb),var(--sgds-text-opacity))!important}.sgds.datepicker td.disabled,.text-muted{--sgds-text-opacity:1;color:#667085!important}.text-black-50{--sgds-text-opacity:1;color:rgba(0,0,0,.5)!important}.text-white-50{--sgds-text-opacity:1;color:hsla(0,0%,100%,.5)!important}.text-reset{--sgds-text-opacity:1;color:inherit!important}.text-primary-100{--sgds-text-opacity:1;color:#ece6fb!important}.text-primary-200{--sgds-text-opacity:1;color:#c7b6f3!important}.text-primary-300{--sgds-text-opacity:1;color:#a386ec!important}.text-primary-400{--sgds-text-opacity:1;color:#7e55e4!important}.text-primary-500{--sgds-text-opacity:1;color:#5925dc!important}.text-primary-600{--sgds-text-opacity:1;color:#491db6!important}.text-primary-700{--sgds-text-opacity:1;color:#39178e!important}.text-primary-800{--sgds-text-opacity:1;color:#291167!important}.text-primary-900{--sgds-text-opacity:1;color:#190a3f!important}.text-secondary-100{--sgds-text-opacity:1;color:#ebf1ff!important}.text-secondary-200{--sgds-text-opacity:1;color:#d3e2ff!important}.text-secondary-300{--sgds-text-opacity:1;color:#9bf!important}.text-secondary-400{--sgds-text-opacity:1;color:#70a0ff!important}.text-secondary-500{--sgds-text-opacity:1;color:#1f69ff!important}.text-secondary-600{--sgds-text-opacity:1;color:#004ff0!important}.text-secondary-700{--sgds-text-opacity:1;color:#0040c2!important}.text-secondary-800{--sgds-text-opacity:1;color:#003194!important}.text-secondary-900{--sgds-text-opacity:1;color:#026!important}.text-purple-100{--sgds-text-opacity:1;color:#ece6fb!important}.text-purple-200{--sgds-text-opacity:1;color:#c7b6f3!important}.text-purple-300{--sgds-text-opacity:1;color:#a386ec!important}.text-purple-400{--sgds-text-opacity:1;color:#7e55e4!important}.text-purple-500{--sgds-text-opacity:1;color:#5925dc!important}.text-purple-600{--sgds-text-opacity:1;color:#491db6!important}.text-purple-700{--sgds-text-opacity:1;color:#39178e!important}.text-purple-800{--sgds-text-opacity:1;color:#291167!important}.text-purple-900{--sgds-text-opacity:1;color:#190a3f!important}.text-red-100{--sgds-text-opacity:1;color:#fff4f3!important}.text-red-200{--sgds-text-opacity:1;color:#ffcfc8!important}.text-red-300{--sgds-text-opacity:1;color:#fc9c90!important}.text-red-400{--sgds-text-opacity:1;color:#fb7463!important}.text-red-500{--sgds-text-opacity:1;color:#fa5741!important}.text-red-600{--sgds-text-opacity:1;color:#d7260f!important}.text-red-700{--sgds-text-opacity:1;color:#f8331c!important}.text-red-800{--sgds-text-opacity:1;color:#560f06!important}.text-red-900{--sgds-text-opacity:1;color:#2b0803!important}.text-yellow-100{--sgds-text-opacity:1;color:#fffaeb!important}.text-yellow-200{--sgds-text-opacity:1;color:#fef0c7!important}.text-yellow-300{--sgds-text-opacity:1;color:#fedf89!important}.text-yellow-400{--sgds-text-opacity:1;color:#fec84b!important}.text-yellow-500{--sgds-text-opacity:1;color:#fdb022!important}.text-yellow-600{--sgds-text-opacity:1;color:#f79009!important}.text-yellow-700{--sgds-text-opacity:1;color:#dc6803!important}.text-yellow-800{--sgds-text-opacity:1;color:#633a04!important}.text-yellow-900{--sgds-text-opacity:1;color:#311d02!important}.text-green-100{--sgds-text-opacity:1;color:#e7f6e9!important}.text-green-200{--sgds-text-opacity:1;color:#c4e8c8!important}.text-green-300{--sgds-text-opacity:1;color:#9dd9a3!important}.text-green-400{--sgds-text-opacity:1;color:#58be62!important}.text-green-500{--sgds-text-opacity:1;color:#3bb346!important}.text-green-600{--sgds-text-opacity:1;color:#0a8217!important}.text-green-700{--sgds-text-opacity:1;color:#2da337!important}.text-green-800{--sgds-text-opacity:1;color:#043409!important}.text-green-900{--sgds-text-opacity:1;color:#021a05!important}.text-cyan-100{--sgds-text-opacity:1;color:#e2eff8!important}.text-cyan-200{--sgds-text-opacity:1;color:#b9d8ee!important}.text-cyan-300{--sgds-text-opacity:1;color:#90c1e4!important}.text-cyan-400{--sgds-text-opacity:1;color:#58a1d4!important}.text-cyan-500{--sgds-text-opacity:1;color:#59a1d4!important}.text-cyan-600{--sgds-text-opacity:1;color:#0f71bb!important}.text-cyan-700{--sgds-text-opacity:1;color:#0c5b97!important}.text-cyan-800{--sgds-text-opacity:1;color:#0a4776!important}.text-cyan-900{--sgds-text-opacity:1;color:#08395e!important}.text-dark-100{--sgds-text-opacity:1;color:#f7f7f9!important}.text-dark-200{--sgds-text-opacity:1;color:#e4e7ec!important}.text-dark-300{--sgds-text-opacity:1;color:#d0d5dd!important}.text-dark-400{--sgds-text-opacity:1;color:#98a2b3!important}.text-dark-500{--sgds-text-opacity:1;color:#667085!important}.text-dark-600{--sgds-text-opacity:1;color:#344054!important}.text-dark-700{--sgds-text-opacity:1;color:#1d2939!important}.text-dark-800,.text-dark-900{--sgds-text-opacity:1;color:#000!important}.text-light-100{--sgds-text-opacity:1;color:#f7f7f9!important}.text-light-200{--sgds-text-opacity:1;color:#e4e7ec!important}.text-light-300{--sgds-text-opacity:1;color:#d0d5dd!important}.text-light-400{--sgds-text-opacity:1;color:#98a2b3!important}.text-light-500{--sgds-text-opacity:1;color:#667085!important}.text-light-600{--sgds-text-opacity:1;color:#344054!important}.text-light-700{--sgds-text-opacity:1;color:#1d2939!important}.text-light-800,.text-light-900{--sgds-text-opacity:1;color:#000!important}.text-opacity-25{--sgds-text-opacity:0.25}.text-opacity-50{--sgds-text-opacity:0.5}.text-opacity-75{--sgds-text-opacity:0.75}.text-opacity-100{--sgds-text-opacity:1}.bg-primary{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-primary-rgb),var(--sgds-bg-opacity))!important}.bg-secondary{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-secondary-rgb),var(--sgds-bg-opacity))!important}.bg-success{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-success-rgb),var(--sgds-bg-opacity))!important}.bg-info{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-info-rgb),var(--sgds-bg-opacity))!important}.bg-warning{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-warning-rgb),var(--sgds-bg-opacity))!important}.bg-danger{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-danger-rgb),var(--sgds-bg-opacity))!important}.bg-light{background-color:rgba(var(--sgds-light-rgb),var(--sgds-bg-opacity))!important}.bg-dark,.bg-light{--sgds-bg-opacity:1}.bg-dark{background-color:rgba(var(--sgds-dark-rgb),var(--sgds-bg-opacity))!important}.bg-black{--sgds-bg-opacity:1;background-color:rgba(var(--sgds-black-rgb),var(--sgds-bg-opacity))!important}.bg-white{background-color:rgba(var(--sgds-white-rgb),var(--sgds-bg-opacity))!important}.bg-body,.bg-white{--sgds-bg-opacity:1}.bg-body{background-color:rgba(var(--sgds-body-bg-rgb),var(--sgds-bg-opacity))!important}.bg-transparent{--sgds-bg-opacity:1;background-color:transparent!important}.bg-primary-100{--sgds-bg-opacity:1;background-color:#ece6fb!important}.bg-primary-200{--sgds-bg-opacity:1;background-color:#c7b6f3!important}.bg-primary-300{--sgds-bg-opacity:1;background-color:#a386ec!important}.bg-primary-400{--sgds-bg-opacity:1;background-color:#7e55e4!important}.bg-primary-500{--sgds-bg-opacity:1;background-color:#5925dc!important}.bg-primary-600{--sgds-bg-opacity:1;background-color:#491db6!important}.bg-primary-700{--sgds-bg-opacity:1;background-color:#39178e!important}.bg-primary-800{--sgds-bg-opacity:1;background-color:#291167!important}.bg-primary-900{--sgds-bg-opacity:1;background-color:#190a3f!important}.bg-secondary-100{--sgds-bg-opacity:1;background-color:#ebf1ff!important}.bg-secondary-200{--sgds-bg-opacity:1;background-color:#d3e2ff!important}.bg-secondary-300{--sgds-bg-opacity:1;background-color:#9bf!important}.bg-secondary-400{--sgds-bg-opacity:1;background-color:#70a0ff!important}.bg-secondary-500{--sgds-bg-opacity:1;background-color:#1f69ff!important}.bg-secondary-600{--sgds-bg-opacity:1;background-color:#004ff0!important}.bg-secondary-700{--sgds-bg-opacity:1;background-color:#0040c2!important}.bg-secondary-800{--sgds-bg-opacity:1;background-color:#003194!important}.bg-secondary-900{--sgds-bg-opacity:1;background-color:#026!important}.bg-purple-100{--sgds-bg-opacity:1;background-color:#ece6fb!important}.bg-purple-200{--sgds-bg-opacity:1;background-color:#c7b6f3!important}.bg-purple-300{--sgds-bg-opacity:1;background-color:#a386ec!important}.bg-purple-400{--sgds-bg-opacity:1;background-color:#7e55e4!important}.bg-purple-500{--sgds-bg-opacity:1;background-color:#5925dc!important}.bg-purple-600{--sgds-bg-opacity:1;background-color:#491db6!important}.bg-purple-700{--sgds-bg-opacity:1;background-color:#39178e!important}.bg-purple-800{--sgds-bg-opacity:1;background-color:#291167!important}.bg-purple-900{--sgds-bg-opacity:1;background-color:#190a3f!important}.bg-red-100{--sgds-bg-opacity:1;background-color:#fff4f3!important}.bg-red-200{--sgds-bg-opacity:1;background-color:#ffcfc8!important}.bg-red-300{--sgds-bg-opacity:1;background-color:#fc9c90!important}.bg-red-400{--sgds-bg-opacity:1;background-color:#fb7463!important}.bg-red-500{--sgds-bg-opacity:1;background-color:#fa5741!important}.bg-red-600{--sgds-bg-opacity:1;background-color:#d7260f!important}.bg-red-700{--sgds-bg-opacity:1;background-color:#f8331c!important}.bg-red-800{--sgds-bg-opacity:1;background-color:#560f06!important}.bg-red-900{--sgds-bg-opacity:1;background-color:#2b0803!important}.bg-yellow-100{--sgds-bg-opacity:1;background-color:#fffaeb!important}.bg-yellow-200{--sgds-bg-opacity:1;background-color:#fef0c7!important}.bg-yellow-300{--sgds-bg-opacity:1;background-color:#fedf89!important}.bg-yellow-400{--sgds-bg-opacity:1;background-color:#fec84b!important}.bg-yellow-500{--sgds-bg-opacity:1;background-color:#fdb022!important}.bg-yellow-600{--sgds-bg-opacity:1;background-color:#f79009!important}.bg-yellow-700{--sgds-bg-opacity:1;background-color:#dc6803!important}.bg-yellow-800{--sgds-bg-opacity:1;background-color:#633a04!important}.bg-yellow-900{--sgds-bg-opacity:1;background-color:#311d02!important}.bg-green-100{--sgds-bg-opacity:1;background-color:#e7f6e9!important}.bg-green-200{--sgds-bg-opacity:1;background-color:#c4e8c8!important}.bg-green-300{--sgds-bg-opacity:1;background-color:#9dd9a3!important}.bg-green-400{--sgds-bg-opacity:1;background-color:#58be62!important}.bg-green-500{--sgds-bg-opacity:1;background-color:#3bb346!important}.bg-green-600{--sgds-bg-opacity:1;background-color:#0a8217!important}.bg-green-700{--sgds-bg-opacity:1;background-color:#2da337!important}.bg-green-800{--sgds-bg-opacity:1;background-color:#043409!important}.bg-green-900{--sgds-bg-opacity:1;background-color:#021a05!important}.bg-cyan-100{--sgds-bg-opacity:1;background-color:#e2eff8!important}.bg-cyan-200{--sgds-bg-opacity:1;background-color:#b9d8ee!important}.bg-cyan-300{--sgds-bg-opacity:1;background-color:#90c1e4!important}.bg-cyan-400{--sgds-bg-opacity:1;background-color:#58a1d4!important}.bg-cyan-500{--sgds-bg-opacity:1;background-color:#59a1d4!important}.bg-cyan-600{--sgds-bg-opacity:1;background-color:#0f71bb!important}.bg-cyan-700{--sgds-bg-opacity:1;background-color:#0c5b97!important}.bg-cyan-800{--sgds-bg-opacity:1;background-color:#0a4776!important}.bg-cyan-900{--sgds-bg-opacity:1;background-color:#08395e!important}.bg-dark-100{--sgds-bg-opacity:1;background-color:#f7f7f9!important}.bg-dark-200{--sgds-bg-opacity:1;background-color:#e4e7ec!important}.bg-dark-300{--sgds-bg-opacity:1;background-color:#d0d5dd!important}.bg-dark-400{--sgds-bg-opacity:1;background-color:#98a2b3!important}.bg-dark-500{--sgds-bg-opacity:1;background-color:#667085!important}.bg-dark-600{--sgds-bg-opacity:1;background-color:#344054!important}.bg-dark-700{--sgds-bg-opacity:1;background-color:#1d2939!important}.bg-dark-800,.bg-dark-900{--sgds-bg-opacity:1;background-color:#000!important}.bg-light-100{--sgds-bg-opacity:1;background-color:#f7f7f9!important}.bg-light-200{--sgds-bg-opacity:1;background-color:#e4e7ec!important}.bg-light-300{--sgds-bg-opacity:1;background-color:#d0d5dd!important}.bg-light-400{--sgds-bg-opacity:1;background-color:#98a2b3!important}.bg-light-500{--sgds-bg-opacity:1;background-color:#667085!important}.bg-light-600{--sgds-bg-opacity:1;background-color:#344054!important}.bg-light-700{--sgds-bg-opacity:1;background-color:#1d2939!important}.bg-light-800,.bg-light-900{--sgds-bg-opacity:1;background-color:#000!important}.bg-opacity-10{--sgds-bg-opacity:0.1}.bg-opacity-25{--sgds-bg-opacity:0.25}.bg-opacity-50{--sgds-bg-opacity:0.5}.bg-opacity-75{--sgds-bg-opacity:0.75}.bg-opacity-100{--sgds-bg-opacity:1}.bg-gradient{background-image:var(--sgds-gradient)!important}.user-select-all{user-select:all!important}.user-select-auto{user-select:auto!important}.user-select-none{user-select:none!important}.pe-none{pointer-events:none!important}.pe-auto{pointer-events:auto!important}.rounded{border-radius:.3125rem!important}.rounded-0,.sgds.datepicker td{border-radius:0!important}.rounded-1{border-radius:.2rem!important}.rounded-2{border-radius:.3125rem!important}.rounded-3{border-radius:.3rem!important}.rounded-circle{border-radius:50%!important}.rounded-pill{border-radius:50rem!important}.rounded-top{border-top-left-radius:.3125rem!important}.rounded-end,.rounded-top{border-top-right-radius:.3125rem!important}.rounded-bottom,.rounded-end{border-bottom-right-radius:.3125rem!important}.rounded-bottom,.rounded-start{border-bottom-left-radius:.3125rem!important}.rounded-start{border-top-left-radius:.3125rem!important}.visible{visibility:visible!important}.invisible{visibility:hidden!important}@media (min-width:576px){.float-sm-start{float:left!important}.float-sm-end{float:right!important}.float-sm-none{float:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-grid{display:grid!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:flex!important}.d-sm-inline-flex{display:inline-flex!important}.d-sm-none{display:none!important}.flex-sm-fill{flex:1 1 auto!important}.flex-sm-row{flex-direction:row!important}.flex-sm-column{flex-direction:column!important}.flex-sm-row-reverse{flex-direction:row-reverse!important}.flex-sm-column-reverse{flex-direction:column-reverse!important}.flex-sm-grow-0{flex-grow:0!important}.flex-sm-grow-1{flex-grow:1!important}.flex-sm-shrink-0{flex-shrink:0!important}.flex-sm-shrink-1{flex-shrink:1!important}.flex-sm-wrap{flex-wrap:wrap!important}.flex-sm-nowrap{flex-wrap:nowrap!important}.flex-sm-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-sm-0{gap:0!important}.gap-sm-1{gap:.25rem!important}.gap-sm-2{gap:.5rem!important}.gap-sm-3{gap:1rem!important}.gap-sm-4{gap:1.5rem!important}.gap-sm-5{gap:2rem!important}.gap-sm-6{gap:2.5rem!important}.gap-sm-7{gap:3rem!important}.gap-sm-8{gap:3.5rem!important}.justify-content-sm-start{justify-content:flex-start!important}.justify-content-sm-end{justify-content:flex-end!important}.justify-content-sm-center{justify-content:center!important}.justify-content-sm-between{justify-content:space-between!important}.justify-content-sm-around{justify-content:space-around!important}.justify-content-sm-evenly{justify-content:space-evenly!important}.align-items-sm-start{align-items:flex-start!important}.align-items-sm-end{align-items:flex-end!important}.align-items-sm-center{align-items:center!important}.align-items-sm-baseline{align-items:baseline!important}.align-items-sm-stretch{align-items:stretch!important}.align-content-sm-start{align-content:flex-start!important}.align-content-sm-end{align-content:flex-end!important}.align-content-sm-center{align-content:center!important}.align-content-sm-between{align-content:space-between!important}.align-content-sm-around{align-content:space-around!important}.align-content-sm-stretch{align-content:stretch!important}.align-self-sm-auto{align-self:auto!important}.align-self-sm-start{align-self:flex-start!important}.align-self-sm-end{align-self:flex-end!important}.align-self-sm-center{align-self:center!important}.align-self-sm-baseline{align-self:baseline!important}.align-self-sm-stretch{align-self:stretch!important}.order-sm-first{order:-1!important}.order-sm-0{order:0!important}.order-sm-1{order:1!important}.order-sm-2{order:2!important}.order-sm-3{order:3!important}.order-sm-4{order:4!important}.order-sm-5{order:5!important}.order-sm-last{order:6!important}.m-sm-0{margin:0!important}.m-sm-1{margin:.25rem!important}.m-sm-2{margin:.5rem!important}.m-sm-3{margin:1rem!important}.m-sm-4{margin:1.5rem!important}.m-sm-5{margin:2rem!important}.m-sm-6{margin:2.5rem!important}.m-sm-7{margin:3rem!important}.m-sm-8{margin:3.5rem!important}.m-sm-auto{margin:auto!important}.mx-sm-0{margin-left:0!important;margin-right:0!important}.mx-sm-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-sm-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-sm-3{margin-left:1rem!important;margin-right:1rem!important}.mx-sm-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-sm-5{margin-left:2rem!important;margin-right:2rem!important}.mx-sm-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-sm-7{margin-left:3rem!important;margin-right:3rem!important}.mx-sm-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-sm-auto{margin-left:auto!important;margin-right:auto!important}.my-sm-0{margin-bottom:0!important;margin-top:0!important}.my-sm-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-sm-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-sm-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-sm-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-sm-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-sm-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-sm-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-sm-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-sm-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-sm-0{margin-top:0!important}.mt-sm-1{margin-top:.25rem!important}.mt-sm-2{margin-top:.5rem!important}.mt-sm-3{margin-top:1rem!important}.mt-sm-4{margin-top:1.5rem!important}.mt-sm-5{margin-top:2rem!important}.mt-sm-6{margin-top:2.5rem!important}.mt-sm-7{margin-top:3rem!important}.mt-sm-8{margin-top:3.5rem!important}.mt-sm-auto{margin-top:auto!important}.me-sm-0{margin-right:0!important}.me-sm-1{margin-right:.25rem!important}.me-sm-2{margin-right:.5rem!important}.me-sm-3{margin-right:1rem!important}.me-sm-4{margin-right:1.5rem!important}.me-sm-5{margin-right:2rem!important}.me-sm-6{margin-right:2.5rem!important}.me-sm-7{margin-right:3rem!important}.me-sm-8{margin-right:3.5rem!important}.me-sm-auto{margin-right:auto!important}.mb-sm-0{margin-bottom:0!important}.mb-sm-1{margin-bottom:.25rem!important}.mb-sm-2{margin-bottom:.5rem!important}.mb-sm-3{margin-bottom:1rem!important}.mb-sm-4{margin-bottom:1.5rem!important}.mb-sm-5{margin-bottom:2rem!important}.mb-sm-6{margin-bottom:2.5rem!important}.mb-sm-7{margin-bottom:3rem!important}.mb-sm-8{margin-bottom:3.5rem!important}.mb-sm-auto{margin-bottom:auto!important}.ms-sm-0{margin-left:0!important}.ms-sm-1{margin-left:.25rem!important}.ms-sm-2{margin-left:.5rem!important}.ms-sm-3{margin-left:1rem!important}.ms-sm-4{margin-left:1.5rem!important}.ms-sm-5{margin-left:2rem!important}.ms-sm-6{margin-left:2.5rem!important}.ms-sm-7{margin-left:3rem!important}.ms-sm-8{margin-left:3.5rem!important}.ms-sm-auto{margin-left:auto!important}.p-sm-0{padding:0!important}.p-sm-1{padding:.25rem!important}.p-sm-2{padding:.5rem!important}.p-sm-3{padding:1rem!important}.p-sm-4{padding:1.5rem!important}.p-sm-5{padding:2rem!important}.p-sm-6{padding:2.5rem!important}.p-sm-7{padding:3rem!important}.p-sm-8{padding:3.5rem!important}.px-sm-0{padding-left:0!important;padding-right:0!important}.px-sm-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-sm-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-sm-3{padding-left:1rem!important;padding-right:1rem!important}.px-sm-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-sm-5{padding-left:2rem!important;padding-right:2rem!important}.px-sm-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-sm-7{padding-left:3rem!important;padding-right:3rem!important}.px-sm-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-sm-0{padding-bottom:0!important;padding-top:0!important}.py-sm-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-sm-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-sm-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-sm-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-sm-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-sm-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-sm-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-sm-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-sm-0{padding-top:0!important}.pt-sm-1{padding-top:.25rem!important}.pt-sm-2{padding-top:.5rem!important}.pt-sm-3{padding-top:1rem!important}.pt-sm-4{padding-top:1.5rem!important}.pt-sm-5{padding-top:2rem!important}.pt-sm-6{padding-top:2.5rem!important}.pt-sm-7{padding-top:3rem!important}.pt-sm-8{padding-top:3.5rem!important}.pe-sm-0{padding-right:0!important}.pe-sm-1{padding-right:.25rem!important}.pe-sm-2{padding-right:.5rem!important}.pe-sm-3{padding-right:1rem!important}.pe-sm-4{padding-right:1.5rem!important}.pe-sm-5{padding-right:2rem!important}.pe-sm-6{padding-right:2.5rem!important}.pe-sm-7{padding-right:3rem!important}.pe-sm-8{padding-right:3.5rem!important}.pb-sm-0{padding-bottom:0!important}.pb-sm-1{padding-bottom:.25rem!important}.pb-sm-2{padding-bottom:.5rem!important}.pb-sm-3{padding-bottom:1rem!important}.pb-sm-4{padding-bottom:1.5rem!important}.pb-sm-5{padding-bottom:2rem!important}.pb-sm-6{padding-bottom:2.5rem!important}.pb-sm-7{padding-bottom:3rem!important}.pb-sm-8{padding-bottom:3.5rem!important}.ps-sm-0{padding-left:0!important}.ps-sm-1{padding-left:.25rem!important}.ps-sm-2{padding-left:.5rem!important}.ps-sm-3{padding-left:1rem!important}.ps-sm-4{padding-left:1.5rem!important}.ps-sm-5{padding-left:2rem!important}.ps-sm-6{padding-left:2.5rem!important}.ps-sm-7{padding-left:3rem!important}.ps-sm-8{padding-left:3.5rem!important}.text-sm-start{text-align:left!important}.text-sm-end{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width:768px){.float-md-start{float:left!important}.float-md-end{float:right!important}.float-md-none{float:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-grid{display:grid!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:flex!important}.d-md-inline-flex{display:inline-flex!important}.d-md-none{display:none!important}.flex-md-fill{flex:1 1 auto!important}.flex-md-row{flex-direction:row!important}.flex-md-column{flex-direction:column!important}.flex-md-row-reverse{flex-direction:row-reverse!important}.flex-md-column-reverse{flex-direction:column-reverse!important}.flex-md-grow-0{flex-grow:0!important}.flex-md-grow-1{flex-grow:1!important}.flex-md-shrink-0{flex-shrink:0!important}.flex-md-shrink-1{flex-shrink:1!important}.flex-md-wrap{flex-wrap:wrap!important}.flex-md-nowrap{flex-wrap:nowrap!important}.flex-md-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-md-0{gap:0!important}.gap-md-1{gap:.25rem!important}.gap-md-2{gap:.5rem!important}.gap-md-3{gap:1rem!important}.gap-md-4{gap:1.5rem!important}.gap-md-5{gap:2rem!important}.gap-md-6{gap:2.5rem!important}.gap-md-7{gap:3rem!important}.gap-md-8{gap:3.5rem!important}.justify-content-md-start{justify-content:flex-start!important}.justify-content-md-end{justify-content:flex-end!important}.justify-content-md-center{justify-content:center!important}.justify-content-md-between{justify-content:space-between!important}.justify-content-md-around{justify-content:space-around!important}.justify-content-md-evenly{justify-content:space-evenly!important}.align-items-md-start{align-items:flex-start!important}.align-items-md-end{align-items:flex-end!important}.align-items-md-center{align-items:center!important}.align-items-md-baseline{align-items:baseline!important}.align-items-md-stretch{align-items:stretch!important}.align-content-md-start{align-content:flex-start!important}.align-content-md-end{align-content:flex-end!important}.align-content-md-center{align-content:center!important}.align-content-md-between{align-content:space-between!important}.align-content-md-around{align-content:space-around!important}.align-content-md-stretch{align-content:stretch!important}.align-self-md-auto{align-self:auto!important}.align-self-md-start{align-self:flex-start!important}.align-self-md-end{align-self:flex-end!important}.align-self-md-center{align-self:center!important}.align-self-md-baseline{align-self:baseline!important}.align-self-md-stretch{align-self:stretch!important}.order-md-first{order:-1!important}.order-md-0{order:0!important}.order-md-1{order:1!important}.order-md-2{order:2!important}.order-md-3{order:3!important}.order-md-4{order:4!important}.order-md-5{order:5!important}.order-md-last{order:6!important}.m-md-0{margin:0!important}.m-md-1{margin:.25rem!important}.m-md-2{margin:.5rem!important}.m-md-3{margin:1rem!important}.m-md-4{margin:1.5rem!important}.m-md-5{margin:2rem!important}.m-md-6{margin:2.5rem!important}.m-md-7{margin:3rem!important}.m-md-8{margin:3.5rem!important}.m-md-auto{margin:auto!important}.mx-md-0{margin-left:0!important;margin-right:0!important}.mx-md-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-md-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-md-3{margin-left:1rem!important;margin-right:1rem!important}.mx-md-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-md-5{margin-left:2rem!important;margin-right:2rem!important}.mx-md-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-md-7{margin-left:3rem!important;margin-right:3rem!important}.mx-md-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-md-auto{margin-left:auto!important;margin-right:auto!important}.my-md-0{margin-bottom:0!important;margin-top:0!important}.my-md-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-md-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-md-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-md-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-md-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-md-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-md-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-md-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-md-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-md-0{margin-top:0!important}.mt-md-1{margin-top:.25rem!important}.mt-md-2{margin-top:.5rem!important}.mt-md-3{margin-top:1rem!important}.mt-md-4{margin-top:1.5rem!important}.mt-md-5{margin-top:2rem!important}.mt-md-6{margin-top:2.5rem!important}.mt-md-7{margin-top:3rem!important}.mt-md-8{margin-top:3.5rem!important}.mt-md-auto{margin-top:auto!important}.me-md-0{margin-right:0!important}.me-md-1{margin-right:.25rem!important}.me-md-2{margin-right:.5rem!important}.me-md-3{margin-right:1rem!important}.me-md-4{margin-right:1.5rem!important}.me-md-5{margin-right:2rem!important}.me-md-6{margin-right:2.5rem!important}.me-md-7{margin-right:3rem!important}.me-md-8{margin-right:3.5rem!important}.me-md-auto{margin-right:auto!important}.mb-md-0{margin-bottom:0!important}.mb-md-1{margin-bottom:.25rem!important}.mb-md-2{margin-bottom:.5rem!important}.mb-md-3{margin-bottom:1rem!important}.mb-md-4{margin-bottom:1.5rem!important}.mb-md-5{margin-bottom:2rem!important}.mb-md-6{margin-bottom:2.5rem!important}.mb-md-7{margin-bottom:3rem!important}.mb-md-8{margin-bottom:3.5rem!important}.mb-md-auto{margin-bottom:auto!important}.ms-md-0{margin-left:0!important}.ms-md-1{margin-left:.25rem!important}.ms-md-2{margin-left:.5rem!important}.ms-md-3{margin-left:1rem!important}.ms-md-4{margin-left:1.5rem!important}.ms-md-5{margin-left:2rem!important}.ms-md-6{margin-left:2.5rem!important}.ms-md-7{margin-left:3rem!important}.ms-md-8{margin-left:3.5rem!important}.ms-md-auto{margin-left:auto!important}.p-md-0{padding:0!important}.p-md-1{padding:.25rem!important}.p-md-2{padding:.5rem!important}.p-md-3{padding:1rem!important}.p-md-4{padding:1.5rem!important}.p-md-5{padding:2rem!important}.p-md-6{padding:2.5rem!important}.p-md-7{padding:3rem!important}.p-md-8{padding:3.5rem!important}.px-md-0{padding-left:0!important;padding-right:0!important}.px-md-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-md-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-md-3{padding-left:1rem!important;padding-right:1rem!important}.px-md-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-md-5{padding-left:2rem!important;padding-right:2rem!important}.px-md-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-md-7{padding-left:3rem!important;padding-right:3rem!important}.px-md-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-md-0{padding-bottom:0!important;padding-top:0!important}.py-md-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-md-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-md-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-md-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-md-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-md-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-md-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-md-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-md-0{padding-top:0!important}.pt-md-1{padding-top:.25rem!important}.pt-md-2{padding-top:.5rem!important}.pt-md-3{padding-top:1rem!important}.pt-md-4{padding-top:1.5rem!important}.pt-md-5{padding-top:2rem!important}.pt-md-6{padding-top:2.5rem!important}.pt-md-7{padding-top:3rem!important}.pt-md-8{padding-top:3.5rem!important}.pe-md-0{padding-right:0!important}.pe-md-1{padding-right:.25rem!important}.pe-md-2{padding-right:.5rem!important}.pe-md-3{padding-right:1rem!important}.pe-md-4{padding-right:1.5rem!important}.pe-md-5{padding-right:2rem!important}.pe-md-6{padding-right:2.5rem!important}.pe-md-7{padding-right:3rem!important}.pe-md-8{padding-right:3.5rem!important}.pb-md-0{padding-bottom:0!important}.pb-md-1{padding-bottom:.25rem!important}.pb-md-2{padding-bottom:.5rem!important}.pb-md-3{padding-bottom:1rem!important}.pb-md-4{padding-bottom:1.5rem!important}.pb-md-5{padding-bottom:2rem!important}.pb-md-6{padding-bottom:2.5rem!important}.pb-md-7{padding-bottom:3rem!important}.pb-md-8{padding-bottom:3.5rem!important}.ps-md-0{padding-left:0!important}.ps-md-1{padding-left:.25rem!important}.ps-md-2{padding-left:.5rem!important}.ps-md-3{padding-left:1rem!important}.ps-md-4{padding-left:1.5rem!important}.ps-md-5{padding-left:2rem!important}.ps-md-6{padding-left:2.5rem!important}.ps-md-7{padding-left:3rem!important}.ps-md-8{padding-left:3.5rem!important}.text-md-start{text-align:left!important}.text-md-end{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width:992px){.float-lg-start{float:left!important}.float-lg-end{float:right!important}.float-lg-none{float:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-grid{display:grid!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:flex!important}.d-lg-inline-flex{display:inline-flex!important}.d-lg-none{display:none!important}.flex-lg-fill{flex:1 1 auto!important}.flex-lg-row{flex-direction:row!important}.flex-lg-column{flex-direction:column!important}.flex-lg-row-reverse{flex-direction:row-reverse!important}.flex-lg-column-reverse{flex-direction:column-reverse!important}.flex-lg-grow-0{flex-grow:0!important}.flex-lg-grow-1{flex-grow:1!important}.flex-lg-shrink-0{flex-shrink:0!important}.flex-lg-shrink-1{flex-shrink:1!important}.flex-lg-wrap{flex-wrap:wrap!important}.flex-lg-nowrap{flex-wrap:nowrap!important}.flex-lg-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-lg-0{gap:0!important}.gap-lg-1{gap:.25rem!important}.gap-lg-2{gap:.5rem!important}.gap-lg-3{gap:1rem!important}.gap-lg-4{gap:1.5rem!important}.gap-lg-5{gap:2rem!important}.gap-lg-6{gap:2.5rem!important}.gap-lg-7{gap:3rem!important}.gap-lg-8{gap:3.5rem!important}.justify-content-lg-start{justify-content:flex-start!important}.justify-content-lg-end{justify-content:flex-end!important}.justify-content-lg-center{justify-content:center!important}.justify-content-lg-between{justify-content:space-between!important}.justify-content-lg-around{justify-content:space-around!important}.justify-content-lg-evenly{justify-content:space-evenly!important}.align-items-lg-start{align-items:flex-start!important}.align-items-lg-end{align-items:flex-end!important}.align-items-lg-center{align-items:center!important}.align-items-lg-baseline{align-items:baseline!important}.align-items-lg-stretch{align-items:stretch!important}.align-content-lg-start{align-content:flex-start!important}.align-content-lg-end{align-content:flex-end!important}.align-content-lg-center{align-content:center!important}.align-content-lg-between{align-content:space-between!important}.align-content-lg-around{align-content:space-around!important}.align-content-lg-stretch{align-content:stretch!important}.align-self-lg-auto{align-self:auto!important}.align-self-lg-start{align-self:flex-start!important}.align-self-lg-end{align-self:flex-end!important}.align-self-lg-center{align-self:center!important}.align-self-lg-baseline{align-self:baseline!important}.align-self-lg-stretch{align-self:stretch!important}.order-lg-first{order:-1!important}.order-lg-0{order:0!important}.order-lg-1{order:1!important}.order-lg-2{order:2!important}.order-lg-3{order:3!important}.order-lg-4{order:4!important}.order-lg-5{order:5!important}.order-lg-last{order:6!important}.m-lg-0{margin:0!important}.m-lg-1{margin:.25rem!important}.m-lg-2{margin:.5rem!important}.m-lg-3{margin:1rem!important}.m-lg-4{margin:1.5rem!important}.m-lg-5{margin:2rem!important}.m-lg-6{margin:2.5rem!important}.m-lg-7{margin:3rem!important}.m-lg-8{margin:3.5rem!important}.m-lg-auto{margin:auto!important}.mx-lg-0{margin-left:0!important;margin-right:0!important}.mx-lg-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-lg-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-lg-3{margin-left:1rem!important;margin-right:1rem!important}.mx-lg-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-lg-5{margin-left:2rem!important;margin-right:2rem!important}.mx-lg-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-lg-7{margin-left:3rem!important;margin-right:3rem!important}.mx-lg-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-lg-auto{margin-left:auto!important;margin-right:auto!important}.my-lg-0{margin-bottom:0!important;margin-top:0!important}.my-lg-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-lg-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-lg-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-lg-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-lg-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-lg-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-lg-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-lg-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-lg-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-lg-0{margin-top:0!important}.mt-lg-1{margin-top:.25rem!important}.mt-lg-2{margin-top:.5rem!important}.mt-lg-3{margin-top:1rem!important}.mt-lg-4{margin-top:1.5rem!important}.mt-lg-5{margin-top:2rem!important}.mt-lg-6{margin-top:2.5rem!important}.mt-lg-7{margin-top:3rem!important}.mt-lg-8{margin-top:3.5rem!important}.mt-lg-auto{margin-top:auto!important}.me-lg-0{margin-right:0!important}.me-lg-1{margin-right:.25rem!important}.me-lg-2{margin-right:.5rem!important}.me-lg-3{margin-right:1rem!important}.me-lg-4{margin-right:1.5rem!important}.me-lg-5{margin-right:2rem!important}.me-lg-6{margin-right:2.5rem!important}.me-lg-7{margin-right:3rem!important}.me-lg-8{margin-right:3.5rem!important}.me-lg-auto{margin-right:auto!important}.mb-lg-0{margin-bottom:0!important}.mb-lg-1{margin-bottom:.25rem!important}.mb-lg-2{margin-bottom:.5rem!important}.mb-lg-3{margin-bottom:1rem!important}.mb-lg-4{margin-bottom:1.5rem!important}.mb-lg-5{margin-bottom:2rem!important}.mb-lg-6{margin-bottom:2.5rem!important}.mb-lg-7{margin-bottom:3rem!important}.mb-lg-8{margin-bottom:3.5rem!important}.mb-lg-auto{margin-bottom:auto!important}.ms-lg-0{margin-left:0!important}.ms-lg-1{margin-left:.25rem!important}.ms-lg-2{margin-left:.5rem!important}.ms-lg-3{margin-left:1rem!important}.ms-lg-4{margin-left:1.5rem!important}.ms-lg-5{margin-left:2rem!important}.ms-lg-6{margin-left:2.5rem!important}.ms-lg-7{margin-left:3rem!important}.ms-lg-8{margin-left:3.5rem!important}.ms-lg-auto{margin-left:auto!important}.p-lg-0{padding:0!important}.p-lg-1{padding:.25rem!important}.p-lg-2{padding:.5rem!important}.p-lg-3{padding:1rem!important}.p-lg-4{padding:1.5rem!important}.p-lg-5{padding:2rem!important}.p-lg-6{padding:2.5rem!important}.p-lg-7{padding:3rem!important}.p-lg-8{padding:3.5rem!important}.px-lg-0{padding-left:0!important;padding-right:0!important}.px-lg-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-lg-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-lg-3{padding-left:1rem!important;padding-right:1rem!important}.px-lg-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-lg-5{padding-left:2rem!important;padding-right:2rem!important}.px-lg-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-lg-7{padding-left:3rem!important;padding-right:3rem!important}.px-lg-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-lg-0{padding-bottom:0!important;padding-top:0!important}.py-lg-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-lg-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-lg-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-lg-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-lg-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-lg-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-lg-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-lg-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-lg-0{padding-top:0!important}.pt-lg-1{padding-top:.25rem!important}.pt-lg-2{padding-top:.5rem!important}.pt-lg-3{padding-top:1rem!important}.pt-lg-4{padding-top:1.5rem!important}.pt-lg-5{padding-top:2rem!important}.pt-lg-6{padding-top:2.5rem!important}.pt-lg-7{padding-top:3rem!important}.pt-lg-8{padding-top:3.5rem!important}.pe-lg-0{padding-right:0!important}.pe-lg-1{padding-right:.25rem!important}.pe-lg-2{padding-right:.5rem!important}.pe-lg-3{padding-right:1rem!important}.pe-lg-4{padding-right:1.5rem!important}.pe-lg-5{padding-right:2rem!important}.pe-lg-6{padding-right:2.5rem!important}.pe-lg-7{padding-right:3rem!important}.pe-lg-8{padding-right:3.5rem!important}.pb-lg-0{padding-bottom:0!important}.pb-lg-1{padding-bottom:.25rem!important}.pb-lg-2{padding-bottom:.5rem!important}.pb-lg-3{padding-bottom:1rem!important}.pb-lg-4{padding-bottom:1.5rem!important}.pb-lg-5{padding-bottom:2rem!important}.pb-lg-6{padding-bottom:2.5rem!important}.pb-lg-7{padding-bottom:3rem!important}.pb-lg-8{padding-bottom:3.5rem!important}.ps-lg-0{padding-left:0!important}.ps-lg-1{padding-left:.25rem!important}.ps-lg-2{padding-left:.5rem!important}.ps-lg-3{padding-left:1rem!important}.ps-lg-4{padding-left:1.5rem!important}.ps-lg-5{padding-left:2rem!important}.ps-lg-6{padding-left:2.5rem!important}.ps-lg-7{padding-left:3rem!important}.ps-lg-8{padding-left:3.5rem!important}.text-lg-start{text-align:left!important}.text-lg-end{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width:1200px){.float-xl-start{float:left!important}.float-xl-end{float:right!important}.float-xl-none{float:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-grid{display:grid!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:flex!important}.d-xl-inline-flex{display:inline-flex!important}.d-xl-none{display:none!important}.flex-xl-fill{flex:1 1 auto!important}.flex-xl-row{flex-direction:row!important}.flex-xl-column{flex-direction:column!important}.flex-xl-row-reverse{flex-direction:row-reverse!important}.flex-xl-column-reverse{flex-direction:column-reverse!important}.flex-xl-grow-0{flex-grow:0!important}.flex-xl-grow-1{flex-grow:1!important}.flex-xl-shrink-0{flex-shrink:0!important}.flex-xl-shrink-1{flex-shrink:1!important}.flex-xl-wrap{flex-wrap:wrap!important}.flex-xl-nowrap{flex-wrap:nowrap!important}.flex-xl-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-xl-0{gap:0!important}.gap-xl-1{gap:.25rem!important}.gap-xl-2{gap:.5rem!important}.gap-xl-3{gap:1rem!important}.gap-xl-4{gap:1.5rem!important}.gap-xl-5{gap:2rem!important}.gap-xl-6{gap:2.5rem!important}.gap-xl-7{gap:3rem!important}.gap-xl-8{gap:3.5rem!important}.justify-content-xl-start{justify-content:flex-start!important}.justify-content-xl-end{justify-content:flex-end!important}.justify-content-xl-center{justify-content:center!important}.justify-content-xl-between{justify-content:space-between!important}.justify-content-xl-around{justify-content:space-around!important}.justify-content-xl-evenly{justify-content:space-evenly!important}.align-items-xl-start{align-items:flex-start!important}.align-items-xl-end{align-items:flex-end!important}.align-items-xl-center{align-items:center!important}.align-items-xl-baseline{align-items:baseline!important}.align-items-xl-stretch{align-items:stretch!important}.align-content-xl-start{align-content:flex-start!important}.align-content-xl-end{align-content:flex-end!important}.align-content-xl-center{align-content:center!important}.align-content-xl-between{align-content:space-between!important}.align-content-xl-around{align-content:space-around!important}.align-content-xl-stretch{align-content:stretch!important}.align-self-xl-auto{align-self:auto!important}.align-self-xl-start{align-self:flex-start!important}.align-self-xl-end{align-self:flex-end!important}.align-self-xl-center{align-self:center!important}.align-self-xl-baseline{align-self:baseline!important}.align-self-xl-stretch{align-self:stretch!important}.order-xl-first{order:-1!important}.order-xl-0{order:0!important}.order-xl-1{order:1!important}.order-xl-2{order:2!important}.order-xl-3{order:3!important}.order-xl-4{order:4!important}.order-xl-5{order:5!important}.order-xl-last{order:6!important}.m-xl-0{margin:0!important}.m-xl-1{margin:.25rem!important}.m-xl-2{margin:.5rem!important}.m-xl-3{margin:1rem!important}.m-xl-4{margin:1.5rem!important}.m-xl-5{margin:2rem!important}.m-xl-6{margin:2.5rem!important}.m-xl-7{margin:3rem!important}.m-xl-8{margin:3.5rem!important}.m-xl-auto{margin:auto!important}.mx-xl-0{margin-left:0!important;margin-right:0!important}.mx-xl-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-xl-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-xl-3{margin-left:1rem!important;margin-right:1rem!important}.mx-xl-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-xl-5{margin-left:2rem!important;margin-right:2rem!important}.mx-xl-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-xl-7{margin-left:3rem!important;margin-right:3rem!important}.mx-xl-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-xl-auto{margin-left:auto!important;margin-right:auto!important}.my-xl-0{margin-bottom:0!important;margin-top:0!important}.my-xl-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-xl-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-xl-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-xl-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-xl-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-xl-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-xl-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-xl-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-xl-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-xl-0{margin-top:0!important}.mt-xl-1{margin-top:.25rem!important}.mt-xl-2{margin-top:.5rem!important}.mt-xl-3{margin-top:1rem!important}.mt-xl-4{margin-top:1.5rem!important}.mt-xl-5{margin-top:2rem!important}.mt-xl-6{margin-top:2.5rem!important}.mt-xl-7{margin-top:3rem!important}.mt-xl-8{margin-top:3.5rem!important}.mt-xl-auto{margin-top:auto!important}.me-xl-0{margin-right:0!important}.me-xl-1{margin-right:.25rem!important}.me-xl-2{margin-right:.5rem!important}.me-xl-3{margin-right:1rem!important}.me-xl-4{margin-right:1.5rem!important}.me-xl-5{margin-right:2rem!important}.me-xl-6{margin-right:2.5rem!important}.me-xl-7{margin-right:3rem!important}.me-xl-8{margin-right:3.5rem!important}.me-xl-auto{margin-right:auto!important}.mb-xl-0{margin-bottom:0!important}.mb-xl-1{margin-bottom:.25rem!important}.mb-xl-2{margin-bottom:.5rem!important}.mb-xl-3{margin-bottom:1rem!important}.mb-xl-4{margin-bottom:1.5rem!important}.mb-xl-5{margin-bottom:2rem!important}.mb-xl-6{margin-bottom:2.5rem!important}.mb-xl-7{margin-bottom:3rem!important}.mb-xl-8{margin-bottom:3.5rem!important}.mb-xl-auto{margin-bottom:auto!important}.ms-xl-0{margin-left:0!important}.ms-xl-1{margin-left:.25rem!important}.ms-xl-2{margin-left:.5rem!important}.ms-xl-3{margin-left:1rem!important}.ms-xl-4{margin-left:1.5rem!important}.ms-xl-5{margin-left:2rem!important}.ms-xl-6{margin-left:2.5rem!important}.ms-xl-7{margin-left:3rem!important}.ms-xl-8{margin-left:3.5rem!important}.ms-xl-auto{margin-left:auto!important}.p-xl-0{padding:0!important}.p-xl-1{padding:.25rem!important}.p-xl-2{padding:.5rem!important}.p-xl-3{padding:1rem!important}.p-xl-4{padding:1.5rem!important}.p-xl-5{padding:2rem!important}.p-xl-6{padding:2.5rem!important}.p-xl-7{padding:3rem!important}.p-xl-8{padding:3.5rem!important}.px-xl-0{padding-left:0!important;padding-right:0!important}.px-xl-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-xl-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-xl-3{padding-left:1rem!important;padding-right:1rem!important}.px-xl-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-xl-5{padding-left:2rem!important;padding-right:2rem!important}.px-xl-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-xl-7{padding-left:3rem!important;padding-right:3rem!important}.px-xl-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-xl-0{padding-bottom:0!important;padding-top:0!important}.py-xl-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-xl-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-xl-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-xl-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-xl-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-xl-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-xl-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-xl-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-xl-0{padding-top:0!important}.pt-xl-1{padding-top:.25rem!important}.pt-xl-2{padding-top:.5rem!important}.pt-xl-3{padding-top:1rem!important}.pt-xl-4{padding-top:1.5rem!important}.pt-xl-5{padding-top:2rem!important}.pt-xl-6{padding-top:2.5rem!important}.pt-xl-7{padding-top:3rem!important}.pt-xl-8{padding-top:3.5rem!important}.pe-xl-0{padding-right:0!important}.pe-xl-1{padding-right:.25rem!important}.pe-xl-2{padding-right:.5rem!important}.pe-xl-3{padding-right:1rem!important}.pe-xl-4{padding-right:1.5rem!important}.pe-xl-5{padding-right:2rem!important}.pe-xl-6{padding-right:2.5rem!important}.pe-xl-7{padding-right:3rem!important}.pe-xl-8{padding-right:3.5rem!important}.pb-xl-0{padding-bottom:0!important}.pb-xl-1{padding-bottom:.25rem!important}.pb-xl-2{padding-bottom:.5rem!important}.pb-xl-3{padding-bottom:1rem!important}.pb-xl-4{padding-bottom:1.5rem!important}.pb-xl-5{padding-bottom:2rem!important}.pb-xl-6{padding-bottom:2.5rem!important}.pb-xl-7{padding-bottom:3rem!important}.pb-xl-8{padding-bottom:3.5rem!important}.ps-xl-0{padding-left:0!important}.ps-xl-1{padding-left:.25rem!important}.ps-xl-2{padding-left:.5rem!important}.ps-xl-3{padding-left:1rem!important}.ps-xl-4{padding-left:1.5rem!important}.ps-xl-5{padding-left:2rem!important}.ps-xl-6{padding-left:2.5rem!important}.ps-xl-7{padding-left:3rem!important}.ps-xl-8{padding-left:3.5rem!important}.text-xl-start{text-align:left!important}.text-xl-end{text-align:right!important}.text-xl-center{text-align:center!important}}@media (min-width:1400px){.float-xxl-start{float:left!important}.float-xxl-end{float:right!important}.float-xxl-none{float:none!important}.d-xxl-inline{display:inline!important}.d-xxl-inline-block{display:inline-block!important}.d-xxl-block{display:block!important}.d-xxl-grid{display:grid!important}.d-xxl-table{display:table!important}.d-xxl-table-row{display:table-row!important}.d-xxl-table-cell{display:table-cell!important}.d-xxl-flex{display:flex!important}.d-xxl-inline-flex{display:inline-flex!important}.d-xxl-none{display:none!important}.flex-xxl-fill{flex:1 1 auto!important}.flex-xxl-row{flex-direction:row!important}.flex-xxl-column{flex-direction:column!important}.flex-xxl-row-reverse{flex-direction:row-reverse!important}.flex-xxl-column-reverse{flex-direction:column-reverse!important}.flex-xxl-grow-0{flex-grow:0!important}.flex-xxl-grow-1{flex-grow:1!important}.flex-xxl-shrink-0{flex-shrink:0!important}.flex-xxl-shrink-1{flex-shrink:1!important}.flex-xxl-wrap{flex-wrap:wrap!important}.flex-xxl-nowrap{flex-wrap:nowrap!important}.flex-xxl-wrap-reverse{flex-wrap:wrap-reverse!important}.gap-xxl-0{gap:0!important}.gap-xxl-1{gap:.25rem!important}.gap-xxl-2{gap:.5rem!important}.gap-xxl-3{gap:1rem!important}.gap-xxl-4{gap:1.5rem!important}.gap-xxl-5{gap:2rem!important}.gap-xxl-6{gap:2.5rem!important}.gap-xxl-7{gap:3rem!important}.gap-xxl-8{gap:3.5rem!important}.justify-content-xxl-start{justify-content:flex-start!important}.justify-content-xxl-end{justify-content:flex-end!important}.justify-content-xxl-center{justify-content:center!important}.justify-content-xxl-between{justify-content:space-between!important}.justify-content-xxl-around{justify-content:space-around!important}.justify-content-xxl-evenly{justify-content:space-evenly!important}.align-items-xxl-start{align-items:flex-start!important}.align-items-xxl-end{align-items:flex-end!important}.align-items-xxl-center{align-items:center!important}.align-items-xxl-baseline{align-items:baseline!important}.align-items-xxl-stretch{align-items:stretch!important}.align-content-xxl-start{align-content:flex-start!important}.align-content-xxl-end{align-content:flex-end!important}.align-content-xxl-center{align-content:center!important}.align-content-xxl-between{align-content:space-between!important}.align-content-xxl-around{align-content:space-around!important}.align-content-xxl-stretch{align-content:stretch!important}.align-self-xxl-auto{align-self:auto!important}.align-self-xxl-start{align-self:flex-start!important}.align-self-xxl-end{align-self:flex-end!important}.align-self-xxl-center{align-self:center!important}.align-self-xxl-baseline{align-self:baseline!important}.align-self-xxl-stretch{align-self:stretch!important}.order-xxl-first{order:-1!important}.order-xxl-0{order:0!important}.order-xxl-1{order:1!important}.order-xxl-2{order:2!important}.order-xxl-3{order:3!important}.order-xxl-4{order:4!important}.order-xxl-5{order:5!important}.order-xxl-last{order:6!important}.m-xxl-0{margin:0!important}.m-xxl-1{margin:.25rem!important}.m-xxl-2{margin:.5rem!important}.m-xxl-3{margin:1rem!important}.m-xxl-4{margin:1.5rem!important}.m-xxl-5{margin:2rem!important}.m-xxl-6{margin:2.5rem!important}.m-xxl-7{margin:3rem!important}.m-xxl-8{margin:3.5rem!important}.m-xxl-auto{margin:auto!important}.mx-xxl-0{margin-left:0!important;margin-right:0!important}.mx-xxl-1{margin-left:.25rem!important;margin-right:.25rem!important}.mx-xxl-2{margin-left:.5rem!important;margin-right:.5rem!important}.mx-xxl-3{margin-left:1rem!important;margin-right:1rem!important}.mx-xxl-4{margin-left:1.5rem!important;margin-right:1.5rem!important}.mx-xxl-5{margin-left:2rem!important;margin-right:2rem!important}.mx-xxl-6{margin-left:2.5rem!important;margin-right:2.5rem!important}.mx-xxl-7{margin-left:3rem!important;margin-right:3rem!important}.mx-xxl-8{margin-left:3.5rem!important;margin-right:3.5rem!important}.mx-xxl-auto{margin-left:auto!important;margin-right:auto!important}.my-xxl-0{margin-bottom:0!important;margin-top:0!important}.my-xxl-1{margin-bottom:.25rem!important;margin-top:.25rem!important}.my-xxl-2{margin-bottom:.5rem!important;margin-top:.5rem!important}.my-xxl-3{margin-bottom:1rem!important;margin-top:1rem!important}.my-xxl-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.my-xxl-5{margin-bottom:2rem!important;margin-top:2rem!important}.my-xxl-6{margin-bottom:2.5rem!important;margin-top:2.5rem!important}.my-xxl-7{margin-bottom:3rem!important;margin-top:3rem!important}.my-xxl-8{margin-bottom:3.5rem!important;margin-top:3.5rem!important}.my-xxl-auto{margin-bottom:auto!important;margin-top:auto!important}.mt-xxl-0{margin-top:0!important}.mt-xxl-1{margin-top:.25rem!important}.mt-xxl-2{margin-top:.5rem!important}.mt-xxl-3{margin-top:1rem!important}.mt-xxl-4{margin-top:1.5rem!important}.mt-xxl-5{margin-top:2rem!important}.mt-xxl-6{margin-top:2.5rem!important}.mt-xxl-7{margin-top:3rem!important}.mt-xxl-8{margin-top:3.5rem!important}.mt-xxl-auto{margin-top:auto!important}.me-xxl-0{margin-right:0!important}.me-xxl-1{margin-right:.25rem!important}.me-xxl-2{margin-right:.5rem!important}.me-xxl-3{margin-right:1rem!important}.me-xxl-4{margin-right:1.5rem!important}.me-xxl-5{margin-right:2rem!important}.me-xxl-6{margin-right:2.5rem!important}.me-xxl-7{margin-right:3rem!important}.me-xxl-8{margin-right:3.5rem!important}.me-xxl-auto{margin-right:auto!important}.mb-xxl-0{margin-bottom:0!important}.mb-xxl-1{margin-bottom:.25rem!important}.mb-xxl-2{margin-bottom:.5rem!important}.mb-xxl-3{margin-bottom:1rem!important}.mb-xxl-4{margin-bottom:1.5rem!important}.mb-xxl-5{margin-bottom:2rem!important}.mb-xxl-6{margin-bottom:2.5rem!important}.mb-xxl-7{margin-bottom:3rem!important}.mb-xxl-8{margin-bottom:3.5rem!important}.mb-xxl-auto{margin-bottom:auto!important}.ms-xxl-0{margin-left:0!important}.ms-xxl-1{margin-left:.25rem!important}.ms-xxl-2{margin-left:.5rem!important}.ms-xxl-3{margin-left:1rem!important}.ms-xxl-4{margin-left:1.5rem!important}.ms-xxl-5{margin-left:2rem!important}.ms-xxl-6{margin-left:2.5rem!important}.ms-xxl-7{margin-left:3rem!important}.ms-xxl-8{margin-left:3.5rem!important}.ms-xxl-auto{margin-left:auto!important}.p-xxl-0{padding:0!important}.p-xxl-1{padding:.25rem!important}.p-xxl-2{padding:.5rem!important}.p-xxl-3{padding:1rem!important}.p-xxl-4{padding:1.5rem!important}.p-xxl-5{padding:2rem!important}.p-xxl-6{padding:2.5rem!important}.p-xxl-7{padding:3rem!important}.p-xxl-8{padding:3.5rem!important}.px-xxl-0{padding-left:0!important;padding-right:0!important}.px-xxl-1{padding-left:.25rem!important;padding-right:.25rem!important}.px-xxl-2{padding-left:.5rem!important;padding-right:.5rem!important}.px-xxl-3{padding-left:1rem!important;padding-right:1rem!important}.px-xxl-4{padding-left:1.5rem!important;padding-right:1.5rem!important}.px-xxl-5{padding-left:2rem!important;padding-right:2rem!important}.px-xxl-6{padding-left:2.5rem!important;padding-right:2.5rem!important}.px-xxl-7{padding-left:3rem!important;padding-right:3rem!important}.px-xxl-8{padding-left:3.5rem!important;padding-right:3.5rem!important}.py-xxl-0{padding-bottom:0!important;padding-top:0!important}.py-xxl-1{padding-bottom:.25rem!important;padding-top:.25rem!important}.py-xxl-2{padding-bottom:.5rem!important;padding-top:.5rem!important}.py-xxl-3{padding-bottom:1rem!important;padding-top:1rem!important}.py-xxl-4{padding-bottom:1.5rem!important;padding-top:1.5rem!important}.py-xxl-5{padding-bottom:2rem!important;padding-top:2rem!important}.py-xxl-6{padding-bottom:2.5rem!important;padding-top:2.5rem!important}.py-xxl-7{padding-bottom:3rem!important;padding-top:3rem!important}.py-xxl-8{padding-bottom:3.5rem!important;padding-top:3.5rem!important}.pt-xxl-0{padding-top:0!important}.pt-xxl-1{padding-top:.25rem!important}.pt-xxl-2{padding-top:.5rem!important}.pt-xxl-3{padding-top:1rem!important}.pt-xxl-4{padding-top:1.5rem!important}.pt-xxl-5{padding-top:2rem!important}.pt-xxl-6{padding-top:2.5rem!important}.pt-xxl-7{padding-top:3rem!important}.pt-xxl-8{padding-top:3.5rem!important}.pe-xxl-0{padding-right:0!important}.pe-xxl-1{padding-right:.25rem!important}.pe-xxl-2{padding-right:.5rem!important}.pe-xxl-3{padding-right:1rem!important}.pe-xxl-4{padding-right:1.5rem!important}.pe-xxl-5{padding-right:2rem!important}.pe-xxl-6{padding-right:2.5rem!important}.pe-xxl-7{padding-right:3rem!important}.pe-xxl-8{padding-right:3.5rem!important}.pb-xxl-0{padding-bottom:0!important}.pb-xxl-1{padding-bottom:.25rem!important}.pb-xxl-2{padding-bottom:.5rem!important}.pb-xxl-3{padding-bottom:1rem!important}.pb-xxl-4{padding-bottom:1.5rem!important}.pb-xxl-5{padding-bottom:2rem!important}.pb-xxl-6{padding-bottom:2.5rem!important}.pb-xxl-7{padding-bottom:3rem!important}.pb-xxl-8{padding-bottom:3.5rem!important}.ps-xxl-0{padding-left:0!important}.ps-xxl-1{padding-left:.25rem!important}.ps-xxl-2{padding-left:.5rem!important}.ps-xxl-3{padding-left:1rem!important}.ps-xxl-4{padding-left:1.5rem!important}.ps-xxl-5{padding-left:2rem!important}.ps-xxl-6{padding-left:2.5rem!important}.ps-xxl-7{padding-left:3rem!important}.ps-xxl-8{padding-left:3.5rem!important}.text-xxl-start{text-align:left!important}.text-xxl-end{text-align:right!important}.text-xxl-center{text-align:center!important}}@media (min-width:1200px){.fs-0{font-size:3.5rem!important}.fs-1{font-size:2.5rem!important}.fs-2{font-size:2rem!important}.fs-3{font-size:1.5rem!important}}@media print{.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-grid{display:grid!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:flex!important}.d-print-inline-flex{display:inline-flex!important}.d-print-none{display:none!important}}sgds-template-grid{background:#fafafa}sgds-template-grid.with-sidenav{display:grid;grid-template-columns:15rem minmax(min-content,1fr)}sgds-template-grid.with-sidenav.with-toc{grid-template-columns:15rem minmax(min-content,1fr) 15rem}@media (max-width:991.98px){sgds-template-grid.with-sidenav{display:block}sgds-template-grid.with-sidenav aside,sgds-template-grid.with-sidenav sgds-aside-area{display:none}}sgds-aside-area{background:#fff;box-shadow:3px 0 6px 0 rgba(208,213,221,.502);padding-bottom:1.5rem;padding-top:1.5rem;z-index:10}sgds-toc-area{font-size:14px;padding-top:1.5rem;position:sticky}sgds-content-area{display:flex;flex-direction:column;gap:2rem;max-width:100%;padding:2rem}sgds-content-header-top{align-items:center;display:flex;flex-direction:row;justify-content:space-between}sgds-content-header-bottom{align-items:end;display:grid;grid-template-columns:repeat(12,1fr)}sgds-content-header-bottom :first-child.search-container{grid-column:1/5}sgds-content-header-bottom :last-child{grid-column:12/13;white-space:nowrap}sgds-content-body{display:flex;flex-direction:column;gap:2rem}:host{--sgds-primary-rgb:89,37,220;--sgds-secondary-rgb:31,105,255;--sgds-success-rgb:10,130,23;--sgds-info-rgb:15,113,187;--sgds-warning-rgb:247,144,9;--sgds-danger-rgb:215,38,15;--sgds-light-rgb:247,247,249;--sgds-dark-rgb:0,0,0;--sgds-primary:#5925dc;--sgds-secondary:#1f69ff;--sgds-success:#0a8217;--sgds-info:#0f71bb;--sgds-warning:#f79009;--sgds-danger:#d7260f;--sgds-light:#f7f7f9;--sgds-dark:#000;--sgds-gray-100:#f7f7f9;--sgds-gray-200:#e4e7ec;--sgds-gray-300:#d0d5dd;--sgds-gray-400:#98a2b3;--sgds-gray-500:#667085;--sgds-gray-600:#344054;--sgds-gray-700:#1d2939;--sgds-gray-800:#000;--sgds-gray-900:#000;--sgds-primary-100:#ece6fb;--sgds-primary-200:#c7b6f3;--sgds-primary-300:#a386ec;--sgds-primary-400:#7e55e4;--sgds-primary-500:#5925dc;--sgds-primary-600:#491db6;--sgds-primary-700:#39178e;--sgds-primary-800:#291167;--sgds-primary-900:#190a3f;--sgds-secondary-100:#ebf1ff;--sgds-secondary-200:#d3e2ff;--sgds-secondary-300:#9bf;--sgds-secondary-400:#70a0ff;--sgds-secondary-500:#1f69ff;--sgds-secondary-600:#004ff0;--sgds-secondary-700:#0040c2;--sgds-secondary-800:#003194;--sgds-secondary-900:#026;--sgds-success-100:#e7f6e9;--sgds-success-200:#c4e8c8;--sgds-success-300:#9dd9a3;--sgds-success-400:#58be62;--sgds-success-500:#3bb346;--sgds-success-600:#0a8217;--sgds-success-700:#2da337;--sgds-success-800:#043409;--sgds-success-900:#021a05;--sgds-info-100:#e2eff8;--sgds-info-200:#b9d8ee;--sgds-info-300:#90c1e4;--sgds-info-400:#58a1d4;--sgds-info-500:#59a1d4;--sgds-info-600:#0f71bb;--sgds-info-700:#0c5b97;--sgds-info-800:#0a4776;--sgds-info-900:#08395e;--sgds-danger-100:#fff4f3;--sgds-danger-200:#ffcfc8;--sgds-danger-300:#fc9c90;--sgds-danger-400:#fb7463;--sgds-danger-500:#fa5741;--sgds-danger-600:#d7260f;--sgds-danger-700:#f8331c;--sgds-danger-800:#560f06;--sgds-danger-900:#2b0803;--sgds-warning-100:#fffaeb;--sgds-warning-200:#fef0c7;--sgds-warning-300:#fedf89;--sgds-warning-400:#fec84b;--sgds-warning-500:#fdb022;--sgds-warning-600:#f79009;--sgds-warning-700:#dc6803;--sgds-warning-800:#633a04;--sgds-warning-900:#311d02;--sgds-light-100:#f7f7f9;--sgds-light-200:#e4e7ec;--sgds-light-300:#d0d5dd;--sgds-light-400:#98a2b3;--sgds-light-500:#667085;--sgds-light-600:#344054;--sgds-light-700:#1d2939;--sgds-light-800:#000;--sgds-light-900:#000;--sgds-dark-100:#f7f7f9;--sgds-dark-200:#e4e7ec;--sgds-dark-300:#d0d5dd;--sgds-dark-400:#98a2b3;--sgds-dark-500:#667085;--sgds-dark-600:#344054;--sgds-dark-700:#1d2939;--sgds-dark-800:#000;--sgds-dark-900:#000;--overlay-background-color:rgba(0,0,0,.5);--zindex-modal:1055;font-family:var(--sgds-body-font-family,"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-size:var(--sgds-body-font-size,1rem);font-weight:var(--sgds-body-font-weight,400);line-height:var(--sgds-body-line-height,2)}:host ::slotted(a[target=_blank]):after,:host a[target=_blank]:after{background-color:currentColor;content:"/";display:inline-block;margin:0 .125rem;-webkit-mask-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>');mask-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>');-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;mask-size:73%;-webkit-mask-size:73%;padding:0 .45em}`;

  /**
   * @cssprop --sgds-{stateColor} - State colors in hexadecimal value
   * @cssprop --sgds-{stateColor}-rgb - State colors in rgb value
   * @cssprop --sgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
   * @cssprop --sgds-gray-{weights} - State colors with different weightage in hexadecimal value
   * @cssprop --overlay-background-color - The drawer and modal component overlay background color
   * @cssprop --zindex-modal - The drawer and modal component z-index value
   */
  class SgdsElement extends LitElement {
      /** Emits a custom event with more convenient defaults. */
      emit(name, options) {
          const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
          this.dispatchEvent(event);
          return event;
      }
  }
  SgdsElement.styles = css_248z$2;

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * For AttributeParts, sets the attribute if the value is defined and removes
   * the attribute if the value is undefined.
   *
   * For other part types, this directive is a no-op.
   */
  const ifDefined = (value) => value !== null && value !== void 0 ? value : nothing;

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Prevents JSON injection attacks.
   *
   * The goals of this brand:
   *   1) fast to check
   *   2) code is small on the wire
   *   3) multiple versions of Lit in a single page will all produce mutually
   *      interoperable StaticValues
   *   4) normal JSON.parse (without an unusual reviver) can not produce a
   *      StaticValue
   *
   * Symbols satisfy (1), (2), and (4). We use Symbol.for to satisfy (3), but
   * we don't care about the key, so we break ties via (2) and use the empty
   * string.
   */
  const brand = Symbol.for('');
  /** Safely extracts the string part of a StaticValue. */
  const unwrapStaticValue = (value) => {
      if ((value === null || value === void 0 ? void 0 : value.r) !== brand) {
          return undefined;
      }
      return value === null || value === void 0 ? void 0 : value['_$litStatic$'];
  };
  const textFromStatic = (value) => {
      if (value['_$litStatic$'] !== undefined) {
          return value['_$litStatic$'];
      }
      else {
          throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${value}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
      }
  };
  /**
   * Tags a string literal so that it behaves like part of the static template
   * strings instead of a dynamic value.
   *
   * The only values that may be used in template expressions are other tagged
   * `literal` results or `unsafeStatic` values (note that untrusted content
   * should never be passed to `unsafeStatic`).
   *
   * Users must take care to ensure that adding the static string to the template
   * results in well-formed HTML, or else templates may break unexpectedly.
   *
   * Static values can be changed, but they will cause a complete re-render since
   * they effectively create a new template.
   */
  const literal = (strings, ...values) => ({
      ['_$litStatic$']: values.reduce((acc, v, idx) => acc + textFromStatic(v) + strings[idx + 1], strings[0]),
      r: brand,
  });
  const stringsCache = new Map();
  /**
   * Wraps a lit-html template tag (`html` or `svg`) to add static value support.
   */
  const withStatic = (coreTag) => (strings, ...values) => {
      const l = values.length;
      let staticValue;
      let dynamicValue;
      const staticStrings = [];
      const dynamicValues = [];
      let i = 0;
      let hasStatics = false;
      let s;
      while (i < l) {
          s = strings[i];
          // Collect any unsafeStatic values, and their following template strings
          // so that we treat a run of template strings and unsafe static values as
          // a single template string.
          while (i < l &&
              ((dynamicValue = values[i]),
                  (staticValue = unwrapStaticValue(dynamicValue))) !== undefined) {
              s += staticValue + strings[++i];
              hasStatics = true;
          }
          // If the last value is static, we don't need to push it.
          if (i !== l) {
              dynamicValues.push(dynamicValue);
          }
          staticStrings.push(s);
          i++;
      }
      // If the last value isn't static (which would have consumed the last
      // string), then we need to add the last string.
      if (i === l) {
          staticStrings.push(strings[l]);
      }
      if (hasStatics) {
          const key = staticStrings.join('$$lit$$');
          strings = stringsCache.get(key);
          if (strings === undefined) {
              // Beware: in general this pattern is unsafe, and doing so may bypass
              // lit's security checks and allow an attacker to execute arbitrary
              // code and inject arbitrary content.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              staticStrings.raw = staticStrings;
              stringsCache.set(key, (strings = staticStrings));
          }
          values = dynamicValues;
      }
      return coreTag(strings, ...values);
  };
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   *
   * Includes static value support from `lit-html/static.js`.
   */
  const html = withStatic(html$1);

  const reportValidityOverloads = new WeakMap();
  class FormSubmitController {
      constructor(host, options) {
          (this.host = host).addController(this);
          this.options = Object.assign({ form: (input) => {
                  return input.closest("form");
              }, name: (input) => input.name, value: (input) => input.value, defaultValue: (input) => input.defaultValue, disabled: (input) => input.disabled, reportValidity: (input) => {
                  return typeof input.reportValidity === "function" ? input.reportValidity() : true;
              }, setValue: (input, value) => {
                  input.value = value;
              } }, options);
          this.handleFormData = this.handleFormData.bind(this);
          this.handleFormSubmit = this.handleFormSubmit.bind(this);
          this.handleFormReset = this.handleFormReset.bind(this);
          this.reportFormValidity = this.reportFormValidity.bind(this);
      }
      hostConnected() {
          this.form = this.options.form(this.host);
          if (this.form) {
              this.form.addEventListener("formdata", this.handleFormData);
              this.form.addEventListener("submit", this.handleFormSubmit);
              this.form.addEventListener("reset", this.handleFormReset);
              // Overload the form's reportValidity() method so it looks at Shoelace form controls
              if (!reportValidityOverloads.has(this.form)) {
                  reportValidityOverloads.set(this.form, this.form.reportValidity);
                  this.form.reportValidity = () => this.reportFormValidity();
              }
          }
      }
      hostDisconnected() {
          if (this.form) {
              this.form.removeEventListener("formdata", this.handleFormData);
              this.form.removeEventListener("submit", this.handleFormSubmit);
              this.form.removeEventListener("reset", this.handleFormReset);
              // Remove the overload and restore the original method
              if (reportValidityOverloads.has(this.form)) {
                  this.form.reportValidity = reportValidityOverloads.get(this.form);
                  reportValidityOverloads.delete(this.form);
              }
              this.form = undefined;
          }
      }
      handleFormData(event) {
          const disabled = this.options.disabled(this.host);
          const name = this.options.name(this.host);
          const value = this.options.value(this.host);
          if (!disabled && typeof name === "string" && typeof value !== "undefined") {
              if (Array.isArray(value)) {
                  value.forEach(val => {
                      event.formData.append(name, val.toString());
                  });
              }
              else {
                  event.formData.append(name, value.toString());
              }
          }
      }
      handleFormSubmit(event) {
          const disabled = this.options.disabled(this.host);
          const reportValidity = this.options.reportValidity;
          if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
              event.preventDefault();
              event.stopImmediatePropagation();
          }
      }
      handleFormReset() {
          this.options.setValue(this.host, this.options.defaultValue(this.host));
      }
      reportFormValidity() {
          //
          // Shoelace form controls work hard to act like regular form controls. They support the Constraint Validation API
          // and its associated methods such as setCustomValidity() and reportValidity(). However, the HTMLFormElement also
          // has a reportValidity() method that will trigger validation on all child controls. Since we're not yet using
          // ElementInternals, we need to overload this method so it looks for any element with the reportValidity() method.
          //
          // We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
          // validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
          // be necessary once we can use ElementInternals.
          //
          // Note that we're also honoring the form's novalidate attribute.
          //
          if (this.form && !this.form.noValidate) {
              // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
              // elements that support the constraint validation API.
              const elements = this.form.querySelectorAll("*");
              for (const element of elements) {
                  if (typeof element.reportValidity === "function") {
                      if (!element.reportValidity()) {
                          return false;
                      }
                  }
              }
          }
          return true;
      }
      doAction(type, invoker) {
          if (this.form) {
              const button = document.createElement("button");
              button.type = type;
              button.style.position = "absolute";
              button.style.width = "0";
              button.style.height = "0";
              button.style.clipPath = "inset(50%)";
              button.style.overflow = "hidden";
              button.style.whiteSpace = "nowrap";
              // Pass form attributes through to the temporary button
              if (invoker) {
                  ["formaction", "formmethod", "formnovalidate", "formtarget"].forEach(attr => {
                      if (invoker.hasAttribute(attr)) {
                          button.setAttribute(attr, invoker.getAttribute(attr));
                      }
                  });
              }
              this.form.append(button);
              button.click();
              button.remove();
          }
      }
      /** Resets the form, restoring all the control to their default value */
      reset(invoker) {
          this.doAction("reset", invoker);
      }
      /** Submits the form, triggering validation and form data injection. */
      submit(invoker) {
          // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
          // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
          this.doAction("submit", invoker);
      }
  }

  var css_248z$1 = css`:host{display:inline-block}`;

  /**
   * @summary Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
   *
   * @slot default - The button's label.
   *
   * @event sgds-blur - Emitted when the button is not focused.
   * @event sgds-focus - Emitted when the button is focused.
   */
  class SgdsButton extends SgdsElement {
      constructor() {
          super(...arguments);
          /** @internal */
          this.formSubmitController = new FormSubmitController(this, {
              form: (input) => {
                  // Buttons support a form attribute that points to an arbitrary form, so if this attribute it set we need to query
                  // the form from the same root using its id
                  if (input.hasAttribute("form")) {
                      const doc = input.getRootNode();
                      const formId = input.getAttribute("form");
                      return doc.getElementById(formId);
                  }
                  // Fall back to the closest containing form
                  return input.closest("form");
              }
          });
          /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` as well as "outline" versions (prefixed by `outline-*`) */
          this.variant = "primary";
          /** Manually set the visual state of the button to `:active` */
          this.active = false;
          /** The disabled state of the button */
          this.disabled = false;
          /** The behavior of the button with default as `type='button', `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
          this.type = "button";
          /** @internal */
          this.clickHandler = () => {
              if (this.type === "submit") {
                  this.formSubmitController.submit(this);
              }
              if (this.type === "reset") {
                  this.formSubmitController.reset(this);
              }
          };
      }
      /** Sets focus on the button. */
      focus(options) {
          this.button.focus(options);
      }
      /** Simulates a click on the button. */
      click() {
          this.button.click();
      }
      /** Removes focus from the button. */
      blur() {
          this.button.blur();
      }
      handleBlur() {
          this.emit("sgds-blur");
      }
      handleFocus() {
          this.emit("sgds-focus");
      }
      handleClick(event) {
          if (this.disabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
          }
          this.removeEventListener("click", this.clickHandler);
          this.addEventListener("click", this.clickHandler);
      }
      render() {
          const isLink = this.href;
          const tag = isLink ? literal `a` : literal `button`;
          return html `
      <${tag}
        class="sgds btn ${classMap({
            disabled: isLink && this.disabled,
            active: this.active,
            [`btn-${this.variant}`]: this.variant,
            [`btn-${this.size}`]: this.size,
            [`${this.buttonClasses}`]: this.buttonClasses
        })}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target === "_blank" ? "noreferrer noopener" : undefined)}
        role=${ifDefined(isLink ? "button" : undefined)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
      <slot></slot>
      </${tag}>
    `;
      }
  }
  SgdsButton.styles = [SgdsElement.styles, css_248z$1];
  __decorate([
      query(".btn")
  ], SgdsButton.prototype, "button", void 0);
  __decorate([
      property({ reflect: true })
  ], SgdsButton.prototype, "variant", void 0);
  __decorate([
      property({ reflect: true })
  ], SgdsButton.prototype, "buttonClasses", void 0);
  __decorate([
      property({ reflect: true })
  ], SgdsButton.prototype, "size", void 0);
  __decorate([
      property({ type: Boolean, reflect: true })
  ], SgdsButton.prototype, "active", void 0);
  __decorate([
      property({ type: Boolean, reflect: true })
  ], SgdsButton.prototype, "disabled", void 0);
  __decorate([
      property()
  ], SgdsButton.prototype, "type", void 0);
  __decorate([
      property()
  ], SgdsButton.prototype, "href", void 0);
  __decorate([
      property()
  ], SgdsButton.prototype, "target", void 0);
  __decorate([
      property({ reflect: true })
  ], SgdsButton.prototype, "download", void 0);
  __decorate([
      property()
  ], SgdsButton.prototype, "form", void 0);
  __decorate([
      property({ attribute: "formaction" })
  ], SgdsButton.prototype, "formAction", void 0);
  __decorate([
      property({ attribute: "formmethod" })
  ], SgdsButton.prototype, "formMethod", void 0);
  __decorate([
      property({ attribute: "formnovalidate", type: Boolean })
  ], SgdsButton.prototype, "formNoValidate", void 0);
  __decorate([
      property({ attribute: "formtarget" })
  ], SgdsButton.prototype, "formTarget", void 0);

  var css_248z = css`:host{--fileupload-left-icon-fill:green;--fileupload-remove-icon-fill:red;--fileupload-remove-icon-hover-fill:#c00}.fileupload-list-item span{cursor:pointer}.fileupload-list-item span:first-of-type svg{fill:var(--fileupload-left-icon-fill)}.fileupload-list-item span:last-of-type svg{fill:var(--fileupload-remove-icon-fill)}.fileupload-list-item span:last-of-type svg:hover{fill:var(--fileupload-remove-icon-hover-fill)}.file-upload__label{align-items:center;display:flex;gap:.5rem}.drag-drop-area{align-items:center;border:2px dashed var(--sgds-gray-300);border-radius:4px;cursor:pointer;display:flex;flex-direction:row;justify-content:center;padding:20px;text-align:center;transition:all .3s ease-in-out}.drag-drop-area.dragover{background-color:var(--sgds-primary-200);border-color:var(--sgds-primary)}.icon{height:3rem;width:3rem}slot[name=icon]::slotted(svg){height:100%;width:100%}`;

  function genId (componentName = "", elementName = "") {
      return `id-${Math.random().toString().substring(2, 6)}-sgds-${componentName}-${elementName}`;
  }

  /**
   * @summary Allows users to upload files of various sizes and formats
   * @slot default - Label for file upload button
   *
   * @event sgds-files-selected - Emitted when files are selected for uploading
   *
   * @cssproperty --fileupload-file-icon-fill - Left icon fill color
   * @cssproperty --fileupload-remove-icon-fill - Remove icon fill color
   * @cssproperty --fileupload-remove-icon-hover-fill - Remove icon mouse over fill color
   *
   */
  class SgdsFileUpload extends ScopedElementsMixin(SgdsElement) {
      constructor() {
          super(...arguments);
          /** The button's variant. */
          this.variant = "primary";
          // /** Sets a unique id to the file input, required. */
          // @property({ type: String }) controlId = "";
          //** Disable the fileuploader button */
          this.disabled = false;
          /** Allows multiple files to be listed for uploading */
          this.multiple = false;
          /** Specify the acceptable file type  */
          this.accept = "";
          /** Customize the check icon with SVG */
          this.checkedIcon = "";
          /** Customize the cancel icon with SVG */
          this.cancelIcon = "";
          /** @internal */
          this.selectedFiles = [];
          // Create a ref to the input element
          /** @internal */
          this.inputRef = createRef();
          /**@internal */
          this.inputId = genId("input", "file");
      }
      /**@internal */
      static get scopedElements() {
          return {
              "sgds-button": SgdsButton
          };
      }
      setFileList(files) {
          this.files = files;
          this.emit("sgds-files-selected");
          //Possible to pass in the files
      }
      /** @internal */
      handleClick(event) {
          event.preventDefault();
          if (!this.disabled) {
              // Get a reference to the input element using the inputRef
              const inputElement = this.inputRef.value;
              // Do something with the input element
              inputElement.click();
          }
      }
      /** @internal */
      _handleDragOver(event) {
          var _a;
          event.preventDefault();
          (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#drag-drop-area").classList.add("dragover");
      }
      /** @internal */
      _handleDragLeave(event) {
          var _a;
          event.preventDefault();
          (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#drag-drop-area").classList.remove("dragover");
      }
      /** @internal */
      _handleFileList(files) {
          if (files.length) {
              if (files.length > 5) {
                  this.invalidFeedback = "You can upload a maximum of 5 files.";
                  this.selectedFiles = [];
                  return;
              }
              let valid = true;
              const acceptedTypes = this.accept.split(",").map(type => type.trim());
              for (let i = 0; i < files.length; i++) {
                  if (!this._isFileTypeAccepted(files[i], acceptedTypes)) {
                      this.invalidFeedback = `File type not accepted: ${files[i].name}`;
                      valid = false;
                      break;
                  }
                  if (files[i].size > 10 * 1024 * 1024) {
                      // 10MB in bytes
                      this.invalidFeedback = "File size exceeds 10MB.";
                      valid = false;
                      break;
                  }
              }
              if (valid) {
                  this.invalidFeedback = "";
                  this.selectedFiles = Array.from(files);
              }
              else {
                  this.selectedFiles = [];
              }
          }
          // Trigger a re-render of the component to update the list of selected files
          this.setFileList(files);
          this.requestUpdate();
      }
      /** @internal */
      _isFileTypeAccepted(file, acceptedTypes) {
          return acceptedTypes.some(type => {
              if (type.startsWith(".")) {
                  return file.name.endsWith(type);
              }
              else if (type.endsWith("/*")) {
                  return file.type.startsWith(type.slice(0, -2));
              }
              else {
                  return file.type === type;
              }
          });
      }
      /** @internal */
      _handleDropFile(event) {
          var _a, _b;
          event.preventDefault();
          (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#drag-drop-area").classList.remove("dragover");
          const files = event.dataTransfer.files;
          const inputElement = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("input");
          inputElement.files = files;
          this._handleFileList(files);
      }
      /** @internal */
      handleInputChange(event) {
          const inputElement = event.target;
          const files = inputElement.files;
          this._handleFileList(files);
      }
      /** @internal */
      removeFileHandler(index) {
          const inputElement = this.inputRef.value;
          const attachments = inputElement.files;
          const fileBuffer = new DataTransfer();
          for (let i = 0; i < attachments.length; i++) {
              if (index !== i)
                  fileBuffer.items.add(attachments[i]);
          }
          // Assign buffer to file input
          inputElement.files = fileBuffer.files;
          // Re-populate selected files to the lists
          this.setFileList(fileBuffer.files);
          this.selectedFiles = Array.from(fileBuffer.files);
          // Trigger a re-render of the component to update the list of selected files
          this.requestUpdate();
      }
      render() {
          const getCheckedIcon = (checkedIcon) => {
              if (checkedIcon) {
                  return html$1 `${unsafeSVG(checkedIcon)}`;
              }
              return html$1 ` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
        />
      </svg>`;
          };
          const getCancelIcon = (cancelIcon) => {
              if (cancelIcon) {
                  return html$1 `${unsafeSVG(cancelIcon)}`;
              }
              return html$1 `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="red"
        class="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>`;
          };
          const listItems = this.selectedFiles.map((file, index) => html$1 `
        <li key=${index} class="fileupload-list-item d-flex gap-2">
          <span>${getCheckedIcon(this.checkedIcon)}</span>
          <span class="filename">${file.name}</span>
          <span @click=${() => this.removeFileHandler(index)}>${getCancelIcon(this.cancelIcon)}</span>
        </li>
      `);
          return html$1 `
      <input
        ${ref(this.inputRef)}
        type="file"
        class="d-none form-control ${classMap({
            "is-invalid": this.invalidFeedback
        })}"
        @change=${this.handleInputChange}
        ?multiple=${this.multiple}
        accept=${this.accept}
        id=${this.inputId}
      />
      <div
        id="drag-drop-area"
        class="drag-drop-area"
        @click=${this.handleClick}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDropFile}
      >
        <div class="icon"><slot name="icon"></slot></div>
        <slot></slot>
      </div>
      <div class="invalid-feedback">${this.invalidFeedback}</div>

      <ul class="sgds fileupload-list">
        ${listItems}
      </ul>
    `;
      }
  }
  SgdsFileUpload.styles = [SgdsElement.styles, css_248z];
  __decorate([
      property({ reflect: true })
  ], SgdsFileUpload.prototype, "variant", void 0);
  __decorate([
      property({ type: Boolean, reflect: true })
  ], SgdsFileUpload.prototype, "disabled", void 0);
  __decorate([
      property({ type: Boolean, reflect: true })
  ], SgdsFileUpload.prototype, "multiple", void 0);
  __decorate([
      property({ type: Number })
  ], SgdsFileUpload.prototype, "maxFiles", void 0);
  __decorate([
      property({ type: String, reflect: true })
  ], SgdsFileUpload.prototype, "accept", void 0);
  __decorate([
      property({ reflect: true })
  ], SgdsFileUpload.prototype, "size", void 0);
  __decorate([
      property({ type: String })
  ], SgdsFileUpload.prototype, "checkedIcon", void 0);
  __decorate([
      property({ type: String })
  ], SgdsFileUpload.prototype, "cancelIcon", void 0);
  __decorate([
      property({ type: Object, state: true })
  ], SgdsFileUpload.prototype, "files", void 0);
  __decorate([
      property({ type: Array })
  ], SgdsFileUpload.prototype, "selectedFiles", void 0);
  __decorate([
      state()
  ], SgdsFileUpload.prototype, "invalidFeedback", void 0);

  customElements.define("sgds-drag-drop-file-upload", SgdsFileUpload);

}));
//# sourceMappingURL=index.umd.js.map
