<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Select/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Select
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-select label="Select" placeholder="Enter text..." autocomplete="on">
        <sgds-select-option>
          SelectOption content
        </sgds-select-option>
      </sgds-select>
    </div>
  </div>
</template>
