# Angular

Web components are [fully supported in Angular](https://custom-elements-everywhere.com/#angular) and can be used directly.

## Installation

Locally install the library or use CDN by adding the script tag to entry point of the Angular application (i.e. index.html). Follow instructions in `Installation` and `Imports` documentation section

## Configuration

Angular requires `CUSTOM_ELEMENTS_SCHEMA` to recognise custom element tags. Add it to the `schemas` array of any standalone component that uses SGDS web components.

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

## Importing the library

Import the library once in your root component (or in `main.ts`) to register all custom elements globally:

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

Alternatively, import individual components for smaller bundles:

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component/components/Button";
import "@govtechsg/sgds-web-component/components/Alert";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

## Usage

See Angular's documentation on [using custom elements](https://angular.dev/guide/elements).

### Binding Attributes and Properties

Use Angular's property binding syntax to bind attributes and properties to SGDS web components:

```typescript
// footer.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent {
  footerTitle = "Singapore Design System";
  footerDescription = "this is a description";
  lastUpdatedDate = new Date().toDateString();
  links = [
    {
      title: "Column 1",
      links: [
        { href: "#1", label: "About Us" },
        { href: "#2", label: "This is a super long link" }
      ]
    },
    {
      title: "Column 2",
      links: [
        { href: "#1", label: "About Us" },
        { href: "#2", label: "This is a super long link" }
      ]
    }
  ];
}
```

```html
<!-- footer.component.html -->
<sgds-footer
  [title]="footerTitle"
  [description]="footerDescription"
  [lastUpdatedDate]="lastUpdatedDate"
  [links]="links"
></sgds-footer>
```

### Listening to Events

Use Angular's event binding syntax with SGDS custom events:

```typescript
// input.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InputComponent {
  inputValue = "defaultValue";

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
  }
}
```

```html
<!-- input.component.html -->
<sgds-input
  [value]="inputValue"
  (sgds-input)="onInput($event)"
  placeholder="Enter your name"
></sgds-input>
<div>Name: {{ inputValue }}</div>
```

### Using Slots

Pass content into named or default slots using standard HTML:

```html
<!-- sidenav.component.html -->
<sgds-sidenav>
  <sgds-sidenav-item>
    <span slot="title">SideNav Item #1</span>
    <sgds-sidenav-link>sgds-sidenav-link</sgds-sidenav-link>
    <sgds-sidenav-link href="#" disabled>sgds-sidenav-link</sgds-sidenav-link>
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
```

### Referencing sgds-web-components with ViewChild

Use `ViewChild` with a template reference to access component properties and methods programmatically:

```typescript
// alert.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from "@angular/core";
import SgdsAlert from "@govtechsg/sgds-web-component/components/Alert/sgds-alert.js";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlertComponent {
  @ViewChild("alert")
  alert?: ElementRef<SgdsAlert>;

  showAlert() {
    if (this.alert) {
      this.alert.nativeElement.show = true;
    }
  }

  closeAlert() {
    this.alert?.nativeElement.close();
  }
}
```

```html
<!-- alert.component.html -->
<sgds-button (click)="showAlert()">Show Alert</sgds-button>
<sgds-button (click)="closeAlert()">Close Alert</sgds-button>
<sgds-alert #alert>This is an alert</sgds-alert>
```
