<img src="https://img.shields.io/badge/lit-324FFF?style=for-the-badge&logo=lit&logoColor=white" /> &nbsp;
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" /> &nbsp;
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />&nbsp;

# sgds-web-component

# Installation Guide

You can load SGDS's web components via CDN or by installing it locally. The library depends on [scoped custom elements registry](https://open-wc.org/docs/development/scoped-elements/) and in certain cases, it is required to import the `@webcomponents/scoped-custom-element-registry` polyfill before the web components.

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
import "@webcomponents/scoped-custom-element-registry";
import "@govtechsg/sgds-web-component";
```

# Imports

## Using the custom elements

Once imported, the custom elements can be used throughout the project.

```js
// import all custom elements at once
import "@govtechsg/sgds-web-component";
// or import individual custom elements
import "@govtechsg/sgds-web-component/components/Button";

//usage
// <sgds-button>Hello World</sgds-button>
```

## Using the component's class object

When writing with Typescript, you might be required to type the components in certain cases. Import the component class like so.
Each component's Class is exported via named exports, prefixed with `Sgds`.

```js
import { SgdsButton, SgdsMainnav } from "@govtechsg/sgds-web-component/components";
// or
import { SgdsButton } from "@govtechsg/sgds-web-component/components/Button/sgds-button";
import { SgdsMainnav } from "@govtechsg/sgds-web-component/components/Mainnav/sgds-mainnav";
```

# Attributes and Properties

## String

The web components uses attributes to set the properties. For example, the variant attribute is used to set the variant property of the button and in turn alters its class and changes its color

```html
<sgds-button variant="secondary"></sgds-button>
```

## Boolean

Boolean properties are usually false by default. To set it to true, add it as an attribute with no value on the custom element

```html
<sgds-accordion allowMultiple> ... </sgds-accordion>

<sgds-input disabled></sgds-input>
```

## Objects, Arrays and Functions

Functions have to be passed in via javascript. For attributes that accepts Objects or Arrays, you can pass in as a JSON string or via javascript.

```html
//via JSON string
<sgds-table tableHeaders='["Name", "BirthDate"]'></sgds-table>

// via Javascript
<script>
  const table = document.querySelector("sgds-table");
  table.tableHeaders = ["Name", "Birthdate"];
</script>
```

# Events

While you can listen for common HTML events like onclick, onmouseover etc., it is not recommended to do so. This is because the events emitted within a component's shadow root are retargeted to look like they've come from the host element rather than internal elements to the Shadow DOM. There are also [certain events](https://web.dev/shadowdom-301/#events-that-are-always-stopped) that will never cross the shadow boundary. See [DOM spec](https://dom.spec.whatwg.org/#retarget) and [Shadow Dom 301](https://web.dev/shadowdom-301/#event-model) for better illustration.

Tl;Dr: This may result in, for example, multiple click handlers executing even if the user clicks just once or no events emitted for certain events.

As such, we recommend you to listen for custom events emitted by SGDS web components over the native HTML events. The emitted custom events, if present, are specified for each component under API table.

```html
<sgds-checkbox>Check me</sgds-checkbox>

<script>
  const checkbox = document.querySelector("sgds-checkbox");
  checkbox.addEventListener("sgds-change", event => {
    console.log(event.target.checked ? "checked" : "not checked");
  });
</script>
```

# Slots

The [HTMl slot elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are placeholders inside the web components that you can fill up with your own HTML markups.

There are two kinds of slots: default and named slots. In the storybook documentation, slots are found under the API table with their names. If the name of a slot is <bold>default</bold>, it means that it is a default slot. For all other names, they are named slots.

Handle the usage of the default slot and named slot as below

1. default slot : `<slot></slot>`

   ```html
   <sgds-button><span>Hello World</span></sgds-button>
   ```

   "Hello World" span element is placed in the default slot

2. named slot : `<slot name="icon"></slot>`

```html
<sgds-button>
  <span>Hello World</span>
  <svg slot="icon"></svg>
