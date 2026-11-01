import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-root",
  template: `
    <!-- Sticky top -->
    <div class="sgds:sticky sgds:top-0 sgds:z-10">
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
        <strong slot="brand">SGDS Angular E2E</strong>
        <sgds-mainnav-item href="#"><a href="#">Components</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>

    <!-- Shell body -->
    <div class="sgds:flex sgds:flex-row">
      <div class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)]">
        <sgds-sidebar active="all-components">
          <div slot="brandName">Angular App</div>
          <sgds-sidebar-section title="Navigation" name="nav">
            <sgds-sidebar-item name="all-components" title="All Components">
              <sgds-icon name="grid-fill" slot="icon"></sgds-icon>
              <a href="#"></a>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      </div>

      <main class="sgds:flex sgds:flex-col sgds:w-full sgds:min-h-[calc(100vh-108px)]">
        <div class="sgds-container-sidebar sgds:py-layout-md sgds:flex-1">
          <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">SGDS Angular E2E — {{ count }} components</h1>
          <div #grid class="sgds-grid sgds:gap-layout-md"></div>
        </div>

        <footer class="sgds:bg-default">
          <div class="sgds-container-sidebar sgds:py-layout-md">
            <div class="sgds:flex sgds:flex-wrap sgds:justify-between sgds:items-center sgds:gap-md">
              <div class="sgds:flex sgds:flex-wrap sgds:gap-xl">
                <sgds-link variant="neutral" size="sm"><a href="#">Privacy</a></sgds-link>
                <sgds-link variant="neutral" size="sm"><a href="#">Terms of Use</a></sgds-link>
              </div>
              <p class="sgds:text-label-sm sgds:text-subtle sgds:m-0">&copy; 2026, Government of Singapore</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("grid") gridRef!: ElementRef<HTMLDivElement>;
  count = 0;

  async ngAfterViewInit() {
    const grid = this.gridRef.nativeElement;
    const res = await fetch("/assets/component-html.json");
    const htmlMap: Record<string, string> = await res.json();

    for (const [name, html] of Object.entries(htmlMap)) {
      const section = document.createElement("section");
      section.className = "sgds-col-4 sgds-col-sm-8 sgds-col-lg-12";
      section.innerHTML = `<h2 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:text-subtle sgds:mb-gap-text-sm">${name}</h2><sgds-divider></sgds-divider><div class="sgds:mt-gap-text-md">${html}</div>`;
      grid.appendChild(section);
    }

    this.count = Object.keys(htmlMap).length;
  }
}
