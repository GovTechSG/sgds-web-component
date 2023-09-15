# Angular

Web components are [fully supported in Angular](https://custom-elements-everywhere.com/#angular) and can be used directly.

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
