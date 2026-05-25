# Vue

Web components are [fully supported in Vue](https://custom-elements-everywhere.com/#vue) and can be used directly.

## Installation

Locally install the library or use CDN by adding the script tag to entry point of the Vue application. Follow instructions in `Installation` and `Imports` documentation section

## Configuration

Tell Vue to ignore sgds web components and skip component resolution.

### Vite config

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags that starts with sgds as custom elements
          isCustomElement: tag => tag.includes("sgds-")
        }
      }
    })
  ]
});
```

## Importing the library

Import the library and its theme once in your entry point and use it throughout your application.

```html
<!-- App.vue -->
<script setup lang="ts">
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component";
</script>
```

## Usage

See Vue's documentation on usage with [custom elements](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue)

### Attribute binding

```html
<template>
  <sgds-footer
    :title="footerAttr.title"
    :description="footerAttr.description"
    :lastUpdatedDate="footerAttr.date"
    .:links="footerAttr.links"
  ></sgds-footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const footerAttr = computed(() => ({
  title: "Singapore Design System",
  description: "this is a description",
  date: new Date().toDateString(),
  links: [
    {
      title: "Column 1",
      links: [
        { href: "#1", label: "About Us" },
        { href: "#2", label: "This is a super long link" },
        { href: "#3", label: "Test" }
      ]
    },
    {
      title: "Column 2",
      links: [
        { href: "#1", label: "About Us" },
        { href: "#2", label: "This is a super long link" },
        { href: "#3", label: "Test" }
      ]
    }
  ]
}));
</script>
```

### v-model and event handling

```html
<template>
  <form>
    <sgds-input
      @sgds-input="onInput"
      v-model="inputValue"
      placeholder="Enter your name"
    ></sgds-input>
    <div>Name: {{ inputValue }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref("defaultValue");

const onInput = () => {
  console.log("inputting");
};
</script>
```

### Slots

```html
<template>
  <sgds-sidenav>
    <sgds-sidenav-item>
      <span slot="title">SideNav Item #1</span>
      <sgds-sidenav-link>sgds-sidenav-link</sgds-sidenav-link>
      <sgds-sidenav-link href="#" disabled="">sgds-sidenav-link</sgds-sidenav-link>
      <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
    </sgds-sidenav-item>
    <sgds-sidenav-item>
      <span slot="title">SideNav Item #2</span>
      <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
      <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
    </sgds-sidenav-item>
    <sgds-sidenav-item href="#">
      <span slot="title">SideNav Item #3</span>
    </sgds-sidenav-item>
  </sgds-sidenav>
</template>
```
