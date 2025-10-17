# Flash of unstyled content

Flash of unstyled content (FOUC) is the the momentary flicker where the user sees a page (or a part of it) before styles have finished applying — typically showing raw HTML without CSS styling or custom element rendering.

Web Components rely on custom elements and Shadow DOM, both of which depend on client-side JavaScript to define and hydrate those components.

When used in SSR frameworks like Next.js, this creates a timing problem. During SSR, Next.js outputs raw custom element tags without their logic or styles, causing the browser to initially render unstyled content that only becomes fully styled and functional after the Web Components are defined and hydrated on the client, resulting in FOUC.

To mitigate FOUC, our library provides an opt-in CSS that hides the Web Components’ light DOM until the component is fully :defined and upgraded.

## Import fouc.css at the top level of the app

1. Import it in your global css file 

```css
// global.css
@import url("@govtechsg/sgds-web-component/css/fouc.css");

```
2. Import global.css at your entry point 

```js
//layout.jsx
import "./global.css"
```

or you can directly import the css in the entry point of your application 

```js
//entry point
import "@govtechsg/sgds-web-component/css/fouc.css";
```