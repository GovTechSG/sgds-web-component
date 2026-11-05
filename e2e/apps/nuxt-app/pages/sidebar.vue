<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Sidebar/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Sidebar
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-sidebar variant="collapsible" aria-label="Sidebar navigation">
        <sgds-sidebar-group>
          SidebarGroup content
        </sgds-sidebar-group>
        <sgds-sidebar-item>
          <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
          SidebarItem content
        </sgds-sidebar-item>
        <sgds-sidebar-section></sgds-sidebar-section>
      </sgds-sidebar>
    </div>
  </div>
</template>
