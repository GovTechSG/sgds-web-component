# sgds-web-components coding style guide

## Table of contents

- [sgds-web-components coding style guide](#typescript-coding-style-guide)

  - [Naming](#naming)
    - [Naming Variables](#naming-variables)
    - [Naming Conventions](#naming-conventions)
    - [Naming Booleans](#naming-booleans)
    - [Naming Methods](#naming-methods)
    - [Naming Events](#naming-events)
  - [Typescript](#typescript)
  - [Jsdocs](#jsdoc)

### Naming

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

### Naming Variables

**Use meaningful variable names.**

Distinguish names in such a way that the reader knows what the differences offer.

Bad:

 ``` typescript
 function isBetween(a1: number, a2: number, a3: number): boolean {
   return a2 <= a1 && a1 <= a3;
 }
```

Good: 

``` typescript
 function isBetween(value: number, left: number, right: number): boolean {
   return left <= value && value <= right;
 }
```

**Use pronounceable variable names**

If you can't pronounce it, you can't discuss it without sounding weird.

Bad:

``` typescript
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
```

Good:

``` typescript
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}
```

**Avoid mental mapping**

Explicit is better than implicit.<br />
*Clarity is king.*

Bad:

``` typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

Good:

``` typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**Don't add unneeded context**

If your class/type/object name tells you something, don't repeat that in your variable name.

Bad:

``` typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

Good:

``` typescript
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

### Naming Conventions

* Use camelCase for variable and function names

Bad:

``` typescript
var FooVar;
function BarFunc() { }
```

Good:

``` typescript
var fooVar;
function barFunc() { }
```

* Use camelCase of class members, interface members, methods and methods parameters

Bad:

``` typescript
class Foo {
  Bar: number;
  Baz() { }
}
```

Good:

``` typescript
class Foo {
  bar: number;
  baz() { }
}
```

* Use PascalCase for class names and interface names.

Bad:

``` typescript
class foo { }
```

Good:

``` typescript
class Foo { }
```

* Use PascalCase for enums and camelCase for enum members

Bad:

``` typescript
enum notificationTypes {
  Default = 0,
  Info = 1,
  Success = 2,
  Error = 3,
  Warning = 4
}
```

Good:

``` typescript
enum NotificationTypes {
  default = 0,
  info = 1,
  success = 2,
  error = 3,
  warning = 4
}
```

### Naming Booleans

* Don't use negative names for boolean variables.

Bad:

``` typescript
const isNotEnabled = true;
```

Good:

``` typescript
const isEnabled = false;
```

### Naming Methods

* Keep it simple. If the action can be understood with the least amount of words. If the method has many action and needs to be described in multiple words, then you should refactor the method to have a single responsibility 

Bad: 

```typescript 
handleCloseClick() {}
```

Good: 

```typescript
close()
```

* If your class/type/object name tells you something, don't repeat that in your variable name.

Bad: 

```typescript 
class Alert extends LitElement {
  closeAlert() {}
}
```

Good: 

```typescript
class Alert extends LitElement {
  close() {}
}
```

### Naming Events

1. Events should be named with an action word , prefix with `sgds-`

Bad: `hide`, `show`
Good: `sgds-hide, sgds-show, sgds-after-show, sgds-toggle`

2. Before creating a new event name, check if there are existing names for the same purposed.

3. Use the `emit` method of SgdsElement class to emit a custom event


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

2. Include `@slots`, `@event`, `@csspart` , `@cssproperty` and their respective name whenever present in the component.

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
 * 
 * @cssproperty --mainnav-item-theme-color - Hover and active color for mainnav items.
 * @cssproperty --mainnav-item-color - Text color of nav item.
 * @cssproperty --mainnav-item-borderBottom-width - border bottom width for hover and active state for nav item
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

### Lit 

 Avoid sgds specific querying of children components to allow reusability and implementation of our Lit components by other users. [Example](https://github.com/GovTechSG/sgds-web-component/commit/2c30a4dcfab31f52074dec6dde3446356da33373)

Bad: 

```typescript
const children = this.querySelectorAll("sgds-sidenav-item");
```

Good: 

```typescript
const children = this.shadowRoot.querySelector('slot').assignedElements({flatten: true});
```