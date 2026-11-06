<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/OverflowMenu/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      OverflowMenu
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-overflow-menu size="md">
        <sgds-dropdown-item aria-label="View">View</sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Edit">Edit</sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Delete">Delete</sgds-dropdown-item>
      </sgds-overflow-menu>
    </div>
  </div>
</template>
