import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "drawer-component",
  templateUrl: "./drawer.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Drawer {
  @ViewChild("drawer")
  drawer?: ElementRef<HTMLElement>;

  showDrawer() {
    (this.drawer?.nativeElement as any).show();
  }

  closeDrawer() {
    (this.drawer?.nativeElement as any).hide();
  }
}
