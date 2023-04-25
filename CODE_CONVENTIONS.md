# sgds-web-components coding style guide

## Table of contents

- [sgds-web-components coding style guide](#typescript-coding-style-guide)
  - [Naming](#naming)
  - [Naming Conventions](#naming-conventions)
  - [Naming Booleans](#naming-booleans)
  - [Brackets](#brackets)
  - [Spaces](#spaces)
  - [Semicolons](#semicolons)
  - [Code Comments](#code-comments)
  - [Barrels](#barrels)
- [Angular coding style guide](#angular-coding-style-guide)

  - [Organize imports](#organize-imports)
  - [Use typescript aliases](#use-typescript-aliases)
  - [Specify component member accessor explicitly](#specify-component-member-accessor-explicitly)
  - [Component structure](#component-structure)
  - [private Subject, public Observable pattern](#private-subject,-public-observable-pattern)
  - [Services inside HTML templates](#services-inside-HTML-templates)
  - [Manage Subscriptions Declaratively](#manage-subscriptions-declaratively)

  ### Naming

  ### Typescript

  All variables, properties and functions should be typed. The Tscompiler can infer the type of properties when a default value is assigned but not when none is defined. If a variable does not need to have a default variable, assign a type to it.

  Bad:

```typescript
    @property({ type: Boolean, reflect: true }) isLight;
    @property({ type: Boolean, reflect: true }) roundedPill;
```

Good:

```typescript
    @property({ type: Boolean, reflect: true }) isLight: boolean;
    @property({ type: Boolean, reflect: true }) roundedPill = false;
```

### jsdoc

jsdoc annotations is used to generate the custom-element.json, the metadata of sgds-web-components. The metadata is then used in generating the react package and storybook documentations

1.  All main component should have a @summary description of the component that will be rendered in the storybook docs. Annotate them above the component code

```typescript
/**
 * @summary A dropdown mechanism that allow users to either show or hide related content.
 */
@customElement("sgds-accordion")
export class SgdsAccordion extends SgdsElement {}
```

2. Include @slots, @event, @csspart and their respective name whenever present in the component.

```typescript
/**
 * @slot default - content of the accordion item
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @csspart base - The accordion-item base wrapper
 * @csspart header - The accordion-item button header
 * @csspart content - The accordion-item content
 */
@customElement("sgds-accordion-item")
export class SgdsAccordionItem extends SgdsElement {
```

2. Annotate Lit's property decorator, @property, with jsdocs comments. Custom-element Analyzer is able to parse Lit's @property decorator as params.

```typescript
  /** Controls whether accordion-item is open or close */
 @property({ type: Boolean, reflect: true }) open = false;
```

3.  Annotate all @query with @internal tag

```typescript
  /** @internal */
  @query(".accordion-body") body: HTMLElement;
```

4. Annotate public methods with jsdocs comments. Any methods that is meant expose for users should be marked with the "public" access modifier

```typescript 
/** Shows the accordion. */
  public async show() {
  }
```