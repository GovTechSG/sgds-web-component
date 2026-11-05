/**
 * Auto-generates Nuxt pages and layout matching the Next.js e2e sidebar pattern.
 * Each component gets its own page under pages/[slug].vue with a persistent sidebar layout.
 * Components use native web component tags (handled by nuxt-ssr-lit).
 *
 * Run from root: tsx e2e/utils/generate-nuxt-components.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactComponentNames, loadArgs, childOnlyComponents,
  htmlTemplates, simpleHtmlTemplate,
} from "./component-templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "../apps/nuxt-app");

async function main() {
  const pagesDir = resolve(appDir, "pages");
  const layoutsDir = resolve(appDir, "layouts");
  mkdirSync(pagesDir, { recursive: true });
  mkdirSync(layoutsDir, { recursive: true });

  const generated: string[] = [];

  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const slug = dirName.toLowerCase();
    const args = await loadArgs(dirName);

    const templateFn = htmlTemplates[dirName];
    const html = templateFn ? templateFn(args) : simpleHtmlTemplate(name, args);

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

  const sidebarItems = generated
    .map(name => `          <sgds-sidebar-item name="${name.toLowerCase()}" title="${name}">
              <NuxtLink to="/${name.toLowerCase()}"></NuxtLink>
            </sgds-sidebar-item>`)
    .join("\n");

  const layoutContent = `<script setup lang="ts">
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
      <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Nuxt</div>
      <sgds-sidebar-section name="components" title="Components">
${sidebarItems}
      </sgds-sidebar-section>
    </sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <slot />
    </div>
  </div>
</template>
`;
  writeFileSync(resolve(layoutsDir, "default.vue"), layoutContent);

  const appContent = `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
`;
  writeFileSync(resolve(appDir, "app.vue"), appContent);

  const indexContent = `<script setup lang="ts">
navigateTo("/${generated[0].toLowerCase()}", { redirectCode: 302 });
</script>

<template>
  <div></div>
</template>
`;
  writeFileSync(resolve(pagesDir, "index.vue"), indexContent);

  console.log(`Generated ${generated.length} component pages, sidebar layout, app.vue, and index.vue for Nuxt`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
