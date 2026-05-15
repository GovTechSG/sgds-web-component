import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from "@angular/core";
import SgdsAlert from "@govtechsg/sgds-web-component/components/Alert/sgds-alert.js";

@Component({
  selector: "alert-component",
  templateUrl: "./alert.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Alert {
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
