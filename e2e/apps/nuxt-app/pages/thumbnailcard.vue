<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      ThumbnailCard
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-thumbnail-card>
        <span slot="title">Thumbnail Card</span>
        <span slot="description">Description of the thumbnail card.</span>
      </sgds-thumbnail-card>
    </div>
  </div>
</template>
