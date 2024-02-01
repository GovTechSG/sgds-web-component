# Installation Guide

You can load SGDS's web components via CDN or by installing it locally. The library depends on <a href="https://open-wc.org/docs/development/scoped-elements/" target="_blank">scoped custom elements registry</a> and in <a href="/story/getting-started-usage-scoped-elements--page#components-requiring-polyfill" >certain cases</a>, it is required to import the `@webcomponents/scoped-custom-element-registry` polyfill before the web components.

Refer to <a href="/story/getting-started-usage-scoped-elements--page" target="_blank">Scoped Elements section</a> for more details of the polyfill.

## CDN

The CDN loader registers all SGDS elements up front. Depending on your usage, you may or may not need to load the polyfill.

> When using CDN, it is recommended to version control. On initial usage, pick the latest version of the library. See list of available npm versions [here](https://www.npmjs.com/package/@govtechsg/sgds-web-component?activeTab=versions) 

> Stick to the version that works for you and make intentional updates on your end when you need the latest library updates. Versions are immutable and thus, stable.

> By not specifying the version, you are using the latest version and subjected to changes made by the library that are not tested on your end. While we do our best to ensure backward compatibility between patches and minor version updates, we cannot guarantee that we have covered all of our user's edge cases. 


```js
// load scoped custom element registry polyfill first (optional, depends on use case)
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry@0.0.9"></script>
// it is recommended to load a particular version when using cdn e.g. https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@1.0.2
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>"></script>

//or load a single component e.g. Masthead
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>/components/Masthead/index.umd.js"></script>

```

## Local Installation

You can also install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component 
// Loading the polyfill is not always required 
npm install @webcomponents/scoped-custom-element-registry@0.0.9

```
import the polyfill and library once in your project's entry point and use the web components throughout your project. Note that the scoped custom element registry polyfill has to be imported before any custom element registration happens. 
Loading of polyfill is not always required, <a target="_blank" href="/story/getting-started-usage-scoped-elements--page">see when to use the polyfill </a>

```js
// load scoped custom element registry polyfill first (optional, depends on use case)
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component";

```




