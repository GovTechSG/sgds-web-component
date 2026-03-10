---
name: sgds-components-setup
description: "Setup and framework integration instructions for using SGDS web components. Apply this skill whenever a user asks about installing SGDS components, integrating with React, Vue, or Angular, React 19 vs React 18 component usage, importing individual components, or accessing component methods via refs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: setup
---

# SGDS Components Setup Skill

Prerequisites and framework integration for using `<sgds-*>` web components.

## Installation

```bash
npm install @govtechsg/sgds-web-component
# or
pnpm add @govtechsg/sgds-web-component
```

Import the library once at your app entry point:

```js
import "@govtechsg/sgds-web-component";
```

## Framework Integration

### React

**React version determines which import to use.**

#### React 19+

React 19 supports native custom elements directly — use the web component tag, no wrapper needed:

```jsx
import "@govtechsg/sgds-web-component";

function App() {
  return (
    <sgds-button variant="primary" onsgds-blur={(e) => console.log(e)}>
      Click Me
    </sgds-button>
  );
}
```

Custom event syntax in React 19: prefix the event name with `on` in lowercase (`sgds-blur` → `onsgds-blur`).

Complex props (arrays, objects) can be passed declaratively:

```jsx
import "@govtechsg/sgds-web-component";

const steps = [
  { component: <Step1 />, stepHeader: "Personal details" },
  { component: <Step2 />, stepHeader: "Contact details" },
];

function App() {
  return <sgds-stepper steps={steps}></sgds-stepper>;
}
```

#### React 18 and below

React ≤18 does not support custom element events or complex props natively. Use the React wrapper components:

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

function App() {
  return (
    <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>
      Click Me
    </SgdsButton>
  );
}
```

React wrapper event naming: `sgds-blur` → `onSgdsBlur`, `sgds-change` → `onSgdsChange` (prefix `on`, camelCase).

| Web component event | React ≤18 wrapper prop |
|---|---|
| `sgds-change` | `onSgdsChange` |
| `sgds-blur` | `onSgdsBlur` |
| `sgds-focus` | `onSgdsFocus` |
| `sgds-toggle` | `onSgdsToggle` |
| `sgds-after-show` | `onSgdsAfterShow` |
| `sgds-after-hide` | `onSgdsAfterHide` |

**Accessing component methods in React ≤18** (via `useRef`):

```tsx
import { useRef } from "react";
import type { SgdsStepper as SStep } from "@govtechsg/sgds-web-component/components";
import SgdsStepper from "@govtechsg/sgds-web-component/react/stepper/index.js";

function StepperComponent() {
  const stepperRef = useRef<SStep>(null);
  return <SgdsStepper steps={steps} ref={stepperRef} />;
}
```

> **Note**: The React wrappers will be phased out in a future major version. Migrate to React 19+ native usage when possible.

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs

---

### Vue

Vue 3 supports web components natively — no SGDS-specific wrappers exist. Refer to the [Vue + web components documentation](https://vuejs.org/guide/extras/web-components) for configuration. The SGDS-specific filter for suppressing unknown element warnings is `tag.startsWith("sgds-")`.

---

### Angular

Angular supports web components natively via `CUSTOM_ELEMENTS_SCHEMA` — no SGDS-specific wrappers exist. Refer to the [Angular elements documentation](https://angular.io/guide/elements) for configuration.

---

**For AI agents**: The key SGDS-specific decision is React version. React 19+ uses the native `<sgds-*>` tag directly. React ≤18 requires the SGDS React wrapper package. Vue and Angular use native web components — their setup is standard web component integration, not SGDS-specific.
