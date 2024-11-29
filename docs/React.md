# React

Web components are [not fully supported in React](https://custom-elements-everywhere.com/#react) and should only be used directly when no rich data is required to be passed into the web components and your use case does not require any events handling.

Instead, our library outputs the React version of each of our web components. You can choose to use either the React components or the web components. This React instruction page mainly focuses on how to use the React version.

## Demo app 

Refer to this [stackblitz demo app](https://stackblitz.com/edit/vitejs-vite-gebvf5) on the usage example 

## Importing the library

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