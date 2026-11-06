# Nuxt integration

SGDS web components are fully supported in Nuxt 4 with server-side rendering (SSR) via [nuxt-ssr-lit](https://github.com/nicoth-in/nuxt-ssr-lit). Components are rendered on the server and hydrated on the client with no flash of unstyled content.

## Installation

```bash
npm i @govtechsg/sgds-web-component nuxt-ssr-lit
```

## Configuration

### `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // Register nuxt-ssr-lit and tell it which custom element prefixes to SSR
  modules: [["nuxt-ssr-lit", { litElementPrefix: ["sgds-"] }]],

  // Import SGDS theme and foundation CSS
  css: ["~/assets/css/main.css"],

  // Tell Vue to treat sgds-* tags as custom elements
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("sgds-"),
    },
  },

  nitro: {
    // Ensure SGDS side effects (custom element registration) are preserved
    moduleSideEffects: ["@govtechsg/sgds-web-component"],

    // Inline Lit SSR modules so Nitro bundles them correctly in production
    externals: {
      inline: [
        "@lit-labs/ssr",
        "@lit-labs/ssr-client",
        "@lit-labs/ssr-dom-shim",
        "lit",
        "lit-element",
        "lit-html",
        "@lit/reactive-element",
        "parse5",
        "entities",
      ],
    },
  },

  alias: {
    tslib: "tslib/tslib.es6.js",
  },
});
```

### Why `nitro.externals.inline` is needed

Nitro externalises server dependencies by default. Lit and its SSR modules use ESM imports that break when externalised in the production server bundle. Inlining them ensures correct module resolution at runtime. Without this configuration, you will see `ERR_MODULE_NOT_FOUND` errors when running `nuxt preview` or in production.

### CSS entry point

Create `assets/css/main.css`:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/css/sgds.css";
```

## Usage

Import and use SGDS components directly in Vue templates:

```html
<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Button/index.js";
import "@govtechsg/sgds-web-component/components/Input/index.js";
</script>

<template>
  <form>
    <sgds-input label="Name" placeholder="Enter your name" />
    <sgds-button variant="primary">Submit</sgds-button>
  </form>
</template>
```

## Event handling

Use Vue's `@` syntax with the SGDS event names:

```html
<template>
  <sgds-input label="Name" @sgds-input="onInput" />
</template>

<script setup lang="ts">
const onInput = (event: CustomEvent) => {
  console.log(event.target.value);
};
</script>
```

## Attribute and property binding

```html
<template>
  <sgds-footer
    :title="footerTitle"
    :description="footerDescription"
    .:links="footerLinks"
  />
</template>
```

Use `:attr` for string/boolean attributes and `.:prop` for complex objects and arrays.

See the [Vue integration guide](/docs/frameworks-vue--docs) for more details on attribute binding, v-model, and slots.
