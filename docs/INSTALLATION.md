# Installation Guide

You can load SGDS's web components via CDN or by installing it locally. The library depends on  [scoped custom elements registry](https://open-wc.org/docs/development/scoped-elements/) and in certain cases, it is required to import the `@webcomponents/scoped-custom-element-registry` polyfill before the web components.

Refer to [open-wc's directive on scoped-elements](https://open-wc.org/docs/development/scoped-elements/#:~:text=load%20the%20polyfill%20if%20you%20need%20scoping) for more details to know when to use the polyfill.

## CDN

The CDN loader registers all SGDS elements up front. Depending on your usage, you may or may not need to load the polyfill.

```js
// load scoped custom element registry polyfill first (optional, depends on use case)
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry"></script>

<script type="module" src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc"></script>

```

## Local Installation

You can also install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component@rc  @webcomponents/scoped-custom-element-registry

```
import the polyfill and library once in you entry point and use the web components throughout your project. Note that the scoped custom element registry polyfill has to be imported before any custom element registration happens. 

```js
// import polyfill first (optional, depends on use case), follow by the web components
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component";

```

