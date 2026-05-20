import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "stepper-component",
  templateUrl: "./stepper.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Stepper {
  steps = [
    {
      stepHeader: "Personal Details",
      component: "1 test"
    },
    {
      stepHeader: "Address and Contact Information",
      component: "2 test"
    },
    {
      stepHeader: "Review",
      component: "3 test"
    }
  ];
}
