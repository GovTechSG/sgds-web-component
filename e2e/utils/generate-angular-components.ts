/**
 * Auto-generates Angular standalone components, per-component route pages,
 * a sidebar layout, app.component.ts, app.routes.ts, and main.ts with routing.
 *
 * Run from root: tsx e2e/utils/generate-angular-components.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactComponentNames, loadArgs, childOnlyComponents,
  htmlTemplates, simpleHtmlTemplate,
} from "./component-templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "../apps/angular-app/src/app");

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}

async function main() {
  const pagesDir = resolve(appDir, "pages");
  mkdirSync(pagesDir, { recursive: true });

  const generated: string[] = [];

  // Generate per-component page components
  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const slug = dirName.toLowerCase();
    const kebab = toKebab(dirName);
    const args = await loadArgs(dirName);

    const templateFn = htmlTemplates[dirName];
    const html = templateFn ? templateFn(args) : simpleHtmlTemplate(name, args);

    const componentContent = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-${kebab}",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">${dirName}</h1>
      <div class="sgds:mt-gap-text-md">
        ${html.replace(/`/g, "\\`")}
      </div>
    </div>
  \`,
})
export class ${dirName}PageComponent {}
`;
    writeFileSync(resolve(pagesDir, `${slug}.component.ts`), componentContent);
    generated.push(dirName);
  }

  // Generate app.routes.ts
  const routeEntries = generated
    .map(name => `  { path: "${name.toLowerCase()}", loadComponent: () => import("./pages/${name.toLowerCase()}.component").then(m => m.${name}PageComponent) },`)
    .join("\n");

  const routesContent = `import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "${generated[0].toLowerCase()}", pathMatch: "full" },
${routeEntries}
];
`;
  writeFileSync(resolve(appDir, "app.routes.ts"), routesContent);

  // Generate sidebar-layout.component.ts
  const sidebarItems = generated
    .map(name => `          <sgds-sidebar-item name="${name.toLowerCase()}" title="${name}">
              <a routerLink="/${name.toLowerCase()}"></a>
            </sgds-sidebar-item>`)
    .join("\n");

  const sidebarLayoutContent = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-sidebar-layout",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div class="sgds:flex sgds:min-h-screen">
      <sgds-sidebar [attr.active]="active" variant="persistent" class="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Angular</div>
        <sgds-sidebar-section name="components" title="Components">
${sidebarItems}
        </sgds-sidebar-section>
      </sgds-sidebar>
      <div class="sgds:flex sgds:flex-col sgds:w-full">
        <router-outlet></router-outlet>
      </div>
    </div>
  \`,
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
`;
  writeFileSync(resolve(appDir, "sidebar-layout.component.ts"), sidebarLayoutContent);

  // Generate app.component.ts
  const appComponentContent = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SidebarLayoutComponent } from "./sidebar-layout.component";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SidebarLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<app-sidebar-layout></app-sidebar-layout>\`,
})
export class AppComponent {
  constructor(private router: Router) {
    // Update sidebar active state on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const sidebar = document.querySelector("sgds-sidebar") as any;
        if (sidebar) {
          sidebar.active = event.urlAfterRedirects.replace("/", "") || "accordion";
        }
      }
    });
  }
}
`;
  writeFileSync(resolve(appDir, "app.component.ts"), appComponentContent);

  // Generate main.ts
  const mainContent = `import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));
`;
  writeFileSync(resolve(appDir, "../main.ts"), mainContent);

  console.log(`Generated ${generated.length} component pages, sidebar layout, app.component.ts, app.routes.ts, and main.ts for Angular`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
