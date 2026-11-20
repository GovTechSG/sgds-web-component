<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Modal
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Modal</sgds-button>
      <sgds-modal size="md">
        <span slot="title">Modal</span>
        <span slot="description">Description of the modal.</span>
        <span slot="footer">Footer content</span>
        Modal
      </sgds-modal>
    </div>
  </div>
</template>
