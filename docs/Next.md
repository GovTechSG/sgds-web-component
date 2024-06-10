# NextJs

Web components are client components as they rely heavily on document and window API that is only present in the browser.

Use "use client" directive to indicate that the components are Client components.

### Example - Client components

```jsx
"use client";
import SgdsMasthead from "@govtechsg/sgds-web-component/react/masthead/index.js";

const Masthead = () => {
  return (
      <SgdsMasthead></SgdsMasthead>
  );
};

export default Masthead;
```

For certain components, you might encounter console warnings from NextJS that `ShadowRoot is not defined` or `windows is not defined`. Such components needs to be completely client side rendered. Adding "use client" is insufficient as the component is [still pre-rendered on the server and hydrated on the client](https://nextjs.org/docs/app/building-your-application/rendering/client-components). In the server, there is no concept of `windows` and `ShadowRoot`.

For such cases, import the components like so

```jsx
"use client";
import dynamic from "next/dynamic";
const SgdsActionCard = dynamic(() => import("@govtechsg/sgds-web-component/react/action-card/index.js"), {
  ssr: false
});

const ActionCard = () => {
  return <SgdsActionCard></SgdsActionCard>;
};

export default ActionCard;
```

#### Demo

Refer to this [codesandbox demo app](https://codesandbox.io/p/devbox/github/clukhei/next-with-sgds-web-component/tree/main/) for the working example

### Example - CDN Script tag

Alternatively, use CDN to load web components on the browser side.

**NOTE**: Read CDN usage guide on <a href="iframe.html?id=getting-started-installation--page&viewMode=story#:~:text=use%20the%20polyfill.-,CDN,-The%20CDN%20loader" target="_blank">Installation page</a>

**NOTE**: <a href="iframe.html?id=frameworks-react--page&viewMode=story#:~:text=Web%20components%20are%20not%20fully%20supported%20in%20React%20and%20should%20only%20be%20used%20directly%20when%20no%20rich%20data%20is%20required%20to%20be%20passed%20into%20the%20web%20components%20and%20your%20use%20case%20does%20not%20require%20any%20events%20handling." target="_blank">Caveats</a> on using web components in React

```jsx
import type { NextPage } from "next";
import Script from "next/script";
const Home: NextPage = () => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>/components/Masthead/index.umd.js" />
      <sgds-masthead></sgds-masthead>
    </>
  );
};

export default Home;
```

For Typescript users, make sure to typed the web components

```jsx
//types.d.ts file
import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sgds-masthead": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
```
