<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/ImageCard/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      ImageCard
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-image-card image-position="before" image-adjustment="default" orientation="vertical">
        <span slot="title">ImageCard</span>
        <span slot="description">Description of the imagecard.</span>
        <span slot="footer">Footer content</span>
        ImageCard
      </sgds-image-card>
    </div>
  </div>
</template>
