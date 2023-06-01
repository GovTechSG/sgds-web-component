# Installation Guide

You can load SGDS's web components via CDN or by installing it locally. 
<!-- <s>If you're using a framework, make sure to check out the pages for React, Vue, and Angular for additional information.</s> -->

## CDN

The CDN loader registers all SGDS elements up front. Note that, if you're only using a handful of components. You can also cherry pick components via local imports if you want to load specific ones up front.

```js

<script type="module" src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component"></script>

```

## Local Installation

You can also install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component

```

and import the library once in your entry point and use it globally throughout your project

```js

import "@govtechsg/sgds-web-component";

```

