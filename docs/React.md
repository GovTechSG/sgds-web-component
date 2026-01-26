# React

React 19 fully supports Web Components, enabling seamless integration of custom elements without additional wrappers. Therefore, using React-wrapped Web Components is no longer required, simplifying development and improving interoperability.

Our library still outputs the React version of each of our web components for backward compabiltiy, but if you are on React 19, it is highly recommended to use the web components directly as we are looking to phase out the React wrapped components in the future. 

## React 19 and onwards

### Usage 

You can directly use the native web components

```jsx
//Select.ts
import "@govtechsg/sgds-web-component/components/Select";

const SgdsSelect = () => {
  return <sgds-select></sgds-select>;
};
export default ButtonWc;
```

### Events

React 19 has a new syntax for custom events. For example, a custom event `sgds-change` should be written prefixed with an `on`

```jsx
const SgdsSelect = () => {
  return <sgds-select onsgds-change={(e: CustomEvent) => console.log(e)}></sgds-select>;
};
```

### Complex props

Complex properties like arrays and objects can now be declaratively defined in React 19

```jsx

const SgdsStepper = () => {
    const step = [
    {
      component: <PersonalDetails setData={setData} data={data} />,
      stepHeader: "Personal details",
    },
    {
      component: <ContactDetails setData={setData} data={data} />,
      stepHeader: "Contact details",
    },
    { component: <Review data={data} />, stepHeader: "Review" },
  ];
  return <sgds-stepper steps={step}></sgds-stepper>;
};
```

## React 18 and below

### Demo app 

Refer to this [stackblitz demo app](https://stackblitz.com/edit/vitejs-vite-gebvf5) on the usage example 

### Importing the library

Follow instructions in `Installation` documentation section.
Our components are exported via named exports. Import the components like so

```js

import { SgdsButton, SgdsTooltip } from "@govtechsg/sgds-web-component/react";
// or default exports when importing from the subfolders
import SgdsButton  from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsTooltip  from "@govtechsg/sgds-web-component/react/tooltip/index.js";

```

The components follow React naming convention, using pascal case as the component name. See the example table below for the web components tagname and its corresponding React name.

| Web Components    | React           |
| ----------------- | --------------- |
| sgds-button       | SgdsButton      |
| sgds-mainnav      | SgdsMainnav     |
| sgds-mainnav-item | SgdsMainnavItem |
| sgds-textarea     | SgdsTextarea    |

```jsx
//Button.ts
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

const ButtonWc = () => {
  return <SgdsButton>Button</SgdsButton>;
};
export default ButtonWc;
```

## Event Handling

We follow the React convention for events name, each custom event emitted by the web component is prefixed with a `on` and converted to camel case. Native events still applies to the components.

For example:

| Web Components  | React           |
| --------------- | --------------- |
| sgds-change     | onSgdsChange    |
| sgds-toggle     | onSgdsToggle    |
| sgds-after-show | onSgdsAfterShow |
| sgds-after-hide | onSgdsAfterHide |

If you are using Typescript, note that `event.target` refers to the underlying custom element. 

```tsx
import { useState } from 'react';
import { SgdsInput } from '@govtechsg/sgds-web-component/react';
import type { SgdsInput as SgdsInputElement } from '@govtechsg/sgds-web-component';

function MyComponent() {
  const [value, setValue] = useState('');

  return <SgdsInput value={value} onSgdsInput={event => setValue((event.target as SgdsInputElement).value)} />;
}

export default MyComponent;

```

## Accessing methods in React

Each web components are build from class objects and some have public methods exposed. To access the component's method in react, you would required to get the reference of the component using React 's `useRef()` hook. See individual component API documentation for the available methods. 

For example, SgdsStepper exposes public methods like `getComponent()`

```tsx
import { useRef } from 'react';
import type { SgdsStepper as SStep } from '@govtechsg/sgds-web-component/components';
import SgdsStepper  from "@govtechsg/sgds-web-component/react/stepper/index.js";

function StepperComponent() {
  ...
 const stepperRef = useRef<SStep>(null)
 const ChildComponent = () : ReactNode => {
   const stepper = stepperRef.current 
    const childComponent =  stepper?.getComponent(1) as ReactNode
    return childComponent
 }
 return <>
 <SgdsStepper steps={step} ref={stepperRef} activeStep={stepNo}></SgdsStepper>
 <ChildComponent/>
 </>
}
```