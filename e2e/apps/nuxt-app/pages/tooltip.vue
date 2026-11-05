<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Tooltip/index.js";
import "@govtechsg/sgds-web-component/components/Button/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Tooltip
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Tooltip</sgds-button>
      <sgds-tooltip placement="top" trigger="hover focus">
        Tooltip
      </sgds-tooltip>
    </div>
  </div>
</template>
