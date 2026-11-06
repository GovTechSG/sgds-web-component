<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Mainnav/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Mainnav
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-mainnav expand="lg">
        <a slot="brand" href="/"><strong>My App</strong></a>
        <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
        <sgds-mainnav-dropdown aria-label="Dropdown menu">
          <span slot="toggler">Dropdown</span>
          <sgds-dropdown-item aria-label="Item 1"><a href="#">Item 1</a></sgds-dropdown-item>
          <sgds-dropdown-item aria-label="Item 2"><a href="#">Item 2</a></sgds-dropdown-item>
        </sgds-mainnav-dropdown>
        <sgds-mainnav-item slot="end"><a href="#">Contact Us</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>
  </div>
</template>
