import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html"
})
export class Modal {
  /* eslint-disable  @typescript-eslint/no-explicit-any */ @ViewChild("modal")
  modal: any;

  showModal() {
    this.modal.nativeElement.show();
  }

  closeModal() {
    this.modal.nativeElement.hide();
  }
}
