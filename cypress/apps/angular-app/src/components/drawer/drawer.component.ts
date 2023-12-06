import { Component, ElementRef, ViewChild } from "@angular/core";
import SgdsDrawer from "@govtechsg/sgds-web-component/components/Drawer/sgds-drawer";

@Component({
  selector: "drawer-component",
  templateUrl: "./drawer.component.html"
})
export class Drawer {
  @ViewChild("drawer")
  drawer?: ElementRef<SgdsDrawer>;

  showDrawer() {
    this.drawer?.nativeElement.show();
  }

  closeDrawer() {
    this.drawer?.nativeElement.hide();
  }
}
