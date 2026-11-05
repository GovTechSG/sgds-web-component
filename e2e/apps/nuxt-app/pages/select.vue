<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Select
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-select label="Country" name="country" placeholder="Select a country">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    </div>
  </div>
</template>
