# Next.js integration

SGDS web components are fully supported in Next.js with React 19+.

## Recommended: Use React wrapper components

For Next.js projects, we recommend importing the **React-wrapped** SGDS components instead of using the native `<sgds-*>` custom element tags directly. The React wrappers resolve hydration timing issues that cause event listeners to fail on initial page load — you get working events declaratively without needing `useEffect` + `addEventListener` workarounds.

```tsx
'use client';
import { SgdsInput, SgdsButton } from "@govtechsg/sgds-web-component/react";

export default function MyForm() {
  return (
    <>
      <SgdsInput label="Name" onSgdsChange={(e) => console.log(e)} />
      <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>Submit</SgdsButton>
    </>
  );
}
```

Event naming follows the camelCase convention: `sgds-change` → `onSgdsChange`, `sgds-after-show` → `onSgdsAfterShow`.

See the [React integration guide](/docs/frameworks-react--docs) for full import paths and TypeScript usage.

## Prerequisites

Before integrating SGDS with Next.js, read the [React integration guide](/docs/frameworks-react--docs) for foundational concepts.

Web components work best as client components because they rely on browser APIs (`document` and `window`).

## Common issues and solutions

### 1. Event listeners not firing on first load

**Problem:** Custom event listeners fail to attach due to Next.js hydration timing when using native `<sgds-*>` tags.

**Recommended solution:** Use the React wrapper components which handle this automatically:

```tsx
'use client';
import { SgdsInput } from "@govtechsg/sgds-web-component/react";

export default function MyInput() {
  return <SgdsInput label="Search" onSgdsInput={(e) => console.log(e)} />;
}
```

**Alternative solution (if using native tags):** Add event listeners in a `useEffect` hook instead of declaratively:

```tsx
'use client';

import { type JSX, useEffect, useRef } from 'react';

interface Props {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
}

const SgdsInput = ({
  className,
  label,
  placeholder,
  value,
  onInput = () => {}
}: Props): JSX.Element => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (event: CustomEvent<{ value: string }>) => {
      const inputElement = event.target as HTMLInputElement;
      onInput(inputElement.value);
    };

    input.addEventListener('sgds-input', handleInput);
    
    return () => {
      input.removeEventListener('sgds-input', handleInput);
    };
  }, [onInput]);

  return (
    <sgds-input
      ref={inputRef}
      className={className}
      label={label}
      placeholder={placeholder}
      value={value}
      suppressHydrationWarning
    >
      <sgds-icon slot="icon" name="search" suppressHydrationWarning />
    </sgds-input>
  );
};

export default SgdsInput;
```

### 2. Hydration mismatch warnings

**Problem:** Next.js detects attribute differences between server and client rendering.

**Cause:** Web components add attributes during browser parsing that weren't declared in the initial markup.

**Solution:** Add `suppressHydrationWarning` to web component elements:

```tsx
<sgds-input suppressHydrationWarning>
  <sgds-icon slot="icon" name="search" suppressHydrationWarning />
</sgds-input>
```

### 3. TypeScript support

Add a `types.d.ts` file at the project root and import the SGDS React type definitions. This gives full IntelliSense for props and typed `CustomEvent` detail payloads on all `sgds-*` elements without manual per-component declarations:

```ts
// types.d.ts
import "@govtechsg/sgds-web-component/types/react";
```

Ensure the file is picked up by your `tsconfig.json`:

```json
{
  "include": ["types.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

### 4. Flash of unstyled content 

Read more about [FOUC](/docs/troubleshoot-flash-of-unstyled-content--docs)