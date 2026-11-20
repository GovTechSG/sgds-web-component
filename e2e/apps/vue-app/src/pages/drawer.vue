<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Drawer
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Drawer</sgds-button>
      <sgds-drawer size="sm" placement="end" aria-label="Drawer">
        <span slot="title">Drawer</span>
        <span slot="description">Description of the drawer.</span>
        <span slot="footer">Footer content</span>
        Drawer
      </sgds-drawer>
    </div>
  </div>
</template>
