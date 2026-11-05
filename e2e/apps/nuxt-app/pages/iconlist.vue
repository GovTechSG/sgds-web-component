<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/IconList/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      IconList
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-icon-list>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>Item 1</div>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>Item 2</div>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>Item 3</div>
      </sgds-icon-list>
    </div>
  </div>
</template>
