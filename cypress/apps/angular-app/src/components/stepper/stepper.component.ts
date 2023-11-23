import { Component } from "@angular/core";

@Component({
  selector: "stepper-component",
  templateUrl: "./stepper.component.html"
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
