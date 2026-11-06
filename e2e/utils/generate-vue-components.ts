/**
 * Auto-generates Vue (Vite) per-component pages, a sidebar layout with
 * vue-router, App.vue, and main.ts with router setup.
 *
 * Run from root: tsx e2e/utils/generate-vue-components.ts
 */
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactComponentNames, childOnlyComponents, generateHtmlTemplate,
} from "./component-templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "../apps/vue-app/src");

function main() {
  const pagesDir = resolve(srcDir, "pages");
  rmSync(pagesDir, { recursive: true, force: true });
  mkdirSync(pagesDir, { recursive: true });

  const generated: string[] = [];

  // Generate per-component pages
  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const slug = dirName.toLowerCase();
    const tag = "sgds-" + dirName.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
    const html = generateHtmlTemplate(tag);

    const pageContent = `<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      ${dirName}
    </h1>
    <div class="sgds:mt-gap-text-md">
      ${html}
    </div>
  </div>
</template>
`;
    writeFileSync(resolve(pagesDir, `${slug}.vue`), pageContent);
    generated.push(dirName);
  }

  // Generate sidebar layout
  const sidebarItems = generated
    .map(name => `          <sgds-sidebar-item name="${name.toLowerCase()}" title="${name}">
              <router-link to="/${name.toLowerCase()}"></router-link>
            </sgds-sidebar-item>`)
    .join("\n");

  const sidebarLayoutContent = `<script setup lang="ts">
import "@govtechsg/sgds-web-component";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const active = computed(() => {
  const path = route.path.replace("/", "");
  return path || "accordion";
});
</script>

<template>
  <div class="sgds:flex sgds:min-h-screen">
    <sgds-sidebar :active="active" variant="persistent" class="sgds:h-screen sgds:sticky sgds:top-0">
      <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Vue</div>
      <sgds-sidebar-section name="components" title="Components">
${sidebarItems}
      </sgds-sidebar-section>
    </sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <router-view />
    </div>
  </div>
</template>
`;
  writeFileSync(resolve(srcDir, "SidebarLayout.vue"), sidebarLayoutContent);

  // Generate App.vue
  const appContent = `<script setup lang="ts">
import SidebarLayout from "./SidebarLayout.vue";
</script>

<template>
  <SidebarLayout />
</template>
`;
  writeFileSync(resolve(srcDir, "App.vue"), appContent);

  // Generate main.ts with router
  const routeImports = generated
    .map(name => `  { path: "/${name.toLowerCase()}", component: () => import("./pages/${name.toLowerCase()}.vue") },`)
    .join("\n");

  const mainContent = `import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "@webcomponents/scoped-custom-element-registry";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "./index.css";
import App from "./App.vue";

const routes = [
  { path: "/", redirect: "/${generated[0].toLowerCase()}" },
${routeImports}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
`;
  writeFileSync(resolve(srcDir, "main.ts"), mainContent);

  console.log(`Generated ${generated.length} component pages, sidebar layout, App.vue, and main.ts for Vue`);
}

try {
  main();
} catch (err) {
  console.error("Fatal error:", err);
  process.exit(1);
}
