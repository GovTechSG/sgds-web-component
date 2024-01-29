# Installation Guide

You can load SGDS's web components via CDN or by installing it locally. The library depends on  [scoped custom elements registry](https://open-wc.org/docs/development/scoped-elements/) and in certain cases, it is required to import the `@webcomponents/scoped-custom-element-registry` polyfill before the web components.

Refer to [open-wc's directive on scoped-elements](https://open-wc.org/docs/development/scoped-elements/#:~:text=load%20the%20polyfill%20if%20you%20need%20scoping) for more details to know when to use the polyfill.

## CDN

The CDN loader registers all SGDS elements up front. Depending on your usage, you may or may not need to load the polyfill.

> When using CDN, it is recommended to version control. On initial usage, pick the latest version of the library. See list of available npm versions [here](https://www.npmjs.com/package/@govtechsg/sgds-web-component?activeTab=versions) 

> Stick to the version that works for you and make intentional updates on your end when you need the latest library updates. Versions are immutable and thus, stable.

> By not specifying the version, you are using the latest version and subjected to changes made by the library that are not tested on your end. While we do our best to ensure backward compatibility between patches and minor version updates, we cannot guarantee that we have covered all of our user's edge cases. 


```js
// load scoped custom element registry polyfill first (optional, depends on use case)
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry"></script>
// it is recommended to load a particular version when using cdn e.g. https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@1.0.2
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>"></script>

//or load a single component e.g. Masthead
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>/components/Masthead/index.umd.js"></script>

```

## Local Installation

You can also install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component @webcomponents/scoped-custom-element-registry

```
import the polyfill and library once in you entry point and use the web components throughout your project. Note that the scoped custom element registry polyfill has to be imported before any custom element registration happens. 

```js
// import polyfill first (optional, depends on use case), follow by the web components
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component";

```