</sgds-button>
```

    The svg element with attribute `slot=icon` is placed in the named slot

# Stylings

## Global Styles

The following css custom variable are exposed to enable users to make modifications across all web components in our library

| css custom variable name     | description                                                |
| ---------------------------- | ---------------------------------------------------------- |
| --sgds-body-font-family      | Set the font family of the web components                  |
| --sgds-body-font-size        | Set the font size of the web components                    |
| --sgds-body-font-weight      | Set the font weight of the web components                  |
| --sgds-body-line-height      | Set the line height of the web components                  |
| --sgds-{stateColor}-rgb      | State colors in red,green,blue value                       |
| --sgds-{stateColor}          | State colors in hexadecimal value                          |
| --sgds-{stateColor}          | State colors in hexadecimal value                          |
| --sgds-{stateColor}-{weight} | State colors with different weightage in hexadecimal value |
| --sgds-gray-{weight}         | Gray colors with different weightage in hexadecimal value  |

> `{stateColor}` consists of `primary`,`secondary`,`success`,`warning`,`danger`,`info`,`light`,`dark`
>
> `{weight}` are color weightage in hundreds starting from `100` up to `900`

```css
:root {
  --sgds-body-font-family: "Inter";
  --sgds-body-font-size: 5rem;
  --sgds-primary-rgb: 89, 37, 220;
  --sgds-secondary: #1f69ff;
  --sgds-success-500: #3bb346;
  --sgds-gray-500: #667085;
}
```

## Component Styles

SGDS web component library is shipped with SGDS v2 stylings and does not require you to configure or install any other styling files.
The styles of components are built in and can be modified via props, cssparts and css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### classes prop

Some components exposes a class-like attribute, usually named "classes" prefix with the element's name e.g. buttonClasses.
SGDS web component library is shipped with our v2 design library, a spin-off from Bootstrap v5. As such, the css tokens are applicable to use and exposed to the shadow DOM.

For example, you can pass "btn-lg" and "me-2" to `buttonClasses` prop as another way to customise the stylings of your button.

```html
<sgds-button buttonClasses="btn-lg me-2">Hello world</sgds-button>
```

**NOTE** Do not use `class` attribute to attempt to style the shadow tree of the host. We did not the forward of `class` attribute to the shadow DOM so that users are able to style the light dom with it. Use `class` attribute when you need to style the light DOM.

### cssparts

Some components expose cssparts on selected elements of the shadow DOM. See the API table for each component on the css parts exposed.

```css
sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}
```

### css custom variable

Some components have defined css custom variable for styling of selected aspects of the element in the shadow DOM. See the API table for the available css custom variables

```css
sgds-sidenav {
  --sidenav-theme-color: pink;
}
```

## External stylings

Any external stylings done on our web components like positioning needs to be done on your end. You can use [SGDS v2 library](https://designsystem.tech.gov.sg/get-started/)to leverage on the position stylings we provide e.g. ms-auto, flexbox, grids

# Angular

Web components are [fully supported in Angular](https://custom-elements-everywhere.com/#angular) and can be used directly.

## Demo app

Refer to this [stackblitz demo app](https://stackblitz.com/github/clukhei/angular-stepper?file=README.md) on the usage example

## Installation

Locally install the library or use CDN by adding the script tag to entry point of the Angular application (i.e. index.html). Follow instructions in `Installation` and `Imports` documentation section

## Configuration

Apply CUSTOM_ELEMENTS_SCHEMA as shown below

```typescript
//app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

## Importing the library

When using a several of our components it can be more convenient to import the entire library once in App Module and use it throughout the application

```typescript
//app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "@govtechsg/sgds-web-component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

## Referencing sgds-web-components in Angular

```typescript
//alert.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SgdsAlert } from '@govtechsg/sgds-web-component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @ViewChild('alert')
  alert? : ElementRef<SgdsAlert>

  showAlert() {
    this.alert?.nativeElement.show()
  }
  alertShowState?: boolean = false

}

