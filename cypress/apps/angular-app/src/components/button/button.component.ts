import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "button-component",
  templateUrl: "./button.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Button {}
