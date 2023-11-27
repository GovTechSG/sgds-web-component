import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "drawer-component",
  templateUrl: "./drawer.component.html"
})
export class Drawer {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @ViewChild("drawer")
  drawer: any;

  showDrawer() {
    this.drawer.nativeElement.show();
  }

  closeDrawer() {
    this.drawer.nativeElement.hide();
  }
}
