<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Dropdown
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-dropdown>
        <sgds-button slot="toggler" variant="primary" tone="brand" aria-label="Dropdown">Dropdown
          <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
        </sgds-button>
        <sgds-dropdown-item aria-label="Item 1"><a href="#">Item 1</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Item 2"><a href="#">Item 2</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Item 3">Item 3</sgds-dropdown-item>
      </sgds-dropdown>
    </div>
  </div>
</template>
