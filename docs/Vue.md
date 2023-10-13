# Vue

Web components are [fully supported in Vue](https://custom-elements-everywhere.com/#vue) and can be used directly.

## Demo app 

Refer to this [stackblitz demo app](https://stackblitz.com/github/clukhei/web-components-with-vue?file=README.md) on the usage example 

## Installation

Locally install the library or use CDN by adding the script tag to entry point of the Vue application. Follow instructions in `Installation` and `Imports` documentation section

## Configuration

Tell Vue to ignore sgds web components and skip component resolution.

### Vite config example

```typescript
// vite.config.js
import vue from "@vitejs/plugin-vue";

export default {
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
};
```

### Vue CLI config example

```typescript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with sgds- as custom elements
          isCustomElement: tag => tag.startsWith("sgds-")
        }
      }));
  }
};
```

## Importing the library

Import the library once in your entry point and use it throughout your application.

```typescript
//App.vue
<script>
import "@govtechsg/sgds-web-component"

export default {
  name: "app",
  components: {
    ...
  },
};
</script>
```

## Usage

See Vue's documentation on usage with [custom elements](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue)

```typescript
// e.g. Attribute binding with footer
<template>
<div>
<sgds-footer :title="footerAttr.title" :description="footerAttr.description" :lastUpdatedDate="footerAttr.date" .:links="footerAttr.links"></sgds-footer>
</div>
</template>

<script lang='ts'>
import { ref, computed } from "vue";

export default {
  setup() {
    const footerAttr = computed(() => ({
      title: "Singapore Design System",
      description: "this is a description",
      date: new Date().toDateString(),
      links : [
        {
            "title": "Column 1",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        },
        {
            "title": "Column 2",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        },
        {
            "title": "Column 3",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        },
        {
            "title": "Column 4",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        },
        {
            "title": "Column 5",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        },
        {
            "title": "Column 6",
            "links" : [
                {
                    "href": "#1",
                    "label": "About Us"
                },
                {
                    "href": "#2",
                    "label": "This is a super long link"
                },
                {
                    "href": "#3",
                    "label": "Test"
                },
                {
                    "href": "#4",
                    "label": "Test"
                }
            ]
        }
      ]
    }))
    return { footerAttr };
  },
};
</script>
```

```typescript
// e.g. of v-model usage on sgds web components
// e.g. using sgds events for callbacks usage
<template>
<form>
<sgds-input @sgds-input="onInput" v-model="inputValue" placeholder="Enter your name">
    </sgds-input>
<div>Name: {{inputValue}} </div>
</form>
</template>

<script lang='ts'>
import { ref, computed } from "vue";

export default {
  setup() {
    const inputValue = ref("defaultValue")
    const onInput = () => {
    console.log("inputting")
    }
    return { onInput, inputValue };
  },
};
</script>

```

```typescript
// e.g. using slots in vue
<sgds-sidenav>
  <sgds-sidenav-item>
    <span slot="title"> SideNav Item #1 (control by Argstable) </span>
    <sgds-sidenav-link>sgds-sidenav-link (control by Argstable)</sgds-sidenav-link>
    <sgds-sidenav-link href="#" disabled="">
      sgds-sidenav-link
    </sgds-sidenav-link>
    <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
  </sgds-sidenav-item>
  <sgds-sidenav-item>
    <span slot="title">SideNav Item #2</span>
    <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
    <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
    <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
  </sgds-sidenav-item>
  <sgds-sidenav-item href="#">
    <span slot="title">SideNav Item #3</span>
  </sgds-sidenav-item>
</sgds-sidenav>
```
