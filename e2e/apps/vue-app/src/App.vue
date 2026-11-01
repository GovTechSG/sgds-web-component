<script setup lang="ts">
import { onMounted, ref } from "vue";
import "@webcomponents/scoped-custom-element-registry";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
import "@govtechsg/sgds-web-component";

const count = ref(0);

onMounted(async () => {
  const res = await fetch("/component-html.json");
  const htmlMap: Record<string, string> = await res.json();
  const container = document.getElementById("component-grid");
  if (!container) return;

  for (const [name, html] of Object.entries(htmlMap)) {
    const section = document.createElement("section");
    section.className = "sgds-col-4 sgds-col-sm-8 sgds-col-lg-12";
    section.innerHTML = `<h2 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:text-subtle sgds:mb-gap-text-sm">${name}</h2><sgds-divider></sgds-divider><div class="sgds:mt-gap-text-md">${html}</div>`;
    container.appendChild(section);
  }

  count.value = Object.keys(htmlMap).length;
});
</script>

<template>
  <!-- Sticky top: Masthead + Mainnav -->
  <div class="sgds:sticky sgds:top-0 sgds:z-10">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">SGDS Vue E2E</strong>
      <sgds-mainnav-item href="#"><a href="#">Components</a></sgds-mainnav-item>
    </sgds-mainnav>
  </div>

  <!-- Shell body: Sidebar + Main -->
  <div class="sgds:flex sgds:flex-row">
    <!-- Sidebar -->
    <div class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)]">
      <sgds-sidebar active="all-components">
        <div slot="brandName">Vue App</div>
        <sgds-sidebar-section title="Navigation" name="nav">
          <sgds-sidebar-item name="all-components" title="All Components">
            <sgds-icon name="grid-fill" slot="icon"></sgds-icon>
            <a href="#"></a>
          </sgds-sidebar-item>
        </sgds-sidebar-section>
      </sgds-sidebar>
    </div>

    <!-- Main content -->
    <main class="sgds:flex sgds:flex-col sgds:w-full sgds:min-h-[calc(100vh-108px)]">
      <div class="sgds-container-sidebar sgds:py-layout-md sgds:flex-1">
        <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
          SGDS Vue E2E — {{ count }} components
        </h1>
        <div id="component-grid" class="sgds-grid sgds:gap-layout-md"></div>
      </div>

      <footer class="sgds:bg-default">
        <div class="sgds-container-sidebar sgds:py-layout-md">
          <div class="sgds:flex sgds:flex-wrap sgds:justify-between sgds:items-center sgds:gap-md">
            <div class="sgds:flex sgds:flex-wrap sgds:gap-xl">
              <sgds-link variant="neutral" size="sm"><a href="#">Privacy</a></sgds-link>
              <sgds-link variant="neutral" size="sm"><a href="#">Terms of Use</a></sgds-link>
            </div>
            <p class="sgds:text-label-sm sgds:text-subtle sgds:m-0">
              &copy; 2026, Government of Singapore
            </p>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>
