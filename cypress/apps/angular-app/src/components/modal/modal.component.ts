import { Component, ElementRef, ViewChild } from "@angular/core";
import SgdsModal from "@govtechsg/sgds-web-component/components/Modal/sgds-modal";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html"
})
export class Modal {
  @ViewChild("modal")
  modal?: ElementRef<SgdsModal>;

  showModal() {
    this.modal?.nativeElement.show();
  }

  closeModal() {
    this.modal?.nativeElement.hide();
  }
}
