import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "address-component",
  templateUrl: "./address.component.html"
})
export class AddressComponent {
  @Input() details = {
    address: ""
  };
  @Output() newInputEvent = new EventEmitter<object>();

  handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.details.address = target.value;
    this.newInputEvent.emit(this.details);
  }
}
