import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Modal {
  @ViewChild("modal")
  modal?: ElementRef<HTMLElement>;

  showModal() {
    (this.modal?.nativeElement as any).show();
  }

  closeModal() {
    (this.modal?.nativeElement as any).hide();
  }
}
