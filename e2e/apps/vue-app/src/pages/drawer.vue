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
      <sgds-drawer label="Drawer Title">Drawer content goes here.</sgds-drawer>
    </div>
  </div>
</template>
