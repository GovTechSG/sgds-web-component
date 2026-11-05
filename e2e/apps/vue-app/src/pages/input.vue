<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Input
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-input
        type="text"
        label="Label"
        name="email"
        placeholder="Placeholder text"
        hint-text="Hint text"
      ></sgds-input>
    </div>
  </div>
</template>
