import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html"
})
export class Modal {
  @ViewChild("modal")
  modal: any;

  showModal() {
    this.modal.nativeElement.show();
  }

  closeModal() {
    this.modal.nativeElement.hide();
  }
}
