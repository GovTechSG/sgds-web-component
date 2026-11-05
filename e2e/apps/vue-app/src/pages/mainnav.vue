<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Mainnav
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-mainnav>
        <strong slot="brand">My App</strong>
        <sgds-mainnav-item><a href="/">Home</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="/about">About</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>
  </div>
</template>
