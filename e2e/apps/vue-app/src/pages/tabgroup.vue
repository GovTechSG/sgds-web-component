<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      TabGroup
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-tab-group variant="underlined" orientation="horizontal" density="default">
        <sgds-tab slot="nav" panel="tab1" aria-label="Tab 1">Tab 1</sgds-tab>
        <sgds-tab slot="nav" panel="tab2" aria-label="Tab 2">Tab 2</sgds-tab>
        <sgds-tab-panel name="tab1">Content for tab 1</sgds-tab-panel>
        <sgds-tab-panel name="tab2">Content for tab 2</sgds-tab-panel>
      </sgds-tab-group>
    </div>
  </div>
</template>
