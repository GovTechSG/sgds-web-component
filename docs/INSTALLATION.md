# Install SGDS web components

You can load SGDS's web components via CDN or by installing it locally. The library depends on <a href="https://open-wc.org/docs/development/scoped-elements/" target="_blank">scoped custom elements registry</a> and in <a href="/docs/usage-scoped-elements--docs#components-requiring-polyfill" target="_self">certain cases</a>, it is required to import the `@webcomponents/scoped-custom-element-registry` polyfill before the web components.

Refer to <a href="/docs/usage-scoped-elements--docs" target="_self">Scoped Elements section</a> for more details of the polyfill.

## Method 1: Local installation

### Step 1: Install library

Install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component@3.0.0-rc.1
// Loading the polyfill is not always required
npm install @webcomponents/scoped-custom-element-registry@0.0.9

```

import the polyfill and library once in your project's entry point and use the web components throughout your project. Note that the scoped custom element registry polyfill has to be imported before any custom element registration happens.
Loading of polyfill is not always required, <a target="_blank" href="/docs/usage-scoped-elements--docs" target="_self">see when to use the polyfill </a>

```js
// load scoped custom element registry polyfill first (optional, depends on use case)
import "@webcomponents/scoped-custom-element-registry";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component";

```

### Step 2: Framework specific setup 

Please refer to the respective framework setup before importing the components.

- [Angular](/docs/frameworks-angular--docs)
- [Vue](/docs/frameworks-vue--docs)
- [React](/docs/frameworks-react--docs)
- [NextJS](/docs/frameworks-nextjs--docs)

### Step 3: Import components

Once imported, the web components can be used throughout the project. You may import individual components or import all components at once. It is recommended to cherry pick components, rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

#### React users

Are you a react user? If so, skip to the <a href="/docs/frameworks-react--docs#importing-the-library" target="_self">react import instructions </a>

#### Importing individual component

```js
// import global css first (once)
import "@govtechsg/sgds-web-component/themes/day.css";
//import button only
import "@govtechsg/sgds-web-component/components/Button";
```

#### Importing all components

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component";
```

## Method 2: Using CDN

This method registers all SGDS elements up front in the Custom Elements Registry. Depending on your usage, you may or may not need to load the polyfill.

> When using CDN, it is recommended to version control. On initial usage, pick the latest version of the library. See list of available npm versions [here](https://www.npmjs.com/package/@govtechsg/sgds-web-component?activeTab=versions)

> Stick to the version that works for you and make intentional updates on your end when you need the latest library updates. Versions are immutable and thus, stable.

> By not specifying the version, you are using the latest version and subjected to changes made by the library that are not tested on your end. While we do our best to ensure backward compatibility between patches and minor version updates, we cannot guarantee that we have covered all of our user's edge cases.

```js
// load scoped custom element registry polyfill first (optional, depends on use case)
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry@0.0.9"></script>
// Load global css file
<link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.0-rc.1/themes/day.css' rel='stylesheet' type='text/css' />

// it is recommended to load a particular version when using cdn e.g. https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@1.0.2
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.0-rc.1"></script>

//or load a single component e.g. Masthead
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.0-rc.1/components/Masthead/index.umd.js"></script>

```

## Start building your application

You are now ready to build your own application. You may refer to the <a href="/docs/components-accordion--docs" target="_self">components</a> page to find out more