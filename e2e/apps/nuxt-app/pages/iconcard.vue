<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/IconCard/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      IconCard
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-icon-card orientation="vertical">
        <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
        <span slot="title">IconCard</span>
        <span slot="description">Description of the iconcard.</span>
        <span slot="footer">Footer content</span>
        IconCard
      </sgds-icon-card>
    </div>
  </div>
</template>