//alert.component.html
<sgds-button (click)="showAlert()">{{buttonText}}</sgds-button>
<sgds-alert #alert [show]="alertShowState">Alerting</sgds-alert>

```

# React

Web components are [not fully supported in React](https://custom-elements-everywhere.com/#react) and should only be used directly when no rich data is required to be passed into the web components and your use case does not require any events handling.

Instead, our library outputs the React version of each of our web components. You can choose to use either the React components or the web components. This React instruction page mainly focuses on how to use the React version.

## Demo app

Refer to this [stackblitz demo app](https://stackblitz.com/edit/vitejs-vite-gebvf5) on the usage example

## Importing the library

Follow instructions in `Installation` documentation section.
Our components are exported via named exports. Import the components like so

```js
import { SgdsButton, SgdsTooltip } from "@govtechsg/sgds-web-component/react";
// or
import { SgdsButton } from "@govtechsg/sgds-web-component/react/button";
import { SgdsTooltip } from "@govtechsg/sgds-web-component/react/tooltip";
```

The components follow React naming convention, using pascal case as the component name. See the example table below for the web components tagname and its corresponding React name.

| Web Components    | React           |
| ----------------- | --------------- |
| sgds-button       | SgdsButton      |
| sgds-mainnav      | SgdsMainnav     |
| sgds-mainnav-item | SgdsMainnavItem |
| sgds-textarea     | SgdsTextarea    |

```jsx
//Button.ts
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

const ButtonWc = () => {
  return <SgdsButton>Button</SgdsButton>;
};
export default ButtonWc;
```

## Event Handling

We follow the React convention for events name, each custom event emitted by the web component is prefixed with a `on` and converted to camel case. Native events still applies to the components.

For example:

| Web Components  | React           |
| --------------- | --------------- |
| sgds-change     | onSgdsChange    |
| sgds-toggle     | onSgdsToggle    |
| sgds-after-show | onSgdsAfterShow |
| sgds-after-hide | onSgdsAfterHide |

If you are using Typescript, note that `event.target` refers to the underlying custom element.

```tsx
import { useState } from "react";
import { SgdsInput } from "@govtechsg/sgds-web-component/react";
import type { SgdsInput as SgdsInputElement } from "@govtechsg/sgds-web-component";

function MyComponent() {
  const [value, setValue] = useState("");

  return <SgdsInput value={value} onSgdsInput={event => setValue((event.target as SgdsInputElement).value)} />;
}

export default MyComponent;
```

## NextJs

The support for NextJS and server side rendering is WIP.

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

# Extending sgds-web-component

For users who are leveraging on sgds-web-component as a building block to build and export your own web component library with Lit, you will have to adopt the scoped elements approach to prevent any foreseeable clash of registries between sgds-web-component and your web component library in the case where your users are importing both libraries.

## Scoped Elements

The CustomElementRegistry is a global registry that provides methods for registering custom elements. One of the limitations of working with this global registry is that multiple versions of the same element cannot co-exist. This causes bottlenecks in software delivery that should be managed by the teams and complex build systems. Scoped Custom Element Registries is a proposal that will solve the problem. Since this functionality won't be available (especially not cross browser) anytime soon, we've adopted [OpenWC's Scoped Elements](https://open-wc.org/docs/development/scoped-elements/).

Whenever a sgds component uses composition (meaning it uses another sgds component inside), we apply ScopedElementsMixin to make sure it uses the right version of this internal component.

For users who are using sgds component directly for builing application, use the custom elements directly by [importing the custom elements](#using-the-custom-elements)

For users who are building component libraries on top of sgds-web-component, please adopt OpenWC's scoped elements to prevent exporting our registered custom elements.

Things to note:

1. Import component class from `@govtechsg/sgds-web-component/components`. Here the components are not registered in the custom element registry
2. Define the tagName you want to assign to the component's class

Example below

```jsx
import { SgdsMasthead, SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem } from "@govtechsg/sgds-web-component/components";
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

