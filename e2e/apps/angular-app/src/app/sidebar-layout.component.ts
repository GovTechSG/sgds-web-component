import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-sidebar-layout",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds:flex sgds:min-h-screen">
      <sgds-sidebar [attr.active]="active" variant="persistent" class="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Angular</div>
        <sgds-sidebar-section name="components" title="Components">
          <sgds-sidebar-item name="accordion" title="Accordion">
              <a routerLink="/accordion"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="appnav" title="Appnav">
              <a routerLink="/appnav"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alertlink" title="AlertLink">
              <a routerLink="/alertlink"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alert" title="Alert">
              <a routerLink="/alert"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="breadcrumb" title="Breadcrumb">
              <a routerLink="/breadcrumb"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="button" title="Button">
              <a routerLink="/button"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="card" title="Card">
              <a routerLink="/card"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="badge" title="Badge">
              <a routerLink="/badge"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="closebutton" title="CloseButton">
              <a routerLink="/closebutton"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="checkboxgroup" title="CheckboxGroup">
              <a routerLink="/checkboxgroup"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="combobox" title="ComboBox">
              <a routerLink="/combobox"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datatable" title="DataTable">
              <a routerLink="/datatable"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datepicker" title="Datepicker">
              <a routerLink="/datepicker"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="descriptionlistgroup" title="DescriptionListGroup">
              <a routerLink="/descriptionlistgroup"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="dropdown" title="Dropdown">
              <a routerLink="/dropdown"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="divider" title="Divider">
              <a routerLink="/divider"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="drawer" title="Drawer">
              <a routerLink="/drawer"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="fileupload" title="FileUpload">
              <a routerLink="/fileupload"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="footer" title="Footer">
              <a routerLink="/footer"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="icon" title="Icon">
              <a routerLink="/icon"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconbutton" title="IconButton">
              <a routerLink="/iconbutton"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconcard" title="IconCard">
              <a routerLink="/iconcard"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconlist" title="IconList">
              <a routerLink="/iconlist"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="imagecard" title="ImageCard">
              <a routerLink="/imagecard"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="input" title="Input">
              <a routerLink="/input"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="link" title="Link">
              <a routerLink="/link"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="mainnav" title="Mainnav">
              <a routerLink="/mainnav"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="masthead" title="Masthead">
              <a routerLink="/masthead"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="modal" title="Modal">
              <a routerLink="/modal"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="overflowmenu" title="OverflowMenu">
              <a routerLink="/overflowmenu"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="progressbar" title="ProgressBar">
              <a routerLink="/progressbar"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="pagination" title="Pagination">
              <a routerLink="/pagination"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="quantitytoggle" title="QuantityToggle">
              <a routerLink="/quantitytoggle"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="radiogroup" title="RadioGroup">
              <a routerLink="/radiogroup"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="select" title="Select">
              <a routerLink="/select"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidenav" title="Sidenav">
              <a routerLink="/sidenav"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidebar" title="Sidebar">
              <a routerLink="/sidebar"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="skeleton" title="Skeleton">
              <a routerLink="/skeleton"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="spinner" title="Spinner">
              <a routerLink="/spinner"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="step" title="Step">
              <a routerLink="/step"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="stepper" title="Stepper">
              <a routerLink="/stepper"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="subnav" title="Subnav">
              <a routerLink="/subnav"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="switch" title="Switch">
              <a routerLink="/switch"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="systembanner" title="SystemBanner">
              <a routerLink="/systembanner"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tabgroup" title="TabGroup">
              <a routerLink="/tabgroup"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="table" title="Table">
              <a routerLink="/table"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tableofcontents" title="TableOfContents">
              <a routerLink="/tableofcontents"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="textarea" title="Textarea">
              <a routerLink="/textarea"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="thumbnailcard" title="ThumbnailCard">
              <a routerLink="/thumbnailcard"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tooltip" title="Tooltip">
              <a routerLink="/tooltip"></a>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="toastcontainer" title="ToastContainer">
              <a routerLink="/toastcontainer"></a>
            </sgds-sidebar-item>
        </sgds-sidebar-section>
      </sgds-sidebar>
      <div class="sgds:flex sgds:flex-col sgds:w-full">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class SidebarLayoutComponent {
  active = "accordion";

  constructor() {
    // Update active on navigation (simple approach without Router subscription for standalone)
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace("/", "");
      this.active = path || "accordion";
      // Listen for popstate (back/forward)
      window.addEventListener("popstate", () => {
        this.active = window.location.pathname.replace("/", "") || "accordion";
      });
    }
  }
}
