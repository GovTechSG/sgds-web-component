<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Badge
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-badge show>
        <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
        Badge
      </sgds-badge>
    </div>
  </div>
</template>
