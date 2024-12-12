# NextJs

Pre-requisite: please read <a href="/docs/frameworks-react--docs" target="_self">documentation on React</a> prior to this.

Web components are client components as they rely heavily on document and window API that is only present in the browser.


  >From version 2.1.0, the React-wrapped web components will be exported with the "use client" directives following 
  ><a target="_blank" href="https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#basic-example">NextJS 13 directives</a> .
  ><strong>Users importing our react-wrapped web components no longer need to add the "use client" directive.</strong>


 ### Usage example 

```jsx
// layout.ts
import SgdsMasthead from "@govtechsg/sgds-web-component/react/masthead/index.js"

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <SgdsMasthead />
      </body>
    </html>
  );
}
```
<!-- For certain components, you might encounter console warnings from NextJS that `ShadowRoot is not defined` or `windows is not defined`. Such components needs to be completely client side rendered. The "use client" directive is insufficient as the component is [still pre-rendered on the server and hydrated on the client](https://nextjs.org/docs/app/building-your-application/rendering/client-components). In the server, there is no concept of `windows` and `ShadowRoot`.

For such cases, re-export the components like so:

```jsx
import dynamic from "next/dynamic";
const SgdsActionCard = dynamic(() => import("@govtechsg/sgds-web-component/react/action-card/index.js"), {
  ssr: false
});

export default SgdsActionCard;
``` -->

#### Demo

Refer to this [codesandbox demo app](https://codesandbox.io/p/devbox/github/clukhei/next-with-sgds-web-component/tree/main/) for the working example

### Example - CDN Script tag

Alternatively, use CDN to load web components on the browser side.

**NOTE**: Read CDN usage guide on <a href="/docs/getting-started-installation--docs#method-2-using-cdn" target="_blank">Installation page</a>

**NOTE**: <a href="/docs/frameworks-react--docs#react" target="_blank">Caveats</a> on using web components in React

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