// Lit element
@customElement('my-navbar')
export class MyNavbar extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'sgds-mainnav': SgdsMainnav,
      'sgds-mainnav-dropdown': SgdsMainnavDropdown,
      'sgds-mainnav-item': SgdsMainnavItem,
      'sgds-masthead': SgdsMasthead
    };
  }
    ...

 render() {
    return html`
        <sgds-masthead fluid="false"></sgds-masthead>
            <sgds-mainnav>
              <img width="240" src="https://dev.assets.developer.tech.gov.sg/svg/logo.svg" slot="brand">
                <sgds-mainnav-dropdown togglertext="Home" slot="end">
                    <sgds-dropdown-item>Logout</sgds-dropdown-item>
                </sgds-mainnav-dropdown>
                <sgds-mainnav-item href="#">Content</sgds-mainnav-item>
                <sgds-mainnav-item href="#}">Biography</sgds-mainnav-item>
            </sgds-mainnav>
          `
      }
}
```

<sgds-alert show variant="success"><svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
</svg><small>we are live and stable now! Please re-read the documentation on how to import the components if you were previously using our unstable version (i.e. package version less than 1.0.0)</small></sgds-alert>

# @govtechsg/sgds-web-component

[![npm](https://img.shields.io/npm/dw/@govtechsg/sgds-web-component?label=npm&style=flat-square)](https://www.npmjs.com/package/@govtechsg/sgds-web-component)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@govtechsg/sgds-web-component/badge)](https://www.jsdelivr.com/package/npm/@govtechsg/sgds-web-component)
[![github](https://img.shields.io/badge/GitHub-Code-232323.svg?style=flat-square&logo=github&logoColor=white)](https://github.com/GovTechSG/sgds-web-component)

<div class="home-card-container mt-5">
    <sgds-card class="col">
        <span slot="title">SGDS v2+ <i class="bi bi-filetype-scss"></i></span>
        <a slot="link" href="https://designsystem.tech.gov.sg/" target="_blank"></a>
        <p slot="description">The components are shipped with SGDS v2 styles and can be used straight out of the box.</p>
    </sgds-card>
     <sgds-card class="col">
        <span slot="title">Framework agnostic <i class="bi bi-puzzle"></i></span>
        <a slot="link" href="https://custom-elements-everywhere.com/" target="_blank"></a>
        <p slot="description">Compatible with all frameworks. Each web component also has its own React version for full compatibility with React.</p>
    </sgds-card>
     <sgds-card class="col">
        <span slot="title">Theming with CSS variables <i class="bi bi-filetype-css"></i></span>
        <a slot="link" href="/docs/style-theming--docs" target="_blank"></a>
        <p slot="description">Change the theme with CSS Variables </p>
    </sgds-card>
     <sgds-card class="col">
        <span slot="title">Works with CDNs <i class="bi bi-truck"></i></span>
        <a slot="link" href="/docs/getting-started-installation--docs#method-2-using-cdn" target="_self"></a>
        <p slot="description">Besides whole library CDN, each component also has its own CDN.</p>
    </sgds-card>
    <sgds-card class="col">
        <span slot="title">Accessible <i class="bi bi-person-wheelchair"></i></span>
        <p slot="description">We are working to build our components fully accessible.</p>
    </sgds-card>
    <sgds-card class="col">
        <span slot="title">Open Source <i class="bi bi-github"></i></span>
        <p slot="description">We are open source and welcome contributions from the community!</p>
        <a slot="link" href="https://github.com/GovTechSG/sgds-web-component" target="_blank"></a>
    </sgds-card>
    <sgds-card class="col">
        <span slot="title">Extendable <i class="bi bi-bricks"></i></span>
        <p slot="description">Our components are built with LitElement and are extendable. Use them as building blocks to create your complex component. </p>
        <a slot="link" href="/docs/usage-extending-the-library--docs" target="_blank"></a>
    </sgds-card>
</div>
